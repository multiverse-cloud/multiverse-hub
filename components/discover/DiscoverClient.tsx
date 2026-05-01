import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  ChevronRight,
  Clapperboard,
  Compass,
  Film,
  ListChecks,
  Music2,
  PlayCircle,
  Popcorn,
  Sparkles,
  Star,
  Tv,
  Users,
} from "lucide-react";
import type { DiscoverList } from "@/lib/discover-data";
import { getDiscoverIntentLabel } from "@/lib/discover-query";
import { cn } from "@/lib/utils";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Clapperboard,
  Compass,
  Film,
  ListChecks,
  Music2,
  PlayCircle,
  Popcorn,
  Sparkles,
  Tv,
  Users,
};

type DiscoverClientProps = {
  lists: DiscoverList[];
  featuredLists: DiscoverList[];
  categories: string[];
  intents: string[];
  activeCategory: string;
  activeIntent: string;
  currentPage: number;
  pageCount: number;
  totalResults: number;
  totalPublished: number;
  rankingCount: number;
  guideCount: number;
  pageSize: number;
  pageStart: number;
  pageEnd: number;
};

function buildDiscoverHref({
  category,
  intent,
  page,
}: {
  category?: string;
  intent?: string;
  page?: number;
}) {
  const params = new URLSearchParams();

  if (category && category !== "All") {
    params.set("category", category);
  }

  if (intent && intent !== "All") {
    params.set("intent", intent);
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/discover?${query}` : "/discover";
}

function renderPagination({
  currentPage,
  pageCount,
  activeCategory,
  activeIntent,
}: {
  currentPage: number;
  pageCount: number;
  activeCategory: string;
  activeIntent: string;
}) {
  if (pageCount <= 1) {
    return null;
  }

  const nearbyPages = Array.from(
    new Set(
      [1, currentPage - 1, currentPage, currentPage + 1, pageCount].filter(
        (value) => value >= 1 && value <= pageCount,
      ),
    ),
  ).sort((left, right) => left - right);

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-center text-sm text-muted-foreground sm:text-left">
        Page{" "}
        <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
        <span className="font-semibold text-foreground">{pageCount}</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
        <Link
          href={buildDiscoverHref({
            category: activeCategory,
            intent: activeIntent,
            page: currentPage - 1,
          })}
          prefetch={false}
          aria-disabled={currentPage === 1}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors",
            currentPage === 1
              ? "pointer-events-none border-border bg-muted text-muted-foreground"
              : "border-border bg-background text-foreground hover:border-slate-300 hover:text-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-50",
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Prev
        </Link>

        {nearbyPages.map((page, index) => {
          const previousPage = nearbyPages[index - 1];
          const showGap = previousPage && page - previousPage > 1;

          return (
            <div key={page} className="flex items-center gap-2">
              {showGap ? (
                <span className="px-1 text-sm text-muted-foreground">...</span>
              ) : null}
              <Link
                href={buildDiscoverHref({
                  category: activeCategory,
                  intent: activeIntent,
                  page,
                })}
                prefetch={false}
                className={cn(
                  "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors",
                  currentPage === page
                    ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950"
                    : "border-border bg-background text-foreground hover:border-slate-300 hover:text-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-50",
                )}
              >
                {page}
              </Link>
            </div>
          );
        })}

        <Link
          href={buildDiscoverHref({
            category: activeCategory,
            intent: activeIntent,
            page: currentPage + 1,
          })}
          prefetch={false}
          aria-disabled={currentPage === pageCount}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors",
            currentPage === pageCount
              ? "pointer-events-none border-border bg-muted text-muted-foreground"
              : "border-border bg-background text-foreground hover:border-slate-300 hover:text-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-50",
          )}
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function DiscoverClient({
  lists,
  featuredLists,
  categories,
  intents,
  activeCategory,
  activeIntent,
  currentPage,
  pageCount,
  totalResults,
  totalPublished,
  rankingCount,
  guideCount,
  pageSize,
  pageStart,
  pageEnd,
}: DiscoverClientProps) {
  const hasActiveFilters = activeCategory !== "All" || activeIntent !== "All";
  const visibleStart = totalResults > 0 ? pageStart + 1 : 0;
  const visibleEnd = totalResults > 0 ? pageEnd : 0;

  return (
    <div className="min-h-screen">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="mb-3 flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-lg shadow-slate-900/15 dark:bg-slate-100">
              <Compass className="h-5 w-5 text-white dark:text-slate-950" />
            </div>
            <span className="section-label">Discover</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Curated Rankings And Guides
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Browse rankings and guides across AI, money, mobile problems, apps,
            business, politics, games, and entertainment.
          </p>

          {/* Category filter — horizontally scrollable on mobile */}
          <div className="relative mt-4 sm:mt-6">
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white dark:from-slate-950 sm:hidden" />
            <div className="-mx-4 overflow-x-auto scrollbar-hide px-4 pb-1 sm:mx-0 sm:overflow-visible sm:px-0">
              <div className="flex gap-1.5 sm:flex-wrap sm:gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={buildDiscoverHref({
                      category,
                      intent: activeIntent,
                      page: 1,
                    })}
                    prefetch={false}
                    className={cn(
                      "shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      activeCategory === category
                        ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950"
                        : "border-border bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Intent filter — horizontally scrollable on mobile */}
          <div className="relative mt-2 sm:mt-3">
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white dark:from-slate-950 sm:hidden" />
            <div className="-mx-4 overflow-x-auto scrollbar-hide px-4 pb-1 sm:mx-0 sm:overflow-visible sm:px-0">
              <div className="flex gap-1.5 sm:flex-wrap sm:gap-2">
                {intents.map((intent) => (
                  <Link
                    key={intent}
                    href={buildDiscoverHref({
                      category: activeCategory,
                      intent,
                      page: 1,
                    })}
                    prefetch={false}
                    className={cn(
                      "shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      activeIntent === intent
                        ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-slate-950"
                        : "border-border bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {intent}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground sm:hidden">
          <span>{totalPublished} pages</span>
          <span>{rankingCount} rankings</span>
          <span>{guideCount} guides</span>
        </div>

        <div className="mb-5 hidden gap-3 sm:grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              Published Lists
            </p>
            <p className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              {totalPublished}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              Ranking Pages
            </p>
            <p className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              {rankingCount}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 col-span-2 md:col-span-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              Guide Pages
            </p>
            <p className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              {guideCount}
            </p>
          </div>
        </div>

        {featuredLists.length > 0 ? (
          <section className="mb-5 rounded-xl border border-border bg-card p-4 sm:mb-6 sm:rounded-2xl sm:p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <Award className="h-4 w-4 text-yellow-500" />
              Featured editorial picks
            </div>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-3">
              {featuredLists.map((list) => (
                <Link
                  key={list.slug}
                  href={`/discover/${list.slug}`}
                  prefetch={false}
                  className="rounded-2xl border border-border p-3 sm:p-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="tag-beta text-[9px] sm:text-[10px]">
                      {list.category}
                    </span>
                    {list.scope ? (
                      <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200 sm:px-2 sm:text-[10px]">
                        {list.scope}
                      </span>
                    ) : null}
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:px-2 sm:text-[10px]">
                      {getDiscoverIntentLabel(list.title)}
                    </span>
                  </div>
                  <h2 className="mt-2 text-sm font-bold sm:mt-3 sm:text-base">
                    {list.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                    {list.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-xl border border-border bg-card p-4 sm:rounded-2xl sm:p-5">
          <div className="flex flex-col gap-3 border-b border-border pb-3 sm:pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground sm:text-sm">
                Showing {visibleStart}-{visibleEnd} of {totalResults} discover
                pages
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
                {hasActiveFilters
                  ? `Filtered by ${activeCategory !== "All" ? activeCategory : "all categories"} and ${
                      activeIntent !== "All" ? activeIntent : "all intents"
                    }.`
                  : `Page size: ${pageSize}.`}
              </p>
            </div>

            {hasActiveFilters ? (
              <Link
                href="/discover"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-slate-300 hover:text-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-50"
              >
                Reset filters
              </Link>
            ) : null}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {lists.map((list) => {
              const ListIcon = ICONS[list.icon] || Compass;
              const intent = getDiscoverIntentLabel(list.title);
              const topPreview =
                list.type === "guide"
                  ? list.steps
                      .slice(0, 3)
                      .map((step) => `${step.step}. ${step.title}`)
                  : list.items
                      .slice(0, 3)
                      .map((item) => `#${item.rank} ${item.name}`);

              return (
                <Link
                  key={list.id}
                  href={`/discover/${list.slug}`}
                  prefetch={false}
                  className="group rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700 sm:p-5"
                >
                  <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 sm:h-11 sm:w-11">
                        <ListIcon className="h-4 w-4 text-slate-700 dark:text-slate-200 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <span className="tag-beta text-[9px] sm:text-[10px]">
                            {list.category}
                          </span>
                          {list.scope ? (
                            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200 sm:px-2 sm:text-[10px]">
                              {list.scope}
                            </span>
                          ) : null}
                          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:px-2 sm:text-[10px]">
                            {intent}
                          </span>
                          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:px-2 sm:text-[10px]">
                            {list.type}
                          </span>
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
                          Updated {list.updatedAt}
                        </p>
                      </div>
                    </div>
                    {list.featured ? (
                      <Award className="h-3.5 w-3.5 text-yellow-500 sm:h-4 sm:w-4" />
                    ) : null}
                  </div>

                  <h2 className="text-sm font-bold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 sm:text-base">
                    {list.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                    {list.description}
                  </p>

                  <div className="mt-3 hidden space-y-1.5 sm:mt-4 sm:block sm:space-y-2">
                    {topPreview.map((entry) => (
                      <div
                        key={entry}
                        className="rounded-xl bg-muted/40 px-2 py-1.5 text-[10px] font-medium text-foreground sm:px-3 sm:py-2 sm:text-xs"
                      >
                        {entry}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3 sm:mt-5 sm:pt-4">
                    <span className="text-[10px] text-muted-foreground sm:text-xs">
                      {list.type === "guide"
                        ? `${list.steps.length} steps`
                        : `${list.items.length} entries`}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-indigo-600 transition-transform group-hover:translate-x-0.5 dark:text-indigo-400 sm:text-xs">
                      Open page{" "}
                      <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {lists.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <p className="text-sm font-semibold">
                No discover pages match this filter set.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try another category or intent, or clear the filters to browse
                all discover pages.
              </p>
            </div>
          ) : (
            renderPagination({
              currentPage,
              pageCount,
              activeCategory,
              activeIntent,
            })
          )}
        </section>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:mt-8 sm:p-6">
            <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
              <Star className="h-3.5 w-3.5 text-indigo-500 sm:h-4 sm:w-4" />
              SEO direction
            </div>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              Each discover page is designed to become its own indexable landing
              page with unique copy, clear intent, editorial methodology, and
              related internal links.
            </p>
            <Link
              href="/admin/discover"
              prefetch={false}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400 sm:mt-4 sm:text-sm"
            >
              Manage discover content{" "}
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
