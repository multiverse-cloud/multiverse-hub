import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'
import CareerImportPage from '@/components/career/CareerImportPage'

export const metadata: Metadata = {
  title: 'Resume Import - Rebuild Existing CVs in Multiverse',
  description:
    'Import resume files or paste resume text, then analyze ATS structure or rebuild a clean editable resume with premium templates.',
  alternates: { canonical: 'https://multiverse-tools.vercel.app/career/import' },
  openGraph: {
    title: 'Resume Import - Rebuild Existing CVs in Multiverse',
    description:
      'Import resume files or paste resume text, then analyze ATS structure or rebuild a clean editable resume with premium templates.',
    url: 'https://multiverse-tools.vercel.app/career/import',
    type: 'website',
  },
}

export default function CareerImportRoute() {
  return (
    <PublicLayout>
      <CareerImportPage />
    </PublicLayout>
  )
}
