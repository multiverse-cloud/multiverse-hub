import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CircleHelp, Sparkles, CheckCircle2 } from "lucide-react";
import type { Tool } from "@/lib/tools-data";
import ToolCard from "./ToolCard";
import ToolActions from "./ToolActions";
import ToolBreadcrumb from "./ToolBreadcrumb";
import SEOContent from "./SEOContent";
import ToolRuntimeBanner from "./ToolRuntimeBanner";
import type { ToolRuntimeStatus } from "@/lib/tool-runtime-status";

export type PdfStudioContent = {
  howItWorks: ReadonlyArray<{
    title: string;
    body: string;
  }>;
  keyFeatures: ReadonlyArray<{
    title: string;
    body: string;
    icon: LucideIcon;
  }>;
  faq: ReadonlyArray<{
    question: string;
    answer: string;
  }>;
  relatedTools: ReadonlyArray<Tool>;
};

export default function PdfStudioPageFrame({
  tool,
  content,
  children,
  runtimeStatus,
}: {
  tool: Tool;
  content: PdfStudioContent;
  children: ReactNode;
  runtimeStatus?: ToolRuntimeStatus | null;
}) {
  return (
    <div className="premium-shell" data-tool-shell="true">
      <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-6 lg:py-10">
        {/* Header row: breadcrumb + actions */}
        <div className="mb-4 flex items-start justify-between gap-3 sm:mb-6">
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

        {/* Main tool UI (upload zone + result panel injected here) */}
        {children}

        {/* Info sections: How it works + Key features */}
        <div className="mt-8 grid gap-5 sm:mt-10 xl:grid-cols-[1.05fr_0.95fr]">
          {/* How it works */}
          <section className="premium-card p-4 sm:p-6 md:p-7">
            <div className="mb-4 flex items-center gap-3 sm:mb-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 sm:h-11 sm:w-11">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <p className="premium-kicker">Workflow</p>
                <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl">
                  How it works
                </h2>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {content.howItWorks.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:gap-4 sm:p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-white font-display text-sm font-extrabold text-indigo-600 shadow-sm sm:h-9 sm:w-9">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold tracking-tight text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key features */}
          <section className="premium-card p-4 sm:p-6 md:p-7">
            <div className="mb-4 flex items-center gap-3 sm:mb-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 sm:h-11 sm:w-11">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <p className="premium-kicker">Highlights</p>
                <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl">
                  Key features
                </h2>
              </div>
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 sm:gap-4">
              {content.keyFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-3 font-display text-sm font-bold tracking-tight text-slate-950 sm:mt-4">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600 sm:mt-2">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* FAQ */}
        <section className="premium-card mt-5 p-4 sm:mt-6 sm:p-6 md:p-7">
          <div className="mb-4 flex items-center gap-3 sm:mb-6">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 sm:h-11 sm:w-11">
              <CircleHelp className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="premium-kicker">Support</p>
              <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl">
                FAQ
              </h2>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
            {content.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-3 open:bg-white sm:p-4"
              >
                <summary className="cursor-pointer list-none font-display text-sm font-bold tracking-tight text-slate-950">
                  {item.question}
                </summary>
                <p className="mt-2.5 text-sm leading-6 text-slate-600 sm:mt-3">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <SEOContent tool={tool} />

        {/* Related tools */}
        {content.relatedTools.length > 0 && (
          <section className="mt-8 sm:mt-10">
            <div className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
              <div>
                <p className="premium-kicker">Continue with</p>
                <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
                  Related tools
                </h2>
                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-2">
                  More PDF tools for the same workflow.
                </p>
              </div>
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
              {content.relatedTools.map((item) => (
                <ToolCard key={item.id} tool={item} variant="full" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
