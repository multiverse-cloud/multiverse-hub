import type { ReactNode } from 'react'
import type { Tool } from '@/lib/tools-data'
import ToolBreadcrumb from './ToolBreadcrumb'
import ToolCard from './ToolCard'
import SEOContent from './SEOContent'

export default function ImageStudioPageFrame({
  tool,
  children,
  relatedTools,
}: {
  tool: Tool
  children: ReactNode
  relatedTools: Tool[]
}) {
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

        <SEOContent tool={tool} />

        {relatedTools.length > 0 && (
          <section className="mt-10">
            <div className="mb-5">
              <p className="premium-kicker">More image workflows</p>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950">
                Related tools
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Continue with more image tools built in the same premium editor flow.
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
