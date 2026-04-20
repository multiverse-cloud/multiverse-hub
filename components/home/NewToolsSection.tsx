import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getLucideIcon } from "@/lib/icons";
import { getTools } from "@/lib/db";

export default async function NewToolsSection() {
  let allTools = await Promise.resolve(
    [] as Awaited<ReturnType<typeof getTools>>,
  );

  try {
    allTools = await getTools();
  } catch (error) {
    console.error("New tools fetch failed:", error);
  }

  const NEW_TOOLS = allTools
    .filter((tool) => tool.enabled !== false && tool.tags.includes("new"))
    .slice(0, 6);

  if (NEW_TOOLS.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Violet-tinted background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-violet-50/25 to-white dark:from-slate-950 dark:via-violet-950/8 dark:to-slate-950" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute left-0 top-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-violet-200/50 to-transparent dark:via-violet-900/30" />
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-950/30">
                  <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <p className="section-label !mb-0">Just Added</p>
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Fresh from the workshop
              </h2>
            </div>

            <Link
              href="/tools?tag=new"
              className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:text-indigo-300 sm:flex"
            >
              See all new <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {NEW_TOOLS.map((tool, index) => {
              const Icon = getLucideIcon(tool.icon);

              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.categorySlug}/${tool.slug}`}
                  className="group flex items-start gap-3 sm:gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700 animate-fade-in"
                  style={{
                    animationDelay: `${index * 0.06}s`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-all duration-300 group-hover:bg-slate-900 group-hover:scale-105 dark:bg-slate-800 dark:group-hover:bg-slate-100">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 transition-colors group-hover:text-white dark:text-slate-300 dark:group-hover:text-slate-900" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold transition-colors group-hover:text-slate-950 dark:group-hover:text-white">
                        {tool.name}
                      </h3>
                      <span className="tag-new shrink-0">New</span>
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center sm:hidden">
            <Link
              href="/tools?tag=new"
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              See all new tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
