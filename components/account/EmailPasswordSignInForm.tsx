'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { useSignIn } from '@clerk/nextjs'
import { getSafePublicRedirectPath } from '@/lib/auth-redirects'
import { getClerkErrorMessage } from '@/lib/clerk-error'

function getPublicRedirectPath() {
  if (typeof window === 'undefined') {
    return '/'
  }

  return getSafePublicRedirectPath(new URLSearchParams(window.location.search).get('next'), '/')
}

export default function EmailPasswordSignInForm() {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isLoaded || !signIn || !setActive) {
      setError('Authentication is still loading. Please try again in a moment.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const result = await signIn.create({
        strategy: 'password',
        identifier: email.trim(),
        password,
      })

      if (result.status !== 'complete' || !result.createdSessionId) {
        setError('This account needs an extra verification step before it can sign in.')
        return
      }

      await setActive({ session: result.createdSessionId })

      const redirectPath = getPublicRedirectPath()

      router.replace(redirectPath)
      router.refresh()
    } catch (error) {
      setError(getClerkErrorMessage(error, 'Unable to sign in right now. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Email address</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="hello@example.com"
            autoComplete="username"
            required
            className="w-full rounded-xl border border-border bg-muted/50 py-3 pl-10 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-border bg-muted/50 py-3 pl-10 pr-11 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
          />
          <button
            type="button"
            onClick={() => setShowPassword(current => !current)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={loading || !isLoaded}
        className="btn-primary w-full justify-center gap-2 py-3 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Sign In With Email
      </button>
    </form>
  )
}
