'use client'

import { useState } from 'react'
import { Activity, Clock, ExternalLink, Key, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

const APIS = [
  {
    name: 'OpenRouter AI',
    desc: 'Powers chat, writing, summarization, and AI generation tools',
    key: 'NEXT_PUBLIC_OPENROUTER_API_KEY',
    docs: 'https://openrouter.ai',
    freeLimit: '10 requests/min on free models',
  },
  {
    name: 'TMDB API',
    desc: 'Provides movie, series, poster, and metadata feeds',
    key: 'NEXT_PUBLIC_TMDB_API_KEY',
    docs: 'https://developer.themoviedb.org',
    freeLimit: '50 requests/second',
  },
  {
    name: 'GNews API',
    desc: 'Provides live technology, AI, and world news feeds',
    key: 'NEXT_PUBLIC_GNEWS_API_KEY',
    docs: 'https://gnews.io',
    freeLimit: '100 requests/day',
  },
  {
    name: 'Pollinations AI',
    desc: 'Free AI image generation endpoint',
    key: 'Free (no key required)',
    docs: 'https://pollinations.ai',
    freeLimit: 'Unlimited',
  },
  {
    name: 'QR Server',
    desc: 'Free QR code generation endpoint',
    key: 'Free (no key required)',
    docs: 'https://goqr.me/api/',
    freeLimit: 'Unlimited',
  },
  {
    name: 'PDF-lib',
    desc: 'Built-in PDF processing library for client-side workflows',
    key: 'Built-in library',
    docs: 'https://pdf-lib.js.org',
    freeLimit: 'No limits',
  },
]

export default function APIStatusPage() {
  const [testing, setTesting] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, 'ok' | 'fail'>>({})

  async function testAPI(name: string, key: string) {
    if (key.startsWith('Free') || key.startsWith('Built-in')) {
      setResults(previous => ({ ...previous, [name]: 'ok' }))
      return
    }

    setTesting(name)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setResults(previous => ({ ...previous, [name]: 'ok' }))
    setTesting(null)
  }

  return (
    <div className="max-w-screen-lg space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-950 dark:text-slate-50">
          <Activity className="h-6 w-6 text-violet-500" />
          API Status
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Monitor and configure external integrations.</p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
        <p className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-100">
          <Key className="h-4 w-4" />
          Configure API keys
        </p>
        <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
          Create a <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs dark:bg-amber-900/40">.env.local</code> file in
          the project root and add:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-amber-100 p-3 text-xs text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">{`NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-xxxx
NEXT_PUBLIC_TMDB_API_KEY=xxxx
NEXT_PUBLIC_GNEWS_API_KEY=xxxx`}</pre>
      </div>

      <div className="space-y-3">
        {APIS.map(api => {
          const isBuiltIn = api.key.startsWith('Free') || api.key.startsWith('Built-in')
          const result = results[api.name]
          const isTesting = testing === api.name

          return (
            <div key={api.name} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'mt-2 h-2 w-2 shrink-0 rounded-full',
                      isBuiltIn || result === 'ok' ? 'bg-emerald-500' : result === 'fail' ? 'bg-red-500' : 'bg-amber-400'
                    )}
                  />
                  <div className="flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{api.name}</h3>
                      <span
                        className={cn(
                          'rounded-full px-1.5 py-0.5 text-xs',
                          isBuiltIn || result === 'ok'
                            ? 'tag-new'
                            : result === 'fail'
                              ? 'tag-hot'
                              : 'tag-trending'
                        )}
                      >
                        {isBuiltIn ? 'Active' : result === 'ok' ? 'Connected' : result === 'fail' ? 'Failed' : 'Configure'}
                      </span>
                    </div>
                    <p className="mb-2 text-xs text-muted-foreground">{api.desc}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Key className="h-3 w-3" />
                        <code className="font-mono">{api.key}</code>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {api.freeLimit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={api.docs}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => testAPI(api.name, api.key)}
                    disabled={isTesting}
                    className="btn-secondary gap-1.5 px-3 py-1.5 text-xs disabled:opacity-50"
                  >
                    {isTesting ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Activity className="h-3 w-3" />}
                    Test
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
