import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'
import CssEffectsLibraryClient from '@/components/dev/CssEffectsLibraryClient'

export const metadata: Metadata = {
  title: 'UI Universe - Premium Components, Effects, and Source-Backed UI',
  description:
    'Browse premium UI components and visual foundations with live previews, copy-ready code, source-backed React components, and product-grade detail pages.',
}

interface UiPageProps {
  searchParams?: Promise<{
    q?: string | string[]
    section?: string | string[]
    category?: string | string[]
  }>
}

export default async function UiPage({ searchParams }: UiPageProps) {
  const resolvedSearchParams = await searchParams
  const initialQuery = Array.isArray(resolvedSearchParams?.q) ? resolvedSearchParams?.q[0] : resolvedSearchParams?.q
  const initialSection = Array.isArray(resolvedSearchParams?.section)
    ? resolvedSearchParams?.section[0]
    : resolvedSearchParams?.section
  const initialCategory = Array.isArray(resolvedSearchParams?.category)
    ? resolvedSearchParams?.category[0]
    : resolvedSearchParams?.category

  return (
    <PublicLayout variant="source-hub">
      <CssEffectsLibraryClient
        initialQuery={initialQuery || ''}
        initialSection={(initialSection as 'all' | 'components' | 'foundations') || 'all'}
        initialCategory={initialCategory || 'all'}
      />
    </PublicLayout>
  )
}
