'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircle2,
  Download,
  FileText,
  FileUp,
  Loader2,
  ScanText,
  Settings2,
  Sparkles,
  Type,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { getResponseFilename } from './processors/file-download'
import { extractPdfTextWithOcr, usePdfPreviewData } from './pdf-browser'

type WordMode = 'layout' | 'text' | 'editable'

const OCR_PROCESS_PHASES = [
  'Rendering PDF pages...',
  'Reading text with OCR...',
  'Building Word document...',
]

const STANDARD_PROCESS_PHASES = [
  'Reading PDF text...',
  'Building Word document...',
  'Finalizing download...',
]

const MODE_OPTIONS: Array<{
  id: WordMode
  label: string
  helper: string
}> = [
  {
    id: 'layout',
    label: 'Preserve Layout',
    helper: 'Best balance',
  },
  {
    id: 'text',
    label: 'Text Only',
    helper: 'Simpler output',
  },
  {
    id: 'editable',
    label: 'Edit Directly',
    helper: 'Cleaner paragraphs',
  },
]

async function readPdfPageCount(file: File) {
  const { PDFDocument } = await import('pdf-lib')
  const bytes = await file.arrayBuffer()
  const document = await PDFDocument.load(bytes, { ignoreEncryption: true })
  return document.getPageCount()
}

function baseName(filename: string) {
  return filename.replace(/\.pdf$/i, '').trim() || 'converted'
}

export default function PdfToWordStudio({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [ocrEnabled, setOcrEnabled] = useState(true)
  const [mode, setMode] = useState<WordMode>('layout')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activePhase, setActivePhase] = useState(0)
  const [apiError, setApiError] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const [outputPages, setOutputPages] = useState<number | null>(null)
  const [wordCount, setWordCount] = useState<number | null>(null)
  const [extractionSource, setExtractionSource] = useState<'ocr' | 'text-layer' | ''>('')

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const {
    pages: previewPages,
    totalPages: renderedPreviewPages,
    loading: previewLoading,
    error: previewError,
    previewUrl,
  } = usePdfPreviewData(file, { maxPages: 4, scale: 0.48 })
  const activeProcessPhases = ocrEnabled ? OCR_PROCESS_PHASES : STANDARD_PROCESS_PHASES

  const liveTitle = loading
    ? activeProcessPhases[activePhase]
    : outputBlob
      ? 'Conversion complete'
      : file
        ? 'Ready to convert'
        : 'Upload one PDF'
  const liveDescription = loading
    ? ocrEnabled
      ? 'Scanning pages and building a clean Word file.'
      : 'Creating a Word-friendly document from the PDF text layer.'
    : outputBlob
      ? 'Your Word file is ready.'
      : 'Choose a mode and start conversion.'

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const nextFile = acceptedFiles[0]
    if (!nextFile) return

    setFile(nextFile)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setOutputPages(null)
    setWordCount(null)
    setExtractionSource('')
    setProgress(0)
    setActivePhase(0)

    try {
      setPageCount(await readPdfPageCount(nextFile))
    } catch {
      setPageCount(0)
      setApiError('Could not read the PDF preview.')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    noClick: true,
    maxFiles: 1,
  })

  async function buildWordFromServer(formData: FormData) {
    const response = await fetch('/api/tools/pdf/transform?action=pdf-to-word', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || 'Conversion failed')
    }

    const blob = await response.blob()
    setOutputBlob(blob)
    setOutputFilename(getResponseFilename(response, `${baseName(file?.name || 'converted')}.doc`))
    setOutputPages(Number(response.headers.get('X-Source-Pages') || renderedPreviewPages || pageCount || 0))
    setWordCount(Number(response.headers.get('X-Word-Count') || 0))
    setExtractionSource((response.headers.get('X-Extraction-Source') as 'ocr' | 'text-layer' | null) || '')
    setProgress(100)
    setActivePhase(2)
  }

  async function handleConvert() {
    if (!file) return

    setLoading(true)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setOutputPages(null)
    setWordCount(null)
    setExtractionSource('')
    setProgress(8)
    setActivePhase(0)

    let interval: number | undefined

    try {
      if (ocrEnabled) {
        const ocrResult = await extractPdfTextWithOcr(file, {
          lang: 'eng',
          onProgress: ({ phase, currentPage, totalPages }) => {
            const normalized = totalPages > 0 ? currentPage / totalPages : 0
            setActivePhase(phase === 'render' ? 0 : 1)
            setProgress(phase === 'render' ? 10 + normalized * 25 : 35 + normalized * 45)
          },
        })

        if (!ocrResult.text.trim()) {
          throw new Error('OCR could not read text from this PDF.')
        }

        setActivePhase(2)
        setProgress(86)

        const formData = new FormData()
        formData.append('mode', mode)
        formData.append('ocr', 'true')
        formData.append('ocrText', ocrResult.text)
        formData.append('title', baseName(file.name))
        formData.append('pageCount', String(ocrResult.totalPages || renderedPreviewPages || pageCount || 0))

        await buildWordFromServer(formData)
      } else {
        interval = window.setInterval(() => {
          setProgress(current => {
            const next = current < 88 ? current + Math.random() * 11 : current
            setActivePhase(next < 34 ? 0 : next < 70 ? 1 : 2)
            return next
          })
        }, 360)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('mode', mode)
        formData.append('ocr', 'false')

        await buildWordFromServer(formData)
      }
    } catch (error) {
      setApiError((error as Error).message)
    } finally {
      if (interval) {
        window.clearInterval(interval)
      }
      setLoading(false)
    }
  }

  function handleDownload() {
    if (outputBlob) {
      downloadBlob(outputBlob, outputFilename || `${baseName(file?.name || 'converted')}.doc`)
    }
  }

  const displayedPageCount = outputPages ?? renderedPreviewPages ?? pageCount ?? 0

  return (
    <section className="space-y-6">
      <div className="max-w-3xl space-y-3">
        <span className="premium-chip">Free PDF to Word</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          PDF to Word
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Convert PDFs into editable Word files.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div
            {...getRootProps()}
            className={cn(
              'relative rounded-[1.75rem] border-2 border-dashed border-slate-200 bg-white px-8 py-14 text-center transition-all',
              isDragActive && 'border-indigo-400 bg-indigo-50/40'
            )}
          >
            <input {...getInputProps()} />
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <FileUp className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">
              Drop your PDF here
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Upload one PDF and convert it into a Word file.
            </p>
            <button type="button" onClick={open} className="btn-primary mt-8 px-10 py-4">
              Choose File
            </button>
            {file && (
              <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
                <p className="truncate font-display text-sm font-bold text-slate-950">{file.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatBytes(file.size)}
                  {displayedPageCount ? `  -  ${displayedPageCount} pages` : ''}
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="premium-card flex flex-col justify-between p-6">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
                  <ScanText className="h-4 w-4" />
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={ocrEnabled}
                  onClick={() => setOcrEnabled(current => !current)}
                  className={cn(
                    'relative h-6 w-11 rounded-full transition-colors',
                    ocrEnabled ? 'bg-indigo-600' : 'bg-slate-200'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
                      ocrEnabled ? 'translate-x-5' : 'translate-x-0.5'
                    )}
                  />
                </button>
              </div>
              <div>
                <h4 className="font-display text-lg font-bold tracking-tight text-slate-950">OCR Mode</h4>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Best for scanned PDFs or broken text encoding.
                </p>
              </div>
            </div>

            <div className="premium-card p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
                  <Settings2 className="h-4 w-4" />
                </div>
                <h4 className="font-display text-lg font-bold tracking-tight text-slate-950">
                  Layout Intent
                </h4>
              </div>
              <select
                value={mode}
                onChange={event => setMode(event.target.value as WordMode)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white"
              >
                <option value="layout">Preserve Visual Layout</option>
                <option value="text">Text Stream</option>
                <option value="editable">Direct Editable Text</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {MODE_OPTIONS.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className={cn(
                  'rounded-3xl border px-5 py-6 text-center transition-all',
                  mode === option.id
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                )}
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                  {option.id === 'layout' ? <Sparkles className="h-4 w-4" /> : <Type className="h-4 w-4" />}
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em]">
                  {option.label}
                </p>
                <p className="mt-2 text-xs">{option.helper}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] bg-slate-50 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                Live Document Preview
              </h3>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                {displayedPageCount} pages
              </span>
            </div>

            {previewPages.length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <Image
                    src={previewPages[0].src}
                    alt={`Preview page ${previewPages[0].pageNumber}`}
                    width={previewPages[0].width}
                    height={previewPages[0].height}
                    unoptimized
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </div>
                {previewPages.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {previewPages.slice(1).map(page => (
                      <div key={page.pageNumber} className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
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
                )}
              </div>
            ) : previewUrl ? (
              <iframe
                src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                title="PDF preview"
                className="h-[430px] w-full rounded-2xl border border-slate-200 bg-white"
              />
            ) : (
              <div className="flex h-[430px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">
                {previewLoading ? 'Loading preview...' : 'Upload a PDF to preview it.'}
              </div>
            )}

            {previewLoading && previewPages.length === 0 && previewUrl && (
              <p className="mt-3 text-xs text-slate-500">Preparing live preview...</p>
            )}

            {previewError && (
              <p className="mt-3 text-xs text-amber-600">
                Thumbnail preview is unavailable, but the PDF preview still loads.
              </p>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-100/20">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold tracking-tight text-slate-950">
                  {outputFilename || `${baseName(file?.name || 'converted')}.doc`}
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  {outputBlob
                    ? `Ready to download - ${formatBytes(outputBlob.size)}`
                    : 'Converted file will appear here'}
                </p>
              </div>
              {outputBlob && (
                <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-3 text-xs text-slate-500">
              <div className="rounded-xl bg-slate-50 px-3 py-3">
                <p className="uppercase tracking-[0.18em]">Pages</p>
                <p className="mt-2 font-display text-lg font-bold text-slate-950">
                  {displayedPageCount}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 px-3 py-3">
                <p className="uppercase tracking-[0.18em]">Words</p>
                <p className="mt-2 font-display text-lg font-bold text-slate-950">
                  {wordCount ?? 0}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 px-3 py-3">
                <p className="uppercase tracking-[0.18em]">Source</p>
                <p className="mt-2 font-display text-lg font-bold text-slate-950">
                  {extractionSource === 'ocr' ? 'OCR' : extractionSource === 'text-layer' ? 'PDF Text' : 'Ready'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {outputBlob ? (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-4 font-display text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Download Editable Word
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={!file || loading}
                  className="btn-primary inline-flex items-center justify-center gap-2 px-4 py-4 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Convert to Word
                </button>
              )}
            </div>
          </div>

          <div className="rounded-full bg-amber-100 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-amber-700" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-900">
                  OCR mode fixes scanned or broken PDFs
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-800">
                Live preview
              </span>
            </div>
          </div>
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

        {apiError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{apiError}</div>
        )}
      </div>
    </section>
  )
}
