'use client'

import { Product } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ShoppingCart,
  Heart,
  Star,
  Package,
  Eye,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, getDiscountPercentage, getStockStatus } from '@/lib/utils'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const mainImage = product.images?.[0]
  const discount = product.comparePrice
    ? getDiscountPercentage(product.price, product.comparePrice)
    : 0
  const stockStatus = getStockStatus(product.stock)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: mainImage || '',
      slug: product.slug,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  if (variant === 'compact') {
    return (
      <Link href={`/product/${product.slug}`}>
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gray-50 dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                {mainImage && !imageError ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <p className="font-semibold text-sm mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/product/${product.slug}`} className="block h-full">
      <Card
        className={cn(
          "group flex h-full flex-col overflow-hidden border-0 bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800",
          variant === 'featured' && "ring-2 ring-emerald-500/20"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          {mainImage && !imageError ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Package className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <AnimatePresence>
              {discount > 0 && (
                <motion.div
                  key="discount"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-lg">
                    -{discount}%
                  </Badge>
                </motion.div>
              )}
              {product.featured && (
                <motion.div
                  key="featured"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg">
                    Featured
                  </Badge>
                </motion.div>
              )}
              {product.trending && (
                <motion.div
                  key="trending"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg">
                    Trending
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="icon"
                variant="secondary"
                className={cn(
                  "h-10 w-10 rounded-full shadow-lg backdrop-blur-sm transition-colors",
                  isWishlisted ? "bg-red-500 text-white hover:bg-red-600" : "bg-white/90 hover:bg-white"
                )}
                onClick={handleWishlist}
              >
                <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Button
                size="icon"
                variant="secondary"
                className="h-10 w-10 rounded-full shadow-lg backdrop-blur-sm bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <Eye className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Add to Cart Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <Button
              className="w-full h-12 bg-white text-gray-900 hover:bg-gray-100 shadow-xl rounded-xl font-semibold"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col p-5">
          {/* Category */}
          {product.category && (
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">
              {product.category.name}
            </p>
          )}

          {/* Name */}
          <h3 className="font-semibold text-lg line-clamp-2 mb-3 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-auto flex items-center gap-2 pt-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              stockStatus.status === 'in-stock' && "bg-emerald-500",
              stockStatus.status === 'low-stock' && "bg-amber-500",
              stockStatus.status === 'out-of-stock' && "bg-red-500"
            )} />
            <span className={cn("text-sm", stockStatus.color)}>
              {stockStatus.label}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
