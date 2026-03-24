import { NextRequest } from 'next/server'
import { exec, spawn } from 'child_process'
import { promisify } from 'util'
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
export const maxDuration = 300

const execAsync = promisify(exec)
const VIDEO_PROCESS_CONCURRENCY_LIMIT = Number(process.env.VIDEO_PROCESS_CONCURRENCY_LIMIT || 2)
const VIDEO_UPLOAD_MAX_BYTES = Number(process.env.VIDEO_UPLOAD_MAX_BYTES || 150 * 1024 * 1024)

function runFFmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG_PATH, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''
    proc.stderr.on('data', (d: Buffer) => {
      stderr += d.toString()
    })
    proc.on('close', code => {
      if (code === 0) resolve()
      else reject(new Error(`ffmpeg exited ${code}: ${stderr.slice(-300)}`))
    })
  })
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || 'compress'
  const id = randomId()
  const inputPath = tmpPath(`${id}-input`)
  const outputPath = tmpPath(`${id}-output`)

  try {
    return await withConcurrencyLimit(
      'video-processing',
      VIDEO_PROCESS_CONCURRENCY_LIMIT,
      async () => {
        const { files, fields } = await parseFormData(req, { maxBytes: VIDEO_UPLOAD_MAX_BYTES })

        if (action === 'make-gif') {
          const images = files.filter(f => f.fieldname === 'files' || f.fieldname === 'file')
          if (images.length < 2) return err('Upload at least 2 images')

          const fps = fields.fps || '10'
          const scale = fields.scale || '480'
          const frameDuration = fields.frameDuration || '1.2'
          const listFile = tmpPath(`${id}-images.txt`)
          const outFile = outputPath + '.gif'
          const imagePaths: string[] = []

          for (let i = 0; i < images.length; i++) {
            const ext = images[i].filename.split('.').pop() || 'png'
            const imagePath = tmpPath(`${id}-img-${i}.${ext}`)
            fs.writeFileSync(imagePath, images[i].buffer)
            imagePaths.push(imagePath)
          }

          const escapedPaths = imagePaths.map(imagePath => imagePath.replace(/'/g, "'\\''"))
          const listContent = `${escapedPaths
            .map(imagePath => `file '${imagePath}'\nduration ${frameDuration}`)
            .join('\n')}\nfile '${escapedPaths[escapedPaths.length - 1]}'`
          fs.writeFileSync(listFile, listContent)

          await runFFmpeg([
            '-f', 'concat',
            '-safe', '0',
            '-i', listFile,
            '-vf',
            `fps=${fps},scale=${scale}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
            '-loop', '0',
            '-y', outFile,
          ])

          cleanupFiles(...imagePaths, listFile)
          return filePathResponse(outFile, 'animated.gif', 'image/gif')
        }

        const video = files.find(f => f.fieldname === 'file')
        if (!video) return err('No video file uploaded')

        fs.writeFileSync(inputPath, video.buffer)

        if (action === 'compress') {
          const crf = fields.quality === 'high' ? '23' : fields.quality === 'low' ? '35' : '28'
          const outFile = outputPath + '.mp4'
          await runFFmpeg([
            '-i', inputPath,
            '-vcodec', 'libx264',
            '-crf', crf,
            '-preset', 'fast',
            '-acodec', 'aac',
            '-b:a', '128k',
            '-movflags', '+faststart',
            '-y', outFile,
          ])

          const outputSize = fs.statSync(outFile).size
          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'compressed.mp4', 'video/mp4', {
            'X-Original-Size': video.buffer.length.toString(),
            'X-Output-Size': outputSize.toString(),
          })
        }

        if (action === 'extract-audio') {
          const bitrate = fields.bitrate || '192k'
          const outFile = outputPath + '.mp3'
          await runFFmpeg([
            '-i', inputPath,
            '-vn',
            '-acodec', 'libmp3lame',
            '-b:a', bitrate,
            '-y', outFile,
          ])

          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'audio.mp3', 'audio/mpeg')
        }

        if (action === 'trim') {
          const start = fields.start || '0'
          const duration = fields.duration || '30'
          const outFile = outputPath + '.mp4'
          await runFFmpeg([
            '-i', inputPath,
            '-ss', start,
            '-t', duration,
            '-c:v', 'copy',
            '-c:a', 'copy',
            '-y', outFile,
          ])

          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'trimmed.mp4', 'video/mp4')
        }

        if (action === 'to-gif') {
          const fps = fields.fps || '10'
          const scale = fields.scale || '480'
          const start = fields.start || '0'
          const duration = fields.duration || '5'
          const palettePath = tmpPath(`${id}-palette.png`)
          const outFile = outputPath + '.gif'

          await runFFmpeg([
            '-i', inputPath,
            '-ss', start,
            '-t', duration,
            '-vf', `fps=${fps},scale=${scale}:-1:flags=lanczos,palettegen`,
            '-y', palettePath,
          ])
          await runFFmpeg([
            '-i', inputPath,
            '-i', palettePath,
            '-ss', start,
            '-t', duration,
            '-lavfi', `fps=${fps},scale=${scale}:-1:flags=lanczos[x];[x][1:v]paletteuse`,
            '-y', outFile,
          ])

          cleanupFiles(inputPath, palettePath)
          return filePathResponse(outFile, 'video.gif', 'image/gif')
        }

        if (action === 'speed') {
          const speed = parseFloat(fields.speed || '2')
          const vpt = 1 / speed
          const apt = speed > 2 ? 2.0 : speed
          const outFile = outputPath + '.mp4'
          await runFFmpeg([
            '-i', inputPath,
            '-filter:v', `setpts=${vpt}*PTS`,
            '-filter:a', `atempo=${apt}`,
            '-y', outFile,
          ])

          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'speed-changed.mp4', 'video/mp4')
        }

        if (action === 'mute') {
          const outFile = outputPath + '.mp4'
          await runFFmpeg(['-i', inputPath, '-c:v', 'copy', '-an', '-y', outFile])

          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'muted.mp4', 'video/mp4')
        }

        if (action === 'merge-audio') {
          const audioFile = files.find(f => f.fieldname === 'audio')
          if (!audioFile) return err('No audio file for merge')

          const audioPath = tmpPath(`${id}-audio`)
          const outFile = outputPath + '.mp4'
          fs.writeFileSync(audioPath, audioFile.buffer)

          await runFFmpeg([
            '-i', inputPath,
            '-i', audioPath,
            '-c:v', 'copy',
            '-c:a', 'aac',
            '-map', '0:v:0',
            '-map', '1:a:0',
            '-shortest',
            '-y', outFile,
          ])

          cleanupFiles(inputPath, audioPath)
          return filePathResponse(outFile, 'merged.mp4', 'video/mp4')
        }

        if (action === 'info') {
          const { stdout } = await execAsync(
            `ffprobe -v quiet -print_format json -show_streams -show_format "${inputPath}"`
          )
          cleanupFiles(inputPath)

          const info = JSON.parse(stdout)
          const videoStream = info.streams?.find((s: { codec_type: string }) => s.codec_type === 'video')
          const audioStream = info.streams?.find((s: { codec_type: string }) => s.codec_type === 'audio')

          return Response.json({
            duration: parseFloat(info.format?.duration || '0').toFixed(2),
            size: parseInt(info.format?.size || '0'),
            bitrate: parseInt(info.format?.bit_rate || '0'),
            format: info.format?.format_long_name,
            video: videoStream
              ? {
                  codec: videoStream.codec_name,
                  width: videoStream.width,
                  height: videoStream.height,
                  fps: videoStream.r_frame_rate,
                }
              : null,
            audio: audioStream
              ? {
                  codec: audioStream.codec_name,
                  sampleRate: audioStream.sample_rate,
                  channels: audioStream.channels,
                }
              : null,
          })
        }

        if (action === 'screenshot') {
          const ts = fields.timestamp || '00:00:01'
          const outFile = outputPath + '.jpg'
          await runFFmpeg([
            '-i', inputPath,
            '-ss', ts,
            '-frames:v', '1',
            '-q:v', '2',
            '-y', outFile,
          ])

          cleanupFiles(inputPath)
          return filePathResponse(outFile, 'screenshot.jpg', 'image/jpeg')
        }

        cleanupFiles(inputPath)
        return err(`Unknown video action: ${action}`)
      },
      'Video servers are busy right now. Please retry in a moment.'
    )
  } catch (e) {
    cleanupFilesByPrefix(id)
    return err(`Video processing failed: ${(e as Error).message}`, getErrorStatus(e, 500))
  }
}
