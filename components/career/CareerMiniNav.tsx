import Link from 'next/link'
import { ArrowLeft, FileText, ScanText, UploadCloud } from 'lucide-react'
import { cn } from '@/lib/utils'

type CareerMiniNavProps = {
  active: 'builder' | 'parser' | 'import'
}

const links = [
  { label: 'Builder', href: '/career/builder', key: 'builder', icon: FileText },
  { label: 'Parser', href: '/career/parser', key: 'parser', icon: ScanText },
  { label: 'Import', href: '/career/import', key: 'import', icon: UploadCloud },
] as const

export default function CareerMiniNav({ active }: CareerMiniNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex h-14 items-center justify-between gap-3 px-3 sm:px-5">
        <Link
          href="/career"
          className="inline-flex min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Career Universe</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = active === link.key

            return (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-3',
                  isActive
                    ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white'
                    : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
