import { NextRequest, NextResponse } from 'next/server'
import { searchSiteContent } from '@/lib/site-search-server'

const SEARCH_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''
  const limitValue = Number(request.nextUrl.searchParams.get('limit') ?? '12')
  const limit = Number.isFinite(limitValue) ? Math.min(Math.max(limitValue, 1), 18) : 12

  if (query.length < 2) {
    return NextResponse.json({ results: [] }, { headers: SEARCH_CACHE_HEADERS })
  }

  const results = await searchSiteContent(query, limit)
  return NextResponse.json({ results }, { headers: SEARCH_CACHE_HEADERS })
}
