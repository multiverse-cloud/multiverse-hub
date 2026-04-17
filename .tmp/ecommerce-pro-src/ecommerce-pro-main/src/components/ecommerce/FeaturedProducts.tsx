'use client'

import { motion } from 'framer-motion'
import { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface FeaturedProductsProps {
  products: Product[]
  title?: string
  subtitle?: string
  viewAllLink?: string
}

export function FeaturedProducts({
  products,
  title = 'Featured Products',
  subtitle = 'Hand-picked products just for you',
  viewAllLink = '#products',
}: FeaturedProductsProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
        <div className="max-w-2xl text-center sm:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight lg:text-4xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-base text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button variant="link" className="group p-0 h-auto text-base font-medium">
            <a href={viewAllLink} className="flex items-center text-emerald-600 hover:text-emerald-700">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
