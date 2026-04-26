import Link from 'next/link'
import { ArrowRight, Bot, Copy, Sparkles } from 'lucide-react'
import CopyPromptButton from '@/components/prompts/CopyPromptButton'
import PromptPreviewImage from '@/components/prompts/PromptPreviewImage'
import type { PromptEntry } from '@/lib/prompt-library-data'

export default function PromptDetailPage({
  prompt,
  relatedPrompts,
}: {
  prompt: PromptEntry
  relatedPrompts: PromptEntry[]
}) {
  return (
    <div className="min-h-screen premium-shell">
      <div className="page-hero border-b border-border bg-background">
        <div className="page-hero-inner py-7 md:py-9">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_420px] xl:items-start">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>{prompt.categoryTitle}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{prompt.subcategory}</span>
                {prompt.featured ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>Featured</span>
                  </>
                ) : null}
              </div>

              <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                {prompt.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                {prompt.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {prompt.models.map(model => (
                  <span
                    key={model}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                  >
                    <Bot className="h-3.5 w-3.5" />
                    {model}
                  </span>
                ))}
              </div>
            </div>

            <div className="min-w-0 xl:sticky xl:top-24">
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="relative aspect-[16/10] bg-slate-50 dark:bg-slate-950">
                  <PromptPreviewImage
                    src={prompt.previewImage}
                    alt={prompt.previewAlt}
                    category={prompt.category}
                    imageFit="cover"
                    priority
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3 px-4 py-4">
                  <CopyPromptButton prompt={prompt.prompt} />
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                    <Copy className="h-4 w-4" />
                    Copy ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content space-y-8 py-6">
        <section className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_360px]">
          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-foreground">Prompt</h2>
              <CopyPromptButton prompt={prompt.prompt} />
            </div>
            <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-4 text-sm leading-7 text-white dark:bg-black/60">
              <code className="whitespace-pre-wrap break-words">{prompt.prompt}</code>
            </pre>
          </div>

          <aside className="min-w-0 space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Best for
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {prompt.bestFor.map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Use it well
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {prompt.workflow.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Quick tips
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {prompt.tips.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h2 className="text-lg font-bold text-foreground">Why it works</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{prompt.description}</p>
          </div>

          {prompt.examples.length > 0 ? (
            <div>
              <h2 className="text-lg font-bold text-foreground">Examples</h2>
              <div className="mt-3 space-y-3">
                {prompt.examples.map(example => (
                  <div key={example.label}>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {example.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{example.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {relatedPrompts.length > 0 ? (
          <section>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Related prompts
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">More prompts to try</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedPrompts.map(related => (
                <Link
                  key={related.slug}
                  href={`/prompts/${related.slug}`}
                  className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_40px_-24px_rgba(15,23,42,0.16)] dark:hover:border-slate-700"
                >
                  <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-950">
                    <PromptPreviewImage
                      src={related.previewImage}
                      alt={related.previewAlt}
                      category={related.category}
                      imageFit="cover"
                    />
                  </div>
                  <div className="space-y-2 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {related.subcategory || related.categoryTitle}
                    </p>
                    <h3 className="text-sm font-semibold text-foreground">{related.title}</h3>
                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                      Open
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
