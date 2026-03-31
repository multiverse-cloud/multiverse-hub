'use client'

import { FavoritesProvider } from '@/components/providers/FavoritesContext'
import { UsageGateProvider } from '@/components/providers/UsageGateContext'
import { LoginGateModal } from '@/components/auth/LoginGateModal'
import ClientShell from '@/components/providers/ClientShell'
import ThemeProvider from '@/components/providers/ThemeProvider'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <UsageGateProvider>
          {children}
          <LoginGateModal />
          <ClientShell />
        </UsageGateProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}
