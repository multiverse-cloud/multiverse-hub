import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how mtverse handles your data. We process files locally in your browser whenever possible and avoid public tracking cookies.',
  alternates: { canonical: 'https://www.mtverse.dev/privacy' },
}

const LAST_UPDATED = 'April 28, 2026'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Data We Collect',
      content: 'mtverse is designed with privacy as a core principle. Most tools process files entirely in your browser using client-side JavaScript. For tools that require server processing, files are processed for the requested task and are not intentionally stored as user records.',
    },
    {
      title: 'Local Storage',
      content: 'We use your browser localStorage only for essential interface preferences such as light or dark theme and your selected site language.',
    },
    {
      title: 'Analytics',
      content: 'We use Vercel Speed Insights for privacy-conscious performance monitoring. It helps us understand Core Web Vitals and speed issues without adding advertising cookies or public user accounts.',
    },
    {
      title: 'Cookies',
      content: 'Public visitors do not need an account. We use a secure session cookie only for the protected admin panel. If you choose a non-English language, Google Translate may set a googtrans preference cookie so the site can stay translated across pages.',
    },
    {
      title: 'Third-Party Services',
      content: 'Some tools optionally use third-party APIs: OpenRouter for AI features (when API key is configured), EmailJS for newsletter and feedback messages, QR Server for QR code generation, and Google Translate only when you choose to translate the website. These services have their own privacy policies.',
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
            Your privacy matters. mtverse is built to process your files locally whenever possible because your data should stay yours.
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
            <a href="mailto:hello@mtverse.dev" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
              hello@mtverse.dev
            </a>
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}
