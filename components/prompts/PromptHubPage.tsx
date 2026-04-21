'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  Bot,
  Briefcase,
  Code2,
  GraduationCap,
  ImageIcon,
  Search,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import PromptPreviewImage from '@/components/prompts/PromptPreviewImage'
import type {
  PromptCategory,
  PromptCategoryId,
  PromptEntry,
  PromptModelId,
} from '@/lib/prompt-library-data'
import { cn } from '@/lib/utils'

type PromptHubPageProps = {
  categories: PromptCategory[]
  models: PromptModelId[]
  featuredPrompts: PromptEntry[]
  filteredPrompts: PromptEntry[]
  activeCategory: 'all' | PromptCategoryId
  activeModel: 'all' | PromptModelId
  searchQuery: string
  totalResults: number
  totalPrompts: number
  imagePrompts: number
}

const FEATURED_LIMIT = 6
const INITIAL_VISIBLE_COUNT = 20
const LOAD_MORE_COUNT = 20

function buildPromptHref({
  category,
  model,
  query,
}: {
  category?: 'all' | PromptCategoryId
  model?: 'all' | PromptModelId
  query?: string
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

  const serialized = params.toString()
  return serialized ? `/prompts?${serialized}` : '/prompts'
}

function getCategoryIcon(category: PromptCategoryId) {
  switch (category) {
    case 'writing':
      return Sparkles
    case 'work':
      return Briefcase
    case 'coding':
      return Code2
    case 'career':
      return Briefcase
    case 'study':
      return GraduationCap
    case 'research':
      return Sparkles
    case 'image-generation':
      return WandSparkles
    case 'image-editing':
      return ImageIcon
    default:
      return Sparkles
  }
}

function PromptShowcaseCard({ prompt }: { prompt: PromptEntry }) {
  const status = prompt.featured ? 'Featured' : prompt.id.startsWith('prompt-v2-') ? 'New' : null

  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      prefetch={false}
      className="group overflow-hidden rounded-xl border border-border/80 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_40px_-24px_rgba(15,23,42,0.16)] dark:hover:border-slate-700"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-white dark:bg-slate-950">
        <PromptPreviewImage
          src={prompt.previewImage}
          alt={prompt.previewAlt}
          category={prompt.category}
          imageFit="contain"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {status ? (
          <div className="absolute left-2.5 top-2.5">
            <span className="inline-flex items-center rounded-full bg-white/92 px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-950/90 dark:text-slate-200 dark:ring-slate-800">
              {status}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">{prompt.title}</h3>
        <span className="shrink-0 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
          Open
        </span>
      </div>
    </Link>
  )
}

function PromptSection({
  title,
  prompts,
}: {
  title: string
  prompts: PromptEntry[]
}) {
  if (prompts.length === 0) return null

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold tracking-tight text-foreground md:text-xl">{title}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {prompts.map(prompt => (
          <PromptShowcaseCard key={prompt.slug} prompt={prompt} />
        ))}
      </div>
    </section>
  )
}

export default function PromptHubPage({
  categories,
  models,
  featuredPrompts,
  filteredPrompts,
  activeCategory,
  activeModel,
  searchQuery,
  totalResults,
  totalPrompts,
  imagePrompts,
}: PromptHubPageProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const isFilteredView = Boolean(searchQuery || activeCategory !== 'all' || activeModel !== 'all')

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [activeCategory, activeModel, searchQuery])

  const heroPrompts = useMemo(() => featuredPrompts.slice(0, FEATURED_LIMIT), [featuredPrompts])
  const visiblePrompts = useMemo(
    () => filteredPrompts.slice(0, visibleCount),
    [filteredPrompts, visibleCount]
  )
  const hasMore = visibleCount < filteredPrompts.length

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden border-b border-border bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.14),transparent_58%)]" />
        <div className="page-content py-7 md:py-9">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Prompt Hub
            </div>
            <h1 className="text-2xl font-black tracking-tight text-foreground md:text-4xl">
              Better prompts, cleaner visual previews
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Browse practical prompts for work, coding, and AI image generation without the clutter.
            </p>
          </div>

          <form action="/prompts" method="get" className="mx-auto mt-6 flex max-w-2xl items-center gap-2 rounded-xl border border-border bg-card p-2">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search prompts..."
                className="h-10 w-full rounded-lg border-0 bg-transparent pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            {activeCategory !== 'all' ? <input type="hidden" name="category" value={activeCategory} /> : null}
            {activeModel !== 'all' ? <input type="hidden" name="model" value={activeModel} /> : null}
            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
            >
              Search
            </button>
          </form>

          <div className="mx-auto mt-4 flex max-w-5xl flex-wrap justify-center gap-2">
            <Link
              href={buildPromptHref({ category: 'all', model: activeModel, query: searchQuery })}
              prefetch={false}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                activeCategory === 'all'
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              All
            </Link>
            {categories.map(category => {
              const Icon = getCategoryIcon(category.id)
              return (
                <Link
                  key={category.id}
                  href={buildPromptHref({ category: category.id, model: activeModel, query: searchQuery })}
                  prefetch={false}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                    activeCategory === category.id
                      ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {category.title.replace(' Prompts', '')}
                </Link>
              )
            })}
          </div>

          <div className="mx-auto mt-2 flex max-w-5xl flex-wrap justify-center gap-2">
            <Link
              href={buildPromptHref({ category: activeCategory, model: 'all', query: searchQuery })}
              prefetch={false}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors',
                activeModel === 'all'
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              )}
            >
              <Bot className="h-3 w-3" />
              All models
            </Link>
            {models.map(model => (
              <Link
                key={model}
                href={buildPromptHref({ category: activeCategory, model, query: searchQuery })}
                prefetch={false}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors',
                  activeModel === model
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                )}
              >
                <Bot className="h-3 w-3" />
                {model}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-muted-foreground">
            <span>{totalPrompts} prompts</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-flex" />
            <span>{imagePrompts} visual prompts</span>
            {isFilteredView ? (
              <>
                <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-flex" />
                <span>{totalResults} results</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="page-content space-y-8 py-6">
        {!isFilteredView ? <PromptSection title="Featured prompts" prompts={heroPrompts} /> : null}

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground md:text-xl">
                {isFilteredView ? 'Filtered prompts' : 'Prompt library'}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {totalResults > 0 ? `${visiblePrompts.length} of ${totalResults} prompts visible.` : 'No prompts found.'}
              </p>
            </div>
          </div>

          {visiblePrompts.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                {visiblePrompts.map(prompt => (
                  <PromptShowcaseCard key={prompt.slug} prompt={prompt} />
                ))}
              </div>

              {hasMore ? (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setVisibleCount(count => Math.min(count + LOAD_MORE_COUNT, filteredPrompts.length))}
                    className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                  >
                    Load more
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground">No prompts found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different keyword, model, or category.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
