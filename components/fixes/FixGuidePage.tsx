import Link from 'next/link'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react'
import type { FixGuide } from '@/lib/fixes-data'

export default function FixGuidePage({
  guide,
  relatedGuides,
}: {
  guide: FixGuide
  relatedGuides: FixGuide[]
}) {
  return (
    <div className="min-h-screen premium-shell">
      <div className="page-hero border-b border-border bg-slate-50/70 dark:bg-slate-950">
        <div className="page-hero-inner py-8 md:py-10">
          <Link
            href="/fixes"
            className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Fixes
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {guide.clusterTitle}
            </span>
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              5 easy steps
            </span>
            {guide.featured ? (
              <span className="rounded-full bg-orange-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-950/30 dark:text-orange-300">
                Featured
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 max-w-4xl font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{guide.summary}</p>
        </div>
      </div>

      <div className="page-content space-y-6">
        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <ShieldAlert className="h-4 w-4 text-orange-500" />
              Quick answer
            </div>
            <p className="text-sm leading-7 text-muted-foreground">{guide.quickAnswer}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Common signs
            </div>
            <div className="flex flex-wrap gap-2">
              {guide.symptoms.map(symptom => (
                <span
                  key={symptom}
                  className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-3">
          {guide.steps.map(step => (
            <article key={step.step} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white dark:bg-slate-100 dark:text-slate-950">
                  {step.step}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">{step.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4 text-orange-500" />
              Get help faster if
            </div>
            <ul className="space-y-3">
              {guide.whenToGetHelp.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-500 dark:bg-orange-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <ArrowRight className="h-4 w-4 text-orange-500" />
              Related fixes
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {relatedGuides.map(related => (
                <Link
                  key={related.slug}
                  href={`/fixes/${related.slug}`}
                  className="rounded-2xl border border-border p-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {related.clusterTitle}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-slate-950 dark:text-slate-50">{related.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-foreground">{related.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
