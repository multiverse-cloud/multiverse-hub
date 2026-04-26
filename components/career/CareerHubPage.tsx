'use client'

import Image from 'next/image'
import Link from 'next/link'
import { startTransition, useDeferredValue, useMemo, useState } from 'react'
import { ArrowRight, Briefcase, Download, FileCode2, Filter, Search, ShieldCheck } from 'lucide-react'
import type { CareerCategoryDefinition, CareerCategoryId, CareerTemplateEntry } from '@/lib/career-db'
import { cn } from '@/lib/utils'

type CareerHubPageProps = {
  templates: CareerTemplateEntry[]
  categories: Array<CareerCategoryDefinition & { count: number }>
}

function CareerCard({ template }: { template: CareerTemplateEntry }) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_54px_-34px_rgba(15,23,42,0.2)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <Link href={`/career/${template.slug}`} className="block">
        <div className="relative h-72 overflow-hidden bg-slate-50 dark:bg-slate-950">
          <Image
            src={template.previewImage}
            alt={`${template.title} preview`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {template.categoryTitle}
            </p>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {template.theme}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-950 dark:text-slate-50">{template.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {template.summary}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
              {template.audience}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
              Open
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default function CareerHubPage({
  templates,
  categories,
  initialQuery = '',
  initialCategory = 'all',
}: CareerHubPageProps & {
  initialQuery?: string
  initialCategory?: 'all' | CareerCategoryId
}) {
  const [query, setQuery] = useState(initialQuery)
  const [activeCategory, setActiveCategory] = useState<'all' | CareerCategoryId>(initialCategory)
  const deferredQuery = useDeferredValue(query)
  const deferredCategory = useDeferredValue(activeCategory)

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    return templates.filter(template => {
      const matchesCategory = deferredCategory === 'all' || template.category === deferredCategory
      const matchesQuery =
        normalizedQuery.length === 0 ||
        template.title.toLowerCase().includes(normalizedQuery) ||
        template.summary.toLowerCase().includes(normalizedQuery) ||
        template.audience.toLowerCase().includes(normalizedQuery) ||
        template.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)) ||
        template.bestFor.some(item => item.toLowerCase().includes(normalizedQuery))

      return matchesCategory && matchesQuery
    })
  }, [deferredCategory, deferredQuery, templates])

  return (
    <div className="source-hub-scope bg-white dark:bg-slate-950">
      <main className="overflow-hidden pb-14 pt-4 sm:pb-16 sm:pt-8">
        <section className="relative overflow-hidden px-4 pb-10 pt-4 sm:pb-12 lg:px-6">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_26%)]" />
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                <Briefcase className="h-3.5 w-3.5" />
                Career Universe
              </div>
              <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl lg:text-5xl">
                Premium resume templates that stay ATS-friendly
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Browse premium resume and CV templates built from local RenderCV themes, with no external API dependency, cleaner exports, and practical layouts for software, academic, executive, and creative careers.
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-2xl font-black text-slate-950 dark:text-slate-50">{templates.length}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Resume templates
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-2xl font-black text-slate-950 dark:text-slate-50">{categories.length}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Career tracks
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-2xl font-black text-slate-950 dark:text-slate-50">100%</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Local templates
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
              <aside className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={event =>
                      startTransition(() => {
                        setQuery(event.target.value)
                      })
                    }
                    placeholder="Search by role, style, or track..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-600 dark:focus:ring-slate-800"
                  />
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    <Filter className="h-3.5 w-3.5" />
                    Tracks
                  </div>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveCategory('all')}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
                        activeCategory === 'all'
                          ? 'bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      )}
                    >
                      <span>All templates</span>
                      <span className="text-xs opacity-70">{templates.length}</span>
                    </button>
                    {categories.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
                          activeCategory === category.id
                            ? 'bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                        )}
                      >
                        <span>{category.title}</span>
                        <span className="text-xs opacity-70">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Built from local RenderCV source files, so previews and downloads stay fully inside Multiverse.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileCode2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Download starter YAML, edit content locally, and export polished PDF resumes later without browser lock-in.
                    </p>
                  </div>
                </div>
              </aside>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Showing {filteredTemplates.length} template{filteredTemplates.length === 1 ? '' : 's'}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Resume layouts for real applications, not generic builder clutter.
                    </p>
                  </div>
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-100"
                  >
                    <Download className="h-4 w-4" />
                    Resume starter library
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredTemplates.map(template => (
                    <CareerCard key={template.id} template={template} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-2 lg:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {[
              {
                title: 'ATS-safe structure',
                text: 'Every template keeps headings, bullets, dates, and section flow readable for both recruiters and parsers.',
              },
              {
                title: 'Premium without noise',
                text: 'These layouts feel cleaner and more expensive than generic resume builders, but still stay practical for real hiring.',
              },
              {
                title: 'Local and portable',
                text: 'No external API dependency, no vendor lock-in, and no hidden processing layer between you and your resume source.',
              },
            ].map(item => (
              <div
                key={item.title}
                className="rounded-[22px] border border-slate-200/80 bg-white px-5 py-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h2 className="text-base font-bold text-slate-950 dark:text-slate-50">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-4 pt-10 lg:px-6">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Why Career Universe
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">
                Resume templates with local source, cleaner structure, and stronger search intent
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                <p>
                  Career Universe is built for people who want premium resume templates without generic builder clutter,
                  external lock-in, or template pages that say a lot but help very little.
                </p>
                <p>
                  Every template here is sourced locally from structured RenderCV examples, then organized into practical
                  career tracks like software engineering, academic CVs, executive resumes, minimal one-page formats,
                  and more premium creative layouts.
                </p>
                <p>
                  That keeps the experience faster, more transparent, and easier to expand later with local downloads,
                  richer SEO landing pages, and tighter resume workflows fully inside Multiverse.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: 'Are these resume templates ATS-friendly?',
                  answer:
                    'Yes. They are built around readable section order, text-based content, and export-safe layout patterns.',
                },
                {
                  question: 'Do these templates use AI or another resume API?',
                  answer:
                    'No. Career Universe uses local template sources only, with no external AI layer and no third-party resume API.',
                },
                {
                  question: 'Can I download and edit the source?',
                  answer:
                    'Yes. Each detail page includes a YAML starter file that you can download and edit locally for your own workflow.',
                },
              ].map(item => (
                <div
                  key={item.question}
                  className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <h3 className="text-base font-bold text-slate-950 dark:text-slate-50">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
