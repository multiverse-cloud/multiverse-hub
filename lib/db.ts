import 'server-only'
import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { TOOLS, Tool } from './tools-data'

const FIRESTORE_READ_BACKOFF_MS = 10 * 60 * 1000
let toolsReadBackoffUntil = 0

function getFirebaseConfig() {
  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  }
}

export function isFirebaseAdminConfigured() {
  const { projectId, clientEmail, privateKey } = getFirebaseConfig()
  return Boolean(projectId && clientEmail && privateKey)
}

export function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0]
  }

  const { projectId, clientEmail, privateKey, storageBucket } = getFirebaseConfig()

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin SDK is not configured.')
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket,
  })
}

export function getDb() {
  const app = getFirebaseAdminApp()
  return getFirestore(app)
}

function isQuotaExceededError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return false
  }

  const candidate = error as { code?: unknown; details?: unknown; message?: unknown }
  const details = String(candidate.details || candidate.message || '')

  return candidate.code === 8 || /RESOURCE_EXHAUSTED|quota exceeded/i.test(details)
}

function isToolsReadBackoffActive() {
  return toolsReadBackoffUntil > Date.now()
}

function activateToolsReadBackoff(error: unknown) {
  if (!isQuotaExceededError(error)) {
    return false
  }

  toolsReadBackoffUntil = Date.now() + FIRESTORE_READ_BACKOFF_MS
  return true
}

import { unstable_cache, revalidateTag } from 'next/cache'

// ==========================================
// DATA ACCESS METHODS (CACHED)
// ==========================================

/**
 * Normalizes Firestore documents by converting Timestamps to ISO strings
 * to ensure they are "plain objects" compatible with Client Components.
 */
function serializeDoc<T>(doc: any): T {
  const data = doc.data()
  const result: any = { ...data }

  // Recursively convert Timestamps to ISO strings
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (value && typeof value === 'object' && '_seconds' in value && '_nanoseconds' in value) {
      // It's a Firestore Timestamp-like object
      try {
        // Handle both actual Timestamp class and plain object representation
        const date = value.toDate ? value.toDate() : new Date(value._seconds * 1000)
        result[key] = date.toISOString()
      } catch (e) {
        result[key] = null
      }
    }
  })

  return result as T
}

export const getTools = unstable_cache(
  async (): Promise<Tool[]> => {
    if (!isFirebaseAdminConfigured() || isToolsReadBackoffActive()) {
      return TOOLS
    }

    try {
      const snapshot = await getDb().collection('tools').get()
      if (snapshot.empty) return TOOLS
      
      return snapshot.docs.map(doc => serializeDoc<Tool>(doc))
    } catch (error) {
      if (activateToolsReadBackoff(error)) {
        console.warn('Firestore tools quota reached, using local tool data temporarily:', error)
      } else {
        console.error('Failed to fetching tools from Firestore, falling back to local data:', error)
      }
      return TOOLS
    }
  },
  ['all-tools-cache'],
  { revalidate: 3600, tags: ['tools'] }
)

export const getToolBySlug = unstable_cache(
  async (slug: string): Promise<Tool | null> => {
    const tools = await getTools()
    return tools.find(tool => tool.slug === slug) || null
  },
  ['tool-by-slug-cache'],
  { revalidate: 3600, tags: ['tools'] }
)

export const getToolsByCategory = unstable_cache(
  async (categorySlug: string): Promise<Tool[]> => {
    const tools = await getTools()
    return tools.filter(tool => tool.categorySlug === categorySlug)
  },
  ['tools-by-category-cache'],
  { revalidate: 3600, tags: ['tools'] }
)

export async function updateTool(id: string, updates: Partial<Tool>) {
  try {
    await getDb().collection('tools').doc(id).update({
      ...updates,
      updatedAt: FieldValue.serverTimestamp()
    })
    revalidateTag('tools')
    return true
  } catch (error) {
    console.error(`Failed to update tool ${id}:`, error)
    return false
  }
}

// ==========================================
// MIGRATION SCRIPT
// ==========================================

export async function seedFirestoreWithLocalTools() {
  const db = getDb()
  const toolsCollection = db.collection('tools')
  const batchSize = 400
  let totalMigrated = 0

  try {
    // Split TOOLS into batches of 400 (Firestore batch limit is 500)
    for (let i = 0; i < TOOLS.length; i += batchSize) {
      const batchTools = TOOLS.slice(i, i + batchSize)
      const batch = db.batch()

      for (const tool of batchTools) {
        const docRef = toolsCollection.doc(tool.id)
        batch.set(docRef, {
          ...tool,
          enabled: true, // Set default admin state
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        }, { merge: true }) // merge to prevent wiping if already there
      }

      await batch.commit()
      totalMigrated += batchTools.length
      console.log(`Migrated ${totalMigrated}/${TOOLS.length} tools to Firestore...`)
    }
    
    return { success: true, count: totalMigrated }
  } catch (error) {
    console.error('Failed to seed tools:', error)
    throw error
  }
}
