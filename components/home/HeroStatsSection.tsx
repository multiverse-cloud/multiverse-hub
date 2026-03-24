const STATS = [
  { value: '150+', label: 'Free Tools' },
  { value: '9', label: 'Universes' },
  { value: '50K+', label: 'Users' },
  { value: '100%', label: 'Free Access' },
]

export default function HeroStatsSection() {
  return (
    <section className="bg-background py-10 md:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 md:grid-cols-4">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-300 md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
