import SSOCallbackClient from '@/components/auth/SSOCallbackClient'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export default function SSOCallbackPage() {
  if (!clerkEnabled) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6 text-center">
        <div className="max-w-md space-y-3">
          <h1 className="text-2xl font-bold text-foreground">Google sign-in is not configured</h1>
          <p className="text-sm text-muted-foreground">
            Add your Clerk publishable key and secret key to enable the OAuth callback flow.
          </p>
        </div>
      </div>
    )
  }

  return <SSOCallbackClient />
}
