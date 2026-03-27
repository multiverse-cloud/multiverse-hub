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
        'rounded-[18px] border p-1.5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.18)]',
        isInverse
          ? 'border-white/20 bg-white/10 backdrop-blur-xl'
          : 'border-slate-200 bg-white',
        className
      )}
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex min-h-[58px] flex-1 items-center gap-3 rounded-[14px] px-4">
          <Link2 className={cn('h-5 w-5 shrink-0', isInverse ? 'text-white/60' : 'text-slate-400')} />
          <input
            type="url"
            value={url}
            onChange={event => onUrlChange(event.target.value)}
            onKeyDown={event => event.key === 'Enter' && onAnalyze()}
            placeholder={placeholder}
            className={cn(
              'w-full border-none bg-transparent py-2.5 text-sm font-medium outline-none',
              isInverse
                ? 'text-white placeholder:text-white/50'
                : 'text-slate-900 placeholder:text-slate-400'
            )}
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
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold transition-colors',
              isInverse
                ? 'border border-white/20 text-white hover:bg-white/10'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            )}
          >
            <ClipboardPaste className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onUrlChange('')}
            aria-label="Clear URL"
            title="Clear URL"
            disabled={!url}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
              isInverse
                ? 'border border-white/20 text-white hover:bg-white/10'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            )}
          >
            <X className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={!url.trim() || loading}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60',
              isInverse
                ? 'bg-white text-indigo-700 hover:bg-white/90'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            )}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
