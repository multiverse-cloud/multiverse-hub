import type { Metadata } from 'next'
import { Suspense } from 'react'
import FAQSection from '@/components/home/FAQSection'
import HeroSection from '@/components/home/HeroSection'
import HeroStatsSection from '@/components/home/HeroStatsSection'
import NewToolsSection from '@/components/home/NewToolsSection'
import TrendingToolsSection from '@/components/home/TrendingToolsSection'
import UniversesSection from '@/components/home/UniversesSection'
import WhyMultiverse from '@/components/home/WhyMultiverse'
import PublicLayout from '@/components/layout/PublicLayout'

export const metadata: Metadata = {
  description:
    'One platform, 150+ free tools. Compress PDFs, resize images, download videos, format JSON, and more — all free, private, and instant. No login required.',
  alternates: {
    canonical: 'https://multiverse-tools.vercel.app',
  },
}

const WEB_SITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Multiverse Tools',
  url: 'https://multiverse-tools.vercel.app',
  description: 'One platform with 150+ free online tools for PDF, image, video, text, developer, and daily workflows.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://multiverse-tools.vercel.app/tools?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Multiverse Tools',
  url: 'https://multiverse-tools.vercel.app',
  logo: 'https://multiverse-tools.vercel.app/icon.png',
  sameAs: [],
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Multiverse completely free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every tool in the library is free to use — no premium paywalls, no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to create an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not for most tools. You can use any tool instantly without signing up. Creating an account unlocks extras like saving favourites.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are my files stored on your servers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Most tools process files directly in your browser. Server-processed files are removed immediately after processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many tools are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Over 150 tools across ten categories including PDF, image, video, audio, text, developer, SEO, calculators, and file utilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Multiverse work on mobile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Every tool is responsive and works on phones, tablets, and desktops.',
      },
    },
  ],
}

const HOMEPAGE_SCHEMA = [WEB_SITE_SCHEMA, ORGANIZATION_SCHEMA, FAQ_SCHEMA]

export default function HomePage() {
  return (
    <PublicLayout
      schemaMarkup={HOMEPAGE_SCHEMA as unknown as Record<string, any>}
    >
      <HeroSection />
      <HeroStatsSection />
      <UniversesSection />
      <Suspense fallback={<div className="py-16" />}>
        <TrendingToolsSection />
      </Suspense>
      <Suspense fallback={<div className="py-16" />}>
        <NewToolsSection />
      </Suspense>
      <WhyMultiverse />
      <FAQSection />
    </PublicLayout>
  )
}
