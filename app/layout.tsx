import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import AuthProvider from '@/components/providers/AuthProvider'
import { FavoritesProvider } from '@/components/providers/FavoritesContext'
import { UsageGateProvider } from '@/components/providers/UsageGateContext'
import { LoginGateModal } from '@/components/auth/LoginGateModal'
import ClientShell from '@/components/providers/ClientShell'
import ThemeProvider from '@/components/providers/ThemeProvider'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Multiverse - Professional Online Tools',
    template: '%s | Multiverse',
  },
  description:
    'One platform. Multiple universes. Professional tools, AI, news, learning, developer utilities, and digital products in one ecosystem.',
  keywords: [
    'free tools',
    'AI tools',
    'PDF tools',
    'image tools',
    'video tools',
    'text tools',
    'developer tools',
    'calculator',
    'multiverse',
    'online tools',
  ],
  authors: [{ name: 'Multiverse Team' }],
  creator: 'Multiverse',
  metadataBase: new URL('https://multiverse-tools.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://multiverse-tools.vercel.app',
    title: 'Multiverse - Professional Online Tools',
    description: 'One platform. Multiple universes. Professional tools and utilities for everyday work.',
    siteName: 'Multiverse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multiverse - Professional Online Tools',
    description: 'Professional tools, AI, learning, and digital products.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-[100dvh] bg-background font-sans text-foreground antialiased">
        <AuthProvider>
          <ThemeProvider>
            <FavoritesProvider>
              <UsageGateProvider>
                {children}
                <LoginGateModal />
                <SpeedInsights />
                <ClientShell />
              </UsageGateProvider>
            </FavoritesProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
