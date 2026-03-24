import {
  PremiumCard,
  PremiumContainer,
  PremiumSection,
  PremiumSectionHeader,
} from '@/components/platform/premium/Surface'
import { FAQ_ITEMS } from './content'

export default function DownloaderFaqSection() {
  return (
    <PremiumSection id="faq" className="py-20">
      <PremiumContainer className="max-w-4xl">
        <PremiumSectionHeader
          align="center"
          title="Frequently Asked Questions"
          description="Key answers stay visible from first load, so the page feels complete before anyone pastes a link."
          className="mb-12"
        />

        <div className="space-y-4">
          {FAQ_ITEMS.map(item => (
            <PremiumCard key={item.question} className="bg-slate-50/90 p-6 dark:bg-slate-950">
              <h3 className="font-display text-lg font-bold text-slate-950 dark:text-slate-50">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">{item.answer}</p>
            </PremiumCard>
          ))}
        </div>
      </PremiumContainer>
    </PremiumSection>
  )
}
