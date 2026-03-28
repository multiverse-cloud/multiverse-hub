import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { verifyAdminSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth'
import { isAdminUser } from '@/lib/admin-access'
import { updateTool } from '@/lib/db'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export async function PATCH(request: NextRequest) {
  try {
    const customToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    
    let isAuthorized = false

    if (customToken) {
      const session = await verifyAdminSessionToken(customToken)
      if (session) isAuthorized = true
    } else if (clerkEnabled) {
      try {
        const { userId } = await auth()

        if (userId) {
          const user = await currentUser()
          isAuthorized = isAdminUser(user)
        }
      } catch (error) {
        console.error('Admin tools auth fallback triggered:', error)
      }
    }

    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, updates } = body

    if (!id || !updates) {
      return NextResponse.json({ error: 'Missing tool id or updates payload' }, { status: 400 })
    }

    const success = await updateTool(id, updates)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to update tool in Firestore' }, { status: 500 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
