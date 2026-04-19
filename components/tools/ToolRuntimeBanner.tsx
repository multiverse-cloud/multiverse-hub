import { AlertTriangle, CheckCircle2, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ToolRuntimeStatus } from '@/lib/tool-runtime-status'

export default function ToolRuntimeBanner({
  status,
}: {
  status: ToolRuntimeStatus | null
}) {
  if (!status) {
    return null
  }

  const Icon = status.available ? CheckCircle2 : status.title === 'Binary missing' ? Lock : AlertTriangle
  const isDisabledState = status.title === 'Binary missing'

  return (
    <div className={cn(
      'mb-6 rounded-2xl border p-4',
      isDisabledState
        ? 'border-slate-200 bg-slate-50/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400'
        : 'border-amber-200 bg-amber-50/80 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-100'
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
          isDisabledState
            ? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{status.title}</p>
          <p className={cn(
            'mt-1 text-sm leading-6',
            isDisabledState
              ? 'text-slate-600 dark:text-slate-400'
              : 'text-amber-900/90 dark:text-amber-100/90'
          )}>
            {isDisabledState ? 'This tool is currently unavailable on this server.' : status.message}
          </p>
          {isDisabledState && status.details.length > 0 && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              {status.details[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
