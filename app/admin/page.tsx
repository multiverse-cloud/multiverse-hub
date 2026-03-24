'use client'

import { useState } from 'react'
import { Wrench, Users, TrendingUp, Zap, Globe2, ShoppingBag, Bot, Activity, CheckCircle, AlertCircle, Clock, ToggleLeft, ToggleRight, ArrowUpRight } from 'lucide-react'
import { ACTIVE_CATEGORIES, TOOLS } from '@/lib/tools-data'
import { UNIVERSES } from '@/lib/universes-data'
import { PRODUCTS } from '@/lib/marketplace-data'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const STATS = [
  { label: 'Total Tools', value: TOOLS.length.toString(), icon: Wrench, change: '+12 this month', trend: 'up', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { label: 'Active Universes', value: UNIVERSES.length.toString(), icon: Globe2, change: 'All operational', trend: 'up', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { label: 'Marketplace Products', value: PRODUCTS.length.toString(), icon: ShoppingBag, change: '+3 this week', trend: 'up', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/30' },
  { label: 'Est. Monthly Users', value: '50K+', icon: Users, change: '+18% MoM', trend: 'up', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
]

const API_STATUS = [
  { name: 'OpenRouter AI', status: 'operational', latency: '210ms', key: 'NEXT_PUBLIC_OPENROUTER_API_KEY' },
  { name: 'TMDB Movies', status: 'operational', latency: '145ms', key: 'NEXT_PUBLIC_TMDB_API_KEY' },
  { name: 'GNews API', status: 'operational', latency: '320ms', key: 'NEXT_PUBLIC_GNEWS_API_KEY' },
  { name: 'Pollinations AI', status: 'operational', latency: '890ms', key: 'Free (no key)' },
  { name: 'QR Server', status: 'operational', latency: '55ms', key: 'Free (no key)' },
]

const RECENT_ACTIVITY = [
  { action: 'New tool added', detail: 'AI Resume Builder', time: '2 hours ago', type: 'tool' },
  { action: 'Tool marked trending', detail: 'AI Image Generator', time: '5 hours ago', type: 'flag' },
  { action: 'Product published', detail: 'SaaS Dashboard Pro', time: '1 day ago', type: 'product' },
  { action: 'Universe enabled', detail: 'Design AI Universe', time: '2 days ago', type: 'universe' },
  { action: 'Tool updated', detail: 'JSON Formatter v2', time: '3 days ago', type: 'tool' },
]

export default function AdminDashboard() {
  const [universeToggles, setUniverseToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(UNIVERSES.map(u => [u.id, true]))
  )

  return (
    <div className="space-y-6 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Welcome back, Admin. Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          All systems operational
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', stat.bg)}>
                  <Icon className={cn('w-4.5 h-4.5', stat.color)} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{stat.change}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Universe toggles */}
        <div className="lg:col-span-1 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold flex items-center gap-2"><Globe2 className="w-4 h-4 text-indigo-500" /> Universes</h2>
            <Link href="/admin/universes" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Manage →</Link>
          </div>
          <div className="space-y-2">
            {UNIVERSES.map(u => (
              <div key={u.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${universeToggles[u.id] ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                  <span className="text-sm font-medium">{u.name}</span>
                </div>
                <button
                  onClick={() => setUniverseToggles(prev => ({ ...prev, [u.id]: !prev[u.id] }))}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {universeToggles[u.id]
                    ? <ToggleRight className="w-6 h-6 text-emerald-500" />
                    : <ToggleLeft className="w-6 h-6" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Status */}
        <div className="lg:col-span-1 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-violet-500" /> API Status</h2>
            <Link href="/admin/api-status" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Details →</Link>
          </div>
          <div className="space-y-3">
            {API_STATUS.map(api => (
              <div key={api.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-sm">{api.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">{api.latency}</span>
                  <span className="tag-new text-xs">OK</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Configure API keys in <code className="bg-muted px-1 rounded">.env.local</code></p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" /> Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0',
                  item.type === 'tool' ? 'bg-indigo-500' :
                  item.type === 'flag' ? 'bg-orange-500' :
                  item.type === 'product' ? 'bg-rose-500' : 'bg-emerald-500'
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools summary */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold flex items-center gap-2"><Wrench className="w-4 h-4 text-blue-500" /> Tools Summary</h2>
          <Link href="/admin/tools" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Manage all tools →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {ACTIVE_CATEGORIES.map(category => {
            const count = TOOLS.filter(t => t.categorySlug === category.slug).length
            const trending = TOOLS.filter(t => t.categorySlug === category.slug && t.tags.includes('trending')).length
            return (
              <div key={category.slug} className="bg-muted/50 rounded-xl p-3">
                <p className="text-lg font-black">{count}</p>
                <p className="text-xs font-semibold capitalize">{category.slug}</p>
                <p className="text-xs text-orange-500">{trending > 0 && `${trending} trending`}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
