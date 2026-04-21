import type { ReactNode } from "react";
import type { Tool } from "@/lib/tools-data";
import ToolBreadcrumb from "./ToolBreadcrumb";
import ToolActions from "./ToolActions";
import ToolCard from "./ToolCard";
import SEOContent from "./SEOContent";
import ToolRuntimeBanner from "./ToolRuntimeBanner";
import type { ToolRuntimeStatus } from "@/lib/tool-runtime-status";

const CATEGORY_COPY: Record<string, { kicker: string; description: string }> = {
  audio: {
    kicker: "More audio workflows",
    description:
      "Continue with more polished audio tools in the same studio workspace.",
  },
  text: {
    kicker: "More text workflows",
    description:
      "Move into the next writing, cleanup, and voice workflow without leaving the editor.",
  },
  dev: {
    kicker: "More developer utilities",
    description:
      "Keep moving across the rest of the developer toolkit with the same premium workspace.",
  },
  seo: {
    kicker: "More SEO workflows",
    description:
      "Switch into the next search and content audit tool inside the same premium analysis flow.",
  },
  calculator: {
    kicker: "More calculator workflows",
    description:
      "Move into the next converter, finance check, or personal planning calculator without leaving the workspace.",
  },
};

export default function WorkbenchStudioPageFrame({
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
  const copy = CATEGORY_COPY[tool.categorySlug] || {
    kicker: "Related tools",
    description: "Continue with more tools in the same workspace flow.",
  };

  return (
    <div className="premium-shell" data-tool-shell="true">
      <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-6 lg:py-10">
        {/* Header row: breadcrumb + actions */}
        <div className="mb-5 flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-start lg:justify-between">
          <ToolBreadcrumb
            className="mb-0"
            items={[
              { label: "All Tools", href: "/tools" },
              { label: tool.category, href: `/tools/${tool.categorySlug}` },
              { label: tool.name },
            ]}
          />

          <ToolActions
            slug={tool.slug}
            name={tool.name}
            className="mb-0 w-full justify-start lg:w-auto lg:justify-end"
          />
        </div>

        <ToolRuntimeBanner status={runtimeStatus || null} />

        {/* Main workbench content — children are responsible for their own panel layout,
            but we wrap in a block that defaults to stacked on mobile */}
        <div className="w-full">{children}</div>

        <SEOContent tool={tool} />

        {relatedTools.length > 0 && (
          <section className="mt-8 sm:mt-10">
            <div className="mb-4 sm:mb-5">
              <p className="premium-kicker">{copy.kicker}</p>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl dark:text-slate-50">
                Related tools
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-2 dark:text-slate-400">
                {copy.description}
              </p>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {relatedTools.map((item) => (
                <ToolCard key={item.id} tool={item} variant="full" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
