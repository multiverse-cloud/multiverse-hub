import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { CircleHelp, Sparkles, CheckCircle2 } from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import ToolCard from './ToolCard'
import ToolBreadcrumb from './ToolBreadcrumb'

export type PdfStudioContent = {
  howItWorks: ReadonlyArray<{
    title: string
    body: string
  }>
  keyFeatures: ReadonlyArray<{
    title: string
    body: string
    icon: LucideIcon
  }>
  faq: ReadonlyArray<{
    question: string
    answer: string
  }>
  relatedTools: ReadonlyArray<Tool>
}

export default function PdfStudioPageFrame({
  tool,
  content,
  children,
}: {
  tool: Tool
  content: PdfStudioContent
  children: ReactNode
}) {
  return (
    <div className="premium-shell">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-6 md:py-10">
        <ToolBreadcrumb
          items={[
            { label: 'All Tools', href: '/tools' },
            { label: tool.category, href: `/tools/${tool.categorySlug}` },
            { label: tool.name },
          ]}
        />

        {children}

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="premium-card p-6 md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="premium-kicker">Workflow</p>
                <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950">How it works</h2>
              </div>
            </div>
            <div className="space-y-4">
              {content.howItWorks.map((item, index) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white font-display text-sm font-extrabold text-indigo-600 shadow-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-card p-6 md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="premium-kicker">Highlights</p>
                <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950">Key features</h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.keyFeatures.map(item => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-4 font-display text-sm font-bold tracking-tight text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        <section className="premium-card mt-6 p-6 md:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <CircleHelp className="h-5 w-5" />
            </div>
            <div>
              <p className="premium-kicker">Support</p>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950">FAQ</h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {content.faq.map(item => (
              <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white">
                <summary className="cursor-pointer list-none font-display text-sm font-bold tracking-tight text-slate-950">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {content.relatedTools.length > 0 && (
          <section className="mt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="premium-kicker">Continue with</p>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950">Related tools</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">More PDF tools for the same workflow.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.relatedTools.map(item => (
                <ToolCard key={item.id} tool={item} variant="full" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
