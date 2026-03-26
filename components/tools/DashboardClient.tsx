'use client'

import { useMemo } from 'react'
import { Heart, History, Sparkles, Wrench } from 'lucide-react'
import { useFavorites } from '@/components/providers/FavoritesContext'
import type { Tool } from '@/lib/tools-data'
import ToolCard from './ToolCard'
import Link from 'next/link'

interface Props {
  allTools: Tool[]
}

export default function DashboardClient({ allTools }: Props) {
  const { favorites, recents } = useFavorites()

  const favoriteTools = useMemo(() => {
    return allTools.filter(t => favorites.includes(t.slug))
  }, [allTools, favorites])

  const recentTools = useMemo(() => {
    // Maintain order from recents array
    return recents
      .map(slug => allTools.find(t => t.slug === slug))
      .filter((t): t is Tool => !!t)
  }, [allTools, recents])

  const hasContent = favoriteTools.length > 0 || recentTools.length > 0

  return (
    <div className="space-y-12 py-10">
      <header>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">My Library</h1>
            <p className="text-muted-foreground">Manage your favorite tools and recently used utilities.</p>
          </div>
        </div>
      </header>

      {!hasContent ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 text-center dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-slate-300 shadow-sm dark:bg-slate-800 dark:text-slate-700">
            <Wrench className="h-10 w-10" />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50">Your library is empty</h2>
          <p className="mt-3 max-w-md text-slate-500">
            Start exploring our 150+ tools and click the heart icon to save your favorites here for quick access.
          </p>
          <Link
            href="/tools"
            className="mt-8 rounded-2xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/30"
          >
            Explore Tools
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {favoriteTools.length > 0 && (
            <section>
              <div className="mb-6 flex items-center gap-2.5">
                <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                <h2 className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">Favorites</h2>
                <span className="ml-2 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500 dark:bg-slate-800">
                  {favoriteTools.length}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favoriteTools.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )}

          {recentTools.length > 0 && (
            <section>
              <div className="mb-6 flex items-center gap-2.5 text-slate-900 dark:text-slate-100">
                <History className="h-5 w-5" />
                <h2 className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">Recently Used</h2>
                <span className="ml-2 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500 dark:bg-slate-800">
                  {recentTools.length}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recentTools.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
