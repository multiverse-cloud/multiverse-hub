'use client'

import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ClipboardPaste,
  Download,
  ExternalLink,
  Film,
  Image as ImageIcon,
  Link2,
  Loader2,
  ScanSearch,
  Music4,
  Play,
  RefreshCw,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
  Youtube,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import { buildDropzoneAccept, formatAcceptedFormats } from './file-accept'
import { handleVideoTool } from './processors/file-media'
import type { FilePreviewType, FileProcessResult, FileResultMetric } from './processors/types'

type QueueItem = { id: string; file: File; previewUrl: string }
type ThumbnailVariant = { label: string; size: string; url: string }

const VIDEO_COPY = {
  'compress-video': { eyebrow: 'Editorial compression', title: 'Compress Video', summary: 'Reduce file size with cleaner delivery presets and a real before-after result state.', badges: ['Smaller exports', 'Source preview', 'Fast download'], actionLabel: 'Compress video', emptyTitle: 'Compressed result appears here', tip: 'Recommended keeps the best balance for uploads and sharing.' },
  'video-to-mp3': { eyebrow: 'Studio audio extraction', title: 'Video to MP3', summary: 'Extract audio cleanly from interviews, reels, and long-form video files.', badges: ['MP3 output', 'Bitrate control', 'Audio preview'], actionLabel: 'Extract audio', emptyTitle: 'MP3 result appears here', tip: '320 kbps is best when you want the cleanest output for re-use.' },
  'trim-video': { eyebrow: 'Precision cut editor', title: 'Trim Video', summary: 'Set clean start and end points without losing the original pace of the clip.', badges: ['Quick cut presets', 'Clip timing', 'Ready to export'], actionLabel: 'Trim clip', emptyTitle: 'Trimmed clip appears here', tip: 'Short social clips usually feel best around 15 to 30 seconds.' },
  'video-to-gif': { eyebrow: 'Loop export studio', title: 'Video to GIF', summary: 'Turn a short part of your video into a compact GIF with cleaner timing and size control.', badges: ['FPS control', 'Clip duration', 'GIF preview'], actionLabel: 'Create GIF', emptyTitle: 'GIF export appears here', tip: 'Use shorter clips and lower FPS for smaller GIF files.' },
  'youtube-thumbnail-downloader': { eyebrow: 'Thumbnail extraction', title: 'YouTube Thumbnail Downloader', summary: 'Paste a YouTube link and pull the available thumbnail sizes in one clean workspace.', badges: ['Max resolution', 'Instant preview', 'All variants'], actionLabel: 'Download thumbnails', emptyTitle: 'Thumbnail preview appears here', tip: 'If max resolution is unavailable, use the HD or standard version instead.' },
  'change-video-speed': { eyebrow: 'Playback timing', title: 'Change Video Speed', summary: 'Speed up or slow down footage with direct presets and a cleaner export flow.', badges: ['0.75x to 2x', 'Pitch-safe audio', 'Live-ready output'], actionLabel: 'Process speed', emptyTitle: 'Speed-adjusted result appears here', tip: '1.25x and 1.5x are usually the cleanest for tutorials and talking-head clips.' },
  'mute-video': { eyebrow: 'Audio removal', title: 'Mute Video', summary: 'Remove the audio track and keep the visual timeline ready for silent playback.', badges: ['No audio track', 'Fast export', 'Clean preview'], actionLabel: 'Mute video', emptyTitle: 'Muted result appears here', tip: 'Muted exports are useful for ads, b-roll, and silent social loops.' },
  'gif-maker': { eyebrow: 'Frame sequence builder', title: 'GIF Maker', summary: 'Turn a group of images into one animated GIF with a simple sequence view.', badges: ['Image sequence', 'Frame delay', 'Animated output'], actionLabel: 'Build GIF', emptyTitle: 'Animated GIF appears here', tip: 'Lower frame delay creates faster motion. Use 0.6s to 1.2s for most loops.' },
  'merge-video': { eyebrow: 'Sequence assembly', title: 'Merge Video', summary: 'Upload clips, arrange the order, and export one combined video file.', badges: ['Multi-file queue', 'Order controls', 'Merged output'], actionLabel: 'Merge videos', emptyTitle: 'Merged result appears here', tip: 'Use clips with similar resolution and frame rate for the cleanest merge.' },
  'rotate-video': { eyebrow: 'Orientation control', title: 'Rotate Video', summary: 'Correct orientation with quick rotate and flip controls before export.', badges: ['Rotate 90/180', 'Flip options', 'Corrected preview'], actionLabel: 'Rotate video', emptyTitle: 'Corrected result appears here', tip: 'Use horizontal flip for mirrored selfie footage or front-camera recordings.' },
  'add-subtitles': { eyebrow: 'Caption burn-in', title: 'Add Subtitles', summary: 'Upload a subtitle file or paste SRT text and burn captions directly into the video.', badges: ['SRT support', 'Burned captions', 'Preview-ready export'], actionLabel: 'Add subtitles', emptyTitle: 'Captioned result appears here', tip: 'Paste valid SRT text if you do not have a separate subtitle file.' },
  'screen-recorder': { eyebrow: 'Live browser capture', title: 'Screen Recorder', summary: 'Record your screen, camera, or both directly in your browser with high-quality exports.', badges: ['No install', 'Privacy first', 'HD Recording'], actionLabel: 'Start recording', emptyTitle: 'Recording will appear here', tip: 'Enable microphone and camera permissions for a full studio experience.' },
  'convert-video': { eyebrow: 'Format transformation', title: 'Convert Video', summary: 'Change video formats between MP4, WebM, and MOV with high-fidelity output.', badges: ['Multi-format', 'Fast conversion', 'High quality'], actionLabel: 'Convert video', emptyTitle: 'Converted file appears here', tip: 'WebM is often best for web performance and transparent backgrounds.' },
  'resize-video': { eyebrow: 'Timeline dimensions', title: 'Resize Video', summary: 'Scale your video dimensions for different social platforms and display sizes.', badges: ['Aspect ratios', 'Custom scale', 'Batch-ready'], actionLabel: 'Resize video', emptyTitle: 'Resized video appears here', tip: 'Using standard aspect ratios like 16:9 or 9:16 ensures best playback.' },
  'extract-audio': { eyebrow: 'Studio audio extraction', title: 'Extract Audio', summary: 'Pull clear audio tracks from any video file for podcasts, samples, or reels.', badges: ['MP3 output', 'Fast extraction', 'Audio preview'], actionLabel: 'Extract audio', emptyTitle: 'Audio track appears here', tip: 'Extracting at high bitrates preserves the best sound quality for editing.' },
} as const

const PROCESS_MESSAGES: Record<string, { idle: string; loading: string; done: string }> = {
  'compress-video': { idle: 'Waiting for file', loading: 'Compressing source video', done: 'Compression complete' },
  'video-to-mp3': { idle: 'Waiting for video', loading: 'Extracting audio track', done: 'Audio is ready' },
  'trim-video': { idle: 'Waiting for clip', loading: 'Cutting selected range', done: 'Trimmed clip ready' },
  'video-to-gif': { idle: 'Waiting for video', loading: 'Rendering GIF frames', done: 'GIF export ready' },
  'youtube-thumbnail-downloader': { idle: 'Paste a YouTube URL', loading: 'Fetching thumbnail variants', done: 'Thumbnails loaded' },
  'change-video-speed': { idle: 'Waiting for video', loading: 'Adjusting playback speed', done: 'Speed update ready' },
  'mute-video': { idle: 'Waiting for video', loading: 'Removing audio track', done: 'Muted export ready' },
  'gif-maker': { idle: 'Add images to sequence', loading: 'Building animated GIF', done: 'GIF sequence ready' },
  'merge-video': { idle: 'Add at least two clips', loading: 'Merging queued clips', done: 'Merged export ready' },
  'rotate-video': { idle: 'Waiting for video', loading: 'Applying orientation changes', done: 'Orientation corrected' },
  'add-subtitles': { idle: 'Add video and subtitles', loading: 'Burning captions into video', done: 'Captioned export ready' },
  'screen-recorder': { idle: 'Ready to capture', loading: 'Recording screen', done: 'Recording complete' },
  'convert-video': { idle: 'Waiting for file', loading: 'Converting video format', done: 'Conversion finished' },
  'resize-video': { idle: 'Waiting for file', loading: 'Resizing dimensions', done: 'Resize complete' },
  'extract-audio': { idle: 'Waiting for video', loading: 'Extracting audio track', done: 'Audio is ready' },
}

const DEFAULT_SRT = `1
00:00:00,000 --> 00:00:03,500
Your first subtitle line.

2
00:00:03,500 --> 00:00:06,500
Add the next subtitle line here.`

function createQueueItems(files: File[]) {
  return files.map(file => ({ id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`, file, previewUrl: URL.createObjectURL(file) }))
}

function revokeQueueItems(items: QueueItem[]) {
  items.forEach(item => URL.revokeObjectURL(item.previewUrl))
}

function getYouTubeVideoId(input: string) {
  const patterns = [/(?:v=)([a-zA-Z0-9_-]{11})/, /youtu\.be\/([a-zA-Z0-9_-]{11})/, /embed\/([a-zA-Z0-9_-]{11})/, /shorts\/([a-zA-Z0-9_-]{11})/]
  for (const pattern of patterns) {
    const match = input.match(pattern)
    if (match?.[1]) return match[1]
  }
  return ''
}

function getPreviewType(file: File | undefined): FilePreviewType {
  if (!file) return 'video'
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('audio/')) return 'audio'
  return 'video'
}

function metricValue(metrics: FileResultMetric[] | undefined, label: string, fallback = 'Pending') {
  return metrics?.find(item => item.label === label)?.value || fallback
}

function MediaSurface({ url, type, alt }: { url: string; type: FilePreviewType; alt: string }) {
  if (type === 'audio') {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center bg-slate-50 p-6 dark:bg-slate-950/30">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
              <Music4 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50">{alt}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Preview the extracted audio.</p>
            </div>
          </div>
          <audio src={url} controls className="w-full" />
        </div>
      </div>
    )
  }

  if (type === 'image') {
    return (
      <div className="relative h-full w-full bg-slate-50 dark:bg-slate-950/30">
        <Image src={url} alt={alt} fill unoptimized sizes="(max-width: 768px) 100vw, 900px" className="object-contain" />
      </div>
    )
  }

  return <video src={url} controls className="h-full w-full bg-slate-950 object-contain" />
}

async function downloadRemoteImage(url: string, filename: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Unable to download this thumbnail')
  const blob = await response.blob()
  downloadBlob(blob, filename)
}

export default function VideoStudio({ tool }: { tool: Tool }) {
  const copy = VIDEO_COPY[tool.slug as keyof typeof VIDEO_COPY]
  const processMessage = PROCESS_MESSAGES[tool.slug]
  const multiple = tool.slug === 'merge-video' || tool.slug === 'gif-maker'
  const acceptedFormats = useMemo(() => (tool.acceptedFormats?.length ? tool.acceptedFormats : ['.mp4', '.mov', '.webm']), [tool.acceptedFormats])
  const accept = useMemo(() => buildDropzoneAccept(acceptedFormats), [acceptedFormats])
  const acceptLabel = useMemo(() => formatAcceptedFormats(acceptedFormats), [acceptedFormats])
  const subtitleInputRef = useRef<HTMLInputElement | null>(null)

  const [queue, setQueue] = useState<QueueItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null)
  const [subtitleFilename, setSubtitleFilename] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [thumbnailVariants, setThumbnailVariants] = useState<ThumbnailVariant[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [result, setResult] = useState<FileProcessResult | null>(null)
  const [compressPreset, setCompressPreset] = useState('recommended')
  const [bitrate, setBitrate] = useState('256k')
  const [trimStart, setTrimStart] = useState('0')
  const [trimDuration, setTrimDuration] = useState('30')
  const [gifStart, setGifStart] = useState('0')
  const [gifDuration, setGifDuration] = useState('5')
  const [gifFps, setGifFps] = useState('12')
  const [gifScale, setGifScale] = useState('640')
  const [frameDelay, setFrameDelay] = useState('1.2')
  const [speedValue, setSpeedValue] = useState('1.25')
  const [rotationValue, setRotationValue] = useState('90')
  const [flipMode, setFlipMode] = useState<'none' | 'horizontal' | 'vertical'>('none')
  const [subtitleText, setSubtitleText] = useState(DEFAULT_SRT)

  const activeItem = queue.find(item => item.id === activeId) || queue[0] || null
  const sourcePreviewType = getPreviewType(activeItem?.file)
  const hasVideoInput = tool.slug === 'youtube-thumbnail-downloader' ? urlInput.trim().length > 0 : queue.length > 0
  const statusLabel = loading ? processMessage.loading : result ? processMessage.done : processMessage.idle

  useEffect(() => () => {
    revokeQueueItems(queue)
    if (result?.previewIsObjectUrl && result.previewUrl) URL.revokeObjectURL(result.previewUrl)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function clearResult() {
    setError('')
    setThumbnailVariants([])
    setResult(current => {
      if (current?.previewIsObjectUrl && current.previewUrl) URL.revokeObjectURL(current.previewUrl)
      return null
    })
  }

  function resetAll() {
    setQueue(current => {
      revokeQueueItems(current)
      return []
    })
    setActiveId(null)
    setSubtitleFile(null)
    setSubtitleFilename('')
    setUrlInput('')
    setCompressPreset('recommended')
    setBitrate('256k')
    setTrimStart('0')
    setTrimDuration('30')
    setGifStart('0')
    setGifDuration('5')
    setGifFps('12')
    setGifScale('640')
    setFrameDelay('1.2')
    setSpeedValue('1.25')
    setRotationValue('90')
    setFlipMode('none')
    setSubtitleText(DEFAULT_SRT)
    setProgress(0)
    clearResult()
  }

  function appendToQueue(files: File[]) {
    if (files.length === 0) return
    clearResult()
    setQueue(current => {
      const nextItems = createQueueItems(files)
      if (!multiple) revokeQueueItems(current)
      const nextQueue = multiple ? [...current, ...nextItems] : nextItems
      setActiveId(nextQueue[0]?.id || null)
      return nextQueue
    })
  }

  function moveItem(id: string, direction: 'up' | 'down') {
    setQueue(current => {
      const index = current.findIndex(item => item.id === id)
      if (index === -1) return current
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= current.length) return current
      const next = [...current]
      const [item] = next.splice(index, 1)
      next.splice(targetIndex, 0, item)
      return next
    })
  }

  function removeItem(id: string) {
    setQueue(current => {
      const item = current.find(entry => entry.id === id)
      if (item) URL.revokeObjectURL(item.previewUrl)
      const next = current.filter(entry => entry.id !== id)
      setActiveId(next[0]?.id || null)
      return next
    })
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ accept, multiple, noClick: true, onDropAccepted: appendToQueue })

  function startProgress() {
    setProgress(6)
    const interval = window.setInterval(() => setProgress(current => (current < 88 ? current + Math.random() * 7 : current)), 320)
    return () => {
      window.clearInterval(interval)
      setProgress(100)
    }
  }

  async function handleProcess() {
    clearResult()

    if (tool.slug === 'youtube-thumbnail-downloader') {
      const videoId = getYouTubeVideoId(urlInput.trim())
      if (!videoId) {
        setError('Paste a valid YouTube video URL.')
        return
      }
      setLoading(true)
      const done = startProgress()
      try {
        const variants = [
          { label: 'Max resolution', size: '1280 x 720', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
          { label: 'Standard', size: '640 x 480', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
          { label: 'High quality', size: '480 x 360', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
          { label: 'Medium', size: '320 x 180', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
          { label: 'Default', size: '120 x 90', url: `https://img.youtube.com/vi/${videoId}/default.jpg` },
        ]
        setThumbnailVariants(variants)
        setResult({ previewUrl: variants[0].url, previewType: 'image', metrics: [{ label: 'Video ID', value: videoId }, { label: 'Variants', value: `${variants.length} sizes` }, { label: 'Best match', value: variants[0].size }], output: variants.map(item => `${item.label}: ${item.url}`).join('\n') })
      } finally {
        done()
        setLoading(false)
      }
      return
    }

    if (queue.length === 0) {
      setError('Upload the required file before processing.')
      return
    }
    if (tool.slug === 'merge-video' && queue.length < 2) {
      setError('Upload at least two video clips to merge.')
      return
    }
    if (tool.slug === 'add-subtitles' && !subtitleFile && !subtitleText.trim()) {
      setError('Upload an SRT file or paste SRT subtitle text.')
      return
    }

    const isWasm = ['compress-video', 'video-to-mp3', 'video-to-gif'].includes(tool.slug)
    setLoading(true)
    const done = !isWasm ? startProgress() : () => { setProgress(100) }
    try {
      const leadFile = activeItem?.file || queue[0].file
      const options: Record<string, string | File | undefined> = {}
      let textInput = ''

      if (tool.slug === 'compress-video') options.quality = compressPreset
      if (tool.slug === 'video-to-mp3') options.bitrate = bitrate
      if (tool.slug === 'trim-video') textInput = `${trimStart},${trimDuration}`
      if (tool.slug === 'video-to-gif') Object.assign(options, { start: gifStart, duration: gifDuration, fps: gifFps, scale: gifScale })
      if (tool.slug === 'change-video-speed') {
        options.speed = speedValue
        textInput = speedValue
      }
      if (tool.slug === 'rotate-video') Object.assign(options, { rotation: rotationValue, flip: flipMode })
      if (tool.slug === 'add-subtitles') {
        if (subtitleFile) options.subtitleFile = subtitleFile
        if (subtitleText.trim()) options.subtitleText = subtitleText.trim()
      }
      if (tool.slug === 'gif-maker') {
        textInput = frameDelay
        Object.assign(options, { fps: gifFps, scale: gifScale })
      }

      const nextResult = await handleVideoTool({ 
        slug: tool.slug, 
        file: leadFile, 
        files: queue.map(item => item.file), 
        textInput, 
        options,
        onProgress: isWasm ? setProgress : undefined
      })
      if (nextResult.apiError) {
        setError(nextResult.apiError)
        return
      }
      setResult(nextResult)
    } finally {
      done()
      setLoading(false)
    }
  }

  async function handleThumbnailDownload(variant: ThumbnailVariant) {
    try {
      const videoId = metricValue(result?.metrics, 'Video ID', 'thumbnail')
      await downloadRemoteImage(variant.url, `${videoId}-${variant.label.toLowerCase().replace(/\s+/g, '-')}.jpg`)
    } catch {
      window.open(variant.url, '_blank', 'noopener,noreferrer')
    }
  }

  if (tool.slug === 'youtube-thumbnail-downloader') {
    const leadVariant = thumbnailVariants[0] || null
    const videoId = metricValue(result?.metrics, 'Video ID', '')

    return (
      <div className="space-y-5" data-tool-shell="true">
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-red-700 ring-1 ring-red-100 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-900/40">
            <Youtube className="h-4 w-4" />
            YouTube thumbnails
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            YouTube Thumbnail Downloader
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
            Paste a public YouTube video, Shorts, or share URL and download the available thumbnail sizes instantly.
          </p>
        </header>

        <section className="overflow-hidden rounded-[22px] bg-white shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/80 dark:bg-slate-900 dark:ring-slate-800">
          <div className="border-b border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/50 sm:p-4">
            <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex min-h-[54px] items-center gap-2 rounded-[15px] bg-white px-3 ring-1 ring-slate-200/80 focus-within:ring-red-300 dark:bg-slate-900 dark:ring-slate-800 dark:focus-within:ring-red-800">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300">
                  <Link2 className="h-4 w-4" />
                </div>
                <input
                  value={urlInput}
                  onChange={event => setUrlInput(event.target.value)}
                  onKeyDown={event => event.key === 'Enter' && void handleProcess()}
                  placeholder="Paste YouTube video or Shorts URL"
                  className="min-w-0 flex-1 bg-transparent py-3 text-[15px] font-semibold text-slate-950 outline-none placeholder:font-medium placeholder:text-slate-400 dark:text-slate-50 dark:placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={async () => {
                    const pasted = await navigator.clipboard.readText().catch(() => '')
                    if (pasted) setUrlInput(pasted)
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  title="Paste URL"
                >
                  <ClipboardPaste className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setUrlInput('')}
                  disabled={!urlInput}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  title="Clear"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleProcess}
                disabled={loading || !urlInput.trim()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[15px] bg-slate-950 px-5 text-sm font-black text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.8)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-55 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:min-w-[160px]"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanSearch className="h-4 w-4" />}
                Download
              </button>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_380px]">
            <div className="p-3 sm:p-4">
              <div className="relative aspect-video overflow-hidden rounded-[18px] bg-slate-100 dark:bg-slate-950">
                {leadVariant ? (
                  <Image src={leadVariant.url} alt="Best YouTube thumbnail preview" fill className="object-cover" unoptimized sizes="(max-width: 1024px) 100vw, 820px" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950 dark:text-slate-50">Thumbnail preview</h2>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Paste a YouTube link to load max resolution, HD, medium, and default thumbnail variants.
                    </p>
                  </div>
                )}
                {leadVariant ? (
                  <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                    {leadVariant.label} · {leadVariant.size}
                  </div>
                ) : null}
              </div>
            </div>

            <aside className="border-t border-slate-100 p-3 dark:border-slate-800 sm:p-4 lg:border-l lg:border-t-0">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Variants</p>
                  <h2 className="mt-1 text-lg font-black text-slate-950 dark:text-slate-50">
                    {thumbnailVariants.length ? `${thumbnailVariants.length} sizes ready` : 'Ready to fetch'}
                  </h2>
                </div>
                {videoId ? (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {videoId}
                  </span>
                ) : null}
              </div>

              {thumbnailVariants.length > 0 ? (
                <div className="space-y-2.5">
                  {thumbnailVariants.map(variant => (
                    <div key={variant.label} className="grid grid-cols-[82px_minmax(0,1fr)_auto] items-center gap-3 rounded-[16px] bg-slate-50 p-2 ring-1 ring-slate-200/80 dark:bg-slate-950/55 dark:ring-slate-800">
                      <div className="relative aspect-video overflow-hidden rounded-[11px] bg-slate-200 dark:bg-slate-900">
                        <Image src={variant.url} alt={variant.label} fill className="object-cover" unoptimized sizes="96px" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-slate-950 dark:text-slate-50">{variant.label}</p>
                        <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">{variant.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleThumbnailDownload(variant)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-[13px] bg-white text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800 dark:hover:bg-white dark:hover:text-slate-950"
                        title={`Download ${variant.label}`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center dark:border-slate-800 dark:bg-slate-950/50">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No thumbnail loaded yet.</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Use a public YouTube URL. Some videos may not provide max resolution.</p>
                </div>
              )}

              {error ? (
                <div className="mt-3 rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/25 dark:text-red-300">
                  {error}
                </div>
              ) : null}
            </aside>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-8" data-tool-shell="true">
      <header className="max-w-3xl">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">{copy.badges.map(item => <span key={item} className="premium-chip">{item}</span>)}</div>
        <p className="mt-3 premium-kicker sm:mt-6">{copy.eyebrow}</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-slate-50">{copy.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7 dark:text-slate-300">{copy.summary}</p>
      </header>

      <div className={cn('grid gap-6', tool.slug === 'youtube-thumbnail-downloader' ? '' : 'xl:grid-cols-[minmax(0,1.15fr)_360px]')}>
        <div className="space-y-5">
          <section className="premium-panel p-5 sm:p-6">
            {tool.slug === 'youtube-thumbnail-downloader' ? (
              <>
                <p className="premium-kicker">Source link</p>
                <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Paste YouTube URL</h2>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"><Link2 className="h-4 w-4" /></div>
                    <input value={urlInput} onChange={event => setUrlInput(event.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500" />
                    <button type="button" onClick={async () => {
                      const pasted = await navigator.clipboard.readText().catch(() => '')
                      if (pasted) setUrlInput(pasted)
                    }} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800" title="Paste URL"><ClipboardPaste className="h-4 w-4" /></button>
                    <button type="button" onClick={() => setUrlInput('')} disabled={!urlInput} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800" title="Clear"><X className="h-4 w-4" /></button>
                    <button type="button" onClick={handleProcess} disabled={loading || !urlInput.trim()} className="btn-primary px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Fetch'}</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div {...getRootProps()} className={cn('rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-6 text-center transition-all dark:border-slate-800 dark:bg-slate-950/30 sm:rounded-2xl sm:border-2 sm:px-6 sm:py-10', isDragActive && 'border-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/20')}>
                  <input {...getInputProps()} />
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 sm:mb-5 sm:h-14 sm:w-14 sm:rounded-2xl"><UploadCloud className="h-5 w-5 sm:h-6 sm:w-6" /></div>
                  <h2 className="font-display text-base font-extrabold tracking-tight text-slate-950 sm:text-xl dark:text-slate-50">{tool.slug === 'gif-maker' ? 'Drop image sequence here' : tool.slug === 'merge-video' ? 'Drop video clips here' : 'Drop source file here'}</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{activeItem ? `${formatBytes(activeItem.file.size)} ready to process` : acceptLabel}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button type="button" onClick={open} className="btn-primary px-5 py-2.5 text-sm">Choose file{multiple ? 's' : ''}</button>
                    {tool.slug === 'add-subtitles' && <button type="button" onClick={() => subtitleInputRef.current?.click()} className="btn-secondary px-5 py-2.5 text-sm">Add SRT file</button>}
                  </div>
                </div>
                {tool.slug === 'add-subtitles' && (
                  <>
                    <input ref={subtitleInputRef} type="file" accept=".srt,.vtt,text/plain" className="hidden" onChange={event => {
                      const nextFile = event.target.files?.[0] || null
                      setSubtitleFile(nextFile)
                      setSubtitleFilename(nextFile?.name || '')
                    }} />
                    {subtitleFilename && <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">Subtitle file: <span className="font-semibold text-slate-950 dark:text-slate-50">{subtitleFilename}</span></div>}
                  </>
                )}
              </>
            )}
          </section>

          {tool.slug !== 'youtube-thumbnail-downloader' && hasVideoInput && (
            <div className="flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={handleProcess}
                disabled={loading || queue.length === 0 || (tool.slug === 'merge-video' && queue.length < 2)}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                {copy.actionLabel}
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-100 px-3 text-slate-700 transition active:scale-[0.98] dark:bg-slate-800 dark:text-slate-100"
                aria-label="Reset workspace"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          )}

          {tool.slug !== 'youtube-thumbnail-downloader' && (
            <section className="premium-panel overflow-hidden">
              {activeItem ? (
                <>
                  <div className="relative h-[320px] bg-slate-950 sm:h-[380px]"><MediaSurface url={activeItem.previewUrl} type={sourcePreviewType} alt={activeItem.file.name} /></div>
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
                    <div>
                      <p className="font-display text-base font-bold tracking-tight text-slate-950 dark:text-slate-50">{activeItem.file.name}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{formatBytes(activeItem.file.size)}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{sourcePreviewType === 'image' ? <ImageIcon className="h-3.5 w-3.5" /> : <Film className="h-3.5 w-3.5" />}Source preview</div>
                  </div>
                </>
              ) : (
                <div className="hidden h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-400 sm:flex">{copy.emptyTitle}</div>
              )}
            </section>
          )}

          {multiple && queue.length > 0 && (
            <section className="premium-panel p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="premium-kicker">{tool.slug === 'merge-video' ? 'Merge queue' : 'Frame sequence'}</p>
                  <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">{tool.slug === 'merge-video' ? 'Arrange clips' : 'Arrange images'}</h2>
                </div>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{queue.length} items</span>
              </div>
              <div className="space-y-3">
                {queue.map((item, index) => (
                  <div key={item.id} className={cn('flex items-center gap-4 rounded-2xl border px-4 py-3 transition-all', activeItem?.id === item.id ? 'border-indigo-300 bg-indigo-50/70 shadow-sm dark:border-indigo-800 dark:bg-indigo-950/20' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900')}>
                    <button type="button" onClick={() => setActiveId(item.id)} className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"><Image src={item.previewUrl} alt={item.file.name} fill unoptimized sizes="96px" className="object-cover" /></button>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50">{item.file.name}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">#{index + 1} • {formatBytes(item.file.size)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveItem(item.id, 'up')} className="btn-secondary px-2.5 py-2 text-xs" disabled={index === 0}><ArrowUp className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => moveItem(item.id, 'down')} className="btn-secondary px-2.5 py-2 text-xs" disabled={index === queue.length - 1}><ArrowDown className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => removeItem(item.id)} className="btn-secondary px-2.5 py-2 text-xs"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="premium-panel p-5 sm:p-6">
            <div className="mb-4">
              <p className="premium-kicker">{tool.slug === 'youtube-thumbnail-downloader' ? 'Download variants' : 'Processing options'}</p>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">{tool.slug === 'youtube-thumbnail-downloader' ? 'Available sizes' : 'Tune output'}</h2>
            </div>

            {tool.slug === 'youtube-thumbnail-downloader' ? (
              thumbnailVariants.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {thumbnailVariants.map(variant => (
                    <div key={variant.label} className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:shadow-lg hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800">
                      <div className="relative aspect-video bg-slate-100 dark:bg-slate-950">
                        <Image src={variant.url} alt={variant.label} fill className="object-cover" unoptimized />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                          <a href={variant.url} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-0 transition-all hover:scale-110 group-hover:opacity-100 dark:bg-slate-900/90 dark:text-slate-200">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="font-display text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50">{variant.label}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{variant.size}</p>
                        <div className="mt-4">
                          <button type="button" onClick={() => handleThumbnailDownload(variant)} className="w-full btn-primary px-4 py-2.5 text-sm"><Download className="h-4 w-4" />Download</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-400">Paste a YouTube URL and fetch the thumbnail set.</div>
              )
            ) : (
              <div className="space-y-4">
                {tool.slug === 'compress-video' && <div className="flex flex-wrap gap-2">{[['extreme', 'Extreme'], ['recommended', 'Recommended'], ['less', 'Less']].map(([value, label]) => <button key={value} type="button" onClick={() => setCompressPreset(value)} className={cn('premium-option-chip', compressPreset === value && 'premium-option-chip-active')}>{label}</button>)}</div>}
                {tool.slug === 'video-to-mp3' && <div className="flex flex-wrap gap-2">{['128k', '192k', '256k', '320k'].map(value => <button key={value} type="button" onClick={() => setBitrate(value)} className={cn('premium-option-chip', bitrate === value && 'premium-option-chip-active')}>{value}</button>)}</div>}
                {tool.slug === 'trim-video' && <div className="grid gap-4 sm:grid-cols-2"><input value={trimStart} onChange={event => setTrimStart(event.target.value)} className="premium-field" placeholder="Start seconds" /><input value={trimDuration} onChange={event => setTrimDuration(event.target.value)} className="premium-field" placeholder="Duration seconds" /></div>}
                {tool.slug === 'video-to-gif' && <div className="grid gap-4 sm:grid-cols-2"><input value={gifStart} onChange={event => setGifStart(event.target.value)} className="premium-field" placeholder="Start seconds" /><input value={gifDuration} onChange={event => setGifDuration(event.target.value)} className="premium-field" placeholder="Duration seconds" /><input value={gifFps} onChange={event => setGifFps(event.target.value)} className="premium-field" placeholder="FPS" /><input value={gifScale} onChange={event => setGifScale(event.target.value)} className="premium-field" placeholder="Width" /></div>}
                {tool.slug === 'change-video-speed' && <div className="flex flex-wrap gap-2">{['0.75', '1', '1.25', '1.5', '2'].map(value => <button key={value} type="button" onClick={() => setSpeedValue(value)} className={cn('premium-option-chip', speedValue === value && 'premium-option-chip-active')}>{value}x</button>)}</div>}
                {tool.slug === 'mute-video' && <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-300">The audio track will be removed from the final export.</div>}
                {tool.slug === 'gif-maker' && <div className="grid gap-4 sm:grid-cols-3"><input value={frameDelay} onChange={event => setFrameDelay(event.target.value)} className="premium-field" placeholder="Frame delay" /><input value={gifFps} onChange={event => setGifFps(event.target.value)} className="premium-field" placeholder="FPS" /><input value={gifScale} onChange={event => setGifScale(event.target.value)} className="premium-field" placeholder="Width" /></div>}
                {tool.slug === 'rotate-video' && <div className="space-y-4"><div className="flex flex-wrap gap-2">{[['90', '90°'], ['180', '180°'], ['270', '270°']].map(([value, label]) => <button key={value} type="button" onClick={() => setRotationValue(value)} className={cn('premium-option-chip', rotationValue === value && 'premium-option-chip-active')}>{label}</button>)}</div><div className="flex flex-wrap gap-2">{[['none', 'No flip'], ['horizontal', 'Horizontal'], ['vertical', 'Vertical']].map(([value, label]) => <button key={value} type="button" onClick={() => setFlipMode(value as 'none' | 'horizontal' | 'vertical')} className={cn('premium-option-chip', flipMode === value && 'premium-option-chip-active')}>{label}</button>)}</div></div>}
                {tool.slug === 'add-subtitles' && <textarea value={subtitleText} onChange={event => setSubtitleText(event.target.value)} className="premium-textarea min-h-[220px]" spellCheck={false} />}
              </div>
            )}
          </section>
        </div>

        {tool.slug !== 'youtube-thumbnail-downloader' && (
          <aside className="space-y-5">
            <div className={cn("premium-card p-5 shadow-[0_16px_32px_-28px_rgba(37,99,235,0.35)]", !hasVideoInput && !result && "hidden sm:block")}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Live process</h3>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-300">{loading ? `${Math.round(progress)}%` : result ? '100%' : 'Idle'}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 transition-all duration-300" style={{ width: `${loading ? progress : result ? 100 : 10}%` }} /></div>
              <div className="mt-4 flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}</div>
                <div>
                  <p className="font-semibold text-slate-950 dark:text-slate-50">{statusLabel}</p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">{copy.tip}</p>
                </div>
              </div>
            </div>

            <div className={cn("noise relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white", !result && "hidden sm:block")}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_45%)]" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/90"><CheckCircle2 className="h-6 w-6" /></div>
                <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight">{result ? 'Your export is ready' : 'Output ready state'}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{result ? `${metricValue(result.metrics, 'Size', result.outputBlob ? formatBytes(result.outputBlob.size) : 'Ready')} • ${metricValue(result.metrics, 'Format', 'Processed')}` : 'Process a file to unlock the final preview and download actions.'}</p>
                <div className="mt-6 space-y-3">
                  <button type="button" onClick={handleProcess} disabled={loading || queue.length === 0 || (tool.slug === 'merge-video' && queue.length < 2)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold tracking-tight text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-white/70">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}{copy.actionLabel}</button>
                  {result?.outputBlob && result.outputFilename && <button type="button" onClick={() => downloadBlob(result.outputBlob!, result.outputFilename!)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-display text-sm font-bold tracking-tight text-white transition hover:bg-white/10"><Download className="h-4 w-4" />Download result</button>}
                  {(queue.length > 0 || result) && <button type="button" onClick={resetAll} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"><RefreshCw className="h-4 w-4" />Reset workspace</button>}
                </div>
              </div>
            </div>

            {result?.previewUrl && <div className="premium-card overflow-hidden"><div className="relative h-[220px] bg-slate-950"><MediaSurface url={result.previewUrl} type={result.previewType || 'video'} alt="Processed result preview" /></div></div>}
            {result?.metrics?.length ? <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/30"><div className="grid gap-3 sm:grid-cols-2">{result.metrics.slice(0, 4).map(item => <div key={`${item.label}-${item.value}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{item.label}</p><p className="mt-1 font-display text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50">{item.value}</p></div>)}</div></div> : null}
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">{error}</div>}
          </aside>
        )}
      </div>
    </div>
  )
}
