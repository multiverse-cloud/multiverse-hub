import { SITE_METRICS } from '@/lib/site-metrics'

const STATS = [
  {
    value: SITE_METRICS.tools.label,
    label: "Free Tools",
    category: "Tools",
    accent: "from-indigo-500 to-violet-500",
    badgeColor:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
  },
  {
    value: SITE_METRICS.ui.label,
    label: "UI Components",
    category: "Library",
    accent: "from-violet-500 to-purple-500",
    badgeColor:
      "bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  },
  {
    value: SITE_METRICS.templates.label,
    label: "Templates",
    category: "Launch",
    accent: "from-emerald-500 to-teal-500",
    badgeColor:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  {
    value: SITE_METRICS.prompts.label,
    label: "AI Prompts",
    category: "Creative",
    accent: "from-amber-500 to-orange-500",
    badgeColor:
      "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
];

export default function HeroStatsSection() {
  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      {/* Clean, minimal background */}
      <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-slate-900/30" />
      <div className="absolute left-0 top-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-800/50" />
      <div className="absolute bottom-0 left-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-800/50" />

      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800/60 dark:bg-slate-900/80 animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both",
              }}
            >
              {/* Colored gradient top bar */}
              <div
                className={`h-1 w-full rounded-t-2xl bg-gradient-to-r ${stat.accent}`}
              />

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div
                  className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${stat.accent} opacity-[0.08] blur-2xl`}
                />
              </div>

              <div className="p-5 sm:p-6">
                {/* Category label badge */}
                <div className="mb-2.5 flex justify-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${stat.badgeColor}`}
                  >
                    {stat.category}
                  </span>
                </div>

                <p
                  className={`relative font-display text-3xl font-extrabold tracking-tight bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent sm:text-4xl md:text-5xl`}
                >
                  {stat.value}
                </p>
                <p className="relative mt-1.5 text-sm font-semibold text-muted-foreground md:text-base">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
