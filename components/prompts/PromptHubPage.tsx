'use client'

import Link from 'next/link'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { track } from '@vercel/analytics'
import { ArrowUpDown, Bot, ChevronDown, ImageIcon, PlusCircle, Search, Shuffle, X } from 'lucide-react'
import PromptPreviewImage from '@/components/prompts/PromptPreviewImage'
import { getPromptCollectionHref, PROMPT_COLLECTIONS } from '@/lib/prompt-collections'
import type { PromptCategory, PromptCategoryId, PromptEntry, PromptModelId } from '@/lib/prompt-library-data'
import { cn } from '@/lib/utils'

type PromptSortMode = 'featured' | 'hot' | 'new' | 'top' | 'shuffle'

type PromptHubPageProps = {
  categories: PromptCategory[]
  models: PromptModelId[]
  featuredPrompts: PromptEntry[]
  filteredPrompts: PromptEntry[]
  activeCategory: 'all' | PromptCategoryId
  activeModel: 'all' | PromptModelId
  searchQuery: string
  sortMode: PromptSortMode
  shuffleSeed: string
  totalResults: number
  totalPrompts: number
  imagePrompts: number
}

const INITIAL_VISIBLE_COUNT = 24
const LOAD_MORE_COUNT = 24
const CARD_ASPECT_CLASSES = [
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[5/7]',
  'aspect-[1/1]',
  'aspect-[4/6]',
  'aspect-[9/12]',
] as const

const topTabs: Array<{
  label: string
  query?: string
  model?: 'all' | PromptModelId
  category?: 'all' | PromptCategoryId
  sort?: PromptSortMode
}> = [
  { label: 'Featured', sort: 'featured' },
  { label: 'Hot', sort: 'hot' },
  { label: 'New', sort: 'new' },
  { label: 'Top', sort: 'top' },
  { label: 'ChatGPT Image', model: 'ChatGPT', category: 'image-generation' },
  { label: 'Midjourney', model: 'Midjourney' },
  { label: 'Nano Banana', query: 'nano banana' },
  { label: 'Veo', query: 'veo video' },
  { label: 'Flux', model: 'Flux' },
  { label: 'Sora', query: 'sora video' },
  { label: 'Photography', query: 'photography' },
  { label: 'Anime', query: 'anime' },
  { label: 'Fashion', query: 'fashion' },
]

function buildPromptHref({
  category, model, query, sort, seed,
}: {
  category?: 'all' | PromptCategoryId
  model?: 'all' | PromptModelId
  query?: string
  sort?: PromptSortMode
  seed?: string
}) {
  const params = new URLSearchParams()
  if (query?.trim()) params.set('q', query.trim())
  if (category && category !== 'all') params.set('category', category)
  if (model && model !== 'all') params.set('model', model)
  if (sort && sort !== 'featured') params.set('sort', sort)
  if (sort === 'shuffle' && seed) params.set('seed', seed)
  const s = params.toString()
  return s ? `/prompts?${s}` : '/prompts'
}

function getActiveTopTab({ searchQuery, activeModel, activeCategory, sortMode }: {
  searchQuery: string
  activeModel: 'all' | PromptModelId
  activeCategory: 'all' | PromptCategoryId
  sortMode: PromptSortMode
}) {
  if (!searchQuery && activeModel === 'all' && activeCategory === 'all') {
    return sortMode === 'featured' ? 'Featured' : sortMode[0].toUpperCase() + sortMode.slice(1)
  }
  const q = searchQuery.toLowerCase()
  const matched = topTabs.find(tab => {
    if (tab.query && tab.query.toLowerCase() === q) return true
    if (tab.model && tab.model === activeModel && (tab.category || 'all') === activeCategory) return true
    return false
  })
  return matched?.label || ''
}

function getShuffleScore(prompt: PromptEntry, seed: string) {
  let hash = 2166136261
  const input = `${seed}:${prompt.slug}:${prompt.title}`
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function sortPromptsForMode(prompts: PromptEntry[], sortMode: PromptSortMode, shuffleSeed: string) {
  const sorted = [...prompts]
  if (sortMode === 'shuffle') return sorted.sort((a, b) => getShuffleScore(a, shuffleSeed) - getShuffleScore(b, shuffleSeed))
  if (sortMode === 'new') return sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title))
  if (sortMode === 'top') return sorted.sort((a, b) => b.tags.length - a.tags.length || a.title.localeCompare(b.title))
  if (sortMode === 'hot') return sorted.sort((a, b) => {
    const as = Number(a.featured) * 4 + Number(a.previewImage.startsWith('http')) * 2 + a.models.length
    const bs = Number(b.featured) * 4 + Number(b.previewImage.startsWith('http')) * 2 + b.models.length
    return bs - as || a.title.localeCompare(b.title)
  })
  return sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title))
}

function isVideoPrompt(prompt: PromptEntry) {
  const h = [prompt.title, prompt.subcategory, prompt.visualStyle, ...prompt.tags, ...prompt.bestFor].join(' ').toLowerCase()
  return h.includes('video') || h.includes('veo') || h.includes('sora')
}

function getPromptCardAspectClass(prompt: PromptEntry) {
  let hash = 0
  const input = prompt.slug || prompt.title
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return CARD_ASPECT_CLASSES[hash % CARD_ASPECT_CLASSES.length]
}

const PromptCard = memo(function PromptCard({ prompt }: { prompt: PromptEntry }) {
  const isNew = !prompt.featured && prompt.updatedAt >= '2026-04-25'
  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      prefetch={false}
      onClick={() => track('Prompt Opened', { slug: prompt.slug, category: prompt.category, source: 'prompt_grid' })}
      className="group mb-3 inline-block w-full break-inside-avoid transition-transform duration-200 hover:-translate-y-0.5 sm:mb-4"
      aria-label={`Open ${prompt.title}`}
    >
      <div className={cn('relative w-full overflow-hidden rounded-xl bg-slate-100 shadow-[0_1px_0_rgba(15,23,42,0.05)] ring-1 ring-slate-200 transition duration-200 group-hover:ring-slate-400 dark:bg-slate-900 dark:ring-slate-800 dark:group-hover:ring-slate-600', getPromptCardAspectClass(prompt))}>
        <PromptPreviewImage
          src={prompt.previewImage}
          alt={prompt.previewAlt}
          category={prompt.category}
          imageFit="cover"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />

        {/* Badge */}
        {prompt.featured ? (
          <span className="absolute left-2 top-2 rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950/90 dark:text-slate-100 dark:ring-slate-700">
            Featured
          </span>
        ) : isNew ? (
          <span className="absolute left-2 top-2 rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950/90 dark:text-slate-100 dark:ring-slate-700">
            New
          </span>
        ) : null}

        {/* Video play icon */}
        {isVideoPrompt(prompt) ? (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white">
            <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
          </span>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-1 p-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          <h3 className="line-clamp-2 text-sm font-medium leading-5 text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.78)]">
            {prompt.title}
          </h3>
        </div>
      </div>

      <div className="px-0.5 pt-1.5 sm:hidden">
        <h3 className="line-clamp-2 text-[12px] font-medium leading-4 tracking-[-0.01em] text-slate-800 dark:text-slate-100">{prompt.title}</h3>
      </div>
    </Link>
  )
})

function FilterMenu({ label, icon, children, align = 'left' }: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={cn(
          'inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold transition ring-1 sm:h-9 sm:px-3 sm:text-xs',
          'bg-white text-slate-800 ring-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-200 dark:ring-slate-800 dark:hover:bg-slate-900'
        )}
      >
        {icon}
        {label}
        <ChevronDown className={cn('h-3.5 w-3.5 text-slate-400 transition', open && 'rotate-180')} />
      </button>

      {open ? (
        <>
          <button type="button" aria-label="Close" className="fixed inset-0 z-[90] cursor-default" onClick={() => setOpen(false)} />
          <div className={cn(
            'fixed left-3 right-3 top-32 z-[110] max-h-[58dvh] overflow-y-auto rounded-xl bg-white ring-1 ring-slate-200 shadow-2xl [scrollbar-width:thin] dark:bg-slate-950 dark:ring-slate-800',
            'sm:absolute sm:inset-auto sm:top-11 sm:max-h-[420px] sm:w-60 sm:overflow-y-auto',
            align === 'right' ? 'sm:right-0 sm:left-auto' : 'sm:left-0'
          )}>
            {children}
          </div>
        </>
      ) : null}
    </div>
  )
}

function FilterOption({ href, label, active, analyticsLabel }: {
  href: string; label: string; active?: boolean; analyticsLabel?: string
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={() => { if (analyticsLabel) track('Prompt Filter Changed', { filter: analyticsLabel, label }) }}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900',
        active && 'bg-slate-100 text-slate-950 font-semibold dark:bg-slate-900 dark:text-white'
      )}
    >
      <span className={cn('h-3.5 w-3.5 shrink-0 rounded-[4px] ring-1 ring-slate-300 dark:ring-slate-700', active && 'bg-slate-950 ring-slate-950 dark:bg-white dark:ring-white')} />
      {label}
    </Link>
  )
}

export default function PromptHubPage({
  categories, models, filteredPrompts,
  activeCategory, activeModel, searchQuery,
  sortMode, shuffleSeed, totalResults, totalPrompts, imagePrompts,
}: PromptHubPageProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [nextShuffleSeed, setNextShuffleSeed] = useState(shuffleSeed)
  const loaderRef = useRef<HTMLDivElement>(null)
  const activeTopTab = getActiveTopTab({ searchQuery, activeModel, activeCategory, sortMode })

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [activeCategory, activeModel, searchQuery, sortMode, shuffleSeed])

  useEffect(() => {
    setNextShuffleSeed(`${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`)
  }, [shuffleSeed])

  const libraryPrompts = useMemo(
    () => sortPromptsForMode(filteredPrompts, sortMode, shuffleSeed),
    [filteredPrompts, sortMode, shuffleSeed]
  )
  const visiblePrompts = useMemo(() => libraryPrompts.slice(0, visibleCount), [libraryPrompts, visibleCount])
  const hasMore = visibleCount < libraryPrompts.length
  const currentShuffleSeed = sortMode === 'shuffle' ? shuffleSeed : undefined
  const shuffleHref = buildPromptHref({ category: activeCategory, model: activeModel, query: searchQuery, sort: 'shuffle', seed: nextShuffleSeed })

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(c => Math.min(c + LOAD_MORE_COUNT, libraryPrompts.length))
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasMore, libraryPrompts.length])

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">

      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex w-full max-w-[1880px] gap-5 overflow-x-auto px-3 py-2 [scrollbar-width:none] sm:gap-6 sm:px-6 sm:py-2.5 [&::-webkit-scrollbar]:hidden">
          {topTabs.map(tab => {
            const href = buildPromptHref({
              category: tab.category || 'all', model: tab.model || 'all',
              query: tab.query, sort: tab.sort,
              seed: tab.sort === 'shuffle' ? nextShuffleSeed : undefined,
            })
            const active = activeTopTab === tab.label
            return (
              <Link
                key={tab.label}
                href={href}
                prefetch={false}
                className={cn(
                  'shrink-0 text-[13px] font-semibold transition-colors',
                  active ? 'text-slate-950 dark:text-white' : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-4 py-6 text-center sm:px-6 sm:py-12">
          <h1 className="text-[32px] font-black leading-none tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl">
            Free AI Prompts
          </h1>
          <p className="mx-auto mt-3 hidden max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:block">
            Browse free copy-ready AI prompts for images, edits, ChatGPT, Nano Banana, Midjourney, Flux, and creative workflows.
          </p>

          <form
            action="/prompts"
            method="get"
            onSubmit={e => {
              const data = new FormData(e.currentTarget)
              track('Prompt Search Submitted', { query: String(data.get('q') || '').slice(0, 80) })
            }}
            className="mx-auto mt-5 flex max-w-2xl items-center gap-2 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 sm:mt-7"
          >
            <Search className="ml-2.5 h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search AI prompts..."
              className="h-10 min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 dark:text-white sm:h-11"
            />
            {activeCategory !== 'all' ? <input type="hidden" name="category" value={activeCategory} /> : null}
            {activeModel !== 'all' ? <input type="hidden" name="model" value={activeModel} /> : null}
            {sortMode !== 'featured' ? <input type="hidden" name="sort" value={sortMode} /> : null}
            {currentShuffleSeed ? <input type="hidden" name="seed" value={currentShuffleSeed} /> : null}
            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center rounded-full bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 sm:h-11 sm:px-5"
            >
              Search
            </button>
          </form>

          <div className="mx-auto mt-4 flex max-w-3xl gap-1.5 overflow-x-auto [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden">
            {PROMPT_COLLECTIONS.map(c => (
              <Link
                key={c.slug}
                href={getPromptCollectionHref(c.slug)}
                prefetch={false}
                onClick={() => track('Prompt Collection Clicked', { collection: c.slug })}
                className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-200 hover:text-slate-950 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800 dark:hover:text-white"
              >
                {c.shortTitle}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <p className="hidden text-xs font-medium text-slate-400 dark:text-slate-500 sm:block">
              {totalPrompts.toLocaleString()} prompts · {imagePrompts.toLocaleString()} visual
              {searchQuery || activeCategory !== 'all' || activeModel !== 'all'
                ? ` · ${totalResults.toLocaleString()} results` : ''}
            </p>
            <Link
              href={shuffleHref}
              prefetch={false}
              onClick={() => track('Prompt Shuffle Clicked', { category: activeCategory, model: activeModel, query: searchQuery || 'none' })}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Shuffle className="h-3.5 w-3.5" />
              Shuffle
            </Link>
          </div>
        </div>
      </section>

      <div className="sticky top-[38px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95 sm:top-[43px]">
        <div className="mx-auto flex w-full max-w-[1880px] items-center gap-1.5 overflow-x-auto px-3 py-2 [scrollbar-width:none] sm:gap-2 sm:px-6 [&::-webkit-scrollbar]:hidden">
          <FilterMenu label="Type" icon={<PlusCircle className="h-3.5 w-3.5" />}>
            <div className="py-1">
              <FilterOption href={buildPromptHref({ category: 'all', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })} label="All types" active={activeCategory === 'all'} analyticsLabel="type" />
              <FilterOption href={buildPromptHref({ category: 'image-generation', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })} label="AI images" active={activeCategory === 'image-generation'} analyticsLabel="type" />
              <FilterOption href={buildPromptHref({ category: 'image-editing', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })} label="Image editing" active={activeCategory === 'image-editing'} analyticsLabel="type" />
            </div>
          </FilterMenu>

          <FilterMenu label="Model" icon={<Bot className="h-3.5 w-3.5" />}>
            <div className="py-1">
              <FilterOption href={buildPromptHref({ category: activeCategory, model: 'all', query: searchQuery, sort: sortMode, seed: currentShuffleSeed })} label="All models" active={activeModel === 'all'} analyticsLabel="model" />
              {models.map(m => (
                <FilterOption key={m} href={buildPromptHref({ category: activeCategory, model: m, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })} label={m} active={activeModel === m} analyticsLabel="model" />
              ))}
            </div>
          </FilterMenu>

          <FilterMenu label="Category" icon={<PlusCircle className="h-3.5 w-3.5" />}>
            <div className="py-1">
              <FilterOption href={buildPromptHref({ category: 'all', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })} label="All categories" active={activeCategory === 'all'} analyticsLabel="category" />
              {categories.map(cat => (
                <FilterOption key={cat.id} href={buildPromptHref({ category: cat.id, model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })} label={cat.title.replace(' Prompts', '')} active={activeCategory === cat.id} analyticsLabel="category" />
              ))}
            </div>
          </FilterMenu>

          <FilterMenu label="Sort" icon={<ArrowUpDown className="h-3.5 w-3.5" />} align="right">
            <div className="py-1">
              {(['featured', 'hot', 'new', 'top', 'shuffle'] as const).map(mode => (
                <FilterOption
                  key={mode}
                  href={buildPromptHref({ category: activeCategory, model: activeModel, query: searchQuery, sort: mode, seed: mode === 'shuffle' ? nextShuffleSeed : undefined })}
                  label={mode === 'shuffle' ? 'Shuffle' : mode[0].toUpperCase() + mode.slice(1)}
                  active={sortMode === mode}
                  analyticsLabel="sort"
                />
              ))}
            </div>
          </FilterMenu>

          {searchQuery ? (
            <Link href={buildPromptHref({ category: activeCategory, model: activeModel, sort: sortMode })} className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-950 px-2.5 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
              &ldquo;{searchQuery}&rdquo; <X className="h-3 w-3" />
            </Link>
          ) : null}
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1880px] px-2 pb-16 pt-3 sm:px-4 sm:pt-6 lg:px-5">
        {visiblePrompts.length > 0 ? (
          <>
            <div className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4 xl:columns-5 2xl:columns-6">
              {visiblePrompts.map(prompt => (
                <PromptCard key={prompt.slug} prompt={prompt} />
              ))}
            </div>

            <div ref={loaderRef} className="flex justify-center py-8">
              {hasMore ? (
                <div className="h-1 w-1 opacity-0" aria-hidden="true" />
              ) : (
                <p className="text-xs font-medium text-slate-400 dark:text-slate-600">
                  All {libraryPrompts.length.toLocaleString()} prompts shown
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="mx-auto mt-10 max-w-sm rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <ImageIcon className="mx-auto h-8 w-8 text-slate-400" />
            <h2 className="mt-4 text-base font-bold text-slate-950 dark:text-white">No prompts found</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try another keyword, model, or category.</p>
            <Link href="/prompts" prefetch={false} className="mt-5 inline-flex rounded-lg bg-slate-950 px-5 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
              Reset filters
            </Link>
          </div>
        )}
      </main>

      <section className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">Common questions</h2>
          <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
            {[
              { q: 'What are free AI prompts?', a: 'Free AI prompts are ready-to-copy instructions for ChatGPT, image generators, Nano Banana, editing tools, and creative workflows.' },
              { q: 'How do I get better results?', a: 'Add your subject, style, lighting, format, and constraints. Then regenerate variations and keep the strongest output.' },
              { q: 'Which prompts are most popular?', a: 'Viral photo edits, Nano Banana prompts, ChatGPT writing prompts, product photos, portraits, and Instagram visuals get the highest demand.' },
            ].map(item => (
              <details key={item.q} className="group py-3">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-white">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
