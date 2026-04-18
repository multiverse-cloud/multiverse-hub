import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { getLucideIcon } from '@/lib/icons'
import { getTools } from '@/lib/db'

export default async function TrendingToolsSection() {
  let allTools = await Promise.resolve([] as Awaited<ReturnType<typeof getTools>>)

  try {
    allTools = await getTools()
  } catch (error) {
    console.error('Trending tools fetch failed:', error)
  }

  const TRENDING_TOOLS = allTools
    .filter(tool => tool.enabled !== false && tool.tags.includes('trending'))
    .slice(0, 12)

  if (TRENDING_TOOLS.length === 0) return null

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Modern mesh gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50/60 via-amber-50/30 to-white dark:from-orange-950/10 dark:via-amber-950/5 dark:to-slate-950" />
      <div className="absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="absolute left-0 top-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-orange-200/50 to-transparent dark:via-orange-900/30" />
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/30">
                  <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="section-label !mb-0">Trending Now</p>
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Most popular this week</h2>
            </div>

            <Link
              href="/tools"
              className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:text-indigo-300 sm:flex"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {TRENDING_TOOLS.map((tool, index) => {
              const Icon = getLucideIcon(tool.icon)

              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.categorySlug}/${tool.slug}`}
                  className="tool-card group animate-fade-in"
                  style={{ animationDelay: `${index * 0.04}s`, animationFillMode: 'both' }}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-all duration-300 group-hover:bg-slate-900 group-hover:scale-105 dark:bg-slate-800 dark:group-hover:bg-slate-100">
                      <Icon className="h-5 w-5 text-slate-700 transition-colors group-hover:text-white dark:text-slate-300 dark:group-hover:text-slate-900" />
                    </div>
                    <div className="flex items-end gap-1 flex-col">
                      {tool.tags.includes('hot') ? <span className="tag-hot">Hot</span> : null}
                    </div>
                  </div>

                  <h3 className="mb-1 text-sm font-semibold leading-tight transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {tool.name}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
                </Link>
              )
            })}
          </div>

          <div className="mt-6 flex justify-center sm:hidden">
            <Link href="/tools" className="btn-secondary flex items-center gap-2 text-sm">
              View all tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
