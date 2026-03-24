'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Download,
  FilePlus2,
  FileText,
  GripVertical,
  Loader2,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { getResponseFilename } from './processors/file-download'

type ImageItem = {
  id: string
  file: File
  previewUrl: string
}

type PageSize = 'a4' | 'letter' | 'fit'
type MarginPreset = 'none' | 'small' | 'medium' | 'large'
type Orientation = 'auto' | 'portrait' | 'landscape'

function signature(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

export default function JpgToPdfStudio({ tool }: { tool: Tool }) {
  const [items, setItems] = useState<ImageItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [pageSize, setPageSize] = useState<PageSize>('a4')
  const [margin, setMargin] = useState<MarginPreset>('medium')
  const [orientation, setOrientation] = useState<Orientation>('auto')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('Add images')
  const [apiError, setApiError] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const itemsRef = useRef<ImageItem[]>([])

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const activeItem = items.find(item => item.id === activeId) || items[0] || null

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  useEffect(() => {
    return () => {
      itemsRef.current.forEach(item => URL.revokeObjectURL(item.previewUrl))
    }
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setProgress(0)
    setPhase('Ready to create PDF')

    setItems(current => {
      const existing = new Set(current.map(item => signature(item.file)))
      const additions = acceptedFiles
        .filter(file => !existing.has(signature(file)))
        .map(file => ({
          id: `${signature(file)}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          previewUrl: URL.createObjectURL(file),
        }))

      if (!activeId && additions[0]) {
        setActiveId(additions[0].id)
      }

      return [...current, ...additions]
    })
  }, [activeId])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
    multiple: true,
  })

  function moveItem(id: string, direction: -1 | 1) {
    setItems(current => {
      const index = current.findIndex(item => item.id === id)
      const nextIndex = index + direction
      if (index === -1 || nextIndex < 0 || nextIndex >= current.length) return current
      const next = [...current]
      const [moved] = next.splice(index, 1)
      next.splice(nextIndex, 0, moved)
      return next
    })
    setOutputBlob(null)
    setOutputFilename('')
  }

  function removeItem(id: string) {
    setItems(current => {
      const item = current.find(entry => entry.id === id)
      if (item) URL.revokeObjectURL(item.previewUrl)
      const next = current.filter(entry => entry.id !== id)
      setActiveId(active => (active === id ? next[0]?.id || null : active))
      return next
    })
    setOutputBlob(null)
    setOutputFilename('')
  }

  async function handleCreate() {
    if (items.length === 0) return

    setLoading(true)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setProgress(10)
    setPhase('Preparing page order...')

    const interval = window.setInterval(() => {
      setProgress(current => {
        const next = current < 88 ? current + Math.random() * 10 : current
        setPhase(next < 38 ? 'Preparing page order...' : next < 72 ? 'Building PDF pages...' : 'Finalizing PDF...')
        return next
      })
    }, 320)

    try {
      const formData = new FormData()
      items.forEach(item => formData.append('files', item.file))
      formData.append('pageSize', pageSize)
      formData.append('margin', margin)
      formData.append('orientation', orientation)

      const response = await fetch('/api/tools/pdf/transform?action=images-to-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'JPG to PDF failed')
      }

      const blob = await response.blob()
      setOutputBlob(blob)
      setOutputFilename(getResponseFilename(response, 'images-to-pdf.pdf'))
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
        <span className="premium-chip">Image layout to PDF</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          JPG to PDF
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Combine images into a clean PDF with layout and spacing control.
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
              <FilePlus2 className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">Drop your images here</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Add JPG, PNG, or WebP files and arrange them in page order.
            </p>
            <button type="button" onClick={open} className="btn-primary mt-8 px-10 py-4">
              Choose Images
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="premium-card p-5">
              <h4 className="font-display text-base font-bold tracking-tight text-slate-950">Page Size</h4>
              <select value={pageSize} onChange={event => setPageSize(event.target.value as PageSize)} className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white">
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="fit">Fit Images</option>
              </select>
            </div>
            <div className="premium-card p-5">
              <h4 className="font-display text-base font-bold tracking-tight text-slate-950">Margins</h4>
              <select value={margin} onChange={event => setMargin(event.target.value as MarginPreset)} className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white">
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="premium-card p-5">
              <h4 className="font-display text-base font-bold tracking-tight text-slate-950">Orientation</h4>
              <select value={orientation} onChange={event => setOrientation(event.target.value as Orientation)} className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white">
                <option value="auto">Auto</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
          </div>

          <div className="premium-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-slate-950">Image Order</h3>
                <p className="mt-1 text-sm text-slate-500">Set the final page sequence before export.</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                {items.length} pages
              </span>
            </div>

            <div className="space-y-3">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                  Upload images to build the PDF.
                </div>
              ) : (
                items.map((item, index) => (
                  <div key={item.id} className={cn('flex items-center justify-between rounded-2xl border bg-white px-4 py-4', activeId === item.id ? 'border-indigo-300 shadow-sm' : 'border-slate-200')}>
                    <button type="button" onClick={() => setActiveId(item.id)} className="flex min-w-0 flex-1 items-center gap-4 text-left">
                      <GripVertical className="h-4 w-4 text-slate-400" />
                      <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
                        <Image src={item.previewUrl} alt={item.file.name} fill unoptimized className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-display text-sm font-bold tracking-tight text-slate-950">{item.file.name}</p>
                        <p className="mt-1 text-xs text-slate-500">Page {index + 1}  -  {formatBytes(item.file.size)}</p>
                      </div>
                    </button>
                    <div className="ml-4 flex items-center gap-1">
                      <button type="button" onClick={() => moveItem(item.id, -1)} disabled={index === 0} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-40">
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => moveItem(item.id, 1)} disabled={index === items.length - 1} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-40">
                        <ArrowDown className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => removeItem(item.id)} className="rounded-lg p-2 text-rose-500 transition hover:bg-rose-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={handleCreate} disabled={items.length === 0 || loading} className="btn-primary inline-flex items-center gap-2 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Create PDF
              </button>
              {outputBlob && (
                <button type="button" onClick={() => downloadBlob(outputBlob, outputFilename || 'images-to-pdf.pdf')} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] bg-slate-50 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Page Preview</h3>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                {items.length} pages
              </span>
            </div>

            {activeItem ? (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <Image src={activeItem.previewUrl} alt={activeItem.file.name} width={960} height={1280} unoptimized className="h-auto w-full rounded-xl object-contain" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {items.slice(0, 3).map(item => (
                    <button key={item.id} type="button" onClick={() => setActiveId(item.id)} className={cn('overflow-hidden rounded-2xl border p-2 shadow-sm', activeId === item.id ? 'border-indigo-300 bg-white' : 'border-slate-200 bg-white')}>
                      <Image src={item.previewUrl} alt={item.file.name} width={240} height={320} unoptimized className="h-auto w-full rounded-xl object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-[430px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">
                Upload images to preview the PDF pages.
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
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">{phase}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Arrange pages, set layout options, and export one PDF.</p>
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
                  {outputBlob ? `Created from ${items.length} image${items.length === 1 ? '' : 's'}.` : 'Upload and arrange your images before export.'}
                </p>
              </div>
              {outputBlob && (
                <button type="button" onClick={() => downloadBlob(outputBlob, outputFilename || 'images-to-pdf.pdf')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold tracking-tight text-slate-950 transition hover:bg-slate-100">
                  <Download className="h-4 w-4" />
                  Download PDF
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
