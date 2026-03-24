import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}

export default function ToolBreadcrumb({
  items,
  className = '',
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  return (
    <nav className={`mb-6 flex items-center gap-2 text-sm text-muted-foreground ${className}`.trim()}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const isFirst = index === 0

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="flex items-center gap-1 transition-colors hover:text-foreground">
                {isFirst ? <ArrowLeft className="h-3.5 w-3.5" /> : null}
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}

            {!isLast ? <span>/</span> : null}
          </span>
        )
      })}
    </nav>
  )
}
