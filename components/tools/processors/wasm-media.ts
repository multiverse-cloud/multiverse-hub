import { fetchFile } from '@ffmpeg/util'
import { getFFmpeg } from '@/lib/ffmpeg'

export async function processVideoWasm({
  file,
  action,
  options = {},
  onProgress,
}: {
  file: File
  action: string
  options?: Record<string, any>
  onProgress?: (progress: number) => void
}) {
  const ffmpeg = await getFFmpeg()

  ffmpeg.on('progress', ({ progress }) => {
    if (onProgress) onProgress(progress * 100)
  })

  // Write file to MEMFS
  const inputName = 'input' + (file.name.substring(file.name.lastIndexOf('.')) || '.mp4')
  await ffmpeg.writeFile(inputName, await fetchFile(file))

  let outputName = 'output.mp4'
  let args: string[] = []

  if (action === 'compress') {
    const quality = options.quality === 'extreme' ? '28' : options.quality === 'less' ? '20' : '23'
    args = ['-i', inputName, '-vcodec', 'libx264', '-crf', quality, '-preset', 'medium', '-acodec', 'aac', 'output.mp4']
  } else if (action === 'extract-audio') {
    outputName = 'output.mp3'
    const bitrate = options.bitrate || '256k'
    args = ['-i', inputName, '-vn', '-acodec', 'libmp3lame', '-ab', bitrate, '-ar', '44100', 'output.mp3']
  } else if (action === 'to-gif') {
    outputName = 'output.gif'
    const fps = options.fps || '12'
    const scale = options.scale || '480'
    const start = options.start || '0'
    const duration = options.duration || '5'
    args = [
      '-ss', start,
      '-t', duration,
      '-i', inputName,
      '-vf', `fps=${fps},scale=${scale}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
      '-loop', '0',
      'output.gif'
    ]
  } else {
    throw new Error('Unsupported WASM action: ' + action)
  }

  await ffmpeg.exec(args)

  const data = await ffmpeg.readFile(outputName)
  const blob = new Blob([data as unknown as BlobPart], { type: action === 'extract-audio' ? 'audio/mp3' : action === 'to-gif' ? 'image/gif' : 'video/mp4' })

  // Cleanup
  await ffmpeg.deleteFile(inputName)
  await ffmpeg.deleteFile(outputName)

  return blob
}
