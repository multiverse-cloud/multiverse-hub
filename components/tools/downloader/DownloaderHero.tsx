import { CheckCircle2 } from 'lucide-react'
import { PremiumContainer, PremiumSection } from '@/components/platform/premium/Surface'
import { HERO_TRUST_ITEMS } from './content'
import DownloaderInputBar from './DownloaderInputBar'
import { cn } from '@/lib/utils'

interface Props {
  url: string
  loading: boolean
  hasResult?: boolean
  onUrlChange: (value: string) => void
  onAnalyze: () => void
}

const SUPPORTED_PLATFORMS = [
  { name: 'YouTube', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30', emoji: '▶' },
  { name: 'TikTok', color: 'text-slate-900 dark:text-slate-100', bg: 'bg-slate-100 dark:bg-slate-800', emoji: '♪' },
  { name: 'Instagram', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-950/30', emoji: '◈' },
  { name: 'Twitter / X', color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-950/30', emoji: '✕' },
  { name: 'Facebook', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30', emoji: 'f' },
  { name: 'Vimeo', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-950/30', emoji: '▷' },
  { name: '+ 1000 More', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30', emoji: '⚡' },
]

export default function DownloaderHero({ url, loading, hasResult = false, onUrlChange, onAnalyze }: Props) {
  return (
    <PremiumSection className={cn('relative overflow-hidden', hasResult ? 'pb-6 pt-12 md:pb-8 md:pt-14' : 'pt-16 md:pt-20')}>
      <PremiumContainer className="relative z-10 max-w-5xl text-center">
        <h1 className="premium-title mx-auto max-w-4xl">
          Download Videos, Audio and <span className="text-indigo-600 dark:text-indigo-300">Thumbnails</span> Instantly
        </h1>
        <p className="premium-subtitle mx-auto mt-6 max-w-2xl">
          Paste a link from YouTube, TikTok, Instagram, Twitter and get clean download options in seconds.
        </p>

        <DownloaderInputBar
          url={url}
          loading={loading}
          onUrlChange={onUrlChange}
          onAnalyze={onAnalyze}
          className={cn('mx-auto max-w-3xl', hasResult ? 'mt-8' : 'mt-10')}
        />

        {/* Supported Platforms Row */}
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {SUPPORTED_PLATFORMS.map(platform => (
            <span
              key={platform.name}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-transform hover:scale-105',
                platform.bg, platform.color
              )}
            >
              <span className="font-bold text-[10px]">{platform.emoji}</span>
              {platform.name}
            </span>
          ))}
        </div>

        <div className={cn('flex flex-wrap items-center justify-center text-slate-500 dark:text-slate-300', hasResult ? 'mt-5 gap-4 text-xs sm:text-sm' : 'mt-7 gap-5 text-sm')}>
          {HERO_TRUST_ITEMS.map(item => (
            <span key={item} className="inline-flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              {item}
            </span>
          ))}
        </div>

      </PremiumContainer>

    </PremiumSection>
  )
}

