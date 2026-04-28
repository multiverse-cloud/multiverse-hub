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

  return (
    <PublicLayout variant="source-hub">
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




