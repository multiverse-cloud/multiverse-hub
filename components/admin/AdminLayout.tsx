'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Wrench, Layers, Compass, ShoppingBag,
  Home, Search, Flag, Globe2, Bell, Settings, ChevronLeft,
  ChevronRight, Shield, Menu, X, Activity, Loader2, LogOut
} from 'lucide-react'
import {
  AdminClerkLogoutButton,
  AdminClerkUserButton,
} from '@/components/admin/AdminClerkSessionControls'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, available: true },
  { label: 'Universes', href: '/admin/universes', icon: Globe2, available: false },
  { label: 'Tools', href: '/admin/tools', icon: Wrench, available: true },
  { label: 'Categories', href: '/admin/categories', icon: Layers, available: false },
  { label: 'Discover Lists', href: '/admin/discover', icon: Compass, available: true },
  { label: 'Marketplace', href: '/admin/marketplace', icon: ShoppingBag, available: false },
  { label: 'Homepage Sections', href: '/admin/homepage', icon: Home, available: false },
  { label: 'Feature Flags', href: '/admin/flags', icon: Flag, available: true },
  { label: 'API Status', href: '/admin/api-status', icon: Activity, available: true },
  { label: 'SEO Pages', href: '/admin/seo', icon: Search, available: false },
  { label: 'Settings', href: '/admin/settings', icon: Settings, available: false },
]

export default function AdminLayout({
  children,
  adminEmail,
  clerkEnabled,
}: {
  children: React.ReactNode
  adminEmail?: string | null
  clerkEnabled: boolean
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const pathname = usePathname()
  const displayEmail = adminEmail || 'Admin'

  async function handleFallbackLogout() {
    setLoggingOut(true)

    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {
      // Redirect anyway so the admin cookie is dropped client-side on next load.
    }

    window.location.href = '/admin-login'
  }

  function renderLogoutButton({ mobile = false }: { mobile?: boolean }) {
    const className = mobile
      ? 'flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-60'
      : cn(
          'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-60',
          collapsed && 'justify-center px-0'
        )

    if (clerkEnabled) {
      return <AdminClerkLogoutButton className={className} showLabel={!collapsed || mobile} />
    }

    return (
      <button
        onClick={handleFallbackLogout}
        disabled={loggingOut}
        className={className}
      >
        {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4 shrink-0" />}
        {!collapsed || mobile ? 'Log Out' : null}
      </button>
    )
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300 shrink-0',
        collapsed ? 'w-16' : 'w-56'
      )}>
        {/* Logo */}
        <div className={cn('flex items-center gap-2.5 px-4 h-14 border-b border-border shrink-0', collapsed && 'justify-center px-0')}>
          <div className="w-7 h-7 rounded-lg bg-slate-950 dark:bg-slate-100 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-white dark:text-slate-950" />
          </div>
          {!collapsed && <span className="font-bold text-sm text-slate-950 dark:text-slate-50">Admin Panel</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 custom-scrollbar">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            const active = pathname === item.href
            const itemClassName = cn(
              'flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-colors',
              item.available
                ? active
                  ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                : 'cursor-not-allowed text-slate-400 dark:text-slate-500',
              collapsed && 'justify-center px-0'
            )

            const itemBody = (
              <>
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed ? (
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate">{item.label}</span>
                    {!item.available ? (
                      <span className="rounded-full border border-border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Soon
                      </span>
                    ) : null}
                  </span>
                ) : null}
              </>
            )

            if (!item.available) {
              return (
                <button
                  key={item.href}
                  type="button"
                  disabled
                  title={collapsed ? `${item.label} (Coming soon)` : undefined}
                  className={itemClassName}
                >
                  {itemBody}
                </button>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  itemClassName
                )}
              >
                {itemBody}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className={cn('p-2 border-t border-border space-y-1', collapsed && 'flex flex-col items-center')}>
          <Link href="/" className={cn('flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors', collapsed && 'justify-center px-0')}>
            <Globe2 className="w-4 h-4 shrink-0" />
            {!collapsed && 'View Site'}
          </Link>
          {renderLogoutButton({ mobile: false })}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn('w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors', collapsed && 'justify-center px-0')}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-56 h-full bg-card border-r border-border flex flex-col">
            <div className="flex items-center justify-between px-4 h-14 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-950 dark:bg-slate-100 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white dark:text-slate-950" />
                </div>
                <span className="font-bold text-sm text-slate-950 dark:text-slate-50">Admin</span>
              </div>
              <button onClick={() => setMobileOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
              {NAV_ITEMS.map(item => {
                const Icon = item.icon
                const active = pathname === item.href
                const mobileClassName = cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-colors',
                  item.available
                    ? active
                      ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    : 'cursor-not-allowed text-slate-400 dark:text-slate-500'
                )

                if (!item.available) {
                  return (
                    <button key={item.href} type="button" disabled className={mobileClassName}>
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex items-center gap-2">
                        <span>{item.label}</span>
                        <span className="rounded-full border border-border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Soon
                        </span>
                      </span>
                    </button>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={mobileClassName}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="border-t border-border p-2">
              {renderLogoutButton({ mobile: true })}
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-4 gap-4 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-muted">
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Search admin..." className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button className="relative p-1.5 rounded-xl hover:bg-muted transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="hidden text-right sm:block">
              <p className="text-xs font-medium text-foreground">Admin Session</p>
              <p className="max-w-40 truncate text-[11px] text-muted-foreground">{displayEmail}</p>
            </div>
            {clerkEnabled ? (
              <AdminClerkUserButton />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground">
                AD
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
