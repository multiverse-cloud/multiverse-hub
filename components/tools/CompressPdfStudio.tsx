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
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_324px] xl:items-start">
      <div className="space-y-5">
        <div className="max-w-3xl space-y-3">
          <span className="premium-chip">Free PDF compressor</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            Compress PDF
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Reduce PDF size without changing the page layout.
          </p>
        </div>

        <div
          {...getRootProps()}
          className={cn(
            'rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-10 text-center transition-all duration-300 sm:px-8 sm:py-12',
            isDragActive && 'border-indigo-400 bg-indigo-50/40',
            file && 'border-indigo-200'
          )}
        >
          <input {...getInputProps()} />
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <FileUp className="h-7 w-7" />
          </div>
          <button type="button" onClick={open} className="btn-primary min-w-40 px-8 py-3">
            Choose File
          </button>
          <p className="mt-4 text-sm font-medium text-slate-600">or drop PDF here</p>
          <p className="mt-5 text-xs text-slate-500">PDF only. Private processing.</p>
          {file && (
            <div className="mx-auto mt-6 flex max-w-xl items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-slate-950">{file.name}</p>
                <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
            </div>
          )}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold tracking-tight text-slate-950">Compression Presets</h3>
            {PROFILE_OPTIONS.map(option => {
              const Icon = option.icon
              const active = profile === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setProfile(option.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all',
                    active
                      ? 'border-indigo-500 bg-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full',
                        active ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-slate-500'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold tracking-tight text-slate-950">
                        {option.title}
                      </p>
                      <p className="text-xs text-slate-500">{option.description}</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full border-2',
                      active ? 'border-indigo-600' : 'border-slate-300'
                    )}
                  >
                    {active && <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
            <h3 className="font-display text-sm font-bold tracking-tight text-indigo-700">Optimization Stats</h3>
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-500/80">Current Size</p>
                <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950">
                  {file ? formatBytes(file.size) : '0 MB'}
                </p>
              </div>
              <div className="h-px bg-indigo-200/70" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600">
                  {compressedSize ? 'New Size' : 'Estimated Size'}
                </p>
                <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-indigo-700">
                  {displayedSize ? formatBytes(displayedSize) : '0 MB'}
                </p>
                {displayedSavings !== null && (
                  <span className="mt-3 inline-flex rounded-md bg-indigo-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    -{displayedSavings}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-4 xl:sticky xl:top-24">
        <div className="premium-card p-6 shadow-[0_16px_32px_-28px_rgba(37,99,235,0.35)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-base font-bold tracking-tight text-slate-950">Live Process</h2>
            <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
          </div>
          <div className="mb-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-950">{liveTitle}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{liveDescription}</p>
            </div>
          </div>
        </div>

        <div className="noise relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_42%)]" />
          <div className="relative z-10 space-y-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/90">
              {outputBlob ? <CheckCircle2 className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                {outputBlob && displayedSavings !== null
                  ? `Your PDF is now ${displayedSavings}% smaller`
                  : 'Your compressed file will appear here'}
              </h2>
              <p className="text-sm leading-6 text-slate-300">
                {outputBlob ? 'Optimization complete. Ready to download.' : 'Choose a preset and run compression.'}
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-1">
              {outputBlob ? (
                <>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold tracking-tight text-slate-950 transition hover:bg-slate-100"
                  >
                    <Download className="h-4 w-4" />
                    Download Compressed PDF
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-display text-sm font-bold tracking-tight text-white transition hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4" />
                    {shareCopied ? 'Link Copied' : 'Share Link'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleCompress}
                  disabled={!file || loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold tracking-tight text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-white/70"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Compress PDF
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Pro Tip</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Recommended works best for most PDFs.</p>
        </div>

        {apiError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{apiError}</div>
        )}
      </aside>
    </section>
  )
}
