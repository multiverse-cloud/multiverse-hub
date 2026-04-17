import { stat } from 'fs/promises'
import Link from 'next/link'
import {
  Activity,
  CheckCircle2,
  Compass,
  Globe2,
  TriangleAlert,
  Wrench,
  Zap,
} from 'lucide-react'
import { ACTIVE_CATEGORIES } from '@/lib/tools-data'
import { UNIVERSES } from '@/lib/universes-data'
import { getTools } from '@/lib/db'
import { getAdminDiscoverLists } from '@/lib/discover-db'
import { getLocalDiscoverStorePaths } from '@/lib/discover-local-store'
import { getPublishedPrompts } from '@/lib/prompt-db'
import { getPublishedTemplates } from '@/lib/template-db'
import { cn } from '@/lib/utils'
import { isCommandAvailable, YTDLP_PATH } from '@/lib/server-utils'

function formatRelativeDateLabel(value: string) {
  const target = new Date(value)
  if (Number.isNaN(target.getTime())) {
    return value
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  const diff = Math.round((today.getTime() - target.getTime()) / 86400000)

  if (diff <= 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return `${diff} days ago`
}

export default async function AdminDashboard() {
  const [tools, discoverLists, prompts, templates] = await Promise.all([getTools(), getAdminDiscoverLists(), getPublishedPrompts(), getPublishedTemplates()])
  const enabledTools = tools.filter(tool => tool.enabled !== false)
  const publishedDiscover = discoverLists.filter(list => list.published)
  const featuredDiscover = discoverLists.filter(list => list.featured)
  const rankingCount = discoverLists.filter(list => list.type === 'ranking').length
  const guideCount = discoverLists.filter(list => list.type === 'guide').length

  const discoverStorePaths = getLocalDiscoverStorePaths()
  const discoverStoreStats = await stat(discoverStorePaths.storeFile).catch(() => null)
  const discoverStoreSizeKb = discoverStoreStats ? Math.max(1, Math.round(discoverStoreStats.size / 1024)) : 0
  const ytDlpAvailable = isCommandAvailable(YTDLP_PATH)

  const healthCards = [
    {
      name: 'Discover storage',
      status: 'Local JSON',
      healthy: true,
      detail: discoverStoreStats
        ? `${discoverStoreSizeKb} KB â€¢ updated ${formatRelativeDateLabel(discoverStoreStats.mtime.toISOString())}`
        : 'Local store file will be created on first save or import.',
    },
    {
      name: 'Tool source',
      status: 'Local JSON',
      healthy: true,
      detail: 'Firebase and Firestore sync have been removed. Tools now run from local data only.',
    },
    {
      name: 'AI tools',
      status: process.env.OPENROUTER_API_KEY ? 'Configured' : 'Needs key',
      healthy: Boolean(process.env.OPENROUTER_API_KEY),
      detail: process.env.OPENROUTER_API_KEY
        ? 'OpenRouter-backed tools should be available.'
        : 'Set `OPENROUTER_API_KEY` to enable hosted AI text workflows.',
    },
    {
      name: 'Audio AI',
      status: process.env.OPENAI_API_KEY ? 'Configured' : 'Needs key',
      healthy: Boolean(process.env.OPENAI_API_KEY),
      detail: process.env.OPENAI_API_KEY
        ? 'Speech-to-text and TTS routes are ready.'
        : 'Set `OPENAI_API_KEY` to enable TTS and transcription.',
    },
    {
      name: 'Video downloader',
      status: ytDlpAvailable ? 'Binary ready' : 'Binary missing',
      healthy: ytDlpAvailable,
      detail: ytDlpAvailable
        ? `Using ${YTDLP_PATH}.`
        : 'Install `yt-dlp` or point `YTDLP_PATH` to the binary for hosted downloads.',
    },
    {
      name: 'Remove background',
      status: process.env.REMOVEBG_API_KEY ? 'Configured' : 'Hosted disabled',
      healthy: Boolean(process.env.REMOVEBG_API_KEY),
      detail: process.env.REMOVEBG_API_KEY
        ? 'Hosted background removal can call Remove.bg.'
        : 'Add `REMOVEBG_API_KEY` to remove the hosted-demo disabled state.',
    },
  ]

  const recentDiscoverChanges = [...discoverLists]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, 6)

  const toolsByCategory = ACTIVE_CATEGORIES.map(category => {
    const categoryTools = tools.filter(tool => tool.categorySlug === category.slug)
    return {
      slug: category.slug,
      name: category.name,
      total: categoryTools.length,
      enabled: categoryTools.filter(tool => tool.enabled !== false).length,
      trending: categoryTools.filter(tool => tool.tags.includes('trending')).length,
    }
  })

  const stats = [
    {
      label: 'Total Tools',
      value: tools.length,
      supporting: `${enabledTools.length} enabled`,
      icon: Wrench,
      tone: 'indigo',
    },
    {
      label: 'Discover Pages',
      value: discoverLists.length,
      supporting: `${publishedDiscover.length} published • ${featuredDiscover.length} featured`,
      icon: Compass,
      tone: 'emerald',
    },
    {
      label: 'Prompt Pages',
      value: prompts.length,
      supporting: `${prompts.filter(prompt => prompt.featured).length} featured`,
      icon: Activity,
      tone: 'rose',
    },
    {
      label: 'UI Templates',
      value: templates.length,
      supporting: `${templates.reduce((total, template) => total + template.files.length, 0)} code files`,
      icon: Globe2,
      tone: 'violet',
    },
    {
      label: 'Universes',
      value: UNIVERSES.length,
      supporting: 'Current navigation and content surfaces',
      icon: Globe2,
      tone: 'violet',
    },
  ]

  return (
    <div className="max-w-screen-xl space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1.5">
          <p className="premium-kicker">Admin Panel</p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Real counts, discover health, and tool readiness across the current local-first setup.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/discover" className="btn-secondary gap-2 px-4 py-2 text-sm">
            <Compass className="h-4 w-4" />
            Open Discover
          </Link>
          <Link href="/admin/tools" className="btn-primary gap-2 px-4 py-2 text-sm">
            <Wrench className="h-4 w-4" />
            Manage Tools
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(stat => {
          const Icon = stat.icon

          return (
            <div key={stat.label} className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-2xl',
                    stat.tone === 'indigo' && 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300',
                    stat.tone === 'emerald' && 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300',
                    stat.tone === 'rose' && 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-300',
                    stat.tone === 'violet' && 'bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-3xl font-black tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="mt-3 text-xs font-semibold text-foreground">{stat.supporting}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <h2 className="font-bold">Tool Distribution</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Current category mix using live tool state instead of placeholder counts.
              </p>
            </div>
            <Link href="/admin/tools" className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
              Manage tools
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {toolsByCategory.map(category => (
              <div key={category.slug} className="rounded-2xl border border-border bg-background p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{category.name}</p>
                  {category.trending > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                      <Zap className="h-3 w-3" />
                      {category.trending} hot
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-muted/40 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Total</p>
                    <p className="mt-1 text-lg font-black">{category.total}</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Enabled</p>
                    <p className="mt-1 text-lg font-black">{category.enabled}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          <div className="border-b border-border pb-4">
            <h2 className="font-bold">Health Checks</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Runtime readiness for discover storage, AI keys, and downloader dependencies.
            </p>
          </div>
          <div className="mt-5 space-y-3">
            {healthCards.map(card => {
              const healthy = card.healthy
              const Icon = healthy ? CheckCircle2 : TriangleAlert

              return (
                <div key={card.name} className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                        healthy
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{card.name}</p>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {card.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{card.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <h2 className="font-bold">Discover Health</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Published vs guide/ranking mix in the current local discover library.
              </p>
            </div>
            <Link href="/admin/discover" className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
              Open editor
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Published</p>
              <p className="mt-2 text-2xl font-black">{publishedDiscover.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Rankings</p>
              <p className="mt-2 text-2xl font-black">{rankingCount}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Guides</p>
              <p className="mt-2 text-2xl font-black">{guideCount}</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-4 text-sm text-muted-foreground">
            Local-first mode is active right now, so discover imports and edits persist to the data folder in local development.
          </div>
        </section>

        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <Activity className="h-4 w-4 text-indigo-500" />
            <div>
              <h2 className="font-bold">Recent Discover Changes</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest discover pages based on the current `updatedAt` field.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {recentDiscoverChanges.map(list => (
              <Link
                key={list.id}
                href={`/admin/discover`}
                className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{list.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {list.category}
                    {list.subcategory ? ` â€¢ ${list.subcategory}` : ''}
                    {list.scope ? ` â€¢ ${list.scope}` : ''}
                  </p>
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {formatRelativeDateLabel(list.updatedAt)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}




