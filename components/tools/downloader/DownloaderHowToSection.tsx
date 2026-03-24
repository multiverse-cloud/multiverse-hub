import {
  PremiumCard,
  PremiumContainer,
  PremiumSection,
  PremiumSectionHeader,
} from '@/components/platform/premium/Surface'
import { HOW_TO_STEPS } from './content'

export default function DownloaderHowToSection() {
  return (
    <PremiumSection id="how-to" className="py-20">
      <PremiumContainer>
        <PremiumSectionHeader
          align="center"
          title="How to Download"
          description="Simple steps that stay visible before and after the user analyzes a link."
          className="mb-12"
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {HOW_TO_STEPS.map(item => (
            <PremiumCard key={item.step} className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 font-display text-xl font-black text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                {item.step}
              </div>
              <h3 className="font-display text-xl font-extrabold text-slate-950 dark:text-slate-50">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">{item.description}</p>
            </PremiumCard>
          ))}
        </div>
      </PremiumContainer>
    </PremiumSection>
  )
}
