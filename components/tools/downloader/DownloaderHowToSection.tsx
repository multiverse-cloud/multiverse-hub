import { ChevronRight } from "lucide-react";
import {
  PremiumCard,
  PremiumContainer,
  PremiumSection,
  PremiumSectionHeader,
} from "@/components/platform/premium/Surface";
import { HOW_TO_STEPS } from "./content";

export default function DownloaderHowToSection() {
  return (
    <PremiumSection id="how-to" className="py-20">
      <PremiumContainer>
        <PremiumSectionHeader
          align="center"
          title="How to Download"
          description="Download any video in three simple steps — no software, no sign-up required."
          className="mb-12"
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {HOW_TO_STEPS.map((item, index) => (
            <div key={item.step} className="relative flex items-stretch">
              <PremiumCard className="flex-1 p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 font-display text-xl font-black text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                  {index + 1}
                </div>
                <h3 className="font-display text-xl font-extrabold text-slate-950 dark:text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </PremiumCard>

              {/* Desktop connector arrow — shown between cards, not after the last one */}
              {index < HOW_TO_STEPS.length - 1 && (
                <div className="pointer-events-none absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 xl:flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                    <ChevronRight className="h-5 w-5 text-indigo-400 dark:text-indigo-500" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </PremiumContainer>
    </PremiumSection>
  );
}
