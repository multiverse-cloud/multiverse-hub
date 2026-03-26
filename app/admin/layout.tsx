import { cookies } from 'next/headers'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { getPrimaryEmail, isAdminUser } from '@/lib/admin-access'
import { verifyAdminSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export default async function Layout({ children }: { children: React.ReactNode }) {
  // 1. Check custom local JWT admin session first
  const cookieStore = await cookies()
  const customSessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  if (customSessionToken) {
    const customSession = await verifyAdminSessionToken(customSessionToken)
    if (customSession) {
      return <AdminLayout adminEmail={customSession.email}>{children}</AdminLayout>
    }
  }

  // 2. Fallback to Clerk check
  if (!clerkEnabled) {
    redirect('/admin-login')
  }

  const { userId } = await auth()

  if (!userId) {
    redirect('/admin-login')
  }

  const user = await currentUser()

  if (!user || !isAdminUser(user)) {
    redirect('/')
  }

  return <AdminLayout adminEmail={getPrimaryEmail(user)}>{children}</AdminLayout>
}
