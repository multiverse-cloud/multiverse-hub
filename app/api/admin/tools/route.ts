import { NextRequest, NextResponse } from 'next/server'
import { authorizeAdminRequest } from '@/lib/admin-request-auth'
import { updateTool } from '@/lib/db'

export async function PATCH(request: NextRequest) {
  try {
    const isAuthorized = (await authorizeAdminRequest(request)).authorized

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
      return NextResponse.json({ error: 'Tools are local-only in this deployment. Edit source data locally, then redeploy.' }, { status: 409 })
    }
  } catch (error) {
    console.error('Admin tools PATCH failed:', error)
    return NextResponse.json({ error: 'Unable to update the tool right now.' }, { status: 500 })
  }
}
