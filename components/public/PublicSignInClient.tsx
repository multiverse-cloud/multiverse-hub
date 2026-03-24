'use client'

import Link from 'next/link'
import { Globe, Shield, Sparkles } from 'lucide-react'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton'

const COPYRIGHT_YEAR = 2026

export default function PublicSignInClient({ clerkEnabled }: { clerkEnabled: boolean }) {
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
              Your account.
              <br />
              Every Multiverse saved state.
            </h2>
            <p className="max-w-md text-lg text-slate-300">
              Sign in with Google to sync your profile, keep your preferences, and continue across the Multiverse.
            </p>
          </div>

          <div className="flex gap-8">
            {[
              { value: '1', label: 'Account' },
              { value: '150+', label: 'Tools' },
              { value: '1 tap', label: 'Google Sign In' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-sm text-slate-500">Copyright {COPYRIGHT_YEAR} Multiverse Tools</p>
      </div>

      <div className="flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-xl space-y-8">
          <div className="lg:hidden">
            <Link href="/" className="mb-8 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 dark:bg-slate-100">
                <Globe className="h-4 w-4 text-white dark:text-slate-950" />
              </div>
              <span className="font-display text-lg font-bold text-slate-950 dark:text-slate-50">Multiverse</span>
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-50">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Continue with your public account and jump back into tools, AI, and saved activity.
            </p>
          </div>

          {clerkEnabled ? (
            <GoogleAuthButton mode="signIn" label="Continue with Google" />
          ) : (
            <div className="rounded-2xl border border-border bg-card px-4 py-3">
              <p className="text-sm font-medium text-foreground">Public sign-in is not active yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your Clerk publishable key and secret key to enable Google auth here.
              </p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/sign-up"
              className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-950 dark:text-slate-50">Need an account?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create one in a single Google-powered step.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin-login"
              className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-950 dark:text-slate-50">Admin access</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Admin sessions use a separate protected sign-in flow.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Need the public site first?{' '}
            <Link href="/" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
              Go back home
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">secure account access</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our <Link href="/terms" className="hover:underline">Terms</Link> and{' '}
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
