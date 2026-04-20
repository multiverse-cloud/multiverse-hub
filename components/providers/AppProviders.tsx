'use client'

import ClientShell from '@/components/providers/ClientShell'
import ThemeProvider from '@/components/providers/ThemeProvider'

export default function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      {children}
      <ClientShell />
    </ThemeProvider>
  )
}
