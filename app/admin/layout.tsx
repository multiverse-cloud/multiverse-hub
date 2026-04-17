import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { authorizeAdminPageRequest } from '@/lib/admin-request-auth'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const adminSession = await authorizeAdminPageRequest()

  if (!adminSession.authorized) {
    redirect('/admin-login')
  }

  return (
    <AdminLayout adminEmail={adminSession.email}>
      {children}
    </AdminLayout>
  )
}
