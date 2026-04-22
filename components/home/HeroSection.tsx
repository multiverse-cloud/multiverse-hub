import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code2,
  Download,
  FileText,
  Image,
  LayoutTemplate,
  Paintbrush,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
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

const UNIVERSES = [
  { label: "Tools", href: "/tools", icon: Wrench },
  { label: "UI", href: "/ui", icon: Paintbrush },
  { label: "Templates", href: "/templates", icon: LayoutTemplate },
  { label: "Prompts", href: "/prompts", icon: Bot },
  { label: "Fixes", href: "/fixes", icon: ShieldCheck },
  { label: "Search", href: "/search", icon: Search },
];

const FLIP_WORDS = ["tools", "UI blocks", "templates", "prompts"];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-950">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.13),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,0.16),transparent_58%)]" />
        <div className="absolute left-1/2 top-16 h-[420px] w-[720px] -translate-x-1/2 rounded-full border border-slate-200/70 dark:border-slate-800/70" />
        <div className="absolute left-1/2 top-28 h-[300px] w-[520px] -translate-x-1/2 rounded-full border border-slate-200/60 dark:border-slate-800/60" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45 dark:opacity-20" />
        <div className="absolute left-[12%] top-28 h-2 w-2 rounded-full bg-blue-500/50 animate-float" />
        <div className="absolute right-[18%] top-44 h-2.5 w-2.5 rounded-full bg-emerald-500/45 animate-float [animation-delay:1.4s]" />
        <div className="absolute bottom-24 left-[30%] h-1.5 w-1.5 rounded-full bg-slate-900/35 animate-float dark:bg-white/35 [animation-delay:2.6s]" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto flex min-h-[calc(100svh-6rem)] max-w-5xl flex-col items-center justify-center py-8 text-center sm:py-10 md:py-14">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            style={{ animationFillMode: "both" }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            150+ tools, UI, templates, prompts, and fixes
          </div>

          <div
            className="w-full animate-fade-in"
            style={{ animationDelay: "0.08s", animationFillMode: "both" }}
          >
            <h1 className="font-display text-3xl font-black leading-[1.04] tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl md:text-6xl lg:text-[4.75rem]">
              Build faster with
              <span className="mx-auto mt-1 block h-[1.12em] max-w-[9.5ch] overflow-hidden text-blue-600 dark:text-blue-400 sm:mt-2">
                <span className="mv-flip-stack">
                  {FLIP_WORDS.map((word) => (
                    <span key={word} className="mv-flip-word">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
              Multiverse is a fast public workspace for creators and developers:
              download media, process files, copy UI, launch templates, and find
              practical fixes without sign-in.
            </p>
          </div>

          <div
            className="mt-6 w-full animate-fade-in"
            style={{ animationDelay: "0.18s", animationFillMode: "both" }}
          >
            <HeroSearchBar />
          </div>

          <div
            className="mb-5 flex flex-wrap justify-center gap-2 animate-fade-in sm:mb-7"
            style={{ animationDelay: "0.28s", animationFillMode: "both" }}
          >
            {SUGGESTION_CHIPS.map((chip) => {
              const Icon = chip.icon;
              return (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="group/chip inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-blue-900 dark:hover:text-blue-300 sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5 transition-transform group-hover/chip:scale-110" />
                  <span>{chip.label}</span>
                </Link>
              );
            })}
          </div>

          <div
            className="flex w-full flex-col items-center justify-center gap-2 animate-fade-in sm:w-auto sm:flex-row sm:gap-3"
            style={{ animationDelay: "0.36s", animationFillMode: "both" }}
          >
            <Link
              href="/tools"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-[0_16px_38px_-24px_rgba(15,23,42,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:w-auto sm:px-7"
            >
              <Sparkles className="h-4 w-4" />
              Explore Multiverse
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 sm:w-auto sm:px-7"
            >
              <LayoutTemplate className="h-4 w-4" />
              View Templates
            </Link>
          </div>

          <div
            className="mt-7 grid w-full max-w-4xl grid-cols-3 gap-2 animate-fade-in sm:grid-cols-6"
            style={{ animationDelay: "0.44s", animationFillMode: "both" }}
            aria-label="Multiverse sections"
          >
            {UNIVERSES.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-3 text-xs font-bold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-blue-900 dark:hover:text-blue-300"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
