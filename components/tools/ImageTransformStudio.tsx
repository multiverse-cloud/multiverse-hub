'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  BadgeCheck,
  Download,
  Loader2,
  ScanSearch,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  UploadCloud,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import { buildDropzoneAccept, formatAcceptedFormats } from './file-accept'
import { handleImageTool } from './processors/file-image'
import type { FileProcessResult } from './processors/types'

const TRANSFORM_COPY = {
  'compress-image': {
    eyebrow: 'Editorial image delivery',
    title: 'Compress Image',
    summary: 'Reduce file size without making the preview feel cheap or soft.',
    badges: ['Faster uploads', 'Balanced quality', 'Instant export'],
    actionLabel: 'Compress image',
    emptyTitle: 'Compression preview appears here',
  },
  'resize-image': {
    eyebrow: 'Architectural sizing studio',
    title: 'Resize Image',
    summary: 'Resize visuals with cleaner dimensions, better framing, and web-ready output.',
    badges: ['Custom dimensions', 'Smart fit', 'Output preview'],
    actionLabel: 'Resize image',
    emptyTitle: 'Resized result appears here',
  },
  'convert-image': {
    eyebrow: 'Format conversion queue',
    title: 'Convert Image',
    summary: 'Switch formats cleanly for web, product, or document workflows.',
    badges: ['WEBP / JPG / PNG / AVIF', 'Batch-ready look', 'Sharper exports'],
    actionLabel: 'Convert image',
    emptyTitle: 'Converted asset appears here',
  },
  'crop-image': {
    eyebrow: 'Precision crop workflow',
    title: 'Crop Image',
    summary: 'Trim the frame around the subject with studio-style aspect presets.',
    badges: ['Centered crop', 'Preset ratios', 'Live canvas'],
    actionLabel: 'Crop image',
    emptyTitle: 'Cropped preview appears here',
  },
  'remove-background': {
    eyebrow: 'Cutout editor',
    title: 'Remove Background',
    summary: 'Create clean transparent cutouts for products, profiles, and creative comps.',
    badges: ['Transparent PNG', 'Portrait-ready', 'Quick turnaround'],
    actionLabel: 'Remove background',
    emptyTitle: 'Transparent cutout appears here',
  },
  'blur-background': {
    eyebrow: 'Portrait focus studio',
    title: 'Blur Background',
    summary: 'Keep the subject sharp and build a softer premium portrait backdrop.',
    badges: ['Portrait style', 'Blur depth', 'Tint control'],
    actionLabel: 'Blur background',
    emptyTitle: 'Portrait preview appears here',
  },
  'passport-photo-maker': {
    eyebrow: 'Official photo layout',
    title: 'Passport Photo Maker',
    summary: 'Generate a clean white-background passport layout for print-ready use.',
    badges: ['White background', 'Centered framing', 'Clean export'],
    actionLabel: 'Create passport photo',
    emptyTitle: 'Passport sheet preview appears here',
  },
  'image-to-text': {
    eyebrow: 'OCR extraction studio',
    title: 'Image to Text',
    summary: 'Extract readable text from screenshots, scans, receipts, and design mockups.',
    badges: ['OCR language switch', 'Readable output', 'Quick copy'],
    actionLabel: 'Extract text',
    emptyTitle: 'Recognized text appears here',
  },
  'image-upscaler': {
    eyebrow: 'Resolution recovery',
    title: 'Image Upscaler',
    summary: 'Upscale image resolution with cleaner edges and more presentation-ready detail.',
    badges: ['2x and 4x', 'Sharper output', 'Compare quickly'],
    actionLabel: 'Upscale image',
    emptyTitle: 'Upscaled result appears here',
  },
  'favicon-generator': {
    eyebrow: 'Web branding',
    title: 'Favicon Generator',
    summary: 'Upload an image and generate a multi-size favicon package for your website.',
    badges: ['ICO format', 'Multiple sizes', 'Web ready'],
    actionLabel: 'Generate favicon',
    emptyTitle: 'Favicon package appears here',
  },
  'instagram-grid-maker': {
    eyebrow: 'Social layout',
    title: 'Instagram Grid Maker',
    summary: 'Split your image into a perfect 3×3 grid for a stunning Instagram profile layout.',
    badges: ['3×3 grid', 'Perfect split', 'Download all'],
    actionLabel: 'Split into grid',
    emptyTitle: 'Grid tiles appear here',
  },
  'svg-to-png': {
    eyebrow: 'Vector converter',
    title: 'SVG to PNG Converter',
    summary: 'Convert SVG vector files into high-resolution PNG images for any use case.',
    badges: ['Vector input', 'Hi-res PNG', 'Custom size'],
    actionLabel: 'Convert to PNG',
    emptyTitle: 'PNG result appears here',
  },
  'meme-generator': {
    eyebrow: 'Creative editor',
    title: 'Meme Generator',
    summary: 'Upload an image and add bold top/bottom text to create shareable memes instantly.',
    badges: ['Custom text', 'Impact font', 'Quick share'],
    actionLabel: 'Create meme',
    emptyTitle: 'Meme preview appears here',
  },
} as const

const OCR_LANGUAGES = [
  ['eng', 'English'],
  ['hin', 'Hindi'],
  ['tam', 'Tamil'],
  ['spa', 'Spanish'],
  ['fra', 'French'],
] as const

function metricValue(result: FileProcessResult | null, label: string) {
  return result?.metrics?.find(item => item.label === label)?.value || 'Pending'
}

function makeTextBlob(text: string, filename: string) {
  return downloadBlob(new Blob([text], { type: 'text/plain;charset=utf-8' }), filename)
}

export default function ImageTransformStudio({ tool }: { tool: Tool }) {
  const copy = TRANSFORM_COPY[tool.slug as keyof typeof TRANSFORM_COPY]
  const acceptedFormats = useMemo(
    () => (tool.acceptedFormats?.length ? tool.acceptedFormats : ['.jpg', '.jpeg', '.png', '.webp']),
    [tool.acceptedFormats]
  )
  const accept = useMemo(() => buildDropzoneAccept(acceptedFormats), [acceptedFormats])
  const acceptLabel = useMemo(() => formatAcceptedFormats(acceptedFormats), [acceptedFormats])

  const sourcePreviewRef = useRef<string | null>(null)
  const resultPreviewRef = useRef<string | null>(null)

  const [file, setFile] = useState<File | null>(null)
  const [sourcePreview, setSourcePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<FileProcessResult | null>(null)
  const [imgQuality, setImgQuality] = useState('82')
  const [convertTo, setConvertTo] = useState('webp')
  const [resizeWidth, setResizeWidth] = useState('1600')
  const [resizeHeight, setResizeHeight] = useState('')
  const [resizeFit, setResizeFit] = useState('inside')
  const [cropAspect, setCropAspect] = useState('square')
  const [blurStrength, setBlurStrength] = useState('22')
  const [blurTint, setBlurTint] = useState('#E8EEFF')
  const [ocrLang, setOcrLang] = useState('eng')
  const [upscaleFactor, setUpscaleFactor] = useState('2')

  function clearSourcePreview() {
    if (sourcePreviewRef.current) {
      URL.revokeObjectURL(sourcePreviewRef.current)
      sourcePreviewRef.current = null
    }
  }

  function clearResultPreview() {
    if (resultPreviewRef.current) {
      URL.revokeObjectURL(resultPreviewRef.current)
      resultPreviewRef.current = null
    }
  }

  useEffect(() => () => {
    clearSourcePreview()
    clearResultPreview()
  }, [])

  function resetResultState() {
    setResult(current => {
      if (current?.previewIsObjectUrl && current.previewUrl) {
        URL.revokeObjectURL(current.previewUrl)
      }
      return null
    })
    clearResultPreview()
    setError('')
  }

  function updateFile(nextFile: File | null) {
    clearSourcePreview()
    resetResultState()
    setFile(nextFile)

    if (!nextFile) {
      setSourcePreview('')
      return
    }

    const nextPreview = URL.createObjectURL(nextFile)
    sourcePreviewRef.current = nextPreview
    setSourcePreview(nextPreview)
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept,
    multiple: false,
    noClick: true,
    onDropAccepted: files => updateFile(files[0] || null),
  })

  async function handleProcess() {
    if (!file || loading) return

    setLoading(true)
    resetResultState()

    try {
      const processed = await handleImageTool({
        slug: tool.slug,
        file,
        textInput: tool.slug === 'crop-image' ? cropAspect : '',
        ocrLang,
        imgQuality,
        imgConvertTo: convertTo,
        resizeWidth,
        resizeHeight,
        resizeFit,
        blurStrength,
        blurTint,
        upscaleFactor,
      })

      if (processed.apiError) {
        setError(processed.apiError)
        return
      }

      if (processed.previewIsObjectUrl && processed.previewUrl) {
        resultPreviewRef.current = processed.previewUrl
      }

      setResult(processed)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    updateFile(null)
    setImgQuality('82')
    setConvertTo('webp')
    setResizeWidth('1600')
    setResizeHeight('')
    setResizeFit('inside')
    setCropAspect('square')
    setBlurStrength('22')
    setBlurTint('#E8EEFF')
    setOcrLang('eng')
    setUpscaleFactor('2')
    setError('')
  }

  function handleDownload() {
    if (result?.outputBlob && result.outputFilename) {
      downloadBlob(result.outputBlob, result.outputFilename)
      return
    }

    if (result?.output) {
      makeTextBlob(result.output, `${tool.slug}.txt`)
    }
  }

  function renderOptions() {
    if (tool.slug === 'compress-image') {
      return (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Preset</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                ['55', 'Smallest'],
                ['82', 'Balanced'],
                ['94', 'Maximum'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setImgQuality(value)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors',
                    imgQuality === value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Compression quality</span>
              <span>{imgQuality}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={imgQuality}
              onChange={event => setImgQuality(event.target.value)}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      )
    }

    if (tool.slug === 'resize-image') {
      return (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Width</span>
              <input
                value={resizeWidth}
                onChange={event => setResizeWidth(event.target.value.replace(/[^\d]/g, ''))}
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm text-slate-900 outline-none"
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Height</span>
              <input
                value={resizeHeight}
                onChange={event => setResizeHeight(event.target.value.replace(/[^\d]/g, ''))}
                placeholder="Auto"
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm text-slate-900 outline-none"
              />
            </label>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Fit mode</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                ['inside', 'Inside'],
                ['cover', 'Cover'],
                ['contain', 'Contain'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setResizeFit(value)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors',
                    resizeFit === value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (tool.slug === 'convert-image') {
      return (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Output format</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              {['webp', 'jpeg', 'png', 'avif'].map(format => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setConvertTo(format)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-center text-sm font-semibold uppercase transition-colors',
                    convertTo === format
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Export quality</span>
              <span>{imgQuality}%</span>
            </div>
            <input
              type="range"
              min="45"
              max="100"
              value={imgQuality}
              onChange={event => setImgQuality(event.target.value)}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      )
    }

    if (tool.slug === 'crop-image') {
      return (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Aspect ratio</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ['square', 'Square'],
              ['portrait', '4:5 Portrait'],
              ['story', '9:16 Story'],
              ['landscape', '16:9 Wide'],
              ['original', 'Original'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setCropAspect(value)}
                className={cn(
                  'rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors',
                  cropAspect === value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (tool.slug === 'blur-background') {
      return (
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Blur depth</span>
              <span>{blurStrength}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="48"
              value={blurStrength}
              onChange={event => setBlurStrength(event.target.value)}
              className="w-full accent-indigo-600"
            />
          </div>
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            <span>Background tint</span>
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
              <input
                type="color"
                value={blurTint}
                onChange={event => setBlurTint(event.target.value)}
                className="h-10 w-12 rounded-xl border-0 bg-transparent"
              />
              <span className="font-mono text-sm text-slate-600">{blurTint}</span>
            </div>
          </label>
        </div>
      )
    }

    if (tool.slug === 'image-to-text') {
      return (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">OCR language</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {OCR_LANGUAGES.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setOcrLang(value)}
                className={cn(
                  'rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors',
                  ocrLang === value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (tool.slug === 'image-upscaler') {
      return (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Upscale factor</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ['2', '2x Upscale'],
              ['4', '4x Upscale'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setUpscaleFactor(value)}
                className={cn(
                  'rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors',
                  upscaleFactor === value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">
        This workflow is tuned automatically. Upload the image and run the action.
      </div>
    )
  }

  return (
    <div className="space-y-7">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {copy.badges.map(badge => (
                <span
                  key={badge}
                  className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{copy.summary}</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.22)]">
            <div
              {...getRootProps()}
              className={cn(
                'rounded-[1.75rem] border-2 border-dashed px-6 py-8 transition-colors',
                isDragActive ? 'border-indigo-500 bg-indigo-50/60' : 'border-slate-200 bg-slate-50/70'
              )}
            >
              <input {...getInputProps()} />
              {!file ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600">
                    <UploadCloud className="h-7 w-7" />
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
                    Drop your image here
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    {acceptLabel ? `Supports ${acceptLabel}.` : 'Upload a supported image file.'}
                  </p>
                  <button
                    type="button"
                    onClick={open}
                    className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                  >
                    Choose image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] bg-white">
                    <Image
                      src={sourcePreview}
                      alt={file.name}
                      fill
                      unoptimized
                      sizes="(max-width: 1280px) 100vw, 720px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[1.4rem] bg-white px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-display text-base font-bold tracking-tight text-slate-950">
                        {file.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">{formatBytes(file.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={open}
                      className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
            <section className="rounded-[1.8rem] bg-slate-100/90 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600">
                  <Settings2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Controls
                  </p>
                  <h2 className="font-display text-lg font-bold tracking-tight text-slate-950">
                    Workflow settings
                  </h2>
                </div>
              </div>
              {renderOptions()}
            </section>

            <section className="rounded-[1.8rem] bg-indigo-50/70 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Live stats
                  </p>
                  <h2 className="font-display text-lg font-bold tracking-tight text-slate-950">
                    Active output
                  </h2>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Source size
                  </p>
                  <p className="mt-2 font-display text-xl font-bold tracking-tight text-slate-950">
                    {file ? formatBytes(file.size) : 'No file'}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Result size
                  </p>
                  <p className="mt-2 font-display text-xl font-bold tracking-tight text-slate-950">
                    {metricValue(result, 'Size')}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Format
                  </p>
                  <p className="mt-2 font-display text-xl font-bold tracking-tight text-slate-950">
                    {metricValue(result, 'Format')}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Dimensions
                  </p>
                  <p className="mt-2 font-display text-xl font-bold tracking-tight text-slate-950">
                    {metricValue(result, 'Dimensions')}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-[1.8rem] bg-white p-5 shadow-[0_20px_44px_-32px_rgba(15,23,42,0.2)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-950">
                Live Process
              </h2>
              <span className="text-sm font-semibold text-indigo-600">
                {loading ? 'Running' : result ? 'Ready' : 'Idle'}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: loading ? '76%' : result ? '100%' : '18%' }}
              />
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="font-display text-base font-bold tracking-tight text-slate-950">
                {loading ? 'Processing image...' : result ? 'Output ready' : 'Waiting for source'}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {loading
                  ? 'Analyzing the source and preparing the next export.'
                  : result
                    ? 'Preview, compare, and download the final export.'
                    : 'Upload an image and tune the settings to start the workflow.'}
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] bg-slate-950 p-6 text-white">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
                {tool.slug === 'image-to-text' ? (
                  <ScanSearch className="h-5 w-5" />
                ) : (
                  <BadgeCheck className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
                  Result
                </p>
                <h2 className="font-display text-2xl font-extrabold tracking-tight">
                  {result ? 'Your export is ready' : copy.emptyTitle}
                </h2>
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl bg-rose-500/12 p-4 text-sm leading-6 text-rose-200">{error}</div>
            ) : result?.previewUrl ? (
              <div className="space-y-4">
                <div className="relative h-[320px] overflow-hidden rounded-[1.7rem] bg-white">
                  <Image
                    src={result.previewUrl}
                    alt={`${tool.name} result`}
                    fill
                    unoptimized
                    sizes="(max-width: 1280px) 100vw, 560px"
                    className="object-contain"
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {result.metrics?.map(metric => (
                    <div key={metric.label} className="rounded-2xl bg-white/8 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : result?.output ? (
              <div className="space-y-4">
                <pre className="max-h-[320px] overflow-auto rounded-[1.6rem] bg-white/6 p-4 text-sm leading-6 text-slate-200 whitespace-pre-wrap">
                  {result.output}
                </pre>
              </div>
            ) : (
              <div className="rounded-[1.7rem] bg-white/6 p-6">
                <p className="text-sm leading-6 text-slate-300">
                  Upload the source file, tune the settings, and run the workflow to see the final export here.
                </p>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleProcess}
                disabled={!file || loading}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {copy.actionLabel}
              </button>
              {(result?.outputBlob || result?.output) && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100"
                >
                  <Download className="h-4 w-4" />
                  Download result
                </button>
              )}
              {file && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  Reset
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
