'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import AuthShell from '@/app/_components/AuthShell'
import AuthGoogleButton from '@/app/_components/AuthGoogleButton'
import EmailPasswordSignUpForm from './EmailPasswordSignUpForm'

export default function PublicSignUpPageClient({ clerkEnabled }: { clerkEnabled: boolean }) {
  const searchParams = useSearchParams()
  const nextPath = searchParams?.get('next') || null
  const signInHref = nextPath ? `/sign-in?next=${encodeURIComponent(nextPath)}` : '/sign-in'

  return (
    <AuthShell
      eyebrow="Create account"
      title="Create your Multiverse account"
      description="Set up one account for your saved tools, preferences, and any workspace access your email is approved for."
      sideEyebrow="Quick setup"
      sideTitle="Create once. Use it across the whole product."
      sideDescription="Official-style account creation with Google, email verification, stronger password guidance, and a smoother path back into the app."
      metrics={[
        { value: '60 sec', label: 'Typical setup' },
        { value: 'Email code', label: 'Verification' },
        { value: '1', label: 'Shared account' },
      ]}
      footer={
        <div className="space-y-3">
          <Link
            href={signInHref}
            className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">Already have an account?</p>
                <p className="text-xs text-muted-foreground">Go straight to sign in.</p>
              </div>
            </div>
          </Link>

          <p className="text-center text-xs leading-5 text-muted-foreground">
            Account authentication is handled by Clerk, and your profile can sync into Firebase after sign-in.
          </p>
        </div>
      }
      cardClassName="max-w-[560px]"
    >
      {clerkEnabled ? (
        <div className="space-y-4">
          <AuthGoogleButton mode="signUp" label="Continue with Google" />

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-border" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              or use email
            </span>
            <div className="flex-1 border-t border-border" />
          </div>

          <EmailPasswordSignUpForm />
        </div>
      ) : (
        <div className="rounded-[24px] border border-border bg-card px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
              <LockKeyhole className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Sign-up is not active yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your Clerk keys to enable Google and email account creation here.
              </p>
            </div>
          </div>
        </div>
      )}
    </AuthShell>
  )
}
