'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function NavigationRecovery() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto'
    }
  }, [])

  useEffect(() => {
    document.querySelectorAll('details[open]').forEach(element => {
      element.removeAttribute('open')
    })
  }, [pathname, searchParams])

  return null
}
