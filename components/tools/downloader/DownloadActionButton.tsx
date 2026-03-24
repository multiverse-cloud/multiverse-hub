import { Download, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  optionId: string
  label: string
  busy: boolean
  disabled: boolean
  onClick: () => void
  tone?: 'primary' | 'secondary'
  compact?: boolean
}

export default function DownloadActionButton({
  optionId,
  label,
  busy,
  disabled,
  onClick,
  tone = 'primary',
  compact = false,
}: Props) {
  return (
    <button
      type="button"
      key={optionId}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all disabled:cursor-not-allowed',
        compact ? 'min-w-[108px] px-3.5 py-2 text-xs' : 'w-full px-4 py-3',
        tone === 'secondary'
          ? 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800'
          : 'bg-indigo-600 text-white hover:bg-indigo-700',
        disabled && !busy && 'opacity-50',
        busy && 'opacity-95'
      )}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {label}
    </button>
  )
}
