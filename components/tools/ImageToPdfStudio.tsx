'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Download,
  FileStack,
  GripVertical,
  Loader2,
  MoveDown,
  MoveUp,
  UploadCloud,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { downloadBlob, formatBytes } from '@/lib/utils'
import { buildDropzoneAccept, formatAcceptedFormats } from './file-accept'
import { getResponseFilename } from './processors/file-download'

type StagedImage = {
  id: string
  file: File
  previewUrl: string
}

export default function ImageToPdfStudio({ tool }: { tool: Tool }) {
  const acceptedFormats = useMemo(
    () => (tool.acceptedFormats?.length ? tool.acceptedFormats : ['.jpg', '.jpeg', '.png', '.webp']),
    [tool.acceptedFormats]
  )
  const accept = useMemo(() => buildDropzoneAccept(acceptedFormats), [acceptedFormats])
  const acceptLabel = useMemo(() => formatAcceptedFormats(acceptedFormats), [acceptedFormats])

  const previewRegistry = useRef<string[]>([])
  const [files, setFiles] = useState<StagedImage[]>([])
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'fit'>('a4')
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto')
  const [margin, setMargin] = useState<'none' | 'small' | 'medium' | 'large'>('medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('images-to-pdf.pdf')

  useEffect(() => () => {
    previewRegistry.current.forEach(url => URL.revokeObjectURL(url))
    previewRegistry.current = []
  }, [])

  function appendFiles(incomingFiles: File[]) {
    const staged = incomingFiles.map(file => {
      const previewUrl = URL.createObjectURL(file)
      previewRegistry.current.push(previewUrl)
      return {
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl,
      }
    })

    setFiles(current => [...current, ...staged])
    setError('')
    setOutputBlob(null)
  }

  function removeFile(id: string) {
    setFiles(current => {
      const target = current.find(item => item.id === id)
      if (target) {
        URL.revokeObjectURL(target.previewUrl)
        previewRegistry.current = previewRegistry.current.filter(url => url !== target.previewUrl)
      }
      return current.filter(item => item.id !== id)
    })
  }

  function moveFile(index: number, direction: -1 | 1) {
    setFiles(current => {
      const nextIndex = index + direction
      if (nextIndex < 0 || nextIndex >= current.length) return current
      const next = [...current]
      const [item] = next.splice(index, 1)
      next.splice(nextIndex, 0, item)
      return next
    })
  }

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept,
    multiple: true,
    noClick: true,
    onDropAccepted: appendFiles,
  })

  async function handleCreatePdf() {
    if (files.length === 0 || loading) return

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      files.forEach(item => formData.append('files', item.file))
      formData.append('pageSize', pageSize)
      formData.append('orientation', orientation)
      formData.append('margin', margin)

      const response = await fetch('/api/tools/pdf/transform?action=images-to-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Image to PDF failed.')
      }

      const blob = await response.blob()
      setOutputBlob(blob)
      setOutputFilename(getResponseFilename(response, 'images-to-pdf.pdf'))
    } catch (createError) {
      setError((createError as Error).message || 'Image to PDF failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-7">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {['Multi-image sequence', 'Page settings', 'PDF export'].map(badge => (
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
                Sequence builder
              </p>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                Image to PDF
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Arrange multiple images, tune the canvas settings, and export a cleaner PDF document.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.22)]">
            <div
              {...getRootProps()}
              className={`rounded-[1.75rem] border-2 border-dashed px-6 py-8 transition-colors ${
                isDragActive ? 'border-indigo-500 bg-indigo-50/60' : 'border-slate-200 bg-slate-50/70'
              }`}
            >
              <input {...getInputProps()} />
              {files.length === 0 ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600">
                    <UploadCloud className="h-7 w-7" />
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
                    Drop image sequence
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    {acceptLabel ? `Supports ${acceptLabel}.` : 'Upload supported images.'}
                  </p>
                  <button
                    type="button"
                    onClick={open}
                    className="mt-6 rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 sm:px-6 sm:py-3 sm:text-sm"
                  >
                    Choose images
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {files.slice(0, 6).map((item, index) => (
                      <div key={item.id} className="overflow-hidden rounded-[1.4rem] bg-white p-2">
                        <div className="relative h-36 overflow-hidden rounded-[1rem]">
                          <Image
                            src={item.previewUrl}
                            alt={item.file.name}
                            fill
                            unoptimized
                            sizes="(max-width: 1280px) 100vw, 220px"
                            className="object-cover"
                          />
                        </div>
                        <p className="mt-2 truncate text-xs font-semibold text-slate-600">Page {index + 1}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[1.4rem] bg-white px-5 py-4">
                    <div className="min-w-0">
                      <p className="font-display text-base font-bold tracking-tight text-slate-950">
                        {files.length} images staged
                      </p>
                      <p className="mt-1 text-sm text-slate-500">Reorder the stack before export.</p>
                    </div>
                    <button
                      type="button"
                      onClick={open}
                      className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                    >
                      Add more
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.8rem] bg-slate-100/90 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600">
                <FileStack className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Staging area</p>
                <h2 className="font-display text-lg font-bold tracking-tight text-slate-950">
                  Sequence
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {files.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                  <GripVertical className="h-4 w-4 text-slate-400" />
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={item.previewUrl}
                      alt={item.file.name}
                      fill
                      unoptimized
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-950">{item.file.name}</p>
                    <p className="text-xs text-slate-500">{formatBytes(item.file.size)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => moveFile(index, -1)} className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
                      <MoveUp className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => moveFile(index, 1)} className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
                      <MoveDown className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => removeFile(item.id)} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-[1.8rem] bg-white p-5 shadow-[0_20px_44px_-32px_rgba(15,23,42,0.2)]">
            <h2 className="font-display text-xl font-bold tracking-tight text-slate-950">Canvas Settings</h2>
            <div className="mt-4 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Page size</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {[
                    ['a4', 'A4'],
                    ['letter', 'Letter'],
                    ['fit', 'Fit'],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPageSize(value as 'a4' | 'letter' | 'fit')}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                        pageSize === value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Orientation</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {[
                    ['auto', 'Auto'],
                    ['portrait', 'Portrait'],
                    ['landscape', 'Landscape'],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setOrientation(value as 'auto' | 'portrait' | 'landscape')}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                        orientation === value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Margins</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-4">
                  {[
                    ['none', 'None'],
                    ['small', 'Small'],
                    ['medium', 'Medium'],
                    ['large', 'Large'],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setMargin(value as 'none' | 'small' | 'medium' | 'large')}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                        margin === value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-slate-950 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Export card</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
              {outputBlob ? 'PDF is ready' : 'Ready to merge the sequence'}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {outputBlob
                ? 'Download the generated PDF and continue with more PDF workflows if needed.'
                : 'Arrange the order, lock the page settings, and export one polished PDF.'}
            </p>

            {error ? (
              <div className="mt-4 rounded-2xl bg-rose-500/12 p-4 text-sm leading-6 text-rose-200">{error}</div>
            ) : null}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Images</p>
                <p className="mt-1 text-sm font-semibold text-white">{files.length}</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Page style</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {pageSize.toUpperCase()} / {orientation}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCreatePdf}
                disabled={!files.length || loading}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileStack className="h-4 w-4" />}
                Create PDF
              </button>
              {outputBlob ? (
                <button
                  type="button"
                  onClick={() => downloadBlob(outputBlob, outputFilename)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
