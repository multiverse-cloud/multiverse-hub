import { NextRequest, NextResponse } from 'next/server'
import { guardAdminWriteRequest } from '@/lib/admin-api-guard'
import { updateTool } from '@/lib/db'

type AdminToolsRequestBody = {
  id?: string
  updates?: Record<string, unknown>
}

export async function PATCH(request: NextRequest) {
  try {
    const blocked = await guardAdminWriteRequest(request, {
      key: 'tools',
      maxBytes: 512 * 1024,
    })

    if (blocked) return blocked

    const body = (await request.json()) as AdminToolsRequestBody
    const { id, updates } = body

    if (!id || !updates) {
      return NextResponse.json({ error: 'Missing tool id or updates payload' }, { status: 400 })
    }

    const success = await updateTool(id, updates)
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Tool settings saved.',
      })
    }

    return NextResponse.json({ error: 'Unable to update this tool.' }, { status: 409 })
  } catch (error) {
    console.error('Admin tools PATCH failed:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update the tool right now.' }, { status: 500 })
  }
}
