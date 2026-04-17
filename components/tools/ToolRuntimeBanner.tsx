import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import type { ToolRuntimeStatus } from '@/lib/tool-runtime-status'

export default function ToolRuntimeBanner({
  status,
}: {
  status: ToolRuntimeStatus | null
}) {
  if (!status) {
    return null
  }

  const Icon = status.available ? CheckCircle2 : AlertTriangle

  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-100">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{status.title}</p>
          <p className="mt-1 text-sm leading-6 text-amber-900/90 dark:text-amber-100/90">
            {status.message}
          </p>
          {status.details.length > 0 ? (
            <ul className="mt-3 space-y-1.5 text-xs leading-5 text-amber-900/80 dark:text-amber-100/80">
              {status.details.map(detail => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}
