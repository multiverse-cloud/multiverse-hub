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
        className="premium-card group p-4 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-300">
            <ToolIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate font-display text-sm font-bold">{tool.name}</h3>
              <div className="flex gap-1">
                {visibleTag === 'hot' && <span className="tag-hot shrink-0">Hot</span>}
                {visibleTag === 'beta' && <span className="tag-beta shrink-0">Beta</span>}
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
        <div className="flex gap-1">
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
