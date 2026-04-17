'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  Binary,
  Braces,
  Clock,
  Code2,
  Copy,
  GitBranch,
  Globe,
  Hash,
  Key,
  Link as LinkIcon,
  Minimize,
  Palette,
  RefreshCw,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import { cn, copyToClipboard } from '@/lib/utils'

const DEV_TOOLS = [
  { id: 'json-formatter', icon: Braces, label: 'JSON Formatter', href: '/tools/dev/json-formatter', tone: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300', tag: 'hot' },
  { id: 'base64', icon: Binary, label: 'Base64 Encode/Decode', href: '/tools/dev/base64-encoder-decoder', tone: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300', tag: '' },
  { id: 'url-encoder', icon: LinkIcon, label: 'URL Encoder', href: '/tools/dev/url-encoder-decoder', tone: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300', tag: '' },
  { id: 'jwt-decoder', icon: Key, label: 'JWT Decoder', href: '/tools/dev/jwt-decoder', tone: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300', tag: 'trending' },
  { id: 'uuid-generator', icon: Hash, label: 'UUID Generator', href: '/tools/dev/uuid-generator', tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300', tag: '' },
  { id: 'hash-generator', icon: Shield, label: 'Hash Generator', href: '/tools/dev/hash-generator', tone: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200', tag: '' },
  { id: 'regex-tester', icon: Sparkles, label: 'Regex Tester', href: '/tools/dev/regex-tester', tone: 'bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300', tag: 'trending' },
  { id: 'css-minifier', icon: Minimize, label: 'CSS Minifier', href: '/tools/dev/css-minifier', tone: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300', tag: '' },
  { id: 'js-minifier', icon: Zap, label: 'JS Minifier', href: '/tools/dev/js-minifier', tone: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300', tag: '' },
  { id: 'color-converter', icon: Palette, label: 'Color Converter', href: '/tools/dev/color-converter', tone: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300', tag: 'new' },
  { id: 'gradient-gen', icon: Palette, label: 'Gradient Generator', href: '/tools/dev/gradient-generator', tone: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300', tag: 'new' },
  { id: 'cron-gen', icon: Clock, label: 'Cron Generator', href: '/tools/dev/cron-generator', tone: 'bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300', tag: 'beta' },
  { id: 'gitignore', icon: GitBranch, label: '.gitignore Generator', href: '/tools/dev/gitignore-generator', tone: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200', tag: 'new' },
  { id: 'api-tester', icon: Globe, label: 'API Tester', href: '/tools/dev/api-tester', tone: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300', tag: 'beta' },
  { id: 'css-effects-library', icon: Sparkles, label: 'UI Universe', href: '/ui', tone: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200', tag: 'new' },
]

function JSONFormatter() {
  const [input, setInput] = useState('{"name":"Multiverse","version":"1.0","tools":150,"free":true}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  function format() {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (errorValue) {
      setError((errorValue as Error).message)
      setOutput('')
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (errorValue) {
      setError((errorValue as Error).message)
      setOutput('')
    }
  }

  return (
    <div className="premium-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-base font-bold">
          <Braces className="h-4 w-4 text-amber-600 dark:text-amber-300" />
          JSON Formatter
        </h3>
        <div className="flex gap-2">
          <button onClick={format} className="btn-primary px-3 py-2 text-xs">Beautify</button>
          <button onClick={minify} className="btn-secondary px-3 py-2 text-xs">Minify</button>
        </div>
      </div>
      <textarea
        value={input}
        onChange={event => setInput(event.target.value)}
        rows={5}
        className="premium-textarea min-h-[140px] font-mono text-xs"
      />
      {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400">Invalid JSON: {error}</p>}
      {output && (
        <div className="relative mt-3">
          <pre className="custom-scrollbar max-h-44 overflow-auto rounded-2xl border border-border bg-slate-50 p-3 text-xs font-mono dark:bg-slate-950/60">
            {output}
          </pre>
          <button
            onClick={() => {
              copyToClipboard(output)
              toast.success('Copied')
            }}
            className="absolute right-2 top-2 rounded-lg border border-border bg-white p-1.5 transition-colors hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

function Base64Tool() {
  const [input, setInput] = useState('Hello, Multiverse!')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  let output = ''
  try {
    output =
      mode === 'encode'
        ? btoa(unescape(encodeURIComponent(input)))
        : decodeURIComponent(escape(atob(input)))
  } catch {
    output = 'Invalid input'
  }

  return (
    <div className="premium-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-base font-bold">
          <Binary className="h-4 w-4 text-blue-600 dark:text-blue-300" />
          Base64
        </h3>
        <div className="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {(['encode', 'decode'] as const).map(item => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-colors',
                mode === item ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100' : 'text-muted-foreground'
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={input}
        onChange={event => setInput(event.target.value)}
        rows={3}
        className="premium-textarea min-h-[110px] font-mono text-xs"
      />

      <div className="relative mt-3 rounded-2xl border border-border bg-slate-50 px-3 py-3 text-xs font-mono break-all dark:bg-slate-950/60">
        {output}
        <button
          onClick={() => {
            copyToClipboard(output)
            toast.success('Copied')
          }}
          className="absolute right-2 top-2 rounded-lg border border-border bg-white p-1.5 transition-colors hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([])

  function generate() {
    const next = Array.from({ length: 5 }, () =>
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
        const random = (Math.random() * 16) | 0
        return (char === 'x' ? random : (random & 0x3) | 0x8).toString(16)
      })
    )
    setUuids(next)
  }

  return (
    <div className="premium-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-base font-bold">
          <Hash className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
          UUID Generator
        </h3>
        <button onClick={generate} className="btn-primary gap-1.5 px-3 py-2 text-xs">
          <RefreshCw className="h-3 w-3" />
          Generate
        </button>
      </div>

      {uuids.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-muted-foreground dark:border-slate-800 dark:bg-slate-950/60">
          Generate a fresh set of UUID v4 values.
        </div>
      ) : (
        <div className="space-y-2">
          {uuids.map(uuid => (
            <div
              key={uuid}
              className="flex items-center justify-between rounded-2xl border border-border bg-slate-50 px-3 py-2 dark:bg-slate-950/60"
            >
              <code className="text-xs">{uuid}</code>
              <button
                onClick={() => {
                  copyToClipboard(uuid)
                  toast.success('Copied')
                }}
                className="ml-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DevClient() {
  return (
    <div className="min-h-screen premium-shell">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <Code2 className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              Dev Universe
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
              Developer Tools
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Format data, inspect tokens, generate IDs, and use the most practical utilities for daily development work.
            </p>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {DEV_TOOLS.map(tool => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="premium-card group flex flex-col gap-3 p-4 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-2xl', tool.tone)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    <p className="text-sm font-semibold leading-tight text-slate-950 dark:text-slate-50">{tool.label}</p>
                    {tool.tag === 'hot' && <span className="tag-hot text-[10px]">Hot</span>}
                    {tool.tag === 'beta' && <span className="tag-beta text-[10px]">Beta</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-10">
          <div className="mb-4">
            <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50">Quick Dev Tools</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fast inline utilities for common development tasks.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <JSONFormatter />
            <Base64Tool />
            <UUIDGenerator />
          </div>
        </div>
      </section>
    </div>
  )
}
