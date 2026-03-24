import type { Tool } from '@/lib/tools-data'

export type ToolSearchResult = Pick<Tool, 'id' | 'name' | 'category' | 'categorySlug' | 'slug'>

export async function fetchToolSearch(
  query: string,
  limit = 6,
  signal?: AbortSignal
): Promise<ToolSearchResult[]> {
  const normalizedQuery = query.trim()
  if (normalizedQuery.length < 2) return []

  const params = new URLSearchParams({
    q: normalizedQuery,
    limit: String(limit),
  })

  const response = await fetch(`/api/tools/search?${params.toString()}`, { signal })

  if (!response.ok) return []

  const data = (await response.json()) as { results?: ToolSearchResult[] }
  return data.results ?? []
}
