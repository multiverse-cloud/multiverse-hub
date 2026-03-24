'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Download,
  Eye,
  FilePlus2,
  FileText,
  GripVertical,
  ListTree,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { getResponseFilename } from './processors/file-download'
import { usePdfPreviewData } from './pdf-browser'

type MergeItemStatus = 'reading' | 'ready' | 'error'

type MergeItem = {
  id: string
  signature: string
  file: File
  pages: number | null
  status: MergeItemStatus
}

const PROCESS_PHASES = [
  'Reading files...',
  'Combining page order...',
  'Finalizing merged PDF...',
]

function getFileSignature(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

function getDisplayName(filename: string) {
  return filename.replace(/\.pdf$/i, '')
}

function createItem(file: File): MergeItem {
  return {
    id: `${getFileSignature(file)}-${Math.random().toString(36).slice(2, 7)}`,
    signature: getFileSignature(file),
    file,
    pages: null,
    status: 'reading',
  }
}

async function readPdfPageCount(file: File) {
  const { PDFDocument } = await import('pdf-lib')
  const bytes = await file.arrayBuffer()
  const document = await PDFDocument.load(bytes, { ignoreEncryption: true })
  return document.getPageCount()
}

export default function MergePdfStudio({ tool }: { tool: Tool }) {
  const [items, setItems] = useState<MergeItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [includeContents, setIncludeContents] = useState(true)
  const [flattenForms, setFlattenForms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activePhase, setActivePhase] = useState(0)
  const [apiError, setApiError] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const [outputPages, setOutputPages] = useState<number | null>(null)
  const outputUrlRef = useRef<string | null>(null)

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const activeItem = items.find(item => item.id === activeId) || items[0] || null
  const {
    pages: activePreviewPages,
    loading: activePreviewLoading,
    error: activePreviewError,
    previewUrl: activePreviewUrl,
  } = usePdfPreviewData(activeItem?.file || null, { maxPages: 4, scale: 0.34 })
  const readyItems = items.filter(item => item.status !== 'error')
  const readyToMerge = readyItems.length >= 2
  const totalInputSize = readyItems.reduce((sum, item) => sum + item.file.size, 0)
  const totalPages = readyItems.reduce((sum, item) => sum + (item.pages || 0), 0)
  const estimatedPages = totalPages + (includeContents && readyItems.length > 1 ? 1 : 0)
  const liveTitle = loading
    ? PROCESS_PHASES[activePhase]
    : outputBlob
      ? 'Merge complete'
      : readyToMerge
        ? 'Ready to merge'
        : 'Add at least two PDFs'
  const liveDescription = loading
    ? 'Building one clean PDF.'
    : outputBlob
      ? 'Your merged file is ready.'
      : 'Upload files and set the order.'

  const resetResult = useCallback(() => {
    setOutputBlob(null)
    setOutputFilename('')
    setOutputPages(null)
    setApiError('')
    setProgress(0)
    setActivePhase(0)

    if (outputUrlRef.current) {
      URL.revokeObjectURL(outputUrlRef.current)
      outputUrlRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (outputUrlRef.current) {
        URL.revokeObjectURL(outputUrlRef.current)
        outputUrlRef.current = null
      }
    }
  }, [])

  const addFiles = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      resetResult()

      const existing = new Set(items.map(item => item.signature))
      const nextFiles = acceptedFiles.filter(file => !existing.has(getFileSignature(file)))
      if (nextFiles.length === 0) return

      const draftItems = nextFiles.map(createItem)
      setItems(current => [...current, ...draftItems])
      setActiveId(current => current || draftItems[0]?.id || null)

      const parsed = await Promise.all(
        draftItems.map(async item => {
          try {
            const pages = await readPdfPageCount(item.file)
            return { ...item, pages, status: 'ready' as const }
          } catch {
            return { ...item, pages: null, status: 'error' as const }
          }
        })
      )

      setItems(current =>
        current.map(item => parsed.find(parsedItem => parsedItem.id === item.id) || item)
      )
    },
    [items, resetResult]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      void addFiles(acceptedFiles)
    },
    [addFiles]
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    noClick: true,
  })

  function moveItem(fromId: string, toId: string) {
    if (fromId === toId) return

    setItems(current => {
      const fromIndex = current.findIndex(item => item.id === fromId)
      const toIndex = current.findIndex(item => item.id === toId)
      if (fromIndex === -1 || toIndex === -1) return current

      const next = [...current]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
    resetResult()
  }

  function moveByOffset(id: string, offset: number) {
    setItems(current => {
      const index = current.findIndex(item => item.id === id)
      const nextIndex = index + offset
      if (index === -1 || nextIndex < 0 || nextIndex >= current.length) return current

      const next = [...current]
      const [moved] = next.splice(index, 1)
      next.splice(nextIndex, 0, moved)
      return next
    })
    resetResult()
  }

  function removeItem(id: string) {
    setItems(current => {
      const next = current.filter(item => item.id !== id)
      setActiveId(active => (active === id ? next[0]?.id || null : active))
      return next
    })
    resetResult()
  }

  function clearAll() {
    setItems([])
    setActiveId(null)
    resetResult()
    setProgress(0)
  }

  async function handleMerge() {
    if (!readyToMerge) return

    resetResult()
    setLoading(true)
    setProgress(8)
    setActivePhase(0)

    const interval = window.setInterval(() => {
      setProgress(current => {
        const next = current < 88 ? current + Math.random() * 10 : current
        setActivePhase(next < 33 ? 0 : next < 70 ? 1 : 2)
        return next
      })
    }, 360)

    try {
      const formData = new FormData()
      readyItems.forEach(item => formData.append('files', item.file))
      formData.append('includeContents', String(includeContents))
      formData.append('flattenForms', String(flattenForms))

      const response = await fetch('/api/tools/pdf/merge', { method: 'POST', body: formData })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Merge failed')
      }

      const blob = await response.blob()
      const nextFilename = getResponseFilename(response, 'merged.pdf')
      const nextUrl = URL.createObjectURL(blob)

      if (outputUrlRef.current) URL.revokeObjectURL(outputUrlRef.current)
      outputUrlRef.current = nextUrl

      setOutputBlob(blob)
      setOutputFilename(nextFilename)
      setOutputPages(Number(response.headers.get('X-Total-Pages') || estimatedPages || 0))
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
      downloadBlob(outputBlob, outputFilename || 'merged.pdf')
    }
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_324px] xl:items-start">
      <div className="space-y-5">
        <div className="max-w-3xl space-y-3">
          <span className="premium-chip">Free PDF merger</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            Merge PDF
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Combine PDFs into one clean file.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="premium-card p-5">
              <h3 className="font-display text-base font-bold tracking-tight text-slate-950">
                Document Preview
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {activeItem ? getDisplayName(activeItem.file.name) : 'Select a PDF'}
              </p>
              <div className="mt-4">
                {activePreviewPages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {activePreviewPages.map(page => (
                      <div
                        key={`${activeItem?.id || 'empty'}-${page.pageNumber}`}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
                      >
                        <Image
                          src={page.src}
                          alt={`Preview page ${page.pageNumber}`}
                          width={page.width}
                          height={page.height}
                          unoptimized
                          className="h-auto w-full rounded-xl object-cover"
                        />
                        <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                          Page {page.pageNumber}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : activePreviewUrl ? (
                  <iframe
                    src={`${activePreviewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    title="Merge PDF preview"
                    className="h-[420px] w-full rounded-2xl border border-slate-200 bg-white"
                  />
                ) : (
                  <div className="flex h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
                    {activePreviewLoading ? 'Loading preview...' : 'Select a PDF'}
                  </div>
                )}
              </div>

              {activePreviewError && (
                <p className="mt-3 text-xs text-amber-600">
                  Thumbnail preview is unavailable, but the PDF preview still loads.
                </p>
              )}
            </div>

            <div className="premium-card p-5">
              <h3 className="font-display text-base font-bold tracking-tight text-slate-950">
                Export Preferences
              </h3>
              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={includeContents}
                    onChange={event => {
                      setIncludeContents(event.target.checked)
                      resetResult()
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Add contents page
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={flattenForms}
                    onChange={event => {
                      setFlattenForms(event.target.checked)
                      resetResult()
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Flatten form fields
                </label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  Links are preserved when the source PDF supports them.
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            <div
              {...getRootProps()}
              className={cn(
                'rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-10 text-center transition-all duration-300 sm:px-8 sm:py-12',
                isDragActive && 'border-indigo-400 bg-indigo-50/40'
              )}
            >
              <input {...getInputProps()} />
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <FilePlus2 className="h-7 w-7" />
              </div>
              <button type="button" onClick={open} className="btn-primary min-w-40 px-8 py-3">
                Choose Files
              </button>
              <p className="mt-4 text-sm font-medium text-slate-600">or drop documents here</p>
              <p className="mt-5 text-xs text-slate-500">PDF only. Order stays exactly as arranged below.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-slate-950">
                    Staging Area
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Set the final merge order.</p>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {items.length} file{items.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="space-y-3">
                {items.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                    Add at least two PDFs to start merging.
                  </div>
                ) : (
                  items.map((item, index) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => setDraggingId(item.id)}
                      onDragOver={event => event.preventDefault()}
                      onDrop={() => {
                        if (draggingId) moveItem(draggingId, item.id)
                        setDraggingId(null)
                      }}
                      onDragEnd={() => setDraggingId(null)}
                      className={cn(
                        'flex items-center justify-between rounded-2xl border bg-white px-4 py-4 transition-all',
                        activeId === item.id ? 'border-indigo-300 shadow-sm' : 'border-slate-200',
                        draggingId === item.id && 'opacity-70'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveId(item.id)}
                        className="flex min-w-0 flex-1 items-center gap-4 text-left"
                      >
                        <div className="text-slate-400">
                          <GripVertical className="h-4 w-4" />
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-indigo-600">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-display text-sm font-bold tracking-tight text-slate-950">
                            {item.file.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {formatBytes(item.file.size)}
                            {item.pages ? `  -  ${item.pages} pages` : ''}
                            {item.status === 'reading' ? '  -  Reading...' : ''}
                            {item.status === 'error' ? '  -  Could not read' : ''}
                          </p>
                        </div>
                      </button>

                      <div className="ml-4 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveByOffset(item.id, -1)}
                          disabled={index === 0}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveByOffset(item.id, 1)}
                          disabled={index === items.length - 1}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveId(item.id)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="rounded-lg p-2 text-rose-500 transition hover:bg-rose-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus className="h-4 w-4" />
                  Add More Files
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={handleMerge}
                  disabled={!readyToMerge || loading}
                  className="btn-primary inline-flex items-center gap-2 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Merge Documents
                </button>
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
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ListTree className="h-4 w-4" />}
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
                {outputBlob ? 'Merged PDF ready' : 'Your merged file will appear here'}
              </h2>
              <p className="text-sm leading-6 text-slate-300">
                {outputBlob
                  ? `${readyItems.length} files combined into one PDF.`
                  : 'Choose files, adjust order, and merge when ready.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <p className="uppercase tracking-[0.18em] text-slate-400">Files</p>
                <p className="mt-2 font-display text-lg font-bold text-white">{readyItems.length}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <p className="uppercase tracking-[0.18em] text-slate-400">Pages</p>
                <p className="mt-2 font-display text-lg font-bold text-white">
                  {outputPages ?? estimatedPages ?? 0}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <p className="uppercase tracking-[0.18em] text-slate-400">Input Size</p>
                <p className="mt-2 font-display text-lg font-bold text-white">
                  {totalInputSize ? formatBytes(totalInputSize) : '0 MB'}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <p className="uppercase tracking-[0.18em] text-slate-400">Contents</p>
                <p className="mt-2 font-display text-lg font-bold text-white">
                  {includeContents ? 'On' : 'Off'}
                </p>
              </div>
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
                    Download Merged PDF
                  </button>
                  {outputUrlRef.current && (
                    <a
                      href={outputUrlRef.current}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-display text-sm font-bold tracking-tight text-white transition hover:bg-white/10"
                    >
                      <Eye className="h-4 w-4" />
                      Open Preview
                    </a>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleMerge}
                  disabled={!readyToMerge || loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold tracking-tight text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-white/70"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Merge Documents
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Pro Tip</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Keep the cleanest file first if you want its look to lead the final PDF.
          </p>
        </div>

        {apiError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {apiError}
          </div>
        )}
      </aside>
    </section>
  )
}
