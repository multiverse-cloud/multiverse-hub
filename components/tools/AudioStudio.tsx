'use client'

import { useDropzone } from 'react-dropzone'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Clock3,
  Download,
  FileAudio2,
  Loader2,
  Mic2,
  Music4,
  Play,
  RefreshCw,
  Sparkles,
  Trash2,
  UploadCloud,
  Waves,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import { buildDropzoneAccept, formatAcceptedFormats } from './file-accept'
import { handleAudioTextTool } from './processors/text-audio'
import { handleAudioTool } from './processors/file-media'
import type { FileProcessResult } from './processors/types'

type QueueItem = { id: string; file: File; previewUrl: string }

const AUDIO_COPY = {
  'compress-audio': {
    eyebrow: 'Studio audio optimization',
    title: 'Audio Compressor',
    summary: 'Reduce file size with cleaner export presets while keeping speech and music usable.',
    badges: ['Smaller files', 'Quick export', 'Private processing'],
    actionLabel: 'Compress audio',
    emptyTitle: 'Compressed export appears here',
    tip: 'Recommended works best for podcasts, interviews, and mobile delivery.',
  },
  'convert-audio': {
    eyebrow: 'Format conversion',
    title: 'Audio Converter',
    summary: 'Convert studio and playback files into the format you need with cleaner output control.',
    badges: ['MP3, WAV, FLAC', 'Fast export', 'Ready to download'],
    actionLabel: 'Convert audio',
    emptyTitle: 'Converted export appears here',
    tip: 'Use WAV or FLAC when quality matters. MP3 works best for lighter sharing.',
  },
  'trim-audio': {
    eyebrow: 'Precision cut',
    title: 'Audio Cutter',
    summary: 'Set a clean range, cut the exact segment, and export it as a focused clip.',
    badges: ['Range controls', 'Fast trim', 'Preview-ready'],
    actionLabel: 'Cut audio',
    emptyTitle: 'Trimmed clip appears here',
    tip: 'Use short clips for social posts, voice notes, and ringtone-style exports.',
  },
  'audio-equalizer': {
    eyebrow: 'Tone shaping',
    title: 'Audio Equalizer',
    summary: 'Apply voice, bass, and clarity presets to quickly reshape the sound profile.',
    badges: ['Preset EQ', 'Cleaner tone', 'Fast render'],
    actionLabel: 'Apply EQ',
    emptyTitle: 'Equalized export appears here',
    tip: 'Voice mode is best for spoken audio. Bass mode works better for music-heavy clips.',
  },
  'audio-metadata-editor': {
    eyebrow: 'Metadata cleanup',
    title: 'Audio Metadata Editor',
    summary: 'Update track title, artist, album, and year before exporting a cleaner file.',
    badges: ['Track details', 'Cleaner library', 'Quick retagging'],
    actionLabel: 'Save metadata',
    emptyTitle: 'Tagged file appears here',
    tip: 'Use consistent artist and album names to keep your library clean across apps.',
  },
  'speech-to-text': {
    eyebrow: 'Speech analysis',
    title: 'Audio to Text',
    summary: 'Turn spoken audio into clean text from interviews, voice notes, and recordings.',
    badges: ['Fast transcript', 'Readable text', 'Private upload'],
    actionLabel: 'Transcribe audio',
    emptyTitle: 'Transcript appears here',
    tip: 'Clear voice recordings usually produce the cleanest transcript output.',
  },
  'change-audio-speed': {
    eyebrow: 'Playback control',
    title: 'Change Audio Speed',
    summary: 'Speed up or slow down audio while keeping the export ready for replay and download.',
    badges: ['0.75x to 2x', 'Quick render', 'Reusable output'],
    actionLabel: 'Change speed',
    emptyTitle: 'Updated speed export appears here',
    tip: '1.25x and 1.5x are ideal for podcasts and spoken-word content.',
  },
  'merge-audio': {
    eyebrow: 'Track assembly',
    title: 'Merge Audio',
    summary: 'Queue multiple files, control the order, and export one combined audio track.',
    badges: ['Multi-file merge', 'Queue controls', 'One final track'],
    actionLabel: 'Merge tracks',
    emptyTitle: 'Merged track appears here',
    tip: 'Keep source files in similar formats for a cleaner final export.',
  },
  'remove-vocals': {
    eyebrow: 'Stem isolation',
    title: 'Remove Vocals',
    summary: 'Reduce centered vocal content and export a cleaner instrumental-focused track.',
    badges: ['Instrumental pass', 'Quick export', 'Music workflow'],
    actionLabel: 'Remove vocals',
    emptyTitle: 'Instrumental-focused export appears here',
    tip: 'Tracks with centered vocals usually respond best to this cleanup pass.',
  },
  'audio-text-to-speech': {
    eyebrow: 'Voice synthesis',
    title: 'Text to Speech',
    summary: 'Generate a simple voiceover file from text inside the same clean audio workspace.',
    badges: ['Voice output', 'Speed control', 'Instant playback'],
    actionLabel: 'Generate speech',
    emptyTitle: 'Generated voiceover appears here',
    tip: 'Short paragraphs sound more natural and are easier to review after export.',
  },
  'trim-silence': {
    eyebrow: 'Dead-air cleanup',
    title: 'Trim Silence',
    summary: 'Remove quiet pauses from speech recordings to make the track tighter and easier to share.',
    badges: ['Cleaner pacing', 'Podcast ready', 'Fast render'],
    actionLabel: 'Trim silence',
    emptyTitle: 'Cleaned audio appears here',
    tip: 'Standard mode is safest when you want to tighten speech without cutting words.',
  },
  'volume-booster': {
    eyebrow: 'Loudness control',
    title: 'Volume Booster',
    summary: 'Increase overall loudness with a simple gain control and an easy export flow.',
    badges: ['Gain control', 'Stronger playback', 'Ready to download'],
    actionLabel: 'Boost volume',
    emptyTitle: 'Boosted audio appears here',
    tip: 'A gentle boost is safer when your original file is already close to peak volume.',
  },
} as const

const PROCESS_MESSAGES: Record<string, { idle: string; loading: string; done: string }> = {
  'compress-audio': { idle: 'Waiting for audio', loading: 'Compressing source file', done: 'Compressed file ready' },
  'convert-audio': { idle: 'Waiting for audio', loading: 'Converting format', done: 'Converted file ready' },
  'trim-audio': { idle: 'Waiting for audio', loading: 'Cutting selected range', done: 'Trimmed clip ready' },
  'audio-equalizer': { idle: 'Waiting for audio', loading: 'Applying EQ preset', done: 'Equalized file ready' },
  'audio-metadata-editor': { idle: 'Waiting for audio', loading: 'Writing metadata', done: 'Metadata updated' },
  'speech-to-text': { idle: 'Waiting for audio', loading: 'Transcribing speech', done: 'Transcript ready' },
  'change-audio-speed': { idle: 'Waiting for audio', loading: 'Adjusting playback speed', done: 'Speed update ready' },
  'merge-audio': { idle: 'Add at least two files', loading: 'Merging track queue', done: 'Merged track ready' },
  'remove-vocals': { idle: 'Waiting for audio', loading: 'Reducing centered vocals', done: 'Instrumental export ready' },
  'audio-text-to-speech': { idle: 'Enter text to convert', loading: 'Generating voice output', done: 'Voice file ready' },
  'trim-silence': { idle: 'Waiting for audio', loading: 'Removing silence', done: 'Cleaned file ready' },
  'volume-booster': { idle: 'Waiting for audio', loading: 'Applying gain boost', done: 'Boosted file ready' },
}

function createQueueItems(files: File[]) {
  return files.map(file => ({
    id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
    file,
    previewUrl: URL.createObjectURL(file),
  }))
}

function revokeQueueItems(items: QueueItem[]) {
  items.forEach(item => URL.revokeObjectURL(item.previewUrl))
}

function metricValue(result: FileProcessResult | null, label: string, fallback = 'Pending') {
  return result?.metrics?.find(item => item.label === label)?.value || fallback
}

export default function AudioStudio({ tool }: { tool: Tool }) {
  const copy = AUDIO_COPY[tool.slug as keyof typeof AUDIO_COPY]
  const processMessage = PROCESS_MESSAGES[tool.slug]
  const multiple = tool.slug === 'merge-audio'
  const acceptsTextInput = tool.slug === 'audio-text-to-speech'
  const acceptedFormats = useMemo(
    () =>
      tool.acceptedFormats?.length
        ? tool.acceptedFormats
        : ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
    [tool.acceptedFormats]
  )
  const accept = useMemo(() => buildDropzoneAccept(acceptedFormats), [acceptedFormats])
  const acceptLabel = useMemo(() => formatAcceptedFormats(acceptedFormats), [acceptedFormats])

  const [queue, setQueue] = useState<QueueItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [result, setResult] = useState<FileProcessResult | null>(null)
  const [textInput, setTextInput] = useState(
    tool.slug === 'audio-text-to-speech'
      ? 'Welcome to mtverse. Your audio export is ready to review.'
      : ''
  )
  const [audioFormat, setAudioFormat] = useState('mp3')
  const [bitrate, setBitrate] = useState('128k')
  const [trimStart, setTrimStart] = useState('0')
  const [trimDuration, setTrimDuration] = useState('30')
  const [equalizerPreset, setEqualizerPreset] = useState('balanced')
  const [playbackSpeed, setPlaybackSpeed] = useState('1.25')
  const [volumeBoost, setVolumeBoost] = useState('4')
  const [silenceThreshold, setSilenceThreshold] = useState('-45')
  const [metadataTitle, setMetadataTitle] = useState('')
  const [metadataArtist, setMetadataArtist] = useState('')
  const [metadataAlbum, setMetadataAlbum] = useState('')
  const [metadataYear, setMetadataYear] = useState('')
  const [metadataGenre, setMetadataGenre] = useState('')

  const activeItem = queue.find(item => item.id === activeId) || queue[0] || null
  const statusLabel = loading ? processMessage.loading : result ? processMessage.done : processMessage.idle

  useEffect(() => () => {
    revokeQueueItems(queue)
    if (result?.previewIsObjectUrl && result.previewUrl) URL.revokeObjectURL(result.previewUrl)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function clearResult() {
    setError('')
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
    setProgress(0)
    setTextInput(
      tool.slug === 'audio-text-to-speech'
        ? 'Welcome to mtverse. Your audio export is ready to review.'
        : ''
    )
    setAudioFormat('mp3')
    setBitrate('128k')
    setTrimStart('0')
    setTrimDuration('30')
    setEqualizerPreset('balanced')
    setPlaybackSpeed('1.25')
    setVolumeBoost('4')
    setSilenceThreshold('-45')
    setMetadataTitle('')
    setMetadataArtist('')
    setMetadataAlbum('')
    setMetadataYear('')
    setMetadataGenre('')
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
      if (!metadataTitle && nextQueue[0]) {
        setMetadataTitle(nextQueue[0].file.name.replace(/\.[^.]+$/, ''))
      }
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

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept,
    multiple,
    noClick: true,
    onDropAccepted: appendToQueue,
  })

  function startProgress() {
    setProgress(8)
    const interval = window.setInterval(
      () => setProgress(current => (current < 88 ? current + Math.random() * 7 : current)),
      320
    )
    return () => {
      window.clearInterval(interval)
      setProgress(100)
    }
  }

  async function handleProcess() {
    clearResult()

    if (tool.slug === 'audio-text-to-speech') {
      if (!textInput.trim()) {
        setError('Enter some text before generating speech.')
        return
      }

      setLoading(true)
      const done = startProgress()
      try {
        const next = await handleAudioTextTool('text-to-speech', textInput.trim(), {
          speed: Number(playbackSpeed),
        })

        if (next.apiError) {
          setError(next.apiError)
          return
        }

        const previewUrl = next.outputBlob ? URL.createObjectURL(next.outputBlob) : ''
        setResult({
          output: next.output,
          outputBlob: next.outputBlob,
          outputFilename: next.outputFilename || 'speech.mp3',
          previewUrl,
          previewType: 'audio',
          previewIsObjectUrl: Boolean(previewUrl),
          metrics: [
            { label: 'Voice', value: 'Alloy' },
            { label: 'Speed', value: `${playbackSpeed}x` },
            { label: 'Words', value: `${textInput.trim().split(/\s+/).filter(Boolean).length}` },
          ],
        })
      } catch (processError) {
        setError((processError as Error).message)
      } finally {
        done()
        setLoading(false)
      }
      return
    }

    if (queue.length === 0) {
      setError(multiple ? 'Upload at least two audio files.' : 'Upload an audio file to continue.')
      return
    }
    if (tool.slug === 'merge-audio' && queue.length < 2) {
      setError('Upload at least two audio files to merge.')
      return
    }

    setLoading(true)
    const done = startProgress()
    try {
      const leadFile = activeItem?.file || queue[0].file
      const options: Record<string, string | File | undefined> = {}
      let processTextInput = ''

      if (tool.slug === 'compress-audio') options.bitrate = bitrate
      if (tool.slug === 'trim-audio') processTextInput = `${trimStart},${trimDuration}`
      if (tool.slug === 'change-audio-speed') {
        options.speed = playbackSpeed
        processTextInput = playbackSpeed
      }
      if (tool.slug === 'audio-equalizer') options.preset = equalizerPreset
      if (tool.slug === 'audio-metadata-editor') {
        options.title = metadataTitle
        options.artist = metadataArtist
        options.album = metadataAlbum
        options.year = metadataYear
        options.genre = metadataGenre
      }
      if (tool.slug === 'remove-vocals') options.mode = 'center-cut'
      if (tool.slug === 'trim-silence') options.threshold = silenceThreshold
      if (tool.slug === 'volume-booster') options.boost = volumeBoost

      const next = await handleAudioTool({
        slug: tool.slug,
        file: leadFile,
        files: queue.map(item => item.file),
        textInput: processTextInput,
        audioFmt: audioFormat,
        options,
      })

      if (next.apiError) {
        setError(next.apiError)
        return
      }

      setResult(next)
    } catch (processError) {
      setError((processError as Error).message)
    } finally {
      done()
      setLoading(false)
    }
  }

  const activeSourceMetrics = [
    {
      label: multiple ? 'Tracks' : 'Source',
      value: multiple ? `${queue.length} files` : activeItem?.file.name || 'No file',
    },
    {
      label: 'Size',
      value: activeItem?.file ? formatBytes(activeItem.file.size) : 'Pending',
    },
    {
      label: 'Formats',
      value: acceptsTextInput ? 'Voice output' : acceptLabel,
    },
  ]
  const hasAudioInput = acceptsTextInput ? textInput.trim().length > 0 : queue.length > 0

  return (
    <div className="space-y-4 sm:space-y-8" data-tool-shell="true">
      <header className="max-w-3xl">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {copy.badges.map(item => (
            <span key={item} className="premium-chip">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-3 premium-kicker sm:mt-6">{copy.eyebrow}</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-slate-50">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7 dark:text-slate-300">
          {copy.summary}
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_360px]">
        <div className="space-y-5">
          <section className="premium-panel p-5 sm:p-6">
            {acceptsTextInput ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                    <Mic2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="premium-kicker">Speech source</p>
                    <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                      Paste your script
                    </h2>
                  </div>
                </div>
                <textarea
                  value={textInput}
                  onChange={event => setTextInput(event.target.value)}
                  rows={6}
                  className="min-h-[150px] w-full rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-300 sm:min-h-[260px] sm:rounded-2xl sm:py-4 sm:leading-7 dark:bg-slate-950/40 dark:text-slate-100 dark:ring-slate-800"
                  placeholder="Paste the voice script you want to convert into audio."
                />
              </div>
            ) : (
              <div {...getRootProps()} className="group">
                <input {...getInputProps()} />
                <div
                  className={cn(
                    'flex min-h-[150px] flex-col items-center justify-center rounded-[18px] border border-dashed px-4 py-6 text-center transition sm:min-h-[300px] sm:rounded-[28px] sm:px-8 sm:py-10',
                    isDragActive
                      ? 'border-indigo-400 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/20'
                      : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70'
                  )}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-indigo-950/30">
                    <UploadCloud className="h-8 w-8" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                    Drop your audio here
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {multiple
                      ? `Queue multiple files in ${acceptLabel} and arrange the playback order before export.`
                      : `Upload ${acceptLabel} audio files and keep everything in one clean workspace.`}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={open}
                      className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01]"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Choose file{multiple ? 's' : ''}
                    </button>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!acceptsTextInput && queue.length > 0 && (
              <div className="mt-5 space-y-3">
                {queue.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800',
                      activeId === item.id && 'ring-2 ring-indigo-300 dark:ring-indigo-700'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800">
                        <Music4 className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-950 dark:text-slate-50">{item.file.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Track {index + 1} • {formatBytes(item.file.size)}
                        </p>
                      </div>
                    </button>
                    {multiple && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, 'up')}
                          className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                          aria-label="Move up"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(item.id, 'down')}
                          className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                          aria-label="Move down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-full p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-300"
                      aria-label="Remove file"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {hasAudioInput && (
            <div className="flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={handleProcess}
                disabled={loading}
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

          <section className={cn("grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]", !hasAudioInput && "hidden")}>
            <div className="premium-card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="premium-kicker">Workspace options</p>
                  <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                    Configure output
                  </h2>
                </div>
                <Sparkles className="h-5 w-5 text-indigo-500" />
              </div>

              {tool.slug === 'compress-audio' && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Less', value: '192k', hint: 'Best quality' },
                    { label: 'Recommended', value: '128k', hint: 'Balanced' },
                    { label: 'Extreme', value: '96k', hint: 'Smallest size' },
                  ].map(preset => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setBitrate(preset.value)}
                      className={cn(
                        'rounded-2xl px-4 py-4 text-left ring-1 transition',
                        bitrate === preset.value
                          ? 'bg-indigo-50 text-indigo-700 ring-indigo-300 dark:bg-indigo-950/30 dark:text-indigo-200 dark:ring-indigo-800'
                          : 'bg-slate-50 text-slate-700 ring-slate-200 hover:bg-slate-100 dark:bg-slate-950/30 dark:text-slate-200 dark:ring-slate-800'
                      )}
                    >
                      <p className="text-sm font-semibold">{preset.label}</p>
                      <p className="mt-1 text-xs opacity-80">{preset.value} • {preset.hint}</p>
                    </button>
                  ))}
                </div>
              )}

              {tool.slug === 'convert-audio' && (
                <div className="flex flex-wrap gap-3">
                  {['mp3', 'wav', 'flac', 'm4a', 'ogg', 'opus'].map(format => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setAudioFormat(format)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-semibold uppercase transition',
                        audioFormat === format
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                      )}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              )}

              {tool.slug === 'trim-audio' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Start time</span>
                    <input
                      value={trimStart}
                      onChange={event => setTrimStart(event.target.value)}
                      className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800"
                      placeholder="0"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Duration</span>
                    <input
                      value={trimDuration}
                      onChange={event => setTrimDuration(event.target.value)}
                      className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800"
                      placeholder="30"
                    />
                  </label>
                </div>
              )}

              {tool.slug === 'audio-equalizer' && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'balanced', label: 'Balanced', hint: 'Everyday listening' },
                    { value: 'voice', label: 'Voice', hint: 'Speech clarity' },
                    { value: 'bass', label: 'Bass', hint: 'Low-end lift' },
                    { value: 'treble', label: 'Treble', hint: 'Top-end detail' },
                  ].map(preset => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setEqualizerPreset(preset.value)}
                      className={cn(
                        'rounded-2xl px-4 py-4 text-left ring-1 transition',
                        equalizerPreset === preset.value
                          ? 'bg-indigo-50 text-indigo-700 ring-indigo-300 dark:bg-indigo-950/30 dark:text-indigo-200 dark:ring-indigo-800'
                          : 'bg-slate-50 text-slate-700 ring-slate-200 hover:bg-slate-100 dark:bg-slate-950/30 dark:text-slate-200 dark:ring-slate-800'
                      )}
                    >
                      <p className="text-sm font-semibold">{preset.label}</p>
                      <p className="mt-1 text-xs opacity-80">{preset.hint}</p>
                    </button>
                  ))}
                </div>
              )}

              {tool.slug === 'audio-metadata-editor' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Title', value: metadataTitle, setter: setMetadataTitle },
                    { label: 'Artist', value: metadataArtist, setter: setMetadataArtist },
                    { label: 'Album', value: metadataAlbum, setter: setMetadataAlbum },
                    { label: 'Year', value: metadataYear, setter: setMetadataYear },
                    { label: 'Genre', value: metadataGenre, setter: setMetadataGenre },
                  ].map(field => (
                    <label key={field.label} className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{field.label}</span>
                      <input
                        value={field.value}
                        onChange={event => field.setter(event.target.value)}
                        className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800"
                        placeholder={field.label}
                      />
                    </label>
                  ))}
                </div>
              )}

              {tool.slug === 'change-audio-speed' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {['0.75', '1', '1.25', '1.5', '2'].map(speed => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => setPlaybackSpeed(speed)}
                        className={cn(
                          'rounded-full px-4 py-2 text-sm font-semibold transition',
                          playbackSpeed === speed
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                        )}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min="0.75"
                    max="2"
                    step="0.05"
                    value={playbackSpeed}
                    onChange={event => setPlaybackSpeed(event.target.value)}
                    className="w-full accent-indigo-600"
                  />
                </div>
              )}

              {tool.slug === 'audio-text-to-speech' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {['0.9', '1', '1.1', '1.25'].map(speed => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => setPlaybackSpeed(speed)}
                        className={cn(
                          'rounded-full px-4 py-2 text-sm font-semibold transition',
                          playbackSpeed === speed
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                        )}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Voice: Alloy • Output: MP3
                  </p>
                </div>
              )}

              {tool.slug === 'trim-silence' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: 'Light', value: '-38' },
                      { label: 'Standard', value: '-45' },
                      { label: 'Strong', value: '-52' },
                    ].map(level => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => setSilenceThreshold(level.value)}
                        className={cn(
                          'rounded-full px-4 py-2 text-sm font-semibold transition',
                          silenceThreshold === level.value
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                        )}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Threshold: {silenceThreshold} dB
                  </p>
                </div>
              )}

              {tool.slug === 'volume-booster' && (
                <div className="space-y-4">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={volumeBoost}
                    onChange={event => setVolumeBoost(event.target.value)}
                    className="w-full accent-indigo-600"
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Gain boost: +{volumeBoost} dB
                  </p>
                </div>
              )}

              <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:text-slate-300 dark:ring-slate-800">
                {copy.tip}
              </div>
            </div>

            <div className="premium-card p-5">
              <p className="premium-kicker">Source stats</p>
              <div className="mt-4 space-y-4">
                {activeSourceMetrics.map(metric => (
                  <div key={metric.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-50">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className={cn("space-y-5", !hasAudioInput && !result && "hidden sm:block")}>
          <section className="premium-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                Live process
              </h2>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">{Math.round(progress)}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Waves className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{statusLabel}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy.tip}</p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,#1f2560,#090c18_68%)] p-6 text-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.75)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight">
              {result ? 'Export ready' : copy.emptyTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              {result
                ? result.output || 'Your processed file is ready for review and download.'
                : 'Upload your source, configure the output, and the result will land here.'}
            </p>

            {error && (
              <div className="mt-5 rounded-2xl bg-rose-500/12 px-4 py-4 text-sm text-rose-100 ring-1 ring-rose-400/20">
                {error}
              </div>
            )}

            {result?.previewUrl && result.previewType === 'audio' && (
              <div className="mt-5 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                <audio src={result.previewUrl} controls className="w-full" />
              </div>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(result?.metrics || [
                { label: 'Output', value: 'Pending' },
                { label: 'Size', value: 'Pending' },
              ]).slice(0, 4).map(metric => (
                <div key={metric.label} className="rounded-2xl bg-white/6 px-4 py-4 ring-1 ring-white/10">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{metric.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => result?.outputBlob && downloadBlob(result.outputBlob, result.outputFilename || 'audio-output.mp3')}
                disabled={!result?.outputBlob}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Download result
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/12"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </section>

          <section className="premium-card p-5">
            <p className="premium-kicker">Output insight</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <FileAudio2 className="mt-0.5 h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                    {metricValue(result, 'Format', result?.outputBlob ? 'Ready' : 'Pending')}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Format and export details update here after processing.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                    {metricValue(result, 'Duration', 'Waiting for source')}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Duration and file stats help you confirm the final export quickly.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className={cn("grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]", !hasAudioInput && !result && "hidden sm:grid")}>
        <section className="premium-card overflow-hidden">
          <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800/70">
            <p className="premium-kicker">Preview</p>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
              Source and result
            </h2>
          </div>
          <div className="grid gap-5 p-5 lg:grid-cols-2">
            <div className="rounded-[24px] bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Source</p>
              {activeItem ? (
                <div className="mt-4 space-y-4">
                  <audio src={activeItem.previewUrl} controls className="w-full" />
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{activeItem.file.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {formatBytes(activeItem.file.size)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex min-h-[160px] items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  Source preview appears here
                </div>
              )}
            </div>

            <div className="rounded-[24px] bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Result</p>
              {result?.previewUrl && result.previewType === 'audio' ? (
                <div className="mt-4 space-y-4">
                  <audio src={result.previewUrl} controls className="w-full" />
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                      {result.outputFilename || 'Processed audio'}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {metricValue(result, 'Size', result.outputBlob ? formatBytes(result.outputBlob.size) : 'Ready')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex min-h-[160px] items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  Processed result appears here
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="hidden premium-card p-5 sm:block">
          <p className="premium-kicker">Workflow note</p>
          <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            Keep it simple
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li>Upload the source or paste the script.</li>
            <li>Pick one preset or one output format.</li>
            <li>Review the preview, then download the final export.</li>
          </ul>
        </section>
      </div>

      {hasAudioInput && (
      <div className="hidden flex-wrap gap-3 sm:flex">
        <button
          type="button"
          onClick={handleProcess}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:py-3 sm:text-sm"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {copy.actionLabel}
        </button>
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 sm:px-6 sm:py-3 sm:text-sm"
        >
          <RefreshCw className="h-4 w-4" />
          Reset workspace
        </button>
      </div>
      )}
    </div>
  )
}
