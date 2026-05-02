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
    <div className="min-h-screen pb-24 premium-shell sm:pb-0">
      <div className="page-hero border-b border-border bg-background">
        <div className="page-hero-inner py-4 sm:py-7 md:py-9">
          <div className="grid gap-5 sm:gap-8 xl:grid-cols-[minmax(0,0.96fr)_minmax(380px,0.54fr)] xl:items-start">
            <div className="order-2 min-w-0 xl:order-1">
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:gap-2 sm:text-[11px] sm:tracking-[0.16em]">
                <span>{prompt.categoryTitle}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{prompt.subcategory}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Free AI prompt</span>
                {prompt.featured ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>Featured</span>
                  </>
                ) : null}
              </div>

              <h1 className="mt-3 max-w-4xl text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-5xl">
                {prompt.title}
              </h1>
              <p className="mt-2 line-clamp-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:mt-4 md:text-base md:leading-7">
                {prompt.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                {prompt.models.map(model => (
                  <span
                    key={model}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    <Bot className="h-3.5 w-3.5" />
                    {model}
                  </span>
                ))}
              </div>
            </div>

            <div className="order-1 min-w-0 xl:sticky xl:order-2 xl:top-24">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_48px_-34px_rgba(15,23,42,0.28)]">
                <div className="relative h-[58vh] min-h-[340px] max-h-[640px] bg-slate-50 dark:bg-slate-950 sm:h-[62vh] xl:h-[calc(100vh-190px)] xl:max-h-[760px]">
                  <PromptPreviewImage
                    src={prompt.previewImage}
                    alt={prompt.previewAlt}
                    category={prompt.category}
                    imageFit="cover"
                    priority
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2.5 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4">
                  <CopyPromptButton
                    prompt={prompt.prompt}
                    eventProperties={{ slug: prompt.slug, source: 'detail_preview' }}
                  />
                  <span className="hidden items-center gap-1.5 text-sm font-semibold text-muted-foreground sm:inline-flex">
                    <Copy className="h-4 w-4" />
                    Copy ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content space-y-7 py-5 sm:space-y-9 sm:py-7">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_340px] xl:gap-8">
          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-foreground sm:text-xl">Prompt</h2>
              <CopyPromptButton
                prompt={prompt.prompt}
                eventProperties={{ slug: prompt.slug, source: 'detail_prompt_panel' }}
              />
            </div>
            <pre className="max-h-[380px] max-w-full overflow-auto whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-3 text-xs leading-6 text-white dark:bg-black/60 sm:max-h-[460px] sm:p-4 sm:text-sm sm:leading-7">
              <code className="whitespace-pre-wrap break-words">{prompt.prompt}</code>
            </pre>
          </div>

          <aside className="min-w-0 space-y-5 sm:space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-sm sm:tracking-[0.16em]">
                Best for
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                {prompt.bestFor.map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-sm sm:tracking-[0.16em]">
                Use it well
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-sm leading-6 text-muted-foreground sm:mt-3 sm:space-y-2">
                {prompt.workflow.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-sm sm:tracking-[0.16em]">
                Quick tips
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-sm leading-6 text-muted-foreground sm:mt-3 sm:space-y-2">
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

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
          <div>
            <h2 className="text-base font-bold text-foreground sm:text-lg">Why it works</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-3 sm:leading-7">{prompt.description}</p>
          </div>

          {prompt.examples.length > 0 ? (
            <div>
              <h2 className="text-base font-bold text-foreground sm:text-lg">Examples</h2>
              <div className="mt-2 space-y-2.5 sm:mt-3 sm:space-y-3">
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
            <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">More prompts to try</h2>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                  <div className="space-y-1.5 px-2.5 py-2.5 sm:space-y-2 sm:px-4 sm:py-3">
                    <p className="line-clamp-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px] sm:tracking-[0.16em]">
                      {related.subcategory || related.categoryTitle}
                    </p>
                    <h3 className="line-clamp-2 text-xs font-semibold text-foreground sm:text-sm">{related.title}</h3>
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground sm:text-sm">
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

      <div className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+76px)] z-40 sm:hidden">
        <CopyPromptButton
          prompt={prompt.prompt}
          eventProperties={{ slug: prompt.slug, source: 'mobile_sticky' }}
          className="w-full justify-center border-slate-900 bg-slate-950 py-3 text-white shadow-[0_18px_48px_-24px_rgba(15,23,42,0.65)] hover:border-slate-900 hover:text-white dark:border-white dark:bg-white dark:text-slate-950 dark:hover:text-slate-950"
        />
      </div>
    </div>
  )
}
