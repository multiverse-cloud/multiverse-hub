'use client'

import { useEffect, useRef } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'

export default function FirebaseUserSync() {
  const { isLoaded, userId } = useAuth()
  const { user } = useUser()
  const syncedUserIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !userId || !user) {
      return
    }

    if (syncedUserIdRef.current === userId) {
      return
    }

    syncedUserIdRef.current = userId

    void fetch('/api/auth/sync-user', {
      method: 'POST',
    }).catch(() => {
      syncedUserIdRef.current = null
    })
  }, [isLoaded, user, userId])

  return null
}
