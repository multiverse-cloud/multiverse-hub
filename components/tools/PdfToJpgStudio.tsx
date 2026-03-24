'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircle2,
  Download,
  FileImage,
  FileUp,
  Loader2,
  Sparkles,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { exportPdfPagesAsJpg, parsePageSelection } from './pdf-client-utils'
import { usePdfPreviewData } from './pdf-browser'

type QualityPreset = 'standard' | 'high' | 'max'

const QUALITY_CONFIG: Record<QualityPreset, { scale: number; quality: number; label: string }> = {
  standard: { scale: 1.2, quality: 0.76, label: 'Smaller' },
  high: { scale: 1.6, quality: 0.86, label: 'Balanced' },
  max: { scale: 2.1, quality: 0.94, label: 'Best' },
}

export default function PdfToJpgStudio({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState<QualityPreset>('high')
  const [rangeInput, setRangeInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('Upload a PDF')
  const [apiError, setApiError] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const [exportedPages, setExportedPages] = useState(0)

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const requestedPages = useMemo(
    () => parsePageSelection(rangeInput, 0),
    [rangeInput]
  )
  const {
    pages: previewPages,
    totalPages,
    previewUrl,
    loading: previewLoading,
    error: previewError,
  } = usePdfPreviewData(file, {
    maxPages: requestedPages.length > 0 ? Math.min(requestedPages.length, 8) : 8,
    pageNumbers: requestedPages.length > 0 ? requestedPages : undefined,
    scale: 0.42,
  })
  const selectedPages = useMemo(
    () => parsePageSelection(rangeInput, totalPages || 0),
    [rangeInput, totalPages]
  )

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const nextFile = acceptedFiles[0]
    if (!nextFile) return

    setFile(nextFile)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setExportedPages(0)
    setProgress(0)
    setPhase('Ready to export')
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
    maxFiles: 1,
    multiple: false,
  })

  async function handleExport() {
    if (!file) return

    setLoading(true)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setProgress(10)
    setPhase('Rendering PDF pages...')

    try {
      const config = QUALITY_CONFIG[quality]
      const result = await exportPdfPagesAsJpg(file, {
        pageNumbers: selectedPages.length > 0 ? selectedPages : undefined,
        scale: config.scale,
        quality: config.quality,
        zipBaseName: file.name.replace(/\.pdf$/i, ''),
        onProgress: (current, total) => {
          setPhase('Packaging JPG files...')
          setProgress(45 + (current / total) * 45)
        },
      })

      setOutputBlob(result.blob)
      setOutputFilename(result.filename)
      setExportedPages(result.pages)
      setProgress(100)
      setPhase('JPG export ready')
    } catch (error) {
      setApiError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="max-w-3xl space-y-3">
        <span className="premium-chip">Page images from PDF</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          PDF to JPG
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Export PDF pages as JPG images with quality and page selection control.
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
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">Drop your PDF here</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Export all pages or only selected page ranges as JPG images.
            </p>
            <button type="button" onClick={open} className="btn-primary mt-8 px-10 py-4">
              Choose File
            </button>
            {file && (
              <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
                <p className="truncate font-display text-sm font-bold text-slate-950">{file.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatBytes(file.size)}
                  {totalPages ? `  -  ${totalPages} pages` : ''}
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="premium-card p-5">
              <h4 className="font-display text-base font-bold tracking-tight text-slate-950">Quality</h4>
              <div className="mt-4 space-y-2">
                {(Object.keys(QUALITY_CONFIG) as QualityPreset[]).map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setQuality(option)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition-all',
                      quality === option ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                    )}
                  >
                    <span className="font-semibold capitalize">{option}</span>
                    <span className="text-xs">{QUALITY_CONFIG[option].label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="premium-card p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-display text-base font-bold tracking-tight text-slate-950">Page Selection</h4>
                  <p className="mt-1 text-sm text-slate-500">Leave blank to export every page.</p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                  {selectedPages.length > 0 ? `${selectedPages.length} selected` : 'All pages'}
                </span>
              </div>
              <input
                value={rangeInput}
                onChange={event => setRangeInput(event.target.value)}
                placeholder="1-3, 5, 7-8"
                className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExport}
              disabled={!file || loading}
              className="btn-primary inline-flex items-center gap-2 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Export JPG
            </button>
            {outputBlob && (
              <button
                type="button"
                onClick={() => downloadBlob(outputBlob, outputFilename || 'pdf-pages.zip')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Download JPG
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] bg-slate-50 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Page Thumbnails</h3>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                {selectedPages.length > 0 ? `${selectedPages.length} selected` : `${totalPages || 0} pages`}
              </span>
            </div>

            {previewPages.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {previewPages.map(page => (
                  <div key={page.pageNumber} className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                    <Image src={page.src} alt={`Page ${page.pageNumber}`} width={page.width} height={page.height} unoptimized className="h-auto w-full rounded-xl object-cover" />
                    <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      Page {page.pageNumber}
                    </p>
                  </div>
                ))}
              </div>
            ) : previewUrl ? (
              <iframe
                src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                title="PDF preview"
                className="h-[430px] w-full rounded-2xl border border-slate-200 bg-white"
              />
            ) : (
              <div className="flex h-[430px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">
                {previewLoading ? 'Loading preview...' : 'Upload a PDF to preview the pages.'}
              </div>
            )}
            {previewError && <p className="mt-3 text-xs text-amber-600">Live thumbnails are unavailable for this PDF.</p>}
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
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">{phase}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Export the selected PDF pages as JPG images.</p>
              </div>
            </div>
          </div>

          <div className="noise relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_42%)]" />
            <div className="relative z-10 space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/90">
                {outputBlob ? <CheckCircle2 className="h-5 w-5" /> : <FileImage className="h-5 w-5" />}
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-extrabold tracking-tight">
                  {outputBlob ? 'JPG export ready' : 'Your JPG files will appear here'}
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  {outputBlob ? `${exportedPages} page${exportedPages === 1 ? '' : 's'} exported.` : 'Choose quality and page selection before export.'}
                </p>
              </div>
              {outputBlob && (
                <button type="button" onClick={() => downloadBlob(outputBlob, outputFilename || 'pdf-pages.zip')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold tracking-tight text-slate-950 transition hover:bg-slate-100">
                  <Download className="h-4 w-4" />
                  Download JPG Files
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
