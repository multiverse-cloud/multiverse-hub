'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

type BreadcrumbItem = {
  label: string
  href?: string
}

const ROUTE_LABELS: Record<string, string> = {
  tools: 'Tools',
  templates: 'Templates',
  library: 'Library',
  ui: 'UI Components',
  design: 'Design',
  dev: 'Developer',
  discover: 'Discover',
  prompts: 'Prompt Hub',
  fixes: 'Fixes',
  daily: 'Daily Tools',
  news: 'News',
  learn: 'Learn',
  search: 'Search',
  marketplace: 'Marketplace',
  ai: 'AI',
  pdf: 'PDF',
  image: 'Image',
  video: 'Video',
  audio: 'Audio',
  text: 'Text',
  seo: 'SEO',
  entertainment: 'Entertainment',
  effects: 'Effects',
}

function formatSegment(segment: string): string {
  if (ROUTE_LABELS[segment]) return ROUTE_LABELS[segment]
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function Breadcrumbs({
  items,
  className,
}: {
  items?: BreadcrumbItem[]
  className?: string
}) {
  const pathname = usePathname()

  const crumbs: BreadcrumbItem[] = items ?? []

  if (crumbs.length === 0 && pathname) {
    const segments = pathname.split('/').filter(Boolean)
    let accumulated = ''

    for (let i = 0; i < segments.length; i++) {
      accumulated += `/${segments[i]}`
      const isLast = i === segments.length - 1

      crumbs.push({
        label: formatSegment(decodeURIComponent(segments[i])),
        href: isLast ? undefined : accumulated,
      })
    }
  }

  if (crumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 text-sm">
        <li>
          <Link
            href="/"
            className="group flex items-center gap-1 rounded-lg px-2 py-1 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800/60 dark:hover:text-slate-300"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1

          return (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-700" />

              {isLast || !crumb.href ? (
                <span className="rounded-lg px-2 py-1 font-semibold text-slate-900 dark:text-slate-100">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="rounded-lg px-2 py-1 font-medium text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-300"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
