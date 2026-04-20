import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Multiverse Tools handles your data. We process files locally in your browser — nothing is stored on our servers.',
  alternates: { canonical: 'https://multiverse-tools.vercel.app/privacy' },
}

const LAST_UPDATED = 'April 20, 2026'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Data We Collect',
      content: 'Multiverse Tools is designed with privacy as a core principle. Most tools process files entirely in your browser using client-side JavaScript — no data is sent to our servers. For tools that require server processing (such as PDF compression, image processing, and video downloading), files are processed and immediately discarded. We do not store, log, or retain uploaded files.',
    },
    {
      title: 'Local Storage',
      content: 'We use your browser localStorage only for essential interface preferences such as light or dark theme. This data never leaves your device and is not transmitted to any server.',
    },
    {
      title: 'Analytics',
      content: 'We use Vercel Speed Insights for anonymous performance monitoring. This collects aggregated, anonymized metrics (page load times, Core Web Vitals) with no personally identifiable information.',
    },
    {
      title: 'Cookies',
      content: 'We use minimal session cookies only where technically necessary (such as for admin authentication). We do not use tracking cookies, advertising cookies, or third-party analytics cookies.',
    },
    {
      title: 'Third-Party Services',
      content: 'Some tools optionally use third-party APIs: OpenRouter for AI features (when API key is configured), and QR Server for QR code generation (no personal data sent). These services have their own privacy policies.',
    },
    {
      title: 'Your Rights',
      content: 'Since we do not store personal data, there is nothing to delete or export. If you have questions, contact us at the email in the footer. For EU/EEA users: our lawful basis for any processing is legitimate interests, and you have rights under GDPR to access, rectify, and erase any data we hold.',
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this policy occasionally. Changes will be reflected on this page with an updated date. Continued use of the service after changes constitutes acceptance.',
    },
  ]

  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mb-10">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
            Legal
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Your privacy matters. Multiverse Tools is built to process your files locally whenever possible — we believe your data should stay yours.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-3 font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                {section.title}
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-indigo-200/60 bg-indigo-50/50 p-6 dark:border-indigo-800/30 dark:bg-indigo-950/20">
          <p className="text-sm text-muted-foreground">
            Questions about this policy? Email us at{' '}
            <a href="mailto:hello@multiverse-tools.vercel.app" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
              hello@multiverse-tools.vercel.app
            </a>
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}
