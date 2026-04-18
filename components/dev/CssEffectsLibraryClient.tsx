'use client'

import Link from 'next/link'
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Boxes, Filter, Search, SearchX, X } from 'lucide-react'
import SourceUiPreview from '@/components/ui-source/SourceUiPreview'
import {
  buildPreviewDoc,
  getEffectSlug,
  getUiCollectionLabel,
  getUiCollections,
  getUiSectionIdForCategory,
  getUiSections,
  uiEffects,
  type UiCatalogItem,
  type UiSectionId,
} from '@/lib/css-effects-library'
import { cn } from '@/lib/utils'

type CssEffectsLibraryClientProps = {
  initialQuery?: string
  initialSection?: UiSectionId
  initialCategory?: string
}

type SortMode = 'featured' | 'newest' | 'name-asc' | 'name-desc'

const INITIAL_VISIBLE_COUNT = 24
const UI_STATE_KEY = 'multiverse:ui-universe-state:v2'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getCompactPreviewConfig(effect: UiCatalogItem) {
  if (['navbar', 'hero', 'feature', 'footer', 'table', 'dashboard', 'sidebar', 'ecommerce', 'layout'].includes(effect.category)) {
    return { scale: 0.46, width: '980px', minHeight: '520px', canvasHeight: '100%', padding: '12px' }
  }

  if (['form', 'auth', 'accordion', 'faq', 'search', 'filter', 'card', 'testimonial', 'pricing', 'stats'].includes(effect.category)) {
    return { scale: 0.6, width: '620px', minHeight: '380px', canvasHeight: '100%', padding: '14px' }
  }

  if (['checkbox', 'radio', 'button', 'notification', 'badge', 'hover', 'tooltip', 'toggle', 'separator', 'tabs'].includes(effect.category)) {
    return { scale: 0.84, width: '360px', minHeight: '260px', canvasHeight: '100%', padding: '18px' }
  }

  if (['shadow', 'shape', 'background', 'loading', 'text', 'border'].includes(effect.category)) {
    return { scale: 0.76, width: '420px', minHeight: '280px', canvasHeight: '100%', padding: '18px' }
  }

  return { scale: 0.64, width: '520px', minHeight: '320px', canvasHeight: '100%', padding: '16px' }
}

function getCompactDocumentScale(effect: UiCatalogItem) {
  if (['navbar', 'hero', 'feature', 'footer', 'table', 'dashboard', 'sidebar', 'ecommerce', 'layout'].includes(effect.category)) {
    return 0.34
  }

  if (['form', 'auth', 'accordion', 'faq', 'search', 'filter', 'card', 'testimonial', 'pricing', 'stats'].includes(effect.category)) {
    return 0.46
  }

  if (['checkbox', 'radio', 'button', 'notification', 'badge', 'hover', 'tooltip', 'toggle', 'separator', 'tabs'].includes(effect.category)) {
    return 0.72
  }

  if (['shadow', 'shape', 'background', 'loading', 'text', 'border'].includes(effect.category)) {
    return 0.58
  }

  return 0.5
}

function buildCompactPreviewDoc(effect: UiCatalogItem) {
  const config = getCompactPreviewConfig(effect)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { box-sizing: border-box; }
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
      }
      ${effect.cssCode || ''}
      body {
        margin: 0;
        width: 100vw;
        height: 100vh;
        display: grid;
        place-items: center;
        padding: ${config.padding};
        background: #ffffff;
        font-family: Inter, system-ui, sans-serif;
        overflow: hidden;
      }
      .preview-shell {
        width: 100%;
        height: ${config.canvasHeight};
        min-height: ${config.minHeight};
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .preview-frame {
        width: ${config.width};
        transform: scale(${config.scale});
        transform-origin: center center;
        flex-shrink: 0;
        max-width: none;
      }
      .preview-frame,
      .preview-frame * {
        box-sizing: border-box;
      }
      .preview-frame * {
        max-width: 100%;
      }
      .preview-frame button,
      .preview-frame a,
      .preview-frame input,
      .preview-frame textarea,
      .preview-frame select {
        pointer-events: none !important;
      }
    </style>
  </head>
  <body>
    <div class="preview-shell" aria-label="${escapeHtml(effect.title)} preview">
      <div class="preview-frame">
        ${effect.htmlCode}
      </div>
    </div>
  </body>
</html>`
}

function EffectPreview({
  effect,
  compact = false,
}: {
  effect: UiCatalogItem
  compact?: boolean
}) {
  const previewDoc = useMemo(() => {
    if (effect.kind === 'source') return null
    if (compact) return effect.previewDocument || buildCompactPreviewDoc(effect)
    return buildPreviewDoc(effect)
  }, [compact, effect])

  return effect.kind === 'source' ? (
    <SourceUiPreview previewKey={effect.previewKey} compact={compact} />
  ) : compact && effect.previewDocument ? (
    <div className="flex h-full w-full items-start justify-center overflow-hidden bg-white">
      <iframe
        title={`${effect.title} preview`}
        srcDoc={previewDoc || ''}
        className="border-0 bg-white"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        style={{
          width: `${100 / getCompactDocumentScale(effect)}%`,
          height: `${100 / getCompactDocumentScale(effect)}%`,
          transform: `scale(${getCompactDocumentScale(effect)})`,
          transformOrigin: 'top center',
          pointerEvents: 'none',
          background: '#ffffff',
        }}
      />
    </div>
  ) : (
    <iframe
      title={`${effect.title} preview`}
      srcDoc={previewDoc || ''}
      className="h-full w-full border-0 bg-white"
      sandbox="allow-scripts allow-same-origin"
      loading="lazy"
    />
  )
}

function PreviewCard({ effect }: { effect: UiCatalogItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700">
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <EffectPreview effect={effect} compact />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition-all duration-300 group-hover:bg-slate-900/12 group-hover:opacity-100">
          <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg">
            Preview only
          </div>
        </div>
      </div>
      <Link
        href={`/ui/${getEffectSlug(effect)}`}
        className="flex cursor-pointer items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
      >
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {getUiCollectionLabel(effect.category)}
          </p>
          <h3 className="mt-1 truncate text-sm font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            {effect.title}
          </h3>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-100" />
      </Link>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="aspect-[4/3] animate-pulse bg-slate-100 dark:bg-slate-900" />
      <div className="space-y-3 px-4 py-3">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
      </div>
    </div>
  )
}

function pickDiverseItems(items: UiCatalogItem[], count: number) {
  const picks: UiCatalogItem[] = []
  const seenIds = new Set<string>()
  const seenCategories = new Set<string>()

  for (const item of items) {
    if (picks.length >= count) break
    if (seenIds.has(item.id) || seenCategories.has(item.category)) continue
    picks.push(item)
    seenIds.add(item.id)
    seenCategories.add(item.category)
  }

  for (const item of items) {
    if (picks.length >= count) break
    if (seenIds.has(item.id)) continue
    picks.push(item)
    seenIds.add(item.id)
  }

  return picks
}

function sortItems(items: UiCatalogItem[], mode: SortMode) {
  const next = [...items]

  switch (mode) {
    case 'newest':
      return next.sort((left, right) => (right.publishedAt || '').localeCompare(left.publishedAt || '') || left.title.localeCompare(right.title))
    case 'name-desc':
      return next.sort((left, right) => right.title.localeCompare(left.title))
    case 'name-asc':
      return next.sort((left, right) => left.title.localeCompare(right.title))
    case 'featured':
    default:
      return next.sort((left, right) => {
        if (left.featured !== right.featured) return left.featured ? -1 : 1
        if ((right.publishedAt || '') !== (left.publishedAt || '')) {
          return (right.publishedAt || '').localeCompare(left.publishedAt || '')
        }
        return left.title.localeCompare(right.title)
      })
  }
}

export default function CssEffectsLibraryClient({
  initialQuery = '',
  initialSection = 'all',
  initialCategory = 'all',
}: CssEffectsLibraryClientProps) {
  const [query, setQuery] = useState(initialQuery)
  const [section, setSection] = useState<UiSectionId>(initialSection)
  const [category, setCategory] = useState(initialCategory)
  const [sortMode, setSortMode] = useState<SortMode>('featured')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  const deferredQuery = useDeferredValue(query)
  const deferredSection = useDeferredValue(section)
  const deferredCategory = useDeferredValue(category)
  const deferredSortMode = useDeferredValue(sortMode)

  const sections = useMemo(() => getUiSections(), [])
  const collections = useMemo(() => getUiCollections(deferredSection), [deferredSection])

  useEffect(() => {
    try {
      const rawState = window.sessionStorage.getItem(UI_STATE_KEY)
      if (rawState) {
        const state = JSON.parse(rawState) as {
          query?: string
          section?: UiSectionId
          category?: string
          sortMode?: SortMode
          visibleCount?: number
          scrollY?: number
        }
        if (typeof state.query === 'string') setQuery(state.query)
        if (state.section) setSection(state.section)
        if (typeof state.category === 'string') setCategory(state.category)
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
        UI_STATE_KEY,
        JSON.stringify({
          query,
          section,
          category,
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
  }, [category, hydrated, query, section, sortMode, visibleCount])

  const featuredItems = useMemo(
    () => pickDiverseItems(sortItems(uiEffects.filter(item => item.featured), 'featured'), 6),
    []
  )

  const filteredItems = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    const base = uiEffects.filter(item => {
      const matchesSection =
        deferredSection === 'all' || getUiSectionIdForCategory(item.category) === deferredSection
      const matchesCategory = deferredCategory === 'all' || item.category === deferredCategory
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        getUiCollectionLabel(item.category).toLowerCase().includes(normalizedQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))

      return matchesSection && matchesCategory && matchesQuery
    })

    return sortItems(base, deferredSortMode)
  }, [deferredCategory, deferredQuery, deferredSection, deferredSortMode])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const isFiltering =
    query !== deferredQuery ||
    section !== deferredSection ||
    category !== deferredCategory ||
    sortMode !== deferredSortMode

  const activeFilterCount =
    (section !== 'all' ? 1 : 0) +
    (category !== 'all' ? 1 : 0) +
    (query.trim() ? 1 : 0)

  const FilterPanel = (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={event =>
            startTransition(() => {
              setQuery(event.target.value)
              setVisibleCount(INITIAL_VISIBLE_COUNT)
            })
          }
          placeholder="Search resources..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
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
                  setSection('all')
                  setCategory('all')
                  setVisibleCount(INITIAL_VISIBLE_COUNT)
                })
              }
              className="text-[10px] font-bold text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {section !== 'all' ? (
              <button
                type="button"
                onClick={() => setSection('all')}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                {sections.find(item => item.id === section)?.label}
                <X className="h-3 w-3" />
              </button>
            ) : null}
            {category !== 'all' ? (
              <button
                type="button"
                onClick={() => setCategory('all')}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                {collections.find(item => item.id === category)?.label || category}
                <X className="h-3 w-3" />
              </button>
            ) : null}
            {query.trim() ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                {query.trim()}
                <X className="h-3 w-3" />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Section</h4>
        <div className="space-y-2">
          {sections.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                startTransition(() => {
                  setSection(item.id)
                  setCategory('all')
                  setVisibleCount(INITIAL_VISIBLE_COUNT)
                })
              }
              className={cn(
                'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
                section === item.id
                  ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700'
              )}
            >
              <span>{item.label}</span>
              <span className="text-xs text-slate-400">{item.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Category</h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() =>
              startTransition(() => {
                setCategory('all')
                setVisibleCount(INITIAL_VISIBLE_COUNT)
              })
            }
            className={cn(
              'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
              category === 'all'
                ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700'
            )}
          >
            <span>All Categories</span>
            <span className="text-xs text-slate-400">{filteredItems.length}</span>
          </button>
          {collections.slice(0, 18).map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                startTransition(() => {
                  setCategory(item.id)
                  setVisibleCount(INITIAL_VISIBLE_COUNT)
                })
              }
              className={cn(
                'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
                category === item.id
                  ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700'
              )}
            >
              <span className="truncate">{item.label}</span>
              <span className="ml-3 text-xs text-slate-400">{item.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.16),transparent_55%)]" />
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl dark:text-slate-50">Components Library</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            Browse our merged collection of imported hub components, source-backed UI blocks, and existing Multiverse items.
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <aside className="hidden w-72 shrink-0 lg:sticky lg:top-24 lg:block">
            {FilterPanel}
          </aside>

          <div className="w-full flex-1">
            <div className="sticky top-20 z-30 mb-8 rounded-2xl bg-slate-50/90 pb-4 backdrop-blur-md dark:bg-slate-950/90 md:py-2">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-1 rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <Link
                    href="/templates"
                    className="flex-1 rounded-lg px-6 py-2 text-center text-sm font-bold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50 md:flex-none"
                  >
                    Templates
                  </Link>
                  <div className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-2 text-sm font-bold text-white dark:bg-white dark:text-slate-950 md:flex-none">
                    <Boxes className="h-4 w-4" />
                    Components
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex-1 md:hidden">
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
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
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

            {hydrated && featuredItems.length > 0 && section === 'all' && category === 'all' && !query.trim() ? (
              <section className="mb-8">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Featured</h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {featuredItems.map(item => (
                    <PreviewCard key={item.id} effect={item} />
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Showing <span className="font-bold text-slate-900 dark:text-slate-100">{filteredItems.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-bold uppercase tracking-widest text-slate-400 sm:block">
                  Sort by:
                </span>
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
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="name-asc">A to Z</option>
                  <option value="name-desc">Z to A</option>
                </select>
              </div>
            </div>

            {!hydrated || isFiltering ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 9 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white py-20 text-center dark:border-slate-800 dark:bg-slate-950">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900">
                  <SearchX className="h-10 w-10 text-slate-300 dark:text-slate-700" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">No results found</h3>
                <p className="mx-auto mt-2 max-w-sm text-slate-500 dark:text-slate-400">
                  Try adjusting your keywords or filters to find what you are looking for.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    startTransition(() => {
                      setQuery('')
                      setSection('all')
                      setCategory('all')
                      setVisibleCount(INITIAL_VISIBLE_COUNT)
                    })
                  }
                  className="mt-8 text-sm font-bold text-blue-600 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {visibleItems.map(item => (
                    <PreviewCard key={item.id} effect={item} />
                  ))}
                </div>

                {visibleCount < filteredItems.length ? (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount(current => current + INITIAL_VISIBLE_COUNT)}
                      className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                    >
                      Load more
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </main>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-[100] overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex max-w-full">
            <div className="flex w-screen max-w-xs flex-col bg-white shadow-2xl dark:bg-slate-950">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">{FilterPanel}</div>
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
      ) : null}
    </div>
  )
}
