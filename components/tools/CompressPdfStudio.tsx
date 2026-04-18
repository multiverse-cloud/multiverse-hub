'use client'

import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircle2,
  Copy,
  Download,
  FileUp,
  Loader2,
  ShieldCheck,
  Sparkles,
  Stars,
  Zap,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { getResponseFilename } from './processors/file-download'

type CompressionProfile = 'extreme' | 'balanced' | 'light'

const PROFILE_OPTIONS: Array<{
  id: CompressionProfile
  title: string
  description: string
  icon: typeof Zap
  estimate: number
}> = [
  {
    id: 'extreme',
    title: 'Extreme Compression',
    description: 'Smallest size',
    icon: Zap,
    estimate: 72,
  },
  {
    id: 'balanced',
    title: 'Recommended Compression',
    description: 'Best balance',
    icon: Stars,
    estimate: 58,
  },
  {
    id: 'light',
    title: 'Less Compression',
    description: 'Higher quality',
    icon: ShieldCheck,
    estimate: 32,
  },
]

const PROCESS_PHASES = [
  'Reading PDF structure...',
  'Optimizing internal objects...',
  'Finalizing compressed file...',
]

function getEstimatedSize(originalSize: number, estimate: number) {
  return originalSize * (1 - estimate / 100)
}

export default function CompressPdfStudio({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null)
  const [profile, setProfile] = useState<CompressionProfile>('balanced')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [apiError, setApiError] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const [savingsPercent, setSavingsPercent] = useState<number | null>(null)
  const [compressedSize, setCompressedSize] = useState<number | null>(null)
  const [activePhase, setActivePhase] = useState(0)
  const [shareCopied, setShareCopied] = useState(false)

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const selectedProfile = PROFILE_OPTIONS.find(option => option.id === profile) || PROFILE_OPTIONS[1]
  const estimatedSize = file ? getEstimatedSize(file.size, selectedProfile.estimate) : null
  const displayedSize = compressedSize ?? estimatedSize
  const displayedSavings = savingsPercent ?? (file ? selectedProfile.estimate : null)
  const liveTitle = loading ? PROCESS_PHASES[activePhase] : outputBlob ? 'Compression complete' : 'Ready to compress'
  const liveDescription = loading
    ? 'Creating a smaller PDF.'
    : outputBlob
      ? 'Your file is ready.'
      : 'Upload one PDF and choose a preset.'

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const nextFile = acceptedFiles[0]
    if (!nextFile) return

    setFile(nextFile)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setSavingsPercent(null)
    setCompressedSize(null)
    setProgress(0)
    setShareCopied(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    noClick: true,
    maxFiles: 1,
  })

  async function handleCompress() {
    if (!file) return

    setLoading(true)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setSavingsPercent(null)
    setCompressedSize(null)
    setShareCopied(false)
    setProgress(8)
    setActivePhase(0)

    const interval = window.setInterval(() => {
      setProgress(current => {
        const next = current < 88 ? current + Math.random() * 11 : current
        setActivePhase(next < 35 ? 0 : next < 68 ? 1 : 2)
        return next
      })
    }, 380)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('profile', profile)

      const response = await fetch('/api/tools/pdf/compress', { method: 'POST', body: formData })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Compression failed')
      }

      const blob = await response.blob()
      const nextFilename = getResponseFilename(response, `${file.name.replace(/\.pdf$/i, '')}-compressed.pdf`)

      setOutputBlob(blob)
      setOutputFilename(nextFilename)
      setCompressedSize(blob.size)
      setSavingsPercent(Number(response.headers.get('X-Savings-Percent') || selectedProfile.estimate))
      setProgress(100)
      setActivePhase(2)
    } catch (error) {
      setApiError((error as Error).message)
    } finally {
      window.clearInterval(interval)
      setLoading(false)
    }
  }

  function handleDownload() {
    if (outputBlob) downloadBlob(outputBlob, outputFilename || 'compressed.pdf')
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShareCopied(true)
      window.setTimeout(() => setShareCopied(false), 1800)
    } catch {
      setShareCopied(false)
    }
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_324px] xl:items-start sm:gap-5">
      <div className="space-y-4 sm:space-y-5">
        <div className="max-w-3xl space-y-2 sm:space-y-3">
          <span className="premium-chip text-[10px] px-2 py-0.5 sm:text-xs sm:px-2.5 sm:py-1">Free PDF compressor</span>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 md:text-4xl sm:text-3xl md:text-5xl">
            Compress PDF
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-8">
            Reduce PDF size without changing the page layout.
          </p>
        </div>

        <div
          {...getRootProps()}
          className={cn(
            'rounded-xl border-2 border-dashed border-slate-200 bg-white px-4 py-8 text-center transition-all duration-300 sm:rounded-2xl sm:px-6 sm:py-10 sm:px-8 sm:py-12',
            isDragActive && 'border-indigo-400 bg-indigo-50/40',
            file && 'border-indigo-200'
          )}
        >
          <input {...getInputProps()} />
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 sm:mb-5 sm:h-16 sm:w-16 sm:rounded-2xl">
            <FileUp className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <button type="button" onClick={open} className="btn-primary min-w-32 px-6 py-2.5 text-xs sm:min-w-40 sm:px-8 sm:py-3 sm:text-sm">
            Choose File
          </button>
          <p className="mt-3 text-xs font-medium text-slate-600 sm:mt-4 sm:text-sm">or drop PDF here</p>
          <p className="mt-4 text-[10px] text-slate-500 sm:mt-5 sm:text-xs">PDF only. Private processing.</p>
          {file && (
            <div className="mx-auto mt-5 flex max-w-xl items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left shadow-sm sm:mt-6 sm:rounded-2xl sm:px-4 sm:py-3">
              <div className="min-w-0">
                <p className="truncate font-display text-xs font-bold text-slate-950 sm:text-sm">{file.name}</p>
                <p className="text-[10px] text-slate-500 sm:text-xs">{formatBytes(file.size)}</p>
              </div>
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 sm:h-5 sm:w-5" />
            </div>
          )}
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start sm:gap-4">
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-display text-base font-bold tracking-tight text-slate-950 sm:text-lg">Compression Presets</h3>
            {PROFILE_OPTIONS.map(option => {
              const Icon = option.icon
              const active = profile === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setProfile(option.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition-all sm:rounded-2xl sm:px-4 sm:py-4',
                    active
                      ? 'border-indigo-500 bg-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                  )}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9',
                        active ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-slate-500'
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <p className="font-display text-xs font-bold tracking-tight text-slate-950 sm:text-sm">
                        {option.title}
                      </p>
                      <p className="text-[10px] text-slate-500 sm:text-xs">{option.description}</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'flex h-4 w-4 items-center justify-center rounded-full border-2 sm:h-5 sm:w-5',
                      active ? 'border-indigo-600' : 'border-slate-300'
                    )}
                  >
                    {active && <div className="h-2 w-2 rounded-full bg-indigo-600 sm:h-2.5 sm:w-2.5" />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 sm:rounded-2xl sm:p-5">
            <h3 className="font-display text-xs font-bold tracking-tight text-indigo-700 sm:text-sm">Optimization Stats</h3>
            <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500/80 sm:text-[11px]">Current Size</p>
                <p className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:mt-2 sm:text-3xl">
                  {file ? formatBytes(file.size) : '0 MB'}
                </p>
              </div>
              <div className="h-px bg-indigo-200/70" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600 sm:text-[11px]">
                  {compressedSize ? 'New Size' : 'Estimated Size'}
                </p>
                <p className="mt-1.5 font-display text-3xl font-extrabold tracking-tight text-indigo-700 sm:mt-2 sm:text-4xl">
                  {displayedSize ? formatBytes(displayedSize) : '0 MB'}
                </p>
                {displayedSavings !== null && (
                  <span className="mt-2 inline-flex rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:mt-3 sm:py-1">
                    -{displayedSavings}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-3 xl:sticky xl:top-24 sm:space-y-4">
        <div className="premium-card p-4 shadow-[0_16px_32px_-28px_rgba(37,99,235,0.35)] sm:p-6">
          <div className="mb-4 flex items-center justify-between sm:mb-5">
            <h2 className="font-display text-sm font-bold tracking-tight text-slate-950 sm:text-base">Live Process</h2>
            <span className="text-xs font-bold text-indigo-600 sm:text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100 sm:mb-5 sm:h-2.5">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-2.5 sm:gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-10 sm:w-10 sm:rounded-2xl">
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" /> : <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-950 sm:text-sm">{liveTitle}</p>
              <p className="mt-0.5 text-[10px] leading-4 text-slate-500 sm:mt-1 sm:text-xs sm:leading-5">{liveDescription}</p>
            </div>
          </div>
        </div>

        <div className="noise relative overflow-hidden rounded-xl bg-slate-950 p-4 text-white sm:rounded-2xl sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_42%)]" />
          <div className="relative z-10 space-y-4 sm:space-y-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/90 sm:h-12 sm:w-12 sm:rounded-2xl">
              {outputBlob ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />}
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <h2 className="font-display text-xl font-extrabold tracking-tight sm:text-3xl">
                {outputBlob && displayedSavings !== null
                  ? `Your PDF is now ${displayedSavings}% smaller`
                  : 'Your compressed file will appear here'}
              </h2>
              <p className="text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">
                {outputBlob ? 'Optimization complete. Ready to download.' : 'Choose a preset and run compression.'}
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-1 sm:gap-3">
              {outputBlob ? (
                <>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2.5 font-display text-xs font-bold tracking-tight text-slate-950 transition hover:bg-slate-100 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Download Compressed PDF
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 font-display text-xs font-bold tracking-tight text-white transition hover:bg-white/10 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {shareCopied ? 'Link Copied' : 'Share Link'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleCompress}
                  disabled={!file || loading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2.5 font-display text-xs font-bold tracking-tight text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-white/70 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
                >
                  {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" /> : <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  Compress PDF
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:rounded-2xl sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-[11px]">Pro Tip</p>
          <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:mt-2 sm:text-sm sm:leading-6">Recommended works best for most PDFs.</p>
        </div>

        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 sm:rounded-2xl sm:p-4 sm:text-sm">{apiError}</div>
        )}
      </aside>
    </section>
  )
}
