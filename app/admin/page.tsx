import { stat } from "fs/promises";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Compass,
  FileText,
  Globe2,
  LayoutTemplate,
  TriangleAlert,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ACTIVE_CATEGORIES } from "@/lib/tools-data";
import { UNIVERSES } from "@/lib/universes-data";
import { getTools } from "@/lib/db";
import { getAdminDiscoverLists } from "@/lib/discover-db";
import { getLocalDiscoverStorePaths } from "@/lib/discover-local-store";
import { getPublishedPrompts } from "@/lib/prompt-db";
import { getPublishedTemplates } from "@/lib/template-db";
import { getCloudinaryConfig } from "@/lib/cloudinary";
import { getGoogleAdsenseClient, isGoogleAdsenseEnabled } from "@/lib/adsense";
import { cn } from "@/lib/utils";
import { isCommandAvailable, YTDLP_PATH } from "@/lib/server-utils";

export const dynamic = "force-dynamic";

function formatRelativeDateLabel(value: string) {
  const target = new Date(value);
  if (Number.isNaN(target.getTime())) {
    return value;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((today.getTime() - target.getTime()) / 86400000);

  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
}

type QuickAction = {
  label: string;
  href: string;
  icon: LucideIcon;
  color: "indigo" | "emerald" | "rose" | "violet";
  external?: boolean;
};

const quickActions: QuickAction[] = [
  { label: "Add Tool", href: "/admin/tools", icon: Wrench, color: "indigo" },
  {
    label: "New Discover List",
    href: "/admin/discover",
    icon: Compass,
    color: "emerald",
  },
  {
    label: "Upload Prompt",
    href: "/admin/prompts",
    icon: FileText,
    color: "rose",
  },
  {
    label: "View Site",
    href: "/",
    icon: Globe2,
    color: "violet",
    external: true,
  },
];

export default async function AdminDashboard() {
  const [tools, discoverLists, prompts, templates] = await Promise.all([
    getTools(),
    getAdminDiscoverLists(),
    getPublishedPrompts(),
    getPublishedTemplates(),
  ]);

  const enabledTools = tools.filter((tool) => tool.enabled !== false);
  const publishedDiscover = discoverLists.filter((list) => list.published);
  const featuredDiscover = discoverLists.filter((list) => list.featured);
  const rankingCount = discoverLists.filter(
    (list) => list.type === "ranking",
  ).length;
  const guideCount = discoverLists.filter(
    (list) => list.type === "guide",
  ).length;

  const discoverStorePaths = getLocalDiscoverStorePaths();
  const discoverStoreStats = await stat(discoverStorePaths.storeFile).catch(
    () => null,
  );
  const cloudinaryConfig = getCloudinaryConfig();
  const adsenseClient = getGoogleAdsenseClient();
  const adsenseEnabled = isGoogleAdsenseEnabled();
  const discoverStoreSizeKb = discoverStoreStats
    ? Math.max(1, Math.round(discoverStoreStats.size / 1024))
    : 0;
  const ytDlpAvailable = isCommandAvailable(YTDLP_PATH);

  const healthCards = [
    {
      name: "Discover storage",
      status: "Local JSON",
      healthy: true,
      detail: discoverStoreStats
        ? `${discoverStoreSizeKb} KB • updated ${formatRelativeDateLabel(discoverStoreStats.mtime.toISOString())}`
        : "Local store file will be created on first save or import.",
    },
    {
      name: "Tool source",
      status: "Local JSON",
      healthy: true,
      detail:
        "External database sync is disabled. Tools now run from local source data only.",
    },
    {
      name: "AI tools",
      status: process.env.OPENROUTER_API_KEY ? "Configured" : "Needs key",
      healthy: Boolean(process.env.OPENROUTER_API_KEY),
      detail: process.env.OPENROUTER_API_KEY
        ? "OpenRouter-backed tools should be available."
        : "Set `OPENROUTER_API_KEY` to enable hosted AI text workflows.",
    },
    {
      name: "Audio AI",
      status: process.env.OPENAI_API_KEY ? "Configured" : "Needs key",
      healthy: Boolean(process.env.OPENAI_API_KEY),
      detail: process.env.OPENAI_API_KEY
        ? "Speech-to-text and TTS routes are ready."
        : "Set `OPENAI_API_KEY` to enable TTS and transcription.",
    },
    {
      name: "Video downloader",
      status: ytDlpAvailable ? "Binary ready" : "Binary missing",
      healthy: ytDlpAvailable,
      detail: ytDlpAvailable
        ? `Using ${YTDLP_PATH}.`
        : "Install `yt-dlp` or point `YTDLP_PATH` to the binary for hosted downloads.",
    },
    {
      name: "Remove background",
      status: process.env.REMOVEBG_API_KEY ? "Configured" : "Hosted disabled",
      healthy: Boolean(process.env.REMOVEBG_API_KEY),
      detail: process.env.REMOVEBG_API_KEY
        ? "Hosted background removal can call Remove.bg."
        : "Add `REMOVEBG_API_KEY` to remove the hosted-demo disabled state.",
    },
    {
      name: "Cloudinary previews",
      status: cloudinaryConfig.cloudName ? "Configured" : "Needs cloud",
      healthy: Boolean(cloudinaryConfig.cloudName),
      detail: cloudinaryConfig.cloudName
        ? `Using cloud "${cloudinaryConfig.cloudName}" for prompt and template preview images.`
        : "Set `CLOUDINARY_CLOUD_NAME` before uploading new prompt/template screenshots.",
    },
    {
      name: "Google AdSense",
      status: adsenseEnabled ? "Enabled" : adsenseClient ? "Ready, off" : "Not configured",
      healthy: Boolean(adsenseClient),
      detail: adsenseEnabled
        ? "Auto ads script and ads.txt are active for the current deployment."
        : adsenseClient
          ? "Publisher ID is present. Enable only after the domain is approved in AdSense."
          : "Set `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` and keep `NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED=false` until review is complete.",
    },
  ];

  const recentDiscoverChanges = [...discoverLists]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, 6);

  const toolsByCategory = ACTIVE_CATEGORIES.map((category) => {
    const categoryTools = tools.filter(
      (tool) => tool.categorySlug === category.slug,
    );
    return {
      slug: category.slug,
      name: category.name,
      total: categoryTools.length,
      enabled: categoryTools.filter((tool) => tool.enabled !== false).length,
      trending: categoryTools.filter((tool) => tool.tags.includes("trending"))
        .length,
    };
  });

  const stats = [
    {
      label: "Total Tools",
      value: tools.length,
      supporting: `${enabledTools.length} enabled`,
      trend: `${Math.round((enabledTools.length / Math.max(tools.length, 1)) * 100)}% active`,
      icon: Wrench,
      tone: "indigo",
      borderColor: "border-l-indigo-500",
    },
    {
      label: "Discover Pages",
      value: discoverLists.length,
      supporting: `${publishedDiscover.length} published`,
      trend: `${featuredDiscover.length} featured`,
      icon: Compass,
      tone: "emerald",
      borderColor: "border-l-emerald-500",
    },
    {
      label: "Prompt Pages",
      value: prompts.length,
      supporting: `${prompts.filter((p) => p.featured).length} featured`,
      trend: "live",
      icon: Activity,
      tone: "rose",
      borderColor: "border-l-rose-500",
    },
    {
      label: "UI Templates",
      value: templates.length,
      supporting: `${templates.reduce((t, tmpl) => t + tmpl.files.length, 0)} code files`,
      trend: "live",
      icon: LayoutTemplate,
      tone: "violet",
      borderColor: "border-l-violet-500",
    },
    {
      label: "Universes",
      value: UNIVERSES.length,
      supporting: "Navigation surfaces",
      trend: "active",
      icon: Globe2,
      tone: "sky",
      borderColor: "border-l-sky-500",
    },
  ];

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-screen-xl space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1.5">
          <p className="premium-kicker">Admin Panel</p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Real counts, discover health, and tool readiness across the current
            local-first setup.{" "}
            <span className="font-medium text-foreground/60">
              Last refreshed {lastUpdated}.
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/discover"
            className="btn-secondary gap-2 px-4 py-2 text-sm"
          >
            <Compass className="h-4 w-4" />
            Open Discover
          </Link>
          <Link
            href="/admin/tools"
            className="btn-primary gap-2 px-4 py-2 text-sm"
          >
            <Wrench className="h-4 w-4" />
            Manage Tools
          </Link>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                {...(action.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={cn(
                  "group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm transition-colors hover:border-slate-300 dark:hover:border-slate-700",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                      action.color === "indigo" &&
                        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300",
                      action.color === "emerald" &&
                        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300",
                      action.color === "rose" &&
                        "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-300",
                      action.color === "violet" &&
                        "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold">{action.label}</span>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          At a Glance
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={cn(
                  "rounded-[24px] border border-border bg-card p-5 shadow-sm border-l-4",
                  s.borderColor,
                )}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-2xl",
                      s.tone === "indigo" &&
                        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300",
                      s.tone === "emerald" &&
                        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300",
                      s.tone === "rose" &&
                        "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-300",
                      s.tone === "violet" &&
                        "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300",
                      s.tone === "sky" &&
                        "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
                      s.tone === "indigo" &&
                        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300",
                      s.tone === "emerald" &&
                        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
                      s.tone === "rose" &&
                        "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300",
                      s.tone === "violet" &&
                        "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",
                      s.tone === "sky" &&
                        "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",
                    )}
                  >
                    {s.trend}
                  </span>
                </div>
                <p className="text-3xl font-black tracking-tight">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-2 text-xs font-semibold text-foreground/60">
                  {s.supporting}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tool Distribution + Health Checks ── */}
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <h2 className="font-bold">Tool Distribution</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Current category mix using live tool state instead of
                placeholder counts.
              </p>
            </div>
            <Link
              href="/admin/tools"
              className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-300"
            >
              Manage tools
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {toolsByCategory.map((category) => (
              <div
                key={category.slug}
                className="rounded-2xl border border-border bg-background p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{category.name}</p>
                  {category.trending > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                      <Zap className="h-3 w-3" />
                      {category.trending} hot
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-muted/40 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Total
                    </p>
                    <p className="mt-1 text-lg font-black">{category.total}</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Enabled
                    </p>
                    <p className="mt-1 text-lg font-black">
                      {category.enabled}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          <div className="border-b border-border pb-4">
            <h2 className="font-bold">Health Checks</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Runtime readiness for discover storage, AI keys, and downloader
              dependencies.
            </p>
          </div>
          <div className="mt-5 space-y-3">
            {healthCards.map((card) => {
              const healthy = card.healthy;
              const Icon = healthy ? CheckCircle2 : TriangleAlert;

              return (
                <div
                  key={card.name}
                  className="rounded-2xl border border-border bg-background p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        healthy
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{card.name}</p>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
                            healthy
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
                          )}
                        >
                          {card.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {card.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── Discover Health + Recent Changes ── */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <h2 className="font-bold">Discover Health</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Published vs guide/ranking mix in the current local discover
                library.
              </p>
            </div>
            <Link
              href="/admin/discover"
              className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-300"
            >
              Open editor
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Published
              </p>
              <p className="mt-2 text-2xl font-black">
                {publishedDiscover.length}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Rankings
              </p>
              <p className="mt-2 text-2xl font-black">{rankingCount}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Guides
              </p>
              <p className="mt-2 text-2xl font-black">{guideCount}</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-4 text-sm text-muted-foreground">
            Local-first mode is active. Discover imports and edits persist to
            the data folder in local development.
          </div>
        </section>

        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <Activity className="h-4 w-4 text-indigo-500" />
            <div>
              <h2 className="font-bold">Recent Discover Changes</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest discover pages sorted by the current{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
                  updatedAt
                </code>{" "}
                field.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {recentDiscoverChanges.map((list) => (
              <Link
                key={list.id}
                href="/admin/discover"
                className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{list.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {list.category}
                    {list.subcategory ? ` • ${list.subcategory}` : ""}
                    {list.scope ? ` • ${list.scope}` : ""}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {formatRelativeDateLabel(list.updatedAt)}
                </span>
              </Link>
            ))}
            {recentDiscoverChanges.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No discover lists found yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
