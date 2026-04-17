import {
  LayoutDashboard,
  LayoutTemplate,
  LockKeyhole,
  MonitorSmartphone,
  ShoppingBag,
  Smartphone,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import TemplateLivePreview from '@/components/templates/TemplateLivePreview'
import type { TemplateCategoryId, TemplateEntry } from '@/lib/template-library-data'
import { cn } from '@/lib/utils'

const CATEGORY_TONES: Record<TemplateCategoryId, string> = {
  landing: 'border-sky-200/80 bg-sky-50/90 text-sky-700 dark:border-sky-900/40 dark:bg-sky-950/20 dark:text-sky-300',
  dashboard: 'border-indigo-200/80 bg-indigo-50/90 text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/20 dark:text-indigo-300',
  auth: 'border-violet-200/80 bg-violet-50/90 text-violet-700 dark:border-violet-900/40 dark:bg-violet-950/20 dark:text-violet-300',
  mobile: 'border-emerald-200/80 bg-emerald-50/90 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300',
  ecommerce: 'border-amber-200/80 bg-amber-50/90 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300',
  portfolio: 'border-pink-200/80 bg-pink-50/90 text-pink-700 dark:border-pink-900/40 dark:bg-pink-950/20 dark:text-pink-300',
  pricing: 'border-cyan-200/80 bg-cyan-50/90 text-cyan-700 dark:border-cyan-900/40 dark:bg-cyan-950/20 dark:text-cyan-300',
  onboarding: 'border-rose-200/80 bg-rose-50/90 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300',
  agency: 'border-fuchsia-200/80 bg-fuchsia-50/90 text-fuchsia-700 dark:border-fuchsia-900/40 dark:bg-fuchsia-950/20 dark:text-fuchsia-300',
  crypto: 'border-lime-200/80 bg-lime-50/90 text-lime-700 dark:border-lime-900/40 dark:bg-lime-950/20 dark:text-lime-300',
  education: 'border-blue-200/80 bg-blue-50/90 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-300',
  fitness: 'border-orange-200/80 bg-orange-50/90 text-orange-700 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-300',
  healthcare: 'border-teal-200/80 bg-teal-50/90 text-teal-700 dark:border-teal-900/40 dark:bg-teal-950/20 dark:text-teal-300',
  'real-estate': 'border-stone-200/80 bg-stone-50/90 text-stone-700 dark:border-stone-900/40 dark:bg-stone-950/20 dark:text-stone-300',
  restaurant: 'border-red-200/80 bg-red-50/90 text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300',
  saas: 'border-slate-200/80 bg-slate-50/90 text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300',
  badges: 'border-purple-200/80 bg-purple-50/90 text-purple-700 dark:border-purple-900/40 dark:bg-purple-950/20 dark:text-purple-300',
  buttons: 'border-indigo-200/80 bg-indigo-50/90 text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/20 dark:text-indigo-300',
  cards: 'border-neutral-200/80 bg-neutral-50/90 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950/30 dark:text-neutral-300',
  'data-display': 'border-cyan-200/80 bg-cyan-50/90 text-cyan-700 dark:border-cyan-900/40 dark:bg-cyan-950/20 dark:text-cyan-300',
  footers: 'border-slate-200/80 bg-slate-50/90 text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300',
  forms: 'border-emerald-200/80 bg-emerald-50/90 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300',
  heroes: 'border-sky-200/80 bg-sky-50/90 text-sky-700 dark:border-sky-900/40 dark:bg-sky-950/20 dark:text-sky-300',
  modals: 'border-violet-200/80 bg-violet-50/90 text-violet-700 dark:border-violet-900/40 dark:bg-violet-950/20 dark:text-violet-300',
  navbars: 'border-blue-200/80 bg-blue-50/90 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-300',
  statistics: 'border-amber-200/80 bg-amber-50/90 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300',
  'ui-elements': 'border-zinc-200/80 bg-zinc-50/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/30 dark:text-zinc-300',
}

function getCategoryIcon(category: TemplateCategoryId) {
  switch (category) {
    case 'landing':
      return LayoutTemplate
    case 'dashboard':
      return LayoutDashboard
    case 'auth':
      return LockKeyhole
    case 'mobile':
      return Smartphone
    case 'ecommerce':
      return ShoppingBag
    case 'portfolio':
      return MonitorSmartphone
    case 'pricing':
      return WalletCards
    case 'onboarding':
      return Sparkles
    default:
      return LayoutTemplate
  }
}

function shortCategoryLabel(template: TemplateEntry) {
  return template.categoryTitle.replace(' Pages', '').replace(' UI', '').replace(' Sites', '')
}

export default function TemplatePreviewSurface({
  template,
  compact = false,
  className,
}: {
  template: TemplateEntry
  compact?: boolean
  className?: string
}) {
  const CategoryIcon = getCategoryIcon(template.category)

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[18px] border border-border bg-card',
        compact
          ? 'transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:border-slate-700'
          : 'shadow-sm',
        className
      )}
    >
      <div className={cn('absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3', compact ? 'p-3' : 'p-4')}>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-sm backdrop-blur',
              CATEGORY_TONES[template.category]
            )}
          >
            <CategoryIcon className="h-3 w-3" />
            {shortCategoryLabel(template)}
          </span>
          {template.featured ? (
            <span className="inline-flex rounded-xl border border-border bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm backdrop-blur">
              Featured
            </span>
          ) : null}
        </div>
        <span className="inline-flex rounded-xl border border-border bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-sm backdrop-blur">
          {template.priceLabel}
        </span>
      </div>

      <div className={cn(compact ? 'p-3 pt-11' : 'p-4 pt-14 md:p-5 md:pt-16')}>
        <TemplateLivePreview template={template} compact={compact} />
      </div>
    </div>
  )
}
