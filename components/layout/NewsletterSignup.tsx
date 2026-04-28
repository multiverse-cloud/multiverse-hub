'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2, MessageSquare } from 'lucide-react'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function NewsletterSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()
    if (!isValidEmail(normalizedEmail)) {
      setStatus('error')
      setMessage('Enter a valid email address.')
      return
    }

    try {
      setStatus('loading')
      setMessage('')

      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Newsletter subscriber',
          email: normalizedEmail,
          message: feedback.trim() || 'Newsletter signup from footer.',
        }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string; message?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || 'Subscription failed.')
      }

      setStatus('success')
      setMessage(payload?.message || 'You are subscribed for product updates.')
      setName('')
      setEmail('')
      setFeedback('')
    } catch (error) {
      setStatus('error')
      setMessage((error as Error).message || 'Subscription failed.')
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        aria-label="Newsletter and feedback signup"
      >
        <div className="grid gap-2 sm:grid-cols-[0.85fr_minmax(0,1fr)_auto]">
          <input
            type="text"
            autoComplete="name"
            value={name}
            onChange={event => {
              setName(event.target.value)
              if (status !== 'idle') {
                setStatus('idle')
                setMessage('')
              }
            }}
            placeholder="Name"
            className="h-11 min-w-0 rounded-xl border-0 bg-slate-50 px-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            aria-label="Name"
          />
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={event => {
              setEmail(event.target.value)
              if (status !== 'idle') {
                setStatus('idle')
                setMessage('')
              }
            }}
            placeholder="Email"
            className="h-11 min-w-0 rounded-xl border-0 bg-slate-50 px-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join'}
            {status === 'loading' ? null : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-2 flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900">
          <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <textarea
            value={feedback}
            onChange={event => {
              setFeedback(event.target.value)
              if (status !== 'idle') {
                setStatus('idle')
                setMessage('')
              }
            }}
            rows={2}
            maxLength={600}
            placeholder="Optional feedback or feature request"
            className="min-h-10 w-full resize-none border-0 bg-transparent p-0 text-sm leading-5 text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:text-slate-100 dark:placeholder:text-slate-500"
            aria-label="Optional feedback"
          />
        </div>
      </form>

      {message ? (
        <p
          className={`mt-3 flex items-center justify-center gap-2 text-sm ${
            status === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {status === 'success' ? <CheckCircle2 className="h-4 w-4" /> : null}
          {message}
        </p>
      ) : null}
    </div>
  )
}
