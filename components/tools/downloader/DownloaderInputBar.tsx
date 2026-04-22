import { ClipboardPaste, Link2, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  url: string
  loading: boolean
  onUrlChange: (value: string) => void
  onAnalyze: () => void
  placeholder?: string
  buttonLabel?: string
  tone?: 'light' | 'inverse'
  className?: string
}

export default function DownloaderInputBar({
  url,
  loading,
  onUrlChange,
  onAnalyze,
  placeholder = 'Paste video URL',
  buttonLabel = 'Download',
  tone: _tone = 'light',
  className,
}: Props) {
  return (
    <div className={cn('flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-2.5 py-2 shadow-[0_14px_34px_-30px_rgba(15,23,42,0.45)] transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 sm:gap-3 sm:px-3 sm:py-2.5', className)}>
      <div className="flex h-11 min-w-0 flex-1 items-center gap-2 sm:h-12">
        <Link2 className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <input
            type="url"
            value={url}
            onChange={event => onUrlChange(event.target.value)}
            onKeyDown={event => event.key === 'Enter' && onAnalyze()}
            onPaste={event => {
              const pastedText = event.clipboardData.getData('text')
              if (!pastedText) return
              window.setTimeout(() => onUrlChange(pastedText), 0)
            }}
            placeholder={placeholder}
            aria-label={placeholder}
            className="min-w-0 flex-1 border-none bg-transparent py-2 text-sm font-medium text-slate-900 outline-none focus:outline-none focus-visible:outline-none placeholder:font-normal placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500 sm:text-[15px]"
          />
          <button
            type="button"
            onClick={async () => {
              const pasted = await navigator.clipboard.readText().catch(() => '')
              if (pasted) onUrlChange(pasted)
            }}
            aria-label="Paste URL"
            title="Paste URL"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 motion-reduce:transition-none dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <ClipboardPaste className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onUrlChange('')}
            aria-label="Clear URL"
            title="Clear URL"
            disabled={!url}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-30 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
      </div>

      <button
          type="button"
          onClick={onAnalyze}
          disabled={!url.trim() || loading}
          aria-busy={loading}
          aria-live="polite"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white transition-all duration-200 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:px-6 sm:text-sm"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          <span className="hidden sm:inline">{loading ? 'Loading' : buttonLabel}</span>
          <span className="sm:hidden">{loading ? '...' : 'Download'}</span>
      </button>
    </div>
  )
}
