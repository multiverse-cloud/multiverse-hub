'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowRight, Eye, EyeOff, Globe, Loader2, Lock, Mail, Shield } from 'lucide-react'

const COPYRIGHT_YEAR = 2026

export default function AdminSignInClient() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const nextPath =
      typeof window === 'undefined'
        ? null
        : new URLSearchParams(window.location.search).get('next')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          next: nextPath,
        }),
      })
      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        setError(payload?.error || 'Unable to sign in.')
        return
      }

      router.replace(payload?.redirectTo || '/admin')
      router.refresh()
    } catch {
      setError('Unable to sign in right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-slate-200 bg-slate-950 p-12 text-white dark:border-slate-800 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20 grid-bg" />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold">Multiverse</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-extrabold leading-tight">
              Restricted access.
              <br />
              Admin dashboard only.
            </h2>
            <p className="max-w-md text-lg text-slate-300">
              This sign-in route is separate from the public Clerk account flow and only unlocks the admin workspace.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Separate session boundary</p>
                <p className="mt-1 text-sm text-slate-300">
                  Public users stay on Clerk, while admin access continues to use the local signed session cookie.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-sm text-slate-500">Copyright {COPYRIGHT_YEAR} Multiverse Tools</p>
      </div>

      <div className="flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden">
            <Link href="/" className="mb-8 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 dark:bg-slate-100">
                <Globe className="h-4 w-4 text-white dark:text-slate-950" />
              </div>
              <span className="font-display text-lg font-bold text-slate-950 dark:text-slate-50">Multiverse</span>
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-50">Admin sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Use your admin credentials to open the control panel.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Private admin route</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  This form is for dashboard access only. Public users should continue with Clerk on the main sign-in page.
                </p>
              </div>
            </div>
          </div>

          {error ? (
            <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-950/60 dark:bg-red-950/20 dark:text-red-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-border bg-muted/50 py-3 pl-10 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link href="/" className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
                  Back to site
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-border bg-muted/50 py-3 pl-4 pr-11 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center gap-2 py-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Open Admin Dashboard
              {!loading ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Need a public account instead?{' '}
            <Link href="/sign-in" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
              Use Clerk sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
