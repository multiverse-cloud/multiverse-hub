'use client'

import { useState } from 'react'
import { Loader2, LogOut } from 'lucide-react'

export function AdminClerkUserButton() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground">
      AD
    </div>
  )
}

export function AdminClerkLogoutButton({
  className,
  showLabel = true,
}: {
  className?: string
  showLabel?: boolean
}) {
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)

    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {
      // Redirect anyway so the admin cookie is dropped server-side on next load.
    }

    window.location.href = '/admin-login'
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
