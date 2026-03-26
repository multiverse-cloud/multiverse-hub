import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Code2,
  Download,
  FileText,
  Image,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import HeroSearchBar from '@/components/home/HeroSearchBar'

const SUGGESTION_CHIPS = [
  { label: 'All-in-One Downloader', href: '/tools/video/all-in-one-video-downloader', icon: Download },
  { label: 'Merge PDF', href: '/tools/pdf/merge-pdf', icon: FileText },
  { label: 'Compress Image', href: '/tools/image/compress-image', icon: Image },
  { label: 'AI Chat', href: '/ai', icon: Bot },
  { label: 'AI Summarizer', href: '/tools/ai/ai-summarizer', icon: Sparkles },
  { label: 'JSON Formatter', href: '/tools/dev/json-formatter', icon: Code2 },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-background dark:border-slate-800/80">
      <div className="absolute inset-0 bg-slate-50/70 dark:bg-slate-950/90" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto flex min-h-[calc(100svh-9rem)] max-w-4xl flex-col items-center justify-center py-8 md:py-10">
          <div className="mb-5 flex justify-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
              <Star className="h-3.5 w-3.5 fill-indigo-500 text-indigo-500 dark:fill-indigo-300 dark:text-indigo-300" />
              <span className="text-muted-foreground">Professional tools across multiple product universes</span>
            </div>
          </div>

          <div className="mb-6 w-full text-center animate-fade-in">
            <h1 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              <span className="block text-slate-950 dark:text-slate-50">One Platform.</span>
              <span className="mt-2 block text-indigo-600 dark:text-indigo-300">Multiple Universes.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Tools, AI, news, learning, and marketplace in one platform.
            </p>
          </div>

          <HeroSearchBar />

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {SUGGESTION_CHIPS.map(chip => {
              const Icon = chip.icon
              return (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-slate-300 hover:bg-slate-100 hover:text-foreground dark:hover:border-slate-700 dark:hover:bg-slate-800"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {chip.label}
                </Link>
              )
            })}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/tools" className="btn-primary flex items-center gap-2 px-8 py-3.5 text-base">
              <Zap className="h-5 w-5" />
              Explore Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/ai" className="btn-secondary flex items-center gap-2 px-8 py-3.5 text-base">
              <Sparkles className="h-5 w-5" />
              Open AI Hub
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
