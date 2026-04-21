'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Globe,
  Monitor,
  RotateCw,
  Share2,
  Smartphone,
  Tablet,
  Tag,
  X,
  Zap,
} from 'lucide-react'
import type { TemplateEntry } from '@/lib/template-library-data'
import { cn } from '@/lib/utils'

export default function TemplateDetailPage({
  template,
  relatedTemplates,
}: {
  template: TemplateEntry
  relatedTemplates: TemplateEntry[]
}) {
  const router = useRouter()
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [reloadToken, setReloadToken] = useState(0)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)

  const previewSrc = useMemo(
    () => `/templates/${template.slug}/preview?embed=1&viewport=${viewport}&reload=${reloadToken}`,
    [reloadToken, template.slug, viewport],
  )

  const downloadHref = `/templates/${template.slug}/download`

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = `${template.title} — Multiverse`
    if (navigator.share) {
      try { await navigator.share({ title, url }); return } catch {}
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  function handleBack() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('multiverse:show-loader'))
      if (window.history.length > 1) { router.back(); return }
    }
    router.push('/templates')
  }

  function switchViewport(next: 'mobile' | 'tablet' | 'desktop') {
    if (next === viewport) return
    setIframeLoaded(false)
    setViewport(next)
  }

  function reloadPreview() {
    setIframeLoaded(false)
    setReloadToken(c => c + 1)
  }

  const viewportMaxWidth =
    viewport === 'mobile' ? 'max-w-[390px]' : viewport === 'tablet' ? 'max-w-[820px]' : 'max-w-full'

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0d0e10]">
      {/* ─── Top bar ─── */}
      <header className="relative z-50 flex h-14 shrink-0 items-center justify-between border-b border-white/8 bg-[#111213]/95 px-3 backdrop-blur-xl md:px-5">
        {/* Left: back + title */}
        <div className="flex min-w-0 items-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={handleBack}
            title="Back to Templates"
            className="group flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-slate-400 transition-all hover:bg-white/8 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden text-sm font-semibold sm:block">Back</span>
          </button>

          <div className="hidden h-5 w-px bg-white/10 sm:block" />

          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
              <Globe className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <h1 className="max-w-[140px] truncate text-sm font-bold text-white sm:max-w-xs md:max-w-sm">
              {template.title}
            </h1>
            <span className="hidden shrink-0 rounded-md bg-blue-600/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-400 md:block">
              {template.industry}
            </span>
            {template.priceLabel &&  (
              <span className="hidden shrink-0 rounded-md bg-emerald-600/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 lg:block">
                {template.priceLabel}
              </span>
            )}
          </div>
        </div>

        {/* Centre: viewport switcher */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-xl bg-white/6 p-1 lg:flex">
          <button
            type="button"
            onClick={() => switchViewport('mobile')}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
              viewport === 'mobile'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:bg-white/8 hover:text-white',
            )}
            title="Mobile view"
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile</span>
          </button>
          <button
            type="button"
            onClick={() => switchViewport('tablet')}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
              viewport === 'tablet'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:bg-white/8 hover:text-white',
            )}
            title="Tablet view"
          >
            <Tablet className="h-3.5 w-3.5" />
            <span>Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => switchViewport('desktop')}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
              viewport === 'desktop'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:bg-white/8 hover:text-white',
            )}
            title="Desktop view"
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop</span>
          </button>
        </div>

        {/* Right: actions */}
        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          {/* Reload */}
          <button
            type="button"
            onClick={reloadPreview}
            className="rounded-lg p-2 text-slate-400 transition-all hover:bg-white/8 hover:text-white"
            title="Reload preview"
          >
            <RotateCw className={cn('h-4 w-4 transition-transform', !iframeLoaded && 'animate-spin')} />
          </button>

          {/* Info panel toggle */}
          <button
            type="button"
            onClick={() => setInfoOpen(o => !o)}
            className={cn(
              'rounded-lg p-2 transition-all',
              infoOpen ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/8 hover:text-white',
            )}
            title="Template info"
          >
            <Tag className="h-4 w-4" />
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={() => void handleShare()}
            className="rounded-lg p-2 text-slate-400 transition-all hover:bg-white/8 hover:text-white"
            title="Copy link"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
          </button>

          {/* Open in new tab */}
          <a
            href={previewSrc}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg p-2 text-slate-400 transition-all hover:bg-white/8 hover:text-white md:block"
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          <div className="mx-1 h-5 w-px bg-white/10 hidden sm:block" />

          {/* Download */}
          <a
            href={downloadHref}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-600/40 active:scale-95"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download Free</span>
            <span className="sm:hidden">Get</span>
          </a>
        </div>
      </header>

      {/* ─── Preview area ─── */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Loader overlay */}
        {!iframeLoaded && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-[#0d0e10]">
            {/* Animated loader */}
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-white/8" />
              <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-blue-500" />
              <div className="absolute inset-[6px] h-[44px] w-[44px] animate-spin rounded-full border-4 border-transparent border-t-blue-400/50" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-200">Loading Preview</p>
              <p className="mt-1 text-xs text-slate-500">{template.title}</p>
            </div>
            {/* Skeleton shimmer bars */}
            <div className="flex w-72 flex-col gap-2 rounded-xl border border-white/5 bg-white/3 p-4">
              <div className="h-2.5 w-1/2 animate-pulse rounded-full bg-white/8" />
              <div className="h-2.5 w-full animate-pulse rounded-full bg-white/6 delay-75" />
              <div className="h-2.5 w-3/4 animate-pulse rounded-full bg-white/5 delay-150" />
            </div>
          </div>
        )}

        {/* Mobile viewport strip indicator */}
        {viewport !== 'desktop' && (
          <div className="absolute left-1/2 top-3 z-30 -translate-x-1/2">
            <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-md">
              {viewport === 'mobile' ? <Smartphone className="h-3 w-3" /> : <Tablet className="h-3 w-3" />}
              {viewport === 'mobile' ? '390px' : '820px'}
            </div>
          </div>
        )}

        {/* Iframe container */}
        <div
          className={cn(
            'flex h-full w-full items-start justify-center overflow-auto',
            viewport === 'desktop' ? 'p-0' : 'bg-[#0a0b0c] p-4 pt-12',
          )}
        >
          <div
            className={cn(
              'relative w-full',
              viewportMaxWidth,
              viewport !== 'desktop' && 'h-full overflow-hidden rounded-t-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]',
            )}
            style={{ height: viewport === 'desktop' ? '100%' : undefined }}
          >
            <iframe
              key={`${template.slug}-${viewport}-${reloadToken}`}
              src={previewSrc}
              title={`${template.title} live preview`}
              className={cn(
                'h-full w-full border-0 bg-white transition-opacity duration-500',
                viewport !== 'desktop' && 'rounded-t-2xl',
                iframeLoaded ? 'opacity-100' : 'opacity-0',
              )}
              onLoad={() => setIframeLoaded(true)}
              sandbox="allow-scripts"
              style={{ minHeight: viewport === 'desktop' ? '100%' : '100dvh' }}
            />
          </div>
        </div>

        {/* ─── Info panel (slides in from right) ─── */}
        <div
          className={cn(
            'absolute inset-y-0 right-0 z-30 flex w-80 flex-col overflow-y-auto border-l border-white/8 bg-[#111213]/98 shadow-2xl backdrop-blur-xl transition-all duration-300',
            infoOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <h2 className="text-sm font-bold text-white">Template Info</h2>
            <button type="button" onClick={() => setInfoOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/8 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-5 p-5">
            {/* Title & industry */}
            <div>
              <h3 className="text-base font-bold text-white">{template.title}</h3>
              <p className="mt-0.5 text-sm text-slate-400">{template.summary}</p>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300">
                <Zap className="h-3 w-3 text-blue-400" />
                {template.platformLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300">
                <Code2 className="h-3 w-3 text-violet-400" />
                {template.frameworkLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                {template.priceLabel || 'Free'}
              </span>
            </div>

            {/* Tech stack */}
            {template.techStack?.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {template.techStack.map(tech => (
                    <span key={tech} className="rounded-lg border border-white/8 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {template.tags?.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.slice(0, 10).map(tag => (
                    <span key={tag} className="rounded-full border border-white/6 bg-white/4 px-2.5 py-0.5 text-xs text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* License */}
            {template.license && (
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">License</p>
                <p className="text-xs text-slate-300">{template.license}</p>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="border-t border-white/8 p-5">
            <a
              href={downloadHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500"
            >
              <Download className="h-4 w-4" />
              Download Free
            </a>
            <button
              type="button"
              onClick={() => void handleShare()}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-white/6 hover:text-white"
            >
              {copied ? (
                <><Check className="h-4 w-4 text-emerald-400" /> Link Copied!</>
              ) : (
                <><Copy className="h-4 w-4" /> Copy Link</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Related templates ─── */}
      {relatedTemplates.length > 0 && (
        <div className="shrink-0 border-t border-white/8 bg-[#111213]">
          <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-4 scrollbar-hide md:px-6">
            <div className="shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Related</p>
            </div>

            <div className="flex items-center gap-3">
              {relatedTemplates.map(item => (
                <Link
                  key={item.slug}
                  href={`/templates/${item.slug}`}
                  className="group flex shrink-0 items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 transition-all hover:border-white/15 hover:bg-white/8"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#1a1c1e]">
                    <Globe className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="max-w-[140px] truncate text-xs font-semibold text-slate-200 transition-colors group-hover:text-white">{item.title}</p>
                    <p className="text-[10px] text-slate-500">{item.industry}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />
                </Link>
              ))}
            </div>

            <Link
              href="/templates"
              className="ml-auto shrink-0 rounded-xl border border-white/8 px-4 py-2 text-xs font-semibold text-slate-400 transition-all hover:border-white/15 hover:text-slate-200"
            >
              View all →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
