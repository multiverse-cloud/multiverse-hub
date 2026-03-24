'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { useSignIn } from '@clerk/nextjs'
import { getSafeRedirectPath } from '@/lib/auth-redirects'
import { getClerkErrorMessage } from '@/lib/clerk-error'

const REMEMBERED_EMAIL_KEY = 'multiverse.rememberedEmail'

function getRedirectPath(nextPath: string | null) {
  return getSafeRedirectPath(nextPath, '/')
}

function readRememberedEmail() {
  if (typeof window === 'undefined') {
    return ''
  }

  try {
    return window.localStorage.getItem(REMEMBERED_EMAIL_KEY) || ''
  } catch {
    return ''
  }
}

function storeRememberedEmail(email: string, rememberMe: boolean) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    if (rememberMe && email.trim()) {
      window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email.trim())
      return
    }

    window.localStorage.removeItem(REMEMBERED_EMAIL_KEY)
  } catch {}
}

export default function EmailPasswordSignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const nextPath = searchParams?.get('next') || null

  useEffect(() => {
    const rememberedEmail = readRememberedEmail()

    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])

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
        setError('This account needs one more verification step before it can sign in.')
        return
      }

      storeRememberedEmail(email, rememberMe)
      await setActive({ session: result.createdSessionId })

      router.replace(getRedirectPath(nextPath))
      router.refresh()
    } catch (error) {
      setError(getClerkErrorMessage(error, 'Unable to sign in right now. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  const forgotPasswordHref = nextPath ? `/forgot-password?next=${encodeURIComponent(nextPath)}` : '/forgot-password'

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
            inputMode="email"
            required
            className="w-full rounded-2xl border border-border bg-muted/50 py-3 pl-10 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm font-medium">Password</label>
          <Link href={forgotPasswordHref} className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="w-full rounded-2xl border border-border bg-muted/50 py-3 pl-10 pr-11 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
          />
          <button
            type="button"
            onClick={() => setShowPassword(current => !current)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={event => setRememberMe(event.target.checked)}
          className="h-4 w-4 rounded border-border text-indigo-600 focus:ring-indigo-500"
        />
        Remember me on this device
      </label>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-950/60 dark:bg-red-950/20 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading || !isLoaded}
        className="btn-primary w-full justify-center gap-2 py-3 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Continue with email
      </button>
    </form>
  )
}
