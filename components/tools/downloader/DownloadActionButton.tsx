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
      aria-busy={busy}
      aria-live="polite"
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none disabled:cursor-not-allowed dark:focus-visible:ring-offset-slate-950 md:rounded-xl md:text-sm',
        compact ? 'min-w-[70px] h-[32px] px-2 py-1.5 text-[10px] md:min-w-[100px] md:h-[40px] md:px-3 md:text-xs' : 'w-full h-[38px] px-3 py-2 text-[11px] md:h-[48px] md:px-5 md:py-3',
        tone === 'secondary'
          ? 'border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:translate-y-0 motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800'
          : 'bg-indigo-600 text-white hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-[0_12px_20px_-14px_rgba(79,70,229,0.8)] active:translate-y-0 motion-reduce:hover:translate-y-0',
        disabled && !busy && 'opacity-50',
        busy && 'opacity-95'
      )}
    >
      {busy ? <Loader2 className="h-3 w-3 animate-spin md:h-3.5 md:w-3.5" aria-hidden="true" /> : <Download className="h-3 w-3 md:h-3.5 md:w-3.5" aria-hidden="true" />}
      <span className="hidden md:inline">{label}</span>
      <span className="md:hidden">{label.includes('Downloading') ? '...' : label === 'Download' ? 'Save' : label}</span>
    </button>
  )
}
