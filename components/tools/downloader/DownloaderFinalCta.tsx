import { PremiumContainer } from '@/components/platform/premium/Surface'
import DownloaderInputBar from './DownloaderInputBar'
import { CTA_POINTS } from './content'

interface Props {
  url: string
  loading: boolean
  onUrlChange: (value: string) => void
  onAnalyze: () => void
}

export default function DownloaderFinalCta({
  url,
  loading,
  onUrlChange,
  onAnalyze,
}: Props) {
  return (
    <section className="bg-indigo-600 px-4 py-20 text-white lg:px-6">
      <PremiumContainer className="max-w-4xl text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Ready to Download Your Next File?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100">
          Paste a link and jump straight into the same downloader flow from the final section.
        </p>

        <DownloaderInputBar
          url={url}
          loading={loading}
          onUrlChange={onUrlChange}
          onAnalyze={onAnalyze}
          placeholder="Enter video link..."
          buttonLabel="Analyze Link"
          tone="inverse"
          className="mx-auto mt-10 max-w-3xl"
        />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {CTA_POINTS.map(item => {
            const Icon = item.icon

            return (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-50"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
            )
          })}
        </div>
      </PremiumContainer>
    </section>
  )
}
