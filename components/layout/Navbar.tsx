import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import {
  Bot,
  Calculator,
  ChevronDown,
  Clapperboard,
  Code2,
  Compass,
  FileText,
  Globe,
  GraduationCap,
  Home,
  House,
  Image,
  Menu,
  Music,
  Paintbrush,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Type,
  Video,
  Wrench,
  Zap,
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { cn } from '@/lib/utils'

type MegaMenuItem = {
  name: string
  href: string
  icon: typeof House
  desc: string
}

type NavLink = {
  name: string
  href: string
  icon: typeof House
  megaItems?: MegaMenuItem[]
}

const TOOL_MEGA_MENU_ITEMS: MegaMenuItem[] = [
  { name: 'PDF Tools', href: '/tools/pdf', icon: FileText, desc: 'Convert, merge, compress' },
  { name: 'Image Tools', href: '/tools/image', icon: Image, desc: 'Resize, crop, convert' },
  { name: 'Video Tools', href: '/tools/video', icon: Video, desc: 'Downloader, convert, trim' },
  { name: 'Audio Tools', href: '/tools/audio', icon: Music, desc: 'Edit, convert, record' },
  { name: 'Text Tools', href: '/tools/text', icon: Type, desc: 'Format, analyze, convert' },
  { name: 'Dev Tools', href: '/tools/dev', icon: Code2, desc: 'JSON, Base64, regex' },
  { name: 'SEO Tools', href: '/tools/seo', icon: Search, desc: 'Meta, keywords, sitemap' },
  { name: 'Calculators', href: '/tools/calculator', icon: Calculator, desc: 'EMI, BMI, currency' },
  { name: 'AI Tools', href: '/tools/ai', icon: Bot, desc: 'Summarize, translate, write' },
]

const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Tools', href: '/tools', icon: Wrench, megaItems: TOOL_MEGA_MENU_ITEMS },
  {
    name: 'AI',
    href: '/ai',
    icon: Bot,
    megaItems: [
      { name: 'AI Hub', href: '/ai', icon: Bot, desc: 'Prompts, chat, and creative workflows' },
      { name: 'AI Tools', href: '/tools/ai', icon: Sparkles, desc: 'Summarize, translate, and write' },
      { name: 'AI Image Generator', href: '/tools/ai/ai-image-generator', icon: Image, desc: 'Generate visuals from prompts' },
    ],
  },
  {
    name: 'Design',
    href: '/design',
    icon: Paintbrush,
    megaItems: [
      { name: 'Design AI', href: '/design', icon: Paintbrush, desc: 'Layouts, assets, and visual ideas' },
      { name: 'Image Tools', href: '/tools/image', icon: Image, desc: 'Resize, crop, and remove backgrounds' },
      { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag, desc: 'Templates and polished UI kits' },
    ],
  },
  {
    name: 'Entertainment',
    href: '/entertainment',
    icon: Clapperboard,
    megaItems: [
      { name: 'Entertainment', href: '/entertainment', icon: Clapperboard, desc: 'Movies, TV, and OTT picks' },
      { name: 'Video Tools', href: '/tools/video', icon: Video, desc: 'Download, convert, and trim' },
      { name: 'Audio Tools', href: '/tools/audio', icon: Music, desc: 'Transcribe, convert, and edit' },
    ],
  },
  {
    name: 'Learn',
    href: '/learn',
    icon: GraduationCap,
    megaItems: [
      { name: 'Learn Universe', href: '/learn', icon: GraduationCap, desc: 'Study workflows and learning helpers' },
      { name: 'Text Tools', href: '/tools/text', icon: Type, desc: 'Notes, formatting, and text cleanup' },
      { name: 'AI Summarizer', href: '/tools/ai/ai-summarizer', icon: Sparkles, desc: 'Turn long material into quick notes' },
    ],
  },
  {
    name: 'Dev',
    href: '/dev',
    icon: Code2,
    megaItems: [
      { name: 'Dev Universe', href: '/dev', icon: Code2, desc: 'Utilities for developers and builders' },
      { name: 'Dev Tools', href: '/tools/dev', icon: Code2, desc: 'JSON, regex, hashes, and formatters' },
      { name: 'SEO Tools', href: '/tools/seo', icon: Search, desc: 'Meta tags, sitemaps, and previews' },
    ],
  },
  {
    name: 'Discover',
    href: '/discover',
    icon: Compass,
    megaItems: [
      { name: 'Discover', href: '/discover', icon: Compass, desc: 'Curated lists and ranked picks' },
      { name: 'Daily Tools', href: '/daily', icon: Calculator, desc: 'Useful calculators and daily helpers' },
      { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag, desc: 'Templates and digital products' },
    ],
  },
  {
    name: 'Marketplace',
    href: '/marketplace',
    icon: ShoppingBag,
    megaItems: [
      { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag, desc: 'Products, templates, and starter kits' },
      { name: 'SaaS Dashboard Pro', href: '/marketplace/saas-dashboard-pro', icon: Sparkles, desc: 'Premium admin dashboard template' },
      { name: 'Fullstack Auth Starter', href: '/marketplace/fullstack-auth-starter', icon: Code2, desc: 'Starter project with auth and app shell' },
    ],
  },
]

function MegaMenu({ link }: { link: NavLink }) {
  if (!link.megaItems?.length) {
    return null
  }

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[540px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 opacity-0 shadow-[0_22px_44px_-28px_rgba(15,23,42,0.22)] transition-all duration-200 dark:border-slate-800 dark:bg-slate-900',
        'translate-y-2 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100',
        'group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100'
      )}
    >
      <div className="grid grid-cols-3 gap-2">
        {link.megaItems.map(item => {
          const ItemIcon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className="group/item flex items-start gap-2.5 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/70"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40">
                <ItemIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 transition-colors group-hover/item:text-indigo-600 dark:text-slate-100 dark:group-hover/item:text-indigo-300">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-2 border-t border-slate-200 pt-2 dark:border-slate-800">
        <Link
          href={link.href}
          className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          <Zap className="h-3.5 w-3.5" />
          View {link.name.toLowerCase()}
        </Link>
      </div>
    </div>
  )
}

export default function Navbar() {
  const clerkEnabled = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  )

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/88 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/88 dark:shadow-[0_12px_26px_-20px_rgba(2,6,23,0.55)]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 lg:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 shadow-md shadow-slate-900/10 transition-shadow group-hover:shadow-slate-900/20 dark:bg-slate-100">
            <Globe className="h-4 w-4 text-white dark:text-slate-950" />
          </div>
          <span className="hidden font-display text-lg font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:block">
            Multiverse
          </span>
        </Link>

        <form action="/tools" method="get" className="relative mx-auto hidden max-w-xl flex-1 lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            name="q"
            placeholder="Search the Multiverse..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground hover:border-indigo-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700"
          />
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <ThemeToggle />

          {clerkEnabled ? (
            <>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="hidden items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/30 sm:flex"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Sign In
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="hidden sm:flex">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="hidden items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/30 sm:flex"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Sign In
            </Link>
          )}

          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 [&::-webkit-details-marker]:hidden">
              <Menu className="h-4 w-4" />
            </summary>

            <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_44px_-28px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
              <form action="/tools" method="get" className="border-b border-slate-200 p-4 dark:border-slate-800">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search tools"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900"
                  />
                </div>
              </form>

              <nav className="space-y-1 p-3">
                {NAV_LINKS.map(link => {
                  const Icon = link.icon

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-900"
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  )
                })}
              </nav>

              <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                {clerkEnabled ? (
                  <>
                    <SignedOut>
                      <Link
                        href="/sign-in"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                      >
                        <Sparkles className="h-4 w-4" />
                        Sign In
                      </Link>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex justify-center">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </SignedIn>
                  </>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </details>
        </div>
      </div>

      <div className="hidden border-t border-slate-200/70 dark:border-slate-800/70 lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-2.5">
          <div />

          <div className="flex items-center justify-center gap-1">
            {NAV_LINKS.map(link => {
              const Icon = link.icon

              if (link.megaItems?.length) {
                return (
                  <div key={link.name} className="group relative">
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-900"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.name}
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                    </Link>

                    <MegaMenu link={link} />
                  </div>
                )
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-900"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center justify-end gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-indigo-500 text-indigo-500 dark:fill-indigo-300 dark:text-indigo-300" />
              150+ tools
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
