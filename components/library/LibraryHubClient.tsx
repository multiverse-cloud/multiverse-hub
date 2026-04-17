'use client'

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
      <iframe
        title={`${item.title} preview`}
        srcDoc={item.previewDocument}
        className="h-full w-full border-0 bg-white"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
      />
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
      className="group overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="h-52 overflow-hidden bg-white">
        <PreviewSurface item={item} />
      </div>
      <div className="border-t border-slate-100 px-5 py-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          {item.kind === 'template' ? item.templateMeta?.industry || item.categoryLabel : item.categoryLabel}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <h3 className="truncate text-base font-bold text-slate-900">{item.title}</h3>
          <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-900" />
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
      className="group card-hover rounded-[28px] border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-white hover:shadow-2xl"
    >
      <div className="relative z-10">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-3 leading-7 text-slate-600">{description}</p>
        <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
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
    <div className="source-hub-scope bg-white">
      <main className="overflow-hidden pb-20 pt-16">
        <section className="relative overflow-hidden px-4 pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-[800px] w-[800px] translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 h-[800px] w-[800px] -translate-x-1/2 translate-y-1/3 rounded-full bg-indigo-100/50 blur-[120px] animate-pulse-slow delay-700" />
            <div className="source-hub-noise absolute inset-0 opacity-[0.03]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl text-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 inline-flex cursor-default items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-700 hover:shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              <span className="font-semibold text-slate-800">New:</span> Imported {templateItems.length} templates and {uiItems.length} UI resources
            </div>

            <h1 className="animate-in fade-in slide-in-from-bottom-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-6xl font-black leading-[1.05] tracking-tighter text-transparent duration-1000 delay-150 md:text-8xl animate-gradient-x">
              Free Web Templates <br className="hidden md:block" />&amp; UI Components
            </h1>

            <p className="animate-in fade-in slide-in-from-bottom-4 mx-auto mb-12 mt-8 max-w-3xl text-xl leading-relaxed text-slate-600 duration-1000 delay-300 md:text-2xl">
              The cleanest library inside Multiverse for professional HTML templates and reusable UI blocks.{' '}
              <span className="font-semibold text-slate-900">Live previews, copy-ready code, and better browsing.</span>
            </p>

            <div className="animate-in fade-in slide-in-from-bottom-4 mb-16 flex flex-col items-center justify-center gap-4 duration-1000 delay-500 sm:flex-row">
              <Link
                href="/templates"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-105 hover:bg-slate-800 active:scale-95 sm:w-auto"
              >
                <span>Explore Templates</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/ui"
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
              >
                <Boxes className="h-5 w-5 text-slate-600 transition-colors group-hover:text-slate-900" />
                <span>Browse Components</span>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
                <p className="text-4xl font-black text-slate-900">{combinedCount}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Library Items</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
                <p className="text-4xl font-black text-slate-900">{templateItems.length}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Templates</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
                <p className="text-4xl font-black text-slate-900">{uiItems.length}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Components</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-50 py-32">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="relative z-10 mx-auto max-w-7xl px-4">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">Why Developers Choose This Hub</h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600">
                Built for developers, agencies, and founders who want clean starting points without static-site clutter.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
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

        <section className="relative overflow-hidden bg-white py-32">
          <div className="relative z-10 mx-auto max-w-7xl px-4">
            <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">Free HTML &amp; CSS Components Library</h2>
                <p className="mt-6 text-xl text-slate-600">
                  Browse the merged UI set from our existing universe plus the imported hub resources in one cleaner system.
                </p>
              </div>
              <Link
                href="/ui"
                className="group flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700"
              >
                <span>Browse {uiItems.length}+ Components</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredUi.map(item => (
                <ShowcaseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-10 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Boxes className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Browse</h3>
              <p className="mt-4 leading-7 text-slate-600">Search templates and components with the source-style library flow.</p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-10 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Preview</h3>
              <p className="mt-4 leading-7 text-slate-600">Open real previews in the imported shell with the same device modes and loading feel.</p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-10 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Cloud className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Download</h3>
              <p className="mt-4 leading-7 text-slate-600">Get the code bundle directly from our site without needing old static zip handling.</p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 py-32 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold md:text-5xl">Production-Ready Web Templates</h2>
                <p className="mt-6 text-xl text-slate-300">
                  Preview-first template flows now live inside Multiverse with the same source feel and a cleaner code download path.
                </p>
              </div>
              <Link
                href="/templates"
                className="group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-100"
              >
                <span>Browse Templates</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {featuredTemplates.map(item => (
                <ShowcaseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 flex items-end justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Popular Industries</h2>
                <p className="mt-3 text-lg text-slate-600">Imported hub templates are grouped by real industry use-cases.</p>
              </div>
              <Link href="/templates" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                View all templates
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
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
                  className="group flex h-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-slate-900">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="overflow-hidden rounded-[3rem] border border-slate-100 bg-slate-50 p-12 md:p-20">
              <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-700">
                    <Sparkles className="h-4 w-4" />
                    <span>Unified Library</span>
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">Built from imported source data, cleaned for our site.</h2>
                  <p className="mt-8 text-xl leading-relaxed text-slate-600">
                    We kept the strong parts of the original hub, merged it with our existing UI universe, and shaped it into a cleaner product flow.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                    <p className="text-4xl font-black text-slate-900">{uiItems.length}</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">UI Blocks</p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                    <p className="text-4xl font-black text-slate-900">{templateItems.length}</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Templates</p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                    <p className="text-4xl font-black text-slate-900">Live</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Preview Flow</p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                    <p className="text-4xl font-black text-slate-900">Ready</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Code Download</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container relative z-10 mx-auto px-4 py-24">
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center text-white shadow-2xl shadow-blue-900/20 md:p-24">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay source-hub-noise" />
            <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-10 blur-[100px] transition-opacity duration-700 group-hover:opacity-20" />

            <div className="relative z-10">
              <h2 className="mb-8 text-3xl font-black leading-tight md:text-5xl">Ready to Build Your Next Project?</h2>
              <p className="mx-auto mb-12 max-w-2xl text-lg font-medium text-blue-100 md:text-xl">
                Start with the imported source-hub flow, then keep building inside Multiverse with cleaner previews and code access.
              </p>

              <div className="flex flex-col justify-center gap-6 sm:flex-row">
                <Link
                  href="/templates"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white px-10 py-5 text-lg font-bold text-slate-900 shadow-xl transition-all hover:scale-105 hover:bg-slate-50 active:scale-95"
                >
                  <span>Open Templates</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/ui"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-blue-700/50 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-blue-700"
                >
                  <Boxes className="h-5 w-5" />
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
