import type { Metadata } from 'next'
import DiscoverClient from '@/components/discover/DiscoverClient'
import PublicLayout from '@/components/layout/PublicLayout'
import { getPublishedDiscoverLists } from '@/lib/discover-db'
import {
  DISCOVER_PUBLIC_PAGE_SIZE,
  filterDiscoverLists,
  getDiscoverCategories,
  getDiscoverIntents,
  paginateDiscoverItems,
  parseDiscoverPage,
  resolveDiscoverFacet,
  normalizeDiscoverSearchParam,
} from '@/lib/discover-query'

export const metadata: Metadata = {
  title: 'Discover - Rankings, Watch Guides And Curated Picks',
  description:
    'Discover curated rankings, watch guides, and editorial picks across movies, series, songs, actors, actresses, and directors.',
}

interface DiscoverPageProps {
  searchParams?: Promise<{
    page?: string | string[]
    category?: string | string[]
    intent?: string | string[]
  }>
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const resolvedSearchParams = await searchParams
  const allLists = await getPublishedDiscoverLists()
  const categories = getDiscoverCategories(allLists)
  const intents = getDiscoverIntents(allLists)
  const activeCategory = resolveDiscoverFacet(
    normalizeDiscoverSearchParam(resolvedSearchParams?.category),
    categories
  )
  const activeIntent = resolveDiscoverFacet(
    normalizeDiscoverSearchParam(resolvedSearchParams?.intent),
    intents
  )
  const filteredLists = filterDiscoverLists(allLists, {
    category: activeCategory,
    intent: activeIntent,
  })
  const pagination = paginateDiscoverItems(
    filteredLists,
    parseDiscoverPage(resolvedSearchParams?.page),
    DISCOVER_PUBLIC_PAGE_SIZE
  )
  const featuredLists = allLists.filter(list => list.featured).slice(0, 3)
  const rankingCount = allLists.filter(list => list.type === 'ranking').length
  const guideCount = allLists.filter(list => list.type === 'guide').length

  return (
    <PublicLayout>
      <DiscoverClient
        lists={pagination.items}
        featuredLists={featuredLists}
        categories={categories}
        intents={intents}
        activeCategory={activeCategory}
        activeIntent={activeIntent}
        currentPage={pagination.page}
        pageCount={pagination.totalPages}
        totalResults={filteredLists.length}
        totalPublished={allLists.length}
        rankingCount={rankingCount}
        guideCount={guideCount}
        pageSize={pagination.pageSize}
        pageStart={pagination.startIndex}
        pageEnd={pagination.endIndex}
      />
    </PublicLayout>
  )
}
