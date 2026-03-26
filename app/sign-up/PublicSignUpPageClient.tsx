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
    <>
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
    </>
  )
}
