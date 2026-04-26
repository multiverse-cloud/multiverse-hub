import type { Metadata } from 'next'
import Script from 'next/script'
import PublicLayout from '@/components/layout/PublicLayout'
import CareerHomePage from '@/components/career/CareerHomePage'
import { CAREER_FAQS } from '@/lib/career/career-data'

const title = 'Career Universe - Free Resume Builder, CV Templates and ATS Parser'
const description =
  'Build ATS-friendly resumes, switch premium CV templates, import resume text, and analyze your resume with a private browser-based parser.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://multiverse-tools.vercel.app/career' },
  openGraph: {
    title,
    description,
    url: 'https://multiverse-tools.vercel.app/career',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function CareerPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CAREER_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <PublicLayout>
      <Script id="career-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CareerHomePage />
    </PublicLayout>
  )
}
