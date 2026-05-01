'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { ArrowUpDown, Bot, ChevronDown, ImageIcon, PlusCircle, Search, Shuffle } from 'lucide-react'
import PromptPreviewImage from '@/components/prompts/PromptPreviewImage'
import type {
  PromptCategory,
  PromptCategoryId,
  PromptEntry,
  PromptModelId,
} from '@/lib/prompt-library-data'
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

const INITIAL_VISIBLE_COUNT = 48
const LOAD_MORE_COUNT = 48

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
  { label: 'Shuffle', sort: 'shuffle' },
  { label: 'Video', query: 'video' },
  { label: 'ChatGPT Image', model: 'ChatGPT', category: 'image-generation' },
  { label: 'Midjourney', model: 'Midjourney' },
  { label: 'Nano Banana', query: 'nano banana' },
  { label: 'Veo', query: 'veo video' },
  { label: 'Flux', model: 'Flux' },
  { label: 'Sora', query: 'sora video' },
  { label: 'Stable Diffusion', query: 'stable diffusion' },
  { label: 'Photography', query: 'photography' },
  { label: 'Anime', query: 'anime' },
  { label: 'Fashion', query: 'fashion' },
  { label: 'Architecture', query: 'architecture' },
]

const masonryAspects = [
  'aspect-[4/5]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[5/4]',
  'aspect-[7/9]',
  'aspect-[6/7]',
]

function buildPromptHref({
  category,
  model,
  query,
  sort,
  seed,
}: {
  category?: 'all' | PromptCategoryId
  model?: 'all' | PromptModelId
  query?: string
  sort?: PromptSortMode
  seed?: string
}) {
  const params = new URLSearchParams()

  if (query?.trim()) {
    params.set('q', query.trim())
  }

  if (category && category !== 'all') {
    params.set('category', category)
  }

  if (model && model !== 'all') {
    params.set('model', model)
  }

  if (sort && sort !== 'featured') {
    params.set('sort', sort)
  }

  if (sort === 'shuffle' && seed) {
    params.set('seed', seed)
  }

  const serialized = params.toString()
  return serialized ? `/prompts?${serialized}` : '/prompts'
}

function getStableIndex(value: string, length: number) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }
  return hash % length
}

function getActiveTopTab({
  searchQuery,
  activeModel,
  activeCategory,
  sortMode,
}: {
  searchQuery: string
  activeModel: 'all' | PromptModelId
  activeCategory: 'all' | PromptCategoryId
  sortMode: PromptSortMode
}) {
  if (!searchQuery && activeModel === 'all' && activeCategory === 'all') {
    return sortMode === 'featured' ? 'Featured' : sortMode[0].toUpperCase() + sortMode.slice(1)
  }

  const normalizedQuery = searchQuery.toLowerCase()
  const matched = topTabs.find(tab => {
    if (tab.query && tab.query.toLowerCase() === normalizedQuery) return true
    if (tab.model && tab.model === activeModel && (tab.category || 'all') === activeCategory) return true
    return false
  })

  return matched?.label || ''
}

function getShuffleScore(prompt: PromptEntry, seed: string) {
  let hash = 2166136261
  const input = `${seed}:${prompt.slug}:${prompt.title}`

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function sortPromptsForMode(prompts: PromptEntry[], sortMode: PromptSortMode, shuffleSeed: string) {
  const sorted = [...prompts]

  if (sortMode === 'shuffle') {
    return sorted.sort((left, right) => getShuffleScore(left, shuffleSeed) - getShuffleScore(right, shuffleSeed))
  }

  if (sortMode === 'new') {
    return sorted.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.title.localeCompare(right.title))
  }

  if (sortMode === 'top') {
    return sorted.sort((left, right) => right.tags.length - left.tags.length || left.title.localeCompare(right.title))
  }

  if (sortMode === 'hot') {
    return sorted.sort((left, right) => {
      const leftScore = Number(left.featured) * 4 + Number(left.previewImage.startsWith('http')) * 2 + left.models.length
      const rightScore = Number(right.featured) * 4 + Number(right.previewImage.startsWith('http')) * 2 + right.models.length
      return rightScore - leftScore || left.title.localeCompare(right.title)
    })
  }

  return sorted.sort((left, right) => Number(right.featured) - Number(left.featured) || left.title.localeCompare(right.title))
}

function isVideoPrompt(prompt: PromptEntry) {
  const haystack = [prompt.title, prompt.subcategory, prompt.visualStyle, ...prompt.tags, ...prompt.bestFor]
    .join(' ')
    .toLowerCase()
  return haystack.includes('video') || haystack.includes('veo') || haystack.includes('sora')
}

function PromptShowcaseCard({ prompt }: { prompt: PromptEntry }) {
  const aspect = masonryAspects[getStableIndex(prompt.slug, masonryAspects.length)]
  const featuredLabel = prompt.featured ? 'Featured' : prompt.updatedAt >= '2026-04-25' ? 'New' : ''

  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      prefetch={false}
      className="group mb-2.5 block break-inside-avoid overflow-hidden rounded-xl bg-slate-100 shadow-none ring-1 ring-slate-200/70 transition duration-200 hover:-translate-y-0.5 hover:ring-slate-300 dark:bg-slate-900 dark:ring-slate-800 dark:hover:ring-slate-700 sm:mb-4 sm:rounded-[15px]"
      aria-label={`Open ${prompt.title}`}
    >
      <div className={cn('relative overflow-hidden bg-white dark:bg-slate-950', aspect)}>
        <PromptPreviewImage
          src={prompt.previewImage}
          alt={prompt.previewAlt}
          category={prompt.category}
          imageFit="cover"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.025]"
        />

        {featuredLabel ? (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-slate-800 shadow-sm ring-1 ring-black/5 backdrop-blur dark:bg-slate-950/85 dark:text-slate-100 sm:left-2.5 sm:top-2.5 sm:px-2 sm:py-1 sm:text-[10px]">
            {featuredLabel}
          </span>
        ) : null}

        {isVideoPrompt(prompt) ? (
          <span className="absolute left-1/2 top-1/2 inline-flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/72 text-white shadow-lg backdrop-blur sm:h-11 sm:w-11">
            <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white sm:border-y-[8px] sm:border-l-[12px]" />
          </span>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 bg-gradient-to-t from-black/72 via-black/24 to-transparent p-3 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white drop-shadow">{prompt.title}</h3>
          <p className="mt-1 line-clamp-1 text-[11px] font-medium text-white/75">{prompt.subcategory}</p>
        </div>
      </div>
    </Link>
  )
}

function FilterMenu({
  label,
  icon,
  children,
  align = 'center',
}: {
  label: string
  icon: ReactNode
  children: ReactNode
  align?: 'center' | 'right'
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-slate-900 shadow-[0_8px_28px_-22px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-100 dark:ring-slate-800 dark:hover:bg-slate-900 sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
      >
        {icon}
        {label}
        <ChevronDown className={cn('h-4 w-4 text-slate-400 transition', open && 'rotate-180')} />
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close filter"
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              'fixed left-3 right-3 top-28 z-30 max-h-[70vh] w-auto overflow-hidden rounded-xl bg-white shadow-[0_22px_70px_-34px_rgba(15,23,42,0.55)] ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800 sm:absolute sm:inset-auto sm:top-12 sm:max-h-none sm:w-64',
              align === 'right' ? 'sm:right-0' : 'sm:left-1/2 sm:-translate-x-1/2'
            )}
          >
            {children}
          </div>
        </>
      ) : null}
    </div>
  )
}

function FilterSearchHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 dark:border-slate-800">
      <Search className="h-4 w-4 text-slate-400" />
      <span className="text-sm font-medium text-slate-500">{label}</span>
    </div>
  )
}

function FilterOption({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900',
        active && 'bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-white'
      )}
    >
      <span
        className={cn(
          'h-4 w-4 rounded-[5px] ring-1 ring-slate-300 dark:ring-slate-700',
          active && 'bg-slate-950 ring-slate-950 dark:bg-white dark:ring-white'
        )}
      />
      <span>{label}</span>
    </Link>
  )
}

export default function PromptHubPage({
  categories,
  models,
  filteredPrompts,
  activeCategory,
  activeModel,
  searchQuery,
  sortMode,
  shuffleSeed,
  totalResults,
  totalPrompts,
  imagePrompts,
}: PromptHubPageProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [nextShuffleSeed, setNextShuffleSeed] = useState(shuffleSeed)
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
  const visiblePrompts = useMemo(
    () => libraryPrompts.slice(0, visibleCount),
    [libraryPrompts, visibleCount]
  )
  const hasMore = visibleCount < libraryPrompts.length
  const currentShuffleSeed = sortMode === 'shuffle' ? shuffleSeed : undefined
  const shuffleHref = buildPromptHref({
    category: activeCategory,
    model: activeModel,
    query: searchQuery,
    sort: 'shuffle',
    seed: nextShuffleSeed,
  })

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <div className="border-b border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex w-full max-w-[1880px] gap-4 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:gap-6 sm:px-6 sm:py-3 [&::-webkit-scrollbar]:hidden">
          {topTabs.map(tab => {
            const href = buildPromptHref({
              category: tab.category || 'all',
              model: tab.model || 'all',
              query: tab.query,
              sort: tab.sort,
              seed: tab.sort === 'shuffle' ? nextShuffleSeed : undefined,
            })
            const active = activeTopTab === tab.label

            return (
              <Link
                key={tab.label}
                href={href}
                prefetch={false}
                className={cn(
                  'shrink-0 text-[13px] font-semibold text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white sm:text-sm',
                  active && 'text-slate-950 dark:text-white'
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] bg-[size:24px_24px] opacity-55 dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_62%)]" />

        <div className="relative mx-auto max-w-5xl px-4 pb-6 pt-5 text-center sm:px-6 sm:pb-8 sm:pt-6 md:pb-10 md:pt-8">
          <h1 className="text-4xl font-black tracking-[-0.06em] text-slate-900 dark:text-white sm:text-6xl sm:tracking-[-0.07em] md:text-7xl">
            AI Prompts
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm font-medium leading-6 text-slate-500 sm:mt-4 sm:text-xl sm:leading-8 dark:text-slate-400">
            Discover high-quality AI image prompts, editing ideas, and copy-ready creative workflows.
          </p>

          <form
            action="/prompts"
            method="get"
            className="mx-auto mt-6 flex max-w-3xl items-center gap-1.5 rounded-full bg-white p-1.5 shadow-[0_20px_70px_-32px_rgba(99,102,241,0.55)] ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800 sm:mt-8 sm:gap-2 sm:p-2"
          >
            <Search className="ml-3 h-4 w-4 shrink-0 text-slate-400 sm:ml-4 sm:h-5 sm:w-5" />
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search AI prompts..."
              className="h-11 min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 dark:text-white sm:h-12 sm:text-lg"
            />
            {activeCategory !== 'all' ? <input type="hidden" name="category" value={activeCategory} /> : null}
            {activeModel !== 'all' ? <input type="hidden" name="model" value={activeModel} /> : null}
            {sortMode !== 'featured' ? <input type="hidden" name="sort" value={sortMode} /> : null}
            {currentShuffleSeed ? <input type="hidden" name="seed" value={currentShuffleSeed} /> : null}
            <button
              type="submit"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-extrabold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:h-12 sm:px-8 sm:text-base"
            >
              Search
            </button>
          </form>

          <div className="-mx-4 mt-6 flex flex-nowrap items-center justify-start gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            <FilterMenu label="Type" icon={<PlusCircle className="h-4 w-4" />}>
              <FilterSearchHeader label="Type" />
              <div className="max-h-80 overflow-y-auto py-1">
                <FilterOption
                  href={buildPromptHref({ category: 'all', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="All prompts"
                  active={activeCategory === 'all'}
                />
                <FilterOption
                  href={buildPromptHref({ category: 'image-generation', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="AI images"
                  active={activeCategory === 'image-generation'}
                />
                <FilterOption
                  href={buildPromptHref({ category: 'image-editing', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="Image editing"
                  active={activeCategory === 'image-editing'}
                />
              </div>
            </FilterMenu>

            <FilterMenu label="Model" icon={<Bot className="h-4 w-4" />}>
              <FilterSearchHeader label="Model" />
              <div className="max-h-80 overflow-y-auto py-1">
                <FilterOption
                  href={buildPromptHref({ category: activeCategory, model: 'all', query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="All models"
                  active={activeModel === 'all'}
                />
                {models.map(model => (
                  <FilterOption
                    key={model}
                    href={buildPromptHref({ category: activeCategory, model, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                    label={model}
                    active={activeModel === model}
                  />
                ))}
              </div>
            </FilterMenu>

            <FilterMenu label="Category" icon={<PlusCircle className="h-4 w-4" />}>
              <FilterSearchHeader label="Category" />
              <div className="max-h-96 overflow-y-auto py-1">
                <FilterOption
                  href={buildPromptHref({ category: 'all', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="All categories"
                  active={activeCategory === 'all'}
                />
                {categories.map(category => (
                  <FilterOption
                    key={category.id}
                    href={buildPromptHref({ category: category.id, model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                    label={category.title.replace(' Prompts', '')}
                    active={activeCategory === category.id}
                  />
                ))}
              </div>
            </FilterMenu>

            <FilterMenu label="Sort" icon={<ArrowUpDown className="h-4 w-4" />} align="right">
              <FilterSearchHeader label="Sort" />
              <div className="py-1">
                {(['featured', 'hot', 'new', 'top', 'shuffle'] as const).map(mode => (
                  <FilterOption
                    key={mode}
                    href={buildPromptHref({
                      category: activeCategory,
                      model: activeModel,
                      query: searchQuery,
                      sort: mode,
                      seed: mode === 'shuffle' ? nextShuffleSeed : undefined,
                    })}
                    label={mode === 'shuffle' ? 'Shuffle feed' : mode[0].toUpperCase() + mode.slice(1)}
                    active={sortMode === mode}
                  />
                ))}
              </div>
            </FilterMenu>
          </div>

          {sortMode === 'shuffle' ? (
            <div className="mx-auto mt-4 max-w-4xl sm:mt-5">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 sm:text-sm">
                Discover random prompts. Refresh for a new adventure.
              </p>
              <Link
                href={shuffleHref}
                prefetch={false}
                className="mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-bold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-950 dark:text-white dark:ring-slate-800 dark:hover:bg-slate-900 sm:mt-3 sm:h-12"
              >
                <Shuffle className="h-4 w-4 text-slate-500" />
                Shuffle Feed
              </Link>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] font-semibold text-slate-400 sm:mt-5 sm:gap-3 sm:text-xs">
            <span>{totalPrompts.toLocaleString()} prompts</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>{imagePrompts.toLocaleString()} visual prompts</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>{totalResults.toLocaleString()} results</span>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1880px] px-2.5 pb-12 sm:px-5 lg:px-6">
        {visiblePrompts.length > 0 ? (
          <>
            <div className="columns-2 gap-2.5 sm:columns-3 sm:gap-4 lg:columns-4 xl:columns-5 2xl:columns-6">
              {visiblePrompts.map(prompt => (
                <PromptShowcaseCard key={prompt.slug} prompt={prompt} />
              ))}
            </div>

            {hasMore ? (
              <div className="flex justify-center pt-5">
                <button
                  type="button"
                  onClick={() => setVisibleCount(count => Math.min(count + LOAD_MORE_COUNT, libraryPrompts.length))}
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  Load more prompts
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <ImageIcon className="mx-auto h-8 w-8 text-slate-400" />
            <h2 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">No prompts found</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Try another keyword, model, or category.
            </p>
            <Link
              href="/prompts"
              prefetch={false}
              className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
            >
              Reset filters
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
