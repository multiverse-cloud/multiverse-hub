'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, FileText, ScanText, UploadCloud } from 'lucide-react'

export default function CareerImportPage() {
  const [fileName, setFileName] = useState('')
  const [text, setText] = useState('')

  async function handleFile(file?: File) {
    if (!file) return
    setFileName(file.name)
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      setText(await file.text())
    }
  }

  return (
    <div className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Resume Import</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Turn an old resume into a clean editable CV.</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Upload a resume file or paste text, then analyze it in the parser or rebuild it in the live builder.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900">
            <UploadCloud className="h-8 w-8 text-blue-600" />
            <span className="mt-3 text-sm font-black">Drop or choose resume file</span>
            <span className="mt-1 text-xs text-slate-500">PDF, TXT, MD, or text export</span>
            <input
              type="file"
              className="sr-only"
              accept=".pdf,.txt,.md,.csv"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
          </label>

          {fileName ? (
            <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm font-semibold text-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
              Loaded: {fileName}
            </div>
          ) : null}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <label className="text-sm font-black">Paste resume text</label>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste resume text here..."
            className="mt-3 h-56 w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 outline-none focus:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-slate-700"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href="/career/parser"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <ScanText className="h-4 w-4" />
              Analyze resume
            </Link>
            <Link
              href="/career/builder"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            >
              <FileText className="h-4 w-4" />
              Open builder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
