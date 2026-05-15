import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getSeoLandingPage } from '@/lib/seo-landing-pages'

const searchGroups = [
  {
    title: 'Popular tools',
    links: [
      'compress-image-to-100kb',
      'merge-pdf-online',
      'compress-pdf-online',
      'word-counter-online',
      'json-formatter-online',
      'hash-file',
    ],
  },
  {
    title: 'AI prompt searches',
    links: [
      'free-chatgpt-image-prompts',
      'free-instagram-ai-prompts',
      'free-ai-photo-editing-prompts',
      'viral-ai-image-prompts',
      'free-nano-banana-prompts',
      'ai-linkedin-headshot-prompts',
    ],
  },
  {
    title: 'Template searches',
    links: [
      'free-portfolio-templates',
      'free-saas-templates',
      'free-landing-page-templates',
      'free-dashboard-templates',
      'free-ecommerce-templates',
      'free-ui-components',
    ],
  },
]

export default function PopularSearchesSection() {
  return (
    <section className="border-y border-slate-200/70 bg-slate-50/70 py-10 dark:border-slate-800/70 dark:bg-slate-950 md:py-14">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Popular searches</p>
              <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Fast paths people search for
              </h2>
            </div>
            <Link
              href="/free-tools"
              prefetch={false}
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              Browse all free tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {searchGroups.map(group => (
              <article key={group.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <h3 className="mb-3 text-sm font-black text-slate-950 dark:text-white">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.links.map(slug => {
                    const page = getSeoLandingPage(slug)
                    if (!page) return null

                    return (
                      <Link
                        key={slug}
                        href={`/${page.slug}`}
                        prefetch={false}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
                      >
                        {page.title}
                      </Link>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
