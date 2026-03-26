import Link from 'next/link'
import { Github, Globe, Mail, Twitter, Youtube } from 'lucide-react'
import NewsletterSignup from './NewsletterSignup'

const COPYRIGHT_YEAR = 2026

const FOOTER_LINKS = {
  Universes: [
    { name: 'Tools Universe', href: '/tools' },
    { name: 'AI Hub', href: '/ai' },
    { name: 'Design AI', href: '/design' },
    { name: 'Learn', href: '/learn' },
    { name: 'Discover', href: '/discover' },
    { name: 'Daily Tools', href: '/daily' },
  ],
  'Dev & Daily': [
    { name: 'Dev Tools', href: '/dev' },
    { name: 'Daily Tools', href: '/daily' },
    { name: 'Marketplace', href: '/marketplace' },
  ],
  'Popular Tools': [
    { name: 'All-in-One Downloader', href: '/tools/video/all-in-one-video-downloader' },
    { name: 'Merge PDF', href: '/tools/pdf/merge-pdf' },
    { name: 'Compress Image', href: '/tools/image/compress-image' },
    { name: 'AI Summarizer', href: '/tools/ai/ai-summarizer' },
    { name: 'JSON Formatter', href: '/tools/dev/json-formatter' },
    { name: 'QR Code Generator', href: '/tools/image/qr-code-generator' },
  ],
  'Tool Collections': [
    { name: 'All Tools', href: '/tools' },
    { name: 'PDF Tools', href: '/tools/pdf' },
    { name: 'Image Tools', href: '/tools/image' },
    { name: 'Video Tools', href: '/tools/video' },
    { name: 'Dev Tools', href: '/tools/dev' },
    { name: 'AI Tools', href: '/tools/ai' },
  ],
}

export default function Footer() {
  return (
    <footer className="premium-shell border-t border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950">
      <div className="border-b border-slate-200/80 bg-slate-50/80 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
              Product Updates
            </div>
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">Subscribe for updates</h2>
            <p className="text-muted-foreground">Product updates, new tools, and release notes.</p>

            <NewsletterSignup />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 shadow-lg shadow-slate-900/15 dark:bg-slate-100">
                <Globe className="h-4 w-4 text-white dark:text-slate-950" />
              </div>
              <span className="font-display text-lg font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Multiverse</span>
            </Link>

            <p className="max-w-xs text-sm text-muted-foreground">
              A unified platform for tools, AI, learning, and digital products.
            </p>

            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Youtube, href: '#', label: 'YouTube' },
                { icon: Mail, href: '/contact', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 text-muted-foreground transition-colors hover:border-indigo-300 hover:text-foreground dark:border-slate-800 dark:hover:border-slate-700"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h3 className="text-sm font-semibold">{section}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Copyright {COPYRIGHT_YEAR} Multiverse Tools
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-foreground">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
