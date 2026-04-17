'use client'

import { motion } from 'framer-motion'
import { CreditCard, Shield, Truck, RotateCcw, Headphones, Award } from 'lucide-react'

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $100',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure payment with SSL encryption',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer support team',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Multiple payment options available',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Premium quality products assured',
  },
]

export function TrustBadges() {
  return (
    <section className="border-y bg-gray-50 py-10 dark:bg-gray-900 sm:py-12">
      <div className="page-shell">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center rounded-2xl px-3 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mb-3">
                <badge.icon className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground hidden sm:block">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
