import { NextRequest, NextResponse } from 'next/server'
import { authorizeAdminRequest } from '@/lib/admin-request-auth'
import {
  getAdminDiscoverLists,
  saveDiscoverLists,
  saveDiscoverList,
  seedLocalDiscoverLists,
} from '@/lib/discover-db'
import { parseDiscoverImportPayload } from '@/lib/discover-import'
import type { DiscoverList } from '@/lib/discover-data'

function normalizeTopic(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function getListMatchKey(list: DiscoverList) {
  return list.slug || normalizeTopic(list.title)
}

function sortLists(lists: DiscoverList[]) {
  return [...lists].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return right.updatedAt.localeCompare(left.updatedAt)
  })
}

function mergeLists(existingLists: DiscoverList[], incomingLists: DiscoverList[]) {
  const byKey = new Map<string, DiscoverList>()

  for (const list of existingLists) {
    byKey.set(getListMatchKey(list), list)
  }

  for (const list of incomingLists) {
    byKey.set(getListMatchKey(list), list)
  }

  return sortLists(Array.from(byKey.values()))
}

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

function isLocalDiscoverReadOnlyError(error: unknown) {
  return (
    error instanceof Error &&
    /Discover is currently in local-only mode/i.test(error.message)
  )
}

async function isAuthorizedRequest(request: NextRequest) {
  return (await authorizeAdminRequest(request)).authorized
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
      const result = await seedLocalDiscoverLists()
      const lists = await getAdminDiscoverLists()
      return NextResponse.json({
        ...result,
        success: true,
        message: `Built ${result.count || 0} local discover entries from the data folder JSON files.`,
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
      const refreshedLists = mergeLists(existingLists, parsed.lists)

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

    const existingLists = await getAdminDiscoverLists()
    await saveDiscoverList(list)
    const lists = mergeLists(existingLists, [list])

    return NextResponse.json({
      success: true,
      message: `Saved "${list.title}" successfully.`,
      list,
      lists,
    })
  } catch (error) {
    console.error('Admin discover POST failed:', error)
    const status = isLocalDiscoverReadOnlyError(error) ? 409 : 500
    const code = isLocalDiscoverReadOnlyError(error) ? 'discover_local_read_only' : 'discover_save_failed'
    return jsonError(getSafeErrorMessage(error, 'Failed to save discover list'), status, code)
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

    const existingLists = await getAdminDiscoverLists()
    await saveDiscoverList(list)
    const lists = mergeLists(existingLists, [list])

    return NextResponse.json({
      success: true,
      message: `Updated "${list.title}" successfully.`,
      list,
      lists,
    })
  } catch (error) {
    console.error('Admin discover PATCH failed:', error)
    const status = isLocalDiscoverReadOnlyError(error) ? 409 : 500
    const code = isLocalDiscoverReadOnlyError(error) ? 'discover_local_read_only' : 'discover_update_failed'
    return jsonError(getSafeErrorMessage(error, 'Failed to update discover list'), status, code)
  }
}
