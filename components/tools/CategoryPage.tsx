import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";
import { ACTIVE_CATEGORIES, type Category, type Tool } from "@/lib/tools-data";
import ToolBreadcrumb from "./ToolBreadcrumb";
import ToolActions from "./ToolActions";

export default function CategoryPage({
  category,
  tools,
}: {
  category: Category;
  tools: Tool[];
}) {
  const Icon = getLucideIcon(category.icon);
  const featuredTools = tools.slice(0, 4);
  const relatedCategories = ACTIVE_CATEGORIES.filter(
    (item) => item.slug !== category.slug,
  ).slice(0, 4);

  return (
    <div>
      {/* Category Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-white dark:border-slate-800/60 dark:bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(99,102,241,0.06),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(99,102,241,0.1),transparent)]" />
          <div className="absolute inset-0 grid-bg opacity-[0.08] dark:opacity-[0.04]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 md:py-12 lg:px-6">
          <div className="flex items-start justify-between gap-3">
            <ToolBreadcrumb
              className="mb-0 flex-1"
              items={[
                { label: "All Tools", href: "/tools" },
                { label: category.name },
              ]}
            />
            <ToolActions
              slug={category.slug}
              name={category.name}
              className="mb-0 w-auto shrink-0 justify-end"
            />
          </div>

          <div className="mt-4 sm:mt-6 flex items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 transition-colors sm:h-14 sm:w-14 sm:rounded-2xl dark:bg-indigo-950/30">
              <Icon className="h-5 w-5 text-indigo-600 sm:h-7 sm:w-7 dark:text-indigo-300" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-extrabold text-slate-950 sm:text-3xl dark:text-slate-50">
                {category.name}
              </h1>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground sm:text-base">
                {category.description}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-indigo-600 sm:mt-2 dark:text-indigo-400">
                {tools.length} tools available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12 lg:px-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
          {tools.map((tool, index) => {
            const TIcon = getLucideIcon(tool.icon);
            const visibleTag = tool.tags.find(
              (tag) => tag !== "new" && tag !== "trending",
            );

            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.categorySlug}/${tool.slug}`}
                className="group rounded-xl border border-slate-200/70 bg-white p-3 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/[0.06] sm:p-5 dark:border-slate-800/70 dark:bg-slate-900/80 dark:hover:border-indigo-800 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.03}s`,
                  animationFillMode: "both",
                }}
              >
                <div className="mb-2 flex items-start justify-between sm:mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 transition-all duration-200 group-hover:bg-indigo-600 group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-xl dark:bg-slate-800 dark:group-hover:bg-indigo-500">
                    <TIcon className="h-4 w-4 text-slate-700 transition-colors group-hover:text-white sm:h-5 sm:w-5 dark:text-slate-100 dark:group-hover:text-white" />
                  </div>
                  {visibleTag && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-semibold sm:px-2 sm:text-xs",
                        visibleTag === "hot" ? "tag-hot" : "tag-beta",
                      )}
                    >
                      {visibleTag}
                    </span>
                  )}
                </div>
                <h3 className="mb-1 font-display text-sm font-bold transition-colors group-hover:text-indigo-600 sm:mb-1.5 sm:text-base dark:group-hover:text-indigo-400">
                  {tool.name}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {tool.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-indigo-600 sm:mt-4 dark:text-indigo-400">
                  Use Tool{" "}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-6">
        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50 md:grid-cols-[1.15fr_0.85fr] md:p-7">
          <div>
            <p className="section-label">Category guide</p>
            <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
              What you can do with {category.name.toLowerCase()}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              {category.description} These tools are built for quick browser-based
              workflows, so you can finish common tasks without installing extra
              software or creating a public account.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            {featuredTools.length > 0 ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Popular in this category
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {featuredTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.categorySlug}/${tool.slug}`}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Explore next
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedCategories.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/tools/${item.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
