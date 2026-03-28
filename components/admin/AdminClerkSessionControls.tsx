'use client'

import { useState } from 'react'
import { Loader2, LogOut } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/nextjs'

export function AdminClerkUserButton() {
  return <UserButton afterSignOutUrl="/admin-login" />
}

export function AdminClerkLogoutButton({
  className,
  showLabel = true,
}: {
  className?: string
  showLabel?: boolean
}) {
  const { signOut } = useClerk()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)

    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {
      // We still want to continue the sign-out flow.
    }

    try {
      await signOut({ redirectUrl: '/admin-login' })
      return
    } catch {
      window.location.href = '/admin-login'
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loggingOut}
      className={className}
    >
      {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4 shrink-0" />}
      {showLabel ? 'Log Out' : null}
    </button>
  )
}
