import type { ReactNode } from 'react'
import type { Tool } from '@/lib/tools-data'
import ToolBreadcrumb from './ToolBreadcrumb'
import ToolActions from './ToolActions'
import RelatedToolsGrid from './RelatedToolsGrid'
import SEOContent from './SEOContent'
import ToolRuntimeBanner from './ToolRuntimeBanner'
import type { ToolRuntimeStatus } from '@/lib/tool-runtime-status'

export default function VideoStudioPageFrame({
  tool,
  children,
  relatedTools,
  runtimeStatus,
}: {
  tool: Tool
  children: ReactNode
  relatedTools: Tool[]
  runtimeStatus?: ToolRuntimeStatus | null
}) {
  return (
    <div className="premium-shell" data-tool-shell="true">
      <div className="tool-mobile-frame mx-auto w-full max-w-7xl px-4 pb-24 pt-3 sm:px-6 lg:px-6 md:py-10">
        <div className="mb-4 flex items-start justify-between gap-3 sm:mb-6">
          <ToolBreadcrumb
            className="mb-0 flex-1"
            items={[
              { label: 'All Tools', href: '/tools' },
              { label: tool.category, href: `/tools/${tool.categorySlug}` },
              { label: tool.name },
            ]}
          />

          <ToolActions slug={tool.slug} name={tool.name} className="mb-0 shrink-0" />
        </div>
        <ToolRuntimeBanner status={runtimeStatus || null} />

        <div className="mobile-section-stack">{children}</div>

        <SEOContent tool={tool} />

        <RelatedToolsGrid tools={relatedTools} categorySlug={tool.categorySlug} />
      </div>
    </div>
  )
}
