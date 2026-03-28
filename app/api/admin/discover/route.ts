import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { verifyAdminSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth'
import { isAdminUser } from '@/lib/admin-access'
import {
  getAdminDiscoverLists,
  saveDiscoverLists,
  saveDiscoverList,
  seedFirestoreWithLocalDiscoverLists,
} from '@/lib/discover-db'
import { parseDiscoverImportPayload } from '@/lib/discover-import'
import type { DiscoverList } from '@/lib/discover-data'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

function jsonError(error: string, status: number, code?: string, details?: string) {
  return NextResponse.json(
    {
      success: false,
      error,
      code,
      details,
    },
    { status }
  )
}

function getSafeErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

async function isAuthorizedRequest(request: NextRequest) {
  const customToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value

  if (customToken) {
    const session = await verifyAdminSessionToken(customToken)
    if (session) {
      return true
    }
  }

  if (!clerkEnabled) {
    return false
  }

  try {
    const { userId } = await auth()

    if (!userId) {
      return false
    }

    const user = await currentUser()
    return isAdminUser(user)
  } catch (error) {
    console.error('Admin discover auth fallback triggered:', error)
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const isAuthorized = await isAuthorizedRequest(request)

    if (!isAuthorized) {
      return jsonError('Admin session expired. Sign in again to continue.', 401, 'unauthorized')
    }

    const lists = await getAdminDiscoverLists()
    return NextResponse.json({ success: true, lists, count: lists.length })
  } catch (error) {
    console.error('Admin discover GET failed:', error)
    return jsonError(getSafeErrorMessage(error, 'Failed to fetch discover data'), 500, 'discover_fetch_failed')
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthorized = await isAuthorizedRequest(request)

    if (!isAuthorized) {
      return jsonError('Admin session expired. Sign in again to continue.', 401, 'unauthorized')
    }

    const body = await request.json()

    if (body?.action === 'seed') {
      const result = await seedFirestoreWithLocalDiscoverLists()
      const lists = await getAdminDiscoverLists()
      return NextResponse.json({
        ...result,
        success: true,
        message: `Seeded ${result.count || 0} starter discover pages into Firestore.`,
        lists,
      })
    }

    if (body?.action === 'import-json') {
      let payload = body?.payload as unknown

      if (typeof body?.rawJson === 'string') {
        try {
          payload = JSON.parse(body.rawJson)
        } catch {
          return jsonError('Invalid JSON file or pasted JSON.', 400, 'invalid_json')
        }
      }

      const existingLists = await getAdminDiscoverLists()
      const parsed = parseDiscoverImportPayload(payload, existingLists, {
        publishImported: Boolean(body?.publishImported),
        replaceExisting: Boolean(body?.replaceExisting),
      })

      if (parsed.lists.length === 0) {
        const summary = {
          ...parsed.summary,
          imported: 0,
        }
        const alreadyExists =
          summary.skippedExisting > 0 || summary.skippedIncomingDuplicates > 0

        return NextResponse.json(
          {
            success: alreadyExists,
            error: alreadyExists ? undefined : 'No valid discover pages were found in the imported JSON.',
            code: alreadyExists ? undefined : 'no_valid_discover_entries',
            message: alreadyExists
              ? 'No new discover pages were added because the imported titles already exist or were duplicates inside the JSON payload.'
              : undefined,
            importedIds: [],
            lists: existingLists,
            summary,
          },
          { status: alreadyExists ? 200 : 400 }
        )
      }

      await saveDiscoverLists(parsed.lists)
      const refreshedLists = await getAdminDiscoverLists()

      return NextResponse.json({
        success: true,
        message: `Imported ${parsed.lists.length} discover pages successfully.`,
        importedIds: parsed.lists.map(list => list.id),
        lists: refreshedLists,
        summary: {
          ...parsed.summary,
          imported: parsed.lists.length,
        },
      })
    }

    const list = body?.list as DiscoverList | undefined

    if (!list) {
      return jsonError('Missing discover list payload', 400, 'missing_discover_payload')
    }

    await saveDiscoverList(list)
    const lists = await getAdminDiscoverLists()

    return NextResponse.json({
      success: true,
      message: `Saved "${list.title}" successfully.`,
      list,
      lists,
    })
  } catch (error) {
    console.error('Admin discover POST failed:', error)
    return jsonError(getSafeErrorMessage(error, 'Failed to save discover list'), 500, 'discover_save_failed')
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const isAuthorized = await isAuthorizedRequest(request)

    if (!isAuthorized) {
      return jsonError('Admin session expired. Sign in again to continue.', 401, 'unauthorized')
    }

    const body = await request.json()
    const list = body?.list as DiscoverList | undefined

    if (!list) {
      return jsonError('Missing discover list payload', 400, 'missing_discover_payload')
    }

    await saveDiscoverList(list)
    const lists = await getAdminDiscoverLists()

    return NextResponse.json({
      success: true,
      message: `Updated "${list.title}" successfully.`,
      list,
      lists,
    })
  } catch (error) {
    console.error('Admin discover PATCH failed:', error)
    return jsonError(getSafeErrorMessage(error, 'Failed to update discover list'), 500, 'discover_update_failed')
  }
}
