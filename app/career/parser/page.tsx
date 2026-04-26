import type { Metadata } from 'next'
import Script from 'next/script'
import CareerParserApp from '@/components/career/CareerParserApp'

const title = 'Resume Parser - ATS Resume Checker and Keyword Analyzer'
const description =
  'Parse resume text, extract contact details, detect sections, score ATS readiness, and find keyword gaps without login or stored history.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://multiverse-tools.vercel.app/career/parser' },
  openGraph: {
    title,
    description,
    url: 'https://multiverse-tools.vercel.app/career/parser',
    type: 'website',
  },
}

export default function CareerParserPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Multiverse Resume Parser',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description,
  }

  return (
    <>
      <Script id="career-parser-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <CareerParserApp />
    </>
  )
}
