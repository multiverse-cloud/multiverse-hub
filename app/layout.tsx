import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import SourceHubChrome from '@/components/source-hub/SourceHubChrome'
import AuthProvider from '@/components/providers/AuthProvider'
import AppProviders from '@/components/providers/AppProviders'
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
    default: 'Multiverse — 150+ Free Online Tools',
    template: '%s | Multiverse Tools',
  },
  description:
    'One platform, 150+ free tools. Compress PDFs, resize images, download videos, format JSON, and more — all free, private, and instant.',
  keywords: [
    'free online tools',
    'PDF tools',
    'compress PDF',
    'merge PDF',
    'image compressor',
    'video downloader',
    'text tools',
    'developer tools',
    'JSON formatter',
    'QR code generator',
    'calculator',
    'SEO tools',
    'file converter',
    'multiverse tools',
  ],
  authors: [{ name: 'Multiverse Team' }],
  creator: 'Multiverse',
  publisher: 'Multiverse Tools',
  metadataBase: new URL('https://multiverse-tools.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://multiverse-tools.vercel.app',
    title: 'Multiverse — 150+ Free Online Tools',
    description: 'Compress PDFs, resize images, download videos, and more — 150+ free tools in one platform.',
    siteName: 'Multiverse Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multiverse — 150+ Free Online Tools',
    description: '150+ free tools for PDF, image, video, text, and developer workflows. No login required.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const LOCALHOST_RECOVERY_SCRIPT = `
(() => {
  if (typeof window === 'undefined') return;
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  if (!isLocalhost) return;

  const reloadKey = '__multiverse_localhost_runtime_recovered__';
  const shouldReload = window.sessionStorage.getItem(reloadKey) !== '1';
  const clearCaches = () =>
    'caches' in window
      ? caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))).then(() => undefined)
      : Promise.resolve();

  const unregisterServiceWorkers = () =>
    'serviceWorker' in navigator
      ? navigator.serviceWorker
          .getRegistrations()
          .then(registrations =>
            Promise.all(registrations.map(registration => registration.unregister())).then(
              () => registrations.length > 0
            )
          )
      : Promise.resolve(false);

  unregisterServiceWorkers()
    .then(hadRegistrations => clearCaches().then(() => hadRegistrations))
    .then(hadRegistrations => {
      if (hadRegistrations && shouldReload) {
        window.sessionStorage.setItem(reloadKey, '1');
        window.location.reload();
      }
    })
    .catch(() => {});
})();
`

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALHOST_RECOVERY_SCRIPT }} />
      </head>
      <body className="min-h-[100dvh] overflow-x-hidden bg-background font-sans text-foreground antialiased">
        <AuthProvider>
          <AppProviders>
            <SourceHubChrome />
            {children}
          </AppProviders>
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  )
}

