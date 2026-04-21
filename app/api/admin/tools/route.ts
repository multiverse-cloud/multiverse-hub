import { NextRequest, NextResponse } from 'next/server'
import { guardAdminWriteRequest } from '@/lib/admin-api-guard'
import { updateTool } from '@/lib/db'

export async function PATCH(request: NextRequest) {
  try {
    const blocked = await guardAdminWriteRequest(request, {
      key: 'tools',
      maxBytes: 512 * 1024,
    })

    if (blocked) return blocked

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
