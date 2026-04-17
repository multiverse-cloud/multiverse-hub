import type { FixClusterId, FixGuide } from '@/lib/fixes-data'

export const FIXES_PUBLIC_PAGE_SIZE = 15

export function normalizeFixSearchParam(value?: string | string[]) {
  const resolved = Array.isArray(value) ? value[0] : value
  return resolved?.trim().toLowerCase() || undefined
}

export function resolveFixCluster(value: string | undefined): 'all' | FixClusterId {
  if (
    value === 'mobile' ||
    value === 'pc' ||
    value === 'apps' ||
    value === 'games' ||
    value === 'internet' ||
    value === 'device'
  ) {
    return value
  }

  return 'all'
}

export function filterFixGuides(
  guides: FixGuide[],
  filters: {
    cluster?: 'all' | FixClusterId
  }
) {
  if (!filters.cluster || filters.cluster === 'all') {
    return guides
  }

  return guides.filter(guide => guide.cluster === filters.cluster)
}

export function parseFixPage(value?: string | string[]) {
  const resolved = normalizeFixSearchParam(value)
  const parsed = Number(resolved)

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1
  }

  return Math.floor(parsed)
}

export function paginateFixGuides<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * pageSize

  return {
    page: safePage,
    pageSize,
    totalPages,
    startIndex,
    endIndex: Math.min(startIndex + pageSize, items.length),
    items: items.slice(startIndex, startIndex + pageSize),
  }
}
