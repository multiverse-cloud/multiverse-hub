export interface Universe {
  id: string
  name: string
  description: string
  icon: string
  href: string
  gradient: string
  bgGradient: string
  count: string
  color: string
}

export const UNIVERSES: Universe[] = [
  {
    id: 'tools',
    name: 'Tools Universe',
    description: '160+ free tools for every task',
    icon: 'Wrench',
    href: '/tools',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
    count: '160+ Tools',
    color: 'blue',
  },
  {
    id: 'design',
    name: 'Design AI',
    description: 'Generate UI, logos and design assets',
    icon: 'Paintbrush',
    href: '/design',
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20',
    count: '8 Design Tools',
    color: 'pink',
  },
  {
    id: 'ui',
    name: 'UI Universe',
    description: '600+ reusable UI components, patterns, and foundations',
    icon: 'Sparkles',
    href: '/ui',
    gradient: 'from-slate-700 to-slate-900',
    bgGradient: 'from-slate-50 to-zinc-50 dark:from-slate-950/20 dark:to-zinc-950/20',
    count: '600+ UI Items',
    color: 'slate',
  },
  {
    id: 'dev',
    name: 'Dev Universe',
    description: 'JSON, APIs, code and dev utilities',
    icon: 'Code2',
    href: '/dev',
    gradient: 'from-slate-600 to-slate-800',
    bgGradient: 'from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20',
    count: '25+ Dev Tools',
    color: 'slate',
  },
  {
    id: 'daily',
    name: 'Daily Tools',
    description: 'Calculators, converters and everyday utils',
    icon: 'Sun',
    href: '/tools/calculator',
    gradient: 'from-amber-500 to-yellow-500',
    bgGradient: 'from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20',
    count: '15+ Daily Utils',
    color: 'amber',
  },
  {
    id: 'discover',
    name: 'Discover',
    description: 'Top-10 lists, rankings and curated picks',
    icon: 'Compass',
    href: '/discover',
    gradient: 'from-cyan-500 to-teal-600',
    bgGradient: 'from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20',
    count: '400+ Discover Pages',
    color: 'cyan',
  },
  {
    id: 'prompts',
    name: 'Prompt Hub',
    description: 'Premium prompts for ChatGPT, Claude, and image workflows',
    icon: 'Sparkles',
    href: '/prompts',
    gradient: 'from-fuchsia-500 to-pink-600',
    bgGradient: 'from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/20 dark:to-pink-950/20',
    count: '200 Prompts',
    color: 'pink',
  },
  {
    id: 'templates',
    name: 'UI Templates',
    description: 'Premium downloadable UI template kits with live preview and code bundles',
    icon: 'LayoutTemplate',
    href: '/templates',
    gradient: 'from-cyan-500 to-sky-600',
    bgGradient: 'from-cyan-50 to-sky-50 dark:from-cyan-950/20 dark:to-sky-950/20',
    count: '100+ Templates',
    color: 'cyan',
  },
  {
    id: 'fixes',
    name: 'Fixes Universe',
    description: 'Troubleshoot phones, PCs, apps and Wi-Fi',
    icon: 'ShieldAlert',
    href: '/fixes',
    gradient: 'from-orange-500 to-rose-600',
    bgGradient: 'from-orange-50 to-rose-50 dark:from-orange-950/20 dark:to-rose-950/20',
    count: '150+ Fix Guides',
    color: 'orange',
  },
]
