'use client'

import { Download, Loader2, Play, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

type MobileToolActionBarProps = {
  primaryLabel: string
  onPrimary: () => void
  primaryDisabled?: boolean
  loading?: boolean
  secondaryLabel?: string
  onSecondary?: () => void
  secondaryDisabled?: boolean
  primaryIcon?: 'play' | 'download'
  className?: string
}

export default function MobileToolActionBar({
  primaryLabel,
  onPrimary,
  primaryDisabled,
  loading,
  secondaryLabel,
  onSecondary,
  secondaryDisabled,
  primaryIcon = 'play',
  className,
}: MobileToolActionBarProps) {
  const PrimaryIcon = primaryIcon === 'download' ? Download : Play

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-[64px] z-40 border-t border-slate-200/80 bg-white/95 px-3 py-2.5 shadow-[0_-18px_40px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95',
        className,
      )}
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <button
          type="button"
          onClick={onPrimary}
          disabled={primaryDisabled || loading}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-950"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PrimaryIcon className="h-4 w-4" />}
          {primaryLabel}
        </button>
        {onSecondary && (
          <button
            type="button"
            onClick={onSecondary}
            disabled={secondaryDisabled}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">{secondaryLabel || 'Reset'}</span>
          </button>
        )}
      </div>
    </div>
  )
}
