'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Package, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  icon: typeof TrendingUp
  iconColor?: string
  delay?: number
}

function StatCard({ title, value, change, icon: Icon, iconColor = 'text-emerald-500', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6 lg:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${iconColor.replace('text-', 'bg-').replace('500', '100')} dark:bg-gray-800`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            {change !== undefined && (
              <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${change >= 0 ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900' : 'text-red-600 bg-red-100 dark:bg-red-900'}`}>
                {change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span>{Math.abs(change).toFixed(1)}%</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl lg:text-4xl font-bold">{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section className="section-shell-lg bg-muted/30">
      <div className="page-shell">
        {/* Header */}
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Trusted by Thousands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-copy"
          >
            Join our growing community of happy customers worldwide
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <StatCard
            title="Total Revenue"
            value="$124,592"
            change={12.5}
            icon={TrendingUp}
            iconColor="text-emerald-500"
            delay={0.1}
          />
          <StatCard
            title="Happy Customers"
            value="8,549+"
            change={8.2}
            icon={Users}
            iconColor="text-teal-500"
            delay={0.2}
          />
          <StatCard
            title="Products Sold"
            value="24,891"
            change={15.3}
            icon={Package}
            iconColor="text-amber-500"
            delay={0.3}
          />
          <StatCard
            title="Average Rating"
            value="4.9/5"
            change={2.1}
            icon={Star}
            iconColor="text-yellow-500"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}
