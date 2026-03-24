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

export default function DownloaderHero({ url, loading, hasResult = false, onUrlChange, onAnalyze }: Props) {
  return (
    <PremiumSection className={cn('relative overflow-hidden', hasResult ? 'pb-6 pt-12 md:pb-8 md:pt-14' : 'pt-16 md:pt-20')}>
      <PremiumContainer className="relative z-10 max-w-5xl text-center">
        <h1 className="premium-title mx-auto max-w-4xl">
          Download Videos, Audio and <span className="text-indigo-600 dark:text-indigo-300">Thumbnails</span> Instantly
        </h1>
        <p className="premium-subtitle mx-auto mt-6 max-w-2xl">
          Paste a link and get clean download options in one place.
        </p>

        <DownloaderInputBar
          url={url}
          loading={loading}
          onUrlChange={onUrlChange}
          onAnalyze={onAnalyze}
          className={cn('mx-auto max-w-3xl', hasResult ? 'mt-8' : 'mt-10')}
        />

        <div className={cn('flex flex-wrap items-center justify-center text-slate-500 dark:text-slate-300', hasResult ? 'mt-6 gap-4 text-xs sm:text-sm' : 'mt-8 gap-5 text-sm')}>
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
