'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { track } from '@vercel/analytics'
import { ArrowUpDown, Bot, ChevronDown, ImageIcon, PlusCircle, Search, Shuffle } from 'lucide-react'
import PromptPreviewImage from '@/components/prompts/PromptPreviewImage'
import { getPromptCollectionHref, PROMPT_COLLECTIONS } from '@/lib/prompt-collections'
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

const promptSearchSuggestions = [
  'portrait',
  'instagram',
  'viral photo',
  'anime',
  'product photo',
  'logo',
  'resume',
  'interior',
]

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
      onClick={() => {
        track('Prompt Opened', {
          slug: prompt.slug,
          category: prompt.category,
          source: 'prompt_grid',
        })
      }}
      className="group mb-3 block break-inside-avoid overflow-hidden rounded-[18px] bg-white text-slate-950 shadow-none ring-1 ring-slate-200/70 transition duration-200 hover:-translate-y-0.5 hover:ring-slate-300 dark:bg-slate-900 dark:text-white dark:ring-slate-800 dark:hover:ring-slate-700 sm:mb-4 sm:rounded-[15px]"
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
      <div className="p-3 sm:hidden">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-tight tracking-[-0.02em] text-slate-950 dark:text-white">
          {prompt.title}
        </h3>
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
        className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-2.5 text-[11px] font-semibold text-slate-900 shadow-[0_8px_28px_-22px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-100 dark:ring-slate-800 dark:hover:bg-slate-900 sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
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
            className="fixed inset-0 z-[90] cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              'fixed left-3 right-3 top-28 z-[110] max-h-[calc(100dvh-160px)] w-auto overflow-y-auto rounded-xl bg-white shadow-[0_22px_70px_-34px_rgba(15,23,42,0.55)] ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800 sm:absolute sm:inset-auto sm:top-12 sm:max-h-none sm:w-64 sm:overflow-visible',
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
      <Search className="h-3.5 w-3.5 text-slate-400 sm:h-4 sm:w-4" />
      <span className="text-xs font-medium text-slate-500 sm:text-sm">{label}</span>
    </div>
  )
}

function FilterOption({
  href,
  label,
  active,
  analyticsLabel,
}: {
  href: string
  label: string
  active?: boolean
  analyticsLabel?: string
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={() => {
        if (analyticsLabel) {
          track('Prompt Filter Changed', {
            filter: analyticsLabel,
            label,
          })
        }
      }}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900 sm:gap-3 sm:py-2.5 sm:text-sm',
        active && 'bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-white'
      )}
    >
      <span
        className={cn(
          'h-3.5 w-3.5 rounded-[5px] ring-1 ring-slate-300 dark:ring-slate-700 sm:h-4 sm:w-4',
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

      <section className="relative overflow-visible">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] bg-[size:24px_24px] opacity-55 dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_62%)]" />

        <div className="relative mx-auto max-w-5xl px-4 pb-6 pt-5 text-center sm:px-6 sm:pb-8 sm:pt-6 md:pb-10 md:pt-8">
          <h1 className="text-[34px] font-black leading-none tracking-[-0.055em] text-slate-900 dark:text-white sm:text-6xl sm:tracking-[-0.07em] md:text-7xl">
            Free AI Prompts
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm font-medium leading-6 text-slate-500 sm:mt-4 sm:text-xl sm:leading-8 dark:text-slate-400">
            Browse free copy-ready AI prompts for images, editing, ChatGPT, and creative workflows.
          </p>

          <form
            action="/prompts"
            method="get"
            onSubmit={event => {
              const data = new FormData(event.currentTarget)
              track('Prompt Search Submitted', {
                query: String(data.get('q') || '').slice(0, 80),
              })
            }}
            className="mx-auto mt-6 flex max-w-3xl items-center gap-1.5 rounded-full bg-white p-1.5 shadow-[0_20px_70px_-32px_rgba(99,102,241,0.55)] ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800 sm:mt-8 sm:gap-2 sm:p-2"
          >
            <Search className="ml-3 h-4 w-4 shrink-0 text-slate-400 sm:ml-4 sm:h-5 sm:w-5" />
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search AI prompts..."
              className="h-10 min-w-0 flex-1 border-0 bg-transparent text-[13px] font-medium text-slate-950 outline-none placeholder:text-slate-400 dark:text-white sm:h-12 sm:text-lg"
            />
            {activeCategory !== 'all' ? <input type="hidden" name="category" value={activeCategory} /> : null}
            {activeModel !== 'all' ? <input type="hidden" name="model" value={activeModel} /> : null}
            {sortMode !== 'featured' ? <input type="hidden" name="sort" value={sortMode} /> : null}
            {currentShuffleSeed ? <input type="hidden" name="seed" value={currentShuffleSeed} /> : null}
            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-slate-950 px-3.5 text-xs font-extrabold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:h-12 sm:px-8 sm:text-base"
            >
              Search
            </button>
          </form>

          <div className="mx-auto mt-3 flex max-w-4xl gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] sm:mt-4 sm:flex-wrap sm:justify-center sm:gap-2 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {PROMPT_COLLECTIONS.map(collection => (
              <Link
                key={collection.slug}
                href={getPromptCollectionHref(collection.slug)}
                prefetch={false}
                onClick={() => {
                  track('Prompt Collection Clicked', {
                    collection: collection.slug,
                  })
                }}
                className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-slate-200 transition hover:bg-white hover:text-slate-950 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800 dark:hover:text-white sm:px-3 sm:py-1.5 sm:text-xs"
              >
                {collection.shortTitle}
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-2 flex max-w-4xl gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-2 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {promptSearchSuggestions.map(suggestion => (
              <Link
                key={suggestion}
                href={buildPromptHref({ query: suggestion, category: 'all', model: 'all', sort: 'featured' })}
                prefetch={false}
                onClick={() => {
                  track('Prompt Suggestion Clicked', {
                    query: suggestion,
                  })
                }}
                className="shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200 sm:text-xs"
              >
                {suggestion}
              </Link>
            ))}
          </div>

          <div className="-mx-4 relative z-[80] mt-6 flex flex-nowrap items-center justify-start gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            <FilterMenu label="Type" icon={<PlusCircle className="h-4 w-4" />}>
              <FilterSearchHeader label="Type" />
              <div className="py-1">
                <FilterOption
                  href={buildPromptHref({ category: 'all', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="All prompts"
                  active={activeCategory === 'all'}
                  analyticsLabel="type"
                />
                <FilterOption
                  href={buildPromptHref({ category: 'image-generation', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="AI images"
                  active={activeCategory === 'image-generation'}
                  analyticsLabel="type"
                />
                <FilterOption
                  href={buildPromptHref({ category: 'image-editing', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="Image editing"
                  active={activeCategory === 'image-editing'}
                  analyticsLabel="type"
                />
              </div>
            </FilterMenu>

            <FilterMenu label="Model" icon={<Bot className="h-4 w-4" />}>
              <FilterSearchHeader label="Model" />
              <div className="py-1">
                <FilterOption
                  href={buildPromptHref({ category: activeCategory, model: 'all', query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="All models"
                  active={activeModel === 'all'}
                  analyticsLabel="model"
                />
                {models.map(model => (
                  <FilterOption
                    key={model}
                    href={buildPromptHref({ category: activeCategory, model, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                    label={model}
                    active={activeModel === model}
                    analyticsLabel="model"
                  />
                ))}
              </div>
            </FilterMenu>

            <FilterMenu label="Category" icon={<PlusCircle className="h-4 w-4" />}>
              <FilterSearchHeader label="Category" />
              <div className="py-1">
                <FilterOption
                  href={buildPromptHref({ category: 'all', model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                  label="All categories"
                  active={activeCategory === 'all'}
                  analyticsLabel="category"
                />
                {categories.map(category => (
                  <FilterOption
                    key={category.id}
                    href={buildPromptHref({ category: category.id, model: activeModel, query: searchQuery, sort: sortMode, seed: currentShuffleSeed })}
                    label={category.title.replace(' Prompts', '')}
                    active={activeCategory === category.id}
                    analyticsLabel="category"
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
                    analyticsLabel="sort"
                  />
                ))}
              </div>
            </FilterMenu>

          </div>

          <div className="mt-3 flex justify-center sm:mt-4">
            <Link
              href={shuffleHref}
              prefetch={false}
              onClick={() => {
                track('Prompt Shuffle Clicked', {
                  category: activeCategory,
                  model: activeModel,
                  query: searchQuery || 'none',
                })
              }}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:h-10 sm:px-6 sm:text-sm"
            >
              <Shuffle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Shuffle prompts
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] font-semibold text-slate-400 sm:mt-5 sm:gap-3 sm:text-xs">
            <span>{totalPrompts.toLocaleString()} prompts</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>{imagePrompts.toLocaleString()} visual prompts</span>
            {searchQuery || activeCategory !== 'all' || activeModel !== 'all' ? (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span>{totalResults.toLocaleString()} results</span>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <main className="relative z-0 mx-auto w-full max-w-[1880px] px-2.5 pb-12 sm:px-5 lg:px-6">
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
                  onClick={() => {
                    track('Prompt Load More Clicked', {
                      visibleCount,
                      total: libraryPrompts.length,
                    })
                    setVisibleCount(count => Math.min(count + LOAD_MORE_COUNT, libraryPrompts.length))
                  }}
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

      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <div className="grid gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200 dark:bg-slate-900/60 dark:ring-slate-800 sm:grid-cols-3 sm:p-4">
          {[
            {
              title: 'What are free AI prompts?',
              body: 'Free AI prompts are ready-to-copy instructions for ChatGPT, image generators, editing tools, and creative workflows.',
            },
            {
              title: 'How do I get better results?',
              body: 'Add your subject, style, lighting, format, and constraints. Then regenerate variations and keep the strongest output.',
            },
            {
              title: 'Which prompts are popular?',
              body: 'Viral photo edits, Nano Banana prompts, ChatGPT writing prompts, product photos, portraits, and Instagram visuals get high demand.',
            },
          ].map(item => (
            <details
              key={item.title}
              className="group rounded-xl bg-white p-3 ring-1 ring-slate-200 open:bg-slate-50 dark:bg-slate-950 dark:ring-slate-800 dark:open:bg-slate-900"
            >
              <summary className="cursor-pointer list-none text-sm font-bold text-slate-950 dark:text-white">
                {item.title}
              </summary>
              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.body}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
