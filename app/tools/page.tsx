import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'
import ToolsListing from '@/components/tools/ToolsListing'
import { TOOLS } from '@/lib/tools-data'

export const metadata: Metadata = {
  title: `${TOOLS.length} Curated Free Online Tools - PDF, Image, Video, Audio and More`,
  description: `Browse ${TOOLS.length} curated free tools for PDF, image, video, audio, text, developer, SEO, calculator, and file tasks. No login required.`,
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
