import { NextResponse } from 'next/server'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export const runtime = 'nodejs'

export async function POST() {
  if (!clerkEnabled) {
    return NextResponse.json({ ok: true, synced: false, storage: 'disabled' })
  }

  return NextResponse.json({ ok: true, synced: false, storage: 'disabled' })
}
