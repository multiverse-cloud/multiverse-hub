import type { DiscoverList } from '@/lib/discover-data'

export const DISCOVER_PUBLIC_PAGE_SIZE = 18
export const DISCOVER_ADMIN_PAGE_SIZE = 30

export function getDiscoverIntentLabel(title: string) {
  const normalized = title.toLowerCase()

  if (normalized.startsWith('how to fix')) return 'How to Fix'
  if (normalized.startsWith('how to start')) return 'How to Start'
  if (normalized.startsWith('what is')) return 'What Is'
  if (normalized.includes(' vs ') || normalized.includes('which is better')) return 'Comparison'
  if (normalized.startsWith('tips for')) return 'Tips'
  if (normalized.startsWith('free ')) return 'Free'
  if (normalized.startsWith('top ') || normalized.startsWith('best ')) return 'Ranking'
  if (normalized.startsWith('how to ')) return 'How to'
  return 'Discover'
}

export function normalizeDiscoverSearchParam(value?: string | string[]) {
  const resolved = Array.isArray(value) ? value[0] : value
  return resolved?.trim() || undefined
}

export function getDiscoverCategories(lists: DiscoverList[]) {
  return ['All', ...Array.from(new Set(lists.map(list => list.category)))]
}

export function getDiscoverIntents(lists: DiscoverList[]) {
  return ['All', ...Array.from(new Set(lists.map(list => getDiscoverIntentLabel(list.title))))]
}

export function resolveDiscoverFacet(value: string | undefined, options: string[]) {
  return value && options.includes(value) ? value : 'All'
}

export function filterDiscoverLists(
  lists: DiscoverList[],
  filters: {
    category?: string
    intent?: string
  }
) {
  return lists.filter(list => {
    const categoryMatches = !filters.category || filters.category === 'All' || list.category === filters.category
    const intentMatches =
      !filters.intent || filters.intent === 'All' || getDiscoverIntentLabel(list.title) === filters.intent

    return categoryMatches && intentMatches
  })
}

export function parseDiscoverPage(value?: string | string[]) {
  const resolved = normalizeDiscoverSearchParam(value)
  const parsed = Number(resolved)

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1
  }

  return Math.floor(parsed)
}

export function paginateDiscoverItems<T>(items: T[], page: number, pageSize: number) {
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
