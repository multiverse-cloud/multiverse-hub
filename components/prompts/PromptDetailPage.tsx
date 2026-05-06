'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Bot, Check, Copy, Sparkles } from 'lucide-react'
import PromptPreviewImage from '@/components/prompts/PromptPreviewImage'
import { trackPromptEvent } from '@/components/prompts/promptAnalytics'
import type { PromptEntry } from '@/lib/prompt-library-data'

function StickyMobileCopyButton({ prompt, slug }: { prompt: string; slug: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-0 right-0 z-40 px-3 md:hidden">
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(prompt)
          trackPromptEvent('Prompt Copied', { slug, source: 'detail_sticky_mobile' })
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3.5 text-sm font-bold text-white shadow-lg transition active:scale-[0.98] dark:bg-white dark:text-slate-950"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400 dark:text-emerald-600" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy Prompt'}
      </button>
    </div>
  )
}

function InlineCopyButton({ prompt, slug, source }: { prompt: string; slug: string; source: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(prompt)
        trackPromptEvent('Prompt Copied', { slug, source })
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-500" />}
      {copied ? 'Copied' : 'Copy Prompt'}
    </button>
  )
}

export default function PromptDetailPage({
  prompt,
  relatedPrompts,
}: {
  prompt: PromptEntry
  relatedPrompts: PromptEntry[]
}) {
  const keywords = Array.from(new Set(prompt.tags)).slice(0, 8)
  const bestFor = prompt.bestFor.slice(0, 4)
  const workflow = prompt.workflow.slice(0, 3)
  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/prompts" className="inline-flex items-center gap-1 font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="h-3 w-3" />
              Prompts
            </Link>
            <span>/</span>
            <span className="truncate font-medium text-slate-900 dark:text-white">{prompt.title}</span>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-10 xl:items-start">

          {/* Left — Meta info */}
          <div className="order-2 xl:order-1">
            {/* Category / subcategory tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <span>{prompt.categoryTitle}</span>
              <span>·</span>
              <span>{prompt.subcategory}</span>
              {prompt.featured ? <><span>·</span><span>Featured</span></> : null}
            </div>

            {/* Title */}
            <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
              {prompt.title}
            </h1>

            {/* Summary */}
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base sm:leading-7">
              {prompt.summary}
            </p>

            {/* Model tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {prompt.models.map(m => (
                <span key={m} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-400">
                  <Bot className="h-3.5 w-3.5" />
                  {m}
                </span>
              ))}
            </div>

            {/* Copy button — desktop inline */}
            <div className="mt-5 hidden md:block">
              <InlineCopyButton prompt={prompt.prompt} slug={prompt.slug} source="detail_header_desktop" />
            </div>

            {/* Prompt text */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Prompt</h2>
                <div className="hidden md:block">
                  <InlineCopyButton prompt={prompt.prompt} slug={prompt.slug} source="detail_prompt_panel" />
                </div>
              </div>
              <pre className="max-h-[300px] overflow-auto rounded-xl bg-slate-950 p-3.5 text-xs leading-6 text-slate-100 dark:bg-black/50 sm:max-h-[320px] sm:p-4 sm:text-sm sm:leading-7">
                <code className="whitespace-pre-wrap break-words">{prompt.prompt}</code>
              </pre>
            </div>

            {/* Meta grid: Best for + How to use */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {bestFor.length > 0 ? (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Best for</h3>
                  <ul className="mt-3 space-y-1.5">
                    {bestFor.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {workflow.length > 0 ? (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">How to use</h3>
                  <ol className="mt-3 space-y-1.5">
                    {workflow.map((item, i) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="mt-0.5 text-xs font-bold text-slate-300 dark:text-slate-600">{i + 1}.</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </div>

            {/* Why it works */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Why it works</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{prompt.description}</p>
            </div>

            {/* Keywords */}
            {keywords.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Keywords</h3>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {keywords.map(k => (
                    <Link
                      key={k}
                      href={`/prompts?q=${encodeURIComponent(k)}`}
                      prefetch={false}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-950 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      #{k.replace(/^#/, '')}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right — Image card sticky */}
          <div className="order-1 xl:order-2 xl:sticky xl:top-20">
            <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800">
              <div className="relative h-[80vw] min-h-[340px] max-h-[620px] bg-white dark:bg-slate-950 sm:h-[520px] xl:h-[560px]">
                <PromptPreviewImage
                  src={prompt.previewImage}
                  alt={prompt.previewAlt}
                  category={prompt.category}
                  imageFit="contain"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 360px"
                />
              </div>
              {/* Copy button under image */}
              <div className="hidden border-t border-slate-200 px-4 py-3 dark:border-slate-800 md:block">
                <InlineCopyButton prompt={prompt.prompt} slug={prompt.slug} source="detail_image_card" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Related prompts ── */}
        {relatedPrompts.length > 0 ? (
          <section className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  <Sparkles className="h-3.5 w-3.5" />
                  Related prompts
                </div>
                <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">More to try</h2>
              </div>
              <Link href="/prompts" prefetch={false} className="shrink-0 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                Browse all
              </Link>
            </div>

            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 md:grid-cols-4">
              {relatedPrompts.map(r => (
                <Link
                  key={r.slug}
                  href={`/prompts/${r.slug}`}
                  className="group w-[46vw] max-w-[190px] shrink-0 overflow-hidden rounded-xl ring-1 ring-slate-200 transition-all hover:-translate-y-0.5 hover:ring-slate-400 dark:ring-slate-800 dark:hover:ring-slate-600 sm:w-auto sm:max-w-none"
                >
                  <div className="relative aspect-[4/5] bg-white dark:bg-slate-950">
                    <PromptPreviewImage
                      src={r.previewImage}
                      alt={r.previewAlt}
                      category={r.category}
                      imageFit="contain"
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 50vw, 25vw"
                      imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-2.5 sm:p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{r.subcategory || r.categoryTitle}</p>
                    <h3 className="mt-1 line-clamp-2 text-xs font-semibold text-slate-900 dark:text-white sm:text-sm">{r.title}</h3>
                    <div className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
                      Open <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* Sticky mobile copy button */}
      <StickyMobileCopyButton prompt={prompt.prompt} slug={prompt.slug} />
    </div>
  )
}
