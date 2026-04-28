import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, GitBranch, Globe2, RadioTower } from 'lucide-react'
import PublicLayout from '@/components/layout/PublicLayout'
import { SITE_METRICS } from '@/lib/site-metrics'
import { DOMAIN_READINESS_CHECKS, WHATS_NEW_RELEASES } from '@/lib/whats-new-data'
import { absoluteUrl } from '@/lib/site-url'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "What's New - Multiverse Updates, New Tools, UI Components & Templates",
  description:
    'Track the latest Multiverse updates across tools, UI components, templates, prompts, SEO pages, and production launch readiness.',
  alternates: { canonical: absoluteUrl('/whats-new') },
  openGraph: {
    title: "What's New in Multiverse",
    description:
      'Latest Multiverse product updates, new content drops, launch readiness work, and SEO improvements.',
    url: absoluteUrl('/whats-new'),
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "What's New in Multiverse",
    description: 'Latest tools, UI, templates, prompts, and production updates.',
  },
}

const STATS = [
  { label: 'Tools', value: SITE_METRICS.tools.label },
  { label: 'UI items', value: SITE_METRICS.ui.label },
  { label: 'Templates', value: SITE_METRICS.templates.label },
  { label: 'Prompts', value: SITE_METRICS.prompts.label },
]

export default function WhatsNewPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "What's New in Multiverse",
    description: metadata.description,
    url: absoluteUrl('/whats-new'),
    mainEntity: WHATS_NEW_RELEASES.map(release => ({
      '@type': 'CreativeWork',
      name: release.title,
      datePublished: release.date,
      description: release.summary,
    })),
  }

  return (
    <PublicLayout schemaMarkup={schema}>
      <main className="premium-shell">
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-950">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_48%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,0.14),transparent_52%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35 dark:opacity-20" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-6">
            <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-slate-950 dark:hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-950 dark:text-white">What's New</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
              <div>
                <h1 className="max-w-4xl font-display text-4xl font-black tracking-[-0.055em] text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
                  New drops, fixes, and launch-ready upgrades.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                  Follow the Multiverse update tree: new tools, UI blocks, templates, prompts, SEO surfaces, and production readiness work before the custom domain launch.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <Link href="/tools" className="btn-primary">
                    Explore tools <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/library" className="btn-secondary">
                    Open library
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <RadioTower className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  Current platform scale
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STATS.map(stat => (
                    <div key={stat.label} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                      <p className="font-display text-2xl font-black tracking-tight text-slate-950 dark:text-white">{stat.value}</p>
                      <p className="mt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:px-6">
          <aside className="hidden lg:block">
            <div className="sticky top-[7.25rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="premium-label">Update tree</p>
              <div className="mt-4 space-y-3">
                {WHATS_NEW_RELEASES.map(release => (
                  <a key={release.id} href={`#${release.id}`} className="flex items-start gap-3 rounded-xl p-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-300" />
                    <span>
                      <span className="block font-semibold text-slate-900 dark:text-white">{release.title}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{release.date}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            {WHATS_NEW_RELEASES.map((release, releaseIndex) => (
              <article
                key={release.id}
                id={release.id}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="absolute left-6 top-[5.75rem] hidden h-[calc(100%-7rem)] w-px bg-slate-200 dark:bg-slate-800 sm:block" aria-hidden="true" />
                <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <span>{release.date}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="text-blue-600 dark:text-blue-300">{release.status}</span>
                  </div>
                  <div className="mt-3 flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <GitBranch className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                        {release.title}
                      </h2>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {release.summary}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 p-4 sm:p-5">
                  {release.items.map((item, itemIndex) => (
                    <div key={item.title} className="group relative flex gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/70">
                      <span className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-950 dark:text-white">{item.title}</h3>
                          <span className="text-xs text-slate-400">#{releaseIndex + 1}.{itemIndex + 1}</span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
                        {item.href ? (
                          <Link href={item.href} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200">
                            View update <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                  <Globe2 className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-black tracking-tight text-slate-950 dark:text-white">
                    Before connecting the domain
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    These are the final launch checks to keep SEO, analytics, and production config clean.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {DOMAIN_READINESS_CHECKS.map(check => (
                  <div key={check} className="flex gap-2 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}
