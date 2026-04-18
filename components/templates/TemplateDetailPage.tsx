'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { ArrowLeft, Download, Monitor, RotateCw, Share2, Smartphone, Tablet } from 'lucide-react'
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
  const [loaded, setLoaded] = useState(false)

  const previewSrc = useMemo(() => `/templates/${template.slug}/preview?embed=1&viewport=${viewport}&reload=${reloadToken}`, [reloadToken, template.slug, viewport])
  const downloadHref = template.downloadUrl || `/templates/${template.slug}/download`

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = `${template.title} - Multiverse`

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(url)
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

    router.push('/templates')
  }

  return (
    <div className="source-hub-scope bg-slate-100 dark:bg-slate-950">
      <main className="min-h-screen bg-slate-900 text-white dark:bg-slate-950">
        <header className="z-50 flex h-16 items-center justify-between bg-white px-4 shadow-sm transition-all duration-300 dark:border-b dark:border-slate-800 dark:bg-slate-950 md:px-6">
          <div className="flex items-center gap-3 md:gap-6">
            <button type="button" onClick={handleBack} className="group flex items-center gap-2" title="Back to Library">
              <ArrowLeft className="h-5 w-5 text-gray-500 transition-colors group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" />
              <span className="hidden text-sm font-semibold text-gray-700 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400 sm:block">
                Back to Library
              </span>
            </button>
            <div className="hidden h-6 w-px bg-gray-200 dark:bg-slate-800 sm:block" />
            <div className="flex items-center gap-3">
              <h1 className="max-w-[120px] truncate text-sm font-bold text-gray-900 dark:text-slate-100 md:text-base sm:max-w-none">
                {template.title}
              </h1>
              <span className="hidden rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-950/40 dark:text-blue-300 md:block">
                {template.industry}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="mr-6 hidden items-center gap-2 text-gray-400 dark:text-slate-500 lg:flex">
              <button
                type="button"
                onClick={() => {
                  setLoaded(false)
                  setViewport('mobile')
                }}
                className={cn(
                  'rounded p-2 transition-colors hover:bg-gray-100 dark:hover:bg-slate-900',
                  viewport === 'mobile' && 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300'
                )}
                title="Mobile Mode"
                aria-label="Switch to Mobile View"
              >
                <Smartphone className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoaded(false)
                  setViewport('tablet')
                }}
                className={cn(
                  'rounded p-2 transition-colors hover:bg-gray-100 dark:hover:bg-slate-900',
                  viewport === 'tablet' && 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300'
                )}
                title="Tablet Mode"
                aria-label="Switch to Tablet View"
              >
                <Tablet className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoaded(false)
                  setViewport('desktop')
                }}
                className={cn(
                  'rounded p-2 transition-colors hover:bg-gray-100 dark:hover:bg-slate-900',
                  viewport === 'desktop' && 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300'
                )}
                title="Desktop Mode"
                aria-label="Switch to Desktop View"
              >
                <Monitor className="h-5 w-5" />
              </button>
              <div className="mx-2 h-4 w-px bg-gray-200 dark:bg-slate-800" />
              <button
                type="button"
                onClick={() => {
                  setLoaded(false)
                  setReloadToken(current => current + 1)
                }}
                className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                title="Reload Preview"
              >
                <RotateCw className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => void handleShare()}
                className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                title="Share preview"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            <a
              href={downloadHref}
              target={template.downloadUrl ? '_blank' : undefined}
              rel={template.downloadUrl ? 'noreferrer' : undefined}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 md:px-5"
              download={!template.downloadUrl}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download Free</span>
            </a>
          </div>
        </header>

        <section className="relative flex h-[calc(100vh-4rem)] min-h-[720px] justify-center bg-slate-800 dark:bg-slate-950">
          {!loaded ? (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center space-y-4 bg-gray-900 text-white dark:bg-slate-950">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              <p className="animate-pulse font-medium text-gray-400 dark:text-slate-500">Initializing live preview...</p>
            </div>
          ) : null}

          <div
            className={cn(
              'flex h-full w-full items-start justify-center px-4 pt-4 transition-all duration-500',
              viewport === 'mobile' ? 'max-w-[400px]' : viewport === 'tablet' ? 'max-w-[800px]' : 'max-w-full'
            )}
          >
            <iframe
              key={`${template.slug}-${viewport}-${reloadToken}`}
              src={previewSrc}
              title={`${template.title} live preview`}
              className={cn(
                'h-full w-full rounded-t-xl border border-gray-100 bg-white shadow-2xl transition-all duration-1000 lg:rounded-t-2xl',
                loaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setLoaded(true)}
            />
          </div>
        </section>

        {relatedTemplates.length > 0 ? (
          <section className="mx-auto max-w-7xl px-4 py-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Related templates</h2>
                <p className="mt-1 text-sm text-slate-400">Similar templates from the imported hub library.</p>
              </div>
              <Link href="/templates" className="text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300">
                View all
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedTemplates.map(item => (
                <Link
                  key={item.slug}
                  href={`/templates/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-lg"
                >
                  <div className="h-40 overflow-hidden">
                    <iframe
                      title={`${item.title} poster preview`}
                      srcDoc={`<!doctype html><html><body style="margin:0;background:#fff;display:grid;place-items:center;min-height:100vh;font-family:Inter,sans-serif"><div style="width:92%;height:82%;border:1px solid #e2e8f0;border-radius:24px;background:linear-gradient(135deg,#eff6ff,#ffffff);padding:28px;box-sizing:border-box"><div style="width:150px;height:14px;border-radius:999px;background:#2563eb"></div><div style="margin-top:28px;width:66%;height:36px;border-radius:18px;background:#0f172a"></div><div style="margin-top:18px;width:48%;height:14px;border-radius:999px;background:#cbd5e1"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:34px"><div style="height:110px;border-radius:20px;background:#ffffff;border:1px solid #e2e8f0"></div><div style="height:110px;border-radius:20px;background:#dbeafe"></div></div></div></body></html>`}
                      className="h-full w-full border-0 bg-white"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                  <div className="border-t border-slate-800 px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.industry}</p>
                    <h3 className="mt-1 truncate text-sm font-semibold text-white">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
