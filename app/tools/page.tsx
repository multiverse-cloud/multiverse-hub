import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'
import ToolsListing from '@/components/tools/ToolsListing'
import { TOOLS } from '@/lib/tools-data'

export const metadata: Metadata = {
  title: `All ${TOOLS.length} Free Online Tools — PDF, Image, Video, Dev & More`,
  description: `Browse ${TOOLS.length} free tools: compress PDFs, resize images, download videos, format JSON, generate QR codes, and more. No login required. All tools are free and private.`,
  alternates: {
    canonical: 'https://multiverse-tools.vercel.app/tools',
  },
}

interface ToolsPageProps {
  searchParams?: Promise<{
    q?: string | string[]
    category?: string | string[]
    tag?: string | string[]
  }>
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const resolvedSearchParams = await searchParams
  const filters = {
    q: Array.isArray(resolvedSearchParams?.q) ? resolvedSearchParams.q[0] : resolvedSearchParams?.q,
    category: Array.isArray(resolvedSearchParams?.category) ? resolvedSearchParams.category[0] : resolvedSearchParams?.category,
    tag: Array.isArray(resolvedSearchParams?.tag) ? resolvedSearchParams.tag[0] : resolvedSearchParams?.tag,
  }

  return (
    <PublicLayout>
      <ToolsListing filters={filters} />
    </PublicLayout>
  )
}
