import type { ReactNode } from 'react'
import type { Tool } from '@/lib/tools-data'
import ToolBreadcrumb from './ToolBreadcrumb'
import ToolCard from './ToolCard'

const CATEGORY_COPY: Record<string, { kicker: string; description: string }> = {
  audio: {
    kicker: 'More audio workflows',
    description: 'Continue with more polished audio tools in the same studio workspace.',
  },
  text: {
    kicker: 'More text workflows',
    description: 'Move into the next writing, cleanup, and voice workflow without leaving the editor.',
  },
  dev: {
    kicker: 'More developer utilities',
    description: 'Keep moving across the rest of the developer toolkit with the same premium workspace.',
  },
  seo: {
    kicker: 'More SEO workflows',
    description: 'Switch into the next search and content audit tool inside the same premium analysis flow.',
  },
  calculator: {
    kicker: 'More calculator workflows',
    description: 'Move into the next converter, finance check, or personal planning calculator without leaving the workspace.',
  },
}

export default function WorkbenchStudioPageFrame({
  tool,
  children,
  relatedTools,
}: {
  tool: Tool
  children: ReactNode
  relatedTools: Tool[]
}) {
  const copy = CATEGORY_COPY[tool.categorySlug] || {
    kicker: 'Related tools',
    description: 'Continue with more tools in the same workspace flow.',
  }

  return (
    <div className="premium-shell" data-tool-shell="true">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-6 md:py-10">
        <ToolBreadcrumb
          items={[
            { label: 'All Tools', href: '/tools' },
            { label: tool.category, href: `/tools/${tool.categorySlug}` },
            { label: tool.name },
          ]}
        />

        {children}

        {relatedTools.length > 0 && (
          <section className="mt-10">
            <div className="mb-5">
              <p className="premium-kicker">{copy.kicker}</p>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950">
                Related tools
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {copy.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedTools.map(item => (
                <ToolCard key={item.id} tool={item} variant="full" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
