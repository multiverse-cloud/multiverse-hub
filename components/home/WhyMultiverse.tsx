import { Globe, Infinity, Lock, Shield, Sparkles, Zap } from 'lucide-react'

const FEATURES = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Sub-second load times on every tool. No waiting, no frustration.',
    tone: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300',
  },
  {
    icon: Shield,
    title: '100% Free Always',
    desc: 'Every tool, every feature - no premium paywalls, ever.',
    tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300',
  },
  {
    icon: Globe,
    title: 'No Login Required',
    desc: 'Use any tool instantly. No sign-up friction.',
    tone: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    desc: '15+ AI tools using the latest language models.',
    tone: 'bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300',
  },
  {
    icon: Infinity,
    title: '150+ Tools',
    desc: 'Comprehensive coverage across 10 tool categories.',
    tone: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    desc: 'Files processed locally. Nothing stored on our servers.',
    tone: 'bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300',
  },
]

export default function WhyMultiverse() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="section-header">
          <p className="section-label">Why Multiverse</p>
          <h2 className="section-title">Not just another tools site</h2>
          <p className="section-sub">
            A complete mini-internet with tools, AI, entertainment, news, and marketplace in one unified platform.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(feature => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.tone}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-bold transition-colors group-hover:text-slate-950 dark:group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
