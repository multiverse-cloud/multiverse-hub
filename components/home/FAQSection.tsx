'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Is Multiverse completely free?',
    a: 'Yes. The core tool library and marketplace browsing are free to use. No payment is required for the main public experience.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account is needed for most tools. You can browse and use the main public experience without signing in.',
  },
  {
    q: 'Are my uploaded files stored?',
    a: 'No. Files are processed in the browser when possible, or removed from temporary server storage shortly after processing.',
  },
  {
    q: 'How many tools are available?',
    a: 'There are more than 150 tools across PDF, image, video, audio, text, developer, SEO, calculator, and file categories.',
  },
  {
    q: 'Can I save my favourite tools?',
    a: 'Yes. Sign in to save favourites, sync your profile, and unlock account-based convenience across supported parts of the platform.',
  },
  {
    q: 'Can I use Multiverse on mobile?',
    a: 'Yes. The platform is responsive and built to work well across phones, tablets, and desktop screens.',
  },
  {
    q: 'What calculators are included?',
    a: 'The calculator suite includes finance, health, date, timezone, conversion, tax, and nutrition calculators with modern live workspaces.',
  },
  {
    q: 'What is the Marketplace?',
    a: 'The Marketplace offers premium templates, starter kits, and courses, with product delivery through Gumroad or Lemon Squeezy.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-16 md:py-20 subtle-surface">
      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        <div className="section-header">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Common Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="bg-card border border-border rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-4',
                    open === i && 'rotate-180'
                  )}
                />
              </button>

              {open === i && (
                <div className="px-5 pb-4 pt-3 border-t border-border text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
