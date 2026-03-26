import { Suspense } from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import AuthShell from '@/app/_components/AuthShell'
import PublicSignInPageClient from './PublicSignInPageClient'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AuthShell
        title="Welcome back"
        description="Sign in to your Multiverse account"
        footer={
          <div className="space-y-3">
            <Link
              href="/sign-up"
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-slate-950 dark:text-slate-50" />
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">Need an account? Sign up</p>
              </div>
            </Link>

            <p className="text-center text-xs leading-5 text-muted-foreground">
              By signing in, you agree to our <Link href="/terms" className="hover:underline">Terms</Link> and{' '}
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        }
      >
        <Suspense fallback={null}>
          <PublicSignInPageClient clerkEnabled={clerkEnabled} />
        </Suspense>
      </AuthShell>
    </div>
  )
}
