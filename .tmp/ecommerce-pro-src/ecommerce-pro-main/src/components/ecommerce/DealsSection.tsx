'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'
import { CountdownTimer } from './CountdownTimer'
import { formatPrice, getDiscountPercentage } from '@/lib/utils'
import { Zap, ArrowRight, Star, Package } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState as useStateReact } from 'react'

interface DealsSectionProps {
  products: Product[]
}

function DealProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useStateReact(false)
  const mainImage = product.images?.[0]
  const discount = product.comparePrice
    ? getDiscountPercentage(product.price, product.comparePrice)
    : 0

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-3 hover:bg-white/20 transition-colors"
      >
        <div className="flex gap-3">
          <div className="relative h-16 w-16 rounded-md overflow-hidden bg-white/20 flex-shrink-0">
            {mainImage && !imageError ? (
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Package className="h-6 w-6 text-white/50" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-white truncate">{product.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-white/70">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold text-white">{formatPrice(product.price)}</span>
              {discount > 0 && (
                <Badge className="bg-red-500 text-xs">-{discount}%</Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export function DealsSection({ products }: DealsSectionProps) {
  const [endTime] = useState(() => {
    const date = new Date()
    date.setHours(23, 59, 59, 999)
    return date
  })

  return (
    <section id="deals" className="section-shell bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="page-shell">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">
          {/* Left Content */}
          <div className="max-w-xl text-center text-white lg:text-left">
            <Badge className="bg-white/20 text-white mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Flash Sale
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Don't Miss Out!
            </h2>
            <p className="text-white/80 mb-6 max-w-md">
              Limited time offers on premium products. Grab them before they're gone!
            </p>
            <CountdownTimer endTime={endTime} />
            <Button className="mt-6 bg-white text-emerald-600 hover:bg-white/90">
              View All Deals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right Products */}
          <div className="w-full max-w-2xl flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DealProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
