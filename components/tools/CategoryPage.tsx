import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  PremiumContainer,
  PremiumPage,
  PremiumSection,
} from '@/components/platform/premium/Surface'
import { cn } from '@/lib/utils'
import { getLucideIcon } from '@/lib/icons'
import type { Category, Tool } from '@/lib/tools-data'
import ToolBreadcrumb from './ToolBreadcrumb'

export default function CategoryPage({ category, tools }: { category: Category; tools: Tool[] }) {
  const Icon = getLucideIcon(category.icon)
  return (
    <PremiumPage>
      <PremiumSection className="py-10 md:py-12">
        <PremiumContainer className="w-full px-4 sm:px-6 lg:px-6">
          <ToolBreadcrumb items={[{ label: 'All Tools', href: '/tools' }, { label: category.name }]} />

          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
              <Icon className="h-8 w-8 text-slate-700 dark:text-slate-100" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-extrabold text-slate-950 dark:text-slate-50">{category.name}</h1>
              <p className="mt-1 text-muted-foreground">{category.description}</p>
              <p className="mt-2 text-sm font-semibold text-indigo-600">{tools.length} tools available</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {tools.map(tool => {
              const TIcon = getLucideIcon(tool.icon)
              const visibleTag = tool.tags.find(tag => tag !== 'new' && tag !== 'trending')
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.categorySlug}/${tool.slug}`}
                  className="premium-card group p-4 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                      <TIcon className="h-5 w-5 text-slate-700 dark:text-slate-100" />
                    </div>
                    {visibleTag && (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-semibold',
                          visibleTag === 'hot'
                                ? 'tag-hot'
                                : 'tag-beta'
                        )}
                      >
                        {visibleTag}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1.5 font-display font-bold transition-colors group-hover:text-indigo-600">
                    {tool.name}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600">
                    Use Tool <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              )
            })}
          </div>
        </PremiumContainer>
      </PremiumSection>
    </PremiumPage>
  )
}
