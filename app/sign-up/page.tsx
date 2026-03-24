import { Suspense } from 'react'
import PublicSignUpPageClient from './PublicSignUpPageClient'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <PublicSignUpPageClient clerkEnabled={clerkEnabled} />
    </Suspense>
  )
}
