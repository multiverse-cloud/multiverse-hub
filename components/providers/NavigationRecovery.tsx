'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function NavigationRecovery() {
  const pathname = usePathname()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto'
    }
  }, [])

  useEffect(() => {
    document.querySelectorAll('details[open]').forEach(element => {
      element.removeAttribute('open')
    })
  }, [pathname])

  return null
}
