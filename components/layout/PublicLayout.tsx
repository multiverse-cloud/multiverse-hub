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
          <div className="sticky top-0 z-50 h-16 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/88" />
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
