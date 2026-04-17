'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-10 w-10 rounded-2xl border border-slate-200 dark:border-slate-800" aria-hidden="true" />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => {
        setTheme(isDark ? 'light' : 'dark')
      }}
      className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 transition-colors hover:border-indigo-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-900"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}