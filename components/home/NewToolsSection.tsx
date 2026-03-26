import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getLucideIcon } from '@/lib/icons'
import { getTools } from '@/lib/db'

export default async function NewToolsSection() {
  const allTools = await getTools()
  const NEW_TOOLS = allTools.filter(t => t.tags.includes('new')).slice(0, 8)

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-500" />
                <p className="section-label !mb-0">Just Added</p>
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Newly Added Tools</h2>
            </div>

            <Link
              href="/tools?sort=new"
              className="hidden items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 sm:flex"
            >
              See all new <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {NEW_TOOLS.map(tool => {
              const Icon = getLucideIcon(tool.icon)

              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.categorySlug}/${tool.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-all duration-300 group-hover:bg-slate-900 dark:bg-slate-800 dark:group-hover:bg-slate-100">
                    <Icon className="h-5 w-5 text-slate-700 transition-colors group-hover:text-white dark:text-slate-300 dark:group-hover:text-slate-900" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold transition-colors group-hover:text-slate-950 dark:group-hover:text-white">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
