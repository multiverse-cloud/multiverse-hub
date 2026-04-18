import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
