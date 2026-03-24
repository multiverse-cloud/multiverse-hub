import { ClerkProvider } from '@clerk/nextjs'
import ClerkUserSync from '@/components/providers/ClerkUserSync'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!clerkEnabled) {
    return <>{children}</>
  }

  return (
    <ClerkProvider dynamic signInUrl="/sign-in" signUpUrl="/sign-up" afterSignOutUrl="/">
      <ClerkUserSync />
      {children}
    </ClerkProvider>
  )
}
