import Link from 'next/link'
import { Search, Wrench, X } from 'lucide-react'
import { getLucideIcon } from '@/lib/icons'
import { ACTIVE_CATEGORIES, TOOLS, type ToolTag } from '@/lib/tools-data'
import { cn } from '@/lib/utils'

const FILTER_TAGS: ToolTag[] = ['trending', 'new', 'hot', 'beta']

interface ToolsListingProps {
  filters?: {
    q?: string
    category?: string
    tag?: string
  }
}

export default function ToolsListing({ filters }: ToolsListingProps) {
  const search = filters?.q?.trim() ?? ''
  const activeCategory = ACTIVE_CATEGORIES.some(category => category.slug === filters?.category)
    ? filters?.category ?? 'all'
    : 'all'
  const activeTag = FILTER_TAGS.includes((filters?.tag ?? '') as ToolTag) ? (filters?.tag as ToolTag) : null
  const normalizedSearch = search.toLowerCase()
  const categoryCounts = new Map(ACTIVE_CATEGORIES.map(category => [category.slug, TOOLS.filter(tool => tool.categorySlug === category.slug).length]))

  const filtered = TOOLS.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.categorySlug === activeCategory
    const matchesSearch =
      !normalizedSearch ||
      tool.name.toLowerCase().includes(normalizedSearch) ||
      tool.description.toLowerCase().includes(normalizedSearch) ||
      tool.category.toLowerCase().includes(normalizedSearch)
    const matchesTag = !activeTag || tool.tags.includes(activeTag)

    return matchesCategory && matchesSearch && matchesTag
  })

  function buildHref(next: {
    q?: string | null
    category?: string | null
    tag?: ToolTag | null
  }) {
    const params = new URLSearchParams()
    const nextQuery = next.q === undefined ? search : next.q ?? ''
    const nextCategory = next.category === undefined ? activeCategory : next.category ?? 'all'
    const nextTag = next.tag === undefined ? activeTag : next.tag

    if (nextQuery.trim()) params.set('q', nextQuery.trim())
    if (nextCategory && nextCategory !== 'all') params.set('category', nextCategory)
    if (nextTag) params.set('tag', nextTag)

    const queryString = params.toString()
    return queryString ? `/tools?${queryString}` : '/tools'
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-white dark:border-slate-800/60 dark:bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(99,102,241,0.06),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(99,102,241,0.1),transparent)]" />
          <div className="absolute inset-0 grid-bg opacity-[0.08] dark:opacity-[0.04]" />
        </div>
        <div className="relative page-hero-inner text-center">
          <p className="section-label">{TOOLS.length} Tools</p>
          <h1 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
            Every tool, one workspace
          </h1>
          <p className="mt-2 mx-auto max-w-lg text-sm text-muted-foreground sm:text-base">
            Browse, filter, and jump into any tool — no tabs, no switching.
          </p>
        </div>
      </section>

      <section className="page-content">
        {/* Search + Filter row */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <form action="/tools" method="get" className="relative w-full sm:max-w-lg">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="q"
              defaultValue={search}
              placeholder="Search tools by name or category..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-xs font-medium shadow-sm transition-all focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-indigo-500 sm:py-3 sm:pl-10 sm:pr-10 sm:text-sm"
            />
            {activeCategory !== 'all' && <input type="hidden" name="category" value={activeCategory} />}
            {activeTag && <input type="hidden" name="tag" value={activeTag} />}
            {search ? (
              <Link href={buildHref({ q: null })} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800 sm:right-3">
                <X className="h-3 w-3 text-muted-foreground sm:h-3.5 sm:w-3.5" />
              </Link>
            ) : null}
          </form>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-1">
            {FILTER_TAGS.map(tag => (
              <Link
                key={tag}
                href={buildHref({ tag: activeTag === tag ? null : tag })}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide transition-all sm:px-3 sm:py-1.5 sm:text-[11px]',
                  activeTag === tag
                    ? 'border-indigo-500 bg-indigo-500 text-white shadow-sm shadow-indigo-500/20'
                    : 'border-slate-200 bg-white text-muted-foreground hover:border-indigo-200 hover:text-foreground dark:border-slate-800 dark:bg-slate-900'
                )}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="-mx-4 mb-4 overflow-x-auto scrollbar-hide px-4 sm:mx-0 sm:px-0 sm:mb-5">
          <div className="flex min-w-max gap-1 sm:flex-wrap sm:gap-1.5">
            <Link
              href={buildHref({ category: 'all' })}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-semibold transition-all sm:px-3.5 sm:py-1.5 sm:text-xs',
                activeCategory === 'all'
                  ? 'border-indigo-500/60 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'border-slate-200 bg-white text-muted-foreground hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800'
              )}
            >
              All ({TOOLS.length})
            </Link>

            {ACTIVE_CATEGORIES.map(category => {
              const count = categoryCounts.get(category.slug) ?? 0
              const Icon = getLucideIcon(category.icon)
              const isActive = activeCategory === category.slug

              return (
                <Link
                  key={category.slug}
                  href={buildHref({ category: category.slug })}
                  className={cn(
                    'flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all sm:px-3 sm:py-1.5 sm:text-xs',
                    isActive
                      ? 'border-indigo-500/60 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'border-slate-200 bg-white text-muted-foreground hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>{category.name.replace(' Tools', '')}</span>
                  <span className={cn('rounded-md px-1 py-0.5 text-[9px] font-bold tabular-nums sm:text-[10px]', isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400')}>
                    {count}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Wrench className="h-7 w-7 opacity-40" />
            </div>
            <p className="text-base font-semibold">No tools found</p>
            <p className="mt-1 text-sm">Try a different search or category.</p>
            <Link href="/tools" className="btn-primary mt-5 inline-flex text-sm">
              Clear filters
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
                {activeCategory !== 'all' && ` in ${ACTIVE_CATEGORIES.find(c => c.slug === activeCategory)?.name || activeCategory}`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-3">
              {filtered.map(tool => {
                const Icon = getLucideIcon(tool.icon)
                const visibleTag = tool.tags.find(tag => tag !== 'new' && tag !== 'trending')

                return (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.categorySlug}/${tool.slug}`}
                    className="group relative flex flex-col gap-2 rounded-xl border border-slate-200/70 bg-white p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/[0.06] dark:border-slate-800/70 dark:bg-slate-900/80 dark:hover:border-indigo-800 dark:hover:shadow-indigo-500/[0.06] sm:p-3.5 sm:gap-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 transition-all duration-200 group-hover:bg-indigo-600 group-hover:scale-105 dark:bg-indigo-950/30 dark:group-hover:bg-indigo-500 sm:h-9 sm:w-9">
                        <Icon className="h-3.5 w-3.5 text-indigo-600 transition-colors group-hover:text-white dark:text-indigo-300 dark:group-hover:text-white sm:h-4 sm:w-4" />
                      </div>
                      {visibleTag && (
                        <span
                          className={cn(
                            'rounded-md px-1 py-0.5 text-[9px] font-semibold sm:px-1.5 sm:py-0.5 sm:text-[10px]',
                            visibleTag === 'hot' ? 'tag-hot' : 'tag-beta'
                          )}
                        >
                          {visibleTag}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="line-clamp-1 text-[11px] font-semibold leading-tight transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 sm:text-sm">
                        {tool.name}
                      </h3>
                      <p className="mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground sm:mt-0.5 sm:text-[11px]">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
