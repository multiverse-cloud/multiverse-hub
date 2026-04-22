'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Boxes, Cloud, LayoutTemplate, Sparkles, Smartphone, Zap } from 'lucide-react'
import type { LibraryHubItem } from '@/lib/library-hub'

function pickItems(items: LibraryHubItem[], count: number) {
  const seen = new Set<string>()
  const picks: LibraryHubItem[] = []

  for (const item of items) {
    if (picks.length >= count) break
    if (seen.has(item.category)) continue
    picks.push(item)
    seen.add(item.category)
  }

  for (const item of items) {
    if (picks.length >= count) break
    if (picks.some(entry => entry.id === item.id)) continue
    picks.push(item)
  }

  return picks
}

function PreviewSurface({ item }: { item: LibraryHubItem }) {
  if (item.previewDocument) {
    return (
      <div className="h-full w-full overflow-hidden bg-[#eef2f7]">
        <iframe
          title={`${item.title} preview`}
          srcDoc={item.previewDocument}
          className="border-0 bg-white"
          sandbox="allow-scripts"
          loading="lazy"
          scrolling="no"
          style={{
            width: '250%',
            height: '250%',
            transform: 'scale(0.4)',
            transformOrigin: 'top left',
            pointerEvents: 'none',
            background: '#ffffff',
          }}
        />
      </div>
    )
  }

  if (item.previewImage) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-white">
        <Image
          src={item.previewImage}
          alt={`${item.title} preview`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-white to-slate-50 p-5">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.2)]">
        <div className="h-3 w-20 rounded-full bg-slate-200" />
        <div className="mt-4 h-7 w-2/3 rounded-full bg-slate-900/90" />
        <div className="mt-3 h-3 w-1/2 rounded-full bg-slate-200" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="h-3 w-16 rounded-full bg-slate-200" />
            <div className="mt-3 h-12 rounded-xl bg-white ring-1 ring-slate-200" />
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="h-3 w-16 rounded-full bg-slate-200" />
            <div className="mt-3 h-12 rounded-xl bg-white ring-1 ring-slate-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ShowcaseCard({ item }: { item: LibraryHubItem }) {
  return (
    <Link
      href={item.href}
      className="group overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative h-56 overflow-hidden bg-white dark:bg-slate-950">
        <PreviewSurface item={item} />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-all duration-300 group-hover:bg-slate-900/40">
          <span className="translate-y-4 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Details →
          </span>
        </div>
      </div>
      <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-800">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {item.kind === 'template' ? item.templateMeta?.industry || item.categoryLabel : item.categoryLabel}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <h3 className="truncate text-base font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
          <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-900 dark:group-hover:text-white" />
        </div>
      </div>
    </Link>
  )
}

function ResourceCard({
  href,
  icon,
  title,
  description,
  meta,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  meta: string
}) {
  return (
    <Link
      href={href}
      className="group card-hover rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-white hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/60 sm:p-6 md:p-8"
    >
      <div className="relative z-10">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40 dark:text-blue-300 sm:mb-4 sm:h-12 sm:w-12">
          {icon}
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 sm:text-lg md:text-xl">{title}</h3>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400 sm:mt-3 sm:text-sm sm:leading-7">{description}</p>
        <div className="mt-3 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:mt-4 sm:px-3 sm:py-1 sm:text-xs">
          {meta}
        </div>
      </div>
    </Link>
  )
}

export default function LibraryHubClient({
  uiItems,
  templateItems,
}: {
  uiItems: LibraryHubItem[]
  templateItems: LibraryHubItem[]
}) {
  const featuredUi = pickItems(uiItems.filter(item => item.featured), 4)
  const featuredTemplates = pickItems(templateItems.filter(item => item.featured), 2)
  const combinedCount = uiItems.length + templateItems.length

  return (
    <div className="source-hub-scope bg-white dark:bg-slate-950">
      <main className="overflow-hidden pb-12 pt-4 sm:pb-16 sm:pt-8">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden px-3 pb-12 pt-4 md:pb-16 md:pt-8 sm:px-4">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[800px] w-[800px] translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-[120px] animate-pulse-slow dark:bg-blue-900/20" />
            <div className="absolute bottom-0 left-0 h-[800px] w-[800px] -translate-x-1/2 translate-y-1/3 rounded-full bg-indigo-100/50 blur-[120px] animate-pulse-slow delay-700 dark:bg-indigo-900/20" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="text-center">
              <div className="animate-in fade-in slide-in-from-bottom-4 mb-4 inline-flex cursor-default items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-700 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 sm:mb-6 sm:px-4 sm:py-1.5 sm:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">New:</span> Imported {templateItems.length} templates and {uiItems.length} UI resources
              </div>

              <h1 className="animate-in fade-in slide-in-from-bottom-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-2xl font-black leading-[1.05] tracking-tighter text-transparent duration-1000 delay-150 sm:text-3xl md:text-4xl lg:text-6xl animate-gradient-x">
                Free Web Templates <br className="hidden sm:block" />&amp; UI Components
              </h1>

              <p className="animate-in fade-in slide-in-from-bottom-4 mx-auto mb-6 mt-3 max-w-3xl text-xs leading-relaxed text-slate-600 duration-1000 delay-300 dark:text-slate-400 sm:text-sm sm:mb-8 sm:mt-4 sm:text-base md:text-xl">
                The cleanest library inside Multiverse for professional HTML templates and reusable UI blocks.{' '}
                <span className="font-semibold text-slate-900 dark:text-slate-100">Live previews, copy-ready code, and better browsing.</span>
              </p>

              <div className="animate-in fade-in slide-in-from-bottom-4 mb-6 flex flex-col items-center justify-center gap-2 duration-1000 delay-500 sm:mb-8 sm:gap-3 sm:flex-row">
                <Link
                  href="/templates"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-105 hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-900 dark:shadow-white/10 dark:hover:bg-slate-100 sm:w-auto sm:px-6 sm:py-3 sm:text-sm sm:px-8 sm:py-4 sm:text-lg"
                >
                  <span>Explore Templates</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  href="/ui"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-900 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-600 sm:w-auto sm:px-6 sm:py-3 sm:text-sm sm:px-8 sm:py-4 sm:text-lg"
                >
                  <Boxes className="h-3.5 w-3.5 text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100 sm:h-4 sm:w-4 sm:h-5 sm:w-5" />
                  <span>Browse Components</span>
                </Link>
              </div>

              <div className="grid gap-2 grid-cols-2 md:grid-cols-3 md:gap-3">
                <div className="rounded-3xl border border-slate-100 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-4 md:p-6">
                  <p className="text-xl font-black text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl">{combinedCount}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-xs md:text-sm">Library Items</p>
                </div>
                <div className="rounded-3xl border border-slate-100 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-4 md:p-6">
                  <p className="text-xl font-black text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl">{templateItems.length}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-xs md:text-sm">Templates</p>
                </div>
                <div className="rounded-3xl border border-slate-100 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-4 md:p-6 col-span-2 md:col-span-1">
                  <p className="text-xl font-black text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl">{uiItems.length}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-xs md:text-sm">Components</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why Section ─── */}
        <section className="relative overflow-hidden py-10 sm:py-14 md:py-20">
          {/* Modern diagonal gradient bg */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-blue-950/10 dark:to-indigo-950/10" />
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

          <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-4">
            <div className="mb-8 text-center sm:mb-10 md:mb-12">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl lg:text-4xl">Why Developers Choose This Hub</h2>
              <p className="mx-auto mt-3 max-w-2xl text-xs text-slate-600 dark:text-slate-400 sm:text-sm sm:mt-4 sm:text-base md:text-xl">
                Built for developers, agencies, and founders who want clean starting points without static-site clutter.
              </p>
            </div>

            <div className="grid gap-4 md:gap-6 md:grid-cols-3">
              <ResourceCard
                href="/templates"
                icon={<LayoutTemplate className="h-6 w-6" />}
                title="Source-backed templates"
                description="Every template preview and downloadable code pack comes from real files already imported into Multiverse."
                meta={`${templateItems.length}+ templates`}
              />
              <ResourceCard
                href="/ui"
                icon={<Sparkles className="h-6 w-6" />}
                title="Live component previews"
                description="Reusable UI blocks, effects, and imported source components are all previewable before you open the code."
                meta={`${uiItems.length}+ UI items`}
              />
              <ResourceCard
                href="/library"
                icon={<Zap className="h-6 w-6" />}
                title="Faster discovery"
                description="Same hub feel as the source project, but cleaner inside our site with better search, preview, and navigation flow."
                meta="Multiverse-ready"
              />
            </div>
          </div>
        </section>

        {/* ─── UI Components Section ─── */}
        <section className="relative overflow-hidden bg-white py-10 dark:bg-slate-950 sm:py-14 md:py-20">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-indigo-100/40 to-transparent blur-[80px] dark:from-indigo-900/10" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-4">
            <div className="mb-6 flex flex-col items-end justify-between gap-3 md:mb-8 md:gap-4 md:flex-row">
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl lg:text-4xl">Free HTML &amp; CSS Components Library</h2>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm sm:mt-3 sm:text-base md:text-xl">
                  Browse the merged UI set from our existing universe plus the imported hub resources in one cleaner system.
                </p>
              </div>
              <Link
                href="/ui"
                className="group flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 sm:px-5 sm:py-2.5 sm:text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg"
              >
                <span>Browse {uiItems.length}+ Components</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>

            <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredUi.map(item => (
                <ShowcaseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section className="relative overflow-hidden py-8 sm:py-12 md:py-16">
          {/* Dotted pattern bg */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950" />
          <div className="absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="mx-auto grid max-w-7xl gap-3 px-3 md:gap-6 md:grid-cols-3 sm:px-4">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 md:p-8">
              <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300 sm:h-10 sm:w-10 sm:mb-4 md:h-12 md:w-12">
                <Boxes className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 sm:text-lg md:text-xl">Browse</h3>
              <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400 sm:mt-3 sm:text-sm sm:leading-7">Search templates and components with the source-style library flow.</p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7 md:p-10">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 sm:h-12 sm:w-12 sm:mb-6">
                <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 sm:text-xl md:text-2xl">Preview</h3>
              <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400 sm:mt-4 sm:text-sm sm:leading-7">Open real previews in the imported shell with the same device modes and loading feel.</p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7 md:p-10">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300 sm:h-12 sm:w-12 sm:mb-6">
                <Cloud className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 sm:text-xl md:text-2xl">Download</h3>
              <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400 sm:mt-4 sm:text-sm sm:leading-7">Get the code bundle directly from our site without needing old static zip handling.</p>
            </div>
          </div>
        </section>

        {/* ─── Templates Section (Dark) ─── */}
        <section className="relative overflow-hidden bg-slate-950 py-10 text-white sm:py-14 md:py-20">
          {/* Ambient glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full bg-blue-600/8 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-600/6 blur-[80px]" />
          </div>

          <div className="mx-auto max-w-7xl px-3 sm:px-4">
            <div className="mb-6 flex flex-col items-end justify-between gap-3 md:mb-8 md:gap-4 md:flex-row">
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">Production-Ready Web Templates</h2>
                <p className="mt-2 text-xs text-slate-300 sm:text-sm sm:mt-3 sm:text-base md:text-xl">
                  Preview-first template flows now live inside Multiverse with the same source feel and a cleaner code download path.
                </p>
              </div>
              <Link
                href="/templates"
                className="group flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-xs font-bold text-slate-900 transition-all hover:bg-slate-100 sm:px-5 sm:py-2.5 sm:text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg"
              >
                <span>Browse Templates</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>

            <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
              {featuredTemplates.map(item => (
                <ShowcaseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Popular Industries ─── */}
        <section className="relative overflow-hidden py-8 sm:py-12 md:py-16">
          {/* Mesh gradient bg */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950" />

          <div className="mx-auto max-w-7xl px-3 sm:px-4">
            <div className="mb-6 flex items-end justify-between gap-3 md:mb-8 md:gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 sm:text-xl md:text-2xl lg:text-3xl">Popular Industries</h2>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:mt-3 sm:text-sm md:text-base md:text-lg">Imported hub templates are grouped by real industry use-cases.</p>
              </div>
              <Link href="/templates" className="text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                View all templates
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-6">
              {[
                ['SaaS', 'saas'],
                ['Real Estate', 'real-estate'],
                ['Crypto', 'crypto'],
                ['Healthcare', 'healthcare'],
                ['Ecommerce', 'ecommerce'],
                ['Education', 'education'],
              ].map(([label, category]) => (
                <Link
                  key={category}
                  href={`/templates?category=${category}`}
                  className="group flex h-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-2 text-center transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/60 sm:p-3 sm:p-4"
                >
                  <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40 dark:text-blue-300 sm:h-10 sm:w-10 sm:mb-2 md:h-12 md:w-12">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100 sm:text-xs sm:text-sm">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Unified Library Info ─── */}
        <section className="relative overflow-hidden py-8 sm:py-12 md:py-16">
          <div className="absolute inset-0 -z-10 bg-white dark:bg-slate-950" />

          <div className="mx-auto max-w-7xl px-3 sm:px-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 dark:border-slate-800 dark:from-slate-900/80 dark:via-slate-900/40 dark:to-blue-950/10 sm:p-6 md:p-8 lg:p-12">
              <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-8 md:gap-12">
                <div>
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 sm:mb-4 sm:gap-2 sm:px-3 sm:py-1 sm:text-xs">
                    <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>Unified Library</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl lg:text-4xl">Built from imported source data, cleaned for our site.</h2>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:mt-4 sm:text-sm sm:text-base md:text-xl">
                    We kept the strong parts of the original hub, merged it with our existing UI universe, and shaped it into a cleaner product flow.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div className="rounded-3xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4 md:p-6">
                    <p className="text-xl font-black text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl">{uiItems.length}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-xs md:text-sm">UI Blocks</p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4 md:p-6">
                    <p className="text-xl font-black text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl">{templateItems.length}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-xs md:text-sm">Templates</p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4 md:p-6">
                    <p className="text-xl font-black text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl">Live</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-xs md:text-sm">Preview Flow</p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4 md:p-6">
                    <p className="text-xl font-black text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl">Ready</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-xs md:text-sm">Code Download</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="container relative z-10 mx-auto px-3 py-8 sm:px-4 sm:py-12 md:py-16">
          <div className="group relative overflow-hidden rounded-[1.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-center text-white shadow-2xl shadow-blue-900/20 sm:p-6 md:rounded-[2rem] md:p-8 lg:p-12">
            <div className="absolute right-0 top-0 h-[200px] w-[200px] translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-10 blur-[100px] transition-opacity duration-700 group-hover:opacity-20 sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]" />

            <div className="relative z-10">
              <h2 className="mb-3 text-lg font-black leading-tight sm:text-xl md:text-2xl lg:text-4xl">Ready to Build Your Next Project?</h2>
              <p className="mx-auto mb-4 max-w-2xl text-xs font-medium text-blue-100 sm:text-sm sm:mb-6 sm:text-base md:text-lg md:mb-8 md:text-xl">
                Start with the imported source-hub flow, then keep building inside Multiverse with cleaner previews and code access.
              </p>

              <div className="flex flex-col justify-center gap-2 sm:gap-3 sm:flex-row">
                <Link
                  href="/templates"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-xl transition-all hover:scale-105 hover:bg-slate-50 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm sm:px-8 sm:py-4 sm:text-lg"
                >
                  <span>Open Templates</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  href="/ui"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-blue-700/50 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-blue-700 sm:px-5 sm:py-2.5 sm:text-sm sm:px-8 sm:py-4 sm:text-lg"
                >
                  <Boxes className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:h-5 sm:w-5" />
                  <span>Explore UI</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
