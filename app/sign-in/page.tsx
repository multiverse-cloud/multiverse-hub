import { Suspense } from 'react'
import PublicSignInPageClient from './PublicSignInPageClient'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <PublicSignInPageClient clerkEnabled={clerkEnabled} />
    </Suspense>
  )
}
