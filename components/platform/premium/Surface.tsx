import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function PremiumPage({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('premium-shell min-h-screen', className)}>{children}</div>
}

export function PremiumContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('mx-auto max-w-7xl', className)}>{children}</div>
}

export function PremiumSection({
  children,
  className,
  muted = false,
  id,
}: {
  children: ReactNode
  className?: string
  muted?: boolean
  id?: string
}) {
  return (
    <section id={id} className={cn('premium-section', muted && 'premium-section-muted', className)}>
      {children}
    </section>
  )
}

export function PremiumPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('premium-panel', className)}>{children}</div>
}

export function PremiumCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('premium-card', className)}>{children}</div>
}

export function PremiumChip({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <span className={cn('premium-chip', className)}>{children}</span>
}

export function PremiumSectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('space-y-3', align === 'center' && 'text-center', className)}>
      {eyebrow && <p className="premium-kicker">{eyebrow}</p>}
      <h2 className={cn('font-display text-3xl font-extrabold tracking-tight md:text-4xl', align === 'center' && 'mx-auto')}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'premium-subtitle max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
