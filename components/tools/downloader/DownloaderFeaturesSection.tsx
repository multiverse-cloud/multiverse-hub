import {
  PremiumCard,
  PremiumContainer,
  PremiumSection,
  PremiumSectionHeader,
} from "@/components/platform/premium/Surface";
import { FEATURE_ITEMS } from "./content";

const ICON_COLORS = [
  {
    bg: "bg-indigo-100 dark:bg-indigo-950/40",
    text: "text-indigo-600 dark:text-indigo-300",
  },
  {
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-300",
  },
  {
    bg: "bg-amber-100 dark:bg-amber-950/40",
    text: "text-amber-600 dark:text-amber-300",
  },
  {
    bg: "bg-violet-100 dark:bg-violet-950/40",
    text: "text-violet-600 dark:text-violet-300",
  },
  {
    bg: "bg-rose-100 dark:bg-rose-950/40",
    text: "text-rose-600 dark:text-rose-300",
  },
  {
    bg: "bg-sky-100 dark:bg-sky-950/40",
    text: "text-sky-600 dark:text-sky-300",
  },
];

export default function DownloaderFeaturesSection() {
  return (
    <PremiumSection muted id="features" className="py-20">
      <PremiumContainer>
        <PremiumSectionHeader
          align="center"
          title="Built for a Strong Download Experience"
          description="Everything you need for fast, reliable downloads from any platform."
          className="mb-12"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {FEATURE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const color = ICON_COLORS[index % ICON_COLORS.length];

            return (
              <PremiumCard
                key={item.title}
                className="p-8 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${color.bg} ${color.text}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-slate-950 dark:text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </PremiumCard>
            );
          })}
        </div>
      </PremiumContainer>
    </PremiumSection>
  );
}
