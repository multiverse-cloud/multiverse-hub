import 'server-only'

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

export function isFirebaseAdminConfigured() {
  return false
}

export async function upsertFirebaseUser(_profile: FirebaseUserProfile) {
  return {
    synced: false,
    storage: 'disabled',
  } as const
}
