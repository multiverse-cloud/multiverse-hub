'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CopyPromptButton({
  prompt,
  className,
}: {
  prompt: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return

    const timeoutId = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [copied])

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(prompt)
        setCopied(true)
      }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-slate-300 hover:text-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-50',
        className
      )}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : 'Copy Prompt'}
    </button>
  )
}
