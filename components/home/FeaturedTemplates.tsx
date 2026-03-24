import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, Star } from 'lucide-react'
import { PRODUCTS } from '@/lib/marketplace-data'

export default function FeaturedTemplates() {
  const featured = PRODUCTS.filter(product => product.featured).slice(0, 4)

  return (
    <section className="bg-slate-50 py-16 md:py-20 dark:bg-slate-950/40">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-rose-500" />
                <p className="section-label !mb-0">Marketplace</p>
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Featured Products</h2>
            </div>

            <Link href="/marketplace" className="hidden items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 sm:flex">
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(product => (
              <Link
                key={product.id}
                href={`/marketplace/${product.id}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/8"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.badge && (
                    <div className="absolute left-3 top-3">
                      {product.badge === 'bestseller' && <span className="rounded-lg bg-amber-500 px-2 py-1 text-xs font-bold text-white">Bestseller</span>}
                      {product.badge === 'new' && <span className="rounded-lg bg-emerald-500 px-2 py-1 text-xs font-bold text-white">New</span>}
                      {product.badge === 'free' && <span className="rounded-lg bg-blue-500 px-2 py-1 text-xs font-bold text-white">Free</span>}
                      {product.badge === 'updated' && <span className="rounded-lg bg-violet-500 px-2 py-1 text-xs font-bold text-white">Updated</span>}
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-4">
                  <div>
                    <h3 className="text-sm font-semibold leading-snug transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {product.techStack.slice(0, 3).map(tech => (
                      <span key={tech} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {product.originalPrice && <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>}
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {product.price === 0 ? 'Free' : `$${product.price}`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
