import 'server-only'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export type FirebaseUserProfile = {
  clerkId: string
  email: string | null
  username: string | null
  firstName: string | null
  lastName: string | null
  fullName: string | null
  imageUrl: string | null
  providers: string[]
  createdAt: string
}

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

function getFirebaseAdminApp() {
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

export async function upsertFirebaseUser(profile: FirebaseUserProfile) {
  if (!isFirebaseAdminConfigured()) {
    return {
      synced: false,
      storage: 'disabled',
    } as const
  }

  try {
    const firestore = getFirestore(getFirebaseAdminApp())
    const documentRef = firestore.collection('users').doc(profile.clerkId)
    const snapshot = await documentRef.get()
    const now = new Date().toISOString()

    await documentRef.set(
      {
        clerkId: profile.clerkId,
        email: profile.email,
        username: profile.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        fullName: profile.fullName,
        imageUrl: profile.imageUrl,
        providers: profile.providers,
        updatedAt: now,
        lastSeenAt: now,
        createdAt: snapshot.exists ? snapshot.get('createdAt') || profile.createdAt : profile.createdAt,
      },
      { merge: true }
    )

    return {
      synced: true,
      storage: 'firebase-firestore',
    } as const
  } catch (error) {
    console.error('Firebase user sync failed.', error)

    return {
      synced: false,
      storage: 'firebase-firestore-unavailable',
    } as const
  }
}
