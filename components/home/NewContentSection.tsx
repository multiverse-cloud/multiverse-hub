import Link from 'next/link'
import { ArrowRight, Bot, Code2, LayoutTemplate } from 'lucide-react'
import { getEffectSlug, uiEffects } from '@/lib/css-effects-library'
import { getPublishedPrompts } from '@/lib/prompt-db'
import { getPublishedTemplates } from '@/lib/template-db'

function sortByDate<T extends { updatedAt?: string; publishedAt?: string; title: string }>(items: T[]) {
  return [...items]
    .sort((left, right) => {
      const leftDate = left.updatedAt || left.publishedAt || ''
      const rightDate = right.updatedAt || right.publishedAt || ''
      return rightDate.localeCompare(leftDate) || left.title.localeCompare(right.title)
    })
    .slice(0, 4)
}

export default async function NewContentSection() {
  const [templates, prompts] = await Promise.all([
    getPublishedTemplates().catch(() => []),
    getPublishedPrompts().catch(() => []),
  ])
  const components = sortByDate(uiEffects)

  const groups = [
    {
      title: 'New templates',
      href: '/templates',
      icon: LayoutTemplate,
      items: sortByDate(templates).map(item => ({
        title: item.title,
        meta: item.categoryTitle,
        href: `/templates/${item.slug}`,
      })),
    },
    {
      title: 'New prompts',
      href: '/prompts',
      icon: Bot,
      items: sortByDate(prompts).map(item => ({
        title: item.title,
        meta: item.categoryTitle,
        href: `/prompts/${item.slug}`,
      })),
    },
    {
      title: 'New components',
      href: '/ui',
      icon: Code2,
      items: components.map(item => ({
        title: item.title,
        meta: item.category,
        href: `/ui/${getEffectSlug(item)}`,
      })),
    },
  ]

  return (
    <section className="relative overflow-hidden border-y border-slate-200/70 bg-white py-14 dark:border-slate-800/70 dark:bg-slate-950 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Latest</p>
              <h2 className="section-title">Fresh resources across Multiverse</h2>
              <p className="section-sub mt-2 max-w-2xl">
                Recently added templates, prompts, and UI components for people who want useful assets without hunting.
              </p>
            </div>
            <Link href="/library" className="hidden items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white sm:flex">
              View library <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {groups.map(group => {
              const Icon = group.icon
              return (
                <article key={group.title} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="text-sm font-bold text-foreground">{group.title}</h3>
                    </div>
                    <Link href={group.href} className="text-xs font-bold text-muted-foreground hover:text-foreground">
                      All
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {group.items.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center justify-between gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-muted/60"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-foreground">{item.title}</span>
                          <span className="block truncate text-xs text-muted-foreground">{item.meta}</span>
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
