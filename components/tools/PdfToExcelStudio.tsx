'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileUp,
  Loader2,
  ScanText,
  Sparkles,
  Table2,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { getResponseFilename } from './processors/file-download'
import { extractPdfTextWithOcr, usePdfPreviewData } from './pdf-browser'

type DetectionMode = 'auto' | 'strict' | 'spreadsheet'

type SheetPreview = {
  name: string
  columns: number
  rows: number
  sample: Array<Array<string | number>>
}

export default function PdfToExcelStudio({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null)
  const [ocrEnabled, setOcrEnabled] = useState(false)
  const [headerRow, setHeaderRow] = useState(true)
  const [mode, setMode] = useState<DetectionMode>('auto')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('Ready to analyze')
  const [apiError, setApiError] = useState('')
  const [sheets, setSheets] = useState<SheetPreview[]>([])
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const [extractionSource, setExtractionSource] = useState<'ocr' | 'text-layer' | ''>('')

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const {
    pages: previewPages,
    totalPages,
    previewUrl,
    loading: previewLoading,
    error: previewError,
  } = usePdfPreviewData(file, { maxPages: 4, scale: 0.46 })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const nextFile = acceptedFiles[0]
    if (!nextFile) return

    setFile(nextFile)
    setApiError('')
    setSheets([])
    setOutputBlob(null)
    setOutputFilename('')
    setExtractionSource('')
    setProgress(0)
    setPhase('Ready to analyze')
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
    maxFiles: 1,
    multiple: false,
  })

  async function buildFormData(preview: boolean) {
    const formData = new FormData()
    formData.append('mode', mode)
    formData.append('headerRow', String(headerRow))
    formData.append('preview', String(preview))
    formData.append('title', file?.name.replace(/\.pdf$/i, '') || 'pdf-tables')

    if (ocrEnabled && file) {
      const ocrResult = await extractPdfTextWithOcr(file, {
        lang: 'eng',
        onProgress: details => {
          setPhase(details.phase === 'render' ? 'Rendering pages...' : 'Reading tables with OCR...')
          const normalized = details.totalPages > 0 ? details.currentPage / details.totalPages : 0
          setProgress(details.phase === 'render' ? 10 + normalized * 25 : 38 + normalized * 30)
        },
      })
      formData.append('ocrText', ocrResult.text)
      setExtractionSource('ocr')
    } else if (file) {
      formData.append('file', file)
      setExtractionSource('text-layer')
    }

    return formData
  }

  async function handleAnalyze() {
    if (!file) return

    setLoading(true)
    setApiError('')
    setOutputBlob(null)
    setOutputFilename('')
    setProgress(8)
    setPhase('Analyzing tables...')

    let interval: number | undefined

    try {
      if (!ocrEnabled) {
        interval = window.setInterval(() => {
          setProgress(current => (current < 82 ? current + Math.random() * 10 : current))
        }, 320)
      }

      const response = await fetch('/api/tools/pdf/transform?action=pdf-to-excel', {
        method: 'POST',
        body: await buildFormData(true),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || 'Could not detect tables')
      }

      setSheets(data.sheets || [])
      setExtractionSource((data.extractionSource as 'ocr' | 'text-layer' | undefined) || extractionSource)
      setProgress(100)
      setPhase('Tables detected')
    } catch (error) {
      setApiError((error as Error).message)
    } finally {
      if (interval) window.clearInterval(interval)
      setLoading(false)
    }
  }

  async function handleDownload() {
    if (!file) return

    setLoading(true)
    setApiError('')
    setProgress(12)
    setPhase('Building Excel workbook...')

    try {
      const response = await fetch('/api/tools/pdf/transform?action=pdf-to-excel', {
        method: 'POST',
        body: await buildFormData(false),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Excel export failed')
      }

      const blob = await response.blob()
      setOutputBlob(blob)
      setOutputFilename(getResponseFilename(response, `${file.name.replace(/\.pdf$/i, '')}.xlsx`))
      setProgress(100)
      setPhase('Excel ready')
      downloadBlob(blob, getResponseFilename(response, `${file.name.replace(/\.pdf$/i, '')}.xlsx`))
    } catch (error) {
      setApiError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const totalDetectedRows = sheets.reduce((sum, sheet) => sum + sheet.rows, 0)
  const totalDetectedColumns = sheets.reduce((sum, sheet) => sum + sheet.columns, 0)

  return (
    <section className="space-y-6">
      <div className="max-w-3xl space-y-3">
        <span className="premium-chip">Excel-ready extraction</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          PDF to Excel
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Extract table data from PDFs into a structured Excel workbook.
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
              Works best with reports, bank statements, invoices, and table-heavy PDFs.
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

          <div className="grid gap-4 md:grid-cols-3">
            <div className="premium-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
                  <ScanText className="h-4 w-4" />
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={ocrEnabled}
                  onClick={() => setOcrEnabled(current => !current)}
                  className={cn('relative h-6 w-11 rounded-full transition-colors', ocrEnabled ? 'bg-indigo-600' : 'bg-slate-200')}
                >
                  <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform', ocrEnabled ? 'translate-x-5' : 'translate-x-0.5')} />
                </button>
              </div>
              <h4 className="font-display text-base font-bold tracking-tight text-slate-950">OCR</h4>
              <p className="mt-2 text-sm text-slate-500">Enable this for scanned PDFs and image-based tables.</p>
            </div>

            <div className="premium-card p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
                <Table2 className="h-4 w-4" />
              </div>
              <h4 className="font-display text-base font-bold tracking-tight text-slate-950">Detection Mode</h4>
              <select
                value={mode}
                onChange={event => setMode(event.target.value as DetectionMode)}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white"
              >
                <option value="auto">Auto Detect</option>
                <option value="strict">Strict Columns</option>
                <option value="spreadsheet">Spreadsheet Style</option>
              </select>
            </div>

            <div className="premium-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
                  <FileSpreadsheet className="h-4 w-4" />
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={headerRow}
                  onClick={() => setHeaderRow(current => !current)}
                  className={cn('relative h-6 w-11 rounded-full transition-colors', headerRow ? 'bg-indigo-600' : 'bg-slate-200')}
                >
                  <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform', headerRow ? 'translate-x-5' : 'translate-x-0.5')} />
                </button>
              </div>
              <h4 className="font-display text-base font-bold tracking-tight text-slate-950">Header Row</h4>
              <p className="mt-2 text-sm text-slate-500">Treat the first row as table headers when possible.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="btn-primary inline-flex items-center gap-2 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Detect Tables
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!file || sheets.length === 0 || loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Download className="h-4 w-4" />
              Export Excel
            </button>
          </div>

          <div className="premium-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-slate-950">Detected Tables</h3>
                <p className="mt-1 text-sm text-slate-500">Preview the extracted rows before export.</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                {sheets.length} sheets
              </span>
            </div>

            {sheets.length > 0 ? (
              <div className="space-y-4">
                {sheets.map(sheet => (
                  <div key={sheet.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-display text-sm font-bold tracking-tight text-slate-950">{sheet.name}</h4>
                        <p className="mt-1 text-xs text-slate-500">
                          {sheet.rows} rows  -  {sheet.columns} columns
                        </p>
                      </div>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                      <table className="min-w-full text-left text-xs">
                        <tbody>
                          {sheet.sample.map((row, rowIndex) => (
                            <tr key={`${sheet.name}-${rowIndex}`} className="border-b border-slate-100 last:border-b-0">
                              {row.map((cell, cellIndex) => (
                                <td key={`${sheet.name}-${rowIndex}-${cellIndex}`} className="px-3 py-2 text-slate-600">
                                  {String(cell || '—')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                Detect tables to preview structured data here.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] bg-slate-50 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Live PDF Preview</h3>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                {totalPages || 0} pages
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
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {extractionSource === 'ocr' ? 'OCR-assisted extraction enabled.' : 'Text-layer extraction ready.'}
                </p>
              </div>
            </div>
          </div>

          <div className="noise relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_42%)]" />
            <div className="relative z-10 space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/90">
                {outputBlob ? <CheckCircle2 className="h-5 w-5" /> : <FileSpreadsheet className="h-5 w-5" />}
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-extrabold tracking-tight">
                  {outputBlob ? 'Excel workbook ready' : 'Your Excel result will appear here'}
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  {sheets.length > 0
                    ? `${sheets.length} sheet${sheets.length === 1 ? '' : 's'} detected, ${totalDetectedRows} rows analyzed.`
                    : 'Detect tables first, then export the workbook.'}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-white/10 px-3 py-3">
                  <p className="uppercase tracking-[0.18em] text-slate-300">Sheets</p>
                  <p className="mt-2 font-display text-lg font-bold text-white">{sheets.length}</p>
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-3">
                  <p className="uppercase tracking-[0.18em] text-slate-300">Rows</p>
                  <p className="mt-2 font-display text-lg font-bold text-white">{totalDetectedRows}</p>
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-3">
                  <p className="uppercase tracking-[0.18em] text-slate-300">Columns</p>
                  <p className="mt-2 font-display text-lg font-bold text-white">{totalDetectedColumns}</p>
                </div>
              </div>
              {outputBlob && (
                <button
                  type="button"
                  onClick={() => downloadBlob(outputBlob, outputFilename || 'pdf-tables.xlsx')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-display text-sm font-bold tracking-tight text-slate-950 transition hover:bg-slate-100"
                >
                  <Download className="h-4 w-4" />
                  Download Workbook
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
