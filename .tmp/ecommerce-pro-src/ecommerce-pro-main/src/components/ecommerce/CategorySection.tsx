'use client'

import { motion } from 'framer-motion'
import { Category } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Package, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface CategorySectionProps {
  categories: Category[]
  title?: string
  subtitle?: string
}

function CategoryCard({ category }: { category: Category }) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link href={`/category/${category.slug}`} className="block h-full">
      <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer border-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <CardContent className="p-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            {category.image && !imageError ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900">
                <Package className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-bold text-white text-xl mb-1 group-hover:text-emerald-300 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-white/80 mb-3 line-clamp-1">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/90">
                  {category.productCount || 0} Products
                </span>
                <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function CategorySection({
  categories,
  title = 'Shop by Category',
  subtitle = 'Browse our wide selection of categories',
}: CategorySectionProps) {
  return (
    <div>
      {/* Header */}
      <div className="section-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-copy"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <CategoryCard category={category} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
