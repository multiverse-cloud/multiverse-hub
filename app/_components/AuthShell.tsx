import { cn } from '@/lib/utils'

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
        {/* Subtle layered background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.06),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.1),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_100%_100%,rgba(14,165,233,0.04),transparent)] dark:bg-[radial-gradient(ellipse_40%_40%_at_100%_100%,rgba(14,165,233,0.06),transparent)]" />
          <div className="absolute inset-0 grid-bg opacity-[0.08] dark:opacity-[0.04]" />
        </div>

        <main className="relative z-10 flex w-full max-w-[400px] flex-col animate-fade-in" style={{ animationFillMode: 'both' }}>
          <div
            className={cn(
              'w-full rounded-2xl border border-slate-200/60 bg-white/95 p-5 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/90 dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] sm:p-6',
              cardClassName
            )}
          >
            <div className="mb-5 space-y-1.5 text-center">
              {eyebrow && <p className="premium-kicker">{eyebrow}</p>}
              <h1 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-2xl">
                {title}
              </h1>
              {description && <p className="text-xs sm:text-sm leading-snug text-muted-foreground">{description}</p>}
            </div>

            <div className="mt-2 text-left">{children}</div>

            {footer ? <div className="mt-5 border-t border-slate-200/60 pt-4 dark:border-slate-800/60">{footer}</div> : null}
          </div>
        </main>
      </div>
    </div>
  )
}
