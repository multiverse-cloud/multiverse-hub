import { ClipboardPaste, Link2, Loader2, X, Zap } from 'lucide-react'
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
  placeholder = 'Paste video URL here',
  buttonLabel = 'Analyze',
  tone = 'light',
  className,
}: Props) {
  const isInverse = tone === 'inverse'

  return (
    <div
      className={cn(
        'rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-[0_25px_50px_-20px_rgba(15,23,42,0.15)] dark:border-slate-800 dark:bg-slate-900',
        className
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex min-h-[64px] flex-1 items-center gap-4 rounded-xl px-5 bg-slate-50 dark:bg-slate-950">
          <Link2 className="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500" />
          <input
            type="url"
            value={url}
            onChange={event => onUrlChange(event.target.value)}
            onKeyDown={event => event.key === 'Enter' && onAnalyze()}
            placeholder={placeholder}
            className="w-full border-none bg-transparent py-3 text-base font-medium outline-none text-slate-900 placeholder:text-slate-400 dark:text-slate-50 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="flex gap-2 p-1">
          <button
            type="button"
            onClick={async () => {
              const pasted = await navigator.clipboard.readText().catch(() => '')
              if (pasted) onUrlChange(pasted)
            }}
            aria-label="Paste URL"
            title="Paste URL"
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold transition-colors hover:bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ClipboardPaste className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => onUrlChange('')}
            aria-label="Clear URL"
            title="Clear URL"
            disabled={!url}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={!url.trim() || loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Zap className="h-5 w-5" />}
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
