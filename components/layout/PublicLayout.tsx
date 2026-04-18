import { Suspense } from 'react'
import { Globe } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBreadcrumb from '@/components/layout/MobileBreadcrumb'

export default function PublicLayout({
  children,
  schemaMarkup,
  variant = 'default',
}: {
  children: React.ReactNode
  schemaMarkup?: Record<string, any> | Record<string, any>[]
  variant?: 'default' | 'template' | 'source-hub'
}) {
  const schemas = schemaMarkup
    ? Array.isArray(schemaMarkup)
      ? schemaMarkup
      : [schemaMarkup]
    : []

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="flex min-h-screen flex-col">
        <Suspense fallback={
          <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/88">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4 lg:px-6 lg:py-3.5">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-950 shadow-md shadow-slate-900/10 dark:bg-slate-100">
                <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white dark:text-slate-950" />
              </div>
              <div className="hidden h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700 sm:block" />
              <div className="ml-auto flex gap-2">
                <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
                <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </header>
        }>
          <Navbar />
        </Suspense>
        <MobileBreadcrumb />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
