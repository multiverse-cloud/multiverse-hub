import Link from "next/link";
import type { Metadata } from "next";
import {
  Compass,
  LayoutTemplate,
  Search,
  ShieldAlert,
  Sparkles,
  Wrench,
} from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { searchSiteContent } from "@/lib/site-search-server";
import type { SiteSearchResultType } from "@/lib/site-search";
import { cn } from "@/lib/utils";

const TYPE_META: Record<
  SiteSearchResultType,
  { label: string; icon: typeof Wrench }
> = {
  tool: { label: "Tools", icon: Wrench },
  discover: { label: "Discover", icon: Compass },
  fix: { label: "Fixes", icon: ShieldAlert },
  prompt: { label: "Prompts", icon: Sparkles },
  template: { label: "UI Templates", icon: LayoutTemplate },
};

export const metadata: Metadata = {
  title: "Search - Multiverse",
  description:
    "Search across tools, discover pages, fixes, prompts, and UI templates in one place.",
};

interface SearchPageProps {
  searchParams?: Promise<{
    q?: string | string[];
    type?: string | string[];
  }>;
}

function getParamValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function buildSearchHref(query: string, type: "all" | SiteSearchResultType) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (type !== "all") params.set("type", type);
  const serialized = params.toString();
  return serialized ? `/search?${serialized}` : "/search";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = getParamValue(resolvedSearchParams?.q)?.trim() || "";
  const requestedType = getParamValue(resolvedSearchParams?.type);
  const activeType: "all" | SiteSearchResultType =
    requestedType === "tool" ||
    requestedType === "discover" ||
    requestedType === "fix" ||
    requestedType === "prompt" ||
    requestedType === "template"
      ? requestedType
      : "all";

  const allResults =
    query.length >= 2 ? await searchSiteContent(query, 36) : [];
  const results =
    activeType === "all"
      ? allResults
      : allResults.filter((result) => result.type === activeType);
  const availableTypes = Array.from(
    new Set(allResults.map((result) => result.type)),
  );

  return (
    <PublicLayout>
      <div className="page-content space-y-8 pt-10">
        <section className="rounded-3xl border border-border bg-card p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <p className="section-label">Unified Search</p>
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
                Search Across The Multiverse
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Search tools, discover rankings and guides, fixes, prompts, and UI
            templates from one result surface.
          </p>

          {/* Inline search form */}
          <form action="/search" method="get" className="mt-5">
            {activeType !== "all" && (
              <input type="hidden" name="type" value={activeType} />
            )}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder='Try "AI tools", "pricing page", "JWT decoder"…'
                  autoComplete="off"
                  className="w-full rounded-2xl border border-border bg-background py-2.5 pl-9 pr-4 text-sm outline-none ring-offset-background transition-colors placeholder:text-muted-foreground focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:focus:border-slate-600 dark:focus:ring-slate-800"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter type pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Link
              href={buildSearchHref(query, "all")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                activeType === "all"
                  ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              All results
            </Link>
            {availableTypes.map((type) => (
              <Link
                key={type}
                href={buildSearchHref(query, type)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  activeType === type
                    ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-slate-950"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {TYPE_META[type].label}
              </Link>
            ))}
          </div>
        </section>

        {query.length < 2 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card px-4 py-10 text-center sm:py-12">
            <p className="text-base font-semibold">
              Enter at least 2 characters to search.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try searches like "AI tools", "phone battery", "pricing page", or
              "mobile banking UI".
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card px-4 py-10 text-center sm:py-12">
            <p className="text-base font-semibold">
              No matches found for "{query}".
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a broader phrase or switch back to "All results".
            </p>
          </div>
        ) : (
          <section className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {results.length}
              </span>{" "}
              results for{" "}
              <span className="font-semibold text-foreground">"{query}"</span>
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
              {results.map((result) => {
                const Icon = TYPE_META[result.type].icon;

                return (
                  <Link
                    key={result.id}
                    href={result.href}
                    prefetch={false}
                    className="rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <Icon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {TYPE_META[result.type].label}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {result.badge}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-bold sm:text-base">
                          {result.title}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {result.description}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {result.category}
                      {result.subcategory ? ` • ${result.subcategory}` : ""}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </PublicLayout>
  );
}
