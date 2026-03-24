import PublicLayout from '@/components/layout/PublicLayout'
import EntertainmentClient from '@/components/entertainment/EntertainmentClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entertainment - Movies, TV Series & OTT',
  description: 'Discover trending movies, TV series, cast info, trailers and where to watch.',
}

export default function EntertainmentPage() {
  return <PublicLayout><EntertainmentClient /></PublicLayout>
}
