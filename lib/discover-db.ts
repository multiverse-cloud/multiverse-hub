import 'server-only'

import { FieldValue } from 'firebase-admin/firestore'
import { revalidateTag } from 'next/cache'
import { type DiscoverFaq, type DiscoverItem, type DiscoverList, type DiscoverStep } from '@/lib/discover-data'
import { getDb, isFirebaseAdminConfigured } from '@/lib/db'
import {
  getMergedLocalDiscoverLists,
  saveLocalDiscoverList,
  saveLocalDiscoverLists,
} from '@/lib/discover-local-store'

const DISCOVER_TAG = 'discover'
const DISCOVER_COLLECTION = 'discoverLists'
const DISCOVER_MEMORY_CACHE_MS = 60 * 1000
const DISCOVER_READ_BACKOFF_MS = 5 * 60 * 1000
const DISCOVER_SYNC_SOURCE = 'local-store-v1'

let discoverReadBackoffUntil = 0
let allDiscoverListsCache:
  | {
      lists: DiscoverList[]
      expiresAt: number
    }
  | null = null

function normalizeTopic(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function getListMatchKey(list: DiscoverList) {
  return list.slug || normalizeTopic(list.title)
}

function sortDiscoverLists(lists: DiscoverList[]) {
  return [...lists].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return right.updatedAt.localeCompare(left.updatedAt)
  })
}

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

function mergeDiscoverLists(baseLists: DiscoverList[], overrideLists: DiscoverList[]) {
  const byKey = new Map<string, DiscoverList>()

  for (const list of baseLists) {
    byKey.set(getListMatchKey(list), list)
  }

  for (const list of overrideLists) {
    byKey.set(getListMatchKey(list), list)
  }

  return sortDiscoverLists(Array.from(byKey.values()))
}

function resetDiscoverMemoryCache() {
  allDiscoverListsCache = null
}

function isQuotaExceededError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return false
  }

  const candidate = error as { code?: unknown; details?: unknown; message?: unknown }
  const details = String(candidate.details || candidate.message || '')

  return candidate.code === 8 || /RESOURCE_EXHAUSTED|quota exceeded/i.test(details)
}

function isDiscoverReadBackoffActive() {
  return discoverReadBackoffUntil > Date.now()
}

function activateDiscoverReadBackoff(error: unknown) {
  if (!isQuotaExceededError(error)) {
    return false
  }

  discoverReadBackoffUntil = Date.now() + DISCOVER_READ_BACKOFF_MS
  return true
}

function serializeDiscoverDoc(doc: FirebaseFirestore.QueryDocumentSnapshot): DiscoverList {
  const raw = doc.data() as Partial<DiscoverList> & {
    updatedAtServer?: unknown
  }

  const { updatedAtServer, ...data } = raw
  const type = data.type === 'guide' ? 'guide' : 'ranking'

  return normalizeDiscoverList({
    ...(data as DiscoverList),
    id: asString(data.id) || doc.id,
    slug: asString(data.slug) || doc.id,
    type,
    title: asString(data.title) || 'Untitled Discover Page',
    seoTitle: asString(data.seoTitle) || asString(data.title) || 'Untitled Discover Page',
    metaDescription: asString(data.metaDescription) || asString(data.description),
    description: asString(data.description),
    intro: asString(data.intro) || asString(data.description),
    category: asString(data.category) || (type === 'guide' ? 'Watch Guides' : 'Movies'),
    subcategory: asString(data.subcategory),
    angle: asString(data.angle),
    audience: asString(data.audience),
    scope: asString(data.scope),
    icon: asString(data.icon) || (type === 'guide' ? 'ListChecks' : 'Sparkles'),
    itemCount:
      typeof data.itemCount === 'number'
        ? data.itemCount
        : type === 'guide'
          ? asSteps(data.steps).length
          : asItems(data.items).length,
    updatedAt: asString(data.updatedAt) || new Date().toISOString().slice(0, 10),
    featured: Boolean(data.featured),
    published: Boolean(data.published),
    tags: asStringArray(data.tags),
    methodology: asStringArray(data.methodology),
    items: asItems(data.items),
    steps: asSteps(data.steps),
    faq: asFaq(data.faq),
    relatedSlugs: asStringArray(data.relatedSlugs),
  })
}

async function getLocalDiscoverLists() {
  try {
    return sortDiscoverLists((await getMergedLocalDiscoverLists()).map(normalizeDiscoverList))
  } catch (error) {
    console.error('Failed to fetch local discover store:', error)
    return []
  }
}

async function getFirestoreDiscoverLists() {
  if (!isFirebaseAdminConfigured() || isDiscoverReadBackoffActive()) {
    return null
  }

  try {
    const snapshot = await getDb()
      .collection(DISCOVER_COLLECTION)
      .where('syncSource', '==', DISCOVER_SYNC_SOURCE)
      .get()
    return snapshot.docs.map(serializeDiscoverDoc)
  } catch (error) {
    if (activateDiscoverReadBackoff(error)) {
      console.warn('Firestore discover quota reached, using local discover data temporarily:', error)
    } else {
      console.error('Failed to fetch discover lists from Firestore, using local discover data:', error)
    }

    return null
  }
}

async function getAllDiscoverLists() {
  if (allDiscoverListsCache && allDiscoverListsCache.expiresAt > Date.now()) {
    return allDiscoverListsCache.lists
  }

  const localLists = await getLocalDiscoverLists()
  const firestoreLists = await getFirestoreDiscoverLists()
  const lists = firestoreLists ? mergeDiscoverLists(localLists, firestoreLists) : localLists

  allDiscoverListsCache = {
    lists,
    expiresAt: Date.now() + DISCOVER_MEMORY_CACHE_MS,
  }

  return lists
}

async function writeDiscoverListToFirestore(list: DiscoverList) {
  const normalizedList = normalizeDiscoverList(list)
  const docId = normalizedList.id || normalizedList.slug

  if (!docId) {
    throw new Error('Discover list is missing a stable id/slug.')
  }

  await getDb()
    .collection(DISCOVER_COLLECTION)
    .doc(docId)
    .set(
      {
        ...normalizedList,
        syncSource: DISCOVER_SYNC_SOURCE,
        updatedAtServer: FieldValue.serverTimestamp(),
      },
      { merge: true }
    )
}

async function writeDiscoverListsToFirestore(lists: DiscoverList[]) {
  const db = getDb()
  const chunks: DiscoverList[][] = []

  for (let index = 0; index < lists.length; index += 400) {
    chunks.push(lists.slice(index, index + 400))
  }

  for (const chunk of chunks) {
    const batch = db.batch()

    for (const list of chunk) {
      const normalizedList = normalizeDiscoverList(list)
      const docId = normalizedList.id || normalizedList.slug

      if (!docId) {
        throw new Error('One of the discover lists is missing a stable id/slug.')
      }

      batch.set(
        db.collection(DISCOVER_COLLECTION).doc(docId),
        {
          ...normalizedList,
          syncSource: DISCOVER_SYNC_SOURCE,
          updatedAtServer: FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
    }

    await batch.commit()
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
  const list = normalizeDiscoverList(input)

  if (isFirebaseAdminConfigured()) {
    await writeDiscoverListToFirestore(list)
  }

  if (!process.env.VERCEL) {
    await saveLocalDiscoverList(list)
  }
  resetDiscoverMemoryCache()
  revalidateTag(DISCOVER_TAG)
  return true
}

export async function saveDiscoverLists(inputs: DiscoverList[]) {
  const lists = inputs.map(normalizeDiscoverList)

  if (isFirebaseAdminConfigured()) {
    await writeDiscoverListsToFirestore(lists)
  }

  if (!process.env.VERCEL) {
    await saveLocalDiscoverLists(lists)
  }
  resetDiscoverMemoryCache()
  revalidateTag(DISCOVER_TAG)
  return { success: true, count: lists.length }
}

export async function seedFirestoreWithLocalDiscoverLists() {
  if (!isFirebaseAdminConfigured()) {
    throw new Error('Firebase Admin SDK is not configured for Discover sync.')
  }

  const localLists = await getLocalDiscoverLists()
  await writeDiscoverListsToFirestore(localLists)
  resetDiscoverMemoryCache()
  revalidateTag(DISCOVER_TAG)

  return {
    success: true,
    count: localLists.length,
    target: 'firestore',
  }
}
