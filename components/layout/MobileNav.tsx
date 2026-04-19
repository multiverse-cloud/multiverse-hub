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
  Menu,
  Paintbrush,
  Search,
  ShieldAlert,
  X,
  ChevronRight,
  Zap,
  Star,
} from 'lucide-react'

const MOBILE_NAV_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Tools', href: '/tools', icon: Search },
  { name: 'Library', href: '/library', icon: Layers3 },
  { name: 'Design', href: '/design', icon: Paintbrush },
  { name: 'Dev', href: '/dev', icon: Code2 },
  { name: 'Discover', href: '/discover', icon: Compass },
  { name: 'Prompts', href: '/prompts', icon: Bot },
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
        className={`fixed right-0 top-0 h-dvh w-80 max-w-[85vw] overflow-y-auto bg-white shadow-2xl transition-all duration-300 ease-out dark:bg-slate-950 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-slate-200/80 p-4 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <img src="/SiteLogo.png" alt="M" className="h-10 w-10" />
            <div>
              <span className="font-display text-lg font-extrabold tracking-tight">
                <span className="text-slate-900 dark:text-slate-50">Multi</span>
                <span className="text-blue-600 dark:text-blue-400">verse</span>
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                150+ tools
              </div>
            </div>
          </div>
          <button
            onClick={close}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 transition-all hover:bg-slate-50 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/80 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Enhanced Search */}
        <form action="/tools" method="get" className="border-b border-slate-200/80 p-4 dark:border-slate-800/80">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              name="q"
              placeholder="Search 150+ tools..."
              className="w-full rounded-xl border border-slate-200/80 bg-white/90 py-3 pl-10 pr-4 text-sm font-medium placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all dark:border-slate-800/80 dark:bg-slate-900/90 dark:placeholder:text-slate-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="flex h-6 items-center rounded-lg bg-indigo-100 px-2 py-1 dark:bg-indigo-950/50">
                <Zap className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                <span className="ml-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">AI</span>
              </div>
            </div>
          </div>
        </form>

        {/* Enhanced Navigation links */}
        <nav className="space-y-2 p-4">
          {MOBILE_NAV_LINKS.map((link, index) => {
            const Icon = link.icon
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={close}
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideInRight 0.3s ease-out forwards',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(20px)'
                }}
              >
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-white/20 shadow-inner'
                    : 'bg-slate-100 shadow-sm group-hover:shadow-md group-hover:scale-105 dark:bg-slate-800'
                )}>
                  <Icon className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                  )} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{link.name}</div>
                  {!isActive && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {link.name === 'Tools' && '150+ free tools'}
                      {link.name === 'Library' && 'UI & templates'}
                      {link.name === 'Design' && 'AI design tools'}
                      {link.name === 'Dev' && 'Developer utilities'}
                      {link.name === 'Discover' && 'Top picks & lists'}
                      {link.name === 'Prompts' && 'AI prompts'}
                      {link.name === 'Fixes' && 'Troubleshooting'}
                    </div>
                  )}
                </div>
                <ChevronRight className={cn(
                  'h-4 w-4 transition-all duration-200',
                  isActive ? 'text-white/80' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                )} />
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
        className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/80 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
      >
        <Menu className="h-5 w-5 text-slate-600 transition-colors group-hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-400" />
        <div className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-slate-900 dark:bg-white">
          <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-900" />
        </div>
      </button>

      {/* Portal the drawer to document.body so it escapes header's stacking context */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  )
}
