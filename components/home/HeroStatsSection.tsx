const STATS = [
  { value: '150+', label: 'Free Tools', accent: 'from-indigo-500 to-violet-500' },
  { value: '9', label: 'Universes', accent: 'from-violet-500 to-purple-500' },
  { value: '50K+', label: 'Users', accent: 'from-purple-500 to-pink-500' },
  { value: '100%', label: 'Free Access', accent: 'from-pink-500 to-rose-500' },
]

export default function HeroStatsSection() {
  return (
    <section className="bg-background py-10 md:py-14">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.accent} opacity-10 blur-2xl`} />
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
