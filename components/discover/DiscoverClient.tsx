'use client'

import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Award,
  ChevronRight,
  Clapperboard,
  Compass,
  Film,
  ListChecks,
  Music2,
  PlayCircle,
  Popcorn,
  Sparkles,
  Star,
  Tv,
  Users,
} from 'lucide-react'
import { DISCOVER_SCALE_PLAN, DiscoverList } from '@/lib/discover-data'
import { cn } from '@/lib/utils'

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Clapperboard,
  Compass,
  Film,
  ListChecks,
  Music2,
  PlayCircle,
  Popcorn,
  Sparkles,
  Tv,
  Users,
}

function getIntentLabel(title: string) {
  const normalized = title.toLowerCase()

  if (normalized.startsWith('how to fix')) return 'How to Fix'
  if (normalized.startsWith('how to start')) return 'How to Start'
  if (normalized.startsWith('what is')) return 'What Is'
  if (normalized.includes(' vs ') || normalized.includes('which is better')) return 'Comparison'
  if (normalized.startsWith('tips for')) return 'Tips'
  if (normalized.startsWith('free ')) return 'Free'
  if (normalized.startsWith('top ') || normalized.startsWith('best ')) return 'Ranking'
  if (normalized.startsWith('how to ')) return 'How to'
  return 'Discover'
}

export default function DiscoverClient({ lists }: { lists: DiscoverList[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeIntent, setActiveIntent] = useState('All')

  const categories = useMemo(() => {
    const values = Array.from(new Set(lists.map(list => list.category)))
    return ['All', ...values]
  }, [lists])

  const intents = useMemo(() => {
    const values = Array.from(new Set(lists.map(list => getIntentLabel(list.title))))
    return ['All', ...values]
  }, [lists])

  const visibleLists = useMemo(() => {
    return lists.filter(list => {
      const categoryMatches = activeCategory === 'All' || list.category === activeCategory
      const intentMatches = activeIntent === 'All' || getIntentLabel(list.title) === activeIntent
      return categoryMatches && intentMatches
    })
  }, [activeCategory, activeIntent, lists])

  const featuredLists = useMemo(() => lists.filter(list => list.featured).slice(0, 3), [lists])
  const categoryCount = categories.length - 1
  const intentCount = intents.length - 1

  return (
    <div className="min-h-screen">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-lg shadow-slate-900/15 dark:bg-slate-100">
              <Compass className="h-5 w-5 text-white dark:text-slate-950" />
            </div>
            <span className="section-label">Discover</span>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">Curated Rankings And Watch Guides</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Explore editorial rankings, explainers, comparisons, and practical guides across AI, money, mobile
            problems, apps, business, health, politics, history, space, games, and entertainment.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                  activeCategory === category
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {intents.map(intent => (
              <button
                key={intent}
                type="button"
                onClick={() => setActiveIntent(intent)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                  activeIntent === intent
                    ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-slate-950'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                )}
              >
                {intent}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Published Lists</p>
            <p className="mt-2 text-3xl font-black tracking-tight">{lists.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Ranking Pages</p>
            <p className="mt-2 text-3xl font-black tracking-tight">{lists.filter(list => list.type === 'ranking').length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Guide Pages</p>
            <p className="mt-2 text-3xl font-black tracking-tight">{lists.filter(list => list.type === 'guide').length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Starter Scale Plan</p>
            <p className="mt-2 text-3xl font-black tracking-tight">{DISCOVER_SCALE_PLAN.targetLists}+</p>
          </div>
        </div>

        <div className="mb-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Categories Covered</p>
            <p className="mt-2 text-3xl font-black tracking-tight">{categoryCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Search Intents</p>
            <p className="mt-2 text-3xl font-black tracking-tight">{intentCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Featured Editorials</p>
            <p className="mt-2 text-3xl font-black tracking-tight">{featuredLists.length}</p>
          </div>
        </div>

        {featuredLists.length > 0 ? (
          <section className="mb-6 rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <Award className="h-4 w-4 text-yellow-500" />
              Featured editorial picks
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {featuredLists.map(list => (
                <Link
                  key={list.slug}
                  href={`/discover/${list.slug}`}
                  className="rounded-2xl border border-border p-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <span className="tag-beta text-[10px]">{list.category}</span>
                    {list.scope ? (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                        {list.scope}
                      </span>
                    ) : null}
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {getIntentLabel(list.title)}
                    </span>
                  </div>
                  <h2 className="mt-3 text-base font-bold">{list.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{list.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleLists.map(list => {
            const ListIcon = ICONS[list.icon] || Compass
            const intent = getIntentLabel(list.title)
            const topPreview = list.type === 'guide' ? list.steps.slice(0, 3).map(step => `${step.step}. ${step.title}`) : list.items.slice(0, 3).map(item => `#${item.rank} ${item.name}`)

            return (
              <Link
                key={list.id}
                href={`/discover/${list.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                      <ListIcon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="tag-beta text-[10px]">{list.category}</span>
                        {list.scope ? (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                            {list.scope}
                          </span>
                        ) : null}
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {intent}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {list.type}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Updated {list.updatedAt}</p>
                    </div>
                  </div>
                  {list.featured ? <Award className="h-4 w-4 text-yellow-500" /> : null}
                </div>

                <h2 className="text-base font-bold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {list.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{list.description}</p>

                <div className="mt-4 space-y-2">
                  {topPreview.map(entry => (
                    <div key={entry} className="rounded-xl bg-muted/40 px-3 py-2 text-xs font-medium text-foreground">
                      {entry}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">
                    {list.type === 'guide' ? `${list.steps.length} steps` : `${list.items.length} entries`}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-transform group-hover:translate-x-0.5 dark:text-indigo-400">
                    Open page <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {visibleLists.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <p className="text-sm font-semibold">No discover pages in this category yet.</p>
            <p className="mt-1 text-xs text-muted-foreground">Add more lists from the admin discover manager.</p>
          </div>
        ) : null}

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Star className="h-4 w-4 text-indigo-500" />
            SEO direction
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Each discover page is designed to become its own indexable landing page with unique copy, clear intent,
            editorial methodology, and related internal links.
          </p>
          <Link
            href="/admin/discover"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Manage discover content <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
