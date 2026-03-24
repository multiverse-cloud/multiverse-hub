'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ExternalLink,
  Filter,
  GraduationCap,
  Layout,
  LayoutGrid,
  Package,
  Search,
  ShoppingBag,
  Star,
  Code2,
  Gift,
} from 'lucide-react'
import { PRODUCTS, MARKETPLACE_CATEGORIES } from '@/lib/marketplace-data'
import { cn } from '@/lib/utils'

const ICON_MAP = { LayoutGrid, Layout, Code2, GraduationCap, Package, Gift }

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

function getBadgeLabel(badge?: string) {
  if (badge === 'bestseller') return 'Bestseller'
  if (badge === 'new') return 'New'
  if (badge === 'free') return 'Free'
  if (badge === 'updated') return 'Updated'
  return ''
}

function getBadgeClass(badge?: string) {
  if (badge === 'bestseller') return 'bg-amber-500 text-white'
  if (badge === 'new') return 'bg-emerald-500 text-white'
  if (badge === 'free') return 'bg-blue-500 text-white'
  return 'bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-950'
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    <Link
      href={`/marketplace/${product.id}`}
      className="premium-card group flex flex-col overflow-hidden hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={cn(
              'absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold',
              getBadgeClass(product.badge)
            )}
          >
            {getBadgeLabel(product.badge)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {product.techStack.slice(0, 3).map(item => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>

        <h3 className="line-clamp-1 font-display text-base font-bold text-slate-950 transition-colors group-hover:text-indigo-600 dark:text-slate-50 dark:group-hover:text-indigo-300">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{product.description}</p>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
            <span
              className={cn(
                'font-display text-lg font-bold',
                product.price === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-300'
              )}
            >
              {product.price === 0 ? 'Free' : `$${product.price}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function MarketplaceClient() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchCategory = activeCategory === 'all' || product.category === activeCategory
      const lowerSearch = search.toLowerCase()
      const matchSearch =
        !search ||
        product.name.toLowerCase().includes(lowerSearch) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
      return matchCategory && matchSearch
    })

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result = [...result].reverse()
        break
      default:
        break
    }

    return result
  }, [activeCategory, search, sort])

  return (
    <div className="min-h-screen premium-shell">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <ShoppingBag className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              Marketplace Universe
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
              Digital Products & Resources
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Browse templates, starter kits, full projects, and practical resources in one professional catalog.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates, projects, or courses"
                value={search}
                onChange={event => setSearch(event.target.value)}
                className="premium-field pl-11"
              />
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
            {[
              { value: `${PRODUCTS.length}+`, label: 'Products' },
              { value: '5K+', label: 'Downloads' },
              { value: '4.8', label: 'Average Rating' },
            ].map(stat => (
              <div
                key={stat.label}
                className="premium-card rounded-2xl px-5 py-4 text-center hover:border-slate-300 dark:hover:border-slate-700"
              >
                <p className="font-display text-2xl font-extrabold text-slate-950 dark:text-slate-50">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-[105px] z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="page-frame flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
            {MARKETPLACE_CATEGORIES.map(category => {
              const Icon = ICON_MAP[category.icon as keyof typeof ICON_MAP] || LayoutGrid
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                    activeCategory === category.id
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {category.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(product => product.category === category.id).length}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={event => setSort(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <section className="page-content">
        {filtered.length === 0 ? (
          <div className="premium-card rounded-3xl px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Search className="h-6 w-6 text-slate-500 dark:text-slate-300" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-slate-950 dark:text-slate-50">No products found</h2>
            <p className="mt-2 text-sm text-muted-foreground">Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
