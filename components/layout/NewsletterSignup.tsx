'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
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
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string; message?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || 'Subscription failed.')
      }

      setStatus('success')
      setMessage(payload?.message || 'You are subscribed for product updates.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage((error as Error).message || 'Subscription failed.')
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="premium-input-shell flex flex-col gap-2 sm:flex-row sm:gap-3" aria-label="Newsletter signup">
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
          placeholder="Enter your email"
          className="min-w-0 flex-1 border-none bg-transparent px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
          {status === 'loading' ? null : <ArrowRight className="h-4 w-4" />}
        </button>
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
