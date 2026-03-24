'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CheckCircle2,
  Download,
  FileUp,
  Languages,
  Loader2,
  ScanText,
  Sparkles,
} from 'lucide-react'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept } from './file-accept'
import { callAiTextTool, downloadTextFile, exportTextAsWordDocument, extractPdfDocumentText } from './pdf-client-utils'
import { usePdfPreviewData } from './pdf-browser'

const TARGET_LANGUAGES = ['English', 'Tamil', 'Hindi', 'Spanish', 'French', 'German', 'Arabic']

export default function PdfTranslatorStudio({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null)
  const [useOcr, setUseOcr] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState('English')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('Upload a PDF')
  const [apiError, setApiError] = useState('')
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceKind, setSourceKind] = useState<'ocr' | 'text-layer' | ''>('')

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
    setSourceText('')
    setTranslatedText('')
    setSourceKind('')
    setProgress(0)
    setPhase('Ready to translate')
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
    maxFiles: 1,
    multiple: false,
  })

  async function handleTranslate() {
    if (!file) return

    setLoading(true)
    setApiError('')
    setSourceText('')
    setTranslatedText('')
    setProgress(8)
    setPhase('Reading PDF text...')

    try {
      const extracted = await extractPdfDocumentText(file, {
        useOcr,
        onProgress: details => {
          if (details.phase === 'extract') {
            setPhase('Reading PDF text...')
            setProgress(22)
          } else {
            setPhase(details.phase === 'ocr-render' ? 'Rendering PDF pages...' : 'Reading text with OCR...')
            const ratio = details.totalPages ? (details.currentPage || 0) / details.totalPages : 0
            setProgress(details.phase === 'ocr-render' ? 10 + ratio * 24 : 34 + ratio * 30)
          }
        },
      })

      if (!extracted.text.trim()) {
        throw new Error('No readable text was found in this PDF')
      }

      setSourceText(extracted.text)
      setSourceKind(extracted.source)
      setPhase('Translating content...')
      setProgress(72)

      const translated = await callAiTextTool(
        'translate',
        `Target language: ${targetLanguage}\n\nTranslate the following PDF content while keeping paragraphs readable:\n\n${extracted.text}`,
        {
          systemPrompt: `Detect the source language automatically and translate the content into ${targetLanguage}. Keep structure clean and readable.`,
          temperature: 0.2,
          maxTokens: 2600,
        }
      )

      setTranslatedText(translated)
      setProgress(100)
      setPhase('Translation ready')
    } catch (error) {
      setApiError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function handleExportWord() {
    if (!translatedText || !file) return
    const result = await exportTextAsWordDocument(translatedText, {
      title: `${file.name.replace(/\.pdf$/i, '')}-${targetLanguage.toLowerCase()}`,
      mode: 'editable',
    })
    downloadBlob(result.blob, result.filename)
  }

  return (
    <section className="space-y-6">
      <div className="max-w-3xl space-y-3">
        <span className="premium-chip">AI PDF translation</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          PDF Translator
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Translate PDF content with auto source detection and export-ready output.
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
              Translate the readable content into your chosen language.
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="premium-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
                  <Languages className="h-4 w-4" />
                </div>
                <div className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                  Auto detect
                </div>
              </div>
              <h4 className="font-display text-base font-bold tracking-tight text-slate-950">Target Language</h4>
              <select value={targetLanguage} onChange={event => setTargetLanguage(event.target.value)} className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white">
                {TARGET_LANGUAGES.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            <div className="premium-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-600">
                  <ScanText className="h-4 w-4" />
                </div>
                <button type="button" role="switch" aria-checked={useOcr} onClick={() => setUseOcr(current => !current)} className={cn('relative h-6 w-11 rounded-full transition-colors', useOcr ? 'bg-indigo-600' : 'bg-slate-200')}>
                  <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform', useOcr ? 'translate-x-5' : 'translate-x-0.5')} />
                </button>
              </div>
              <h4 className="font-display text-base font-bold tracking-tight text-slate-950">OCR Mode</h4>
              <p className="mt-2 text-sm text-slate-500">Enable this for scanned PDFs or broken text encoding.</p>
            </div>
          </div>

          <div className="premium-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-slate-950">Translation Preview</h3>
                <p className="mt-1 text-sm text-slate-500">Original text and translated output in one view.</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                {sourceKind || 'Ready'}
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Original</p>
                <div className="max-h-[380px] overflow-auto whitespace-pre-wrap text-sm leading-7 text-slate-600">
                  {sourceText || 'Extracted source text will appear here.'}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600">{targetLanguage}</p>
                <div className="max-h-[380px] overflow-auto whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {translatedText || 'Translated output will appear here.'}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={handleTranslate} disabled={!file || loading} className="btn-primary inline-flex items-center gap-2 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Translate PDF
              </button>
              <button type="button" onClick={() => downloadTextFile(`${file?.name.replace(/\.pdf$/i, '') || 'translated'}-${targetLanguage.toLowerCase()}.txt`, translatedText)} disabled={!translatedText} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70">
                <Download className="h-4 w-4" />
                Download TXT
              </button>
              <button type="button" onClick={handleExportWord} disabled={!translatedText} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70">
                <Download className="h-4 w-4" />
                Export Word
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
                <p className="mt-1 text-xs leading-5 text-slate-500">Extract, translate, review, and export the translated content.</p>
              </div>
            </div>
          </div>

          <div className="noise relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_42%)]" />
            <div className="relative z-10 space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/90">
                {translatedText ? <CheckCircle2 className="h-5 w-5" /> : <Languages className="h-5 w-5" />}
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-extrabold tracking-tight">
                  {translatedText ? 'Translation ready' : 'Your translated file will appear here'}
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  {translatedText ? `${translatedText.split(/\s+/).filter(Boolean).length} translated words ready to export.` : 'Choose a target language and start translation.'}
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
