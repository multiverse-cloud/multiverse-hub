'use client'

import { useState } from 'react'
import { Category } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Package } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
  category: Category
  variant?: 'default' | 'compact' | 'wide'
}

export function CategoryCard({ category, variant = 'default' }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false)

  if (variant === 'compact') {
    return (
      <Link href={`/category/${category.slug}`}>
        <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {category.image && !imageError ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900">
                  <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{category.name}</p>
              <p className="text-xs text-muted-foreground">
                {category.productCount || 0} products
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </CardContent>
        </Card>
      </Link>
    )
  }

  if (variant === 'wide') {
    return (
      <Link href={`/category/${category.slug}`}>
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-0">
            <div className="flex">
              <div className="relative h-32 w-32 flex-shrink-0 bg-muted">
                {category.image && !imageError ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900">
                    <Package className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h3 className="font-semibold text-lg group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {category.description}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  {category.productCount || 0} products
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/category/${category.slug}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
        <CardContent className="p-0">
          <div className="relative aspect-square bg-muted">
            {category.image && !imageError ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900">
                <Package className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-semibold text-white text-lg">
                {category.name}
              </h3>
              <p className="text-sm text-white/80">
                {category.productCount || 0} products
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
