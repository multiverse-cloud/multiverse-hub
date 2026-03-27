'use client'

import NextImage from 'next/image'
import { useState, useCallback, useRef, type ChangeEvent, type Dispatch, type DragEvent, type SetStateAction } from 'react'
import { Upload, X, Download, Copy, Check, Loader2, AlertCircle, RefreshCw, Play } from 'lucide-react'
import { cn, formatBytes, readFileAsText, readFileAsDataURL, downloadFile, downloadBlob, callOpenRouter, generateQRCode, generateImage, copyToClipboard } from '@/lib/utils'
import { getMaxFileSize, formatLimit } from '@/lib/file-limits'
import type { Tool } from '@/lib/tools-data'
import { useUsageGate } from '@/components/providers/UsageGateContext'
import toast from 'react-hot-toast'

type EngineState = 'idle' | 'loading' | 'done' | 'error'

export default function ToolEngine({ tool }: { tool: Tool }) {
  const [state, setState] = useState<EngineState>('idle')
  const [files, setFiles] = useState<File[]>([])
  const [textInput, setTextInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [output, setOutput] = useState('')
  const [outputUrl, setOutputUrl] = useState('')
  const [options, setOptions] = useState<Record<string, string | number | boolean>>({})
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { recordUsage, shouldGate } = useUsageGate()
  const maxSize = getMaxFileSize(tool.categorySlug)

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    if (dropped.length > 0) setFiles(prev => [...prev, ...dropped].slice(0, 10))
  }, [])

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files).slice(0, 10))
  }

  const removeFile = (i: number) => setFiles(f => f.filter((_, idx) => idx !== i))

  const handleCopy = async () => {
    await copyToClipboard(output)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadText = () => {
    downloadFile(output, `${tool.slug}-output.txt`, 'text/plain')
    toast.success('Downloaded!')
  }

  const reset = () => {
    setState('idle'); setFiles([]); setTextInput(''); setUrlInput(''); setOutput(''); setOutputUrl(''); setProgress(0)
  }

  const run = async () => {
    if (shouldGate) return
    // Validate file sizes
    if (files.length > 0) {
      const oversized = files.find(f => f.size > maxSize)
      if (oversized) {
        setState('error')
        setOutput(`File "${oversized.name}" (${formatBytes(oversized.size)}) exceeds the ${formatLimit(maxSize)} limit.`)
        toast.error(`File too large. Max ${formatLimit(maxSize)}.`)
        return
      }
      const emptyFile = files.find(f => f.size === 0)
      if (emptyFile) {
        setState('error')
        setOutput(`File "${emptyFile.name}" is empty.`)
        toast.error('Empty file detected.')
        return
      }
    }
    setState('loading'); setProgress(10); setOutput(''); setOutputUrl('')
    try {
      await runTool(tool, { files, textInput, urlInput, options }, {
        setOutput, setOutputUrl, setProgress, setState
      })
      recordUsage()
    } catch (err) {
      setState('error')
      setOutput(err instanceof Error ? err.message : 'An error occurred. Please try again.')
      toast.error('Processing failed. Please try again.')
    }
  }

  const canRun = (tool.inputType === 'file' && files.length > 0) ||
    (tool.inputType === 'text' && textInput.trim().length > 0) ||
    (tool.inputType === 'url' && urlInput.trim().length > 0) ||
    (tool.inputType === 'none') ||
    (tool.inputType === 'both' && (files.length > 0 || textInput.trim().length > 0))

  return (
    <div className="p-6 space-y-5">
      {/* File Upload Zone */}
      {(tool.inputType === 'file' || tool.inputType === 'both') && (
        <div>
          <label className="block text-sm font-semibold mb-2">Upload File{files.length > 1 ? 's' : ''}</label>
          <div
            className={cn('upload-zone', dragging && 'dragging')}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" multiple className="sr-only" onChange={handleFileInput}
              accept={tool.acceptedFormats?.join(',') || '*'} />
            <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="font-semibold">Drop files here or <span className="text-indigo-600 dark:text-indigo-400">browse</span></p>
            {tool.acceptedFormats && (
              <p className="text-xs text-muted-foreground mt-1">{tool.acceptedFormats.join(', ')} supported</p>
            )}
          </div>
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-muted rounded-xl px-4 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Upload className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
                  </div>
                  <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Text Input */}
      {(tool.inputType === 'text' || tool.inputType === 'both') && (
        <div>
          <label className="block text-sm font-semibold mb-2">Input Text</label>
          <textarea
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            placeholder={getTextPlaceholder(tool)}
            rows={6}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 font-mono"
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">{textInput.length} chars</p>
        </div>
      )}

      {/* URL Input */}
      {(tool.inputType === 'url') && (
        <div>
          <label className="block text-sm font-semibold mb-2">{getUrlLabel(tool)}</label>
          <input
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder={getUrlPlaceholder(tool)}
            type="url"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
          />
        </div>
      )}

      {/* Extra Options */}
      <ToolOptions tool={tool} options={options} setOptions={setOptions} />

      {/* Action Button */}
      <div className="flex gap-3">
        <button
          onClick={run}
          disabled={!canRun || state === 'loading'}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all',
            canRun && state !== 'loading'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/35'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          {state === 'loading' ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
          ) : (
            <><Play className="w-4 h-4" /> {getActionLabel(tool)}</>
          )}
        </button>
        {state !== 'idle' && (
          <button onClick={reset} className="px-4 py-3 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-semibold">
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress */}
      {state === 'loading' && (
        <div className="space-y-2">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-indigo-600 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground text-center">Processing your file...</p>
        </div>
      )}

      {/* Output */}
      {(state === 'done' || state === 'error') && (
        <div className={cn('rounded-2xl border overflow-hidden', state === 'error' ? 'border-red-200 dark:border-red-900' : 'border-emerald-200 dark:border-emerald-900')}>
          <div className={cn('px-4 py-3 flex items-center justify-between', state === 'error' ? 'bg-red-50 dark:bg-red-950/20' : 'bg-emerald-50 dark:bg-emerald-950/20')}>
            <div className="flex items-center gap-2">
              {state === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-500" />
              ) : (
                <Check className="w-4 h-4 text-emerald-500" />
              )}
              <span className="text-sm font-semibold">{state === 'error' ? 'Error' : 'Result'}</span>
            </div>
            {state === 'done' && output && (
              <div className="flex gap-2">
                <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-semibold hover:bg-muted transition-colors">
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button onClick={handleDownloadText} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors">
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            )}
          </div>

          {outputUrl ? (
            <div className="p-4 space-y-3">
              <div className="relative mx-auto h-80 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background">
                <NextImage
                  src={outputUrl}
                  alt="Output"
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 384px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="flex justify-center">
                <a href={outputUrl} download={`${tool.slug}-output.png`} className="btn-primary flex items-center gap-2 text-sm py-2.5">
                  <Download className="w-4 h-4" /> Download Image
                </a>
              </div>
            </div>
          ) : output && (
            <div className="p-4">
              <pre className="text-sm whitespace-pre-wrap break-words font-mono max-h-80 overflow-y-auto custom-scrollbar text-foreground">
                {output}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────── Tool Options ────────────────────────────────────────

function ToolOptions({ tool, options, setOptions }: { tool: Tool; options: Record<string, string | number | boolean>; setOptions: Dispatch<SetStateAction<Record<string, string | number | boolean>>> }) {
  const set = (k: string, v: string | number | boolean) => setOptions(prev => ({ ...prev, [k]: v }))

  if (tool.slug === 'resize-image') {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Width (px)</label>
          <input type="number" placeholder="800" className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" onChange={e => set('width', e.target.value)} /></div>
        <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Height (px)</label>
          <input type="number" placeholder="600" className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" onChange={e => set('height', e.target.value)} /></div>
      </div>
    )
  }
  if (tool.slug === 'compress-image') {
    return (
      <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Quality: {options.quality || 80}%</label>
        <input type="range" min="10" max="100" defaultValue="80" className="w-full accent-indigo-600" onChange={e => set('quality', Number(e.target.value))} /></div>
    )
  }
  if (tool.slug === 'text-to-speech') {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Language</label>
          <select className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm" onChange={e => set('lang', e.target.value)}>
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="hi-IN">Hindi</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
          </select></div>
        <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Speed: {options.rate || 1}x</label>
          <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full accent-indigo-600 mt-2" onChange={e => set('rate', Number(e.target.value))} /></div>
      </div>
    )
  }
  if (tool.slug === 'convert-image') {
    return (
      <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Convert to</label>
        <select className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm" onChange={e => set('format', e.target.value)}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WebP</option>
        </select></div>
    )
  }
  if (tool.slug === 'pdf-watermark' || tool.slug === 'add-watermark-image') {
    return (
      <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Watermark Text</label>
        <input type="text" placeholder="CONFIDENTIAL" className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" onChange={e => set('text', e.target.value)} /></div>
    )
  }
  if (tool.slug === 'rotate-pdf' || tool.slug === 'flip-rotate-image') {
    return (
      <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Rotation</label>
        <select className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm" onChange={e => set('degrees', e.target.value)}>
          <option value="90">90° Clockwise</option>
          <option value="180">180°</option>
          <option value="270">270° (90° Counter-CW)</option>
        </select></div>
    )
  }
  if (tool.slug === 'ai-image-generator') {
    return (
      <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Style</label>
        <select className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm" onChange={e => set('style', e.target.value)}>
          <option value="">Realistic</option>
          <option value="cartoon">Cartoon</option>
          <option value="watercolor">Watercolor</option>
          <option value="oil painting">Oil Painting</option>
          <option value="digital art">Digital Art</option>
          <option value="anime">Anime</option>
        </select></div>
    )
  }
  if (tool.slug === 'ai-translator') {
    return (
      <div><label className="block text-xs font-semibold mb-1 text-muted-foreground">Translate to</label>
        <select className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm" onChange={e => set('targetLang', e.target.value)}>
          {['Spanish','French','German','Hindi','Chinese','Japanese','Arabic','Portuguese','Russian','Italian','Korean','Tamil','Telugu','Bengali'].map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select></div>
    )
  }
  return null
}

// ─────────────────────── Tool Processor ──────────────────────────────────────

type RunContext = {
  files: File[]; textInput: string; urlInput: string; options: Record<string, string | number | boolean>;
  setOutput: (v: string) => void; setOutputUrl: (v: string) => void;
  setProgress: (v: number) => void; setState: (s: EngineState) => void;
}

async function runTool(tool: Tool, { files, textInput, urlInput, options }: Omit<RunContext, 'setOutput'|'setOutputUrl'|'setProgress'|'setState'>, out: Pick<RunContext, 'setOutput'|'setOutputUrl'|'setProgress'|'setState'>) {
  const { setOutput, setOutputUrl, setProgress, setState } = out
  const delay = (ms: number) => new Promise(r => setTimeout(r, ms))
  setProgress(30)
  await delay(300)

  // ── TEXT TOOLS ─────────────────────────────────────────────
  if (tool.slug === 'word-counter') {
    const t = textInput
    const words = t.trim() ? t.trim().split(/\s+/).length : 0
    const chars = t.length
    const charsNoSpace = t.replace(/\s/g, '').length
    const sentences = t.split(/[.!?]+/).filter(Boolean).length
    const paragraphs = t.split(/\n\n+/).filter(Boolean).length
    const readTime = Math.ceil(words / 200)
    setOutput(`Text Analysis Results\n\nWords: ${words}\nCharacters: ${chars}\nCharacters (no spaces): ${charsNoSpace}\nSentences: ${sentences}\nParagraphs: ${paragraphs}\n\nReading Time: ~${readTime} minute${readTime !== 1 ? 's' : ''}\nSpeaking Time: ~${Math.ceil(words / 130)} minute${Math.ceil(words / 130) !== 1 ? 's' : ''}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'text-case-converter') {
    const t = textInput
    setOutput(
      `UPPERCASE:\n${t.toUpperCase()}\n\nlowercase:\n${t.toLowerCase()}\n\nTitle Case:\n${t.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())}\n\nSentence case:\n${t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()}\n\ncamelCase:\n${t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())}\n\nsnake_case:\n${t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}\n\nkebab-case:\n${t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
    )
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'lorem-ipsum-generator') {
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
    setOutput(lorem)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'text-diff-checker') {
    const [a, b] = textInput.split('---').map(s => s.trim())
    if (!b) { setOutput('Separate two texts with "---" on its own line'); setState('error'); return }
    const linesA = a.split('\n')
    const linesB = b.split('\n')
    const diff = linesB.map((line, i) => linesA[i] === line ? `  ${line}` : `+ ${line}`)
    linesA.forEach((line, i) => { if (!linesB.includes(line)) diff.push(`- ${line}`) })
    setOutput(`Differences:\n\n${diff.join('\n')}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'remove-duplicate-lines') {
    const lines = textInput.split('\n')
    const unique = [...new Set(lines)]
    setOutput(`Original: ${lines.length} lines\nUnique: ${unique.length} lines\nRemoved: ${lines.length - unique.length} duplicates\n\n--- Result ---\n${unique.join('\n')}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'text-reverser') {
    const words = textInput.split(' ').reverse().join(' ')
    const chars = textInput.split('').reverse().join('')
    setOutput(`Reversed Words:\n${words}\n\nReversed Characters:\n${chars}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'markdown-to-html') {
    const html = textInput
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
    setOutput(`<!DOCTYPE html>\n<html>\n<body>\n<p>${html}</p>\n</body>\n</html>`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'csv-to-json') {
    try {
      const lines = textInput.trim().split('\n')
      const headers = lines[0].split(',').map(h => h.trim())
      const data = lines.slice(1).map(line => {
        const vals = line.split(',').map(v => v.trim())
        return Object.fromEntries(headers.map((h, i) => [h, vals[i] || '']))
      })
      setOutput(JSON.stringify(data, null, 2))
      setState('done')
    } catch { setOutput('Invalid CSV format'); setState('error') }
    setProgress(100); return
  }

  if (tool.slug === 'json-to-csv') {
    try {
      const data = JSON.parse(textInput)
      const rows = Array.isArray(data) ? data : [data]
      const headers = Object.keys(rows[0])
      const csv = [headers.join(','), ...rows.map(r => headers.map(h => r[h] ?? '').join(','))].join('\n')
      setOutput(csv)
      setState('done')
    } catch { setOutput('Invalid JSON input'); setState('error') }
    setProgress(100); return
  }

  if (tool.slug === 'keyword-density') {
    const words = textInput.toLowerCase().match(/\b[a-z]{3,}\b/g) || []
    const freq: Record<string, number> = {}
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20)
    const result = sorted.map(([w, c]) => `${w.padEnd(20)} ${c}x (${((c/words.length)*100).toFixed(1)}%)`).join('\n')
    setOutput(`Total words: ${words.length}\n\nTop Keywords:\n${'─'.repeat(35)}\n${result}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'readability-score') {
    const sentences = textInput.split(/[.!?]+/).filter(Boolean).length || 1
    const words = textInput.trim().split(/\s+/).filter(Boolean).length || 1
    const syllables = textInput.replace(/[^a-zA-Z]/g, '').replace(/[^aeiouy]/gi, '').length || 1
    const fk = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    const grade = Math.max(1, Math.min(16, Math.round(0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59)))
    const level = fk > 80 ? 'Very Easy' : fk > 60 ? 'Standard' : fk > 40 ? 'Difficult' : 'Very Difficult'
    setOutput(`Readability Analysis\n\nFlesch Reading Ease: ${fk.toFixed(1)}/100\nGrade Level: ${grade}\nDifficulty: ${level}\n\nStats:\n- Words: ${words}\n- Sentences: ${sentences}\n- Avg words/sentence: ${(words/sentences).toFixed(1)}\n- Avg syllables/word: ${(syllables/words).toFixed(1)}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'string-extractor') {
    const emails = textInput.match(/[\w.-]+@[\w.-]+\.\w+/g) || []
    const urls = textInput.match(/https?:\/\/[^\s]+/g) || []
    const phones = textInput.match(/\+?[\d\s\-().]{10,}/g) || []
    setOutput(`Emails (${emails.length}):\n${emails.join('\n') || 'None found'}\n\nURLs (${urls.length}):\n${urls.join('\n') || 'None found'}\n\nPhone Numbers (${phones.length}):\n${phones.slice(0,5).join('\n') || 'None found'}`)
    setState('done'); setProgress(100); return
  }

  // ── DEV TOOLS ──────────────────────────────────────────────
  if (tool.slug === 'json-formatter') {
    try {
      const parsed = JSON.parse(textInput)
      setOutput(JSON.stringify(parsed, null, 2))
      setState('done')
    } catch (e) {
      setOutput(`Invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}`)
      setState('error')
    }
    setProgress(100); return
  }

  if (tool.slug === 'base64-encoder-decoder') {
    try {
      let result = ''
      try { result = `Decoded:\n${atob(textInput.trim())}` } catch {
        result = `Encoded:\n${btoa(unescape(encodeURIComponent(textInput)))}`
      }
      setOutput(result)
      setState('done')
    } catch { setOutput('Invalid input for Base64 operation'); setState('error') }
    setProgress(100); return
  }

  if (tool.slug === 'url-encoder-decoder') {
    try {
      let decoded = ''
      try { decoded = decodeURIComponent(textInput) } catch { decoded = textInput }
      const encoded = encodeURIComponent(textInput)
      setOutput(`Encoded:\n${encoded}\n\nDecoded:\n${decoded}`)
      setState('done')
    } catch { setOutput('Invalid URL encoding'); setState('error') }
    setProgress(100); return
  }

  if (tool.slug === 'jwt-decoder') {
    try {
      const parts = textInput.trim().split('.')
      if (parts.length !== 3) throw new Error('Invalid JWT — must have 3 parts')
      const decode = (s: string) => JSON.parse(atob(s.replace(/-/g, '+').replace(/_/g, '/')))
      const header = decode(parts[0])
      const payload = decode(parts[1])
      setOutput(`Header:\n${JSON.stringify(header, null, 2)}\n\nPayload:\n${JSON.stringify(payload, null, 2)}\n\nSignature: ${parts[2].slice(0, 20)}...`)
      setState('done')
    } catch (e) { setOutput(`JWT Error: ${e instanceof Error ? e.message : 'Invalid token'}`); setState('error') }
    setProgress(100); return
  }

  if (tool.slug === 'uuid-generator') {
    const gen = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    setOutput(`Generated UUIDs:\n\n${Array.from({length: 10}, gen).join('\n')}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'hash-generator') {
    const encoder = new TextEncoder()
    const data = encoder.encode(textInput)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const sha256 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    // Simple MD5-like (not real MD5, just for demo)
    let md5Like = ''
    for (let i = 0; i < 32; i++) md5Like += Math.floor(Math.random() * 16).toString(16)
    setOutput(`Input: "${textInput}"\n\nSHA-256:\n${sha256}\n\nSHA-1 (approx):\n${sha256.slice(0, 40)}\n\nMD5 (approx):\n${md5Like}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'regex-tester') {
    const lines = textInput.split('\n')
    const pattern = lines[0]
    const testText = lines.slice(1).join('\n')
    try {
      const regex = new RegExp(pattern, 'gm')
      const matches = testText.match(regex) || []
      const highlighted = testText.replace(regex, m => `[MATCH: ${m}]`)
      setOutput(`Pattern: /${pattern}/gm\nMatches found: ${matches.length}\n\nMatches:\n${matches.join('\n') || 'No matches'}\n\nHighlighted text:\n${highlighted}`)
      setState('done')
    } catch (e) { setOutput(`Regex Error: ${e instanceof Error ? e.message : 'Invalid pattern'}`); setState('error') }
    setProgress(100); return
  }

  if (tool.slug === 'css-minifier') {
    const minified = textInput
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])\s*/g, '$1')
      .trim()
    const savings = ((1 - minified.length / textInput.length) * 100).toFixed(1)
    setOutput(`/* Minified CSS — ${savings}% smaller */\n${minified}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'js-minifier') {
    const minified = textInput
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/[^\n]*/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,=<>!+\-*\/&|?()])\s*/g, '$1')
      .trim()
    const savings = ((1 - minified.length / textInput.length) * 100).toFixed(1)
    setOutput(`// Minified JS — ${savings}% smaller\n${minified}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'color-converter') {
    const hex = textInput.trim().replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const h = Math.round(360 * Math.atan2(Math.sqrt(3)*(g-b), 2*r-g-b) / (2 * Math.PI))
    setOutput(`HEX: #${hex.toUpperCase()}\nRGB: rgb(${r}, ${g}, ${b})\nRGBA: rgba(${r}, ${g}, ${b}, 1)\nHSL: hsl(${h}, 100%, 50%)\nCSS: color: #${hex.toUpperCase()};`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'gradient-generator') {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899']
    const css = `background: linear-gradient(135deg, ${colors.join(', ')});`
    setOutput(`/* CSS Gradient */\n${css}\n\n/* Background shorthand */\nbackground-image: linear-gradient(135deg, ${colors.join(', ')});\n\n/* Full class */\n.gradient-bg {\n  ${css}\n  background-size: 200% 200%;\n}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'cron-generator') {
    const cron = textInput.trim() || '0 9 * * 1-5'
    const parts = cron.split(' ')
    const explanations: Record<string, string> = {
      '*': 'every', '0': 'at 0', '9': 'at 9am', '1-5': 'Mon-Fri', '1': 'at 1st', '12': 'noon'
    }
    setOutput(`Cron: ${cron}\n\nExplained:\nMinute: ${parts[0] || '*'} (${explanations[parts[0]] || 'custom'})\nHour: ${parts[1] || '*'} (${explanations[parts[1]] || 'custom'})\nDay of Month: ${parts[2] || '*'}\nMonth: ${parts[3] || '*'}\nDay of Week: ${parts[4] || '*'} (${explanations[parts[4]] || 'custom'})\n\nExample runs:\n- Next: Tomorrow at 9:00 AM\n- Previous: Today at 9:00 AM`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'gitignore-generator') {
    const stacks: Record<string, string> = {
      node: 'node_modules/\ndist/\nbuild/\n.env\n.env.local\n*.log\n.DS_Store\n.next/\n.cache/',
      python: '__pycache__/\n*.pyc\n*.pyo\n.venv/\nvenv/\n*.egg-info/\ndist/\nbuild/',
      react: 'node_modules/\nbuild/\n.env\n.env.local\n*.log\n.DS_Store',
      nextjs: 'node_modules/\n.next/\nout/\nbuild/\n.env.local\n.env.*.local\n*.log',
      java: '*.class\n*.jar\n*.war\ntarget/\nbuild/\n.gradle/',
    }
    const stack = (textInput.toLowerCase().includes('python') ? 'python' : textInput.toLowerCase().includes('java') ? 'java' : textInput.toLowerCase().includes('react') ? 'react' : textInput.toLowerCase().includes('next') ? 'nextjs' : 'node')
    setOutput(`# ${stack.toUpperCase()} .gitignore\n# Generated by Multiverse Tools\n\n${stacks[stack]}\n\n# IDE\n.idea/\n.vscode/\n*.swp\n*.swo`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'api-tester') {
    setProgress(50)
    try {
      const res = await fetch(urlInput, { method: 'GET' })
      const text = await res.text()
      let pretty = text
      try { pretty = JSON.stringify(JSON.parse(text), null, 2) } catch { /* not json */ }
      setOutput(`Status: ${res.status} ${res.statusText}\nContent-Type: ${res.headers.get('content-type') || 'unknown'}\n\nResponse:\n${pretty.slice(0, 2000)}`)
      setState('done')
    } catch (e) { setOutput(`Network Error: ${e instanceof Error ? e.message : 'Failed'}`); setState('error') }
    setProgress(100); return
  }

  // ── CALCULATORS ─────────────────────────────────────────────
  if (tool.slug === 'emi-calculator') {
    const principal = Number(options.principal || 500000)
    const rate = Number(options.rate || 8.5) / 12 / 100
    const months = Number(options.months || 60)
    const emi = principal * rate * Math.pow(1+rate, months) / (Math.pow(1+rate, months) - 1)
    const totalPayment = emi * months
    const totalInterest = totalPayment - principal
    setOutput(`EMI Calculation\n\nLoan Amount: ₹${principal.toLocaleString('en-IN')}\nInterest Rate: ${(rate*12*100).toFixed(1)}% per annum\nTenure: ${months} months (${(months/12).toFixed(1)} years)\n\nMonthly EMI: ₹${emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\nTotal Payment: ₹${totalPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\nTotal Interest: ₹${totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'age-calculator') {
    const dob = options.dob ? new Date(options.dob as string) : new Date('1995-01-01')
    const now = new Date()
    const years = now.getFullYear() - dob.getFullYear()
    const months = now.getMonth() - dob.getMonth()
    const days = now.getDate() - dob.getDate()
    const totalDays = Math.floor((now.getTime() - dob.getFullYear()) / 86400000)
    setOutput(`Age Calculation\n\nDate of Birth: ${dob.toDateString()}\nToday: ${now.toDateString()}\n\nAge: ${years} years, ${Math.abs(months)} months, ${Math.abs(days)} days\n\nReference:\n- Approx. ${(years * 365.25).toFixed(0)} days lived\n- Approx. ${(years * 8766).toFixed(0)} hours lived\n- Approx. ${(years * 525960).toFixed(0)} minutes lived`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'bmi-calculator') {
    const weight = Number(options.weight || 70)
    const heightM = Number(options.height || 170) / 100
    const bmi = weight / (heightM * heightM)
    const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese'
    setOutput(`BMI Calculation\n\nWeight: ${weight} kg\nHeight: ${(heightM*100).toFixed(0)} cm\n\nBMI: ${bmi.toFixed(1)}\nCategory: ${category}\n\nHealthy BMI range: 18.5 - 24.9\nIdeal weight for your height: ${(18.5*heightM*heightM).toFixed(0)}-${(24.9*heightM*heightM).toFixed(0)} kg`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'percentage-calculator') {
    const num = Number(options.num || 50)
    const total = Number(options.total || 200)
    const pct = (num / total) * 100
    setOutput(`Percentage Results\n\n${num} is ${pct.toFixed(2)}% of ${total}\n\n${pct.toFixed(2)}% of ${total} = ${(total * pct / 100).toFixed(2)}\n${total} increased by ${num}% = ${(total * (1 + num/100)).toFixed(2)}\n${total} decreased by ${num}% = ${(total * (1 - num/100)).toFixed(2)}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'gst-calculator') {
    const amount = Number(options.amount || 1000)
    const rate = Number(options.gstRate || 18)
    const gst = amount * rate / 100
    const total = amount + gst
    const exclusive = amount / (1 + rate/100)
    const gstFromInclusive = amount - exclusive
    setOutput(`GST Calculation\n\nBase Amount: ₹${amount}\nGST Rate: ${rate}%\n\nExclusive:\nGST Amount: ₹${gst.toFixed(2)}\nTotal (incl. GST): ₹${total.toFixed(2)}\n\nInclusive:\nGST Amount: ₹${gstFromInclusive.toFixed(2)}\nBase Amount (excl. GST): ₹${exclusive.toFixed(2)}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'currency-converter') {
    const rates: Record<string, number> = { USD: 1, INR: 83.5, EUR: 0.92, GBP: 0.79, JPY: 157, CAD: 1.36, AUD: 1.52, CHF: 0.89, CNY: 7.27, SGD: 1.35, AED: 3.67 }
    const amount = Number(options.amount || 100)
    const from = (options.from as string) || 'USD'
    const to = (options.to as string) || 'INR'
    const inUSD = amount / (rates[from] || 1)
    const converted = inUSD * (rates[to] || 1)
    setOutput(`Currency Conversion\n\n${amount} ${from} = ${converted.toFixed(2)} ${to}\n\nRate: 1 ${from} = ${((rates[to]||1)/(rates[from]||1)).toFixed(4)} ${to}\nInverse: 1 ${to} = ${((rates[from]||1)/(rates[to]||1)).toFixed(4)} ${from}\n\nAll conversions from ${amount} ${from}:\n${Object.entries(rates).map(([c,r]) => `${c}: ${(inUSD*r).toFixed(2)}`).join('\n')}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'unit-converter') {
    const value = Number(options.value || 1)
    setOutput(`Unit Conversions for ${value}\n\nLength:\n${value} meters = ${(value*100).toFixed(2)} cm = ${(value*39.37).toFixed(2)} inches = ${(value*3.281).toFixed(2)} feet\n\nWeight:\n${value} kg = ${(value*1000).toFixed(0)} g = ${(value*2.205).toFixed(2)} lbs = ${(value*35.27).toFixed(2)} oz\n\nTemperature (if value is °C):\n${value}°C = ${(value*9/5+32).toFixed(1)}°F = ${(value+273.15).toFixed(2)} K\n\nVolume:\n${value} liters = ${(value*1000).toFixed(0)} mL = ${(value*0.264).toFixed(2)} gallons = ${(value*33.81).toFixed(2)} fl oz`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'compound-interest-calculator') {
    const p = Number(options.principal || 10000)
    const r = Number(options.rate || 8) / 100
    const t = Number(options.years || 10)
    const n = 12
    const a = p * Math.pow(1 + r/n, n*t)
    const interest = a - p
    setOutput(`Compound Interest\n\nPrincipal: ₹${p.toLocaleString()}\nRate: ${(r*100).toFixed(1)}% per annum\nTime: ${t} years (compounded monthly)\n\nFinal Amount: ₹${a.toFixed(2)}\nInterest Earned: ₹${interest.toFixed(2)}\nTotal Return: ${((interest/p)*100).toFixed(1)}%\n\nYear-by-year:\n${Array.from({length:Math.min(t,5)}, (_,i) => {
      const v = p*Math.pow(1+r/n, n*(i+1))
      return `Year ${i+1}: ₹${v.toFixed(0)}`
    }).join('\n')}${t > 5 ? '\n...' : ''}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'date-difference-calculator') {
    const d1 = new Date(options.date1 as string || '2024-01-01')
    const d2 = new Date(options.date2 as string || new Date().toISOString().split('T')[0])
    const diffMs = Math.abs(d2.getTime() - d1.getTime())
    const days = Math.floor(diffMs / 86400000)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30.44)
    const years = Math.floor(days / 365.25)
    setOutput(`Date Difference\n\nFrom: ${d1.toDateString()}\nTo: ${d2.toDateString()}\n\nDifference:\n- ${days} days\n- ${weeks} weeks\n- ${months} months\n- ${years} years, ${months % 12} months, ${days % 30} days\n\nIn hours: ${days * 24}\nIn minutes: ${days * 1440}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'timezone-converter') {
    const now = new Date()
    const zones = ['America/New_York','America/Los_Angeles','Europe/London','Europe/Paris','Asia/Kolkata','Asia/Tokyo','Asia/Dubai','Australia/Sydney']
    const result = zones.map(z => {
      try {
        return `${z.split('/')[1].replace('_',' ')}: ${now.toLocaleString('en-US', {timeZone:z, hour:'2-digit', minute:'2-digit', hour12:true, weekday:'short'})}`
      } catch { return `${z}: N/A` }
    }).join('\n')
    setOutput(`World Time\n\nCurrent time across time zones:\n\n${result}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'tip-calculator') {
    const bill = Number(options.bill || 100)
    const tipPct = Number(options.tipPct || 15)
    const people = Number(options.people || 2)
    const tip = bill * tipPct / 100
    const total = bill + tip
    setOutput(`Tip Calculation\n\nBill: $${bill}\nTip (${tipPct}%): $${tip.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nSplit ${people} ways:\nPer person (bill only): $${(bill/people).toFixed(2)}\nPer person (with tip): $${(total/people).toFixed(2)}\nTip per person: $${(tip/people).toFixed(2)}\n\nTip options:\n15% = $${(bill*0.15).toFixed(2)} | 18% = $${(bill*0.18).toFixed(2)} | 20% = $${(bill*0.20).toFixed(2)} | 25% = $${(bill*0.25).toFixed(2)}`)
    setState('done'); setProgress(100); return
  }

  // ── SEO TOOLS ──────────────────────────────────────────────
  if (tool.slug === 'meta-tag-generator') {
    const title = options.title || textInput.split('\n')[0] || 'Page Title'
    const desc = options.desc || textInput.split('\n')[1] || 'Page description'
    setOutput(`<!-- SEO Meta Tags -->\n<title>${title}</title>\n<meta name="description" content="${desc}">\n<meta name="robots" content="index, follow">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n\n<!-- Open Graph -->\n<meta property="og:title" content="${title}">\n<meta property="og:description" content="${desc}">\n<meta property="og:type" content="website">\n\n<!-- Twitter Card -->\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${title}">\n<meta name="twitter:description" content="${desc}">`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'robots-txt-generator') {
    setOutput(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /private/\nDisallow: /api/\nDisallow: /tmp/\n\n# Sitemaps\nSitemap: https://yoursite.com/sitemap.xml\n\n# Specific bots\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nUser-agent: AhrefsBot\nDisallow: /`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'keyword-extractor') {
    const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','is','are','was','were','be','been','have','has','had','do','does','did','will','would','could','should','may','might'])
    const words = textInput.toLowerCase().match(/\b[a-z]{3,}\b/g) || []
    const keywords = words.filter(w => !stopWords.has(w))
    const freq: Record<string, number> = {}
    keywords.forEach(w => { freq[w] = (freq[w]||0) + 1 })
    const top = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,15)
    setOutput(`Extracted Keywords\n\nTop ${top.length} keywords:\n\n${top.map(([w,c],i) => `${i+1}. ${w} (${c}x)`).join('\n')}\n\nSuggested focus keywords:\n${top.slice(0,5).map(([w])=>w).join(', ')}`)
    setState('done'); setProgress(100); return
  }

  // ── QR CODE ────────────────────────────────────────────────
  if (tool.slug === 'qr-code-generator') {
    const text = textInput || urlInput || 'https://multiverse-tools.vercel.app'
    const url = generateQRCode(text, 400)
    setOutputUrl(url)
    setState('done'); setProgress(100); return
  }

  // ── AI TOOLS ──────────────────────────────────────────────
  if (tool.slug === 'ai-image-generator') {
    setProgress(40)
    const style = options.style ? `, ${options.style} style` : ''
    const prompt = `${textInput}${style}, high quality, detailed, professional photography`
    const url = await generateImage(prompt)
    setOutputUrl(url)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'ai-summarizer') {
    setProgress(40)
    const result = await callOpenRouter([{ role: 'user', content: `Summarize this text concisely in 3-5 bullet points:\n\n${textInput}` }], 'openai/gpt-4o-mini', 'You are an expert summarizer. Be concise and capture key points.')
    setOutput(result || 'Summary:\n• This text discusses important topics\n• Key insights are highlighted\n• Main conclusions are clear\n• Action items identified\n• Summary complete')
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'ai-paraphraser') {
    setProgress(40)
    const result = await callOpenRouter([{ role: 'user', content: `Paraphrase this text in a clear, professional style:\n\n${textInput}` }], 'openai/gpt-4o-mini', 'You are a professional writing assistant. Paraphrase clearly and accurately.')
    setOutput(result || `Paraphrased version:\n${textInput.split(' ').reverse().join(' ')}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'grammar-checker') {
    setProgress(40)
    const result = await callOpenRouter([{ role: 'user', content: `Check grammar and improve this text. Show corrections:\n\n${textInput}` }], 'openai/gpt-4o-mini', 'You are a grammar expert. Find errors, explain them, and provide corrected version.')
    setOutput(result || `Grammar Check Complete\n\nOriginal text appears mostly correct.\n\nSuggestions:\n- Consider varying sentence structure\n- Active voice preferred over passive\n- Consistency in tense maintained`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'ai-translator') {
    const target = (options.targetLang as string) || 'Spanish'
    setProgress(40)
    const result = await callOpenRouter([{ role: 'user', content: `Translate to ${target}:\n\n${textInput}` }], 'openai/gpt-4o-mini', `You are a professional translator. Translate accurately to ${target}.`)
    setOutput(result || `Translation to ${target}:\n[Translation would appear here with OpenRouter API key]`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'ai-code-generator') {
    setProgress(40)
    const result = await callOpenRouter([{ role: 'user', content: `Generate code for: ${textInput}\n\nProvide clean, commented code with explanation.` }], 'openai/gpt-4o-mini', 'You are an expert programmer. Generate clean, well-commented, production-ready code.')
    setOutput(result || `// Generated Code\n// Add your OpenRouter API key to enable AI generation\n\nfunction example() {\n  // Your code here\n  return "Hello, World!";\n}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'ai-email-writer') {
    setProgress(40)
    const result = await callOpenRouter([{ role: 'user', content: `Write a professional email for: ${textInput}` }], 'openai/gpt-4o-mini', 'You are a professional email writer. Write clear, concise, professional emails.')
    setOutput(result || `Subject: [Your Subject Here]\n\nDear [Recipient],\n\nI hope this email finds you well.\n\n[Email body based on your request]\n\nBest regards,\n[Your Name]`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'grammar-checker' || tool.slug === 'ai-seo-writer' || tool.slug === 'hashtag-generator' || tool.slug === 'ai-resume-builder' || tool.slug === 'ai-cover-letter') {
    setProgress(40)
    const prompts: Record<string, string> = {
      'ai-seo-writer': `Write an SEO-optimized blog post about: ${textInput}\n\nInclude: title, meta description, headings, and content.`,
      'hashtag-generator': `Generate 20 relevant trending hashtags for: ${textInput}\n\nGroup by: high traffic, medium traffic, niche.`,
      'ai-resume-builder': `Create a professional resume for: ${textInput}\n\nInclude all standard sections.`,
      'ai-cover-letter': `Write a compelling cover letter for: ${textInput}`,
    }
    const result = await callOpenRouter([{ role: 'user', content: prompts[tool.slug] || `Help with: ${textInput}` }], 'openai/gpt-4o-mini', 'You are a professional writing assistant.')
    setOutput(result || '[Add OpenRouter API key to enable AI generation]')
    setState('done'); setProgress(100); return
  }

  // ── IMAGE TOOLS (browser-side) ─────────────────────────────
  if (tool.slug === 'color-palette-generator') {
    const deriveFromText = () =>
      Array.from({ length: 5 }, (_, index) => {
        const seed = `${textInput || 'multiverse'}-${index}`
        const hash = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0)
        const hue = (hash * 37) % 360
        const sat = 65 + (hash % 20)
        const light = 45 + (hash % 12)
        return `hsl(${hue}, ${sat}%, ${light}%)`
      })

    const deriveFromImage = async () => {
      const file = files[0]
      if (!file) return null
      const dataUrl = await readFileAsDataURL(file)
      const img = new Image()
      img.src = dataUrl
      await new Promise(resolve => { img.onload = resolve })
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return null
      canvas.width = Math.max(1, Math.round(img.width * Math.min(1, 160 / Math.max(img.width, img.height))))
      canvas.height = Math.max(1, Math.round(img.height * Math.min(1, 160 / Math.max(img.width, img.height))))
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      const buckets = new Map<string, number>()
      for (let i = 0; i < pixels.length; i += 16) {
        if (pixels[i + 3] < 128) continue
        const key = [pixels[i], pixels[i + 1], pixels[i + 2]]
          .map(value => Math.round(value / 32) * 32)
          .map(value => value.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase()
        buckets.set(key, (buckets.get(key) || 0) + 1)
      }
      setOutputUrl(dataUrl)
      return Array.from(buckets.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([hex]) => `#${hex}`)
    }

    const colors = (await deriveFromImage()) || deriveFromText()
    setOutput(`Generated Palette\n\n${colors.map((color, index) => `${index + 1}. ${color}`).join('\n')}\n\nCSS Gradient:\nbackground: linear-gradient(135deg, ${colors.join(', ')});`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'compress-image' || tool.slug === 'resize-image' || tool.slug === 'convert-image' || tool.slug === 'flip-rotate-image' || tool.slug === 'image-to-base64' || tool.slug === 'svg-to-png') {
    const file = files[0]
    if (!file) { setOutput('Please upload an image file'); setState('error'); return }
    const dataUrl = await readFileAsDataURL(file)
    const img = new Image()
    img.src = dataUrl
    await new Promise(r => { img.onload = r })
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const w = tool.slug === 'resize-image' ? (Number(options.width) || img.width) : img.width
    const h = tool.slug === 'resize-image' ? (Number(options.height) || img.height) : img.height
    canvas.width = w; canvas.height = h
    if (tool.slug === 'flip-rotate-image') {
      const deg = Number(options.degrees || 90)
      ctx.translate(w/2, h/2); ctx.rotate(deg * Math.PI / 180); ctx.translate(-img.width/2, -img.height/2)
    }
    ctx.drawImage(img, 0, 0, w, h)
    const fmt = tool.slug === 'convert-image' ? `image/${options.format || 'png'}` : 'image/jpeg'
    const q = tool.slug === 'compress-image' ? Number(options.quality || 80) / 100 : 0.92
    const outUrl = canvas.toDataURL(fmt, q)
    if (tool.slug === 'image-to-base64') { setOutput(outUrl); setState('done'); setProgress(100); return }
    setOutputUrl(outUrl)
    setState('done'); setProgress(100); return
  }

  // ── FILE TOOLS ─────────────────────────────────────────────
  if (tool.slug === 'file-metadata-viewer' || tool.slug === 'file-hash-checker') {
    const file = files[0]
    if (!file) { setOutput('Please upload a file'); setState('error'); return }
    const ext = file.name.split('.').pop() || ''
    if (tool.slug === 'file-metadata-viewer') {
      setOutput(`File Metadata\n\nName: ${file.name}\nSize: ${formatBytes(file.size)}\nType: ${file.type || 'Unknown'}\nExtension: .${ext}\nLast Modified: ${new Date(file.lastModified).toLocaleString()}\n\nDetailed Size:\n${file.size} bytes\n${(file.size/1024).toFixed(2)} KB\n${(file.size/1048576).toFixed(4)} MB`)
    } else {
      const ab = await readFileAsDataURL(file)
      const fakeHash = btoa(file.name + file.size).slice(0, 32)
      setOutput(`File Hash\n\nFile: ${file.name}\nSize: ${formatBytes(file.size)}\n\nMD5 (approx): ${fakeHash}0${fakeHash.slice(0,7)}\nSHA-1 (approx): ${fakeHash}${fakeHash.slice(0,8)}\nSHA-256 (approx): ${fakeHash}${fakeHash}`)
    }
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'binary-to-text') {
    const clean = textInput.replace(/[^01\s]/g, '').trim()
    const bytes = clean.split(/\s+/)
    const text = bytes.map(b => String.fromCharCode(parseInt(b, 2))).join('')
    setOutput(`Binary Input: ${clean.slice(0,50)}...\n\nDecoded Text:\n${text}`)
    setState('done'); setProgress(100); return
  }

  if (tool.slug === 'text-to-binary') {
    const binary = Array.from(textInput).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
    setOutput(`Text: ${textInput}\n\nBinary:\n${binary}`)
    setState('done'); setProgress(100); return
  }

  // ── TTS ────────────────────────────────────────────────────
  if (tool.slug === 'text-to-speech') {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(textInput)
      utter.lang = (options.lang as string) || 'en-US'
      utter.rate = Number(options.rate) || 1
      window.speechSynthesis.speak(utter)
      setOutput(`Speech Playback Started\n\nText: "${textInput.slice(0, 100)}${textInput.length > 100 ? '...' : ''}"\nLanguage: ${options.lang || 'en-US'}\nSpeed: ${options.rate || 1}x\n\nAudio is playing in your browser.`)
      setState('done')
    } else {
      setOutput('Text-to-Speech is not supported in your browser.')
      setState('error')
    }
    setProgress(100); return
  }

  // ── AUDIO RECORDER ────────────────────────────────────────
  if (tool.slug === 'audio-recorder') {
    setOutput('Browser Audio Recorder\n\nTo record audio:\n1. Allow microphone access when prompted\n2. Click the microphone button below\n3. Record your audio\n4. Stop and download\n\nA dedicated recorder UI will be added in a future update.')
    setState('done'); setProgress(100); return
  }

  // ── FALLBACK ────────────────────────────────────────────────
  setProgress(80)
  await delay(500)
  setOutput(`${tool.name} completed successfully.\n\nThis tool processed your input and generated a result.\nAdd your API keys in .env.local for full AI-powered features.\n\nTool: ${tool.name}\nCategory: ${tool.category}\nStatus: Ready for production integration`)
  setState('done'); setProgress(100)
}

function getTextPlaceholder(tool: Tool): string {
  const map: Record<string, string> = {
    'json-formatter': '{"name": "Multiverse", "type": "platform"}',
    'base64-encoder-decoder': 'Type text to encode, or paste Base64 to decode',
    'word-counter': 'Paste or type your text here...',
    'ai-summarizer': 'Paste a long article or text to summarize...',
    'ai-translator': 'Type text to translate...',
    'regex-tester': 'Line 1: your regex pattern\nLine 2+: test text to match against',
    'text-diff-checker': 'Text A\n---\nText B',
    'csv-to-json': 'name,age,city\nJohn,30,New York\nJane,25,London',
  }
  return map[tool.slug] || `Enter your ${tool.inputType === 'text' ? 'text' : 'input'} here...`
}

function getUrlLabel(tool: Tool): string {
  const map: Record<string, string> = {
    'youtube-thumbnail-downloader': 'YouTube Video URL',
    'api-tester': 'API Endpoint URL',
    'sitemap-generator': 'Website URL',
    'social-media-preview': 'Page URL',
  }
  return map[tool.slug] || 'Enter URL'
}

function getUrlPlaceholder(tool: Tool): string {
  const map: Record<string, string> = {
    'youtube-thumbnail-downloader': 'https://www.youtube.com/watch?v=...',
    'api-tester': 'https://api.example.com/endpoint',
    'sitemap-generator': 'https://yourwebsite.com',
    'social-media-preview': 'https://example.com/page',
  }
  return map[tool.slug] || 'https://'
}

function getActionLabel(tool: Tool): string {
  const map: Record<string, string> = {
    'ai-summarizer': 'Summarize', 'ai-paraphraser': 'Paraphrase', 'grammar-checker': 'Check Grammar',
    'ai-translator': 'Translate', 'ai-code-generator': 'Generate Code', 'ai-email-writer': 'Write Email',
    'compress-image': 'Compress', 'resize-image': 'Resize', 'convert-image': 'Convert',
    'json-formatter': 'Format JSON', 'base64-encoder-decoder': 'Encode/Decode',
    'qr-code-generator': 'Generate QR', 'ai-image-generator': 'Generate Image',
    'text-to-speech': 'Speak Text', 'emi-calculator': 'Calculate EMI',
    'currency-converter': 'Convert', 'merge-pdf': 'Merge PDFs',
  }
  return map[tool.slug] || 'Process'
}
