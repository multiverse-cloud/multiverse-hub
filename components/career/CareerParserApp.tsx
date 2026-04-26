'use client'

import { useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, FileText, ScanText, UploadCloud } from 'lucide-react'
import CareerMiniNav from '@/components/career/CareerMiniNav'
import { parseResumeText } from '@/lib/career/resume-parser'
import { cn } from '@/lib/utils'

const sampleText = `Arun Pandian
Mechanical Engineer
john.doe@email.com
+1 555 123 4567
linkedin.com/in/arun

Summary
Engineer with leadership, analytics, product strategy, testing, and performance experience.

Experience
Nexus AI - Co-Founder and CTO
Built platform infrastructure serving 2M monthly requests with 99.97% uptime.
Reduced latency by 73% and improved automation quality.

Education
Princeton University - PhD in Computer Science

Skills
React, Next.js, TypeScript, Python, AWS, analytics, security, research`

export default function CareerParserApp() {
  const [text, setText] = useState(sampleText)
  const [notice, setNotice] = useState('')
  const result = useMemo(() => parseResumeText(text), [text])

  async function handleFile(file?: File) {
    if (!file) return

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      setNotice('PDF uploaded. For reliable parsing, copy text from the PDF into the parser or use the import flow to rebuild it in the builder.')
      return
    }

    const content = await file.text()
    setText(content)
    setNotice(`Loaded ${file.name}`)
  }

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <CareerMiniNav active="parser" />
      <main className="mx-auto grid min-h-[calc(100dvh-56px)] max-w-7xl gap-5 px-3 py-4 sm:px-5 lg:grid-cols-[0.95fr_1.05fr] lg:py-6">
        <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Resume Parser</p>
              <h1 className="mt-2 text-2xl font-black tracking-tight">Analyze ATS readiness.</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Paste resume text or upload a text file to extract contact details, sections, keywords, and score.
              </p>
            </div>
            <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950 sm:flex">
              <ScanText className="h-5 w-5" />
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900">
            <UploadCloud className="h-7 w-7 text-blue-600" />
            <span className="mt-3 text-sm font-black">Upload TXT, MD, DOC text export, or PDF</span>
            <span className="mt-1 text-xs text-slate-500">Public tool only. Nothing is stored.</span>
            <input
              type="file"
              className="sr-only"
              accept=".txt,.md,.csv,.pdf"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
          </label>

          {notice ? (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {notice}
            </div>
          ) : null}

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="mt-4 h-[460px] w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-slate-700"
            placeholder="Paste resume text here..."
          />
        </section>

        <section className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black">ATS Score</p>
                <p className="mt-1 text-xs text-slate-500">Structure, keywords, length, and contact coverage</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-blue-600">{result.score}</p>
                <p className="text-xs font-bold text-slate-500">/ 100</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-blue-600" style={{ width: `${result.score}%` }} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {result.signals.map((signal) => (
              <div key={signal.label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md',
                      signal.status === 'strong'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : signal.status === 'ok'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                    )}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-black">{signal.label}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{signal.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <h2 className="font-black">Parsed Resume Data</h2>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
              {[
                ['Name', result.name || 'Not detected'],
                ['Email', result.email || 'Not detected'],
                ['Phone', result.phone || 'Not detected'],
                ['Links', result.links.length ? result.links.join(', ') : 'Not detected'],
                ['Sections', result.sections.length ? result.sections.join(', ') : 'Not detected'],
                ['Keywords', result.keywords.length ? result.keywords.join(', ') : 'Not detected'],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[120px_1fr] border-b border-slate-200 text-sm last:border-b-0 dark:border-slate-800">
                  <div className="bg-slate-50 px-3 py-2 font-bold text-slate-600 dark:bg-slate-950 dark:text-slate-300">{label}</div>
                  <div className="min-w-0 px-3 py-2 text-slate-700 dark:text-slate-200">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
