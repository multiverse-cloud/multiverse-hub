import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import AdsenseScript from '@/components/ads/AdsenseScript'
import SourceHubChrome from '@/components/source-hub/SourceHubChrome'
import AppProviders from '@/components/providers/AppProviders'
import { getGoogleAdsenseClient } from '@/lib/adsense'
import { SEO_LANDING_PAGES } from '@/lib/seo-landing-pages'
import { LANGUAGE_DISCOVERY_META } from '@/lib/seo-languages'
import { SITE_URL, absoluteUrl } from '@/lib/site-url'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const googleAdsenseClient = getGoogleAdsenseClient()
const shouldInjectLocalhostRecovery = process.env.NODE_ENV !== 'production'

export const metadata: Metadata = {
  applicationName: 'mtverse',
  title: {
    default: 'mtverse - Free Tools, UI, Templates, Prompts & Fix Guides',
    template: '%s | mtverse',
  },
  description:
    'Use free online tools, UI components, website templates, AI prompts, discover guides, and troubleshooting fixes in one fast public platform. No public account required.',
  keywords: [
    'free online tools',
    'PDF tools',
    'compress PDF',
    'merge PDF',
    'image compressor',
    'video tools',
    'text tools',
    'developer tools',
    'JSON formatter',
    'QR code generator',
    'calculator',
    'SEO tools',
    'file converter',
    'mtverse tools',
    'UI components',
    'website templates',
    'AI prompts',
    'fix guides',
  ],
  authors: [{ name: 'mtverse team' }],
  creator: 'mtverse',
  publisher: 'mtverse',
  category: 'technology',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      'x-default': SITE_URL,
    },
  },
  icons: {
    icon: '/SiteLogo.png',
    apple: '/SiteLogo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'mtverse - Free Tools, UI, Templates, Prompts & Fix Guides',
    description: 'Free tools, UI components, templates, AI prompts, discover guides, and fixes in one fast public platform.',
    siteName: 'mtverse',
    images: [
      {
        url: absoluteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: 'mtverse free tools, prompts, templates, and UI components',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mtverse - Free Tools, UI, Templates, Prompts & Fix Guides',
    description: 'Use tools, components, templates, prompts, and fix guides instantly. No public login required.',
    images: [absoluteUrl('/opengraph-image')],
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'content-language': 'en',
    'available-languages': LANGUAGE_DISCOVERY_META,
    ...(googleAdsenseClient ? { 'google-adsense-account': googleAdsenseClient } : {}),
  },
}

const GLOBAL_SITE_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'mtverse',
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
    hasPart: [
      { '@type': 'WebPage', name: 'Free Tools', url: absoluteUrl('/free-tools') },
      { '@type': 'WebPage', name: 'Free AI Prompts', url: absoluteUrl('/free-ai-prompts') },
      { '@type': 'WebPage', name: 'Free Website Templates', url: absoluteUrl('/free-website-templates') },
      { '@type': 'WebPage', name: 'Free UI Components', url: absoluteUrl('/free-ui-components') },
      { '@type': 'WebPage', name: 'Tools', url: absoluteUrl('/tools') },
      { '@type': 'WebPage', name: 'Prompt Hub', url: absoluteUrl('/prompts') },
      { '@type': 'WebPage', name: 'Templates', url: absoluteUrl('/templates') },
      { '@type': 'WebPage', name: 'UI Universe', url: absoluteUrl('/ui') },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'mtverse',
    url: SITE_URL,
    logo: absoluteUrl('/SiteLogo.png'),
    sameAs: [SITE_URL],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'mtverse',
    url: SITE_URL,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Free online tools',
      'Free AI prompts',
      'Free website templates',
      'Free UI components',
      'PDF tools',
      'Image tools',
      'Developer tools',
      'SEO tools',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: [
      'Home',
      'Tools',
      'UI Components',
      'Templates',
      'Prompts',
      'Discover',
      'Fixes',
      ...SEO_LANDING_PAGES.map((page) => page.title),
    ],
    url: [
      SITE_URL,
      absoluteUrl('/tools'),
      absoluteUrl('/ui'),
      absoluteUrl('/templates'),
      absoluteUrl('/prompts'),
      absoluteUrl('/discover'),
      absoluteUrl('/fixes'),
      ...SEO_LANDING_PAGES.map((page) => absoluteUrl(`/${page.slug}`)),
    ],
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
      className={plusJakarta.variable}
      data-scroll-behavior="smooth"
    >
      <head>
        {shouldInjectLocalhostRecovery ? (
          <script dangerouslySetInnerHTML={{ __html: LOCALHOST_RECOVERY_SCRIPT }} />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOBAL_SITE_SCHEMA) }}
        />
        <AdsenseScript />
        <link rel="icon" href="/SiteLogo.png" type="image/png" />
      </head>
      <body className="mobile-viewport-fix min-h-[100dvh] overflow-x-hidden bg-background font-sans text-foreground antialiased safe-area-top">
        <AppProviders>
          <SourceHubChrome />
          {children}
        </AppProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
