import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle, Clock, Code2, Download, ExternalLink, Globe, Star, Users } from 'lucide-react'
import PublicLayout from '@/components/layout/PublicLayout'
import { PRODUCTS } from '@/lib/marketplace-data'
import { cn } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = PRODUCTS.find(item => item.id === id)
  if (!product) return {}

  return {
    title: `${product.name} - Multiverse Marketplace`,
    description: product.description,
  }
}

export async function generateStaticParams() {
  return PRODUCTS.map(product => ({ id: product.id }))
}

function getBadgeLabel(badge?: string) {
  if (badge === 'bestseller') return 'Bestseller'
  if (badge === 'new') return 'New'
  if (badge === 'free') return 'Free'
  if (badge === 'updated') return 'Updated'
  return ''
}

function getBadgeClass(badge?: string) {
  if (badge === 'bestseller') return 'bg-yellow-500 text-white'
  if (badge === 'new') return 'bg-emerald-500 text-white'
  if (badge === 'free') return 'bg-blue-500 text-white'
  return 'bg-orange-500 text-white'
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = PRODUCTS.find(item => item.id === id)
  if (!product) notFound()

  const related = PRODUCTS.filter(item => item.category === product.category && item.id !== product.id).slice(0, 4)

  return (
    <PublicLayout>
      <div className="page-content max-w-screen-xl py-8">
        <Link
          href="/marketplace"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-muted">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
              {product.badge && (
                <span className={cn('absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold', getBadgeClass(product.badge))}>
                  {getBadgeLabel(product.badge)}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">{product.rating}</span>
                  <span>({product.reviews} reviews)</span>
                </div>
                <span>&middot;</span>
                <span className="capitalize">{product.category}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-3 text-lg font-bold">About this product</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              <div className="mt-4 space-y-2">
                {[
                  'Production-ready and fully documented',
                  'Clean, well-structured code',
                  'Responsive layout for all screen sizes',
                  'Updates and support included',
                  ...(product.pages ? [`${product.pages} unique pages included`] : []),
                  ...(product.components ? [`${product.components}+ reusable components`] : []),
                ].map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
                <Code2 className="h-5 w-5" />
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.techStack.map(item => (
                  <span
                    key={item}
                    className="rounded-xl bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-5 rounded-3xl border border-border bg-card p-6">
              <div className="flex items-end gap-3">
                <span
                  className={cn(
                    'text-4xl font-black',
                    product.price === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-300'
                  )}
                >
                  {product.price === 0 ? 'Free' : `$${product.price}`}
                </span>
                {product.originalPrice && (
                  <div>
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                    <span className="ml-1 tag-hot text-xs">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary w-full justify-center gap-2 py-3"
                >
                  <Download className="h-4 w-4" />
                  {product.price === 0 ? 'Download Free' : 'Buy Now'}
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary w-full justify-center gap-2 py-3"
                  >
                    <Globe className="h-4 w-4" />
                    Live Preview
                  </a>
                )}
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                {[
                  { icon: Star, label: 'Rating', value: `${product.rating}/5 (${product.reviews})` },
                  { icon: Users, label: 'Downloads', value: `${product.reviews * 3} total` },
                  { icon: Clock, label: 'Updated', value: 'Recently' },
                  { icon: Code2, label: 'Category', value: product.category.charAt(0).toUpperCase() + product.category.slice(1) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon className="h-4 w-4" />
                      {label}
                    </div>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground">Secure payment via Gumroad · Instant download</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-5 text-xl font-bold">More {product.category} Products</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(item => (
                <Link
                  key={item.id}
                  href={`/marketplace/${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                      {item.name}
                    </h3>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </div>
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-300">
                        {item.price === 0 ? 'Free' : `$${item.price}`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
