import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, MessageSquareText } from "lucide-react"
import PublicLayout from "@/components/layout/PublicLayout"
import FeedbackForm from "@/components/feedback/FeedbackForm"
import { absoluteUrl } from "@/lib/site-url"

export const metadata: Metadata = {
  title: "Feedback - Help Improve mtverse",
  description: "Send simple feedback about mtverse tools, templates, prompts, UI components, or site issues.",
  alternates: { canonical: absoluteUrl("/feedback") },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FeedbackPage() {
  return (
    <PublicLayout>
      <main className="premium-shell">
        <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to mtverse
          </Link>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-950 sm:p-8">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <MessageSquareText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Feedback</p>
                <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
                  Tell us what to improve
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Send your name, email, and message. No account needed.
                </p>
              </div>
            </div>

            <FeedbackForm />
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}
