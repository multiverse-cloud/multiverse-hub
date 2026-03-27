'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

const STORAGE_KEY = 'multiverse_anon_usage'
const SOFT_HINT_THRESHOLD = 3
const HARD_GATE_THRESHOLD = 5

interface UsageGateContextType {
  usageCount: number
  /** True when the hard gate should block the user */
  shouldGate: boolean
  /** True when a soft hint should appear */
  shouldHint: boolean
  /** Call after a successful tool processing action */
  recordUsage: () => void
  /** Dismiss the soft hint for this session */
  dismissHint: () => void
  /** Reset the gate (e.g. after login) */
  clearGate: () => void
}

const UsageGateContext = createContext<UsageGateContextType | undefined>(undefined)

export function UsageGateProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser()
  const [usageCount, setUsageCount] = useState(0)
  const [hintDismissed, setHintDismissed] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setUsageCount(parseInt(stored, 10) || 0)
    } catch { /* SSR or localStorage unavailable */ }
  }, [])

  const recordUsage = useCallback(() => {
    if (isSignedIn) return // signed-in users have no limits
    setUsageCount(prev => {
      const next = prev + 1
      try { localStorage.setItem(STORAGE_KEY, String(next)) } catch { /* noop */ }
      return next
    })
  }, [isSignedIn])

  const dismissHint = useCallback(() => setHintDismissed(true), [])

  const clearGate = useCallback(() => {
    setUsageCount(0)
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* noop */ }
  }, [])

  const shouldGate = !isSignedIn && usageCount >= HARD_GATE_THRESHOLD
  const shouldHint = !isSignedIn && !hintDismissed && usageCount >= SOFT_HINT_THRESHOLD && usageCount < HARD_GATE_THRESHOLD

  return (
    <UsageGateContext.Provider value={{ usageCount, shouldGate, shouldHint, recordUsage, dismissHint, clearGate }}>
      {children}
    </UsageGateContext.Provider>
  )
}

export function useUsageGate() {
  const ctx = useContext(UsageGateContext)
  if (!ctx) throw new Error('useUsageGate must be used within UsageGateProvider')
  return ctx
}
