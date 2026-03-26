import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { getLucideIcon } from '@/lib/icons'
import { getTools } from '@/lib/db'

export default async function TrendingToolsSection() {
  const allTools = await getTools()
  const TRENDING_TOOLS = allTools.filter(t => t.tags.includes('trending')).slice(0, 12)

  return (
    <section className="bg-slate-50 py-16 md:py-20 dark:bg-slate-950/40">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <p className="section-label !mb-0">Trending Now</p>
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Most Popular Tools</h2>
            </div>

            <Link
              href="/tools"
              className="hidden items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 sm:flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {TRENDING_TOOLS.map(tool => {
              const Icon = getLucideIcon(tool.icon)

              return (
                <Link key={tool.id} href={`/tools/${tool.categorySlug}/${tool.slug}`} className="tool-card group">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-all duration-300 group-hover:bg-slate-900 dark:bg-slate-800 dark:group-hover:bg-slate-100">
                      <Icon className="h-5 w-5 text-slate-700 transition-colors group-hover:text-white dark:text-slate-300 dark:group-hover:text-slate-900" />
                    </div>
                    <div className="flex items-end gap-1 flex-col">
                      {tool.tags.includes('hot') && <span className="tag-hot">Hot</span>}
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
