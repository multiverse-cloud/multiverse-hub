import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the mtverse Terms of Service. Public tools, templates, prompts, and guides are free to use without a public account.',
  alternates: { canonical: 'https://mtverse.dev/terms' },
}

const LAST_UPDATED = 'April 21, 2026'

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing or using mtverse ("the Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the Service. These terms apply to all visitors, users, and anyone who accesses the Service.',
    },
    {
      title: 'Use of Service',
      content: 'mtverse grants you a personal, non-exclusive, non-transferable, revocable licence to use the Service for lawful purposes. You may use the tools for personal or commercial projects without restriction, as long as your use complies with these terms and applicable law. We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice.',
    },
    {
      title: 'Intellectual Property',
      content: 'The mtverse name, logo, design, and all original content on this platform are owned by or licenced to mtverse. You retain full ownership of any files you upload or content you create using the Service. We make no claim over your files or output. Open-source libraries used by the Service are subject to their respective licences.',
    },
    {
      title: 'Disclaimer of Warranties',
      content: 'The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses. Tool output (such as compressed files, formatted code, or converted documents) is provided without guarantee of accuracy or fitness for a particular purpose. Use output at your own discretion.',
    },
    {
      title: 'Limitation of Liability',
      content: 'To the fullest extent permitted by law, mtverse and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service, including data loss, file corruption, or loss of business. Your sole remedy for dissatisfaction with the Service is to stop using it.',
    },
    {
      title: 'Prohibited Uses',
      content: 'You agree not to use the Service to: (a) upload or process illegal, harmful, or infringing content; (b) attempt to reverse-engineer, scrape, or attack the platform; (c) distribute malware or engage in any activity that disrupts the Service for others; (d) use the Service to violate any applicable local, national, or international law or regulation.',
    },
    {
      title: 'Changes to Terms',
      content: 'We may revise these Terms of Service from time to time. When we do, we will update the date at the bottom of this page. Continued use of the Service after any changes constitutes your acceptance of the revised terms. We encourage you to review this page periodically.',
    },
    {
      title: 'Governing Law',
      content: 'These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising from your use of the Service shall be resolved in good faith. If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.',
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
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Plain English, no legalese. These terms govern your use of mtverse. They are designed to be fair and transparent.
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
            Questions about these terms? Email us at{' '}
            <a href="mailto:hello@mtverse.dev" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
              hello@mtverse.dev
            </a>
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}
