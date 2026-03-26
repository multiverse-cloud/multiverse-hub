'use client'

import Link from 'next/link'
import { useDeferredValue, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Search } from 'lucide-react'
import { fetchToolSearch, type ToolSearchResult } from '@/lib/tool-search'

export default function HeroSearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ToolSearchResult[]>([])
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    const normalizedQuery = deferredQuery.trim()
    if (normalizedQuery.length < 2) {
      setResults([])
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      const nextResults = await fetchToolSearch(normalizedQuery, 5, controller.signal).catch(() => [])
      setResults(nextResults)
    }, 120)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [deferredQuery])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedQuery = query.trim()
    if (!normalizedQuery) return
    router.push(`/tools?q=${encodeURIComponent(normalizedQuery)}`)
  }

  return (
    <div className="relative mb-6 w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="group relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-indigo-500 sm:left-4" />
          <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search tools, categories, or..."
            className="w-full rounded-2xl border-2 border-border bg-card py-3.5 pl-10 pr-24 text-sm shadow-lg shadow-slate-900/5 transition-all focus:border-indigo-400 focus:outline-none focus:shadow-slate-900/10 sm:py-4 sm:pl-12 sm:pr-36 sm:text-base dark:shadow-none"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-xl bg-slate-950 px-3.5 py-2 font-display text-xs font-bold tracking-tight text-white transition-colors hover:bg-slate-800 sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-2.5 sm:text-sm dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
          >
            Search
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {results.map(tool => (
            <Link
              key={tool.id}
              href={`/tools/${tool.categorySlug}/${tool.slug}`}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted dark:hover:bg-slate-800/70"
              onClick={() => {
                setQuery('')
                setResults([])
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-950">
                {tool.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium">{tool.name}</p>
                <p className="text-xs text-muted-foreground">{tool.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
