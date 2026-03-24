import PublicLayout from '@/components/layout/PublicLayout'
import NewsClient from '@/components/news/NewsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News – AI, Tech & World News',
  description: 'Stay updated with the latest AI, technology, and world news. Live feeds from top sources.',
}

export default function NewsPage() {
  return <PublicLayout><NewsClient /></PublicLayout>
}
