'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react'
import type { Tool } from '@/lib/tools-data'
import UploadZone from './UploadZone'
import {
  AlertCircle,
  Archive,
  CheckCircle,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Film,
  ImageIcon,
  Loader2,
  Music4,
  Play,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import { cn, copyToClipboard, downloadBlob, formatBytes } from '@/lib/utils'
import type { FilePreviewType, FileProcessResult, FileResultMetric } from './processors/types'
import { buildDropzoneAccept, formatAcceptedFormats } from './file-accept'
import toast from 'react-hot-toast'

type ExtraInputConfig = {
  label: string
  placeholder: string
  helper?: string
}

type QuickPreset = {
  label: string
  value: string
}

const EXTRA_INPUT_CONFIG: Record<string, ExtraInputConfig> = {
  'split-pdf': { label: 'Page Range', placeholder: '1-3,5,7-9  (blank = all pages)', helper: 'Leave this empty to export every page, or enter custom ranges.' },
  'zip-creator': { label: 'Archive Name', placeholder: 'project-assets', helper: 'Give the ZIP a clean filename before download.' },
  'file-hash-checker': { label: 'Expected Hash', placeholder: 'Paste a SHA-256, SHA-512, SHA-1 or MD5 value', helper: 'Optional: verify whether the uploaded file matches a known hash.' },
  'resize-image': { label: 'Resize Dimensions', placeholder: '800x600  (or just 800 for width)', helper: 'Use width x height. Leave height empty to keep the original ratio.' },
  'crop-image': { label: 'Crop Area', placeholder: 'left, top, width, height  (blank = centered square)', helper: 'Leave this empty for a centered square crop.' },
  'flip-rotate-image': { label: 'Rotation', placeholder: '90', helper: 'Choose a quick angle below or type a custom value.' },
  'trim-video': { label: 'Trim Range', placeholder: '0, 30  (start seconds, duration)', helper: 'Enter start time and duration in seconds.' },
  'gif-maker': { label: 'Frame Duration', placeholder: '1.2  (seconds per image)', helper: 'Lower values create a faster GIF.' },
  'trim-audio': { label: 'Trim Range', placeholder: '0, 30  (start seconds, duration)', helper: 'Enter start time and duration in seconds.' },
  'change-video-speed': { label: 'Playback Speed', placeholder: '2', helper: 'Use values like 0.75, 1.25, 1.5 or 2.' },
  'pdf-watermark': { label: 'Watermark Text', placeholder: 'CONFIDENTIAL' },
  'protect-pdf': { label: 'Password', placeholder: 'Enter the password to set on this PDF' },
  'unlock-pdf': { label: 'Password', placeholder: 'Enter the current PDF password' },
  'add-watermark-image': { label: 'Watermark Text', placeholder: 'Multiverse', helper: 'Short watermark text works best on mobile images.' },
}

const IMAGE_QUALITY_PRESETS: QuickPreset[] = [
  { label: 'Smaller', value: '55' },
  { label: 'Balanced', value: '80' },
  { label: 'Best', value: '92' },
]

const TEXT_INPUT_PRESETS: Record<string, QuickPreset[]> = {
  'split-pdf': [
    { label: 'Pages 1 to 3', value: '1-3' },
    { label: 'Pages 1, 3, 5', value: '1,3,5' },
    { label: 'Pages 2 to 4, 7', value: '2-4,7' },
  ],
  'resize-image': [
    { label: '1080 x 1080', value: '1080x1080' },
    { label: '1920 x 1080', value: '1920x1080' },
    { label: '1200 x 630', value: '1200x630' },
  ],
  'flip-rotate-image': [
    { label: '90 deg', value: '90' },
    { label: '180 deg', value: '180' },
    { label: '270 deg', value: '270' },
  ],
  'trim-video': [
    { label: '15 sec', value: '0, 15' },
    { label: '30 sec', value: '0, 30' },
    { label: '60 sec', value: '0, 60' },
  ],
  'trim-audio': [
    { label: '15 sec', value: '0, 15' },
    { label: '30 sec', value: '0, 30' },
    { label: '60 sec', value: '0, 60' },
  ],
  'change-video-speed': [
    { label: '0.75x', value: '0.75' },
    { label: '1.25x', value: '1.25' },
    { label: '1.5x', value: '1.5' },
    { label: '2x', value: '2' },
  ],
  'gif-maker': [
    { label: 'Fast', value: '0.6' },
    { label: 'Balanced', value: '1.2' },
    { label: 'Slow', value: '2' },
  ],
}

function getPreviewTypeFromMime(mimeType: string): FilePreviewType | null {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType.startsWith('audio/')) return 'audio'
  if (mimeType === 'application/pdf') return 'pdf'
  return null
}

function getPreviewTypeLabel(type: FilePreviewType | null) {
  if (type === 'video') return 'Video'
  if (type === 'audio') return 'Audio'
  if (type === 'pdf') return 'PDF'
  return 'Image'
}

function PreviewSurface({
  url,
  type,
  alt,
}: {
  url: string
  type: FilePreviewType
  alt: string
}) {
  if (type === 'video') {
    return <video src={url} controls className="h-full w-full bg-slate-950 object-contain" />
  }

  if (type === 'audio') {
    return (
      <div className="flex h-full min-h-[240px] items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Music4 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-sm font-bold tracking-tight text-slate-950">{alt}</p>
              <p className="text-xs text-muted-foreground">Preview the processed audio before download</p>
            </div>
          </div>
          <audio src={url} controls className="w-full" />
        </div>
      </div>
    )
  }

  if (type === 'pdf') {
    return (
      <iframe
        src={url}
        title={alt}
        className="h-full w-full border-0 bg-white"
      />
    )
  }

  return (
    <Image
      src={url}
      alt={alt}
      fill
      unoptimized
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
      style={{ objectFit: 'contain' }}
    />
  )
}

function buildFallbackMetrics(outputBlob: Blob | null, outputFilename: string): FileResultMetric[] {
  if (!outputBlob) return []

  const extension = outputFilename.includes('.') ? outputFilename.split('.').pop()?.toUpperCase() : ''
  return [
    ...(extension ? [{ label: 'Format', value: extension }] : []),
    { label: 'Size', value: formatBytes(outputBlob.size) },
  ]
}

export default function ToolDetailFileClient({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([])
  const [textInput, setTextInput] = useState('')
  const [output, setOutput] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [apiError, setApiError] = useState('')
  const [imgQuality, setImgQuality] = useState('80')
  const [imgConvertTo, setImgConvertTo] = useState('webp')
  const [pdfAngle, setPdfAngle] = useState('90')
  const [audioFmt, setAudioFmt] = useState('mp3')
  const [ocrLang, setOcrLang] = useState('eng')
  const [resultMetrics, setResultMetrics] = useState<FileResultMetric[]>([])
  const [sourcePreviewUrl, setSourcePreviewUrl] = useState('')
  const [sourcePreviewType, setSourcePreviewType] = useState<FilePreviewType | null>(null)
  const [resultPreviewUrl, setResultPreviewUrl] = useState('')
  const [resultPreviewType, setResultPreviewType] = useState<FilePreviewType | null>(null)
  const sourcePreviewUrlRef = useRef<string | null>(null)
  const resultPreviewUrlRef = useRef<string | null>(null)

  const uploadAccept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const acceptLabel = useMemo(() => formatAcceptedFormats(tool.acceptedFormats), [tool.acceptedFormats])
  const supportsMultipleFiles = useMemo(
    () => ['merge-pdf', 'zip-creator', 'merge-audio', 'gif-maker', 'jpg-to-pdf'].includes(tool.slug),
    [tool.slug]
  )
  const extraInput = EXTRA_INPUT_CONFIG[tool.slug]
  const textPresets = TEXT_INPUT_PRESETS[tool.slug] || []
  const toolHighlights = useMemo(() => {
    if (tool.categorySlug === 'image') return ['Instant preview', 'Clean export names', 'Mobile friendly']
    if (tool.categorySlug === 'video') return ['Player preview', 'Fast download output', 'Simple presets']
    if (tool.categorySlug === 'audio') return ['Audio preview', 'Smart export names', 'Quick trim presets']
    if (tool.categorySlug === 'pdf') return ['PDF preview', 'Cleaner exports', 'Structured results']
    if (tool.categorySlug === 'file') return ['Detailed checks', 'Smart verification', 'Clean summaries']
    return ['Fast processing', 'Download ready', 'Clean results']
  }, [tool.categorySlug])

  function clearManagedPreview(ref: MutableRefObject<string | null>, setter: (value: string) => void) {
    if (ref.current) {
      URL.revokeObjectURL(ref.current)
      ref.current = null
    }
    setter('')
  }

  function clearSourcePreview() {
    clearManagedPreview(sourcePreviewUrlRef, setSourcePreviewUrl)
    setSourcePreviewType(null)
  }

  function clearResultPreview() {
    clearManagedPreview(resultPreviewUrlRef, setResultPreviewUrl)
    setResultPreviewType(null)
  }

  function setManagedResultPreview(nextUrl: string, type: FilePreviewType, isObjectUrl = false) {
    clearResultPreview()
    if (isObjectUrl) resultPreviewUrlRef.current = nextUrl
    setResultPreviewUrl(nextUrl)
    setResultPreviewType(type)
  }

  function resetAll() {
    setFiles([])
    setTextInput('')
    setOutput('')
    setOutputBlob(null)
    setOutputFilename('')
    setProgress(0)
    setApiError('')
    setResultMetrics([])
    clearSourcePreview()
    clearResultPreview()
  }

  useEffect(() => {
    return () => {
      if (sourcePreviewUrlRef.current) {
        URL.revokeObjectURL(sourcePreviewUrlRef.current)
        sourcePreviewUrlRef.current = null
      }
      if (resultPreviewUrlRef.current) {
        URL.revokeObjectURL(resultPreviewUrlRef.current)
        resultPreviewUrlRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const firstFile = files[0]
    if (!firstFile) {
      if (sourcePreviewUrlRef.current) {
        URL.revokeObjectURL(sourcePreviewUrlRef.current)
        sourcePreviewUrlRef.current = null
      }
      setSourcePreviewUrl('')
      setSourcePreviewType(null)
      return
    }

    const previewType = getPreviewTypeFromMime(firstFile.type)
    if (!previewType) {
      if (sourcePreviewUrlRef.current) {
        URL.revokeObjectURL(sourcePreviewUrlRef.current)
        sourcePreviewUrlRef.current = null
      }
      setSourcePreviewUrl('')
      setSourcePreviewType(null)
      return
    }

    const nextPreviewUrl = URL.createObjectURL(firstFile)
    if (sourcePreviewUrlRef.current) {
      URL.revokeObjectURL(sourcePreviewUrlRef.current)
    }
    sourcePreviewUrlRef.current = nextPreviewUrl
    setSourcePreviewUrl(nextPreviewUrl)
    setSourcePreviewType(previewType)
  }, [files])

  function startProgress() {
    setProgress(5)
    const interval = setInterval(() => setProgress(current => current < 82 ? current + Math.random() * 8 : current), 350)
    return () => {
      clearInterval(interval)
      setProgress(100)
    }
  }

  function applyProcessResult(result: FileProcessResult) {
    if (result.apiError) {
      setApiError(result.apiError)
      return
    }

    if (result.outputBlob) setOutputBlob(result.outputBlob)
    if (result.outputFilename) setOutputFilename(result.outputFilename)
    if (result.output) setOutput(result.output)
    setResultMetrics(result.metrics || buildFallbackMetrics(result.outputBlob || null, result.outputFilename || ''))

    if (result.previewUrl) {
      setManagedResultPreview(result.previewUrl, result.previewType || 'image', result.previewIsObjectUrl)
      return
    }

    if (result.imagePreviewUrl) {
      setManagedResultPreview(result.imagePreviewUrl, 'image', result.imagePreviewIsObjectUrl)
      return
    }

    clearResultPreview()
  }

  async function handleProcess() {
    setLoading(true)
    setApiError('')
    setOutput('')
    setOutputBlob(null)
    setOutputFilename('')
    setResultMetrics([])
    clearResultPreview()
    const done = startProgress()

    try {
      const { slug, categorySlug } = tool

      if (categorySlug === 'pdf' && files.length > 0) {
        const { handlePdfTool } = await import('./processors/file-pdf')
        applyProcessResult(await handlePdfTool({ slug, files, textInput, pdfAngle }))
        done()
        return
      }

      if (categorySlug === 'image' && files.length > 0) {
        const { handleImageTool } = await import('./processors/file-image')
        applyProcessResult(await handleImageTool({ slug, file: files[0], textInput, ocrLang, imgQuality, imgConvertTo }))
        done()
        return
      }

      if (categorySlug === 'video' && files.length > 0) {
        const { handleVideoTool } = await import('./processors/file-media')
        applyProcessResult(await handleVideoTool({ slug, file: files[0], files, textInput }))
        done()
        return
      }

      if (categorySlug === 'audio' && files.length > 0) {
        const { handleAudioTool } = await import('./processors/file-media')
        applyProcessResult(await handleAudioTool({ slug, file: files[0], files, textInput, audioFmt }))
        done()
        return
      }

      if (categorySlug === 'file' && files.length > 0) {
        const { handleGenericFileTool } = await import('./processors/file-generic')
        applyProcessResult(await handleGenericFileTool({ slug, files, textInput }))
        done()
        return
      }

      setOutput('Processing complete')
    } catch (error) {
      setApiError(`Error: ${(error as Error).message}`)
    } finally {
      done()
      setLoading(false)
    }
  }

  async function handleCopy() {
    await copyToClipboard(output)
    setCopied(true)
    toast.success('Copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (outputBlob) downloadBlob(outputBlob, outputFilename || 'output.bin')
  }

  const hasAdvancedOptions =
    Boolean(extraInput) ||
    tool.slug === 'rotate-pdf' ||
    tool.slug === 'split-pdf' ||
    tool.slug === 'compress-image' ||
    tool.slug === 'convert-image' ||
    tool.slug === 'convert-audio' ||
    tool.slug === 'image-to-text'
  const btnLabel = loading ? 'Processing...' : 'Process File'
  const metricsToRender = resultMetrics.length > 0 ? resultMetrics : buildFallbackMetrics(outputBlob, outputFilename)
  const showPreviewGrid = Boolean(sourcePreviewUrl || resultPreviewUrl)

  return (
    <div className="space-y-6 p-5 md:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {toolHighlights.map(item => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            {item}
          </div>
        ))}
      </div>

      <UploadZone
        onFiles={incomingFiles => setFiles(current => supportsMultipleFiles ? [...current, ...incomingFiles] : incomingFiles)}
        accept={uploadAccept}
        acceptLabel={acceptLabel}
        multiple={supportsMultipleFiles}
        files={files}
        onRemove={index => setFiles(current => current.filter((_, itemIndex) => itemIndex !== index))}
        description={acceptLabel ? `Supported: ${acceptLabel}` : undefined}
      />

      {hasAdvancedOptions && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            <h3 className="font-display text-sm font-bold tracking-tight text-slate-950">Processing Options</h3>
          </div>

          <div className="space-y-4">
            {tool.slug === 'rotate-pdf' && (
              <div className="flex flex-wrap gap-2">
                {['90', '180', '270'].map(angle => (
                  <button
                    key={angle}
                    onClick={() => setPdfAngle(angle)}
                    className={cn('premium-option-chip', pdfAngle === angle && 'premium-option-chip-active')}
                  >
                    {angle} deg
                  </button>
                ))}
              </div>
            )}

            {(tool.slug === 'compress-image' || tool.slug === 'convert-image') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="premium-label">Quality</label>
                  <span className="text-sm font-semibold text-slate-700">{imgQuality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={imgQuality}
                  onChange={event => setImgQuality(event.target.value)}
                  className="w-full accent-indigo-600"
                />
                <div className="flex flex-wrap gap-2">
                  {IMAGE_QUALITY_PRESETS.map(preset => (
                    <button
                      key={preset.value}
                      onClick={() => setImgQuality(preset.value)}
                      className={cn('premium-option-chip', imgQuality === preset.value && 'premium-option-chip-active')}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tool.slug === 'convert-image' && (
              <div className="flex flex-wrap gap-2">
                {['webp', 'jpeg', 'png', 'avif'].map(format => (
                  <button
                    key={format}
                    onClick={() => setImgConvertTo(format)}
                    className={cn('premium-option-chip uppercase', imgConvertTo === format && 'premium-option-chip-active')}
                  >
                    {format}
                  </button>
                ))}
              </div>
            )}

            {tool.slug === 'convert-audio' && (
              <div className="flex flex-wrap gap-2">
                {['mp3', 'wav', 'ogg', 'aac', 'flac'].map(format => (
                  <button
                    key={format}
                    onClick={() => setAudioFmt(format)}
                    className={cn('premium-option-chip uppercase', audioFmt === format && 'premium-option-chip-active')}
                  >
                    {format}
                  </button>
                ))}
              </div>
            )}

            {tool.slug === 'image-to-text' && (
              <div className="flex flex-wrap gap-2">
                {[
                  ['eng', 'English'],
                  ['hin', 'Hindi'],
                  ['tam', 'Tamil'],
                  ['spa', 'Spanish'],
                  ['fra', 'French'],
                ].map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => setOcrLang(code)}
                    className={cn('premium-option-chip text-xs', ocrLang === code && 'premium-option-chip-active')}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}

            {extraInput && (
              <div className="space-y-2">
                <label className="premium-label">{extraInput.label}</label>
                <input
                  value={textInput}
                  onChange={event => setTextInput(event.target.value)}
                  placeholder={extraInput.placeholder}
                  className="premium-input"
                />
                {extraInput.helper && <p className="text-xs text-muted-foreground">{extraInput.helper}</p>}
                {textPresets.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {textPresets.map(preset => (
                      <button
                        key={preset.label}
                        onClick={() => setTextInput(preset.value)}
                        className={cn('premium-option-chip', textInput === preset.value && 'premium-option-chip-active')}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleProcess}
          disabled={loading || files.length === 0}
          className="btn-primary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {btnLabel}
        </button>
        {(output || files.length > 0 || outputBlob) && (
          <button onClick={resetAll} className="btn-secondary flex items-center gap-2 px-4 py-2.5 text-sm">
            <RefreshCw className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>

      {loading && (
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
            <span className="font-display font-bold tracking-tight">Processing...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {apiError && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <pre className="whitespace-pre-wrap text-xs text-red-600">{apiError}</pre>
        </div>
      )}

      {showPreviewGrid && (
        <div className={cn('grid gap-4', sourcePreviewUrl && resultPreviewUrl ? 'lg:grid-cols-2' : '')}>
          {sourcePreviewUrl && sourcePreviewType && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {sourcePreviewType === 'video' ? <Film className="h-4 w-4 text-slate-500" /> : sourcePreviewType === 'audio' ? <Music4 className="h-4 w-4 text-slate-500" /> : sourcePreviewType === 'pdf' ? <FileText className="h-4 w-4 text-slate-500" /> : <ImageIcon className="h-4 w-4 text-slate-500" />}
                <h3 className="font-display text-sm font-bold tracking-tight text-slate-950">Source {getPreviewTypeLabel(sourcePreviewType)}</h3>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className={cn(sourcePreviewType === 'audio' ? 'min-h-[240px]' : 'relative h-[280px] sm:h-[360px]')}>
                  <PreviewSurface url={sourcePreviewUrl} type={sourcePreviewType} alt="Source preview" />
                </div>
              </div>
            </div>
          )}

          {resultPreviewUrl && resultPreviewType && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <h3 className="font-display text-sm font-bold tracking-tight text-slate-950">Processed Result</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {outputBlob && (
                    <button onClick={handleDownload} className="btn-primary px-4 py-2 text-sm">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  )}
                  <a href={resultPreviewUrl} download target="_blank" rel="noreferrer" className="btn-secondary px-4 py-2 text-sm">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open
                  </a>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className={cn(resultPreviewType === 'audio' ? 'min-h-[240px]' : 'relative h-[280px] sm:h-[360px] lg:h-[420px]')}>
                  <PreviewSurface url={resultPreviewUrl} type={resultPreviewType} alt="Processed preview" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {metricsToRender.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metricsToRender.map(metric => (
            <div key={`${metric.label}-${metric.value}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
              <p className="mt-2 font-display text-base font-bold tracking-tight text-slate-950">{metric.value}</p>
            </div>
          ))}
        </div>
      )}

      {outputBlob && !resultPreviewUrl && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Download Ready</p>
              <p className="mt-1 font-display text-base font-bold tracking-tight text-slate-950">{outputFilename}</p>
              <p className="mt-1 text-sm text-muted-foreground">{formatBytes(outputBlob.size)}</p>
            </div>
            <button onClick={handleDownload} className="btn-primary flex items-center gap-2">
              {outputFilename.endsWith('.zip') ? <Archive className="h-4 w-4" /> : <Download className="h-4 w-4" />}
              Download File
            </button>
          </div>
        </div>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-sm font-bold tracking-tight">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Output
            </h3>
            <button onClick={handleCopy} className="btn-secondary px-3 py-1.5 text-xs">
              {copied ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="custom-scrollbar max-h-[500px] overflow-auto rounded-2xl border border-slate-200 bg-white p-4 text-sm font-mono whitespace-pre-wrap shadow-sm">
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}
