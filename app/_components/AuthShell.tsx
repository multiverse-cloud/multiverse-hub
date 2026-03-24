import Link from 'next/link'
import { ArrowLeft, Globe2, ShieldCheck } from 'lucide-react'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'

type AuthMetric = {
  label: string
  value: string
}

type AuthShellProps = {
  eyebrow: string
  title: string
  description: string
  sideEyebrow: string
  sideTitle: string
  sideDescription: string
  metrics: AuthMetric[]
  children: React.ReactNode
  footer?: React.ReactNode
  cardClassName?: string
}

export default function AuthShell({
  eyebrow,
  title,
  description,
  sideEyebrow,
  sideTitle,
  sideDescription,
  metrics,
  children,
  footer,
  cardClassName,
}: AuthShellProps) {
  return (
    <div className="relative h-[100dvh] overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_34%)]" />

      <div className="relative grid h-[100dvh] lg:grid-cols-[minmax(0,1.06fr)_minmax(460px,560px)]">
        <aside className="relative hidden overflow-hidden border-r border-slate-200/70 bg-slate-950 text-white dark:border-slate-800 lg:flex">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative flex w-full flex-col justify-between px-10 py-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <Globe2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display text-lg font-bold">Multiverse</p>
                <p className="text-xs text-slate-400">Unified account access</p>
              </div>
            </Link>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                {sideEyebrow}
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-4xl font-extrabold leading-tight">{sideTitle}</h2>
                <p className="max-w-xl text-base leading-7 text-slate-300">{sideDescription}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {metrics.map(metric => (
                  <div
                    key={metric.label}
                    className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 backdrop-blur"
                  >
                    <p className="text-2xl font-black text-white">{metric.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-500">
              Protected account flows for your tools, preferences, and approved admin access.
            </p>
          </div>
        </aside>

        <main className="flex h-[100dvh] items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              'w-full max-w-[540px] rounded-[30px] border border-slate-200/70 bg-white/95 p-5 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.4)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:p-6',
              cardClassName
            )}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-slate-300 hover:text-foreground dark:border-slate-800 dark:hover:border-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>

              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 rounded-full border border-slate-200/70 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:flex">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Secure access
                </div>
                <ThemeToggle />
              </div>
            </div>

            <div className="mb-5 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 dark:bg-slate-100">
                <Globe2 className="h-4 w-4 text-white dark:text-slate-950" />
              </div>
              <div>
                <p className="font-display text-base font-bold text-slate-950 dark:text-slate-50">Multiverse</p>
                <p className="text-xs text-muted-foreground">One secure account for every workspace</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="premium-kicker">{eyebrow}</p>
              <h1 className="font-display text-[1.8rem] font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-[2rem]">
                {title}
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </div>

            <div className="mt-5">{children}</div>

            {footer ? <div className="mt-5 border-t border-slate-200/70 pt-4 dark:border-slate-800">{footer}</div> : null}
          </div>
        </main>
      </div>
    </div>
  )
}
