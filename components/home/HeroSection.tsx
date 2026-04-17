import Link from 'next/link'
import {
  ArrowRight,
  Code2,
  Download,
  FileText,
  Image,
  Sparkles,
  Zap,
} from 'lucide-react'
import HeroSearchBar from '@/components/home/HeroSearchBar'

const SUGGESTION_CHIPS = [
  { label: 'Video Downloader', href: '/tools/video/all-in-one-video-downloader', icon: Download },
  { label: 'TikTok Saver', href: '/tools/video/tiktok-downloader', icon: Zap },
  { label: 'Merge PDF', href: '/tools/pdf/merge-pdf', icon: FileText },
  { label: 'Compress Image', href: '/tools/image/compress-image', icon: Image },
  { label: 'JSON Formatter', href: '/tools/dev/json-formatter', icon: Code2 },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/50 bg-background dark:border-slate-800/60">
      {/* Layered gradient background — unique depth effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(139,92,246,0.05),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(139,92,246,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(6,182,212,0.04),transparent)] dark:bg-[radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(6,182,212,0.06),transparent)]" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-[0.15] dark:opacity-[0.08]" />

      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-indigo-500/[0.04] blur-3xl animate-float dark:bg-indigo-400/[0.06]" />
        <div className="absolute -left-16 bottom-20 h-56 w-56 rounded-full bg-violet-500/[0.04] blur-3xl dark:bg-violet-400/[0.05]" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }} />
        <div className="absolute left-1/2 top-10 h-40 w-40 rounded-full bg-cyan-500/[0.03] blur-3xl dark:bg-cyan-400/[0.04]" style={{ animationDelay: '3s', animationDuration: '5.5s' }} />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto flex min-h-[calc(100svh-7.5rem)] max-w-4xl flex-col items-center justify-center py-8 md:py-10">

          {/* Kicker badge */}
          <div className="mb-5 flex justify-center animate-fade-in" style={{ animationFillMode: 'both' }}>
            <div className="group relative inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-white/80 px-4 py-2 text-sm shadow-sm backdrop-blur-sm transition-all hover:border-indigo-300/60 hover:shadow-md dark:border-indigo-800/30 dark:bg-slate-900/80 dark:hover:border-indigo-700/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75 dark:bg-indigo-300" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              </span>
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text font-semibold text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-purple-300">
                150+ pro-grade tools, zero cost
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6 w-full text-center animate-fade-in" style={{ animationDelay: '0.12s', animationFillMode: 'both' }}>
            <h1 className="font-display text-4xl font-extrabold leading-[0.92] tracking-tight md:text-5xl lg:text-[3.5rem]">
              <span className="block text-slate-950 dark:text-slate-50">Every tool you need.</span>
              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-purple-300">
                One platform.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
              Convert PDFs, compress images, download videos, and build faster&nbsp;—
              all free, all private, all instant.
            </p>
          </div>

          {/* Search */}
          <div className="w-full animate-fade-in" style={{ animationDelay: '0.24s', animationFillMode: 'both' }}>
            <HeroSearchBar />
          </div>

          {/* Suggestion chips */}
          <div className="mb-7 flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: '0.36s', animationFillMode: 'both' }}>
            {SUGGESTION_CHIPS.map(chip => {
              const Icon = chip.icon
              return (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="group/chip flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-sm transition-all hover:border-indigo-200 hover:bg-indigo-50/80 hover:text-indigo-700 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-indigo-800/50 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300 sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5 transition-transform group-hover/chip:scale-110" />
                  {chip.label}
                </Link>
              )
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in" style={{ animationDelay: '0.48s', animationFillMode: 'both' }}>
            <Link href="/tools" className="group btn-primary flex items-center gap-2 px-7 py-3 text-sm shadow-xl shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 hover:scale-[1.02] sm:text-base">
              <Sparkles className="h-4.5 w-4.5" />
              Explore All Tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/tools/video/all-in-one-video-downloader" className="btn-secondary flex items-center gap-2 px-7 py-3 text-sm transition-all hover:scale-[1.02] sm:text-base">
              <Download className="h-4.5 w-4.5" />
              Try Video Downloader
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
