import { NextRequest } from 'next/server'
import { spawn } from 'child_process'
import fs from 'fs'
import {
  FFMPEG_PATH,
  cleanupFiles,
  cleanupFilesByPrefix,
  err,
  filePathResponse,
  getErrorStatus,
  parseFormData,
  randomId,
  tmpPath,
  withConcurrencyLimit,
} from '@/lib/server-utils'

export const runtime = 'nodejs'
export const maxDuration = 120

const AUDIO_PROCESS_CONCURRENCY_LIMIT = Number(process.env.AUDIO_PROCESS_CONCURRENCY_LIMIT || 3)
const AUDIO_UPLOAD_MAX_BYTES = Number(process.env.AUDIO_UPLOAD_MAX_BYTES || 100 * 1024 * 1024)

function runFFmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG_PATH, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''
    proc.stderr.on('data', (d: Buffer) => {
      stderr += d.toString()
    })
    proc.on('close', code => {
      if (code === 0) resolve()
      else reject(new Error(`ffmpeg error: ${stderr.slice(-300)}`))
    })
  })
}

const FORMAT_MIME: Record<string, string> = {
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  aac: 'audio/aac',
  flac: 'audio/flac',
  m4a: 'audio/mp4',
  opus: 'audio/opus',
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || 'convert'
  const id = randomId()

  try {
    return await withConcurrencyLimit(
      'audio-processing',
      AUDIO_PROCESS_CONCURRENCY_LIMIT,
      async () => {
        const { files, fields } = await parseFormData(req, { maxBytes: AUDIO_UPLOAD_MAX_BYTES })

        if (action === 'convert') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const to = fields.to || 'mp3'
          const bitrate = fields.bitrate || '192k'
          const inputPath = tmpPath(`${id}-input`)
          const outFile = tmpPath(`${id}-output.${to}`)
          fs.writeFileSync(inputPath, audio.buffer)

          const args = ['-i', inputPath]
          if (to === 'mp3') args.push('-acodec', 'libmp3lame', '-b:a', bitrate)
          else if (to === 'wav') args.push('-acodec', 'pcm_s16le')
          else if (to === 'ogg') args.push('-acodec', 'libvorbis', '-b:a', bitrate)
          else if (to === 'aac' || to === 'm4a') args.push('-acodec', 'aac', '-b:a', bitrate)
          else if (to === 'flac') args.push('-acodec', 'flac')
          else if (to === 'opus') args.push('-acodec', 'libopus', '-b:a', bitrate)
          args.push('-y', outFile)

          await runFFmpeg(args)
          cleanupFiles(inputPath)
          return filePathResponse(outFile, `converted.${to}`, FORMAT_MIME[to] || 'audio/mpeg')
        }

        if (action === 'trim') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const start = fields.start || '0'
          const duration = fields.duration || '30'
          const ext = audio.filename?.split('.').pop() || 'mp3'
          const inputPath = tmpPath(`${id}-input.${ext}`)
          const outFile = tmpPath(`${id}-trimmed.${ext}`)
          fs.writeFileSync(inputPath, audio.buffer)

          await runFFmpeg(['-i', inputPath, '-ss', start, '-t', duration, '-c', 'copy', '-y', outFile])
          cleanupFiles(inputPath)
          return filePathResponse(outFile, `trimmed.${ext}`, FORMAT_MIME[ext] || 'audio/mpeg')
        }

        if (action === 'merge') {
          const audioFiles = files.filter(f => f.fieldname === 'files')
          if (audioFiles.length < 2) return err('Upload at least 2 audio files')

          const inputPaths: string[] = []
          const listFile = tmpPath(`${id}-list.txt`)
          const outFile = tmpPath(`${id}-merged.mp3`)

          for (let i = 0; i < audioFiles.length; i++) {
            const p = tmpPath(`${id}-audio-${i}.mp3`)
            const tmpIn = tmpPath(`${id}-in-${i}`)
            fs.writeFileSync(tmpIn, audioFiles[i].buffer)
            await runFFmpeg(['-i', tmpIn, '-acodec', 'libmp3lame', '-b:a', '192k', '-y', p])
            inputPaths.push(p)
            cleanupFiles(tmpIn)
          }

          const listContent = inputPaths.map(p => `file '${p}'`).join('\n')
          fs.writeFileSync(listFile, listContent)

          await runFFmpeg(['-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', '-y', outFile])
          cleanupFiles(...inputPaths, listFile)
          return filePathResponse(outFile, 'merged.mp3', 'audio/mpeg')
        }

        if (action === 'compress') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const targetBitrate = fields.bitrate || '96k'
          const inputPath = tmpPath(`${id}-input`)
          const outFile = tmpPath(`${id}-compressed.mp3`)
          fs.writeFileSync(inputPath, audio.buffer)

          await runFFmpeg(['-i', inputPath, '-acodec', 'libmp3lame', '-b:a', targetBitrate, '-y', outFile])
          let outputSize = fs.statSync(outFile).size
          if (outputSize >= audio.buffer.length && targetBitrate !== '64k') {
            await runFFmpeg(['-i', inputPath, '-acodec', 'libmp3lame', '-b:a', '64k', '-y', outFile])
            outputSize = fs.statSync(outFile).size
          }
          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'compressed.mp3', 'audio/mpeg', {
            'X-Original-Size': audio.buffer.length.toString(),
            'X-Output-Size': outputSize.toString(),
          })
        }

        if (action === 'speed') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const speed = parseFloat(fields.speed || '1.5')
          const atempoFilter =
            speed >= 0.5 && speed <= 2.0
              ? `atempo=${speed}`
              : speed > 2.0
                ? `atempo=2.0,atempo=${(speed / 2).toFixed(2)}`
                : `atempo=0.5,atempo=${(speed * 2).toFixed(2)}`

          const inputPath = tmpPath(`${id}-input`)
          const outFile = tmpPath(`${id}-speed.mp3`)
          fs.writeFileSync(inputPath, audio.buffer)

          await runFFmpeg(['-i', inputPath, '-filter:a', atempoFilter, '-acodec', 'libmp3lame', '-y', outFile])
          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'speed-changed.mp3', 'audio/mpeg')
        }

        if (action === 'equalizer') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const preset = fields.preset || 'balanced'
          const presetFilters: Record<string, string> = {
            balanced: 'volume=1',
            voice: 'highpass=f=120,lowpass=f=6000,equalizer=f=2500:t=q:w=1:g=3',
            bass: 'equalizer=f=100:t=q:w=1:g=6,equalizer=f=1000:t=q:w=1:g=-2',
            treble: 'equalizer=f=8000:t=q:w=1:g=6,equalizer=f=120:t=q:w=1:g=-2',
          }
          const inputPath = tmpPath(`${id}-input`)
          const outFile = tmpPath(`${id}-equalized.mp3`)
          fs.writeFileSync(inputPath, audio.buffer)

          await runFFmpeg([
            '-i',
            inputPath,
            '-filter:a',
            presetFilters[preset] || presetFilters.balanced,
            '-acodec',
            'libmp3lame',
            '-b:a',
            '192k',
            '-y',
            outFile,
          ])
          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'equalized.mp3', 'audio/mpeg')
        }

        if (action === 'metadata') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const inputPath = tmpPath(`${id}-input`)
          const outFile = tmpPath(`${id}-tagged.mp3`)
          fs.writeFileSync(inputPath, audio.buffer)

          const args = ['-i', inputPath, '-map_metadata', '-1', '-acodec', 'libmp3lame', '-b:a', '192k']
          if (fields.title) args.push('-metadata', `title=${fields.title}`)
          if (fields.artist) args.push('-metadata', `artist=${fields.artist}`)
          if (fields.album) args.push('-metadata', `album=${fields.album}`)
          if (fields.year) args.push('-metadata', `date=${fields.year}`)
          if (fields.genre) args.push('-metadata', `genre=${fields.genre}`)
          args.push('-y', outFile)

          await runFFmpeg(args)
          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'tagged.mp3', 'audio/mpeg')
        }

        if (action === 'remove-vocals') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const inputPath = tmpPath(`${id}-input`)
          const outFile = tmpPath(`${id}-instrumental.mp3`)
          fs.writeFileSync(inputPath, audio.buffer)

          await runFFmpeg([
            '-i',
            inputPath,
            '-af',
            'pan=stereo|c0=FL-FR|c1=FR-FL',
            '-acodec',
            'libmp3lame',
            '-b:a',
            '192k',
            '-y',
            outFile,
          ])
          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'instrumental.mp3', 'audio/mpeg')
        }

        if (action === 'trim-silence') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const threshold = fields.threshold || '-45'
          const inputPath = tmpPath(`${id}-input`)
          const outFile = tmpPath(`${id}-cleaned.mp3`)
          fs.writeFileSync(inputPath, audio.buffer)

          await runFFmpeg([
            '-i',
            inputPath,
            '-af',
            `silenceremove=start_periods=1:start_duration=0.2:start_threshold=${threshold}dB:stop_periods=-1:stop_duration=0.3:stop_threshold=${threshold}dB`,
            '-acodec',
            'libmp3lame',
            '-b:a',
            '192k',
            '-y',
            outFile,
          ])
          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'trimmed-silence.mp3', 'audio/mpeg')
        }

        if (action === 'volume') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const boost = fields.boost || '4'
          const inputPath = tmpPath(`${id}-input`)
          const outFile = tmpPath(`${id}-boosted.mp3`)
          fs.writeFileSync(inputPath, audio.buffer)

          await runFFmpeg([
            '-i',
            inputPath,
            '-filter:a',
            `volume=${boost}dB`,
            '-acodec',
            'libmp3lame',
            '-b:a',
            '192k',
            '-y',
            outFile,
          ])
          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'boosted.mp3', 'audio/mpeg')
        }

        if (action === 'info') {
          const audio = files.find(f => f.fieldname === 'file')
          if (!audio) return err('No audio file uploaded')

          const inputPath = tmpPath(`${id}-input`)
          fs.writeFileSync(inputPath, audio.buffer)
          const { execSync } = await import('child_process')
          const out = execSync(`ffprobe -v quiet -print_format json -show_streams -show_format "${inputPath}"`)
          cleanupFiles(inputPath)

          const info = JSON.parse(out.toString())
          const stream = info.streams?.[0]
          return Response.json({
            duration: parseFloat(info.format?.duration || '0').toFixed(2),
            bitrate: parseInt(info.format?.bit_rate || '0'),
            size: parseInt(info.format?.size || '0'),
            format: info.format?.format_name,
            codec: stream?.codec_name,
            sampleRate: stream?.sample_rate,
            channels: stream?.channels,
            channelLayout: stream?.channel_layout,
          })
        }

        return err(`Unknown audio action: ${action}`)
      },
      'Audio servers are busy right now. Please retry in a moment.'
    )
  } catch (e) {
    cleanupFilesByPrefix(id)
    return err(`Audio processing failed: ${(e as Error).message}`, getErrorStatus(e, 500))
  }
}
