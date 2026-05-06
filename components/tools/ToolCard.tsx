import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { getLucideIcon } from "@/lib/icons";
import type { Tool } from "@/lib/tools-data";

interface Props {
  tool: Tool;
  showNew?: boolean;
  variant?: "compact" | "full" | "related";
}

export default function ToolCard({
  tool,
  showNew,
  variant = "compact",
}: Props) {
  const ToolIcon = getLucideIcon(tool.icon, Wrench);
  const visibleTag = tool.tags.find(
    (tag) => tag !== "new" && tag !== "trending",
  );

  if (variant === "related") {
    return (
      <Link
        href={`/tools/${tool.categorySlug}/${tool.slug}`}
        style={{ minHeight: 44 }}
        className="group relative flex min-w-0 items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-3 py-3 transition-all duration-200 touch-manipulation active:scale-[0.98] hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/[0.06] dark:border-slate-800/70 dark:bg-slate-900/80 dark:hover:border-indigo-800 sm:gap-3 sm:px-4 sm:py-3.5"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800 dark:text-indigo-300 sm:h-9 sm:w-9">
          <ToolIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-xs font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-sm">
            {tool.name}
          </h3>
          <p className="hidden truncate text-xs text-slate-500 dark:text-slate-400 sm:block">
            {tool.category}
          </p>
        </div>
        <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 sm:block" />
      </Link>
    );
  }

  if (variant === "full") {
    return (
      <Link
        href={`/tools/${tool.categorySlug}/${tool.slug}`}
        style={{ minHeight: 44 }}
        className="card-enter group relative rounded-xl border border-slate-200/70 bg-white p-4 transition-all duration-300 touch-manipulation active:scale-[0.97] hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/[0.07] dark:border-slate-800/70 dark:bg-slate-900/80 dark:hover:border-indigo-800"
      >
        {/* Subtle top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/0 to-transparent transition-all duration-300 group-hover:via-indigo-400/50 dark:group-hover:via-indigo-500/40" />

        <div className="flex items-start gap-3">
          {/* Icon — slightly smaller on mobile */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 text-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-600 group-hover:to-indigo-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20 dark:from-indigo-950/30 dark:to-indigo-900/20 dark:text-indigo-300 dark:group-hover:from-indigo-500 dark:group-hover:to-indigo-600 sm:h-11 sm:w-11">
            <ToolIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate font-display text-sm font-bold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {tool.name}
              </h3>
              <div className="flex shrink-0 items-center gap-1.5">
                {visibleTag === "hot" && <span className="tag-hot">Hot</span>}
                {visibleTag === "beta" && (
                  <span className="tag-beta">Beta</span>
                )}
              </div>
            </div>
            {/* Description: 1 line on mobile, 2 lines on sm+ */}
            <p className="mt-0.5 line-clamp-1 text-xs leading-relaxed text-muted-foreground sm:line-clamp-2">
              {tool.description}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-3 dark:border-slate-800/60">
          <span className="text-xs text-muted-foreground">{tool.category}</span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
        </div>
      </Link>
    );
  }

  // compact variant
  return (
    <Link
      href={`/tools/${tool.categorySlug}/${tool.slug}`}
      style={{ minHeight: 44 }}
      className="card-enter group relative flex flex-col gap-2.5 rounded-xl border border-slate-200/70 bg-white p-3 transition-all duration-300 touch-manipulation active:scale-[0.97] hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/[0.07] dark:border-slate-800/70 dark:bg-slate-900/80 dark:hover:border-indigo-800 sm:p-4"
    >
      {/* Subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/0 to-transparent transition-all duration-300 group-hover:via-indigo-400/50 dark:group-hover:via-indigo-500/40" />

      <div className="flex items-center justify-between">
        {/* Icon — smaller on mobile */}
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 text-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-600 group-hover:to-indigo-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20 dark:from-indigo-950/30 dark:to-indigo-900/20 dark:text-indigo-300 dark:group-hover:from-indigo-500 dark:group-hover:to-indigo-600 sm:h-11 sm:w-11">
          <ToolIcon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
        </div>
        <div className="flex items-center gap-1.5">
          {visibleTag === "hot" && <span className="tag-hot">Hot</span>}
          {visibleTag === "beta" && <span className="tag-beta">Beta</span>}
        </div>
      </div>

      <div>
        {/* Name: always single line, truncated */}
        <h3 className="truncate font-display text-xs font-bold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300 sm:text-sm">
          {tool.name}
        </h3>
        {/* Description: hidden on mobile, 2 lines on sm+ */}
        <p className="mt-0.5 hidden text-xs leading-relaxed text-muted-foreground sm:line-clamp-2 sm:block">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
