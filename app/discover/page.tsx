import type { Metadata } from 'next'
import DiscoverClient from '@/components/discover/DiscoverClient'
import PublicLayout from '@/components/layout/PublicLayout'
import { getPublishedDiscoverLists } from '@/lib/discover-db'

export const metadata: Metadata = {
  title: 'Discover - Rankings, Watch Guides And Curated Picks',
  description:
    'Discover curated rankings, watch guides, and editorial picks across movies, series, songs, actors, actresses, and directors.',
}

export default async function DiscoverPage() {
  const lists = await getPublishedDiscoverLists()

  return (
    <PublicLayout>
      <DiscoverClient lists={lists} />
    </PublicLayout>
  )
}
