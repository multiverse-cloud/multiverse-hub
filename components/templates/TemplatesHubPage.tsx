'use client'

import Link from 'next/link'
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Filter, Search, SearchX, X } from 'lucide-react'
import TemplateLivePreview from '@/components/templates/TemplateLivePreview'
import type { TemplateCategoryId, TemplateEntry, TemplatePlatformId } from '@/lib/template-library-data'
import { cn } from '@/lib/utils'

type CategoryOption = {
  id: TemplateCategoryId
  title: string
  description: string
  count: number
  href: string
}

type PlatformOption = {
  id: TemplatePlatformId
  title: string
  count: number
  href: string
}

type TemplatesHubPageProps = {
  categories: CategoryOption[]
  platforms: PlatformOption[]
  featuredTemplates: TemplateEntry[]
  templates: TemplateEntry[]
  activeCategory: 'all' | TemplateCategoryId
  activePlatform: 'all' | TemplatePlatformId
  searchQuery: string
  totalResults: number
  totalTemplates: number
}

type SortMode = 'newest' | 'name-asc' | 'name-desc'

const INITIAL_VISIBLE_COUNT = 24
const TEMPLATES_STATE_KEY = 'multiverse:templates-universe-state:v2'

function sortTemplates(items: TemplateEntry[], mode: SortMode) {
  const next = [...items]

  switch (mode) {
    case 'name-asc':
      return next.sort((left, right) => left.title.localeCompare(right.title))
    case 'name-desc':
      return next.sort((left, right) => right.title.localeCompare(left.title))
    case 'newest':
    default:
      return next.sort((left, right) => (right.updatedAt || '').localeCompare(left.updatedAt || '') || left.title.localeCompare(right.title))
  }
}

function TemplateCard({ template }: { template: TemplateEntry }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/70">
      <div className="h-56 overflow-hidden bg-white dark:bg-slate-950">
        <TemplateLivePreview template={template} compact className="rounded-none border-0 bg-transparent" />
      </div>
      <Link href={`/templates/${template.slug}`} className="block border-t border-slate-100 px-4 py-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{template.industry}</p>
        <h3 className="mt-2 truncate text-sm font-bold text-slate-900 dark:text-slate-100">{template.title}</h3>
      </Link>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="h-52 skeleton" />
      <div className="space-y-3 border-t border-slate-100 px-4 py-4">
        <div className="h-3 w-24 rounded-full bg-slate-100" />
        <div className="h-4 w-2/3 rounded-full bg-slate-100" />
      </div>
    </div>
  )
}

export default function TemplatesHubPage({
  categories,
  platforms,
  templates,
  activeCategory,
  activePlatform,
  searchQuery,
  totalResults,
  totalTemplates,
}: TemplatesHubPageProps) {
  const [query, setQuery] = useState(searchQuery)
  const [category, setCategory] = useState<'all' | TemplateCategoryId>(activeCategory)
  const [platform, setPlatform] = useState<'all' | TemplatePlatformId>(activePlatform)
  const [sortMode, setSortMode] = useState<SortMode>('newest')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  const deferredQuery = useDeferredValue(query)
  const deferredCategory = useDeferredValue(category)
  const deferredPlatform = useDeferredValue(platform)
  const deferredSortMode = useDeferredValue(sortMode)

  useEffect(() => {
    try {
      const rawState = window.sessionStorage.getItem(TEMPLATES_STATE_KEY)
      if (rawState) {
        const state = JSON.parse(rawState) as {
          query?: string
          category?: 'all' | TemplateCategoryId
          platform?: 'all' | TemplatePlatformId
          sortMode?: SortMode
          visibleCount?: number
          scrollY?: number
        }
        if (typeof state.query === 'string') setQuery(state.query)
        if (state.category) setCategory(state.category)
        if (state.platform) setPlatform(state.platform)
        if (state.sortMode) setSortMode(state.sortMode)
        if (typeof state.visibleCount === 'number') setVisibleCount(state.visibleCount)
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: state.scrollY || 0, behavior: 'auto' })
        })
      }
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return

    const persistState = (scrollY = window.scrollY) => {
      window.sessionStorage.setItem(
        TEMPLATES_STATE_KEY,
        JSON.stringify({
          query,
          category,
          platform,
          sortMode,
          visibleCount,
          scrollY,
        })
      )
    }

    persistState()

    const handleScroll = () => persistState(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [category, hydrated, platform, query, sortMode, visibleCount])

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()
    const base = templates.filter(template => {
      const matchesCategory = deferredCategory === 'all' || template.category === deferredCategory
      const matchesPlatform = deferredPlatform === 'all' || template.platform === deferredPlatform
      const matchesQuery =
        normalizedQuery.length === 0 ||
        template.title.toLowerCase().includes(normalizedQuery) ||
        template.summary.toLowerCase().includes(normalizedQuery) ||
        template.industry.toLowerCase().includes(normalizedQuery) ||
        template.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
      return matchesCategory && matchesPlatform && matchesQuery
    })

    return sortTemplates(base, deferredSortMode)
  }, [deferredCategory, deferredPlatform, deferredQuery, deferredSortMode, templates])

  const visibleTemplates = filteredTemplates.slice(0, visibleCount)
  const isFiltering =
    query !== deferredQuery ||
    category !== deferredCategory ||
    platform !== deferredPlatform ||
    sortMode !== deferredSortMode
  const activeFilterCount = (query.trim() ? 1 : 0) + (category !== 'all' ? 1 : 0) + (platform !== 'all' ? 1 : 0)

  const filterPanel = (
    <div className="space-y-8">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600" />
        <input
          value={query}
          onChange={event =>
            startTransition(() => {
              setQuery(event.target.value)
              setVisibleCount(INITIAL_VISIBLE_COUNT)
            })
          }
          placeholder={`Search ${totalTemplates}+ templates...`}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>

      {activeFilterCount > 0 ? (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Filters</h4>
            <button
              type="button"
              onClick={() =>
                startTransition(() => {
                  setQuery('')
                  setCategory('all')
                  setPlatform('all')
                  setVisibleCount(INITIAL_VISIBLE_COUNT)
                })
              }
              className="text-[10px] font-bold text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {category !== 'all' ? (
              <button
                type="button"
                onClick={() => setCategory('all')}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {categories.find(item => item.id === category)?.title}
                <X className="h-3 w-3" />
              </button>
            ) : null}
            {platform !== 'all' ? (
              <button
                type="button"
                onClick={() => setPlatform('all')}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {platforms.find(item => item.id === platform)?.title}
                <X className="h-3 w-3" />
              </button>
            ) : null}
            {query.trim() ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {query.trim()}
                <X className="h-3 w-3" />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Industry</h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              setCategory('all')
              setVisibleCount(INITIAL_VISIBLE_COUNT)
            }}
            className={cn(
              'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
              category === 'all'
                ? 'border-blue-200 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            )}
          >
            <span>All Templates</span>
            <span className="text-xs text-slate-400">{totalTemplates}</span>
          </button>
          {categories.filter(item => item.count > 0).map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCategory(item.id)
                setVisibleCount(INITIAL_VISIBLE_COUNT)
              }}
              className={cn(
                'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
                category === item.id
                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              )}
            >
              <span className="truncate">{item.title}</span>
              <span className="ml-3 text-xs text-slate-400">{item.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Platform</h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              setPlatform('all')
              setVisibleCount(INITIAL_VISIBLE_COUNT)
            }}
            className={cn(
              'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
              platform === 'all'
                ? 'border-blue-200 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            )}
          >
            <span>All Platforms</span>
            <span className="text-xs text-slate-400">3</span>
          </button>
          {platforms.filter(item => item.count > 0).map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setPlatform(item.id)
                setVisibleCount(INITIAL_VISIBLE_COUNT)
              }}
              className={cn(
                'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
                platform === item.id
                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              )}
            >
              <span>{item.title}</span>
              <span className="text-xs text-slate-400">{item.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="source-hub-scope bg-slate-50 dark:bg-slate-950">
      <main className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-20 pt-32 lg:flex-row lg:items-start">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_55%)]" />
        <aside className="hidden w-72 shrink-0 space-y-8 lg:sticky lg:top-24 lg:block">{filterPanel}</aside>

        <div className="w-full flex-1">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 md:text-5xl">Templates Library</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
              Browse source-backed website templates with the imported hub layout, live preview flow, and cleaner code download.
            </p>
          </div>

          <div className="sticky top-20 z-30 mb-8 bg-slate-50/90 pb-4 backdrop-blur-md dark:bg-slate-950/90 md:py-2">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-1 rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:w-auto">
                <Link href="/templates" className="flex-1 rounded-lg bg-blue-600 px-6 py-2 text-center text-sm font-bold text-white md:flex-none">
                  Templates
                </Link>
                <Link href="/ui" className="flex-1 rounded-lg px-6 py-2 text-center text-sm font-bold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50 md:flex-none">
                  Components
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 lg:hidden">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={event =>
                      startTransition(() => {
                        setQuery(event.target.value)
                        setVisibleCount(INITIAL_VISIBLE_COUNT)
                      })
                    }
                    placeholder="Search..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 lg:hidden"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 ? (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  ) : null}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-slate-100">{totalResults || filteredTemplates.length}</span> results
              </div>
            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-bold uppercase tracking-widest text-slate-400 sm:block">Sort by:</span>
              <select
                value={sortMode}
                onChange={event => {
                  const nextMode = event.target.value as SortMode
                  startTransition(() => {
                    setSortMode(nextMode)
                    setVisibleCount(INITIAL_VISIBLE_COUNT)
                  })
                }}
                className="cursor-pointer bg-transparent text-sm font-bold text-slate-900 outline-none dark:text-slate-100"
              >
                <option value="newest">Newest First</option>
                <option value="name-asc">A to Z</option>
                <option value="name-desc">Z to A</option>
              </select>
            </div>
          </div>

          {!hydrated || isFiltering ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white py-20 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
                <SearchX className="h-10 w-10 text-slate-300 dark:text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">No results found</h3>
              <p className="mx-auto mt-2 max-w-sm text-slate-500 dark:text-slate-400">
                Try adjusting your keywords or filters to find what you are looking for.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {visibleTemplates.map(template => (
                  <TemplateCard key={template.slug} template={template} />
                ))}
              </div>

              {visibleCount < filteredTemplates.length ? (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount(current => current + INITIAL_VISIBLE_COUNT)}
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                  >
                    Load more
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </main>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-[100] overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex max-w-full">
            <div className="animate-slide-in-right flex w-screen max-w-xs flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                <button type="button" onClick={() => setMobileFiltersOpen(false)} className="p-2 text-slate-400 hover:text-slate-900">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">{filterPanel}</div>
              <div className="border-t border-slate-100 p-6">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
