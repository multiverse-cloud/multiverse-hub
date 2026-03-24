'use client'

import Link from 'next/link'
import { ArrowRight, Globe, Sparkles } from 'lucide-react'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton'

const COPYRIGHT_YEAR = 2026

export default function SignUpClient({ clerkEnabled }: { clerkEnabled: boolean }) {
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
          <h2 className="font-display text-3xl font-extrabold leading-tight">
            Create your account.
            <br />
            Start with Google.
          </h2>
          <p className="max-w-md text-lg text-slate-300">
            Sign up in one step, then jump back into tools, AI workflows, and everything else in Multiverse.
          </p>
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
            <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-50">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Use Google to sign up and continue your public account setup.
            </p>
          </div>

          {clerkEnabled ? (
            <GoogleAuthButton mode="signUp" label="Continue with Google" />
          ) : (
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="text-sm font-semibold text-foreground">Google sign-up is not active yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Add your Clerk publishable key and secret key to enable public sign-up here.
              </p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/sign-in"
              className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-950 dark:text-slate-50">Already have an account?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Go straight to sign in and continue where you left off.</p>
                </div>
              </div>
            </Link>

            <Link
              href="/tools"
              className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-950 dark:text-slate-50">Use tools without waiting</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Most of the public tool library is already available without an account.</p>
                </div>
              </div>
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Your auth is handled by Clerk, and your app profile can be synced into Firebase after sign-in.
          </p>
        </div>
      </div>
    </div>
  )
}
