import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import SourceHubChrome from '@/components/source-hub/SourceHubChrome'
import AppProviders from '@/components/providers/AppProviders'
import { SITE_URL, absoluteUrl } from '@/lib/site-url'
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
    default: 'Multiverse - Free Tools, UI, Templates, Prompts & Fix Guides',
    template: '%s | Multiverse',
  },
  description:
    'Use free online tools, UI components, website templates, AI prompts, discover guides, and troubleshooting fixes in one fast public platform. No public account required.',
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
    'UI components',
    'website templates',
    'AI prompts',
    'fix guides',
  ],
  authors: [{ name: 'Multiverse Team' }],
  creator: 'Multiverse',
  publisher: 'Multiverse Tools',
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/SiteLogo.png',
    apple: '/SiteLogo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Multiverse - Free Tools, UI, Templates, Prompts & Fix Guides',
    description: 'Free tools, UI components, templates, AI prompts, discover guides, and fixes in one fast public platform.',
    siteName: 'Multiverse Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multiverse - Free Tools, UI, Templates, Prompts & Fix Guides',
    description: 'Use tools, components, templates, prompts, and fix guides instantly. No public login required.',
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

const GLOBAL_SITE_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Multiverse Tools',
    url: SITE_URL,
    description:
      'A public platform for free online tools, UI components, website templates, AI prompts, discover guides, and troubleshooting fixes.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Multiverse Tools',
    url: SITE_URL,
    logo: absoluteUrl('/SiteLogo.png'),
    sameAs: [SITE_URL],
  },
]

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
      data-scroll-behavior="smooth"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALHOST_RECOVERY_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOBAL_SITE_SCHEMA) }}
        />
        <link rel="icon" href="/SiteLogo.png" type="image/png" />
      </head>
      <body className="mobile-viewport-fix min-h-[100dvh] overflow-x-hidden bg-background font-sans text-foreground antialiased safe-area-top">
        <AppProviders>
          <SourceHubChrome />
          {children}
        </AppProviders>
        <SpeedInsights />
      </body>
    </html>
  )
}
