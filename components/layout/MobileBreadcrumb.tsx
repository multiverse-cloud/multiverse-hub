'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

type BreadcrumbItem = {
  label: string
  href?: string
}

export default function MobileBreadcrumb() {
  const pathname = usePathname()
  
  if (!pathname) return null
  
  // Only show on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null
  }

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  
  if (pathSegments.length === 0) {
    return null
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ]

  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1
    
    // Format the label (capitalize first letter, replace hyphens with spaces)
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath
    })
  })

  return (
    <div className="lg:hidden border-b border-slate-200/60 bg-white/95 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-3 py-1.5">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1
          const isFirst = index === 0

          return (
            <div key={`${item.label}-${index}`} className="flex items-center gap-1 shrink-0">
              {item.href && !isLast ? (
                <Link 
                  href={item.href} 
                  className="flex items-center gap-1 text-[10px] font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {isFirst ? <Home className="h-3 w-3" /> : null}
                  {item.label}
                </Link>
              ) : (
                <span className="text-[10px] font-semibold text-slate-900 dark:text-slate-100">
                  {item.label}
                </span>
              )}

              {!isLast ? (
                <ChevronRight className="h-2.5 w-2.5 text-slate-400" />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
