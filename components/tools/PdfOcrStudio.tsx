'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircle2,
  Copy,
  Download,
  FileSearch,
  FileUp,
  Loader2,
  ScanText,
  Sparkles,
} from 'lucide-react'
import { cn, copyToClipboard, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { exportTextAsWordDocument, extractPdfDocumentText, downloadTextFile } from './pdf-client-utils'
import { usePdfPreviewData } from './pdf-browser'

const OCR_LANGUAGES = [
  { code: 'eng', label: 'English' },
  { code: 'tam', label: 'Tamil' },
  { code: 'hin', label: 'Hindi' },
  { code: 'spa', label: 'Spanish' },
  { code: 'fra', label: 'French' },
]

export default function PdfOcrStudio({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null)
  const [ocrLang, setOcrLang] = useState('eng')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('Upload a scanned PDF')
  const [apiError, setApiError] = useState('')
  const [textOutput, setTextOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [exportingWord, setExportingWord] = useState(false)

  const accept = useMemo(() => buildDropzoneAccept(tool.acceptedFormats), [tool.acceptedFormats])
  const {
    pages: previewPages,
    totalPages,
    previewUrl,
    loading: previewLoading,
  } = usePdfPreviewData(file, { maxPages: 4, scale: 0.46 })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const nextFile = acceptedFiles[0]
    if (!nextFile) return

    setFile(nextFile)
    setApiError('')
    setTextOutput('')
    setProgress(0)
    setPhase('Ready for OCR')
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
    maxFiles: 1,
    multiple: false,
  })

  async function handleOcr() {
    if (!file) return

    setLoading(true)
    setApiError('')
    setTextOutput('')
    setProgress(10)
    setPhase('Rendering PDF pages...')

    try {
      const result = await extractPdfDocumentText(file, {
        useOcr: true,
        lang: ocrLang,
        onProgress: details => {
          if (details.phase === 'ocr-render') {
            setPhase('Rendering PDF pages...')
            setProgress(10 + ((details.currentPage || 0) / (details.totalPages || 1)) * 30)
          } else if (details.phase === 'ocr-read') {
            setPhase('Reading text with OCR...')
            setProgress(42 + ((details.currentPage || 0) / (details.totalPages || 1)) * 48)
          }
        },
      })

      setTextOutput(result.text)
      setProgress(100)
      setPhase('OCR complete')
    } catch (error) {
      setApiError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function handleExportWord() {
    if (!textOutput.trim() || !file) return

    setExportingWord(true)
    try {
      const result = await exportTextAsWordDocument(textOutput, {
        title: `${file.name.replace(/\.pdf$/i, '')}-ocr`,
        mode: 'editable',
      })
      downloadBlob(result.blob, result.filename)
    } catch (error) {
      setApiError((error as Error).message)
    } finally {
      setExportingWord(false)
    }
  }

  async function handleCopy() {
    if (!textOutput) return
    await copyToClipboard(textOutput)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="space-y-6">
      <div className="max-w-3xl space-y-3">
        <span className="premium-chip">Scanned PDF text extraction</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          PDF OCR
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Convert scanned or image-based PDFs into readable text with OCR.
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
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">Drop your scanned PDF here</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Best for scanned documents, forms, statements, and image-based PDFs.
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

          <div className="premium-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-slate-950">OCR Language</h3>
                <p className="mt-1 text-sm text-slate-500">Pick the language that best matches the document.</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-indigo-600">
                <ScanText className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {OCR_LANGUAGES.map(language => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => setOcrLang(language.code)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-sm font-semibold transition-colors',
                    ocrLang === language.code
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                  )}
                >
                  {language.label}
                </button>
              ))}
            </div>
          </div>

          <div className="premium-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-slate-950">Extracted Text</h3>
                <p className="mt-1 text-sm text-slate-500">Review the OCR result before export.</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                {textOutput ? `${textOutput.split(/\s+/).filter(Boolean).length} words` : 'No text'}
              </span>
            </div>
            {textOutput ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap font-sans text-sm leading-7 text-slate-600">
                  {textOutput}
                </pre>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-12 text-center text-sm text-slate-500">
                Run OCR to preview extracted text here.
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={handleOcr} disabled={!file || loading} className="btn-primary inline-flex items-center gap-2 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Run OCR
              </button>
              <button type="button" onClick={() => downloadTextFile(`${file?.name.replace(/\.pdf$/i, '') || 'ocr-text'}.txt`, textOutput)} disabled={!textOutput} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70">
                <Download className="h-4 w-4" />
                Download TXT
              </button>
              <button type="button" onClick={handleExportWord} disabled={!textOutput || exportingWord} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70">
                {exportingWord ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileSearch className="h-4 w-4" />}
                Export Word
              </button>
              <button type="button" onClick={handleCopy} disabled={!textOutput} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70">
                <Copy className="h-4 w-4" />
                {copied ? 'Copied' : 'Copy Text'}
              </button>
            </div>
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
                  <Image src={previewPages[0].src} alt={`Preview page ${previewPages[0].pageNumber}`} width={previewPages[0].width} height={previewPages[0].height} unoptimized className="h-auto w-full rounded-xl object-cover" />
                </div>
              </div>
            ) : previewUrl ? (
              <iframe src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`} title="PDF preview" className="h-[430px] w-full rounded-2xl border border-slate-200 bg-white" />
            ) : (
              <div className="flex h-[430px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">
                {previewLoading ? 'Loading preview...' : 'Upload a PDF to preview it.'}
              </div>
            )}
          </div>

          <div className="premium-card p-6 shadow-[0_16px_32px_-28px_rgba(37,99,235,0.35)]">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-base font-bold tracking-tight text-slate-950">OCR Progress</h2>
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
                <p className="mt-1 text-xs leading-5 text-slate-500">The OCR engine renders each page and reads the selected language.</p>
              </div>
            </div>
          </div>

          <div className="noise relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_42%)]" />
            <div className="relative z-10 space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/90">
                {textOutput ? <CheckCircle2 className="h-5 w-5" /> : <ScanText className="h-5 w-5" />}
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-extrabold tracking-tight">
                  {textOutput ? 'OCR text ready' : 'Your OCR result will appear here'}
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  {textOutput ? `${textOutput.split(/\s+/).filter(Boolean).length} words extracted.` : 'Choose the language and run OCR.'}
                </p>
              </div>
            </div>
          </div>

          {apiError && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{apiError}</div>}
        </div>
      </div>
    </section>
  )
}
