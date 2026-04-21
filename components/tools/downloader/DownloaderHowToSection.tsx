import { ChevronRight } from "lucide-react";
import {
  PremiumCard,
  PremiumContainer,
  PremiumSection,
  PremiumSectionHeader,
} from "@/components/platform/premium/Surface";
import { HOW_TO_STEPS } from "./content";

export default function DownloaderHowToSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  const steps = HOW_TO_STEPS.slice(0, compact ? 3 : HOW_TO_STEPS.length);

  return (
    <PremiumSection id="how-to" className={compact ? "py-10" : "py-20"}>
      <PremiumContainer>
        <PremiumSectionHeader
          align="center"
          title="How to Download"
          description="Download any video in a simple paste, fetch, and save flow."
          className={compact ? "mb-6" : "mb-12"}
        />

        <div className={compact ? "grid gap-4 md:grid-cols-3" : "grid gap-8 md:grid-cols-2 xl:grid-cols-4"}>
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex items-stretch">
              <PremiumCard className={compact ? "flex-1 p-5" : "flex-1 p-8"}>
                <div className={compact ? "mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-display text-base font-black text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300" : "mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 font-display text-xl font-black text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"}>
                  {index + 1}
                </div>
                <h3 className={compact ? "font-display text-lg font-extrabold text-slate-950 dark:text-slate-50" : "font-display text-xl font-extrabold text-slate-950 dark:text-slate-50"}>
                  {item.title}
                </h3>
                <p className={compact ? "mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400" : "mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400"}>
                  {item.description}
                </p>
              </PremiumCard>

              {index < steps.length - 1 && !compact ? (
                <div className="pointer-events-none absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 xl:flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                    <ChevronRight className="h-5 w-5 text-indigo-400 dark:text-indigo-500" />
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </PremiumContainer>
    </PremiumSection>
  );
}
