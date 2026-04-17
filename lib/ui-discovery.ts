import {
  getEffectSlug,
  uiEffects,
  type UiCatalogItem,
} from '@/lib/css-effects-library'
import type { UiEngagementSnapshot } from '@/lib/ui-engagement'

export type UiCategoryCluster = {
  id: string
  label: string
  description: string
  href: string
  count: number
  tags: string[]
}

export type UiDiscoveryBucket = {
  trending: UiCatalogItem[]
  mostCopied: UiCatalogItem[]
  newThisWeek: UiCatalogItem[]
  featured: UiCatalogItem[]
  popularEffects: UiCatalogItem[]
}

const CLUSTERS = [
  {
    id: 'buttons',
    label: 'Buttons',
    description: 'Primary actions, CTA styles, and source-backed button systems.',
    tags: ['button', 'source-button', 'interactive'],
  },
  {
    id: 'cards',
    label: 'Cards',
    description: 'Content surfaces, panels, product cards, and compact UI blocks.',
    tags: ['card', 'source-card', 'surface', 'content'],
  },
  {
    id: 'loaders',
    label: 'Loaders',
    description: 'Skeletons, loading states, and progress-driven UI motion.',
    tags: ['loading', 'skeleton', 'progress'],
  },
  {
    id: 'hover-effects',
    label: 'Hover Effects',
    description: 'Interaction polish for links, surfaces, controls, and active states.',
    tags: ['hover', 'interactive', 'tooltip'],
  },
  {
    id: 'backgrounds',
    label: 'Backgrounds',
    description: 'Background treatments, visual foundations, and soft atmospheric layers.',
    tags: ['background', 'shadow', 'shape'],
  },
  {
    id: 'forms',
    label: 'Forms',
    description: 'Inputs, selects, switches, textareas, and clean form primitives.',
    tags: ['form', 'input', 'select', 'switch', 'textarea', 'checkbox', 'radio'],
  },
] as const

const FEATURED_IDS = [
  'source-button',
  'source-card',
  'source-dialog',
  'source-tabs',
  'source-skeleton',
  'source-input',
] as const

const POPULAR_EFFECT_IDS = [
  'button-1',
  'button-2',
  'loading-1',
  'hover-1',
  'background-1',
  'shadow-1',
  'shape-1',
] as const

function getMetric(snapshot: UiEngagementSnapshot, effectId: string) {
  return snapshot[effectId] || { views: 0, copies: 0 }
}

function sortByUsage(items: UiCatalogItem[], snapshot: UiEngagementSnapshot, weight: 'views' | 'copies' | 'mixed') {
  return [...items].sort((left, right) => {
    const leftMetrics = getMetric(snapshot, left.id)
    const rightMetrics = getMetric(snapshot, right.id)

    const leftScore =
      weight === 'views'
        ? leftMetrics.views
        : weight === 'copies'
          ? leftMetrics.copies
          : leftMetrics.views * 2 + leftMetrics.copies * 4
    const rightScore =
      weight === 'views'
        ? rightMetrics.views
        : weight === 'copies'
          ? rightMetrics.copies
          : rightMetrics.views * 2 + rightMetrics.copies * 4

    return rightScore - leftScore || left.title.localeCompare(right.title)
  })
}

function sortByNewest(items: UiCatalogItem[]) {
  return [...items].sort((left, right) => {
    const leftDate = left.publishedAt ? new Date(left.publishedAt).getTime() : 0
    const rightDate = right.publishedAt ? new Date(right.publishedAt).getTime() : 0
    return rightDate - leftDate || left.title.localeCompare(right.title)
  })
}

function getItemsByIds(ids: readonly string[]) {
  return ids
    .map(id => uiEffects.find(item => item.id === id))
    .filter((item): item is UiCatalogItem => Boolean(item))
}

export function getUiCategoryClusters(): UiCategoryCluster[] {
  return CLUSTERS.map(cluster => {
    const count = uiEffects.filter(effect =>
      cluster.tags.some(tag => effect.category === tag || effect.tags.includes(tag))
    ).length

    return {
      id: cluster.id,
      label: cluster.label,
      description: cluster.description,
      href: `/ui?category=${cluster.tags[0]}`,
      count,
      tags: [...cluster.tags],
    }
  })
}

export function getUiDiscoveryBuckets(snapshot: UiEngagementSnapshot = {}): UiDiscoveryBucket {
  const withEngagement = uiEffects.filter(item => {
    const metrics = getMetric(snapshot, item.id)
    return metrics.views > 0 || metrics.copies > 0
  })

  const trending = sortByUsage(withEngagement, snapshot, 'mixed').slice(0, 8)
  const mostCopied = sortByUsage(withEngagement, snapshot, 'copies')
    .filter(item => getMetric(snapshot, item.id).copies > 0)
    .slice(0, 8)

  const newThisWeek = sortByNewest(
    uiEffects.filter(item => {
      if (!item.publishedAt) return false
      const publishedAt = new Date(item.publishedAt).getTime()
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      return publishedAt >= sevenDaysAgo
    })
  ).slice(0, 8)

  const featured = getItemsByIds(FEATURED_IDS)
  const popularEffectsFallback = getItemsByIds(POPULAR_EFFECT_IDS)
  const popularEffects = sortByUsage(
    uiEffects.filter(item => ['hover', 'background', 'loading', 'shadow', 'shape'].includes(item.category)),
    snapshot,
    'views'
  )
    .filter(item => getMetric(snapshot, item.id).views > 0)
    .slice(0, 8)

  return {
    trending,
    mostCopied,
    newThisWeek,
    featured,
    popularEffects: popularEffects.length > 0 ? popularEffects : popularEffectsFallback,
  }
}

export function getUiBlogPosts(snapshot: UiEngagementSnapshot = {}) {
  const buckets = getUiDiscoveryBuckets(snapshot)

  return [
    {
      slug: 'top-css-effects',
      title: 'Top CSS effects for modern websites',
      excerpt: 'A curated set of visual effects that add polish without making interfaces feel noisy or heavy.',
      relatedSlugs: buckets.popularEffects.slice(0, 4).map(item => getEffectSlug(item)),
    },
    {
      slug: 'best-ui-animations',
      title: 'Best UI animations that still feel premium',
      excerpt: 'Subtle motion ideas and reusable interaction patterns for product-grade interfaces.',
      relatedSlugs: (buckets.trending.length > 0 ? buckets.trending : buckets.featured).slice(0, 4).map(item => getEffectSlug(item)),
    },
  ]
}
