'use client'

import Link from 'next/link'
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Filter, Grid2X2, LayoutGrid, Search, SearchX, X } from 'lucide-react'
import TemplateLivePreview from '@/components/templates/TemplateLivePreview'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
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
type ViewMode = 'grid' | 'large'

const PAGE_SIZE = 24
const TEMPLATES_STATE_KEY = 'multiverse:templates-universe-state:v3'

function sortTemplates(items: TemplateEntry[], mode: SortMode) {
  const next = [...items]
  switch (mode) {
    case 'name-asc':
      return next.sort((a, b) => a.title.localeCompare(b.title))
    case 'name-desc':
      return next.sort((a, b) => b.title.localeCompare(a.title))
    case 'newest':
    default:
      return next.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || '') || a.title.localeCompare(b.title))
  }
}

function TemplateCard({ template, large = false }: { template: TemplateEntry; large?: boolean }) {
  return (
    <article className={cn(
      'group overflow-hidden border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/40',
      'rounded-2xl',
    )}>
      {/* Full-width desktop preview — scaled iframe */}
      <div className={cn(
        'relative overflow-hidden bg-[#eef2f7] dark:bg-slate-950',
        large ? 'h-72' : 'h-52',
      )}>
        <TemplateLivePreview template={template} compact className="rounded-none border-0 bg-transparent" />
        {/* Hover reveal overlay */}
        <div className="absolute inset-0 flex items-end justify-stretch bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Link
            href={`/templates/${template.slug}`}
            className="m-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white/95 py-2.5 text-sm font-bold text-slate-900 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0 translate-y-2"
          >
            Preview Template →
          </Link>
        </div>
      </div>

      <Link
        href={`/templates/${template.slug}`}
        className="block border-t border-slate-100 px-4 py-3.5 transition-colors hover:bg-slate-50/60 dark:border-slate-800 dark:hover:bg-slate-800/40"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          {template.industry}
        </p>
        <h3 className="mt-1.5 truncate text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {template.title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-slate-400 dark:text-slate-500">{template.categoryTitle}</p>
      </Link>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="h-52 animate-pulse bg-slate-100 dark:bg-slate-800" />
      <div className="space-y-2.5 border-t border-slate-100 px-4 py-3.5 dark:border-slate-800">
        <div className="h-2.5 w-24 rounded-full bg-slate-100 dark:bg-slate-800" />
        <div className="h-4 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800" />
        <div className="h-3 w-1/2 rounded-full bg-slate-100 dark:bg-slate-800" />
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
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [currentPage, setCurrentPage] = useState(1)
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
          currentPage?: number
          scrollY?: number
        }
        if (typeof state.query === 'string') setQuery(state.query)
        if (state.category) setCategory(state.category)
        if (state.platform) setPlatform(state.platform)
        if (state.sortMode) setSortMode(state.sortMode)
        if (typeof state.currentPage === 'number') setCurrentPage(state.currentPage)
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
        JSON.stringify({ query, category, platform, sortMode, currentPage, scrollY })
      )
    }
    persistState()
    const handleScroll = () => persistState(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [category, hydrated, platform, query, sortMode, currentPage])

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

  const totalPages = Math.ceil(filteredTemplates.length / PAGE_SIZE)
  const paginatedTemplates = filteredTemplates.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const isFiltering =
    query !== deferredQuery ||
    category !== deferredCategory ||
    platform !== deferredPlatform ||
    sortMode !== deferredSortMode

  const activeFilterCount = (query.trim() ? 1 : 0) + (category !== 'all' ? 1 : 0) + (platform !== 'all' ? 1 : 0)

  function handlePageChange(page: number) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetFilters() {
    startTransition(() => {
      setQuery('')
      setCategory('all')
      setPlatform('all')
      setCurrentPage(1)
    })
  }

  const filterPanel = (
    <div className="space-y-7">
      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600" />
        <input
          value={query}
          onChange={event =>
            startTransition(() => {
              setQuery(event.target.value)
              setCurrentPage(1)
            })
          }
          placeholder={`Search ${totalTemplates}+ templates...`}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-blue-500"
        />
      </div>

      {/* Active filters */}
      {activeFilterCount > 0 ? (
        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Filters</h4>
            <button
              type="button"
              onClick={resetFilters}
              className="text-[10px] font-bold text-blue-600 hover:underline dark:text-blue-400"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {category !== 'all' && (
              <button
                type="button"
                onClick={() => setCategory('all')}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {categories.find(item => item.id === category)?.title}
                <X className="h-3 w-3" />
              </button>
            )}
            {platform !== 'all' && (
              <button
                type="button"
                onClick={() => setPlatform('all')}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {platforms.find(item => item.id === platform)?.title}
                <X className="h-3 w-3" />
              </button>
            )}
            {query.trim() && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                &ldquo;{query.trim()}&rdquo;
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      ) : null}

      {/* Industry filter */}
      <div>
        <h4 className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Industry</h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => { setCategory('all'); setCurrentPage(1) }}
            className={cn(
              'flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all',
              category === 'all'
                ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800/60 dark:bg-blue-950/30 dark:text-blue-300'
                : 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60',
            )}
          >
            <span>All Templates</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">{totalTemplates}</span>
          </button>
          {categories.filter(item => item.count > 0).map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setCategory(item.id); setCurrentPage(1) }}
              className={cn(
                'flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all',
                category === item.id
                  ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800/60 dark:bg-blue-950/30 dark:text-blue-300'
                  : 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60',
              )}
            >
              <span className="truncate">{item.title}</span>
              <span className="ml-3 text-xs text-slate-400 dark:text-slate-500">{item.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Platform filter */}
      <div>
        <h4 className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform</h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => { setPlatform('all'); setCurrentPage(1) }}
            className={cn(
              'flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all',
              platform === 'all'
                ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800/60 dark:bg-blue-950/30 dark:text-blue-300'
                : 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60',
            )}
          >
            <span>All Platforms</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">{platforms.reduce((sum, p) => sum + p.count, 0)}</span>
          </button>
          {platforms.filter(item => item.count > 0).map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setPlatform(item.id); setCurrentPage(1) }}
              className={cn(
                'flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all',
                platform === item.id
                  ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800/60 dark:bg-blue-950/30 dark:text-blue-300'
                  : 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60',
              )}
            >
              <span>{item.title}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">{item.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="source-hub-scope min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.10),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)]" />

      <main className="relative mx-auto flex max-w-[1600px] flex-col gap-8 px-4 pb-20 pt-8 lg:flex-row lg:items-start lg:px-6">
        {/* ─── Sidebar ─── */}
        <aside className="hidden w-64 shrink-0 lg:sticky lg:top-24 lg:block xl:w-72">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {filterPanel}
          </div>
        </aside>

        {/* ─── Main content ─── */}
        <div className="min-w-0 flex-1">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Templates', href: '/templates' },
              ...(category !== 'all'
                ? [{ label: categories.find(c => c.id === category)?.title ?? category }]
                : []),
            ]}
            className="mb-6"
          />

          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 md:text-4xl">
              {category !== 'all'
                ? categories.find(c => c.id === category)?.title ?? 'Templates'
                : 'Templates Library'}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">
              {category !== 'all'
                ? categories.find(c => c.id === category)?.description ?? 'Browse templates filtered by category.'
                : 'Source-backed website templates with live preview flow and clean code download.'}
            </p>
          </div>

          {/* ─── Sticky toolbar ─── */}
          <div className="sticky top-[72px] z-30 mb-6 -mx-4 bg-slate-50/90 px-4 py-3 backdrop-blur-md dark:bg-slate-950/90 lg:-mx-0 lg:rounded-xl lg:border lg:border-slate-200/60 lg:px-4 lg:shadow-sm dark:lg:border-slate-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Tab switcher */}
              <div className="flex w-full items-center gap-1 rounded-xl border border-slate-200/80 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:w-auto">
                <Link
                  href="/templates"
                  className="flex-1 rounded-lg bg-blue-600 px-5 py-2 text-center text-sm font-bold text-white sm:flex-none"
                >
                  Templates
                </Link>
                <Link
                  href="/ui"
                  className="flex-1 rounded-lg px-5 py-2 text-center text-sm font-bold text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 sm:flex-none"
                >
                  Components
                </Link>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile search */}
                <div className="relative flex-1 lg:hidden">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={event => startTransition(() => { setQuery(event.target.value); setCurrentPage(1) })}
                    placeholder="Search..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                {/* Mobile filters button */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 lg:hidden"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* View toggle */}
                <div className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800 sm:flex">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={cn('rounded-lg p-1.5 transition-colors', viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100')}
                    title="Compact grid"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('large')}
                    className={cn('rounded-lg p-1.5 transition-colors', viewMode === 'large' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100')}
                    title="Large cards"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortMode}
                  onChange={event => startTransition(() => { setSortMode(event.target.value as SortMode); setCurrentPage(1) })}
                  className="hidden cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 sm:block"
                >
                  <option value="newest">Newest First</option>
                  <option value="name-asc">A → Z</option>
                  <option value="name-desc">Z → A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-slate-100">{filteredTemplates.length}</span> results
              {totalPages > 1 && (
                <span className="ml-1">· Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span></span>
              )}
            </p>
            {/* Mobile sort */}
            <select
              value={sortMode}
              onChange={event => startTransition(() => { setSortMode(event.target.value as SortMode); setCurrentPage(1) })}
              className="cursor-pointer bg-transparent text-sm font-bold text-slate-900 outline-none dark:text-slate-100 sm:hidden"
            >
              <option value="newest">Newest</option>
              <option value="name-asc">A–Z</option>
              <option value="name-desc">Z–A</option>
            </select>
          </div>

          {/* ─── Grid ─── */}
          {!hydrated || isFiltering ? (
            <div className={cn('grid gap-5', viewMode === 'large' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4')}>
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-24 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
                <SearchX className="h-10 w-10 text-slate-300 dark:text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">No results found</h3>
              <p className="mx-auto mt-2 max-w-sm text-slate-500 dark:text-slate-400">
                Try adjusting your keywords or filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className={cn('grid gap-5', viewMode === 'large' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4')}>
                {paginatedTemplates.map(template => (
                  <TemplateCard key={template.slug} template={template} large={viewMode === 'large'} />
                ))}
              </div>

              {/* ─── Pagination ─── */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 7) }).map((_, idx) => {
                      let page: number
                      if (totalPages <= 7) {
                        page = idx + 1
                      } else if (currentPage <= 4) {
                        page = idx + 1
                        if (idx === 5) return <span key="dots1" className="px-1 text-slate-400">…</span>
                        if (idx === 6) page = totalPages
                      } else if (currentPage >= totalPages - 3) {
                        if (idx === 0) page = 1
                        else if (idx === 1) return <span key="dots2" className="px-1 text-slate-400">…</span>
                        else page = totalPages - (6 - idx)
                      } else {
                        if (idx === 0) page = 1
                        else if (idx === 1) return <span key="dots1" className="px-1 text-slate-400">…</span>
                        else if (idx === 5) return <span key="dots2" className="px-1 text-slate-400">…</span>
                        else if (idx === 6) page = totalPages
                        else page = currentPage + (idx - 3)
                      }
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold transition-all',
                            currentPage === page
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700',
                          )}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* ─── Mobile filters drawer ─── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex max-w-full">
            <div className="flex w-screen max-w-sm flex-col bg-white shadow-2xl dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Filters</h2>
                <button type="button" onClick={() => setMobileFiltersOpen(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">{filterPanel}</div>
              <div className="border-t border-slate-100 p-6 dark:border-slate-800">
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
      )}
    </div>
  )
}
