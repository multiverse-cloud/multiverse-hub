'use client'

import { useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'

export default function ClerkUserSync() {
  const { isLoaded, isSignedIn, user } = useUser()
  const syncedUserIdRef = useRef<string | null>(null)
  const storageKey = user ? `multiverse:clerk-sync:${user.id}` : null

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return
    }

    if (storageKey && typeof window !== 'undefined') {
      try {
        const persisted = window.sessionStorage.getItem(storageKey)
        if (persisted === 'done') {
          syncedUserIdRef.current = user.id
          return
        }
      } catch {}
    }

    if (syncedUserIdRef.current === user.id) {
      return
    }

    syncedUserIdRef.current = user.id

    void (async () => {
      try {
        const response = await fetch('/api/auth/sync-user', {
          method: 'POST',
        })

        if (!response.ok) {
          syncedUserIdRef.current = null
          if (storageKey && typeof window !== 'undefined') {
            try {
              window.sessionStorage.removeItem(storageKey)
            } catch {}
          }
          return
        }

        if (storageKey && typeof window !== 'undefined') {
          try {
            window.sessionStorage.setItem(storageKey, 'done')
          } catch {}
        }
      } catch {
        syncedUserIdRef.current = null
        if (storageKey && typeof window !== 'undefined') {
          try {
            window.sessionStorage.removeItem(storageKey)
          } catch {}
        }
      }
    })()
  }, [isLoaded, isSignedIn, storageKey, user])

  return null
}
