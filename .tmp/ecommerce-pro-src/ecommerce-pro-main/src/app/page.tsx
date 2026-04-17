'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/ecommerce/HeroSection'
import { FeaturedProducts } from '@/components/ecommerce/FeaturedProducts'
import { CategorySection } from '@/components/ecommerce/CategorySection'
import { ProductGrid } from '@/components/ecommerce/ProductGrid'
import { DealsSection } from '@/components/ecommerce/DealsSection'
import { StatsSection } from '@/components/ecommerce/StatsSection'
import { TestimonialsSection } from '@/components/ecommerce/TestimonialsSection'
import { NewsletterSection } from '@/components/ecommerce/NewsletterSection'
import { TrustBadges } from '@/components/ecommerce/TrustBadges'
import { ScrollToTop } from '@/components/ecommerce/ScrollToTop'
import { Product, Category } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products?limit=20'),
          fetch('/api/categories'),
        ])

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        if (productsData.success) {
          setProducts(productsData.data.products)
          setTotalProducts(productsData.data.total)
        }

        if (categoriesData.success) {
          setCategories(categoriesData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)
  const dealsProducts = products.filter((p) => p.comparePrice && p.comparePrice > p.price).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Loading State */}
        {loading ? (
          <div className="section-shell">
            <div className="page-shell">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square rounded-2xl" />
                    <Skeleton className="h-6 w-3/4 rounded-lg" />
                    <Skeleton className="h-4 w-1/2 rounded-lg" />
                    <Skeleton className="h-8 w-1/3 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Products */}
            {featuredProducts.length > 0 && (
              <section className="section-shell">
                <div className="page-shell">
                  <FeaturedProducts
                    products={featuredProducts}
                    title="Featured Products"
                    subtitle="Hand-picked products just for you"
                  />
                </div>
              </section>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <section id="categories" className="section-shell bg-muted/30">
                <div className="page-shell">
                  <CategorySection categories={categories} />
                </div>
              </section>
            )}

            {/* Flash Deals */}
            {dealsProducts.length > 0 && (
              <DealsSection products={dealsProducts} />
            )}

            {/* All Products */}
            <section id="products" className="section-shell">
              <div className="page-shell">
                <ProductGrid
                  products={products}
                  total={totalProducts}
                  categories={categories}
                />
              </div>
            </section>
          </>
        )}

        {/* Stats */}
        <StatsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Newsletter */}
        <NewsletterSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
