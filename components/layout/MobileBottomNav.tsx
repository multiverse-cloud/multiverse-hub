'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  Search,
  Layers3,
  Paintbrush,
  Code2,
  Compass,
  Bot,
  ShieldAlert,
} from 'lucide-react'

const MOBILE_BOTTOM_NAV = [
  { name: 'Home', href: '/', icon: Home, color: 'from-blue-500 to-cyan-500' },
  { name: 'Tools', href: '/tools', icon: Search, color: 'from-orange-500 to-red-500' },
  { name: 'Library', href: '/library', icon: Layers3, color: 'from-purple-500 to-pink-500' },
  { name: 'Discover', href: '/discover', icon: Compass, color: 'from-amber-500 to-orange-500' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Hide/show bottom nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div 
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800/80 dark:bg-slate-950/95 md:hidden',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      {/* Safe area padding for notched phones */}
      <div className="safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {MOBILE_BOTTOM_NAV.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all duration-200 touch-press',
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />
                )}
                
                <div className="relative">
                  <Icon 
                    className={cn(
                      'h-5 w-5 transition-all duration-200',
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    )} 
                  />
                  {/* Subtle glow effect for active item */}
                  {isActive && (
                    <div className={cn(
                      'absolute inset-0 rounded-full bg-gradient-to-r opacity-20 blur-md',
                      item.color
                    )} />
                  )}
                </div>
                
                <span className={cn(
                  'text-xs font-medium transition-all duration-200',
                  isActive ? 'font-semibold' : ''
                )}>
                  {item.name}
                </span>
                
                {/* Haptic feedback simulation */}
                <div className="absolute inset-0 rounded-xl" />
              </Link>
            )
          })}
          
          {/* More menu button */}
          <div className="relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-slate-500 dark:text-slate-400">
            <div className="flex h-5 w-5 flex-col items-center justify-center gap-0.5">
              <div className="h-0.5 w-3 rounded-full bg-current" />
              <div className="h-0.5 w-3 rounded-full bg-current" />
              <div className="h-0.5 w-3 rounded-full bg-current" />
            </div>
            <span className="text-xs font-medium">More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
