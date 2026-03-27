import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, Globe } from 'lucide-react'
import { getLucideIcon } from '@/lib/icons'
import { UNIVERSES } from '@/lib/universes-data'

const HOME_UNIVERSES = UNIVERSES.filter(universe => universe.id !== 'ai')

const ICON_TONES: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-950/30 dark:text-pink-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300',
  slate: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300',
}

export default function UniversesSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="section-header">
            <p className="section-label">Explore</p>
            <h2 className="section-title">8 Universes. One Platform.</h2>
            <p className="section-sub">Every universe is a standalone product, all connected in one seamless ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {HOME_UNIVERSES.map(universe => {
              const Icon = getLucideIcon(universe.icon, Globe)

              return (
                <Link
                  key={universe.id}
                  href={universe.href}
                  className="universe-card group bg-card hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="relative z-10 space-y-3">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-2xl transition-colors',
                        ICON_TONES[universe.color] ?? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold transition-colors group-hover:text-slate-950 dark:group-hover:text-white">
                        {universe.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{universe.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                        {universe.count}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-slate-950 dark:group-hover:text-white" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
