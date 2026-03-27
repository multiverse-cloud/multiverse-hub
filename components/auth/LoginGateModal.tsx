'use client'

import Link from 'next/link'
import { LogIn, Shield, Heart, Clock, Zap, X } from 'lucide-react'
import { useUsageGate } from '@/components/providers/UsageGateContext'

const BENEFITS = [
  { icon: Zap, text: 'Unlimited daily tool uses' },
  { icon: Heart, text: 'Save your favourite tools' },
  { icon: Clock, text: 'Access usage history' },
  { icon: Shield, text: 'Bigger upload limits coming soon' },
]

/** Soft hint banner shown after 3 uses */
export function UsageHintBanner() {
  const { shouldHint, dismissHint, usageCount } = useUsageGate()
  if (!shouldHint) return null

  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/30">
      <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
        You've used {usageCount} of 5 free tools.{' '}
        <Link href="/sign-in" className="font-bold underline">Sign in</Link> for unlimited access.
      </p>
      <button type="button" onClick={dismissHint} className="shrink-0 p-1 text-amber-600 hover:text-amber-800 dark:text-amber-400">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

/** Hard gate modal shown after 5 uses */
export function LoginGateModal() {
  const { shouldGate } = useUsageGate()
  if (!shouldGate) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40">
          <LogIn className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
        </div>

        <h2 className="font-display text-xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
          You've reached the free limit
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Create a free account to continue using all tools with no restrictions.
        </p>

        <div className="mt-5 space-y-2.5">
          {BENEFITS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <Icon className="h-4 w-4 shrink-0 text-indigo-500" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Link
            href="/sign-in"
            className="btn-primary flex-1 justify-center gap-2 text-sm"
          >
            <LogIn className="h-4 w-4" /> Sign In
          </Link>
          <Link
            href="/sign-up"
            className="btn-secondary flex-1 justify-center text-sm"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}
