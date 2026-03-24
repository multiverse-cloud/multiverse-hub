'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircle2,
  Download,
  FileUp,
  FileText,
  Loader2,
  Minus,
  Plus,
  Sparkles,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { getResponseFilename } from './processors/file-download'
import { usePdfPreviewData } from './pdf-browser'

type SplitMode = 'range' | 'pages' | 'all'

type RangePart = {
  start: number
  end: number
  pages: number[]
}

const PROCESS_PHASES = [
  'Reading page map...',
  'Building output files...',
  'Packing split results...',
]

function baseName(filename: string) {
  return filename.replace(/\.pdf$/i, '').trim() || 'split'
}

function dedupe(values: number[]) {
  return Array.from(new Set(values))
}

function parseRangeInput(value: string, totalPages: number) {
  const parts = value
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)

  const ranges: RangePart[] = []

  for (const part of parts) {
    const [startText, endText] = part.split('-').map(item => item.trim())
    const start = Number.parseInt(startText, 10)
    const rawEnd = endText ? Number.parseInt(endText, 10) : start

    if (!Number.isFinite(start) || !Number.isFinite(rawEnd)) continue

    const from = Math.max(1, Math.min(start, rawEnd))
    const to = Math.min(totalPages, Math.max(start, rawEnd))

    if (from > totalPages || to < 1) continue

    ranges.push({
      start: from,
      end: to,
      pages: Array.from({ length: to - from + 1 }, (_, index) => from - 1 + index),
    })
  }

  return ranges
}

async function readPdfPageCount(file: File) {
  const { PDFDocument } = await import('pdf-lib')
  const bytes = await file.arrayBuffer()
  const document = await PDFDocument.load(bytes, { ignoreEncryption: true })
  return document.getPageCount()
}

export default function SplitPdfStudio({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [mode, setMode] = useState<SplitMode>('range')
  const [rangeInput, setRangeInput] = useState('1-5, 8-12')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activePhase, setActivePhase] = useState(0)
  const [apiError, setApiError] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const [outputAssets, setOutputAssets] = useState<number | null>(null)
  const [previewScale, setPreviewScale] = useState(1)

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const {
    pages: previewPages,
    totalPages: renderedPreviewPages,
    loading: previewLoading,
    error: previewError,
    previewUrl,
  } = usePdfPreviewData(file, { maxPages: 12, scale: 0.34 })
  const parsedRanges = useMemo(
    () => (pageCount > 0 ? parseRangeInput(rangeInput, pageCount) : []),
    [pageCount, rangeInput]
  )

  const selectedPages = useMemo(() => {
    if (pageCount <= 0) return []

    if (mode === 'range') return dedupe(parsedRanges.flatMap(range => range.pages))
    if (mode === 'pages') {
      const pages = parsedRanges.flatMap(range => range.pages)
      return pages.length > 0 ? dedupe(pages) : Array.from({ length: pageCount }, (_, index) => index)
    }

    return Array.from({ length: pageCount }, (_, index) => index)
  }, [mode, pageCount, parsedRanges])

  const computedAssets = useMemo(() => {
    const name = file ? baseName(file.name) : 'split'

    if (!file || pageCount === 0) return []

    if (mode === 'range') {
      return parsedRanges.map((range, index) => ({
        id: `${index}-${range.start}-${range.end}`,
        name:
          range.start === range.end
            ? `${name} - Page ${range.start}.pdf`
            : `${name} - Part ${index + 1} (Pages ${range.start}-${range.end}).pdf`,
      }))
    }

    const pages = mode === 'pages' ? selectedPages : Array.from({ length: pageCount }, (_, index) => index)
    return pages.map(pageIndex => ({
      id: `page-${pageIndex + 1}`,
      name: `${name} - Page ${pageIndex + 1}.pdf`,
    }))
  }, [file, mode, pageCount, parsedRanges, selectedPages])

  const liveTitle = loading
    ? PROCESS_PHASES[activePhase]
    : outputBlob
      ? 'Split complete'
      : file
        ? 'Ready to split'
        : 'Upload one PDF'
  const liveDescription = loading
    ? 'Preparing split files.'
    : outputBlob
      ? 'Your split package is ready.'
      : 'Choose a mode and page selection.'

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const nextFile = acceptedFiles[0]
      if (!nextFile) return

      setFile(nextFile)
      setApiError('')
      setOutputBlob(null)
      setOutputFilename('')
      setOutputAssets(null)
      setProgress(0)
      setActivePhase(0)

      try {
        const nextPageCount = await readPdfPageCount(nextFile)
        setPageCount(nextPageCount)
        setRangeInput(nextPageCount > 12 ? '1-5, 8-12' : `1-${Math.min(nextPageCount, 3)}`)
      } catch {
        setPageCount(0)
        setApiError('Could not read the PDF preview.')
      }
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    noClick: true,
    maxFiles: 1,
  })

  async function handleSplit() {
    if (!file) return

    setLoading(true)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setOutputAssets(null)
    setProgress(8)
    setActivePhase(0)

    const interval = window.setInterval(() => {
      setProgress(current => {
        const next = current < 88 ? current + Math.random() * 11 : current
        setActivePhase(next < 34 ? 0 : next < 70 ? 1 : 2)
        return next
      })
    }, 360)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('mode', mode)
      if (mode !== 'all' && rangeInput.trim()) {
        formData.append('range', rangeInput.trim())
      }

      const response = await fetch('/api/tools/pdf/split', { method: 'POST', body: formData })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Split failed')
      }

      const blob = await response.blob()
      setOutputBlob(blob)
      setOutputFilename(getResponseFilename(response, `${baseName(file.name)}-split.zip`))
      setOutputAssets(Number(response.headers.get('X-Split-Assets') || computedAssets.length || 0))
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
    if (outputBlob) {
      downloadBlob(outputBlob, outputFilename || 'split-pages.zip')
    }
  }

  const displayedPageCount = renderedPreviewPages || pageCount

  return (
    <section className="space-y-6">
      <div className="max-w-3xl space-y-3">
        <span className="premium-chip">Free PDF splitter</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-indigo-700 md:text-5xl">
          Split PDF
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Split pages with clean control.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-5">
          <div
            {...getRootProps()}
            className={cn(
              'rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center transition-all',
              isDragActive && 'border-indigo-400 bg-indigo-50/40'
            )}
          >
            <input {...getInputProps()} />
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <FileUp className="h-7 w-7" />
            </div>
            <p className="font-display text-lg font-bold tracking-tight text-slate-950">Drop your PDF here</p>
            <p className="mt-2 text-sm text-slate-500">PDF only</p>
            <button type="button" onClick={open} className="btn-primary mt-6 px-8 py-3">
              Choose File
            </button>
            {file && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
                <p className="truncate font-display text-sm font-bold text-slate-950">{file.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatBytes(file.size)}{pageCount ? `  -  ${pageCount} pages` : ''}
                </p>
              </div>
            )}
          </div>

          <div className="premium-card p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Split Mode</p>
            <div className="mt-4 flex rounded-full bg-slate-100 p-1">
              {[
                { id: 'range' as const, label: 'Custom Ranges' },
                { id: 'pages' as const, label: 'Split by Pages' },
                { id: 'all' as const, label: 'Extract All' },
              ].map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setMode(option.id)
                    setOutputBlob(null)
                    setOutputFilename('')
                    setOutputAssets(null)
                    setApiError('')
                  }}
                  className={cn(
                    'flex-1 rounded-full px-3 py-2 text-[11px] font-bold transition-all',
                    mode === option.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {mode !== 'all' && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Range Selection
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setRangeInput(current => (current ? `${current}, ` : '') + `${Math.max(1, selectedPages.length + 1)}`)
                    }}
                    className="text-xs font-bold text-indigo-600"
                  >
                    Add Range
                  </button>
                </div>
                <input
                  value={rangeInput}
                  onChange={event => setRangeInput(event.target.value)}
                  placeholder="1-5, 8-12"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm font-bold text-indigo-700 outline-none transition focus:border-indigo-400 focus:bg-white"
                />
                <p className="text-[11px] text-slate-500">
                  Use commas for multiple ranges or single pages.
                </p>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold tracking-tight text-slate-950">Ready to Split</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {computedAssets.length} output file{computedAssets.length === 1 ? '' : 's'}
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
              </div>
              <button
                type="button"
                onClick={handleSplit}
                disabled={!file || loading || (mode === 'range' && parsedRanges.length === 0)}
                className="btn-primary mt-5 w-full px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Processing...' : 'Process Split'}
              </button>
            </div>
          </div>

          {(computedAssets.length > 0 || outputBlob) && (
            <div className="rounded-2xl border-l-4 border-indigo-600 bg-slate-50 p-5">
              <h3 className="font-display text-sm font-bold tracking-tight text-slate-950">Generated Assets</h3>
              <div className="mt-4 space-y-3">
                {computedAssets.slice(0, 4).map(asset => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <FileText className="h-4 w-4 shrink-0 text-indigo-600" />
                      <span className="truncate text-sm text-slate-700">{asset.name}</span>
                    </div>
                    <Download className="h-4 w-4 shrink-0 text-slate-400" />
                  </div>
                ))}
                {computedAssets.length > 4 && (
                  <p className="text-xs text-slate-500">+ {computedAssets.length - 4} more files</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-[1.75rem] bg-slate-50 p-6 md:p-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
                Document Preview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {file ? `${file.name} (${displayedPageCount} pages)` : 'Upload a PDF to preview pages'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewScale(current => Math.max(0.85, current - 0.05))}
                className="rounded-lg bg-white p-2 text-slate-500 transition hover:text-indigo-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewScale(current => Math.min(1.15, current + 0.05))}
                className="rounded-lg bg-white p-2 text-slate-500 transition hover:text-indigo-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
            style={{ transform: `scale(${previewScale})`, transformOrigin: 'top left' }}
          >
            {previewPages.length > 0 ? (
              previewPages.map(page => {
                const selected = selectedPages.includes(page.pageNumber - 1)
                return (
                  <div key={page.pageNumber} className="relative">
                    <div
                      className={cn(
                        'aspect-[3/4] overflow-hidden rounded-xl border-2 bg-white p-2 shadow-sm transition-all',
                        selected
                          ? 'border-indigo-600 ring-4 ring-indigo-100'
                          : 'border-transparent opacity-45'
                      )}
                    >
                      <Image
                        src={page.src}
                        alt={`Preview page ${page.pageNumber}`}
                        width={page.width}
                        height={page.height}
                        unoptimized
                        className="h-full w-full rounded-lg object-cover"
                      />
                      <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                        {page.pageNumber}
                      </div>
                    </div>
                    <p className={cn('mt-2 text-center text-xs font-bold', selected ? 'text-indigo-700' : 'text-slate-400')}>
                      Page {page.pageNumber}
                    </p>
                  </div>
                )
              })
            ) : previewUrl ? (
              <div className="col-span-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <iframe
                  src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="Split PDF preview"
                  className="h-[540px] w-full border-0 bg-white"
                />
              </div>
            ) : (
              <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
                {previewLoading ? 'Loading preview...' : 'No preview yet.'}
              </div>
            )}
          </div>

          {previewError && (
            <p className="mt-4 text-xs text-amber-600">
              Thumbnail preview is unavailable, but the PDF preview still loads.
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="premium-card p-5">
          <h3 className="font-display text-base font-bold tracking-tight text-slate-950">Live Process</h3>
          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-950">{liveTitle}</p>
              <p className="mt-1 text-xs text-slate-500">{liveDescription}</p>
            </div>
          </div>
        </div>

        <div className="noise relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.26),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_42%)]" />
          <div className="relative z-10 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/90">
              {outputBlob ? <CheckCircle2 className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-display text-3xl font-extrabold tracking-tight">
                {outputBlob ? 'Split package ready' : 'Your split result will appear here'}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {outputBlob
                  ? `${outputAssets || computedAssets.length} file${(outputAssets || computedAssets.length) === 1 ? '' : 's'} ready to download.`
                  : 'Choose a mode and process the file.'}
              </p>
            </div>
            {outputBlob ? (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold text-slate-950 transition hover:bg-slate-100"
              >
                <Download className="h-4 w-4" />
                Download Split ZIP
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {apiError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{apiError}</div>
      )}
    </section>
  )
}
