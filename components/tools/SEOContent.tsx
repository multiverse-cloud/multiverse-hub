import { CheckCircle2, HelpCircle, Lightbulb, ShieldCheck } from 'lucide-react'
import type { Tool } from '@/lib/tools-data'

const TOOL_SEO_COPY: Record<
  string,
  {
    heading: string
    steps: string[]
    faqs: Array<{ q: string; a: string }>
    valueTitle: string
    valueDescription: string
  }
> = {
  'file-hash-checker': {
    heading: 'How to check a file hash online',
    steps: [
      'Upload the file you want to verify. Any common file type can be checked.',
      'Paste the expected checksum if you have one from a download page or release note.',
      'Run the checker to calculate SHA-256, SHA-512, SHA-1, and MD5 hashes.',
      'Compare the generated hash with the expected value to confirm the file integrity.',
    ],
    faqs: [
      {
        q: 'What is a file hash checker?',
        a: 'A file hash checker creates a unique checksum for a file. If even one byte changes, the SHA-256, SHA-512, SHA-1, or MD5 value changes too.',
      },
      {
        q: 'Can I check SHA-256 and MD5 for the same file?',
        a: 'Yes. mtverse shows SHA-256, SHA-512, SHA-1, and MD5 hashes together so you can verify downloads from different sources.',
      },
      {
        q: 'How do I verify a download?',
        a: 'Copy the official checksum, paste it into the expected hash field, upload your file, and run the checker. The result will show whether it matched.',
      },
      {
        q: 'Is the file hash checker free?',
        a: 'Yes. The file hash checker is free to use and does not require a public account.',
      },
    ],
    valueTitle: 'Verify downloads with confidence',
    valueDescription:
      'Use SHA-256 for modern verification, SHA-512 for stronger fingerprints, and MD5 or SHA-1 when older software still publishes those checksum formats.',
  },
  'qr-code-generator': {
    heading: 'How to create a free QR code',
    steps: [
      'Enter the link, text, or value you want to turn into a QR code.',
      'Preview the generated QR code on the page.',
      'Download the QR code image and use it in print, posts, pages, or packaging.',
      'Test the QR code with your phone camera before publishing it.',
    ],
    faqs: [
      {
        q: 'Is the QR code generator free?',
        a: 'Yes. You can create and download QR codes from mtverse without a public account.',
      },
      {
        q: 'What can I put inside a QR code?',
        a: 'You can create QR codes for links, plain text, contact details, landing pages, and other short shareable content.',
      },
      {
        q: 'Can I use the QR code for business?',
        a: 'Yes. Download the QR code and use it wherever you need quick access to a URL or short piece of information.',
      },
      {
        q: 'Why search for QR Verse?',
        a: 'QR Verse is a simple way to find the mtverse QR tool for creating free QR codes online.',
      },
    ],
    valueTitle: 'Simple QR codes for links and sharing',
    valueDescription:
      'Create a clean QR code, preview it instantly, and download it for web pages, posters, social posts, product inserts, or internal workflows.',
  },
}

export default function SEOContent({ tool }: { tool: Tool }) {
  const toolCopy = TOOL_SEO_COPY[tool.slug]
  // Generate generic steps based on input type
  const getSteps = () => {
    if (toolCopy) return toolCopy.steps

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
  const faqs = toolCopy?.faqs || [
    {
      q: `How do I use ${tool.name}?`,
      a: `Simply upload your input, adjust settings if needed, and click the process button. mtverse returns the result in a clean output panel.`
    },
    {
      q: `Is this ${tool.name} tool free?`,
      a: `Yes, all tools on mtverse are 100% free to use. No registration or credit card is required to access professional utility features.`
    },
    {
      q: `Is my data secure?`,
      a: `We keep public tools simple and temporary. Browser-capable tasks run locally where possible; server-processed files are handled only for the active request and are not saved to public user accounts.`
    },
    {
      q: `Does it work for email and chat apps?`,
      a: `Yes! You can use the ${tool.name} to optimize files for email, Discord, team chat, and other platforms by matching size and format requirements.`
    }
  ]

  return (
    <div className="mt-12 hidden md:block space-y-12 border-t border-slate-200 pt-12 dark:border-slate-800">
      {/* How-to Guide */}
      <section className="space-y-8">
        <div>
          <p className="premium-kicker">Step-by-step guide</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            {toolCopy?.heading || `How to use ${tool.name}`}
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
            <h3 className="font-display text-xl font-bold">{toolCopy?.valueTitle || 'Privacy First'}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {toolCopy?.valueDescription || 'mtverse keeps public tools lightweight and temporary, with browser-first processing where possible and no public account history.'}
            </p>
          </div>
          <div className="space-y-4">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            <h3 className="font-display text-xl font-bold">100% Free Forever</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No subscriptions, no hidden fees, and no limits. mtverse provides professional-grade tools for everyone at zero cost.
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
