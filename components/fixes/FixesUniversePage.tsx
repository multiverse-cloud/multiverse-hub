import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BatteryWarning,
  Gamepad2,
  Laptop2,
  Mic,
  Search,
  ShieldAlert,
  Smartphone,
  Wifi,
} from 'lucide-react'
import {
  type FixClusterId,
  type FixGuide,
  type FixesCluster,
  FIXES_SIGNAL_BLOCKS,
} from '@/lib/fixes-data'
import { cn } from '@/lib/utils'

const CLUSTER_ICON_MAP = {
  mobile: Smartphone,
  pc: Laptop2,
  apps: Search,
  games: Gamepad2,
  internet: Wifi,
  device: Mic,
} as const

const CLUSTER_TONE_MAP = {
  mobile: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
  pc: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  apps: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  games: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  internet: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
  device: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
} as const

type FixesUniversePageProps = {
  clusters: FixesCluster[]
  featuredGuides: FixGuide[]
  guides: FixGuide[]
  activeCluster: 'all' | FixClusterId
  currentPage: number
  pageCount: number
  totalResults: number
  totalGuides: number
  pageStart: number
  pageEnd: number
}

function buildFixesHref(cluster: 'all' | FixClusterId, page = 1) {
  const params = new URLSearchParams()

  if (cluster !== 'all') {
    params.set('cluster', cluster)
  }

  if (page > 1) {
    params.set('page', String(page))
  }

  const query = params.toString()
  return query ? `/fixes?${query}` : '/fixes'
}

function renderPagination(activeCluster: 'all' | FixClusterId, currentPage: number, pageCount: number) {
  if (pageCount <= 1) {
    return null
  }

  const nearbyPages = Array.from(
    new Set(
      [1, currentPage - 1, currentPage, currentPage + 1, pageCount].filter(
        value => value >= 1 && value <= pageCount
      )
    )
  ).sort((left, right) => left - right)

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-semibold text-foreground">{currentPage}</span> of{' '}
        <span className="font-semibold text-foreground">{pageCount}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={buildFixesHref(activeCluster, currentPage - 1)}
          prefetch={false}
          aria-disabled={currentPage === 1}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors',
            currentPage === 1
              ? 'pointer-events-none border-border bg-muted text-muted-foreground'
              : 'border-border bg-background text-foreground hover:border-slate-300 hover:text-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-50'
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Prev
        </Link>

        {nearbyPages.map((page, index) => {
          const previousPage = nearbyPages[index - 1]
          const showGap = previousPage && page - previousPage > 1

          return (
            <div key={page} className="flex items-center gap-2">
              {showGap ? <span className="px-1 text-sm text-muted-foreground">...</span> : null}
              <Link
                href={buildFixesHref(activeCluster, page)}
                prefetch={false}
                className={cn(
                  'inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors',
                  currentPage === page
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                    : 'border-border bg-background text-foreground hover:border-slate-300 hover:text-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-50'
                )}
              >
                {page}
              </Link>
            </div>
          )
        })}

        <Link
          href={buildFixesHref(activeCluster, currentPage + 1)}
          prefetch={false}
          aria-disabled={currentPage === pageCount}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors',
            currentPage === pageCount
              ? 'pointer-events-none border-border bg-muted text-muted-foreground'
              : 'border-border bg-background text-foreground hover:border-slate-300 hover:text-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-50'
          )}
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export default function FixesUniversePage({
  clusters,
  featuredGuides,
  guides,
  activeCluster,
  currentPage,
  pageCount,
  totalResults,
  totalGuides,
  pageStart,
  pageEnd,
}: FixesUniversePageProps) {
  const visibleStart = totalResults > 0 ? pageStart + 1 : 0
  const visibleEnd = totalResults > 0 ? pageEnd : 0

  return (
    <div className="min-h-screen premium-shell">
      <section className="page-hero overflow-hidden border-b border-border bg-slate-50/70 dark:bg-slate-950">
        <div className="page-hero-inner py-8 md:py-10">
          <div className="rounded-[30px] border border-slate-200/80 bg-white/92 p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.35)] dark:border-slate-800/80 dark:bg-slate-950/88 md:p-8">
            <div className="max-w-4xl">
              <div className="page-badge border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300">
                <ShieldAlert className="h-4 w-4" />
                Fixes Universe
              </div>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
                150 easy fixes for phones, PCs, apps, games, and Wi-Fi.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Short steps. Clear symptoms. Less guesswork.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pages</p>
                <p className="mt-2 text-2xl font-black tracking-tight">{totalGuides}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Clusters</p>
                <p className="mt-2 text-2xl font-black tracking-tight">{clusters.length}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Reading style</p>
                <p className="mt-2 text-2xl font-black tracking-tight">5 easy steps</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={buildFixesHref('all')}
                prefetch={false}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                  activeCluster === 'all'
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                )}
              >
                All fixes
              </Link>
              {clusters.map(cluster => (
                <Link
                  key={cluster.id}
                  href={buildFixesHref(cluster.id)}
                  prefetch={false}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                    activeCluster === cluster.id
                      ? 'border-orange-600 bg-orange-600 text-white dark:border-orange-400 dark:bg-orange-400 dark:text-slate-950'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground'
                  )}
                >
                  {cluster.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content space-y-8">
        <section className="grid gap-3 md:grid-cols-3">
          {FIXES_SIGNAL_BLOCKS.map(block => (
            <div key={block.title} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{block.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {block.items.map(item => (
                  <span key={item} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="premium-kicker">Featured</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                Start with the highest-frequency problems
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredGuides.map(guide => (
              <Link
                key={guide.slug}
                href={`/fixes/${guide.slug}`}
                className="rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {guide.platformLabel}
                </p>
                <h3 className="mt-2 text-base font-bold text-slate-950 dark:text-slate-50">{guide.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{guide.summary}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-300">
                  Open guide
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="premium-kicker">Clusters</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
              Browse by the problem area
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {clusters.map(cluster => {
              const Icon = CLUSTER_ICON_MAP[cluster.id]
              const tone = CLUSTER_TONE_MAP[cluster.id]

              return (
                <Link
                  key={cluster.id}
                  href={buildFixesHref(cluster.id)}
                  prefetch={false}
                  className="rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700"
                >
                  <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl', tone)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-slate-50">{cluster.title}</h3>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                      {cluster.problemCount}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{cluster.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cluster.examples.slice(0, 3).map(example => (
                      <span key={example} className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        {example}
                      </span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Showing {visibleStart}-{visibleEnd} of {totalResults} fix pages
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {activeCluster === 'all' ? 'Pick a cluster if you want a smaller shortlist.' : 'Filtered to one problem cluster.'}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guides.map(guide => (
              <Link
                key={guide.slug}
                href={`/fixes/${guide.slug}`}
                className="rounded-2xl border border-border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {guide.clusterTitle}
                  </span>
                  {guide.featured ? (
                    <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-950/30 dark:text-orange-300">
                      Featured
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-950 dark:text-slate-50">{guide.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{guide.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {guide.symptoms.slice(0, 2).map(symptom => (
                    <span key={symptom} className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      {symptom}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {renderPagination(activeCluster, currentPage, pageCount)}
        </section>
      </div>
    </div>
  )
}
