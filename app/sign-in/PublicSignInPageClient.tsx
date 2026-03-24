'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { LockKeyhole, Sparkles } from 'lucide-react'
import AuthShell from '@/app/_components/AuthShell'
import AuthGoogleButton from '@/app/_components/AuthGoogleButton'
import EmailPasswordSignInForm from './EmailPasswordSignInForm'

export default function PublicSignInPageClient({ clerkEnabled }: { clerkEnabled: boolean }) {
  const searchParams = useSearchParams()
  const nextPath = searchParams?.get('next') || null
  const signUpHref = nextPath ? `/sign-up?next=${encodeURIComponent(nextPath)}` : '/sign-up'

  return (
    <AuthShell
      eyebrow="Sign in"
      title="Welcome back"
      description="Use the same secure account for your saved tools, preferences, and approved admin access."
      sideEyebrow="One account"
      sideTitle="Your Multiverse account goes everywhere."
      sideDescription="Sign in with Google or email, pick up where you left off, and step into admin only when your account is allowed."
      metrics={[
        { value: '150+', label: 'Tools' },
        { value: '2', label: 'Sign-in options' },
        { value: '1', label: 'Unified account' },
      ]}
      footer={
        <div className="space-y-3">
          <Link
            href={signUpHref}
            className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">Need an account?</p>
                <p className="text-xs text-muted-foreground">Create one in a minute and start syncing.</p>
              </div>
            </div>
          </Link>

          <p className="text-center text-xs leading-5 text-muted-foreground">
            By signing in, you agree to our <Link href="/terms" className="hover:underline">Terms</Link> and{' '}
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      }
    >
      {clerkEnabled ? (
        <div className="space-y-4">
          <AuthGoogleButton mode="signIn" label="Continue with Google" />

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-border" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              or use email
            </span>
            <div className="flex-1 border-t border-border" />
          </div>

          <EmailPasswordSignInForm />
        </div>
      ) : (
        <div className="rounded-[24px] border border-border bg-card px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
              <LockKeyhole className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Sign-in is not active yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your Clerk keys to enable Google and email login for the public and admin flows.
              </p>
            </div>
          </div>
        </div>
      )}
    </AuthShell>
  )
}
