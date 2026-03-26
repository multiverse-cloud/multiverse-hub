import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import AuthShell from '@/app/_components/AuthShell'
import PublicSignUpPageClient from './PublicSignUpPageClient'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AuthShell
        title="Create account"
        description="Join Multiverse to save your tools and preferences."
        footer={
          <div className="space-y-3">
            <Link
              href="/sign-in"
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
        <Suspense fallback={null}>
          <PublicSignUpPageClient clerkEnabled={clerkEnabled} />
        </Suspense>
      </AuthShell>
    </div>
  )
}
