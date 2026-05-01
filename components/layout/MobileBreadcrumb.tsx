"use client";

import { useState, useEffect } from "react";
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

export default function MobileBreadcrumb({
  className,
}: {
  className?: string;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !pathname) return null;

  const segments = pathname.split("/").filter(Boolean);

  // Don't render on homepage or single-segment paths
  if (segments.length < 2) return null;

  // Universe and tool pages already render their own compact breadcrumb/share row.
  if (
    [
      "tools",
      "discover",
      "prompts",
      "fixes",
      "library",
      "templates",
      "ui",
      "dev",
      "design",
    ].includes(segments[0])
  ) {
    return null;
  }

  // Build full crumb list: Home + each segment
  const allCrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let accumulated = "";
  segments.forEach((seg, i) => {
    accumulated += `/${seg}`;
    const isLast = i === segments.length - 1;
    allCrumbs.push({
      label: formatSegment(decodeURIComponent(seg)),
      href: isLast ? undefined : accumulated,
    });
  });

  // Collapse to max 3 visible items: Home > ... > Current
  // If allCrumbs.length > 3, collapse middle items
  let visibleCrumbs: (
    | BreadcrumbItem
    | { label: "..."; href?: undefined; ellipsis: true }
  )[];

  if (allCrumbs.length <= 3) {
    visibleCrumbs = allCrumbs;
  } else {
    visibleCrumbs = [
      allCrumbs[0],
      { label: "...", ellipsis: true as const },
      allCrumbs[allCrumbs.length - 1],
    ];
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "block md:hidden border-b border-slate-200/60 bg-white/95 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-950/95",
        className,
      )}
    >
      <ol className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 scrollbar-hide">
        {visibleCrumbs.map((crumb, index) => {
          const isLast = index === visibleCrumbs.length - 1;
          const isFirst = index === 0;
          const isEllipsis = "ellipsis" in crumb && crumb.ellipsis;

          return (
            <li key={index} className="flex shrink-0 items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-2.5 w-2.5 shrink-0 text-muted-foreground/40" />
              )}

              {isEllipsis ? (
                <span
                  className="text-[11px] text-muted-foreground/60 px-0.5"
                  aria-hidden="true"
                >
                  &hellip;
                </span>
              ) : isLast ? (
                <span
                  aria-current="page"
                  className="max-w-[56vw] truncate text-[11px] font-semibold text-foreground"
                >
                  {crumb.label}
                </span>
              ) : crumb.href ? (
                <Link
                  href={crumb.href}
                  className="flex items-center gap-1 rounded px-0.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isFirst ? (
                    <>
                      <Home className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </>
                  ) : (
                    <span className="max-w-[6rem] truncate">{crumb.label}</span>
                  )}
                </Link>
              ) : (
                <span className="max-w-[6rem] truncate text-[11px] text-muted-foreground">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
