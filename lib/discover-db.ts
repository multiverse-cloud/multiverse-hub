import 'server-only'

import { unstable_cache, revalidateTag } from 'next/cache'
import { FieldValue } from 'firebase-admin/firestore'
import {
  DISCOVER_LISTS,
  DiscoverList,
  getDiscoverListBySlugLocal,
  getPublishedDiscoverLists as getPublishedDiscoverListsLocal,
} from '@/lib/discover-data'
import { getDb, isFirebaseAdminConfigured } from '@/lib/db'

const DISCOVER_TAG = 'discover'
const DISCOVER_COLLECTION = 'discoverLists'

function sortDiscoverLists(lists: DiscoverList[]) {
  return [...lists].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return right.updatedAt.localeCompare(left.updatedAt)
  })
}

function serializeDiscoverDoc<T>(doc: any): T {
  const data = doc.data()
  const result: Record<string, unknown> = { ...data }

  Object.keys(result).forEach(key => {
    const value = result[key] as any

    if (value && typeof value === 'object' && '_seconds' in value && '_nanoseconds' in value) {
      try {
        const date = value.toDate ? value.toDate() : new Date(value._seconds * 1000)
        result[key] = date.toISOString().slice(0, 10)
      } catch {
        result[key] = null
      }
    }
  })

  return result as T
}

function normalizeDiscoverList(list: DiscoverList): DiscoverList {
  return {
    ...list,
    itemCount: list.type === 'guide' ? list.steps.length : list.items.length,
    subcategory: list.subcategory || '',
    angle: list.angle || '',
    audience: list.audience || '',
    scope: list.scope || '',
    featured: Boolean(list.featured),
    tags: list.tags || [],
    methodology: list.methodology || [],
    items: list.items || [],
    steps: list.steps || [],
    faq: list.faq || [],
    relatedSlugs: list.relatedSlugs || [],
  }
}

export const getPublishedDiscoverLists = unstable_cache(
  async (): Promise<DiscoverList[]> => {
    if (!isFirebaseAdminConfigured()) {
      return sortDiscoverLists(getPublishedDiscoverListsLocal().map(normalizeDiscoverList))
    }

    try {
      const snapshot = await getDb()
        .collection(DISCOVER_COLLECTION)
        .where('published', '==', true)
        .get()

      if (snapshot.empty) {
        return sortDiscoverLists(getPublishedDiscoverListsLocal().map(normalizeDiscoverList))
      }

      return sortDiscoverLists(snapshot.docs.map(doc => normalizeDiscoverList(serializeDiscoverDoc<DiscoverList>(doc))))
    } catch (error) {
      console.error('Failed to fetch discover lists from Firestore, falling back to local data:', error)
      return sortDiscoverLists(getPublishedDiscoverListsLocal().map(normalizeDiscoverList))
    }
  },
  ['discover-published-cache'],
  { revalidate: 3600, tags: [DISCOVER_TAG] }
)

export const getDiscoverListBySlug = unstable_cache(
  async (slug: string): Promise<DiscoverList | null> => {
    if (!isFirebaseAdminConfigured()) {
      const local = getDiscoverListBySlugLocal(slug)
      return local ? normalizeDiscoverList(local) : null
    }

    try {
      const snapshot = await getDb()
        .collection(DISCOVER_COLLECTION)
        .where('slug', '==', slug)
        .limit(1)
        .get()

      if (snapshot.empty) {
        const local = getDiscoverListBySlugLocal(slug)
        return local ? normalizeDiscoverList(local) : null
      }

      return normalizeDiscoverList(serializeDiscoverDoc<DiscoverList>(snapshot.docs[0]))
    } catch (error) {
      console.error(`Failed to fetch discover list ${slug} from Firestore, falling back to local data:`, error)
      const local = getDiscoverListBySlugLocal(slug)
      return local ? normalizeDiscoverList(local) : null
    }
  },
  ['discover-by-slug-cache'],
  { revalidate: 3600, tags: [DISCOVER_TAG] }
)

export async function getAdminDiscoverLists(): Promise<DiscoverList[]> {
  if (!isFirebaseAdminConfigured()) {
    return sortDiscoverLists(DISCOVER_LISTS.map(normalizeDiscoverList))
  }

  try {
    const snapshot = await getDb().collection(DISCOVER_COLLECTION).get()

    if (snapshot.empty) {
      return sortDiscoverLists(DISCOVER_LISTS.map(normalizeDiscoverList))
    }

    return sortDiscoverLists(snapshot.docs.map(doc => normalizeDiscoverList(serializeDiscoverDoc<DiscoverList>(doc))))
  } catch (error) {
    console.error('Failed to fetch admin discover lists from Firestore, falling back to local data:', error)
    return sortDiscoverLists(DISCOVER_LISTS.map(normalizeDiscoverList))
  }
}

export async function saveDiscoverList(input: DiscoverList) {
  if (!isFirebaseAdminConfigured()) {
    throw new Error('Firebase Admin is not configured for discover persistence.')
  }

  const list = normalizeDiscoverList(input)
  const docId = list.id || list.slug

  await getDb()
    .collection(DISCOVER_COLLECTION)
    .doc(docId)
    .set(
      {
        ...list,
        id: docId,
        itemCount: list.type === 'guide' ? list.steps.length : list.items.length,
        updatedAt: list.updatedAt || new Date().toISOString().slice(0, 10),
        updatedAtServer: FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

  revalidateTag(DISCOVER_TAG)
  return true
}

export async function saveDiscoverLists(inputs: DiscoverList[]) {
  if (!isFirebaseAdminConfigured()) {
    throw new Error('Firebase Admin is not configured for discover persistence.')
  }

  const db = getDb()
  const batchSize = 350

  for (let index = 0; index < inputs.length; index += batchSize) {
    const batch = db.batch()
    const chunk = inputs.slice(index, index + batchSize)

    for (const input of chunk) {
      const list = normalizeDiscoverList(input)
      const docId = list.id || list.slug

      batch.set(
        db.collection(DISCOVER_COLLECTION).doc(docId),
        {
          ...list,
          id: docId,
          itemCount: list.type === 'guide' ? list.steps.length : list.items.length,
          updatedAt: list.updatedAt || new Date().toISOString().slice(0, 10),
          updatedAtServer: FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
    }

    await batch.commit()
  }

  revalidateTag(DISCOVER_TAG)
  return { success: true, count: inputs.length }
}

export async function seedFirestoreWithLocalDiscoverLists() {
  if (!isFirebaseAdminConfigured()) {
    throw new Error('Firebase Admin is not configured for discover seeding.')
  }

  const db = getDb()
  const batch = db.batch()

  for (const list of DISCOVER_LISTS) {
    const normalized = normalizeDiscoverList(list)
    const docRef = db.collection(DISCOVER_COLLECTION).doc(normalized.id)
    batch.set(
      docRef,
      {
        ...normalized,
        updatedAtServer: FieldValue.serverTimestamp(),
      },
      { merge: true }
    )
  }

  await batch.commit()
  revalidateTag(DISCOVER_TAG)
  return { success: true, count: DISCOVER_LISTS.length }
}
