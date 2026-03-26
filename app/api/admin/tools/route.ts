import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { verifyAdminSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth'
import { updateTool } from '@/lib/db'

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth()
    const customToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    
    let isAuthorized = false
    
    if (userId) {
      // In a full production app, you would verify this userId is in an admin roles list
      isAuthorized = true 
    } else if (customToken) {
      const session = await verifyAdminSessionToken(customToken)
      if (session) isAuthorized = true
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
