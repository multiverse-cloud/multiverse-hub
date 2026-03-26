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
    <div className="space-y-8 max-w-screen-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p className="premium-kicker">Admin Panel</p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm">Welcome back, Admin. Here's what's happening across the Multiverse.</p>
        </div>
        <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-full px-4 py-2 shadow-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          All systems operational
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="group relative bg-card border border-border rounded-[24px] p-6 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-300 dark:hover:border-slate-700">
              <div className="absolute -inset-px bg-gradient-to-b from-transparent to-slate-100/50 dark:to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start justify-between mb-4">
                <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110', stat.bg)}>
                  <Icon className={cn('w-5 h-5', stat.color)} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-500 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <div className="relative space-y-1">
                <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Universe toggles */}
        <div className="lg:col-span-1 bg-card border border-border rounded-[24px] overflow-hidden flex flex-col shadow-sm">
          <div className="p-5 border-b border-border bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
            <h2 className="font-bold flex items-center gap-2"><Globe2 className="w-4 h-4 text-indigo-500" /> Universes</h2>
            <Link href="/admin/universes" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Manage →</Link>
          </div>
          <div className="p-2 space-y-1 flex-1 overflow-y-auto">
            {UNIVERSES.map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${universeToggles[u.id] ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-slate-300 dark:bg-slate-700'}`} />
                  <span className="text-sm font-semibold">{u.name}</span>
                </div>
                <button
                  onClick={() => setUniverseToggles(prev => ({ ...prev, [u.id]: !prev[u.id] }))}
                  className="text-muted-foreground hover:text-foreground transition-all hover:scale-105"
                >
                  {universeToggles[u.id]
                    ? <ToggleRight className="w-7 h-7 text-indigo-600 dark:text-indigo-500" />
                    : <ToggleLeft className="w-7 h-7 text-slate-300 dark:text-slate-600" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Status */}
        <div className="lg:col-span-1 bg-card border border-border rounded-[24px] overflow-hidden flex flex-col shadow-sm">
          <div className="p-5 border-b border-border bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
            <h2 className="font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-violet-500" /> API Status</h2>
            <Link href="/admin/api-status" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Details →</Link>
          </div>
          <div className="p-5 space-y-4">
            {API_STATUS.map(api => (
              <div key={api.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 drop-shadow-sm" />
                  <span className="text-sm font-medium">{api.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">{api.latency}</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto px-5 pb-5 pt-4 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground flex items-center gap-2"><Wrench className="w-3 h-3" /> Config stored in <code className="bg-card border border-border px-1.5 py-0.5 rounded font-mono text-[10px]">.env.local</code></p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-card border border-border rounded-[24px] overflow-hidden flex flex-col shadow-sm">
          <div className="p-5 border-b border-border bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
            <h2 className="font-bold flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" /> Recent Activity</h2>
          </div>
          <div className="p-5 space-y-5">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="relative flex items-start gap-4 before:absolute before:inset-y-0 before:left-2 before:-ml-px before:w-0.5 before:bg-border last:before:hidden">
                <div className={cn('w-4 h-4 rounded-full mt-0.5 shrink-0 z-10 border-2 border-card shadow-sm',
                  item.type === 'tool' ? 'bg-indigo-500' :
                  item.type === 'flag' ? 'bg-orange-500' :
                  item.type === 'product' ? 'bg-rose-500' : 'bg-emerald-500'
                )} />
                <div className="flex-1 min-w-0 -mt-0.5">
                  <p className="text-sm font-semibold text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{item.detail}</p>
                </div>
                <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap bg-muted px-2 py-1 rounded-full">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools summary */}
      <div className="bg-card border border-border rounded-[24px] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <h2 className="font-bold flex items-center gap-2"><Wrench className="w-4 h-4 text-blue-500" /> Tools Distribution</h2>
          <Link href="/admin/tools" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Manage all tools →</Link>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ACTIVE_CATEGORIES.map(category => {
            const count = TOOLS.filter(t => t.categorySlug === category.slug).length
            const trending = TOOLS.filter(t => t.categorySlug === category.slug && t.tags.includes('trending')).length
            return (
              <div key={category.slug} className="group relative bg-muted/40 rounded-[20px] p-4 overflow-hidden border border-transparent hover:border-border transition-colors">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-display text-3xl font-black text-foreground">{count}</p>
                <p className="text-sm font-semibold capitalize text-muted-foreground mt-1">{category.slug}</p>
                {trending > 0 && (
                  <div className="mt-3 inline-flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                    <Zap className="w-3 h-3 fill-orange-500 text-orange-500" />
                    {trending} hot
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
