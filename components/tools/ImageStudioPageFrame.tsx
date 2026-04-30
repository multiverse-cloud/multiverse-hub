import type { ReactNode } from "react";
import type { Tool } from "@/lib/tools-data";
import ToolBreadcrumb from "./ToolBreadcrumb";
import ToolActions from "./ToolActions";
import RelatedToolsGrid from "./RelatedToolsGrid";
import SEOContent from "./SEOContent";
import ToolRuntimeBanner from "./ToolRuntimeBanner";
import type { ToolRuntimeStatus } from "@/lib/tool-runtime-status";

export default function ImageStudioPageFrame({
  tool,
  children,
  relatedTools,
  runtimeStatus,
}: {
  tool: Tool;
  children: ReactNode;
  relatedTools: Tool[];
  runtimeStatus?: ToolRuntimeStatus | null;
}) {
  return (
    <div className="premium-shell" data-tool-shell="true">
      <div className="mx-auto w-full max-w-7xl px-3 pb-28 pt-4 sm:px-6 sm:py-8 lg:px-6 lg:py-10">
        {/* Header row: breadcrumb + actions */}
        <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6">
          <ToolBreadcrumb
            className="mb-0 flex-1"
            items={[
              { label: "All Tools", href: "/tools" },
              { label: tool.category, href: `/tools/${tool.categorySlug}` },
              { label: tool.name },
            ]}
          />

          <ToolActions
            slug={tool.slug}
            name={tool.name}
            className="mb-0 shrink-0"
          />
        </div>

        <ToolRuntimeBanner status={runtimeStatus || null} />

        {/* Main tool UI — children are responsible for their own layout.
            On mobile the child panels should stack; on desktop they go side-by-side.
            We wrap in a block so consumers that render a single card still look tidy. */}
        <div className="w-full">{children}</div>

        <SEOContent tool={tool} />

        <RelatedToolsGrid tools={relatedTools} categorySlug={tool.categorySlug} />
      </div>
    </div>
  );
}
