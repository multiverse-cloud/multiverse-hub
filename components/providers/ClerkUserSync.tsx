'use client'

import { useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'

const SYNC_TTL_MS = 12 * 60 * 60 * 1000
const SYNC_STORAGE_PREFIX = 'multiverse:clerk-sync'

type PersistedSyncState = {
  version: string
  lastSyncedAt: number
}

function toSafeTimestamp(value: unknown) {
  if (value instanceof Date) {
    const timestamp = value.getTime()
    return Number.isFinite(timestamp) ? timestamp : 0
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const timestamp = new Date(value).getTime()
    return Number.isFinite(timestamp) ? timestamp : 0
  }

  if (
    value &&
    typeof value === 'object' &&
    'getTime' in value &&
    typeof (value as { getTime?: unknown }).getTime === 'function'
  ) {
    const timestamp = (value as { getTime: () => number }).getTime()
    return Number.isFinite(timestamp) ? timestamp : 0
  }

  return 0
}

function readPersistedState(storageKey: string): PersistedSyncState | null {
  try {
    const rawValue = window.localStorage.getItem(storageKey)

    if (!rawValue) {
      return null
    }

    const parsed = JSON.parse(rawValue) as PersistedSyncState

    if (typeof parsed?.version !== 'string' || typeof parsed?.lastSyncedAt !== 'number') {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export default function ClerkUserSync() {
  const { isLoaded, isSignedIn, user } = useUser()
  const syncedVersionRef = useRef<string | null>(null)
  const storageKey = user ? `${SYNC_STORAGE_PREFIX}:${user.id}` : null
  const syncVersion = user
    ? [user.id, toSafeTimestamp(user.updatedAt), toSafeTimestamp(user.lastSignInAt)].join(':')
    : null

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return
    }

    if (syncVersion && syncedVersionRef.current === syncVersion) {
      return
    }

    if (storageKey && syncVersion) {
      const persisted = readPersistedState(storageKey)

      if (persisted?.version === syncVersion && Date.now() - persisted.lastSyncedAt < SYNC_TTL_MS) {
        syncedVersionRef.current = syncVersion
        return
      }
    }

    syncedVersionRef.current = syncVersion

    const controller = new AbortController()

    const runSync = async () => {
      try {
        const response = await fetch('/api/auth/sync-user', {
          method: 'POST',
          signal: controller.signal,
          keepalive: true,
        })

        if (!response.ok) {
          throw new Error('sync_failed')
        }

        if (storageKey && syncVersion) {
          try {
            window.localStorage.setItem(
              storageKey,
              JSON.stringify({
                version: syncVersion,
                lastSyncedAt: Date.now(),
              } satisfies PersistedSyncState)
            )
          } catch {}
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return
        }

        syncedVersionRef.current = null

        if (storageKey) {
          try {
            window.localStorage.removeItem(storageKey)
          } catch {}
        }
      }
    }

    const cancelScheduledSync =
      typeof window.requestIdleCallback === 'function'
        ? (() => {
            const handle = window.requestIdleCallback(() => {
              void runSync()
            }, { timeout: 1500 })

            return () => window.cancelIdleCallback(handle)
          })()
        : (() => {
            const timeoutId = window.setTimeout(() => {
              void runSync()
            }, 300)

            return () => window.clearTimeout(timeoutId)
          })()

    return () => {
      controller.abort()
      cancelScheduledSync()
    }
  }, [isLoaded, isSignedIn, storageKey, syncVersion, user])

  return null
}
