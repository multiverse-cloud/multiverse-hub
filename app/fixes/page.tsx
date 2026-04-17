import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'
import UniverseTopBar from '@/components/public/UniverseTopBar'
import FixesUniversePage from '@/components/fixes/FixesUniversePage'
import { FEATURED_FIX_GUIDES, FIXES_CLUSTERS, FIX_GUIDES } from '@/lib/fixes-data'
import {
  filterFixGuides,
  FIXES_PUBLIC_PAGE_SIZE,
  paginateFixGuides,
  parseFixPage,
  resolveFixCluster,
  normalizeFixSearchParam,
} from '@/lib/fixes-query'

export const metadata: Metadata = {
  title: 'Fixes Universe - 150 Problem Guides for Mobile, PC, Apps and Wi-Fi',
  description:
    'Fix battery drain, slow phones, Wi-Fi issues, crashing apps, gaming lag, and common device problems with simple step-by-step guides.',
}

interface FixesPageProps {
  searchParams?: Promise<{
    page?: string | string[]
    cluster?: string | string[]
  }>
}

export default async function FixesPage({ searchParams }: FixesPageProps) {
  const resolvedSearchParams = await searchParams
  const activeCluster = resolveFixCluster(normalizeFixSearchParam(resolvedSearchParams?.cluster))
  const filteredGuides = filterFixGuides(FIX_GUIDES, { cluster: activeCluster })
  const pagination = paginateFixGuides(
    filteredGuides,
    parseFixPage(resolvedSearchParams?.page),
    FIXES_PUBLIC_PAGE_SIZE
  )

  return (
    <PublicLayout>
      <UniverseTopBar items={[{ label: 'Home', href: '/' }, { label: 'Fixes' }]} actionName="Fixes Universe" actionSlug="fixes" />
      <FixesUniversePage
        clusters={FIXES_CLUSTERS}
        featuredGuides={FEATURED_FIX_GUIDES.slice(0, 4)}
        guides={pagination.items}
        activeCluster={activeCluster}
        currentPage={pagination.page}
        pageCount={pagination.totalPages}
        totalResults={filteredGuides.length}
        totalGuides={FIX_GUIDES.length}
        pageStart={pagination.startIndex}
        pageEnd={pagination.endIndex}
      />
    </PublicLayout>
  )
}


