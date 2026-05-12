import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'
import TemplatesHubPage from '@/components/templates/TemplatesHubPage'
import { getTemplateLibraryData } from '@/lib/template-db'
import {
  filterTemplates,
  normalizeTemplateQuery,
  normalizeTemplateSearchParam,
  resolveTemplateCategory,
  resolveTemplatePlatform,
} from '@/lib/template-query'
import { absoluteUrl } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'Free Premium UI Templates for React, Next.js, Dashboards, Landing Pages | mtverse',
  description:
    'Browse free premium UI templates for React, Next.js, dashboards, landing pages, auth screens, ecommerce, and modern product launches.',
  keywords: [
    'free ui templates',
    'react ui templates',
    'nextjs ui templates',
    'dashboard ui templates',
    'landing page templates',
    'auth page templates',
  ],
  openGraph: {
    title: 'Free Premium UI Templates for React, Next.js, Dashboards, Landing Pages | mtverse',
    description:
      'Browse free premium UI templates for React, Next.js, dashboards, landing pages, auth screens, ecommerce, and modern product launches.',
    url: absoluteUrl('/templates'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Premium UI Templates for React, Next.js, Dashboards, Landing Pages | mtverse',
    description:
      'Browse free premium UI templates for React, Next.js, dashboards, landing pages, auth screens, ecommerce, and modern product launches.',
  },
  alternates: { canonical: absoluteUrl('/templates') },
}

export const revalidate = 3600;

interface TemplatesPageProps {
  searchParams?: Promise<{
    page?: string | string[]
    category?: string | string[]
    platform?: string | string[]
    q?: string | string[]
  }>
}

export default async function TemplatesPage({ searchParams }: TemplatesPageProps) {
  const resolvedSearchParams = await searchParams
  const library = await getTemplateLibraryData()
  const activeCategory = resolveTemplateCategory(normalizeTemplateSearchParam(resolvedSearchParams?.category))
  const activePlatform = resolveTemplatePlatform(normalizeTemplateSearchParam(resolvedSearchParams?.platform))
  const searchQuery = normalizeTemplateQuery(resolvedSearchParams?.q)
  const filteredTemplates = filterTemplates(library.templates, {
    category: activeCategory,
    platform: activePlatform,
    query: searchQuery,
  })
  const schemaMarkup = [
    {
      '@context': 'https://schema.org',
      '@type': ['WebPage', 'CollectionPage'],
      name: 'Free Website Templates',
      headline: 'Free website templates for portfolios, landing pages, dashboards, and SaaS products',
      description:
        'Browse free website templates for React, Next.js, portfolios, dashboards, landing pages, ecommerce, agencies, and product launches.',
      url: absoluteUrl('/templates'),
      inLanguage: 'en',
      keywords: [
        'free website templates',
        'free portfolio templates',
        'landing page templates',
        'dashboard templates',
        'React templates',
        'Next.js templates',
      ].join(', '),
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: library.stats.totalTemplates,
        itemListElement: library.categories.slice(0, 12).map((category, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: category.title,
          url: absoluteUrl(`/templates?category=${category.id}`),
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are mtverse website templates free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The template library is built for free public browsing, previews, and download workflows.',
          },
        },
        {
          '@type': 'Question',
          name: 'What template categories are included?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'mtverse includes portfolio templates, landing page templates, dashboard templates, SaaS templates, ecommerce templates, agency pages, and modern product layouts.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I preview a template before downloading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Template pages include live previews, preview images, and related templates where available.',
          },
        },
      ],
    },
  ]

  return (
    <PublicLayout variant="source-hub" schemaMarkup={schemaMarkup}>
      <TemplatesHubPage
        categories={library.categories}
        platforms={library.platforms}
        featuredTemplates={library.featuredTemplates}
        templates={filteredTemplates}
        activeCategory={activeCategory}
        activePlatform={activePlatform}
        searchQuery={searchQuery}
        totalResults={filteredTemplates.length}
        totalTemplates={library.stats.totalTemplates}
      />
    </PublicLayout>
  )
}




