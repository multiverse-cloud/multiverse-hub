'use client'

import { useState } from 'react'
import { Share2, Copy, Check, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  slug: string
  name: string
  className?: string
}

export default function ToolActions({ name, className }: Props) {
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = window.location.href
    const title = `${name} - Multiverse Tools`

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        /* user cancelled or not supported */
      }
    }

    setShareOpen(prev => !prev)
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard permission denied */
    }

    setShareOpen(false)
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${name}: ${window.location.href}`)}`, '_blank', 'noopener')
    setShareOpen(false)
  }

  function shareTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${name} on Multiverse`)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener')
    setShareOpen(false)
  }

  return (
    <div className={cn('mb-6 flex items-center justify-end gap-2', className)}>
      <div className="relative">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/95 px-3 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur transition-all hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:text-indigo-300"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {shareOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-slate-200/80 bg-white/98 p-1.5 shadow-[0_18px_42px_-22px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/98">
            <button onClick={copyLink} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button onClick={shareWhatsApp} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
              <ExternalLink className="h-3.5 w-3.5" />
              WhatsApp
            </button>
            <button onClick={shareTwitter} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
              <ExternalLink className="h-3.5 w-3.5" />
              Twitter / X
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
