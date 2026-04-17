'use client'

import Link from 'next/link'
import { ArrowRight, Wrench } from 'lucide-react'
import { getLucideIcon } from '@/lib/icons'
import type { Tool } from '@/lib/tools-data'

interface Props {
  tool: Tool
  showNew?: boolean
  variant?: 'compact' | 'full'
}

export default function ToolCard({ tool, showNew, variant = 'compact' }: Props) {
  const ToolIcon = getLucideIcon(tool.icon, Wrench)
  const visibleTag = tool.tags.find(tag => tag !== 'new' && tag !== 'trending')

  if (variant === 'full') {
    return (
      <Link
        href={`/tools/${tool.categorySlug}/${tool.slug}`}
        className="card-enter group relative rounded-xl border border-slate-200/70 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/[0.07] dark:border-slate-800/70 dark:bg-slate-900/80 dark:hover:border-indigo-800"
      >
        {/* Subtle top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/0 to-transparent transition-all duration-300 group-hover:via-indigo-400/50 dark:group-hover:via-indigo-500/40" />

        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 text-indigo-600 transition-all duration-300 group-hover:from-indigo-600 group-hover:to-indigo-500 group-hover:text-white group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-indigo-500/20 dark:from-indigo-950/30 dark:to-indigo-900/20 dark:text-indigo-300 dark:group-hover:from-indigo-500 dark:group-hover:to-indigo-600">
            <ToolIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate font-display text-sm font-bold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{tool.name}</h3>
              <div className="flex gap-1.5 items-center">
                {visibleTag === 'hot' && <span className="tag-hot shrink-0">Hot</span>}
                {visibleTag === 'beta' && <span className="tag-beta shrink-0">Beta</span>}
              </div>
            </div>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-3 dark:border-slate-800/60">
          <span className="text-xs text-muted-foreground">{tool.category}</span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/tools/${tool.categorySlug}/${tool.slug}`}
      className="card-enter group relative flex flex-col gap-2.5 rounded-xl border border-slate-200/70 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/[0.07] dark:border-slate-800/70 dark:bg-slate-900/80 dark:hover:border-indigo-800"
    >
      {/* Subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/0 to-transparent transition-all duration-300 group-hover:via-indigo-400/50 dark:group-hover:via-indigo-500/40" />

      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 text-indigo-600 transition-all duration-300 group-hover:from-indigo-600 group-hover:to-indigo-500 group-hover:text-white group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-indigo-500/20 dark:from-indigo-950/30 dark:to-indigo-900/20 dark:text-indigo-300 dark:group-hover:from-indigo-500 dark:group-hover:to-indigo-600">
          <ToolIcon className="h-5 w-5" />
        </div>
        <div className="flex gap-1.5 items-center">
          {visibleTag === 'hot' && <span className="tag-hot">Hot</span>}
          {visibleTag === 'beta' && <span className="tag-beta">Beta</span>}
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
