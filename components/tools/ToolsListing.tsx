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
      <section className="page-hero">
        <div className="page-hero-inner text-center">
          <p className="section-label">Tools</p>
          <h1 className="section-title">{TOOLS.length} Curated Tools</h1>
          <p className="section-sub">Professional tools that are live, useful, and ready for everyday workflows.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="mb-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <form action="/tools" method="get" className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="q"
              defaultValue={search}
              placeholder="Search tools"
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-10 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {activeCategory !== 'all' && <input type="hidden" name="category" value={activeCategory} />}
            {activeTag && <input type="hidden" name="tag" value={activeTag} />}
            {search ? (
              <Link href={buildHref({ q: null })} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            ) : null}
          </form>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {FILTER_TAGS.map(tag => (
              <Link
                key={tag}
                href={buildHref({ tag: activeTag === tag ? null : tag })}
                className={cn(
                  'rounded-xl border px-3 py-2 text-xs font-semibold capitalize transition-colors',
                  activeTag === tag
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-border bg-background text-muted-foreground hover:border-indigo-300'
                )}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-7 flex flex-wrap gap-2">
          <Link
            href={buildHref({ category: 'all' })}
            className={cn(
              'shrink-0 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
              activeCategory === 'all'
                ? 'border-transparent bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'border-border bg-background text-muted-foreground hover:border-indigo-300 hover:text-foreground'
            )}
          >
            All Tools ({TOOLS.length})
          </Link>

          {ACTIVE_CATEGORIES.map(category => {
            const count = categoryCounts.get(category.slug) ?? 0
            const Icon = getLucideIcon(category.icon)

            return (
              <Link
                key={category.slug}
                href={buildHref({ category: category.slug })}
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
                  activeCategory === category.slug
                    ? 'border-transparent bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'border-border bg-background text-muted-foreground hover:border-indigo-300 hover:text-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {category.name} ({count})
              </Link>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <Wrench className="mx-auto mb-4 h-12 w-12 opacity-30" />
            <p className="text-lg font-semibold">No tools found</p>
            <p className="mt-1 text-sm">Try a different search or category.</p>
            <Link href="/tools" className="btn-primary mt-4 inline-flex text-sm">
              Clear filters
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">{filtered.length} results</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filtered.map(tool => {
                const Icon = getLucideIcon(tool.icon)
                const visibleTag = tool.tags.find(tag => tag !== 'new' && tag !== 'trending')

                return (
                  <Link key={tool.id} href={`/tools/${tool.categorySlug}/${tool.slug}`} className="tool-card group">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 transition-all duration-300 group-hover:bg-indigo-600 dark:bg-indigo-950/30 dark:group-hover:bg-indigo-400">
                        <Icon className="h-5 w-5 text-indigo-600 transition-colors group-hover:text-white dark:text-indigo-300 dark:group-hover:text-slate-950" />
                      </div>
                      {visibleTag && (
                        <span
                          className={cn(
                            'rounded-md px-1.5 py-0.5 text-xs font-semibold',
                            visibleTag === 'hot'
                                  ? 'tag-hot'
                                  : 'tag-beta'
                          )}
                        >
                          {visibleTag}
                        </span>
                      )}
                    </div>

                    <h3 className="mb-1 line-clamp-1 text-sm font-semibold leading-tight transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {tool.name}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
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
