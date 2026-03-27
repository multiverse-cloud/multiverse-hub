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
      {/* Hero — compact, above fold */}
      <section className="page-hero">
        <div className="page-hero-inner text-center">
          <p className="section-label">{TOOLS.length} Tools</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
            Discover & Use Professional Tools
          </h1>
          <p className="mt-2 mx-auto max-w-lg text-sm text-muted-foreground sm:text-base">
            Production-ready tools for your everyday workflows.
          </p>
        </div>
      </section>

      <section className="page-content">
        {/* Search + Filter row */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search — dominant */}
          <form action="/tools" method="get" className="relative w-full sm:max-w-lg">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="q"
              defaultValue={search}
              placeholder="Search tools by name or category..."
              className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-10 text-sm font-medium focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {activeCategory !== 'all' && <input type="hidden" name="category" value={activeCategory} />}
            {activeTag && <input type="hidden" name="tag" value={activeTag} />}
            {search ? (
              <Link href={buildHref({ q: null })} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            ) : null}
          </form>

          {/* Filter pills — small and subtle */}
          <div className="flex flex-wrap gap-1.5">
            {FILTER_TAGS.map(tag => (
              <Link
                key={tag}
                href={buildHref({ tag: activeTag === tag ? null : tag })}
                className={cn(
                  'rounded-md border px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors',
                  activeTag === tag
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-border bg-background text-muted-foreground hover:border-indigo-300 hover:text-foreground'
                )}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Category tabs — polished horizontal scroll */}
        <div className="-mx-4 mb-6 overflow-x-auto scrollbar-hide px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-1.5 sm:flex-wrap sm:gap-2">
            <Link
              href={buildHref({ category: 'all' })}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all sm:px-3.5 sm:py-2 sm:text-sm',
                activeCategory === 'all'
                  ? 'border-indigo-500/60 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'border-border bg-background text-muted-foreground hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
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
                    'flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all sm:px-3.5 sm:py-2 sm:text-sm',
                    isActive
                      ? 'border-indigo-500/60 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'border-border bg-background text-muted-foreground hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{category.name.replace(' Tools', '')}</span>
                  <span className={cn('rounded-md px-1 py-0.5 text-[10px] font-bold tabular-nums', isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400')}>
                    {count}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            <Wrench className="mx-auto mb-3 h-10 w-10 opacity-30" />
            <p className="text-base font-semibold">No tools found</p>
            <p className="mt-1 text-sm">Try a different search or category.</p>
            <Link href="/tools" className="btn-primary mt-4 inline-flex text-sm">
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

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filtered.map(tool => {
                const Icon = getLucideIcon(tool.icon)
                const visibleTag = tool.tags.find(tag => tag !== 'new' && tag !== 'trending')

                return (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.categorySlug}/${tool.slug}`}
                    className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5 dark:hover:border-indigo-800 dark:hover:shadow-indigo-500/5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 transition-colors group-hover:bg-indigo-600 dark:bg-indigo-950/30 dark:group-hover:bg-indigo-500">
                        <Icon className="h-4 w-4 text-indigo-600 transition-colors group-hover:text-white dark:text-indigo-300 dark:group-hover:text-white" />
                      </div>
                      {visibleTag && (
                        <span
                          className={cn(
                            'rounded-md px-1.5 py-0.5 text-[10px] font-semibold',
                            visibleTag === 'hot' ? 'tag-hot' : 'tag-beta'
                          )}
                        >
                          {visibleTag}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="line-clamp-1 text-sm font-semibold leading-tight transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {tool.name}
                      </h3>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
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
