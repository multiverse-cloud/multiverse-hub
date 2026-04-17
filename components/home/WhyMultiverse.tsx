import { Globe, Infinity, Lock, Shield, Sparkles, Zap } from 'lucide-react'

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Speed',
    desc: 'Every tool loads in under a second. No spinners, no delays — just results.',
    tone: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300',
    borderHover: 'hover:border-amber-200 dark:hover:border-amber-900',
  },
  {
    icon: Shield,
    title: 'Completely Free',
    desc: 'Use every tool for free. No premium tiers, no hidden paywalls.',
    tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300',
    borderHover: 'hover:border-emerald-200 dark:hover:border-emerald-900',
  },
  {
    icon: Globe,
    title: 'No Sign-Up Needed',
    desc: 'Start using any tool in seconds. No account required for core features.',
    tone: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300',
    borderHover: 'hover:border-blue-200 dark:hover:border-blue-900',
  },
  {
    icon: Sparkles,
    title: 'Studio-Grade UI',
    desc: 'Purpose-built workspaces for each tool — not generic one-size-fits-all layouts.',
    tone: 'bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300',
    borderHover: 'hover:border-violet-200 dark:hover:border-violet-900',
  },
  {
    icon: Infinity,
    title: '150+ & Growing',
    desc: 'PDF, image, video, audio, text, dev, SEO, calculator, and file tools — with more added weekly.',
    tone: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300',
    borderHover: 'hover:border-indigo-200 dark:hover:border-indigo-900',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    desc: 'Files are processed locally in your browser. Nothing is stored on our servers.',
    tone: 'bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300',
    borderHover: 'hover:border-rose-200 dark:hover:border-rose-900',
  },
]

export default function WhyMultiverse() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="section-header">
          <p className="section-label">Why Multiverse</p>
          <h2 className="section-title">Built different. Built better.</h2>
          <p className="section-sub">
            Other sites give you one tool. We give you the entire workshop — fast, free, and private.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className={`group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 ${feature.borderHover} animate-fade-in`}
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${feature.tone}`}>
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
