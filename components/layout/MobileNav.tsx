'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bot,
  Code2,
  Compass,
  Home,
  Layers3,
  LayoutTemplate,
  Menu,
  Paintbrush,
  Search,
  ShieldAlert,
  X,
} from 'lucide-react'

const MOBILE_NAV_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Tools', href: '/tools', icon: Search },
  { name: 'Library', href: '/library', icon: Layers3 },
  { name: 'Design', href: '/design', icon: Paintbrush },
  { name: 'Dev', href: '/dev', icon: Code2 },
  { name: 'Discover', href: '/discover', icon: Compass },
  { name: 'Prompts', href: '/prompts', icon: Bot },
  { name: 'Templates', href: '/templates', icon: LayoutTemplate },
  { name: 'Fixes', href: '/fixes', icon: ShieldAlert },
]

export default function MobileNav({
  authSlot,
}: {
  authSlot?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])

  // Close drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  const drawer = (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          style={{ zIndex: 9998 }}
          onClick={close}
        />
      )}

      {/* Slide-in Drawer */}
      <div
        style={{ zIndex: 9999 }}
        className={`fixed right-0 top-0 h-dvh w-80 max-w-[85vw] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-slate-950 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
          <span className="font-display text-lg font-extrabold tracking-tight">Menu</span>
          <button
            onClick={close}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <form action="/tools" method="get" className="border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              name="q"
              placeholder="Search tools"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900"
            />
          </div>
        </form>

        {/* Navigation links */}
        <nav className="space-y-1 p-3">
          {MOBILE_NAV_LINKS.map(link => {
            const Icon = link.icon
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={close}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>

        {authSlot ? (
          <div className="border-t border-slate-200 p-4 dark:border-slate-800">
            {authSlot}
          </div>
        ) : null}
      </div>
    </>
  )

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Portal the drawer to document.body so it escapes header's stacking context */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  )
}
