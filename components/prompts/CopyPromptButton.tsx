'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { trackPromptEvent } from '@/components/prompts/promptAnalytics'
import { cn } from '@/lib/utils'

export default function CopyPromptButton({
  prompt,
  className,
  eventProperties,
}: {
  prompt: string
  className?: string
  eventProperties?: Record<string, string | number | boolean>
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(id)
  }, [copied])

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(prompt)
        trackPromptEvent('Prompt Copied', eventProperties)
        setCopied(true)
      }}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800',
        className
      )}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-500" />}
      {copied ? 'Copied' : 'Copy Prompt'}
    </button>
  )
}
