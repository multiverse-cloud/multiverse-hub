import { NextRequest, NextResponse } from 'next/server'
import type { ToolSearchResult } from '@/lib/tool-search'
import { searchTools } from '@/lib/tools-data'

const SEARCH_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
}

export function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''
  const limitValue = Number(request.nextUrl.searchParams.get('limit') ?? '6')
  const limit = Number.isFinite(limitValue) ? Math.min(Math.max(limitValue, 1), 12) : 6

  if (query.length < 2) {
    return NextResponse.json({ results: [] satisfies ToolSearchResult[] }, { headers: SEARCH_CACHE_HEADERS })
  }

  const results: ToolSearchResult[] = searchTools(query)
    .slice(0, limit)
    .map(tool => ({
      id: tool.id,
      name: tool.name,
      category: tool.category,
      categorySlug: tool.categorySlug,
      slug: tool.slug,
    }))

  return NextResponse.json({ results }, { headers: SEARCH_CACHE_HEADERS })
}
