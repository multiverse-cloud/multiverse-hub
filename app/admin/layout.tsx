import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { getPrimaryEmail, isAdminUser } from '@/lib/admin-access'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)

export default async function Layout({ children }: { children: React.ReactNode }) {
  if (!clerkEnabled) {
    redirect('/sign-in?next=/admin')
  }

  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in?next=/admin')
  }

  const user = await currentUser()

  if (!user || !isAdminUser(user)) {
    redirect('/')
  }

  return <AdminLayout adminEmail={getPrimaryEmail(user)}>{children}</AdminLayout>
}
