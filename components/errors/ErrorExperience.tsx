'use client'

import Link from 'next/link'

type RecoveryAction = {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

type ErrorExperienceProps = {
  badge: string
  title: string
  description: string
  code?: string
  details?: string
  actions: RecoveryAction[]
}

function ActionButton({ action }: { action: RecoveryAction }) {
  const className =
    action.variant === 'primary'
      ? 'btn-primary px-5 py-3'
      : 'btn-secondary px-5 py-3'

  if (action.href) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    )
  }

  return (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  )
}

export default function ErrorExperience({
  badge,
  title,
  description,
  code,
  details,
  actions,
}: ErrorExperienceProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_28%)] bg-background">
      <main className="mx-auto flex min-h-[100dvh] max-w-3xl items-center justify-center px-4 py-10 sm:px-6">
        <section className="w-full rounded-3xl border border-border/70 bg-background/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-border/70 bg-muted px-3 py-1 font-medium text-muted-foreground">
              {badge}
            </span>
            {code ? (
              <span className="rounded-full border border-border/70 px-3 py-1 font-medium text-foreground/70">
                {code}
              </span>
            ) : null}
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map(action => (
              <ActionButton
                key={`${action.label}:${action.href || 'action'}`}
                action={action}
              />
            ))}
          </div>

          {details ? (
            <div className="mt-6 rounded-2xl border border-border/70 bg-muted/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Debug
              </p>
              <p className="mt-2 break-words font-mono text-xs leading-6 text-muted-foreground">
                {details}
              </p>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  )
}
