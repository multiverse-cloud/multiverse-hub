import type { Metadata } from 'next'
import CareerHubPage from '@/components/career/CareerHubPage'
import PublicLayout from '@/components/layout/PublicLayout'
import { getCareerLibraryData } from '@/lib/career-db'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Career Universe - Free ATS-Friendly Resume Templates and CV Layouts | Multiverse',
  description:
    'Browse premium ATS-friendly resume templates and CV layouts for software engineering, research, executive, minimal, and creative careers.',
  keywords: [
    'resume templates',
    'cv templates',
    'ats friendly resume',
    'software engineer resume template',
    'academic cv template',
    'executive resume template',
  ],
  alternates: {
    canonical: 'https://multiverse-tools.vercel.app/career',
  },
  openGraph: {
    title: 'Career Universe - Free ATS-Friendly Resume Templates and CV Layouts | Multiverse',
    description:
      'Premium ATS-friendly resume templates and CV layouts built for real applications, not generic builder clutter.',
    url: 'https://multiverse-tools.vercel.app/career',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Universe - Free ATS-Friendly Resume Templates and CV Layouts | Multiverse',
    description:
      'Premium ATS-friendly resume templates and CV layouts built for real applications.',
  },
}

function buildCareerSchema(
  library: Awaited<ReturnType<typeof getCareerLibraryData>>
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Career Universe',
        url: 'https://multiverse-tools.vercel.app/career',
        description:
          'Premium ATS-friendly resume templates and CV layouts for software engineering, research, executive, minimal, and creative careers.',
      },
      {
        '@type': 'ItemList',
        name: 'Resume Template Collection',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: library.stats.totalTemplates,
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are these resume templates ATS-friendly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Career Universe templates are built from structured local RenderCV sources with readable section order, text-based content, and export-safe layout patterns.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do these career templates use any external resume API?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Career Universe uses local template sources only, with no external AI dependency and no third-party resume builder API.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who are these resume templates best for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The library includes resume and CV templates for software engineers, academic researchers, executives, minimal one-page applicants, and creative professionals.',
            },
          },
        ],
      },
    ],
  }
}

interface CareerPageProps {
  searchParams?: Promise<{
    q?: string | string[]
    category?: string | string[]
  }>
}

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export default async function CareerPage({ searchParams }: CareerPageProps) {
  const resolvedSearchParams = await searchParams
  const library = await getCareerLibraryData()
  const schemaMarkup = buildCareerSchema(library)
  const initialQuery = firstValue(resolvedSearchParams?.q)?.trim() || ''
  const requestedCategory = firstValue(resolvedSearchParams?.category)
  const initialCategory = library.categories.some(category => category.id === requestedCategory)
    ? (requestedCategory as typeof library.categories[number]['id'])
    : 'all'

  return (
    <PublicLayout variant="source-hub" schemaMarkup={schemaMarkup as Record<string, any>}>
      <CareerHubPage
        templates={library.templates}
        categories={library.categories}
        initialQuery={initialQuery}
        initialCategory={initialCategory}
      />
    </PublicLayout>
  )
}
