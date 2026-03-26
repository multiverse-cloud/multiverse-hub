'use client'

import { useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Copy,
  Download,
  FileText,
  Loader2,
  Search,
  Sparkles,
  UploadCloud,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'

const FILE_COPY = {
  'csv-viewer-editor': {
    eyebrow: 'Spreadsheet inspector',
    title: 'CSV Viewer & Editor',
    summary: 'Upload a CSV file and browse the data in a clean, sortable table with instant stats.',
    badges: ['Table view', 'Row & column stats', 'Quick copy'],
    actionLabel: 'Parse CSV',
    emptyTitle: 'CSV table appears here',
    accept: { 'text/csv': ['.csv'] },
  },
  'json-file-viewer': {
    eyebrow: 'Data inspector',
    title: 'JSON File Viewer',
    summary: 'Upload or paste a JSON file and view it with syntax highlighting and collapsible structure.',
    badges: ['Syntax highlight', 'Pretty print', 'Copy output'],
    actionLabel: 'Parse JSON',
    emptyTitle: 'JSON view appears here',
    accept: { 'application/json': ['.json'] },
  },
  'zip-extractor': {
    eyebrow: 'Archive browser',
    title: 'ZIP Extractor',
    summary: 'Upload a ZIP file and view all contained files with sizes, types, and structure — right in your browser.',
    badges: ['File listing', 'Size breakdown', 'No install'],
    actionLabel: 'Extract ZIP',
    emptyTitle: 'ZIP contents appear here',
    accept: { 'application/zip': ['.zip'], 'application/x-zip-compressed': ['.zip'] },
  },
} as const

type ParsedResult = {
  output: string
  metrics: Array<{ label: string; value: string }>
  htmlPreview?: string
}

export default function FileViewerStudio({ tool }: { tool: Tool }) {
  const copy = FILE_COPY[tool.slug as keyof typeof FILE_COPY]
  const [file, setFile] = useState<File | null>(null)
  const [textInput, setTextInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ParsedResult | null>(null)

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: copy.accept,
    multiple: false,
    noClick: true,
    onDropAccepted: files => {
      setFile(files[0] || null)
      setResult(null)
      setError('')
    },
  })

  async function handleProcess() {
    setError('')
    setResult(null)
    setLoading(true)

    try {
      if (tool.slug === 'csv-viewer-editor') {
        let csvText = ''
        if (file) {
          csvText = await file.text()
        } else if (textInput.trim()) {
          csvText = textInput.trim()
        } else {
          setError('Upload a CSV file or paste CSV data.')
          return
        }

        const lines = csvText.split('\n').filter(Boolean)
        if (lines.length === 0) { setError('No CSV data found.'); return }

        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
        const rows = lines.slice(1).map(line => line.split(',').map(c => c.trim().replace(/^"|"$/g, '')))

        const tableHtml = `<div style="overflow-x:auto;font-family:system-ui"><table style="border-collapse:collapse;width:100%;font-size:13px"><thead><tr>${headers.map(h => `<th style="padding:10px 14px;background:#f1f5f9;border:1px solid #e2e8f0;font-weight:700;text-align:left;white-space:nowrap">${h}</th>`).join('')}</tr></thead><tbody>${rows.slice(0, 100).map((row, i) => `<tr style="background:${i % 2 ? '#f8fafc' : '#fff'}">${headers.map((_, ci) => `<td style="padding:8px 14px;border:1px solid #e2e8f0;white-space:nowrap">${row[ci] || ''}</td>`).join('')}</tr>`).join('')}</tbody></table>${rows.length > 100 ? `<p style="padding:12px;color:#64748b;font-size:13px">Showing first 100 of ${rows.length} rows</p>` : ''}</div>`

        setResult({
          output: csvText,
          metrics: [
            { label: 'Rows', value: `${rows.length}` },
            { label: 'Columns', value: `${headers.length}` },
            { label: 'Size', value: formatBytes(csvText.length) },
          ],
          htmlPreview: tableHtml,
        })
      }

      if (tool.slug === 'json-file-viewer') {
        let jsonText = ''
        if (file) {
          jsonText = await file.text()
        } else if (textInput.trim()) {
          jsonText = textInput.trim()
        } else {
          setError('Upload a JSON file or paste JSON data.')
          return
        }

        try {
          const parsed = JSON.parse(jsonText)
          const pretty = JSON.stringify(parsed, null, 2)
          const keys = Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length
          const depth = (function getDepth(obj: unknown): number {
            if (typeof obj !== 'object' || obj === null) return 0
            const children = Object.values(obj as Record<string, unknown>).map(getDepth)
            return 1 + Math.max(0, ...children)
          })(parsed)

          setResult({
            output: pretty,
            metrics: [
              { label: 'Type', value: Array.isArray(parsed) ? `Array [${parsed.length}]` : 'Object' },
              { label: 'Keys', value: `${keys}` },
              { label: 'Depth', value: `${depth} levels` },
              { label: 'Size', value: formatBytes(pretty.length) },
            ],
          })
        } catch {
          setError('Invalid JSON. Check for syntax errors.')
        }
      }

      if (tool.slug === 'zip-extractor') {
        if (!file) { setError('Upload a ZIP file to extract.'); return }

        const arrayBuffer = await file.arrayBuffer()
        const dataView = new DataView(arrayBuffer)

        const entries: Array<{ name: string; size: number; compressed: number }> = []
        let offset = 0

        while (offset < dataView.byteLength - 4) {
          const sig = dataView.getUint32(offset, true)
          if (sig !== 0x04034b50) break

          const compressedSize = dataView.getUint32(offset + 18, true)
          const uncompressedSize = dataView.getUint32(offset + 22, true)
          const nameLen = dataView.getUint16(offset + 26, true)
          const extraLen = dataView.getUint16(offset + 28, true)

          const nameBytes = new Uint8Array(arrayBuffer, offset + 30, nameLen)
          const name = new TextDecoder().decode(nameBytes)

          entries.push({ name, size: uncompressedSize, compressed: compressedSize })

          offset += 30 + nameLen + extraLen + compressedSize
        }

        if (entries.length === 0) {
          setError('Could not parse ZIP structure. The file may be corrupted.')
          return
        }

        const totalUncompressed = entries.reduce((sum, e) => sum + e.size, 0)

        const listing = entries.map((e, i) =>
          `${String(i + 1).padStart(3, ' ')}. ${e.name}  (${formatBytes(e.size)})`
        ).join('\n')

        const output = `ZIP Archive: ${file.name}\n${'─'.repeat(50)}\n${listing}\n${'─'.repeat(50)}\nTotal: ${entries.length} files, ${formatBytes(totalUncompressed)} uncompressed`

        setResult({
          output,
          metrics: [
            { label: 'Files', value: `${entries.length}` },
            { label: 'Archive size', value: formatBytes(file.size) },
            { label: 'Uncompressed', value: formatBytes(totalUncompressed) },
            { label: 'Ratio', value: totalUncompressed > 0 ? `${((1 - file.size / totalUncompressed) * 100).toFixed(1)}%` : '--' },
          ],
        })
      }
    } catch (processError) {
      setError((processError as Error).message)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setFile(null)
    setTextInput('')
    setResult(null)
    setError('')
  }

  return (
    <div className="space-y-8" data-tool-shell="true">
      <header className="max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {copy.badges.map(item => (
            <span key={item} className="premium-chip">{item}</span>
          ))}
        </div>
        <p className="mt-6 premium-kicker">{copy.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl dark:text-slate-50">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {copy.summary}
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_360px]">
        <div className="space-y-5">
          <section className="premium-panel p-5 sm:p-6">
            <div
              {...getRootProps()}
              className={cn(
                'rounded-[22px] border-2 border-dashed px-6 py-8 transition-colors',
                isDragActive ? 'border-indigo-500 bg-indigo-50/60' : 'border-slate-200 bg-slate-50/70 dark:border-slate-700 dark:bg-slate-900/40'
              )}
            >
              <input {...getInputProps()} />
              {!file ? (
                <div className="flex min-h-[160px] flex-col items-center justify-center text-center">
                  <UploadCloud className="mb-4 h-10 w-10 text-slate-400" />
                  <p className="font-display text-lg font-bold tracking-tight text-slate-950 dark:text-slate-50">
                    Drop your file here
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    or click to browse
                  </p>
                  <button
                    type="button"
                    onClick={open}
                    className="mt-4 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                  >
                    Choose file
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-8 w-8 shrink-0 text-indigo-500" />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-950 dark:text-slate-50">{file.name}</p>
                      <p className="text-sm text-slate-500">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                  <button type="button" onClick={open} className="shrink-0 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
                    Replace
                  </button>
                </div>
              )}
            </div>

            {tool.slug !== 'zip-extractor' && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">Or paste data directly:</p>
                <textarea
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  rows={6}
                  className="w-full rounded-[22px] bg-slate-50 px-5 py-4 text-sm font-mono outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800"
                  placeholder={tool.slug === 'csv-viewer-editor' ? 'Name,Age,City\nJohn,25,NYC\nJane,30,LA' : '{ "key": "value" }'}
                />
              </div>
            )}
          </section>
        </div>

        <div className="space-y-5">
          <section className="premium-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Live process</h2>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                {loading ? 'Parsing' : result ? 'Ready' : 'Idle'}
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] transition-all" style={{ width: loading ? '72%' : result ? '100%' : '12%' }} />
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                  {loading ? 'Parsing file...' : result ? 'Parse complete' : 'Waiting for input'}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {result ? 'View the parsed output below, then copy or download.' : 'Upload a file or paste data to begin.'}
                </p>
              </div>
            </div>
          </section>

          {result && (
            <section className="premium-card p-5">
              <p className="premium-kicker">Quick stats</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {result.metrics.map(m => (
                  <div key={m.label} className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{m.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-50">{m.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {result?.htmlPreview && (
        <section className="premium-card overflow-hidden">
          <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800/70">
            <p className="premium-kicker">Table preview</p>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
              CSV Data
            </h2>
          </div>
          <div className="max-h-[500px] overflow-auto p-0" dangerouslySetInnerHTML={{ __html: result.htmlPreview }} />
        </section>
      )}

      {result && !result.htmlPreview && (
        <section className="overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,#1f2560,#090c18_68%)] p-6 text-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.75)]">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Parsed output</h2>
          <pre className="mt-4 max-h-[400px] overflow-auto rounded-2xl bg-white/6 p-5 text-sm leading-6 text-slate-200 whitespace-pre-wrap font-mono ring-1 ring-white/10">
            {result.output}
          </pre>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void navigator.clipboard.writeText(result.output)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:scale-[1.01] transition"
            >
              <Copy className="h-4 w-4" /> Copy output
            </button>
            <button
              type="button"
              onClick={() => downloadBlob(new Blob([result.output], { type: 'text/plain' }), `${tool.slug}-output.txt`)}
              className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/12 transition"
            >
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        </section>
      )}

      {error && (
        <div className="rounded-2xl bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-600 ring-1 ring-rose-200 dark:bg-rose-950/20 dark:text-rose-300 dark:ring-rose-800">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleProcess}
          disabled={loading || (!file && !textInput.trim())}
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {copy.actionLabel}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          Reset workspace
        </button>
      </div>
    </div>
  )
}
