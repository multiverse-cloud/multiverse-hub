const STATS = [
  { value: '150+', label: 'Tools Available', accent: 'from-indigo-500 to-violet-500' },
  { value: '10', label: 'Tool Categories', accent: 'from-violet-500 to-purple-500' },
  { value: '0', label: 'Files We Store', accent: 'from-emerald-500 to-teal-500' },
  { value: '100%', label: 'Free Forever', accent: 'from-amber-500 to-orange-500' },
]

export default function HeroStatsSection() {
  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      {/* Warm gradient accent for stats */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/60 dark:from-slate-950 dark:via-slate-900/20 dark:to-slate-950" />
      <div className="absolute left-0 top-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-800/50" />
      <div className="absolute bottom-0 left-0 -z-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-800/50" />
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800/60 dark:bg-slate-900/80 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${stat.accent} opacity-[0.08] blur-2xl`} />
              </div>
              <p className={`relative font-display text-4xl font-extrabold tracking-tight bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent md:text-5xl`}>
                {stat.value}
              </p>
              <p className="relative mt-1.5 text-sm font-semibold text-muted-foreground md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
