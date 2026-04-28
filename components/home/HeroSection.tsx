import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code2,
  Download,
  FileText,
  History,
  Image,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";
import HeroSearchBar from "@/components/home/HeroSearchBar";
import { SITE_METRICS } from "@/lib/site-metrics";

const SUGGESTION_CHIPS = [
  {
    label: "Video Downloader",
    href: "/tools/video/all-in-one-video-downloader",
    icon: Download,
  },
  { label: "Merge PDF", href: "/tools/pdf/merge-pdf", icon: FileText },
  { label: "Compress Image", href: "/tools/image/compress-image", icon: Image },
  { label: "Prompts", href: "/prompts", icon: Bot },
  { label: "UI", href: "/ui", icon: Code2 },
  { label: "What's New", href: "/whats-new", icon: History },
];

const FLIP_WORDS = ["free tools", "UI libraries", "template kits", "AI prompts"];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-950">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.16),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,0.18),transparent_60%)]" />
        <div className="mv-hero-orbit absolute left-1/2 top-12 hidden h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-blue-500/10 dark:border-blue-300/10 md:block" />
        <div className="mv-hero-orbit absolute left-1/2 top-2 hidden h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-slate-900/[0.045] [animation-delay:-5s] dark:border-white/[0.055] md:block" />
        <div className="absolute left-1/2 top-8 hidden h-[500px] w-[900px] -translate-x-1/2 rounded-full border border-slate-200/70 opacity-80 dark:border-slate-800/70 md:block" />
        <div className="absolute left-1/2 top-20 hidden h-[340px] w-[640px] -translate-x-1/2 rounded-full border border-slate-200/60 opacity-80 dark:border-slate-800/60 md:block" />
        <div className="mv-hero-grid absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:76px_76px] opacity-20 dark:opacity-12" />
        <div className="mv-hero-beam absolute left-1/2 top-0 h-px w-[78vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        <div className="mv-hero-signal absolute left-0 top-1/3 hidden h-px w-28 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent md:block" />
        <div className="mv-hero-signal absolute right-0 top-2/3 hidden h-px w-28 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent [animation-delay:2s] md:block" />
        <div className="absolute left-[10%] top-24 hidden h-2 w-2 rounded-full bg-blue-500/45 animate-float md:block" />
        <div className="absolute right-[16%] top-32 hidden h-2.5 w-2.5 rounded-full bg-emerald-500/45 animate-float [animation-delay:1.4s] md:block" />
        <div className="absolute bottom-24 left-[30%] hidden h-1.5 w-1.5 rounded-full bg-slate-900/30 animate-float dark:bg-white/30 [animation-delay:2.6s] md:block" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-5xl flex-col items-center justify-center py-4 text-center sm:min-h-[calc(100svh-4.75rem)] sm:py-5 md:min-h-[calc(100svh-5.5rem)] md:py-6">
          <div
            className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 sm:mb-3 sm:px-3 sm:text-[11px]"
            style={{ animationFillMode: "both" }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {SITE_METRICS.tools.shortLabel}. public. no sign-in.
          </div>

          <div
            className="w-full animate-fade-in"
            style={{ animationDelay: "0.08s", animationFillMode: "both" }}
          >
            <h1 className="font-display text-[2.05rem] font-black leading-[0.96] tracking-[-0.06em] text-slate-950 dark:text-slate-50 sm:text-[3.2rem] md:text-[4.2rem] lg:text-[4.7rem]">
              Multiverse for
              <span className="mx-auto mt-1 block h-[1.1em] max-w-[12.5ch] overflow-hidden text-blue-600 dark:text-blue-400 sm:mt-1.5">
                <span className="mv-flip-stack">
                  {FLIP_WORDS.map((word) => (
                    <span key={word} className="mv-flip-word">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-2.5 max-w-2xl text-[13px] leading-6 text-slate-600 dark:text-slate-400 sm:mt-3 sm:text-base sm:leading-7 md:text-[1.05rem]">
              Download media, process files, copy production-ready UI, browse
              templates, use AI prompts, and fix everyday tech issues from one
              clean public workspace.
            </p>
          </div>

          <div
            className="mt-3 w-full animate-fade-in sm:mt-4"
            style={{ animationDelay: "0.18s", animationFillMode: "both" }}
          >
            <HeroSearchBar />
          </div>

          <div
            className="mt-2 flex w-full max-w-[min(100%,680px)] flex-wrap items-center justify-center gap-1.5 animate-fade-in sm:mt-3"
            style={{ animationDelay: "0.28s", animationFillMode: "both" }}
          >
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:inline">
              Quick access
            </span>
            {SUGGESTION_CHIPS.map((chip) => {
              const Icon = chip.icon;
              return (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="group/chip inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/90 px-2.5 py-1 text-[10px] font-medium text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-400 dark:hover:border-blue-900 dark:hover:text-blue-300 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  <Icon className="hidden h-3.5 w-3.5 transition-transform group-hover/chip:scale-110 sm:block" />
                  <span>{chip.label}</span>
                </Link>
              );
            })}
          </div>

          <div
            className="mt-3.5 flex w-full flex-col items-center justify-center gap-2 animate-fade-in sm:mt-4 sm:w-auto sm:flex-row sm:gap-2.5"
            style={{ animationDelay: "0.36s", animationFillMode: "both" }}
          >
            <Link
              href="/tools"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-2 text-sm font-semibold text-white shadow-[0_16px_38px_-24px_rgba(15,23,42,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:w-auto sm:px-6 sm:py-2.5"
            >
              <Sparkles className="h-4 w-4" />
              Explore Tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 sm:w-auto sm:px-6 sm:py-2.5"
            >
              <LayoutTemplate className="h-4 w-4" />
              View Templates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
