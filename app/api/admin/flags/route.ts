import { NextRequest, NextResponse } from 'next/server'
import { authorizeAdminRequest } from '@/lib/admin-request-auth'
import { guardAdminWriteRequest } from '@/lib/admin-api-guard'
import { getSavedFeatureFlags, saveFeatureFlags, type AdminFeatureFlag } from '@/lib/feature-flags-store'

function jsonError(error: string, status: number, code: string) {
  return NextResponse.json(
    {
      success: false,
      error,
      code,
    },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}

export async function GET(request: NextRequest) {
  const auth = await authorizeAdminRequest(request)

  if (!auth.authorized) {
    return jsonError('Admin session expired. Sign in again to continue.', 401, 'unauthorized')
  }

  const flags = await getSavedFeatureFlags()
  return NextResponse.json(
    {
      success: true,
      flags,
      count: flags.length,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}

export async function POST(request: NextRequest) {
  try {
    const blocked = await guardAdminWriteRequest(request, {
      key: 'flags',
      maxBytes: 512 * 1024,
    })

    if (blocked) return blocked

    const body = (await request.json()) as { flags?: AdminFeatureFlag[] }
    if (!Array.isArray(body.flags)) {
      return jsonError('Missing feature flags payload.', 400, 'missing_flags_payload')
    }

    const flags = await saveFeatureFlags(body.flags)
    return NextResponse.json(
      {
        success: true,
        message: `Saved ${flags.length} feature flags.`,
        flags,
      },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  } catch (error) {
    console.error('Admin flags POST failed:', error)
    return jsonError(error instanceof Error ? error.message : 'Failed to save feature flags.', 500, 'feature_flags_save_failed')
  }
}
