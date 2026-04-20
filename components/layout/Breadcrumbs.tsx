"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const ROUTE_LABELS: Record<string, string> = {
  tools: "Tools",
  templates: "Templates",
  library: "Library",
  ui: "UI Components",
  design: "Design",
  dev: "Developer",
  discover: "Discover",
  prompts: "Prompt Hub",
  fixes: "Fixes",
  daily: "Daily Tools",
  news: "News",
  learn: "Learn",
  search: "Search",
  marketplace: "Marketplace",
  ai: "AI",
  pdf: "PDF",
  image: "Image",
  video: "Video",
  audio: "Audio",
  text: "Text",
  seo: "SEO",
  entertainment: "Entertainment",
  effects: "Effects",
};

function formatSegment(segment: string): string {
  if (ROUTE_LABELS[segment]) return ROUTE_LABELS[segment];
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Separator = () => (
  <ChevronRight
    className="h-3 w-3 shrink-0 text-muted-foreground/40"
    aria-hidden="true"
  />
);

export default function Breadcrumbs({
  items,
  className,
}: {
  items?: BreadcrumbItem[];
  className?: string;
}) {
  const pathname = usePathname();

  const crumbs: BreadcrumbItem[] = items ? [...items] : [];

  if (crumbs.length === 0 && pathname) {
    const segments = pathname.split("/").filter(Boolean);
    let accumulated = "";

    for (let i = 0; i < segments.length; i++) {
      accumulated += `/${segments[i]}`;
      const isLast = i === segments.length - 1;

      crumbs.push({
        label: formatSegment(decodeURIComponent(segments[i])),
        href: isLast ? undefined : accumulated,
      });
    }
  }

  if (crumbs.length === 0) return null;

  const hasCollapse = crumbs.length >= 2;
  const parent = crumbs[crumbs.length - 2];
  const current = crumbs[crumbs.length - 1];

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-0.5 sm:gap-1">
        {/* Home — always visible */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
            title="Home"
          >
            <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* ─── MOBILE: collapsed view (< sm) ─── */}
        {hasCollapse && crumbs.length > 2 ? (
          <>
            {/* Ellipsis — mobile only */}
            <li className="flex items-center gap-0.5 sm:hidden">
              <Separator />
              <span
                className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground"
                aria-hidden="true"
                title={crumbs
                  .slice(0, crumbs.length - 2)
                  .map((c) => c.label)
                  .join(" › ")}
              >
                …
              </span>
            </li>

            {/* Parent — mobile only (second-to-last) */}
            <li className="flex items-center gap-0.5 sm:hidden">
              <Separator />
              {parent.href ? (
                <Link
                  href={parent.href}
                  className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
                >
                  <span className="block max-w-[100px] truncate">
                    {parent.label}
                  </span>
                </Link>
              ) : (
                <span className="max-w-[100px] truncate rounded-md px-1.5 py-0.5 text-xs text-muted-foreground">
                  {parent.label}
                </span>
              )}
            </li>

            {/* All middle items — desktop only */}
            {crumbs.slice(0, crumbs.length - 1).map((crumb, i) => (
              <li
                key={`${crumb.label}-${i}`}
                className="hidden items-center gap-0.5 sm:flex"
              >
                <Separator />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground sm:text-sm dark:hover:bg-slate-800"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground sm:text-sm">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </>
        ) : (
          /* 1 crumb total — no collapse needed, show the single item on all sizes */
          crumbs.slice(0, crumbs.length - 1).map((crumb, i) => (
            <li
              key={`${crumb.label}-${i}`}
              className="flex items-center gap-0.5"
            >
              <Separator />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground sm:text-sm dark:hover:bg-slate-800"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground sm:text-sm">
                  {crumb.label}
                </span>
              )}
            </li>
          ))
        )}

        {/* Current (last) item — always visible */}
        <li className="flex items-center gap-0.5">
          <Separator />
          <span
            aria-current="page"
            className="max-w-[140px] truncate rounded-md px-1.5 py-0.5 text-xs font-semibold text-foreground sm:max-w-none sm:text-sm"
          >
            {current.label}
          </span>
        </li>
      </ol>
    </nav>
  );
}
