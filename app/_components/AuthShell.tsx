import Link from 'next/link'
import { ArrowLeft, Globe2, ShieldCheck } from 'lucide-react'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'

type AuthMetric = {
  label: string
  value: string
}

type AuthShellProps = {
  eyebrow?: string
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  cardClassName?: string
}

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  cardClassName,
}: AuthShellProps) {
  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-background">
      {/* Navbar will be provided by the parent server component */}
      
      <div className="relative flex flex-1 flex-col items-center justify-center p-2 sm:p-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_34%)]" />

        <main className="relative z-10 flex w-full max-w-[400px] flex-col">
          <div
            className={cn(
              'w-full rounded-[24px] border border-slate-200/70 bg-white/95 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:p-6',
              cardClassName
            )}
          >
            <div className="mb-4 space-y-1 text-center">
              {eyebrow && <p className="premium-kicker">{eyebrow}</p>}
              <h1 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-2xl">
                {title}
              </h1>
              {description && <p className="text-xs sm:text-sm leading-snug text-muted-foreground">{description}</p>}
            </div>

            <div className="mt-2 text-left">{children}</div>

            {footer ? <div className="mt-4 border-t border-slate-200/70 pt-3 dark:border-slate-800">{footer}</div> : null}
          </div>
        </main>
      </div>
    </div>
  )
}
