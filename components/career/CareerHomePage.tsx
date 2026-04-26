import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ScanText, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react'
import { CAREER_FAQS, CAREER_PAGES, CAREER_TEMPLATES } from '@/lib/career/career-data'

const highlights = [
  '30+ premium resume and CV templates',
  'Live builder with print-ready preview',
  'ATS parser, keyword checks, and section scoring',
]

export default function CareerHomePage() {
  const featuredTemplates = CAREER_TEMPLATES.slice(0, 9)

  return (
    <div className="bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <section className="border-b border-slate-200 bg-[linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:56px_56px] dark:border-slate-800 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              Resume builder, parser, and CV templates
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Build a cleaner resume in minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              Create ATS-friendly resumes, switch premium templates, parse existing CVs, and export a professional PDF-ready document without login.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/career/builder"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Open Builder
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/career/parser"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                Analyze Resume
              </Link>
            </div>

            <div className="mt-8 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_24px_70px_-46px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs dark:border-slate-800">
                <span className="font-bold text-slate-500">LIVE PREVIEW</span>
                <span className="rounded-md bg-blue-600 px-2 py-1 font-bold text-white">Classic</span>
              </div>
              <div className="mx-auto mt-5 aspect-[0.72] max-h-[560px] rounded-sm bg-white p-6 text-slate-950 shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-black text-blue-700">arun</p>
                  <p className="mt-2 text-[10px] text-slate-600">San Francisco, CA | john.doe@email.com | rendercv.com</p>
                </div>
                <div className="mt-7 space-y-5 text-[10px] leading-relaxed">
                  {['Experience', 'Education', 'Projects', 'Skills'].map((section) => (
                    <div key={section}>
                      <p className="border-b border-blue-300 pb-1 text-sm font-black text-blue-700">{section}</p>
                      <div className="mt-2 space-y-1.5">
                        <div className="h-2 w-3/4 rounded bg-slate-900" />
                        <div className="h-1.5 w-full rounded bg-slate-200" />
                        <div className="h-1.5 w-11/12 rounded bg-slate-200" />
                        <div className="h-1.5 w-4/5 rounded bg-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {CAREER_PAGES.map((page) => {
            const Icon = page.href.includes('builder') ? FileText : page.href.includes('parser') ? ScanText : UploadCloud
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-28px_rgba(15,23,42,0.32)] dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <h2 className="mt-5 text-lg font-black">{page.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{page.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-300">
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Template Library</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Premium resume templates for real roles</h2>
            </div>
            <Link href="/career/builder" className="text-sm font-bold text-blue-600 dark:text-blue-300">
              Customize templates in builder
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTemplates.map((template) => (
              <div key={template.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black">{template.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{template.role}</p>
                  </div>
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: template.accent }} />
                </div>
                <div className="mt-5 space-y-2">
                  <div className="h-2 w-11/12 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-2 w-9/12 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-2 w-7/12 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="mt-5 text-2xl font-black tracking-tight">Private by default, built for speed.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            No public account, no resume database, no history. The public career tools are built as static-first pages with local browser state.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {CAREER_FAQS.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-black">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
