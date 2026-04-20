'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'multiverse_anon_usage'

interface UsageGateContextType {
  usageCount: number
  shouldGate: boolean
  shouldHint: boolean
  recordUsage: () => void
  dismissHint: () => void
  clearGate: () => void
}

const UsageGateContext = createContext<UsageGateContextType | undefined>(undefined)

const PUBLIC_USAGE_GATE_DISABLED: UsageGateContextType = {
  usageCount: 0,
  shouldGate: false,
  shouldHint: false,
  recordUsage: () => {},
  dismissHint: () => {},
  clearGate: () => {},
}

export function UsageGateProvider({ children }: { children: React.ReactNode }) {
  const [usageCount, setUsageCount] = useState(0)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUsageCount(parseInt(stored, 10) || 0)
      }
    } catch {
      // no-op
    }
  }, [])

  const recordUsage = useCallback(() => {
    setUsageCount(prev => {
      const next = prev + 1
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // no-op
      }
      return next
    })
  }, [])

  const dismissHint = useCallback(() => {
    // public auth is disabled, so hints stay off
  }, [])

  const clearGate = useCallback(() => {
    setUsageCount(0)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // no-op
    }
  }, [])

  return (
    <UsageGateContext.Provider
      value={{
        usageCount,
        shouldGate: false,
        shouldHint: false,
        recordUsage,
        dismissHint,
        clearGate,
      }}
    >
      {children}
    </UsageGateContext.Provider>
  )
}

export function useUsageGate() {
  const ctx = useContext(UsageGateContext)
  return ctx || PUBLIC_USAGE_GATE_DISABLED
}
