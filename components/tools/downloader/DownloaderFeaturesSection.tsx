import {
  PremiumCard,
  PremiumContainer,
  PremiumSection,
  PremiumSectionHeader,
} from '@/components/platform/premium/Surface'
import { FEATURE_ITEMS } from './content'

export default function DownloaderFeaturesSection() {
  return (
    <PremiumSection muted id="features" className="py-20">
      <PremiumContainer>
        <PremiumSectionHeader
          align="center"
          title="Built for a Strong Download Experience"
          description="The same white, soft-gray, premium system is designed to scale across tool pages and category pages."
          className="mb-12"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {FEATURE_ITEMS.map(item => {
            const Icon = item.icon

            return (
              <PremiumCard key={item.title} className="p-8 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-slate-950 dark:text-slate-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">{item.description}</p>
              </PremiumCard>
            )
          })}
        </div>
      </PremiumContainer>
    </PremiumSection>
  )
}
