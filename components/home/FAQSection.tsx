'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Is Multiverse completely free to use?',
    a: 'Yes. Every tool in the library is free to use — no premium paywalls, no credit card required. The full public experience is completely free.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'Not for most tools. You can use any tool instantly without signing up. Creating an account unlocks extras like saving favourites and syncing preferences across devices.',
  },
  {
    q: 'Are my files stored on your servers?',
    a: 'No. Most tools process files directly in your browser. For tools that require server processing, files are removed from temporary storage immediately after processing completes.',
  },
  {
    q: 'How many tools are available?',
    a: 'Over 150 tools across ten categories: PDF, image, video, audio, text, developer, SEO, calculators, file utilities, and more. New tools are added every week.',
  },
  {
    q: 'Can I save my favourite tools?',
    a: 'Yes. Sign in to save favourites and access them from your personal library. Your preferences sync across all your devices.',
  },
  {
    q: 'Does Multiverse work on mobile?',
    a: 'Absolutely. Every tool is responsive and built to work on phones, tablets, and desktops. The experience adapts to your screen size.',
  },
  {
    q: 'What kind of tools are included?',
    a: 'Everything from PDF merging and image compression to video downloading, JSON formatting, QR code generation, BMI calculators, and more. If you need a tool for daily work, we probably have it.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="subtle-surface py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <div className="section-header">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-sub">Quick answers to common questions about Multiverse.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <div
                key={faq.q}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-card transition-all duration-300',
                  isOpen
                    ? 'border-indigo-200/60 shadow-sm dark:border-indigo-800/30'
                    : 'border-border hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {faq.q}
                  <ChevronDown
                    className={cn(
                      'ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300',
                      isOpen && 'rotate-180 text-indigo-500'
                    )}
                  />
                </button>

                <div
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border px-5 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
