'use client'

import React from 'react'
import { CheckCircle2, HelpCircle, Lightbulb, ShieldCheck } from 'lucide-react'
import type { Tool } from '@/lib/tools-data'

export default function SEOContent({ tool }: { tool: Tool }) {
  // Generate generic steps based on input type
  const getSteps = () => {
    const steps = []
    if (tool.inputType === 'file') {
      steps.push(`Select your ${tool.acceptedFormats?.join('/') || 'file'} and upload it to our secure workspace.`)
    } else if (tool.inputType === 'text') {
      steps.push(`Paste or type your content into the designated text area above.`)
    } else if (tool.inputType === 'url') {
      steps.push(`Paste the link or URL of the content you want to process.`)
    }

    steps.push(`Configure any optional settings or preferences to match your requirements.`)
    steps.push(`Click the "${tool.name}" button to start the processing instantly.`)

    if (tool.outputType === 'file') {
      steps.push(`Once finished, download your result immediately to your device.`)
    } else {
      steps.push(`Review or copy the generated output directly from the result panel.`)
    }

    return steps
  }

  // Common FAQs with tool-specific context
  const faqs = [
    {
      q: `How do I use ${tool.name}?`,
      a: `Simply upload your input, adjust settings if needed, and click the process button. Our tool handles everything in-browser for maximum speed.`
    },
    {
      q: `Is this ${tool.name} tool free?`,
      a: `Yes, all tools on Multiverse are 100% free to use. No registration or credit card is required to access professional utility features.`
    },
    {
      q: `Is my data secure?`,
      a: `Absolutely. We use WASM-based client-side processing, meaning your files never leave your computer. Processing happens locally on your device for total privacy.`
    },
    {
      q: `Does it work for WhatsApp or Email?`,
      a: `Yes! You can use the ${tool.name} to optimize your files for platforms like WhatsApp, Gmail, Discord, and more by ensuring they meet size and format requirements.`
    }
  ]

  return (
    <div className="mt-12 hidden md:block space-y-12 border-t border-slate-200 pt-12 dark:border-slate-800">
      {/* How-to Guide */}
      <section className="space-y-8">
        <div>
          <p className="premium-kicker">Step-by-step guide</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            How to use {tool.name}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {getSteps().map((step, i) => (
            <div key={i} className="relative rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <span className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 font-display text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
                {i + 1}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800/50 dark:bg-slate-900/30">
              <h3 className="font-display font-bold text-slate-950 dark:text-slate-200">
                {faq.q}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Value */}
      <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white sm:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/15 blur-[100px] -mr-32 -mt-32" />
        <div className="relative grid gap-12 lg:grid-cols-3">
          <div className="space-y-4">
            <ShieldCheck className="h-10 w-10 text-indigo-400" />
            <h3 className="font-display text-xl font-bold">Privacy First</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We never upload your files to our servers. All processing happens locally in your browser using secure WASM and Client-side technology.
            </p>
          </div>
          <div className="space-y-4">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            <h3 className="font-display text-xl font-bold">100% Free Forever</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No subscriptions, no hidden fees, and no limits. Multiverse provides professional-grade tools for everyone at zero cost.
            </p>
          </div>
          <div className="space-y-4">
            <Lightbulb className="h-10 w-10 text-amber-400" />
            <h3 className="font-display text-xl font-bold">Fast & Optimized</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Designed for performance. Whether you are on mobile or desktop, our tools are optimized for the fastest possible results.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
