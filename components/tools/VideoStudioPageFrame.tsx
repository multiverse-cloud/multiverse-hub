import type { ReactNode } from 'react'
import type { Tool } from '@/lib/tools-data'
import ToolBreadcrumb from './ToolBreadcrumb'
import ToolActions from './ToolActions'
import ToolCard from './ToolCard'
import SEOContent from './SEOContent'
import { UsageHintBanner } from '@/components/auth/LoginGateModal'

export default function VideoStudioPageFrame({
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
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <ToolBreadcrumb
            className="mb-0"
            items={[
              { label: 'All Tools', href: '/tools' },
              { label: tool.category, href: `/tools/${tool.categorySlug}` },
              { label: tool.name },
            ]}
          />

          <ToolActions slug={tool.slug} name={tool.name} className="mb-0 w-full justify-start lg:w-auto lg:justify-end" />
        </div>
        <UsageHintBanner />

        {children}

        <SEOContent tool={tool} />

        {relatedTools.length > 0 && (
          <section className="mt-10">
            <div className="mb-5">
              <p className="premium-kicker">More video workflows</p>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                Related tools
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Continue with more video tools in the same compact editor flow.
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
