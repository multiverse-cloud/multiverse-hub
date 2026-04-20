"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function ToolBreadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  const fullPathTitle = items.map((i) => i.label).join(" > ");
  const hasCollapse = items.length >= 3;
  const first = items[0];
  const last = items[items.length - 1];
  const middle = items.slice(1, -1);

  return (
    <nav
      aria-label="Breadcrumb"
      title={fullPathTitle}
      className={cn(
        "flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm",
        className,
      )}
    >
      <ol className="flex items-center gap-0.5 sm:gap-1 min-w-0">
        {/* ── First item ── */}
        <li className="flex items-center gap-0.5 sm:gap-1 min-w-0 shrink-0">
          {first.href ? (
            <Link
              href={first.href}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md px-1.5 py-0.5"
            >
              {first.href === "/" ? (
                <>
                  <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">Home</span>
                  <span className="sr-only">Home</span>
                </>
              ) : (
                <span className="truncate max-w-[100px] sm:max-w-none">
                  {first.label}
                </span>
              )}
            </Link>
          ) : (
            <span className="text-muted-foreground truncate max-w-[100px] sm:max-w-none px-1.5 py-0.5">
              {first.label}
            </span>
          )}
        </li>

        {/* ── Mobile ellipsis (shown only when there are middle items, on small screens) ── */}
        {hasCollapse && middle.length > 0 && (
          <>
            <li
              aria-hidden="true"
              className="flex items-center shrink-0 sm:hidden"
            >
              <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
            </li>
            <li
              aria-hidden="true"
              className="flex items-center shrink-0 sm:hidden"
            >
              <span className="text-muted-foreground/60 text-[11px] px-0.5 select-none">
                …
              </span>
            </li>
          </>
        )}

        {/* ── Middle items (hidden on mobile when collapsing, shown on sm+) ── */}
        {middle.map((item, idx) => (
          <li
            key={`middle-${idx}`}
            className="hidden sm:flex items-center gap-0.5 sm:gap-1 min-w-0"
          >
            <ChevronRight
              className="h-3 w-3 text-muted-foreground/40 shrink-0"
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md px-1.5 py-0.5 truncate max-w-[100px] sm:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-muted-foreground truncate max-w-[100px] sm:max-w-none px-1.5 py-0.5">
                {item.label}
              </span>
            )}
          </li>
        ))}

        {/* ── Last item (only if more than one item total) ── */}
        {items.length > 1 && (
          <li className="flex items-center gap-0.5 sm:gap-1 min-w-0">
            <ChevronRight
              className="h-3 w-3 text-muted-foreground/40 shrink-0"
              aria-hidden="true"
            />
            <span
              aria-current="page"
              className="text-foreground font-medium truncate max-w-[140px] sm:max-w-none px-0.5"
            >
              {last.label}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
