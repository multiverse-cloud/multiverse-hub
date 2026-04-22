'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Boxes, Check, Copy, Eye, Filter, Search, SearchX, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UiCatalogItem } from '@/lib/ui-source-components'

type UiSectionId = 'all' | 'components' | 'foundations'

type UiSection = {
  id: UiSectionId
  label: string
  count: number
  description: string
}

type UiCollection = {
  id: string
  label: string
  count: number
  sectionId: Exclude<UiSectionId, 'all'>
}

type UiLibraryItem = Omit<
  UiCatalogItem,
  'cssCode' | 'htmlCode' | 'previewDocument' | 'reactCode' | 'usageCode'
> & {
  slug: string
  sectionId: Exclude<UiSectionId, 'all'>
}

type CssEffectsLibraryClientProps = {
  initialQuery?: string
  initialSection?: UiSectionId
  initialCategory?: string
  items: UiLibraryItem[]
  sections: UiSection[]
  collectionsBySection: Record<UiSectionId, UiCollection[]>
  collectionLabels: Record<string, string>
}

const INITIAL_VISIBLE_COUNT = 24
const UI_STATE_KEY = 'multiverse:ui-universe-state:v2'
const PREVIEW_SIZES = [
  { id: 'mobile', label: 'Mobile', width: 375 },
  { id: 'sm', label: 'SM', width: 640 },
  { id: 'md', label: 'MD', width: 768 },
  { id: 'lg', label: 'LG', width: 1024 },
  { id: 'full', label: 'Full', width: null },
] as const

type PreviewSizeId = (typeof PREVIEW_SIZES)[number]['id']

function updateUiUrl(section: UiSectionId, category: string, query: string) {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams()
  if (section !== 'all') params.set('section', section)
  if (category !== 'all') params.set('category', category)
  if (query.trim()) params.set('q', query.trim())

  const nextUrl = params.toString() ? `/ui?${params.toString()}` : '/ui'
  window.history.pushState(null, '', nextUrl)
}

const SourceUiPreview = dynamic(() => import('@/components/ui-source/SourceUiPreview'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-slate-100 dark:bg-slate-900" />,
})

function getCompactDocumentScale(effect: UiLibraryItem) {
  if (effect.provider === 'hyperui') {
    if (['headers', 'footers', 'feature-grids', 'contact-forms', 'pricing', 'product-collections', 'team-sections', 'tables', 'side-menu', 'vertical-menu'].includes(effect.category)) {
      return 0.42
    }

    if (['blog-cards', 'cards', 'product-cards', 'empty-states', 'empty-content', 'modals', 'stats', 'steps', 'timelines'].includes(effect.category)) {
      return 0.58
    }

    if (['buttons', 'badges', 'breadcrumbs', 'button-groups', 'checkboxes', 'radio-groups', 'toggles', 'pagination', 'loaders', 'progress-bars', 'tabs'].includes(effect.category)) {
      return 0.86
    }

    return 0.72
  }

  if (['navbar', 'hero', 'feature', 'footer', 'table', 'dashboard', 'sidebar', 'ecommerce', 'layout'].includes(effect.category)) {
    return 0.34
  }

  if (['form', 'auth', 'accordion', 'faq', 'search', 'filter', 'card', 'testimonial', 'pricing', 'stats'].includes(effect.category)) {
    return 0.46
  }

  if (['checkbox', 'radio', 'button', 'notification', 'badge', 'hover', 'tooltip', 'toggle', 'separator', 'tabs'].includes(effect.category)) {
    return effect.category === 'button' ? 0.92 : 0.78
  }

  if (['shadow', 'shape', 'background', 'loading', 'text', 'border'].includes(effect.category)) {
    return 0.58
  }

  return 0.5
}

function EffectPreview({
  effect,
  compact = false,
}: {
  effect: UiLibraryItem
  compact?: boolean
}) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    if (effect.kind === 'source') {
      const timer = window.setTimeout(() => setLoaded(true), 220)
      return () => window.clearTimeout(timer)
    }
  }, [effect.id, effect.kind])

  return effect.kind === 'source' ? (
    <div className="relative h-full w-full bg-white">
      {!loaded ? <div className="absolute inset-0 z-[1] animate-pulse bg-slate-100 dark:bg-slate-900" /> : null}
        <SourceUiPreview previewKey={effect.previewKey} compact={compact} />
    </div>
  ) : compact ? (
    <div className="relative flex h-full w-full items-start justify-center overflow-hidden bg-white">
      {!loaded ? <div className="absolute inset-0 z-[1] animate-pulse bg-slate-100 dark:bg-slate-900" /> : null}
      <iframe
        title={`${effect.title} preview`}
        src={`/ui/${effect.slug}/preview`}
        className="border-0 bg-white"
        sandbox="allow-scripts"
        loading="lazy"
        scrolling="no"
        onLoad={() => setLoaded(true)}
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
    <div className="relative h-full w-full bg-white">
      {!loaded ? <div className="absolute inset-0 z-[1] animate-pulse bg-slate-100 dark:bg-slate-900" /> : null}
      <iframe
        title={`${effect.title} preview`}
        src={`/ui/${effect.slug}/preview`}
        className="h-full w-full border-0 bg-white"
        sandbox="allow-scripts"
        loading="lazy"
        scrolling="no"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

function CategoryCard({
  collection,
  onSelect,
}: {
  collection: UiCollection
  onSelect: (collection: UiCollection) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(collection)}
      className="group flex min-h-[118px] w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-5 text-left transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:bg-slate-900"
    >
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-50">{collection.label}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{collection.count} components</p>
      </div>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-900 dark:group-hover:text-white" />
    </button>
  )
}

function ComponentPreviewRow({
  effect,
  copied,
  onCopy,
}: {
  effect: UiLibraryItem
  copied: boolean
  onCopy: (effect: UiLibraryItem) => void
}) {
  const isDark = Boolean(effect.darkVariant)
  const [previewSize, setPreviewSize] = useState<PreviewSizeId>('full')
  const activeSize = PREVIEW_SIZES.find(size => size.id === previewSize) || PREVIEW_SIZES[PREVIEW_SIZES.length - 1]

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-950 dark:text-slate-50">{effect.variantLabel || effect.title}</h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{effect.frameworkLabel || 'markup'}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {PREVIEW_SIZES.map(size => (
            <button
              key={size.id}
              type="button"
              onClick={() => setPreviewSize(size.id)}
              className={cn(
                'rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors',
                previewSize === size.id
                  ? 'border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
              )}
            >
              {size.label}
            </button>
          ))}
          <Link
            href={`/ui/${effect.slug}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </Link>
          <button
            type="button"
            onClick={() => onCopy(effect)}
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <div className={cn('relative h-[200px] overflow-hidden md:h-[220px]', isDark ? 'bg-slate-950' : 'bg-white')}>
        <div
          className="mx-auto h-full max-w-full overflow-hidden transition-[width] duration-200"
          style={{ width: activeSize.width ? `${activeSize.width}px` : '100%' }}
        >
          <EffectPreview effect={effect} compact />
        </div>
      </div>
    </article>
  )
}

function SkeletonRow() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <div className="space-y-2">
          <div className="h-4 w-36 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
          <div className="h-3 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
        </div>
        <div className="h-8 w-28 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
      </div>
      <div className="h-[200px] animate-pulse bg-slate-100 dark:bg-slate-900" />
    </div>
  )
}

function sortItems(items: UiLibraryItem[]) {
  const next = [...items]
  return next.sort((left, right) => {
    if (left.darkVariant !== right.darkVariant) return left.darkVariant ? 1 : -1
    return left.title.localeCompare(right.title)
  })
}

export default function CssEffectsLibraryClient({
  initialQuery = '',
  initialSection = 'all',
  initialCategory = 'all',
  items,
  sections,
  collectionsBySection,
  collectionLabels,
}: CssEffectsLibraryClientProps) {
  const [query, setQuery] = useState(initialQuery)
  const [section, setSection] = useState<UiSectionId>(initialSection)
  const [category, setCategory] = useState(initialCategory)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const deferredQuery = useDeferredValue(query)
  const deferredSection = useDeferredValue(section)
  const deferredCategory = useDeferredValue(category)

  const collections = collectionsBySection[deferredSection] || []

  useEffect(() => {
    const hasUrlState = Boolean(initialQuery) || initialSection !== 'all' || initialCategory !== 'all'
    if (hasUrlState) {
      setHydrated(true)
      return
    }

    try {
      const rawState = window.sessionStorage.getItem(UI_STATE_KEY)
      if (rawState) {
        const state = JSON.parse(rawState) as {
          query?: string
          section?: UiSectionId
          category?: string
          visibleCount?: number
          scrollY?: number
        }
        if (typeof state.query === 'string') setQuery(state.query)
        if (state.section) setSection(state.section)
        if (typeof state.category === 'string') setCategory(state.category)
        if (typeof state.visibleCount === 'number') setVisibleCount(state.visibleCount)
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: state.scrollY || 0, behavior: 'auto' })
        })
      }
    } catch {}
    setHydrated(true)
  }, [initialCategory, initialQuery, initialSection])

  useEffect(() => {
    if (!hydrated) return

    const persistState = (scrollY = window.scrollY) => {
      window.sessionStorage.setItem(
        UI_STATE_KEY,
        JSON.stringify({
          query,
          section,
          category,
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
  }, [category, hydrated, query, section, visibleCount])

  useEffect(() => {
    function handlePopState() {
      const params = new URLSearchParams(window.location.search)
      const nextSection = (params.get('section') as UiSectionId | null) || 'all'
      const nextCategory = params.get('category') || 'all'
      const nextQuery = params.get('q') || ''

      startTransition(() => {
        setSection(nextSection === 'components' || nextSection === 'foundations' ? nextSection : 'all')
        setCategory(nextCategory)
        setQuery(nextQuery)
        setVisibleCount(INITIAL_VISIBLE_COUNT)
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const filteredItems = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    const base = items.filter(item => {
      const matchesSection =
        deferredSection === 'all' || item.sectionId === deferredSection
      const matchesCategory = deferredCategory === 'all' || item.category === deferredCategory
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        (collectionLabels[item.category] || item.category).toLowerCase().includes(normalizedQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))

      return matchesSection && matchesCategory && matchesQuery
    })

    return sortItems(base)
  }, [collectionLabels, deferredCategory, deferredQuery, deferredSection, items])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const visibleCollections = collections.filter(collection => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()
    return normalizedQuery.length === 0 || collection.label.toLowerCase().includes(normalizedQuery)
  })
  const isFiltering =
    query !== deferredQuery ||
    section !== deferredSection ||
    category !== deferredCategory

  const activeFilterCount =
    (section !== 'all' ? 1 : 0) +
    (category !== 'all' ? 1 : 0) +
    (query.trim() ? 1 : 0)

  function selectCollection(collection: UiCollection) {
    startTransition(() => {
      setSection(collection.sectionId)
      setCategory(collection.id)
      setVisibleCount(INITIAL_VISIBLE_COUNT)
      setMobileFiltersOpen(false)
      updateUiUrl(collection.sectionId, collection.id, query)
    })
  }

  function resetUiFilters() {
    startTransition(() => {
      setQuery('')
      setSection('all')
      setCategory('all')
      setVisibleCount(INITIAL_VISIBLE_COUNT)
      updateUiUrl('all', 'all', '')
    })
  }

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
              onClick={resetUiFilters}
              className="text-[10px] font-bold text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {section !== 'all' ? (
              <button
                type="button"
                onClick={() =>
                  startTransition(() => {
                    setSection('all')
                    setCategory('all')
                    setVisibleCount(INITIAL_VISIBLE_COUNT)
                    updateUiUrl('all', 'all', query)
                  })
                }
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                {sections.find(item => item.id === section)?.label}
                <X className="h-3 w-3" />
              </button>
            ) : null}
            {category !== 'all' ? (
              <button
                type="button"
                onClick={() =>
                  startTransition(() => {
                    setCategory('all')
                    setVisibleCount(INITIAL_VISIBLE_COUNT)
                    updateUiUrl(section, 'all', query)
                  })
                }
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                {collections.find(item => item.id === category)?.label || category}
                <X className="h-3 w-3" />
              </button>
            ) : null}
            {query.trim() ? (
              <button
                type="button"
                onClick={() =>
                  startTransition(() => {
                    setQuery('')
                    setVisibleCount(INITIAL_VISIBLE_COUNT)
                    updateUiUrl(section, category, '')
                  })
                }
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
                  updateUiUrl(item.id, 'all', query)
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
                updateUiUrl(section, 'all', query)
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
                  updateUiUrl(section, item.id, query)
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
          <aside className="custom-scrollbar hidden w-72 shrink-0 self-start lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
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

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                  {category === 'all' ? 'Browse categories' : collections.find(item => item.id === category)?.label || 'Components'}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {category === 'all'
                    ? `${visibleCollections.length} categories available`
                    : `${filteredItems.length} components in this category`}
                </p>
              </div>
              {category !== 'all' ? (
                <button
                  type="button"
                  onClick={() =>
                    startTransition(() => {
                      setCategory('all')
                      setVisibleCount(INITIAL_VISIBLE_COUNT)
                      updateUiUrl(section, 'all', query)
                    })
                  }
                  className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 sm:inline-flex"
                >
                  View categories
                </button>
              ) : null}
            </div>

            {!hydrated || isFiltering ? (
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))}
              </div>
            ) : category === 'all' && !query.trim() ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleCollections.map(collection => (
                  <CategoryCard key={collection.id} collection={collection} onSelect={selectCollection} />
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
                  onClick={resetUiFilters}
                  className="mt-8 text-sm font-bold text-blue-600 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {visibleItems.map(item => (
                    <ComponentPreviewRow
                      key={item.id}
                      effect={item}
                      copied={copiedId === item.id}
                      onCopy={handleCopy}
                    />
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
              <div className="custom-scrollbar flex-1 overflow-y-auto p-6">{FilterPanel}</div>
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

  async function handleCopy(effect: UiLibraryItem) {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/ui/${effect.slug}`)
      setCopiedId(effect.id)
      window.setTimeout(() => setCopiedId(null), 1600)
    } catch {}
  }
}
