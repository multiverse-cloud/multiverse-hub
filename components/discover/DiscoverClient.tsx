'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Award, Bot, ChevronRight, Code2, Compass, GraduationCap, Image, Star, Zap } from 'lucide-react'
import { DISCOVER_LISTS } from '@/lib/discover-data'
import { cn } from '@/lib/utils'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Image,
  Code2,
  GraduationCap,
}

export default function DiscoverClient() {
  const [activeList, setActiveList] = useState<string | null>(null)
  const selectedList = activeList ? DISCOVER_LISTS.find(list => list.id === activeList) : null

  if (selectedList) {
    return (
      <div className="min-h-screen">
        <div className="page-hero">
          <div className="page-hero-inner">
            <button
              onClick={() => setActiveList(null)}
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Discover
            </button>
            <h1 className="text-2xl font-bold md:text-3xl">{selectedList.title}</h1>
            <p className="mt-1 text-muted-foreground">{selectedList.description}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Updated {new Date(selectedList.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="page-content">
          <div className="space-y-3">
            {selectedList.items.map(item => (
              <Link
                key={item.rank}
                href={item.url}
                target={item.badge === 'external' ? '_blank' : undefined}
                rel={item.badge === 'external' ? 'noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700"
              >
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-sm',
                    item.rank <= 3 ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {item.rank}
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-[10px] font-bold tracking-[0.2em] text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  {item.logo}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <h3 className="text-sm font-bold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {item.name}
                    </h3>
                    <span className={cn('rounded-full px-1.5 py-0.5 text-xs', item.badge === 'internal' ? 'tag-new' : 'bg-muted text-muted-foreground')}>
                      {item.badge === 'internal' ? 'On Multiverse' : 'External'}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{item.summary}</p>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      Best for: <strong className="text-foreground">{item.bestFor}</strong>
                    </span>
                  </div>
                </div>

                <div className="hidden shrink-0 flex-col items-end gap-1 md:flex">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{item.pricing}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{item.rating}</span>
                  </div>
                </div>

                <ArrowUpRight className="ml-2 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-lg shadow-slate-900/15 dark:bg-slate-100">
              <Compass className="h-5 w-5 text-white dark:text-slate-950" />
            </div>
            <span className="section-label">Discover</span>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">Curated Rankings</h1>
          <p className="mt-1 text-muted-foreground">
            Shortlists and comparisons for popular tools across AI, design, development, and learning.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DISCOVER_LISTS.map(list => {
            const topItems = list.items.slice(0, 3)
            const ListIcon = ICONS[list.icon] || Bot

            return (
              <button
                key={list.id}
                onClick={() => setActiveList(list.id)}
                className="group rounded-xl border border-border bg-card p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                      <ListIcon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                    </div>
                    <span className="tag-beta text-xs">{list.category}</span>
                  </div>
                  {list.featured && <Award className="h-4 w-4 text-yellow-500" />}
                </div>

                <h3 className="mb-1 text-sm font-bold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {list.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-xs text-muted-foreground">{list.description}</p>

                <div className="space-y-1.5">
                  {topItems.map(item => (
                    <div key={item.rank} className="flex items-center gap-2">
                      <span className="w-4 text-xs font-bold text-muted-foreground">#{item.rank}</span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-white text-[10px] font-bold tracking-[0.18em] text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                        {item.logo}
                      </span>
                      <span className="truncate text-xs font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs text-muted-foreground">{list.itemCount} entries</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-transform group-hover:translate-x-0.5 dark:text-indigo-400">
                    View list <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            )
          })}

          {['Productivity Apps', 'Design Systems', 'Code Editors', 'Video Editors'].map(title => (
            <div key={title} className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-5 text-center opacity-70">
              <Zap className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Coming soon</p>
              </div>
              <span className="tag-beta text-xs">Soon</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
