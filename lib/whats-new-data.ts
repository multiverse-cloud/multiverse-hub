import { SITE_METRICS } from '@/lib/site-metrics'

export type WhatsNewItem = {
  title: string
  detail: string
  href?: string
}

export type WhatsNewRelease = {
  id: string
  date: string
  title: string
  summary: string
  status: 'Live' | 'Improved' | 'Ready'
  items: WhatsNewItem[]
}

export const WHATS_NEW_RELEASES: WhatsNewRelease[] = [
  {
    id: 'launch-readiness',
    date: 'April 28, 2026',
    title: 'Production readiness pass',
    summary: 'Cleaner public UX, safer env setup, stronger language support, and a clearer launch checklist before custom domain setup.',
    status: 'Live',
    items: [
      {
        title: 'Newsletter + feedback flow',
        detail: 'Footer signup now accepts name, email, and optional feedback through the EmailJS route.',
        href: '/feedback',
      },
      {
        title: 'Website language switcher',
        detail: 'Language selector moved beside theme controls with a cleaner dropdown and CSP support for page translation.',
      },
      {
        title: 'Admin-only auth cleanup',
        detail: 'Public auth and Clerk env leftovers were removed while keeping the protected admin panel intact.',
        href: '/admin-login',
      },
    ],
  },
  {
    id: 'library-scale',
    date: 'April 2026',
    title: 'Library scale-up',
    summary: `The public library now highlights ${SITE_METRICS.ui.shortLabel}, ${SITE_METRICS.templates.shortLabel}, and ${SITE_METRICS.prompts.shortLabel}.`,
    status: 'Improved',
    items: [
      {
        title: 'UI Universe expansion',
        detail: 'Application components, HyperUI-style previews, imported UI blocks, and detail pages were merged into one library surface.',
        href: '/ui',
      },
      {
        title: 'Template Universe growth',
        detail: 'More website templates now include live preview, Cloudinary preview images, and GitHub download links.',
        href: '/templates',
      },
      {
        title: 'Prompt Hub cleanup',
        detail: 'Prompt cards and detail pages are lighter, image-first, and easier to browse on mobile.',
        href: '/prompts',
      },
    ],
  },
  {
    id: 'traffic-surfaces',
    date: 'April 2026',
    title: 'SEO surfaces for traffic',
    summary: `More long-tail pages are now available across tools, templates, discover guides, and fixes.`,
    status: 'Ready',
    items: [
      {
        title: 'Tool page improvements',
        detail: 'Tool pages now use tighter mobile workspaces, clearer action states, and stronger related-tool linking.',
        href: '/tools',
      },
      {
        title: 'Discover and fixes growth',
        detail: `${SITE_METRICS.discover.shortLabel} and ${SITE_METRICS.fixes.shortLabel} create stronger internal linking and search coverage.`,
        href: '/discover',
      },
      {
        title: 'Sitemap and canonical coverage',
        detail: 'Public content routes are included in the sitemap with stable canonical URLs for indexing.',
        href: '/sitemap.xml',
      },
    ],
  },
]

export const DOMAIN_READINESS_CHECKS = [
  'Set NEXT_PUBLIC_SITE_URL to the final domain before launch.',
  'Update Vercel production env keys and remove old Clerk/public AI keys there too.',
  'Add the domain in Vercel, then verify Search Console and submit sitemap.xml.',
  'Keep AdSense disabled until eligibility review is ready.',
]
