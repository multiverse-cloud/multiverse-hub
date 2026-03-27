import Link from 'next/link'
import {
  ArrowRight,
  Code2,
  Download,
  FileText,
  Image,
  Star,
  Zap,
} from 'lucide-react'
import HeroSearchBar from '@/components/home/HeroSearchBar'

const SUGGESTION_CHIPS = [
  { label: 'All-in-One Downloader', href: '/tools/video/all-in-one-video-downloader', icon: Download },
  { label: 'TikTok Downloader', href: '/tools/video/tiktok-downloader', icon: Zap },
  { label: 'Password Generator', href: '/tools/text/password-generator', icon: Code2 },
  { label: 'Merge PDF', href: '/tools/pdf/merge-pdf', icon: FileText },
  { label: 'Compress Image', href: '/tools/image/compress-image', icon: Image },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-background dark:border-slate-800/80">
      <div className="absolute inset-0 bg-white dark:bg-slate-950" />

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.07] blur-[100px] animate-float dark:bg-indigo-400/[0.06]" />
        <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/[0.06] blur-[100px] dark:bg-violet-400/[0.05]" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute -bottom-32 left-1/3 h-[350px] w-[350px] rounded-full bg-cyan-500/[0.05] blur-[100px] dark:bg-cyan-400/[0.04]" style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>

      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto flex min-h-[calc(100svh-7.5rem)] max-w-4xl flex-col items-center justify-center py-6 md:py-8">

          {/* Badge */}
          <div className="mb-4 flex justify-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/90 px-4 py-2 text-sm shadow-sm shadow-indigo-500/5 dark:border-indigo-800/40 dark:bg-slate-900/90 dark:shadow-indigo-400/5">
              <Star className="h-3.5 w-3.5 fill-indigo-500 text-indigo-500 dark:fill-indigo-300 dark:text-indigo-300" />
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text font-semibold text-transparent dark:from-indigo-300 dark:to-violet-300">
                150+ professional tools in one platform
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-5 w-full text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="font-display text-4xl font-extrabold leading-[0.94] tracking-tight md:text-5xl lg:text-6xl">
              <span className="block text-slate-950 dark:text-slate-50">One Platform.</span>
              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-purple-300">
                150+ Free Tools.
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Video downloaders, PDF editors, image converters, and developer utilities — all under one roof.
              <span className="hidden sm:inline"> Fully client-side, fast, and free forever.</span>
            </p>
          </div>

          {/* Search */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <HeroSearchBar />
          </div>

          {/* Suggestion chips */}
          <div className="mb-6 flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {SUGGESTION_CHIPS.map(chip => {
              const Icon = chip.icon
              return (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300 sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {chip.label}
                </Link>
              )
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link href="/tools" className="group btn-primary flex items-center gap-2 px-7 py-3 text-sm shadow-xl shadow-indigo-500/20 transition-shadow hover:shadow-indigo-500/30 sm:text-base">
              <Zap className="h-5 w-5" />
              Explore All Tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/tools/video/all-in-one-video-downloader" className="btn-secondary flex items-center gap-2 px-7 py-3 text-sm sm:text-base">
              <Download className="h-5 w-5" />
              Try Video Downloader
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
