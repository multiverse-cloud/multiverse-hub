'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircle2,
  Download,
  FileOutput,
  FileText,
  FileUp,
  Loader2,
  Sparkles,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { getResponseFilename } from './processors/file-download'
import { loadWordPreviewText } from './pdf-client-utils'
import { usePdfPreviewData } from './pdf-browser'

export default function WordToPdfStudio({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null)
  const [sourcePreview, setSourcePreview] = useState('')
  const [sourcePreviewSupported, setSourcePreviewSupported] = useState(true)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('Upload a Word file')
  const [apiError, setApiError] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const {
    pages: resultPreviewPages,
    totalPages: resultPageCount,
    previewUrl: resultPreviewUrl,
    loading: resultPreviewLoading,
  } = usePdfPreviewData(outputBlob, { maxPages: 4, scale: 0.46 })

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const nextFile = acceptedFiles[0]
    if (!nextFile) return

    setFile(nextFile)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setProgress(0)
    setPhase('Ready to convert')

    try {
      const preview = await loadWordPreviewText(nextFile)
      setSourcePreview(preview.preview)
      setSourcePreviewSupported(preview.supported)
    } catch {
      setSourcePreview('')
      setSourcePreviewSupported(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
    maxFiles: 1,
    multiple: false,
  })

  async function handleConvert() {
    if (!file) return

    setLoading(true)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setProgress(8)
    setPhase('Reading Word document...')

    const interval = window.setInterval(() => {
      setProgress(current => {
        const next = current < 88 ? current + Math.random() * 11 : current
        setPhase(next < 40 ? 'Reading Word document...' : next < 72 ? 'Building PDF...' : 'Finalizing PDF...')
        return next
      })
    }, 340)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/tools/pdf/transform?action=word-to-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Word to PDF failed')
      }

      const blob = await response.blob()
      setOutputBlob(blob)
      setOutputFilename(getResponseFilename(response, `${file.name.replace(/\.[^.]+$/, '')}.pdf`))
      setProgress(100)
      setPhase('PDF ready')
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
        <span className="premium-chip">Document to PDF</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          Word to PDF
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Convert DOCX files into a clean, share-ready PDF.
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
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">Drop your Word file here</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              DOCX works best for the built-in converter.
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

          <div className="premium-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-slate-950">Source Preview</h3>
                <p className="mt-1 text-sm text-slate-500">Readable text from the uploaded Word file.</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                {sourcePreviewSupported ? 'DOCX preview' : 'Limited'}
              </span>
            </div>
            {sourcePreview ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-600">
                  {sourcePreview.slice(0, 2200)}
                </pre>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                {file
                  ? sourcePreviewSupported
                    ? 'Preview is preparing...'
                    : 'Live preview works best with .docx files.'
                  : 'Upload a document to preview it.'}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleConvert}
              disabled={!file || loading}
              className="btn-primary inline-flex items-center gap-2 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Convert to PDF
            </button>
            {outputBlob && (
              <button
                type="button"
                onClick={() => downloadBlob(outputBlob, outputFilename || 'converted.pdf')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] bg-slate-50 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Converted PDF Preview</h3>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                {resultPageCount || 0} pages
              </span>
            </div>

            {resultPreviewPages.length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <Image
                    src={resultPreviewPages[0].src}
                    alt={`Preview page ${resultPreviewPages[0].pageNumber}`}
                    width={resultPreviewPages[0].width}
                    height={resultPreviewPages[0].height}
                    unoptimized
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </div>
              </div>
            ) : resultPreviewUrl ? (
              <iframe
                src={`${resultPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                title="Result preview"
                className="h-[430px] w-full rounded-2xl border border-slate-200 bg-white"
              />
            ) : (
              <div className="flex h-[430px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">
                {resultPreviewLoading ? 'Loading preview...' : 'Convert the file to preview the PDF here.'}
              </div>
            )}
          </div>

          <div className="premium-card p-6 shadow-[0_16px_32px_-28px_rgba(37,99,235,0.35)]">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-base font-bold tracking-tight text-slate-950">Live Process</h2>
              <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
            </div>
            <div className="mb-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileOutput className="h-4 w-4" />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">{phase}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Convert the Word document into a clean PDF output.</p>
              </div>
            </div>
          </div>

          <div className="noise relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_42%)]" />
            <div className="relative z-10 space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/90">
                {outputBlob ? <CheckCircle2 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-extrabold tracking-tight">
                  {outputBlob ? 'PDF ready to download' : 'Your PDF result will appear here'}
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  {outputBlob ? `Converted file size: ${formatBytes(outputBlob.size)}` : 'Upload a Word file and run conversion.'}
                </p>
              </div>
              {outputBlob && (
                <button
                  type="button"
                  onClick={() => downloadBlob(outputBlob, outputFilename || 'converted.pdf')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold tracking-tight text-slate-950 transition hover:bg-slate-100"
                >
                  <Download className="h-4 w-4" />
                  Download Converted PDF
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
