'use client'

import { createContext, useContext } from 'react'

const ClerkFeatureContext = createContext(false)

export function ClerkFeatureProvider({
  enabled,
  children,
}: {
  enabled: boolean
  children: React.ReactNode
}) {
  return <ClerkFeatureContext.Provider value={enabled}>{children}</ClerkFeatureContext.Provider>
}

export function useClerkFeatureEnabled() {
  return useContext(ClerkFeatureContext)
}
