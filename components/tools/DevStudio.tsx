'use client'

import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Code2,
  Copy,
  Download,
  Eye,
  Globe2,
  Loader2,
  Play,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { cn, downloadBlob } from '@/lib/utils'
import { handleDevTool } from './processors/text-dev'
import type { FileProcessResult } from './processors/types'

const DEV_COPY = {
  'api-tester': { eyebrow: 'Request workspace', title: 'API Tester', summary: 'Send a request, inspect the response, and keep headers, method, and payload in one cleaner workspace.', badges: ['Request builder', 'Response stats', 'Headers and body'], actionLabel: 'Send request' },
  'base64-encoder-decoder': { eyebrow: 'Encoding utility', title: 'Base64 Tool', summary: 'Encode plain text or decode Base64 instantly inside the same focused workspace.', badges: ['Encode', 'Decode', 'Instant output'], actionLabel: 'Process Base64' },
  'code-formatter': { eyebrow: 'Code cleanup', title: 'Code Formatter', summary: 'Reflow raw code into a cleaner readable block for quick review and copy.', badges: ['Readable output', 'Quick cleanup', 'Copy ready'], actionLabel: 'Format code' },
  'color-converter': { eyebrow: 'Color system', title: 'Color Converter', summary: 'Convert a single color between HEX, RGB, HSL, and quick CSS output.', badges: ['HEX, RGB, HSL', 'CSS ready', 'Fast convert'], actionLabel: 'Convert color' },
  'css-minifier': { eyebrow: 'Asset optimization', title: 'CSS Minifier', summary: 'Reduce stylesheet size and keep the compressed output ready for production use.', badges: ['Minify CSS', 'Savings stats', 'Production ready'], actionLabel: 'Minify CSS' },
  'hash-generator': { eyebrow: 'Integrity utility', title: 'Hash Generator', summary: 'Generate common hashes quickly when you need verification or signing helpers.', badges: ['MD5 to SHA-512', 'Fast output', 'Copy ready'], actionLabel: 'Generate hashes' },
  'html-previewer': { eyebrow: 'Live render', title: 'HTML Previewer', summary: 'Preview markup in a clean render panel while keeping the raw source easy to edit.', badges: ['Live preview', 'Raw HTML', 'Quick checks'], actionLabel: 'Render preview' },
  'json-formatter': { eyebrow: 'Structured data', title: 'JSON Formatter', summary: 'Beautify, validate, and review JSON with cleaner output and structure stats.', badges: ['Validate JSON', 'Beautify output', 'Minified copy'], actionLabel: 'Format JSON' },
  'jwt-decoder': { eyebrow: 'Token inspector', title: 'JWT Decoder', summary: 'Inspect header and payload data quickly without leaving the current workspace.', badges: ['Payload view', 'Header view', 'Expiry insight'], actionLabel: 'Decode token' },
  'regex-tester': { eyebrow: 'Pattern debugger', title: 'Regex Tester', summary: 'Test your expression, review matches, and inspect highlight output in one place.', badges: ['Pattern + flags', 'Match list', 'Debug output'], actionLabel: 'Test regex' },
  'sql-formatter': { eyebrow: 'Query cleanup', title: 'SQL Formatter', summary: 'Reformat long SQL queries into cleaner blocks that are easier to scan and share.', badges: ['Readable query', 'Keyword formatting', 'Copy ready'], actionLabel: 'Format SQL' },
  'uuid-generator': { eyebrow: 'ID generator', title: 'UUID Generator', summary: 'Generate fresh UUID values in a compact utility flow with quick copy support.', badges: ['Multiple UUIDs', 'Instant output', 'Copy ready'], actionLabel: 'Generate UUIDs' },
  'css-gradient-generator': { eyebrow: 'Design utility', title: 'CSS Gradient Generator', summary: 'Create and preview beautiful CSS gradients with a live visual editor and copy-ready code.', badges: ['Linear & radial', 'Live preview', 'Copy CSS'], actionLabel: 'Generate gradient' },
  'html-to-markdown': { eyebrow: 'Format converter', title: 'HTML to Markdown', summary: 'Convert HTML markup into clean, readable Markdown for docs, README files, and notes.', badges: ['Clean output', 'Tags to Markdown', 'Copy ready'], actionLabel: 'Convert to Markdown' },
  'json-to-csv': { eyebrow: 'Data converter', title: 'JSON to CSV', summary: 'Transform JSON arrays into downloadable CSV spreadsheet format for analysis.', badges: ['Auto headers', 'CSV download', 'Fast convert'], actionLabel: 'Convert to CSV' },
  'cron-expression-generator': { eyebrow: 'Schedule builder', title: 'Cron Expression Generator', summary: 'Build cron expressions from plain English descriptions with instant preview.', badges: ['Visual builder', 'Schedule preview', 'Copy ready'], actionLabel: 'Generate cron' },
  'markdown-previewer': { eyebrow: 'Live render', title: 'Markdown Previewer', summary: 'Write Markdown and preview the rendered output in real time with syntax highlighting.', badges: ['Live preview', 'GitHub style', 'Export ready'], actionLabel: 'Render preview' },
} as const

type StudioResult = FileProcessResult

function formatCodeBlock(input: string) {
  const trimmed = input.trim()
  if (!trimmed) return 'Paste code to format.'
  try {
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return JSON.stringify(JSON.parse(trimmed), null, 2)
    }
  } catch {}
  return trimmed
    .replace(/;/g, ';\n')
    .replace(/{/g, '{\n')
    .replace(/}/g, '\n}\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function formatSql(input: string) {
  const keywords = ['select', 'from', 'where', 'group by', 'order by', 'limit', 'insert into', 'values', 'update', 'set', 'delete', 'join', 'left join', 'right join', 'inner join']
  let output = input.trim()
  for (const keyword of keywords) {
    const pattern = new RegExp(`\\b${keyword.replace(' ', '\\s+')}\\b`, 'gi')
    output = output.replace(pattern, match => `\n${match.toUpperCase()}`)
  }
  return output.replace(/\n{2,}/g, '\n').trim()
}

export default function DevStudio({ tool }: { tool: Tool }) {
  const copy = DEV_COPY[tool.slug as keyof typeof DEV_COPY]
  const [inputText, setInputText] = useState(tool.slug === 'api-tester' ? 'https://api.example.com/health' : '')
  const [result, setResult] = useState<StudioResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [apiMethod, setApiMethod] = useState('GET')
  const [apiHeaders, setApiHeaders] = useState('')
  const [apiBody, setApiBody] = useState('')
  const [regexPattern, setRegexPattern] = useState('\\b\\w+\\b')
  const [regexFlags, setRegexFlags] = useState('gi')
  const [htmlPreview, setHtmlPreview] = useState('')

  const sourceMetrics = useMemo(
    () => [
      { label: 'Lines', value: `${inputText.split('\n').length}` },
      { label: 'Chars', value: `${inputText.length}` },
      { label: 'Mode', value: tool.name },
    ],
    [inputText, tool.name]
  )

  function resetAll() {
    setInputText(tool.slug === 'api-tester' ? 'https://api.example.com/health' : '')
    setResult(null)
    setError('')
    setProgress(0)
    setApiMethod('GET')
    setApiHeaders('')
    setApiBody('')
    setRegexPattern('\\b\\w+\\b')
    setRegexFlags('gi')
    setHtmlPreview('')
  }

  function startProgress() {
    setProgress(8)
    const interval = window.setInterval(() => setProgress(current => (current < 88 ? current + Math.random() * 7 : current)), 320)
    return () => {
      window.clearInterval(interval)
      setProgress(100)
    }
  }

  async function handleProcess() {
    setError('')
    setResult(null)
    setHtmlPreview('')
    if (tool.slug !== 'uuid-generator' && !inputText.trim()) {
      setError('Enter your input before processing.')
      return
    }

    setLoading(true)
    const done = startProgress()
    try {
      if (tool.slug === 'code-formatter') {
        const output = formatCodeBlock(inputText)
        setResult({ output, metrics: [{ label: 'Mode', value: 'Readable' }, { label: 'Lines', value: `${output.split('\n').length}` }] })
        return
      }

      if (tool.slug === 'html-previewer') {
        const output = formatCodeBlock(inputText)
        setHtmlPreview(inputText)
        setResult({ output, metrics: [{ label: 'Preview', value: 'Live render' }, { label: 'Chars', value: `${inputText.length}` }] })
        return
      }

      if (tool.slug === 'sql-formatter') {
        const output = formatSql(inputText)
        setResult({ output, metrics: [{ label: 'Query lines', value: `${output.split('\n').length}` }] })
        return
      }

      if (tool.slug === 'css-gradient-generator') {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140', '#a18cd1', '#fbc2eb']
        const randomColors = Array.from({ length: 3 }, () => colors[Math.floor(Math.random() * colors.length)])
        const angle = Math.floor(Math.random() * 360)
        const linear = `background: linear-gradient(${angle}deg, ${randomColors[0]}, ${randomColors[1]});`
        const radial = `background: radial-gradient(circle, ${randomColors[0]}, ${randomColors[2]});`
        const multi = `background: linear-gradient(${angle}deg, ${randomColors.join(', ')});`
        const output = `/* Linear Gradient */\n${linear}\n\n/* Radial Gradient */\n${radial}\n\n/* Multi-stop Gradient */\n${multi}\n\n/* Tailwind-style class */\n/* from-[${randomColors[0]}] via-[${randomColors[1]}] to-[${randomColors[2]}] */`
        setResult({ output, metrics: [{ label: 'Variants', value: '3 gradients' }, { label: 'Angle', value: `${angle}°` }] })
        return
      }

      if (tool.slug === 'html-to-markdown') {
        let md = inputText
          .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
          .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
          .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
          .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n')
          .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
          .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
          .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
          .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
          .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
          .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
          .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
          .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n')
          .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
          .replace(/<hr[^>]*\/?>/gi, '---\n')
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
          .replace(/\n{3,}/g, '\n\n').trim()
        setResult({ output: md, metrics: [{ label: 'Lines', value: `${md.split('\n').length}` }, { label: 'Mode', value: 'HTML → Markdown' }] })
        return
      }

      if (tool.slug === 'json-to-csv') {
        try {
          const data = JSON.parse(inputText)
          const rows = Array.isArray(data) ? data : [data]
          if (rows.length === 0) throw new Error('Empty array')
          const headers = [...new Set(rows.flatMap(r => Object.keys(r)))]
          const csvLines = [headers.join(','), ...rows.map(r => headers.map(h => { const v = String(r[h] ?? ''); return v.includes(',') || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v }).join(','))]
          const output = csvLines.join('\n')
          setResult({ output, metrics: [{ label: 'Rows', value: `${rows.length}` }, { label: 'Columns', value: `${headers.length}` }] })
        } catch { setError('Invalid JSON input. Paste a JSON array like [{...}, {...}].') }
        return
      }

      if (tool.slug === 'cron-expression-generator') {
        const input = (inputText || 'every day at midnight').toLowerCase().trim()
        const cronMap: Record<string, string[]> = {
          'every minute': ['* * * * *', 'Runs every single minute'],
          'every hour': ['0 * * * *', 'Runs at the start of every hour'],
          'every day at midnight': ['0 0 * * *', 'Runs once per day at 00:00'],
          'every day at noon': ['0 12 * * *', 'Runs once per day at 12:00'],
          'every monday': ['0 0 * * 1', 'Runs every Monday at midnight'],
          'every friday at 5pm': ['0 17 * * 5', 'Runs every Friday at 17:00'],
          'every weekday': ['0 9 * * 1-5', 'Runs Mon-Fri at 09:00'],
          'every 5 minutes': ['*/5 * * * *', 'Runs every 5 minutes'],
          'every 15 minutes': ['*/15 * * * *', 'Runs every 15 minutes'],
          'every 30 minutes': ['*/30 * * * *', 'Runs every 30 minutes'],
          'first day of month': ['0 0 1 * *', 'Runs on the 1st of every month'],
          'every sunday': ['0 0 * * 0', 'Runs every Sunday at midnight'],
        }
        const entries = Object.entries(cronMap)
        const match = entries.find(([key]) => input.includes(key)) || entries[2]
        const allExamples = entries.map(([desc, [cron, explanation]]) => `${cron}  →  ${desc}  (${explanation})`).join('\n')
        const output = `Your cron expression:\n${match[1][0]}\n\nDescription: ${match[1][1]}\n\n── All Common Patterns ────────────────\n${allExamples}`
        setResult({ output, metrics: [{ label: 'Expression', value: match[1][0] }, { label: 'Schedule', value: match[1][1] }] })
        return
      }

      if (tool.slug === 'markdown-previewer') {
        let rendered = inputText
          .replace(/^### (.+)$/gm, '<h3>$1</h3>')
          .replace(/^## (.+)$/gm, '<h2>$1</h2>')
          .replace(/^# (.+)$/gm, '<h1>$1</h1>')
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>')
          .replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:0.9em">$1</code>')
          .replace(/^\- (.+)$/gm, '<li>$1</li>')
          .replace(/^---$/gm, '<hr>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#4f46e5">$1</a>')
          .replace(/\n\n/g, '<br><br>')
        setHtmlPreview(`<div style="font-family:system-ui;padding:20px;line-height:1.8;color:#1e293b">${rendered}</div>`)
        setResult({ output: inputText, metrics: [{ label: 'Preview', value: 'Live render' }, { label: 'Lines', value: `${inputText.split('\n').length}` }] })
        return
      }

      const next = await handleDevTool(tool.slug, inputText, {
        ...(tool.slug === 'regex-tester' ? { pattern: regexPattern, flags: regexFlags } : {}),
        ...(tool.slug === 'api-tester' ? { method: apiMethod, headers: apiHeaders.split('\n').filter(Boolean).reduce<Record<string, string>>((acc, line) => {
          const separator = line.indexOf(':')
          if (separator === -1) return acc
          const key = line.slice(0, separator).trim()
          const value = line.slice(separator + 1).trim()
          if (key) acc[key] = value
          return acc
        }, {}), body: apiBody } : {}),
      })

      if (next.apiError) {
        setError(next.apiError)
        return
      }

      setResult({
        output: next.output || '',
        metrics: [
          { label: 'Lines', value: `${(next.output || '').split('\n').length}` },
          { label: 'Chars', value: `${(next.output || '').length}` },
        ],
      })
    } catch (processError) {
      setError((processError as Error).message)
    } finally {
      done()
      setLoading(false)
    }
  }

  function handleDownload() {
    if (!result?.output) return
    downloadBlob(new Blob([result.output], { type: 'text/plain;charset=utf-8' }), `${tool.slug}.txt`)
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
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl dark:text-slate-50">{copy.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">{copy.summary}</p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_360px]">
        <div className="space-y-5">
          <section className="premium-panel p-5 sm:p-6">
            <textarea
              value={inputText}
              onChange={event => setInputText(event.target.value)}
              rows={12}
              className="min-h-[280px] w-full rounded-[28px] bg-white px-5 py-4 font-mono text-sm leading-7 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-300 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-slate-800"
              placeholder="Paste your input here."
            />

            {tool.slug === 'regex-tester' && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input value={regexPattern} onChange={event => setRegexPattern(event.target.value)} className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800" placeholder="Pattern" />
                <input value={regexFlags} onChange={event => setRegexFlags(event.target.value)} className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800" placeholder="Flags" />
              </div>
            )}

            {tool.slug === 'api-tester' && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-3">
                  {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(method => (
                    <button key={method} type="button" onClick={() => setApiMethod(method)} className={cn('rounded-full px-4 py-2 text-sm font-semibold transition', apiMethod === method ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700')}>{method}</button>
                  ))}
                </div>
                <textarea value={apiHeaders} onChange={event => setApiHeaders(event.target.value)} rows={4} className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800" placeholder="Content-Type: application/json" />
                <textarea value={apiBody} onChange={event => setApiBody(event.target.value)} rows={5} className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800" placeholder='{"hello":"world"}' />
              </div>
            )}
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="premium-card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="premium-kicker">Workspace options</p>
                  <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Tool context</h2>
                </div>
                <Sparkles className="h-5 w-5 text-indigo-500" />
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:text-slate-300 dark:ring-slate-800">
                {tool.slug === 'html-previewer' ? 'Rendered preview appears below the result panel.' : 'The processed output keeps a clean developer-friendly text layout for easy copy and review.'}
              </div>
            </div>

            <div className="premium-card p-5">
              <p className="premium-kicker">Source stats</p>
              <div className="mt-4 space-y-4">
                {sourceMetrics.map(metric => (
                  <div key={metric.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-50">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="premium-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Live process</h2>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">{Math.round(progress)}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Code2 className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{loading ? 'Processing input' : result ? 'Result ready' : 'Waiting for input'}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">Use the result card to copy, download, or review the processed output.</p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,#1f2560,#090c18_68%)] p-6 text-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.75)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white"><CheckCircle2 className="h-5 w-5" /></div>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight">{result ? 'Result ready' : 'Processed output appears here'}</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">{result?.output || 'Run the tool to populate the result panel.'}</p>
            {error && <div className="mt-5 rounded-2xl bg-rose-500/12 px-4 py-4 text-sm text-rose-100 ring-1 ring-rose-400/20">{error}</div>}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(result?.metrics || [{ label: 'Mode', value: tool.name }, { label: 'Status', value: 'Pending' }]).slice(0, 4).map(metric => (
                <div key={metric.label} className="rounded-2xl bg-white/6 px-4 py-4 ring-1 ring-white/10">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{metric.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={handleDownload} disabled={!result?.output} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"><Download className="h-4 w-4" />Download result</button>
              <button type="button" onClick={() => void navigator.clipboard.writeText(result?.output || '')} disabled={!result?.output} className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-50"><Copy className="h-4 w-4" />Copy output</button>
            </div>
          </section>
        </div>
      </div>

      {tool.slug === 'html-previewer' && (
        <section className="premium-card overflow-hidden">
          <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800/70">
            <p className="premium-kicker">Live preview</p>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Rendered HTML</h2>
          </div>
          <div className="p-5">
            {htmlPreview ? (
              <iframe title="HTML preview" srcDoc={htmlPreview} className="min-h-[320px] w-full rounded-[24px] bg-white ring-1 ring-slate-200" />
            ) : (
              <div className="flex min-h-[240px] items-center justify-center rounded-[24px] border border-dashed border-slate-200 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                Rendered HTML preview appears here
              </div>
            )}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={handleProcess} disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {copy.actionLabel}
        </button>
        <button type="button" onClick={resetAll} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
          <RefreshCw className="h-4 w-4" />
          Reset workspace
        </button>
      </div>
    </div>
  )
}
