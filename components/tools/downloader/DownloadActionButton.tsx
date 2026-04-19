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
        'inline-flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-all disabled:cursor-not-allowed md:rounded-xl md:text-sm',
        compact ? 'min-w-[80px] h-[36px] px-2.5 py-2 text-[10px] md:min-w-[100px] md:h-[40px] md:px-3 md:text-xs' : 'w-full h-[44px] px-4 py-2.5 md:h-[48px] md:px-5 md:py-3',
        tone === 'secondary'
          ? 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800'
          : 'bg-indigo-600 text-white hover:bg-indigo-700',
        disabled && !busy && 'opacity-50',
        busy && 'opacity-95'
      )}
    >
      {busy ? <Loader2 className="h-3 w-3 animate-spin md:h-3.5 md:w-3.5" /> : <Download className="h-3 w-3 md:h-3.5 md:w-3.5" />}
      <span className="hidden md:inline">{label}</span>
      <span className="md:hidden">{label === 'Download' ? '↓' : label}</span>
    </button>
  )
}
