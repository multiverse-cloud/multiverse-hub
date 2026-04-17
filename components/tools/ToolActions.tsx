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
    <div className={cn('mb-6 flex w-full items-center justify-end gap-2', className)}>
      <div className="relative">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:text-indigo-300"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>

        {shareOpen && (
          <div className="absolute right-0 top-full z-50 mt-1.5 w-44 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <button onClick={copyLink} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button onClick={shareWhatsApp} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
              <ExternalLink className="h-3.5 w-3.5" />
              WhatsApp
            </button>
            <button onClick={shareTwitter} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
              <ExternalLink className="h-3.5 w-3.5" />
              Twitter / X
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
