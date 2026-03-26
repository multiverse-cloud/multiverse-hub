'use client'

import Link from 'next/link'
import { ArrowRight, Heart, Wrench } from 'lucide-react'
import { getLucideIcon } from '@/lib/icons'
import type { Tool } from '@/lib/tools-data'
import { useFavorites } from '@/components/providers/FavoritesContext'
import { cn } from '@/lib/utils'

interface Props {
  tool: Tool
  showNew?: boolean
  variant?: 'compact' | 'full'
}

export default function ToolCard({ tool, showNew, variant = 'compact' }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const ToolIcon = getLucideIcon(tool.icon, Wrench)
  const visibleTag = tool.tags.find(tag => tag !== 'new' && tag !== 'trending')
  const starred = isFavorite(tool.slug)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(tool.slug)
  }

  if (variant === 'full') {
    return (
      <Link
        href={`/tools/${tool.categorySlug}/${tool.slug}`}
        className="premium-card group p-4 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-300">
            <ToolIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate font-display text-sm font-bold">{tool.name}</h3>
              <div className="flex gap-1.5 items-center">
                {visibleTag === 'hot' && <span className="tag-hot shrink-0">Hot</span>}
                {visibleTag === 'beta' && <span className="tag-beta shrink-0">Beta</span>}
                <button
                  type="button"
                  onClick={handleFavorite}
                  className={cn(
                    "ml-1 p-1 rounded-md transition-colors",
                    starred ? "text-rose-500 bg-rose-50 dark:bg-rose-950/30" : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <Heart className={cn("h-4 w-4", starred && "fill-current")} />
                </button>
              </div>
            </div>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{tool.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">{tool.category}</span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/tools/${tool.categorySlug}/${tool.slug}`}
      className="premium-card group relative flex flex-col gap-2.5 p-4 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-300">
          <ToolIcon className="h-5 w-5" />
        </div>
        <div className="flex gap-1.5 items-center">
          {visibleTag === 'hot' && <span className="tag-hot">Hot</span>}
          {visibleTag === 'beta' && <span className="tag-beta">Beta</span>}
          <button
            type="button"
            onClick={handleFavorite}
            className={cn(
              "p-1 rounded-md transition-colors",
              starred ? "text-rose-500 bg-rose-50 dark:bg-rose-950/30" : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            <Heart className={cn("h-4 w-4", starred && "fill-current")} />
          </button>
        </div>
      </div>
      <div>
        <h3 className="line-clamp-1 font-display text-sm font-bold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
          {tool.name}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
      </div>
    </Link>
  )
}
