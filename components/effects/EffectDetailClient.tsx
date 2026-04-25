'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Check, Copy, FileCode, Monitor, RotateCw, Share2 } from 'lucide-react'
import {
  buildPlaygroundSnippet,
  buildReactSnippet,
  buildTailwindStarter,
  getEffectSlug,
} from '@/lib/ui-code-snippets'
import type { UiCatalogItem } from '@/lib/ui-source-components'
import { cn, copyToClipboard } from '@/lib/utils'
import { trackUiCopy, trackUiView } from '@/lib/ui-engagement'

type EffectDetailClientProps = {
  effect: UiCatalogItem
  relatedEffects: UiCatalogItem[]
}

type PreviewMode = 'split' | 'full'
type CodeTab = 'html' | 'css' | 'react' | 'tailwind' | 'source' | 'usage' | 'playground'

const SourceUiPreview = dynamic(() => import('@/components/ui-source/SourceUiPreview'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-slate-100" />,
})

function getPreviewViewportClass(effect: UiCatalogItem) {
  if (effect.provider === 'hyperui') {
    if (['headers', 'footers', 'feature-grids', 'contact-forms', 'pricing', 'product-collections', 'team-sections', 'tables', 'side-menu', 'vertical-menu'].includes(effect.category)) {
      return 'w-full max-w-[1120px] h-[clamp(280px,58vh,620px)] min-h-[280px] sm:min-h-[360px]'
    }

    if (['buttons', 'badges', 'breadcrumbs', 'button-groups', 'checkboxes', 'radio-groups', 'toggles', 'pagination', 'loaders', 'progress-bars', 'tabs'].includes(effect.category)) {
      return 'w-full max-w-[920px] h-[clamp(220px,34vh,260px)] min-h-[220px]'
    }

    return 'w-full max-w-[960px] h-[clamp(260px,48vh,460px)] min-h-[260px] sm:min-h-[280px]'
  }

  if (effect.kind === 'source') return 'w-full max-w-[720px] min-h-[240px] sm:min-h-[280px]'

  if (['navbar', 'hero', 'feature', 'footer', 'table', 'dashboard', 'sidebar', 'ecommerce', 'layout'].includes(effect.category)) {
    return 'w-full max-w-[1080px] h-[clamp(280px,58vh,620px)] min-h-[280px] sm:min-h-[360px]'
  }

  if (['form', 'auth', 'accordion', 'faq', 'search', 'filter', 'card', 'testimonial', 'pricing', 'stats'].includes(effect.category)) {
    return 'w-full max-w-[760px] h-[clamp(260px,52vh,520px)] min-h-[260px] sm:min-h-[320px]'
  }

  if (['checkbox', 'radio', 'button', 'notification', 'badge', 'hover', 'tooltip', 'toggle', 'separator', 'tabs'].includes(effect.category)) {
    return 'w-full max-w-[460px] h-[clamp(220px,34vh,320px)] min-h-[220px]'
  }

  return 'w-full max-w-[560px] h-[clamp(220px,40vh,380px)] min-h-[220px] sm:min-h-[240px]'
}

function getTabs(effect: UiCatalogItem) {
  if (effect.kind === 'source') {
    return [
      { id: 'source' as const, label: 'source.tsx', code: effect.reactCode || '// Source unavailable' },
      { id: 'usage' as const, label: 'usage.tsx', code: effect.usageCode || '// Usage unavailable' },
    ]
  }

  if (effect.previewDocument) {
    return [
      { id: 'html' as const, label: 'index.html', code: effect.htmlCode },
      { id: 'css' as const, label: 'styles.css', code: effect.cssCode || '/* Styles embedded in the imported HTML preview */' },
    ]
  }

  return [
    { id: 'html' as const, label: 'index.html', code: effect.htmlCode },
    { id: 'css' as const, label: 'styles.css', code: effect.cssCode },
    { id: 'react' as const, label: 'component.tsx', code: buildReactSnippet(effect) },
    { id: 'tailwind' as const, label: 'tailwind.tsx', code: buildTailwindStarter(effect) },
    { id: 'playground' as const, label: 'playground.html', code: buildPlaygroundSnippet(effect) },
  ]
}

function RelatedCard({ effect }: { effect: UiCatalogItem }) {
  const relatedScale = effect.provider === 'hyperui' ? 0.78 : 1
  const slug = getEffectSlug(effect)

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_36px_-28px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700">
      <div className="relative h-40 overflow-hidden bg-white">
        {effect.kind === 'source' ? (
          <SourceUiPreview previewKey={effect.previewKey} compact />
        ) : (
          <iframe
            title={`${effect.title} preview`}
            src={`/ui/${slug}/preview`}
            className="border-0 bg-white"
            sandbox="allow-scripts"
            loading="lazy"
            style={{
              width: `${100 / relatedScale}%`,
              height: `${100 / relatedScale}%`,
              transform: `scale(${relatedScale})`,
              transformOrigin: 'top center',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
      <Link
        href={`/ui/${slug}`}
        className="flex cursor-pointer items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
      >
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            {effect.collectionLabel || effect.category}
          </p>
          <h3 className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">{effect.title}</h3>
        </div>
        <ArrowLeft className="h-4 w-4 rotate-180 text-slate-400 transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-100" />
      </Link>
    </article>
  )
}

export default function EffectDetailClient({ effect, relatedEffects }: EffectDetailClientProps) {
  const router = useRouter()
  const tabs = useMemo(() => getTabs(effect), [effect])
  const [activeTab, setActiveTab] = useState<CodeTab>(tabs[0]?.id || 'html')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('split')
  const [copied, setCopied] = useState(false)
  const [reloadToken, setReloadToken] = useState(0)
  const previewViewportClass = useMemo(() => getPreviewViewportClass(effect), [effect])
  const slug = useMemo(() => getEffectSlug(effect), [effect])

  useEffect(() => {
    trackUiView(effect.id)
  }, [effect.id])

  const activeItem = tabs.find(item => item.id === activeTab) || tabs[0]

  async function handleCopy() {
    if (!activeItem) return
    try {
      await copyToClipboard(activeItem.code)
      trackUiCopy(effect.id)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = `${effect.title} - Multiverse`

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {}
    }

    try {
      await copyToClipboard(url)
    } catch {}
  }

  function handleBack() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('multiverse:show-loader'))
      if (window.history.length > 1) {
        router.back()
        return
      }
    }

    router.push('/ui')
  }

  return (
    <div className="source-hub-scope bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="flex min-h-screen flex-col overflow-hidden bg-white dark:bg-slate-950">
        <header className="z-20 flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 md:px-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="group flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            >
              <div className="rounded-md p-1.5 transition-colors group-hover:bg-slate-100 dark:group-hover:bg-slate-800">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="hidden font-medium sm:inline">Back to Library</span>
            </button>
            <div className="hidden h-6 w-px bg-slate-200 sm:block dark:bg-slate-800" />
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <Monitor className="h-4 w-4" />
              </div>
              <h1 className="line-clamp-1 text-base font-bold tracking-tight text-slate-950 dark:text-white sm:text-lg">{effect.title}</h1>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <div className="hidden items-center rounded-lg border border-slate-200 bg-slate-50 p-1 sm:flex dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setPreviewMode('split')}
                className={cn(
                  'rounded px-3 py-1.5 text-xs font-medium transition-all',
                  previewMode === 'split' ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                Split View
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('full')}
                className={cn(
                  'rounded px-3 py-1.5 text-xs font-medium transition-all',
                  previewMode === 'full' ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                Full Preview
              </button>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-auto flex items-center gap-2 rounded-lg bg-slate-950 px-3.5 py-2 text-sm font-semibold text-white transition-all active:scale-95 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </header>

        <main className="relative flex flex-1 min-w-0 flex-col overflow-hidden lg:flex-row">
          <div
            className={cn(
              'group relative flex min-h-[360px] min-w-0 flex-col overflow-hidden border-b border-slate-200 bg-slate-50 lg:min-h-0 lg:border-b-0 dark:border-slate-800 dark:bg-slate-900',
              previewMode === 'full' ? 'flex-1' : 'flex-[1.2]'
            )}
          >
            <div className="flex h-10 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>
              <span className="text-xs font-medium uppercase tracking-widest text-slate-400">Live Preview</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReloadToken(current => current + 1)}
                  className="text-slate-300 transition-colors hover:text-slate-500"
                  title="Reload preview"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => void handleShare()}
                  className="text-slate-300 transition-colors hover:text-slate-500"
                  title="Share preview"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="custom-scrollbar flex flex-1 items-start justify-center overflow-auto p-3 sm:p-4 md:p-6">
              <div
                className={cn(
                  'relative max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] transition-all duration-500 dark:border-slate-800',
                  previewViewportClass
                )}
              >
                {effect.kind === 'source' ? (
                  <div className="custom-scrollbar h-full w-full overflow-auto">
                    <SourceUiPreview previewKey={effect.previewKey} />
                  </div>
                ) : (
                  <iframe
                    key={`${effect.id}-${reloadToken}`}
                    title={`${effect.title} preview`}
                    src={`/ui/${slug}/preview?reload=${reloadToken}`}
                    className="h-full w-full border-0 bg-white"
                    sandbox="allow-scripts"
                  />
                )}
              </div>
            </div>
          </div>

          {previewMode === 'split' ? (
            <div className="z-10 flex min-h-[360px] min-w-0 flex-1 flex-col border-l border-slate-200 bg-[#1e1e1e] shadow-2xl lg:min-h-0 lg:w-[450px] lg:flex-none xl:w-[600px] dark:border-slate-800">
              <div className="flex h-10 items-center gap-1 border-b border-[#1e1e1e] bg-[#252526] px-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 border-t-2 px-3 py-2 text-xs font-medium transition-colors',
                      activeTab === tab.id
                        ? 'border-blue-500 bg-[#1e1e1e] text-blue-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    )}
                  >
                    <FileCode className="h-3 w-3" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="group relative min-w-0 flex-1 overflow-hidden bg-[#1e1e1e]">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-4 top-4 rounded bg-slate-700/50 p-2 text-slate-300 opacity-0 transition-opacity hover:bg-slate-600 group-hover:opacity-100"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <pre className="custom-scrollbar m-0 h-full overflow-auto p-4 text-sm leading-relaxed text-slate-200">
                  <code>{activeItem?.code}</code>
                </pre>
              </div>
            </div>
          ) : null}
        </main>
      </main>

      {relatedEffects.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">Related components</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">More items from the merged UI library.</p>
            </div>
            <Link href="/ui" className="text-sm font-semibold text-slate-900 transition-colors hover:text-slate-600 dark:text-slate-100 dark:hover:text-slate-300">
              View all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            {relatedEffects.map(relatedEffect => (
              <RelatedCard key={relatedEffect.id} effect={relatedEffect} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
