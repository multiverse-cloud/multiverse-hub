import type { Metadata } from 'next'
import Script from 'next/script'
import { Suspense } from 'react'
import CareerBuilderApp from '@/components/career/CareerBuilderApp'

const title = 'Free Resume Builder - Live CV Editor with Premium Templates'
const description =
  'Create a resume with live preview, 30+ premium templates, YAML export, JSON export, and print-ready PDF workflow. No login required.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://multiverse-tools.vercel.app/career/builder' },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: 'https://multiverse-tools.vercel.app/career/builder',
    type: 'website',
  },
}

export default function CareerBuilderPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Multiverse Resume Builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description,
  }

  return (
    <>
      <Script id="career-builder-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Suspense fallback={<div className="min-h-dvh bg-slate-50 dark:bg-slate-950" />}>
        <CareerBuilderApp />
      </Suspense>
    </>
  )
}
