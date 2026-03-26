import { formatBytes } from '@/lib/utils'
import type { FileProcessResult, FileResultMetric } from './types'
import { buildOutputFilename, getFileExtension, getResponseFilename } from './file-download'
import { processVideoWasm } from './wasm-media'

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0s'
  const totalSeconds = Math.round(seconds)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const remainingSeconds = totalSeconds % 60

  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

async function probeVideo(previewUrl: string) {
  const video = document.createElement('video')
  video.preload = 'metadata'
  video.muted = true

  await new Promise<void>((resolve, reject) => {
    video.onloadedmetadata = () => resolve()
    video.onerror = () => reject(new Error('Unable to load generated video preview'))
    video.src = previewUrl
  })

  return {
    width: video.videoWidth,
    height: video.videoHeight,
    duration: video.duration,
  }
}

async function probeAudio(previewUrl: string) {
  const audio = document.createElement('audio')
  audio.preload = 'metadata'

  await new Promise<void>((resolve, reject) => {
    audio.onloadedmetadata = () => resolve()
    audio.onerror = () => reject(new Error('Unable to load generated audio preview'))
    audio.src = previewUrl
  })

  return {
    duration: audio.duration,
  }
}

async function buildVideoResult(
  outputBlob: Blob,
  outputFilename: string,
  outputText: string,
  extraMetrics: FileResultMetric[] = [],
  previewType: 'video' | 'image' = 'video'
): Promise<FileProcessResult> {
  const previewUrl = URL.createObjectURL(outputBlob)
  const format = (outputBlob.type.split('/')[1] || getFileExtension(outputFilename, 'mp4')).toUpperCase()

  if (previewType === 'image') {
    return {
      outputBlob,
      outputFilename,
      previewUrl,
      previewType: 'image',
      previewIsObjectUrl: true,
      metrics: [
        { label: 'Format', value: format },
        { label: 'Size', value: formatBytes(outputBlob.size) },
        ...extraMetrics,
      ],
      output: outputText,
    }
  }

  try {
    const metadata = await probeVideo(previewUrl)
    return {
      outputBlob,
      outputFilename,
      previewUrl,
      previewType: 'video',
      previewIsObjectUrl: true,
      metrics: [
        { label: 'Format', value: format },
        { label: 'Resolution', value: `${metadata.width} x ${metadata.height}` },
        { label: 'Duration', value: formatDuration(metadata.duration) },
        { label: 'Size', value: formatBytes(outputBlob.size) },
        ...extraMetrics,
      ],
      output: outputText,
    }
  } catch {
    return {
      outputBlob,
      outputFilename,
      previewUrl,
      previewType: 'video',
      previewIsObjectUrl: true,
      metrics: [
        { label: 'Format', value: format },
        { label: 'Size', value: formatBytes(outputBlob.size) },
        ...extraMetrics,
      ],
      output: outputText,
    }
  }
}

async function buildAudioResult(
  outputBlob: Blob,
  outputFilename: string,
  outputText: string,
  extraMetrics: FileResultMetric[] = []
): Promise<FileProcessResult> {
  const previewUrl = URL.createObjectURL(outputBlob)
  const format = (outputBlob.type.split('/')[1] || getFileExtension(outputFilename, 'mp3')).toUpperCase()

  try {
    const metadata = await probeAudio(previewUrl)
    return {
      outputBlob,
      outputFilename,
      previewUrl,
      previewType: 'audio',
      previewIsObjectUrl: true,
      metrics: [
        { label: 'Format', value: format },
        { label: 'Duration', value: formatDuration(metadata.duration) },
        { label: 'Size', value: formatBytes(outputBlob.size) },
        ...extraMetrics,
      ],
      output: outputText,
    }
  } catch {
    return {
      outputBlob,
      outputFilename,
      previewUrl,
      previewType: 'audio',
      previewIsObjectUrl: true,
      metrics: [
        { label: 'Format', value: format },
        { label: 'Size', value: formatBytes(outputBlob.size) },
        ...extraMetrics,
      ],
      output: outputText,
    }
  }
}

async function estimateBpm(file: File) {
  const audioContext = new window.AudioContext()

  try {
    const arrayBuffer = await file.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0))
    const channel = audioBuffer.getChannelData(0)
    const sampleRate = audioBuffer.sampleRate
    const windowSize = 1024
    const hopSize = 512
    const energies: number[] = []

    for (let i = 0; i < channel.length - windowSize; i += hopSize) {
      let sum = 0
      for (let j = 0; j < windowSize; j++) {
        const sample = channel[i + j]
        sum += sample * sample
      }
      energies.push(Math.sqrt(sum / windowSize))
    }

    const averageEnergy = energies.reduce((sum, value) => sum + value, 0) / Math.max(energies.length, 1)
    const threshold = averageEnergy * 1.5
    const peaks: number[] = []

    for (let i = 1; i < energies.length - 1; i++) {
      const time = (i * hopSize) / sampleRate
      const farEnough = peaks.length === 0 || time - peaks[peaks.length - 1] > 0.25

      if (farEnough && energies[i] > threshold && energies[i] > energies[i - 1] && energies[i] >= energies[i + 1]) {
        peaks.push(time)
      }
    }

    if (peaks.length < 2) {
      throw new Error('Not enough rhythmic peaks were detected')
    }

    const histogram = new Map<number, number>()
    for (let i = 1; i < peaks.length; i++) {
      const interval = peaks[i] - peaks[i - 1]
      if (interval < 0.25 || interval > 2) continue

      let bpm = 60 / interval
      while (bpm < 70) bpm *= 2
      while (bpm > 180) bpm /= 2
      const rounded = Math.round(bpm)
      histogram.set(rounded, (histogram.get(rounded) || 0) + 1)
    }

    const [bestMatch] = Array.from(histogram.entries()).sort((a, b) => b[1] - a[1])
    if (!bestMatch) throw new Error('Unable to estimate BPM')

    return {
      bpm: bestMatch[0],
      confidence: bestMatch[1],
      duration: audioBuffer.duration,
      sampleRate,
      peaks: peaks.length,
    }
  } finally {
    void audioContext.close()
  }
}

export async function handleVideoTool({
  slug,
  file,
  files,
  textInput,
  options = {},
  onProgress,
}: {
  slug: string
  file: File
  files: File[]
  textInput: string
  options?: Record<string, any>
  onProgress?: (progress: number) => void
}): Promise<FileProcessResult> {
  // Use WASM for selected tools
  const wasmSlugs = ['compress-video', 'video-to-mp3', 'video-to-gif']
  if (wasmSlugs.includes(slug)) {
    try {
      const action = slug === 'video-to-mp3' ? 'extract-audio' : slug === 'video-to-gif' ? 'to-gif' : 'compress'
      const outputBlob = await processVideoWasm({ file, action, options, onProgress })
      
      const ext = action === 'extract-audio' ? 'mp3' : action === 'to-gif' ? 'gif' : 'mp4'
      const fallbackFilename = buildOutputFilename(file.name, action, ext)
      const outputText = `Video ${action} complete (WASM)`
      
      if (action === 'extract-audio') {
        return buildAudioResult(outputBlob, fallbackFilename, outputText)
      }
      return buildVideoResult(outputBlob, fallbackFilename, outputText, [], action === 'to-gif' ? 'image' : 'video')
    } catch (error) {
      console.error('WASM processing failed, falling back to API', error)
      // Fallback to API if WASM fails (e.g. browser support)
    }
  }

  const formData = new FormData()

  if (slug === 'gif-maker') {
    files.forEach(image => formData.append('files', image))
    if (textInput.trim()) formData.append('frameDuration', textInput.trim())
    if (typeof options.fps === 'string') formData.append('fps', options.fps)
    if (typeof options.scale === 'string') formData.append('scale', options.scale)
    const response = await fetch('/api/tools/video?action=make-gif', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }

    const outputBlob = await response.blob()
    return buildVideoResult(
      outputBlob,
      getResponseFilename(response, 'animated.gif'),
      `Animated GIF created from ${files.length} images`,
      [
        { label: 'Frames', value: `${files.length} images` },
        { label: 'Frame Delay', value: `${textInput.trim() || '1.2'}s` },
      ],
      'image'
    )
  }

  if (slug === 'merge-video') {
    files.forEach(video => formData.append('files', video))
  } else {
    formData.append('file', file)
  }

  const actionMap: Record<string, string> = {
    'compress-video': 'compress',
    'video-to-mp3': 'extract-audio',
    'trim-video': 'trim',
    'video-to-gif': 'to-gif',
    'change-video-speed': 'speed',
    'mute-video': 'mute',
    'merge-video': 'merge',
    'rotate-video': 'rotate',
    'add-subtitles': 'add-subtitles',
  }

  const action = actionMap[slug] || 'info'
  Object.entries(options).forEach(([key, value]) => {
    if (!value) return
    if (value instanceof File) {
      formData.append(key, value)
      return
    }
    formData.append(key, value)
  })

  if (slug === 'trim-video') {
    const parts = textInput.split(',')
    formData.append('start', parts[0] || '0')
    formData.append('duration', parts[1] || '30')
  }
  if (slug === 'change-video-speed' && !options.speed) formData.append('speed', textInput || '2')

  const response = await fetch(`/api/tools/video?action=${action}`, { method: 'POST', body: formData })
  if (!response.ok) {
    const data = await response.json()
    return { apiError: data.error }
  }

  const outputBlob = await response.blob()
  const ext = action === 'extract-audio' ? 'mp3' : action === 'to-gif' ? 'gif' : 'mp4'
  const fallbackFilename =
    action === 'extract-audio'
      ? buildOutputFilename(file.name, 'audio', ext)
      : action === 'trim'
        ? buildOutputFilename(file.name, 'trimmed', ext)
        : action === 'to-gif'
          ? buildOutputFilename(file.name, 'preview', ext)
          : action === 'speed'
            ? buildOutputFilename(file.name, 'speed', ext)
            : action === 'mute'
              ? buildOutputFilename(file.name, 'muted', ext)
              : action === 'merge'
                ? buildOutputFilename(file.name, 'merged', ext)
                : action === 'rotate'
                  ? buildOutputFilename(file.name, 'rotated', ext)
                  : action === 'add-subtitles'
                    ? buildOutputFilename(file.name, 'captioned', ext)
                    : buildOutputFilename(file.name, 'compressed', ext)

  const outputFilename = getResponseFilename(response, fallbackFilename)
  const outputText = `Video ${action} complete (${formatBytes(outputBlob.size)})`
  const extraMetrics: FileResultMetric[] = []
  const originalSize = response.headers.get('X-Original-Size')
  const processedSize = response.headers.get('X-Output-Size')

  if (action === 'extract-audio') extraMetrics.push({ label: 'Audio', value: 'MP3' })
  if (action === 'trim') extraMetrics.push({ label: 'Trim', value: textInput.trim() || '0, 30' })
  if (action === 'speed') extraMetrics.push({ label: 'Speed', value: `${String(options.speed || textInput || '2')}x` })
  if (action === 'mute') extraMetrics.push({ label: 'Audio Track', value: 'Removed' })
  if (action === 'to-gif') extraMetrics.push({ label: 'Clip', value: 'Animated GIF' })
  if (action === 'merge') extraMetrics.push({ label: 'Clips', value: `${files.length} files` })
  if (action === 'rotate') {
    const transformParts = [options.rotation ? `${options.rotation} deg` : '', options.flip && options.flip !== 'none' ? String(options.flip) : '']
      .filter(Boolean)
      .join(' + ')
    extraMetrics.push({ label: 'Transform', value: transformParts || 'Rotation' })
  }
  if (action === 'add-subtitles') extraMetrics.push({ label: 'Captions', value: 'Burned in' })
  if (originalSize && processedSize) {
    const saved = Number(originalSize) > Number(processedSize)
      ? Math.round((1 - Number(processedSize) / Number(originalSize)) * 100)
      : 0
    extraMetrics.push({ label: 'Saved', value: `${saved}%` })
  }

  if (action === 'extract-audio') {
    return buildAudioResult(outputBlob, outputFilename, outputText, extraMetrics)
  }

  return buildVideoResult(outputBlob, outputFilename, outputText, extraMetrics, action === 'to-gif' ? 'image' : 'video')
}

export async function handleAudioTool({
  slug,
  file,
  files,
  textInput,
  audioFmt,
  options = {},
}: {
  slug: string
  file: File
  files: File[]
  textInput: string
  audioFmt: string
  options?: Record<string, string | File | undefined>
}): Promise<FileProcessResult> {
  if (slug === 'speech-to-text') {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('/api/tools/audio/transcribe', { method: 'POST', body: formData })
    const data = await response.json()
    if (!response.ok) return { apiError: data.error || data.hint }
    return { output: `Transcription:\n\n${data.text}` }
  }

  if (slug === 'bpm-detector') {
    try {
      const result = await estimateBpm(file)
      return {
        output: `Estimated BPM: ${result.bpm}\nConfidence peaks: ${result.confidence}\nDuration: ${result.duration.toFixed(1)} seconds\nSample rate: ${result.sampleRate} Hz\nDetected beats: ${result.peaks}`,
      }
    } catch (error) {
      return { apiError: `BPM detection failed: ${(error as Error).message}` }
    }
  }

  const formData = new FormData()

  if (slug === 'merge-audio') {
    files.forEach(audio => formData.append('files', audio))
    const response = await fetch('/api/tools/audio?action=merge', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }

    return {
      ...(await buildAudioResult(
        await response.blob(),
        getResponseFilename(response, 'merged-audio.mp3'),
        `Merged ${files.length} audio tracks`,
        [{ label: 'Tracks', value: `${files.length}` }]
      )),
    }
  }

  formData.append('file', file)

  const actionMap: Record<string, string> = {
    'convert-audio': 'convert',
    'trim-audio': 'trim',
    'compress-audio': 'compress',
    'change-audio-speed': 'speed',
    'audio-equalizer': 'equalizer',
    'audio-metadata-editor': 'metadata',
    'remove-vocals': 'remove-vocals',
    'trim-silence': 'trim-silence',
    'volume-booster': 'volume',
  }

  const action = actionMap[slug] || 'convert'
  Object.entries(options).forEach(([key, value]) => {
    if (!value || value instanceof File) return
    formData.append(key, value)
  })
  if (action === 'convert') formData.append('to', audioFmt)
  if (action === 'trim') {
    const parts = textInput.split(',')
    formData.append('start', parts[0] || '0')
    formData.append('duration', parts[1] || '30')
  }
  if (action === 'speed' && !options.speed) formData.append('speed', textInput || '1.25')

  const response = await fetch(`/api/tools/audio?action=${action}`, { method: 'POST', body: formData })
  if (!response.ok) {
    const data = await response.json()
    return { apiError: data.error }
  }

  const originalExtension = getFileExtension(file.name, audioFmt || 'mp3')
  const fallbackFilename =
    action === 'convert'
      ? buildOutputFilename(file.name, 'converted', audioFmt)
      : action === 'trim'
        ? buildOutputFilename(file.name, 'trimmed', originalExtension)
        : action === 'speed'
          ? buildOutputFilename(file.name, 'speed', 'mp3')
          : action === 'equalizer'
            ? buildOutputFilename(file.name, 'equalized', 'mp3')
            : action === 'metadata'
              ? buildOutputFilename(file.name, 'tagged', 'mp3')
              : action === 'remove-vocals'
                ? buildOutputFilename(file.name, 'instrumental', 'mp3')
                : action === 'trim-silence'
                  ? buildOutputFilename(file.name, 'cleaned', 'mp3')
                  : action === 'volume'
                    ? buildOutputFilename(file.name, 'boosted', 'mp3')
                    : buildOutputFilename(file.name, 'compressed', 'mp3')

  const extraMetrics: FileResultMetric[] = []
  const originalSize = response.headers.get('X-Original-Size')
  const processedSize = response.headers.get('X-Output-Size')

  if (action === 'convert') extraMetrics.push({ label: 'Target', value: audioFmt.toUpperCase() })
  if (action === 'trim') extraMetrics.push({ label: 'Trim', value: textInput.trim() || '0, 30' })
  if (action === 'speed') extraMetrics.push({ label: 'Speed', value: `${String(options.speed || textInput || '1.25')}x` })
  if (action === 'equalizer') extraMetrics.push({ label: 'EQ', value: String(options.preset || 'balanced') })
  if (action === 'metadata') extraMetrics.push({ label: 'Metadata', value: 'Updated' })
  if (action === 'remove-vocals') extraMetrics.push({ label: 'Mode', value: 'Center cut' })
  if (action === 'trim-silence') extraMetrics.push({ label: 'Silence trim', value: `${String(options.threshold || '-45')} dB` })
  if (action === 'volume') extraMetrics.push({ label: 'Gain', value: `+${String(options.boost || '4')} dB` })
  if (originalSize && processedSize) {
    const saved = Number(originalSize) > Number(processedSize)
      ? Math.round((1 - Number(processedSize) / Number(originalSize)) * 100)
      : 0
    extraMetrics.push({ label: 'Saved', value: `${saved}%` })
  }

  return buildAudioResult(
    await response.blob(),
    getResponseFilename(response, fallbackFilename),
    `Audio ${action} complete`,
    extraMetrics
  )
}
