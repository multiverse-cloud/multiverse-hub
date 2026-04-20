import 'server-only'

import { revalidateTag } from 'next/cache'
import { type DiscoverFaq, type DiscoverItem, type DiscoverList, type DiscoverStep } from '@/lib/discover-data'
import {
  getMergedLocalDiscoverLists,
  saveLocalDiscoverList,
  saveLocalDiscoverLists,
  seedLocalDiscoverStoreFromDataFiles,
} from '@/lib/discover-local-store'

const DISCOVER_TAG = 'discover'
const DISCOVER_MEMORY_CACHE_MS = 60 * 1000

let allDiscoverListsCache:
  | {
      lists: DiscoverList[]
      expiresAt: number
    }
  | null = null

function asString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : []
}

function asItems(value: unknown): DiscoverItem[] {
  return Array.isArray(value) ? (value as DiscoverItem[]) : []
}

function asSteps(value: unknown): DiscoverStep[] {
  return Array.isArray(value) ? (value as DiscoverStep[]) : []
}

function asFaq(value: unknown): DiscoverFaq[] {
  return Array.isArray(value) ? (value as DiscoverFaq[]) : []
}

function sortDiscoverLists(lists: DiscoverList[]) {
  return [...lists].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return right.updatedAt.localeCompare(left.updatedAt)
  })
}

function normalizeDiscoverList(list: DiscoverList): DiscoverList {
  return {
    ...list,
    id: asString(list.id),
    slug: asString(list.slug),
    title: asString(list.title),
    seoTitle: asString(list.seoTitle),
    metaDescription: asString(list.metaDescription),
    description: asString(list.description),
    intro: asString(list.intro),
    category: asString(list.category),
    subcategory: asString(list.subcategory),
    angle: asString(list.angle),
    audience: asString(list.audience),
    scope: asString(list.scope),
    icon: asString(list.icon),
    itemCount: list.type === 'guide' ? list.steps.length : list.items.length,
    updatedAt: asString(list.updatedAt) || new Date().toISOString().slice(0, 10),
    featured: Boolean(list.featured),
    published: Boolean(list.published),
    tags: asStringArray(list.tags),
    methodology: asStringArray(list.methodology),
    items: asItems(list.items),
    steps: asSteps(list.steps),
    faq: asFaq(list.faq),
    relatedSlugs: asStringArray(list.relatedSlugs),
  }
}

function resetDiscoverMemoryCache() {
  allDiscoverListsCache = null
}

async function getAllDiscoverLists() {
  if (allDiscoverListsCache && allDiscoverListsCache.expiresAt > Date.now()) {
    return allDiscoverListsCache.lists
  }

  try {
    const lists = sortDiscoverLists((await getMergedLocalDiscoverLists()).map(normalizeDiscoverList))

    allDiscoverListsCache = {
      lists,
      expiresAt: Date.now() + DISCOVER_MEMORY_CACHE_MS,
    }

    return lists
  } catch (error) {
    console.error('Failed to fetch local discover data:', error)
    return []
  }
}

function assertWritableLocalDiscoverStore() {
  if (process.env.VERCEL) {
    throw new Error(
      'Discover is currently in local-only mode. This deployment is read-only, so import/save works only in local development until a database is added.'
    )
  }
}

export async function getPublishedDiscoverLists(): Promise<DiscoverList[]> {
  const lists = await getAllDiscoverLists()
  return lists.filter(list => list.published)
}

export async function getDiscoverListBySlug(slug: string): Promise<DiscoverList | null> {
  const allLists = await getAllDiscoverLists()
  return allLists.find(list => list.slug === slug && list.published) || null
}

export async function getAdminDiscoverLists(): Promise<DiscoverList[]> {
  return getAllDiscoverLists()
}

export async function saveDiscoverList(input: DiscoverList) {
  assertWritableLocalDiscoverStore()

  const list = normalizeDiscoverList(input)
  await saveLocalDiscoverList(list)
  resetDiscoverMemoryCache()
  revalidateTag(DISCOVER_TAG)
  return true
}

export async function saveDiscoverLists(inputs: DiscoverList[]) {
  assertWritableLocalDiscoverStore()

  const lists = inputs.map(normalizeDiscoverList)
  await saveLocalDiscoverLists(lists)
  resetDiscoverMemoryCache()
  revalidateTag(DISCOVER_TAG)
  return { success: true, count: inputs.length }
}

export async function seedLocalDiscoverLists() {
  assertWritableLocalDiscoverStore()

  const result = await seedLocalDiscoverStoreFromDataFiles()
  resetDiscoverMemoryCache()
  revalidateTag(DISCOVER_TAG)
  return result
}
