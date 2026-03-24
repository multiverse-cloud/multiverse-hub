import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { isFirebaseAdminConfigured, upsertFirebaseUser } from '@/lib/firebase-admin'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export async function POST() {
  if (!clerkEnabled) {
    return NextResponse.json({ ok: true, synced: false, storage: 'disabled' })
  }

  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 })
  }

  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ ok: true, synced: false, storage: 'disabled' })
  }

  const primaryEmail =
    user.emailAddresses.find(emailAddress => emailAddress.id === user.primaryEmailAddressId)?.emailAddress ||
    user.emailAddresses[0]?.emailAddress ||
    null
  const providers = user.externalAccounts?.map(account => account.provider) || []
  const createdAt = user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString()
  try {
    const result = await upsertFirebaseUser({
      clerkId: user.id,
      email: primaryEmail,
      username: user.username || null,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      fullName: [user.firstName, user.lastName].filter(Boolean).join(' ') || null,
      imageUrl: user.imageUrl || null,
      providers,
      createdAt,
    })

    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    console.error('Clerk user sync failed.', error)

    return NextResponse.json(
      {
        ok: true,
        synced: false,
        storage: 'unavailable',
      },
      { status: 200 }
    )
  }
}
