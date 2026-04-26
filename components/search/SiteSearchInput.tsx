'use client'

import Link from 'next/link'
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Compass, LayoutTemplate, Search, ShieldAlert, Sparkles, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fetchSiteSearch, type SiteSearchResult, type SiteSearchResultType } from '@/lib/site-search'

const TYPE_META: Record<
  SiteSearchResultType,
  { label: string; icon: typeof Wrench; accent: string }
> = {
  tool: { label: 'Tools', icon: Wrench, accent: 'text-indigo-600 dark:text-indigo-300' },
  discover: { label: 'Discover', icon: Compass, accent: 'text-emerald-600 dark:text-emerald-300' },
  fix: { label: 'Fixes', icon: ShieldAlert, accent: 'text-orange-600 dark:text-orange-300' },
  prompt: { label: 'Prompts', icon: Sparkles, accent: 'text-fuchsia-600 dark:text-fuchsia-300' },
  template: { label: 'Templates', icon: LayoutTemplate, accent: 'text-cyan-600 dark:text-cyan-300' },
}

type SiteSearchInputProps = {
  placeholder: string
  variant?: 'hero' | 'navbar' | 'mobile'
  className?: string
}

export default function SiteSearchInput({
  placeholder,
  variant = 'hero',
  className,
}: SiteSearchInputProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SiteSearchResult[]>([])
  const [activeType, setActiveType] = useState<'all' | SiteSearchResultType>('all')
  const [isFocused, setIsFocused] = useState(false)
  const deferredQuery = useDeferredValue(query)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const normalizedQuery = deferredQuery.trim()
    if (normalizedQuery.length < 2) {
      setResults([])
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      const nextResults = await fetchSiteSearch(normalizedQuery, 12, controller.signal).catch(() => [])
      setResults(nextResults)
    }, 120)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [deferredQuery])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const availableTypes = useMemo(() => {
    const types = new Set<SiteSearchResultType>()
    for (const result of results) {
      types.add(result.type)
    }
    return Array.from(types)
  }, [results])

  const filteredResults = useMemo(() => {
    return activeType === 'all' ? results : results.filter(result => result.type === activeType)
  }, [activeType, results])

  function resetResults() {
    setQuery('')
    setResults([])
    setActiveType('all')
    setIsFocused(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedQuery = query.trim()
    if (!normalizedQuery) return

    const params = new URLSearchParams({ q: normalizedQuery })
    if (activeType !== 'all') {
      params.set('type', activeType)
    }
    router.push(`/search?${params.toString()}`)
    setIsFocused(false)
  }

  const isHero = variant === 'hero'
  const isMobile = variant === 'mobile'
  const showDropdown = isFocused && results.length > 0 && !isMobile

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit}>
        <div className="group relative">
          <Search
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors',
              isHero ? 'h-5 w-5 sm:left-4' : isMobile ? 'h-4 w-4 left-2.5' : 'h-4 w-4',
              isFocused && 'text-indigo-500'
            )}
          />
          <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className={cn(
              'w-full transition-all focus:outline-none',
              isHero
                ? 'rounded-2xl border border-slate-200/80 bg-white py-3 pl-10 pr-16 text-sm shadow-[0_18px_40px_-28px_rgba(15,23,42,0.28)] focus:border-indigo-400 focus:shadow-indigo-500/10 sm:py-3.5 sm:pl-12 sm:pr-36 sm:text-base dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-none dark:focus:border-indigo-500'
                : isMobile
                ? 'rounded-lg border border-slate-200/60 bg-white/90 py-2 pl-8 pr-3 text-xs focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/20 dark:border-slate-700/60 dark:bg-slate-900/90 dark:text-slate-100'
                : 'rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm shadow-sm hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700'
            )}
          />
          {isHero ? (
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 flex h-10 min-w-10 -translate-y-1/2 items-center justify-center gap-1 rounded-xl bg-slate-950 px-3 text-[11px] font-semibold tracking-tight text-white transition-all hover:bg-slate-800 hover:shadow-md sm:right-2 sm:h-auto sm:min-w-0 sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-2.5 sm:text-sm dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
            >
              <span className="hidden sm:inline">Search</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          ) : isMobile ? (
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center rounded-lg bg-indigo-600 p-1.5 text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              aria-label="Search"
            >
              <ArrowRight className="h-3 w-3" />
            </button>
          ) : null}
        </div>
      </form>

      {showDropdown ? (
        <div
          className={cn(
            'absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/[0.12] dark:border-slate-800/80 dark:bg-slate-950 dark:shadow-[0_32px_64px_-24px_rgba(2,6,23,0.55)]',
            isHero ? '' : 'max-w-2xl',
            'animate-fade-in'
          )}
          style={{ animationDuration: '0.15s' }}
        >
          {/* Type filter tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 px-4 py-3 dark:border-slate-800/80">
            <button
              type="button"
              onClick={() => setActiveType('all')}
              className={cn(
                'rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors',
                activeType === 'all'
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                  : 'border-slate-200 bg-white text-muted-foreground hover:text-foreground dark:border-slate-800 dark:bg-slate-900'
              )}
            >
              All
            </button>
            {availableTypes.map(type => {
              const meta = TYPE_META[type]
              const Icon = meta.icon

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors',
                    activeType === type
                      ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-slate-950'
                      : 'border-slate-200 bg-white text-muted-foreground hover:text-foreground dark:border-slate-800 dark:bg-slate-900'
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {meta.label}
                </button>
              )
            })}
          </div>

          {/* Results */}
          <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
            {filteredResults.map(result => {
              const meta = TYPE_META[result.type]
              const Icon = meta.icon

              return (
                <Link
                  key={result.id}
                  href={result.href}
                  prefetch={false}
                  className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/70"
                  onClick={resetResults}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    <Icon className={cn('h-4 w-4', meta.accent)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{result.title}</p>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:bg-slate-800">
                        {result.badge}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{result.description}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {result.category}
                      {result.subcategory ? ` · ${result.subcategory}` : ''}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200/80 px-4 py-3 dark:border-slate-800/80">
            <button
              type="button"
              onClick={() => {
                const normalizedQuery = query.trim()
                if (!normalizedQuery) return
                const params = new URLSearchParams({ q: normalizedQuery })
                if (activeType !== 'all') {
                  params.set('type', activeType)
                }
                router.push(`/search?${params.toString()}`)
                resetResults()
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200"
            >
              View full results
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
