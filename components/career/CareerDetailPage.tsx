import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Download, FileCode2, ShieldCheck } from 'lucide-react'
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb'
import type { CareerTemplateDetail, CareerTemplateEntry } from '@/lib/career-db'

function RelatedCard({ template }: { template: CareerTemplateEntry }) {
  return (
    <Link
      href={`/career/${template.slug}`}
      className="group overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_-30px_rgba(15,23,42,0.16)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      <div className="relative h-48 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <Image
          src={template.previewImage}
          alt={`${template.title} preview`}
          fill
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="border-t border-slate-100 px-4 py-4 dark:border-slate-800">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          {template.categoryTitle}
        </p>
        <h3 className="mt-2 text-base font-bold text-slate-950 dark:text-slate-50">{template.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {template.summary}
        </p>
      </div>
    </Link>
  )
}

export default function CareerDetailPage({
  template,
  relatedTemplates,
}: {
  template: CareerTemplateDetail
  relatedTemplates: CareerTemplateEntry[]
}) {
  return (
    <div className="source-hub-scope bg-white dark:bg-slate-950">
      <main className="pb-14 pt-4 sm:pb-16 sm:pt-8">
        <section className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-col gap-5">
            <ToolBreadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Career Universe', href: '/career' },
                { label: template.categoryTitle },
                { label: template.title },
              ]}
            />

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {template.categoryTitle} · {template.theme}
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
                  {template.title}
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  {template.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/career"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All templates
                </Link>
                <Link
                  href={`/career/${template.slug}/download`}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
                >
                  <Download className="h-4 w-4" />
                  Download YAML
                </Link>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="relative h-[820px] overflow-hidden bg-slate-50 dark:bg-slate-950">
                  <Image
                    src={template.previewImage}
                    alt={`${template.title} preview image`}
                    fill
                    sizes="(min-width: 1280px) 70vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Best for
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {template.bestFor.map(item => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Why this template works
                  </p>
                  <ul className="mt-4 space-y-3">
                    {template.highlights.map(item => (
                      <li key={item} className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    ATS notes
                  </div>
                  <ul className="mt-4 space-y-3">
                    {template.atsNotes.map(item => (
                      <li key={item} className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Includes
                  </p>
                  <ul className="mt-4 space-y-2">
                    {template.sections.map(section => (
                      <li key={section} className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {section}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 lg:px-6">
          <div className="rounded-[26px] border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Starter YAML
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  RenderCV-ready source file you can edit locally.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                <FileCode2 className="h-3.5 w-3.5" />
                YAML
              </div>
            </div>
            <pre className="custom-scrollbar overflow-x-auto px-5 py-5 text-xs leading-6 text-slate-700 dark:text-slate-300">
              <code>{template.yamlContent}</code>
            </pre>
          </div>
        </section>

        {relatedTemplates.length > 0 ? (
          <section className="mx-auto mt-10 max-w-7xl px-4 lg:px-6">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">Related templates</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Similar resume layouts for adjacent career tracks and application styles.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedTemplates.map(entry => (
                <RelatedCard key={entry.id} template={entry} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
