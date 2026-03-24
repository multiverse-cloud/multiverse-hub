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
    description: '150+ free tools for every task',
    icon: 'Wrench',
    href: '/tools',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
    count: '150+ Tools',
    color: 'blue',
  },
  {
    id: 'ai',
    name: 'AI Hub',
    description: 'Chat, create and generate with AI',
    icon: 'Bot',
    href: '/ai',
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20',
    count: '15+ AI Tools',
    color: 'violet',
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
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Movies, TV series and OTT streaming',
    icon: 'Clapperboard',
    href: '/entertainment',
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
    count: '500K+ Titles',
    color: 'orange',
  },
  {
    id: 'learn',
    name: 'Learn Universe',
    description: 'Notes, summaries and study tools',
    icon: 'GraduationCap',
    href: '/learn',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
    count: '12+ Study Tools',
    color: 'emerald',
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
    href: '/daily',
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
    count: '50+ Lists',
    color: 'cyan',
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Templates, projects and digital products',
    icon: 'ShoppingBag',
    href: '/marketplace',
    gradient: 'from-rose-500 to-pink-600',
    bgGradient: 'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20',
    count: '100+ Products',
    color: 'rose',
  },
]
