'use client'

import { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  ChevronRight,
  Copy,
  Download,
  FileText,
  Folder,
  Loader2,
  Lock,
  Search,
  Sparkles,
  UploadCloud,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import { getMaxFileSize } from '@/lib/file-limits'
import MobileToolActionBar from './MobileToolActionBar'

const FILE_COPY = {
  'csv-viewer': {
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
    summary: 'Upload a ZIP file, browse the contents, and download files individually or all at once.',
    badges: ['File listing', 'Per-file download', 'Folder tree'],
    actionLabel: 'Extract ZIP',
    emptyTitle: 'ZIP contents appear here',
    accept: { 'application/zip': ['.zip'], 'application/x-zip-compressed': ['.zip'] },
  },
} as const

type ParsedResult = {
  output: string
  metrics: Array<{ label: string; value: string }>
  csvPreview?: {
    headers: string[]
    rows: string[][]
    truncated: boolean
  }
}

type ZipEntry = {
  name: string
  size: number
  compressed: number
  isDir: boolean
}

type ZipResult = {
  entries: ZipEntry[]
  metrics: Array<{ label: string; value: string }>
  zipInstance: unknown // JSZip instance stored for downloads
}

export default function FileViewerStudio({ tool }: { tool: Tool }) {
  const copy = FILE_COPY[tool.slug as keyof typeof FILE_COPY]
  const maxSize = getMaxFileSize('file')
  const [file, setFile] = useState<File | null>(null)
  const [textInput, setTextInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ParsedResult | null>(null)
  const [zipResult, setZipResult] = useState<ZipResult | null>(null)
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null)

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: copy.accept,
    multiple: false,
    noClick: true,
    maxSize,
    onDropAccepted: files => {
      setFile(files[0] || null)
      setResult(null)
      setZipResult(null)
      setError('')
    },
    onDropRejected: rejected => {
      const err = rejected[0]?.errors?.[0]
      if (err?.code === 'file-too-large') {
        setError(`File too large. Maximum size is ${formatBytes(maxSize)}.`)
      } else if (err?.code === 'file-invalid-type') {
        setError('Unsupported file format for this tool.')
      } else {
        setError(err?.message || 'File not accepted.')
      }
    },
  })

  // Group zip entries into a folder tree
  const folderTree = useMemo(() => {
    if (!zipResult) return null
    const dirs = new Set<string>()
    const filesByDir = new Map<string, ZipEntry[]>()

    for (const entry of zipResult.entries) {
      if (entry.isDir) {
        dirs.add(entry.name)
        continue
      }
      const lastSlash = entry.name.lastIndexOf('/')
      const dir = lastSlash >= 0 ? entry.name.slice(0, lastSlash + 1) : ''
      if (!filesByDir.has(dir)) filesByDir.set(dir, [])
      filesByDir.get(dir)!.push(entry)
    }

    return { dirs: [...dirs].sort(), filesByDir }
  }, [zipResult])

  async function handleProcess() {
    setError('')
    setResult(null)
    setZipResult(null)
    setLoading(true)

    try {
      // ── CSV ──
      if (tool.slug === 'csv-viewer') {
        let csvText = ''
        if (file) {
          csvText = await file.text()
        } else if (textInput.trim()) {
          csvText = textInput.trim()
        } else {
          setError('Upload a CSV file or paste CSV data.')
          return
        }

        if (!csvText.trim()) { setError('File is empty.'); return }

        const lines = csvText
          .split('\n')
          .map(line => line.replace(/\r$/, ''))
          .filter(Boolean)
        if (lines.length === 0) { setError('No CSV data found.'); return }

        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
        const rows = lines.slice(1).map(line => line.split(',').map(c => c.trim().replace(/^"|"$/g, '')))

        setResult({
          output: csvText,
          metrics: [
            { label: 'Rows', value: `${rows.length}` },
            { label: 'Columns', value: `${headers.length}` },
            { label: 'Size', value: formatBytes(csvText.length) },
          ],
          csvPreview: {
            headers,
            rows: rows.slice(0, 100),
            truncated: rows.length > 100,
          },
        })
      }

      // ── JSON ──
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

        if (!jsonText.trim()) { setError('File is empty.'); return }

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

      // ── ZIP ──
      if (tool.slug === 'zip-extractor') {
        if (!file) { setError('Upload a ZIP file to extract.'); return }

        if (file.size === 0) { setError('The file is empty.'); return }

        const arrayBuffer = await file.arrayBuffer()

        // Quick magic-byte check
        const header = new Uint8Array(arrayBuffer, 0, 4)
        if (header[0] !== 0x50 || header[1] !== 0x4B) {
          setError('This doesn\'t appear to be a valid ZIP file. The file may be corrupted.')
          return
        }

        try {
          const jszipModule = await import('jszip')
          const JSZip = jszipModule.default
          const zip = await JSZip.loadAsync(arrayBuffer)

          const entries: ZipEntry[] = []
          let totalUncompressed = 0

          zip.forEach((relativePath, zipEntry) => {
            const entry: ZipEntry = {
              name: relativePath,
              size: (zipEntry as unknown as { _data?: { uncompressedSize?: number } })._data?.uncompressedSize || 0,
              compressed: (zipEntry as unknown as { _data?: { compressedSize?: number } })._data?.compressedSize || 0,
              isDir: zipEntry.dir,
            }
            entries.push(entry)
            if (!zipEntry.dir) totalUncompressed += entry.size
          })

          // Safety: prevent zip bombs (> 1GB uncompressed)
          if (totalUncompressed > 1024 * 1024 * 1024) {
            setError('This archive exceeds the 1 GB extraction limit. The file may be a zip bomb.')
            return
          }

          if (entries.length === 0) {
            setError('The ZIP archive is empty.')
            return
          }

          const fileCount = entries.filter(e => !e.isDir).length
          const folderCount = entries.filter(e => e.isDir).length

          setZipResult({
            entries,
            metrics: [
              { label: 'Files', value: `${fileCount}` },
              { label: 'Folders', value: `${folderCount}` },
              { label: 'Archive', value: formatBytes(file.size) },
              { label: 'Uncompressed', value: formatBytes(totalUncompressed) },
            ],
            zipInstance: zip,
          })
        } catch (parseError) {
          const msg = (parseError as Error).message || ''
          if (msg.toLowerCase().includes('password') || msg.toLowerCase().includes('encrypted')) {
            setError('This ZIP file is password-protected. Password-protected archives are not supported.')
          } else {
            setError('Could not parse ZIP structure. The file may be corrupted or in an unsupported format.')
          }
        }
      }
    } catch (processError) {
      setError((processError as Error).message || 'Processing failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function downloadSingleFile(entryName: string) {
    if (!zipResult?.zipInstance) return
    setDownloadingFile(entryName)
    try {
      const JSZip = (await import('jszip')).default
      const zip = zipResult.zipInstance as InstanceType<typeof JSZip>
      const zipFile = zip.file(entryName)
      if (!zipFile) { setError(`File "${entryName}" not found in archive.`); return }
      const blob = await zipFile.async('blob')
      const filename = entryName.includes('/') ? entryName.split('/').pop()! : entryName
      downloadBlob(blob, filename)
    } catch {
      setError('Failed to extract this file.')
    } finally {
      setDownloadingFile(null)
    }
  }

  async function downloadAllFiles() {
    if (!zipResult?.zipInstance) return
    setLoading(true)
    try {
      const jszipModule = await import('jszip')
      const JSZip = jszipModule.default
      const sourceZip = zipResult.zipInstance as InstanceType<typeof JSZip>
      const newZip = new JSZip()

      for (const entry of zipResult.entries) {
        if (entry.isDir) continue
        const zipFile = sourceZip.file(entry.name)
        if (!zipFile) continue
        const data = await zipFile.async('uint8array')
        newZip.file(entry.name, data)
      }

      const blob = await newZip.generateAsync({
        type: 'blob',
        compression: 'STORE', // no compression for extracted output
      })
      downloadBlob(blob, `extracted-${file?.name || 'archive'}.zip`)
    } catch {
      setError('Failed to extract files.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setFile(null)
    setTextInput('')
    setResult(null)
    setZipResult(null)
    setError('')
  }

  return (
    <div className="space-y-6" data-tool-shell="true">
      <MobileToolActionBar
        primaryLabel={copy.actionLabel}
        onPrimary={handleProcess}
        primaryDisabled={loading || (!file && !textInput.trim())}
        loading={loading}
        secondaryLabel="Reset"
        onSecondary={handleReset}
      />
      <header className="max-w-3xl">
        <div className="flex flex-wrap gap-2 hidden sm:flex">
          {copy.badges.map(item => (
            <span key={item} className="premium-chip">{item}</span>
          ))}
        </div>
        <p className="mt-4 sm:mt-6 premium-kicker">{copy.eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl dark:text-slate-50">
          {copy.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 line-clamp-2 sm:line-clamp-none">
          {copy.summary}
        </p>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.14fr)_340px]">
        <div className="space-y-4">
          <section className="premium-panel p-4 sm:p-5">
            <div
              {...getRootProps()}
              className={cn(
                'rounded-lg border-2 border-dashed px-5 py-6 transition-colors',
                isDragActive ? 'border-indigo-500 bg-indigo-50/60' : 'border-slate-200 bg-slate-50/70 dark:border-slate-700 dark:bg-slate-900/40'
              )}
            >
              <input {...getInputProps()} />
              {!file ? (
                <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
                  <UploadCloud className="mb-3 h-8 w-8 text-slate-400" />
                  <p className="font-display text-base font-bold tracking-tight text-slate-950 dark:text-slate-50">
                    Drop your file here
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Max {formatBytes(maxSize)}
                  </p>
                  <button
                    type="button"
                    onClick={open}
                    className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                  >
                    Choose file
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-7 w-7 shrink-0 text-indigo-500" />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-950 dark:text-slate-50">{file.name}</p>
                      <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                  <button type="button" onClick={open} className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
                    Replace
                  </button>
                </div>
              )}
            </div>

            {tool.slug !== 'zip-extractor' && (
              <div className="mt-3">
                <p className="mb-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">Or paste data directly:</p>
                <textarea
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  rows={5}
                  className="w-full rounded-lg bg-slate-50 px-4 py-3 text-sm font-mono outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800"
                  placeholder={tool.slug === 'csv-viewer' ? 'Name,Age,City\nJohn,25,NYC\nJane,30,LA' : '{ "key": "value" }'}
                />
              </div>
            )}
          </section>
        </div>

        <div className="space-y-4">
          <section className="premium-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Live process</h2>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                {loading ? 'Parsing' : (result || zipResult) ? 'Ready' : 'Idle'}
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] transition-all" style={{ width: loading ? '72%' : (result || zipResult) ? '100%' : '12%' }} />
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-lg bg-slate-50 px-3 py-3 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                  {loading ? 'Parsing file...' : (result || zipResult) ? 'Parse complete' : 'Waiting for input'}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {(result || zipResult) ? 'View the parsed output below.' : 'Upload a file to begin.'}
                </p>
              </div>
            </div>
          </section>

          {/* Quick stats for CSV/JSON */}
          {result && (
            <section className="premium-card p-4">
              <p className="premium-kicker">Quick stats</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {result.metrics.map(m => (
                  <div key={m.label} className="rounded-lg bg-slate-50 px-3 py-2.5 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{m.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-slate-50">{m.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick stats for ZIP */}
          {zipResult && (
            <section className="premium-card p-4">
              <p className="premium-kicker">Archive stats</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {zipResult.metrics.map(m => (
                  <div key={m.label} className="rounded-lg bg-slate-50 px-3 py-2.5 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{m.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-slate-50">{m.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* CSV table preview */}
      {result?.csvPreview ? (() => {
        const preview = result.csvPreview

        return (
          <section className="premium-card overflow-hidden">
            <div className="border-b border-slate-200/70 px-4 py-3 dark:border-slate-800/70">
              <p className="premium-kicker">Table preview</p>
              <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                CSV Data
              </h2>
            </div>
            <div className="max-h-[500px] overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {preview.headers.map((header, headerIndex) => (
                      <th
                        key={`header-${headerIndex}`}
                        className="whitespace-nowrap border border-slate-200 bg-slate-100 px-3 py-2 text-left font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row, rowIndex) => (
                    <tr
                      key={`row-${rowIndex}`}
                      className={rowIndex % 2 === 0 ? 'bg-white dark:bg-slate-950/20' : 'bg-slate-50 dark:bg-slate-950/40'}
                    >
                      {preview.headers.map((_, cellIndex) => (
                        <td
                          key={`cell-${rowIndex}-${cellIndex}`}
                          className="whitespace-nowrap border border-slate-200 px-3 py-2 text-slate-700 dark:border-slate-800 dark:text-slate-200"
                        >
                          {row[cellIndex] || ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {preview.truncated ? (
                <p className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                  Showing first 100 rows.
                </p>
              ) : null}
            </div>
          </section>
        )
      })() : null}

      {/* JSON/CSV text output */}
      {result && !result.csvPreview && (
        <section className="overflow-hidden rounded-xl bg-[radial-gradient(circle_at_top,#1f2560,#090c18_68%)] p-5 text-white shadow-lg">
          <h2 className="font-display text-xl font-extrabold tracking-tight">Parsed output</h2>
          <pre className="mt-3 max-h-[400px] overflow-auto rounded-lg bg-white/6 p-4 text-sm leading-6 text-slate-200 whitespace-pre-wrap font-mono ring-1 ring-white/10">
            {result.output}
          </pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void navigator.clipboard.writeText(result.output)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 hover:scale-[1.01] transition"
            >
              <Copy className="h-3.5 w-3.5" /> Copy output
            </button>
            <button
              type="button"
              onClick={() => downloadBlob(new Blob([result.output], { type: 'text/plain' }), `${tool.slug}-output.txt`)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/8 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/12 transition"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </button>
          </div>
        </section>
      )}

      {/* ZIP file listing with folder tree and downloads */}
      {zipResult && folderTree && (
        <section className="overflow-hidden rounded-xl bg-[radial-gradient(circle_at_top,#1f2560,#090c18_68%)] p-5 text-white shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-extrabold tracking-tight">Extracted files</h2>
            <button
              type="button"
              onClick={downloadAllFiles}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-950 hover:bg-slate-100 transition disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
              Download All
            </button>
          </div>

          <div className="mt-4 max-h-[500px] overflow-auto rounded-lg bg-white/6 ring-1 ring-white/10">
            {/* Root-level files */}
            {(folderTree.filesByDir.get('') || []).map(entry => (
              <div key={entry.name} className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span className="truncate text-sm text-slate-200">{entry.name}</span>
                  <span className="shrink-0 text-xs text-slate-500">{formatBytes(entry.size)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => downloadSingleFile(entry.name)}
                  disabled={downloadingFile === entry.name}
                  className="shrink-0 rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20 transition disabled:opacity-50"
                >
                  {downloadingFile === entry.name ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                </button>
              </div>
            ))}

            {/* Folders and their files */}
            {folderTree.dirs.map(dir => (
              <details key={dir} className="group">
                <summary className="flex cursor-pointer items-center gap-2 border-b border-white/5 px-4 py-2.5 hover:bg-white/5">
                  <ChevronRight className="h-3 w-3 shrink-0 text-slate-500 transition-transform group-open:rotate-90" />
                  <Folder className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                  <span className="truncate text-sm font-medium text-slate-200">{dir}</span>
                  <span className="shrink-0 text-xs text-slate-500">{(folderTree.filesByDir.get(dir) || []).length} files</span>
                </summary>
                <div className="bg-white/3">
                  {(folderTree.filesByDir.get(dir) || []).map(entry => {
                    const shortName = entry.name.slice(dir.length)
                    return (
                      <div key={entry.name} className="flex items-center justify-between gap-3 border-b border-white/3 px-4 py-2 pl-10">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-3 w-3 shrink-0 text-slate-500" />
                          <span className="truncate text-xs text-slate-300">{shortName}</span>
                          <span className="shrink-0 text-[10px] text-slate-500">{formatBytes(entry.size)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => downloadSingleFile(entry.name)}
                          disabled={downloadingFile === entry.name}
                          className="shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-white/20 transition disabled:opacity-50"
                        >
                          {downloadingFile === entry.name ? <Loader2 className="h-2.5 w-2.5 animate-spin" /> : <Download className="h-2.5 w-2.5" />}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-start gap-3 rounded-lg bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 ring-1 ring-rose-200 dark:bg-rose-950/20 dark:text-rose-300 dark:ring-rose-800">
          {error.includes('password') ? <Lock className="h-4 w-4 shrink-0 mt-0.5" /> : null}
          <span>{error}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleProcess}
          disabled={loading || (!file && !textInput.trim())}
          className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(135deg,#24389c,#465fd6)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {copy.actionLabel}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
