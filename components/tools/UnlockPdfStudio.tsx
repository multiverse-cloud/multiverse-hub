'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircle2,
  Download,
  FileLock2,
  FileUp,
  KeyRound,
  Loader2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { getResponseFilename } from './processors/file-download'
import { usePdfPreviewData } from './pdf-browser'

export default function UnlockPdfStudio({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('Upload a protected PDF')
  const [apiError, setApiError] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const {
    pages: outputPreviewPages,
    totalPages: outputPages,
    previewUrl: outputPreviewUrl,
  } = usePdfPreviewData(outputBlob, { maxPages: 4, scale: 0.46 })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const nextFile = acceptedFiles[0]
    if (!nextFile) return
    setFile(nextFile)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setProgress(0)
    setPhase('Ready to unlock')
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
    maxFiles: 1,
    multiple: false,
  })

  async function handleUnlock() {
    if (!file || !password.trim()) return

    setLoading(true)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setProgress(10)
    setPhase('Verifying password...')

    const interval = window.setInterval(() => {
      setProgress(current => {
        const next = current < 88 ? current + Math.random() * 10 : current
        setPhase(next < 42 ? 'Verifying password...' : next < 74 ? 'Decrypting PDF...' : 'Finalizing unlocked copy...')
        return next
      })
    }, 320)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('password', password.trim())

      const response = await fetch('/api/tools/pdf/transform?action=unlock', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Unlock failed')
      }

      const blob = await response.blob()
      setOutputBlob(blob)
      setOutputFilename(getResponseFilename(response, `${file.name.replace(/\.pdf$/i, '')}-unlocked.pdf`))
      setProgress(100)
      setPhase('Unlocked PDF ready')
    } catch (error) {
      setApiError((error as Error).message)
    } finally {
      window.clearInterval(interval)
      setLoading(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="max-w-3xl space-y-3">
        <span className="premium-chip">Secure PDF unlock</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          Unlock PDF
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Remove the password from a protected PDF when you already know the current password.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div
            {...getRootProps()}
            className={cn(
              'rounded-[1.75rem] border-2 border-dashed border-slate-200 bg-white px-8 py-14 text-center transition-all',
              isDragActive && 'border-indigo-400 bg-indigo-50/40'
            )}
          >
            <input {...getInputProps()} />
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <FileUp className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">Drop your protected PDF here</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Use the current document password to create an unlocked copy.
            </p>
            <button type="button" onClick={open} className="btn-primary mt-8 px-10 py-4">
              Choose File
            </button>
            {file && (
              <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
                <p className="truncate font-display text-sm font-bold text-slate-950">{file.name}</p>
                <p className="mt-1 text-xs text-slate-500">{formatBytes(file.size)}</p>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
            <div className="premium-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
                  <KeyRound className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-slate-950">Document Password</h3>
                  <p className="mt-1 text-sm text-slate-500">Enter the existing PDF password.</p>
                </div>
              </div>
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Enter current PDF password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white"
              />
              <div className="mt-5">
                <button type="button" onClick={handleUnlock} disabled={!file || !password.trim() || loading} className="btn-primary inline-flex items-center gap-2 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Unlock PDF
                </button>
              </div>
            </div>

            <div className="premium-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight text-slate-950">Trust Signals</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">Private in-session processing</div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">No public share links</div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">Unlocked file returned as a new copy</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] bg-slate-50 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Unlocked Preview</h3>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                {outputPages || 0} pages
              </span>
            </div>
            {outputPreviewPages.length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <Image src={outputPreviewPages[0].src} alt={`Preview page ${outputPreviewPages[0].pageNumber}`} width={outputPreviewPages[0].width} height={outputPreviewPages[0].height} unoptimized className="h-auto w-full rounded-xl object-cover" />
                </div>
              </div>
            ) : outputPreviewUrl ? (
              <iframe src={`${outputPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0`} title="Unlocked PDF preview" className="h-[430px] w-full rounded-2xl border border-slate-200 bg-white" />
            ) : (
              <div className="flex h-[430px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">
                Unlock the file to preview the clean PDF here.
              </div>
            )}
          </div>

          <div className="premium-card p-6 shadow-[0_16px_32px_-28px_rgba(37,99,235,0.35)]">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-base font-bold tracking-tight text-slate-950">Secure Unlock Process</h2>
              <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
            </div>
            <div className="mb-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileLock2 className="h-4 w-4" />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">{phase}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Password verification and PDF decryption happen during this flow.</p>
              </div>
            </div>
          </div>

          <div className="noise relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_42%)]" />
            <div className="relative z-10 space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/90">
                {outputBlob ? <CheckCircle2 className="h-5 w-5" /> : <FileLock2 className="h-5 w-5" />}
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-extrabold tracking-tight">
                  {outputBlob ? 'Unlocked PDF ready' : 'Your unlocked PDF will appear here'}
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  {outputBlob ? 'The unlocked copy is ready for download.' : 'Upload the file, enter the password, and run unlock.'}
                </p>
              </div>
              {outputBlob && (
                <button type="button" onClick={() => downloadBlob(outputBlob, outputFilename || 'unlocked.pdf')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold tracking-tight text-slate-950 transition hover:bg-slate-100">
                  <Download className="h-4 w-4" />
                  Download Unlocked PDF
                </button>
              )}
            </div>
          </div>

          {apiError && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{apiError}</div>}
        </div>
      </div>
    </section>
  )
}
