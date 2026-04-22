import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code2,
  Download,
  FileText,
  Image,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";
import HeroSearchBar from "@/components/home/HeroSearchBar";

const SUGGESTION_CHIPS = [
  {
    label: "Video Downloader",
    href: "/tools/video/all-in-one-video-downloader",
    icon: Download,
  },
  { label: "Merge PDF", href: "/tools/pdf/merge-pdf", icon: FileText },
  { label: "Compress Image", href: "/tools/image/compress-image", icon: Image },
  { label: "JSON Formatter", href: "/tools/dev/json-formatter", icon: Code2 },
  { label: "Prompts", href: "/prompts", icon: Bot },
];

const FLIP_WORDS = ["online tools", "UI components", "website templates", "AI prompts"];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-950">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.16),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,0.18),transparent_60%)]" />
        <div className="absolute left-1/2 top-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full border border-slate-200/70 opacity-80 dark:border-slate-800/70" />
        <div className="absolute left-1/2 top-24 h-[340px] w-[640px] -translate-x-1/2 rounded-full border border-slate-200/60 opacity-80 dark:border-slate-800/60" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:76px_76px] opacity-35 dark:opacity-16" />
        <div className="mv-hero-beam absolute left-1/2 top-0 h-px w-[78vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        <div className="absolute left-[10%] top-28 h-2 w-2 rounded-full bg-blue-500/45 animate-float" />
        <div className="absolute right-[16%] top-36 h-2.5 w-2.5 rounded-full bg-emerald-500/45 animate-float [animation-delay:1.4s]" />
        <div className="absolute bottom-24 left-[30%] h-1.5 w-1.5 rounded-full bg-slate-900/30 animate-float dark:bg-white/30 [animation-delay:2.6s]" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-5xl flex-col items-center justify-center py-5 text-center sm:py-8 md:min-h-[calc(100svh-7rem)] md:py-10">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 sm:mb-4 sm:text-xs"
            style={{ animationFillMode: "both" }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Public, fast, no sign-in
          </div>

          <div
            className="w-full animate-fade-in"
            style={{ animationDelay: "0.08s", animationFillMode: "both" }}
          >
            <h1 className="font-display text-[2.05rem] font-black leading-[0.98] tracking-[-0.055em] text-slate-950 dark:text-slate-50 sm:text-5xl md:text-6xl lg:text-[4.75rem]">
              One Multiverse for
              <span className="mx-auto mt-1 block h-[1.14em] max-w-[12.5ch] overflow-hidden text-blue-600 dark:text-blue-400 sm:mt-2">
                <span className="mv-flip-stack">
                  {FLIP_WORDS.map((word) => (
                    <span key={word} className="mv-flip-word">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:mt-4 sm:text-lg sm:leading-8">
              Download media, process files, copy production-ready UI, browse
              templates, use AI prompts, and fix everyday tech issues from one
              clean public workspace.
            </p>
          </div>

          <div
            className="mt-4 w-full animate-fade-in sm:mt-6"
            style={{ animationDelay: "0.18s", animationFillMode: "both" }}
          >
            <HeroSearchBar />
          </div>

          <div
            className="mt-3 flex max-w-[min(100%,680px)] flex-wrap justify-center gap-1.5 animate-fade-in sm:mt-5 sm:gap-2"
            style={{ animationDelay: "0.28s", animationFillMode: "both" }}
          >
            {SUGGESTION_CHIPS.map((chip) => {
              const Icon = chip.icon;
              return (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="group/chip inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-blue-900 dark:hover:text-blue-300 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5 transition-transform group-hover/chip:scale-110" />
                  <span>{chip.label}</span>
                </Link>
              );
            })}
          </div>

          <div
            className="mt-4 flex w-full flex-col items-center justify-center gap-2 animate-fade-in sm:mt-6 sm:w-auto sm:flex-row sm:gap-3"
            style={{ animationDelay: "0.36s", animationFillMode: "both" }}
          >
            <Link
              href="/tools"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_38px_-24px_rgba(15,23,42,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:w-auto sm:px-7 sm:py-3"
            >
              <Sparkles className="h-4 w-4" />
              Explore Tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 sm:w-auto sm:px-7 sm:py-3"
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
