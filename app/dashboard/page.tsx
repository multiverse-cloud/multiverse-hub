import { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'
import DashboardClient from '@/components/tools/DashboardClient'
import { getTools } from '@/lib/db'

export const metadata: Metadata = {
  title: 'My Library - Your Favorite Tools | Multiverse',
  description: 'Access your favorite and recently used tools on Multiverse. Your personalized workspace for productivity.',
}

export default async function DashboardPage() {
  const allTools = await getTools()

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DashboardClient allTools={allTools} />
      </div>
    </PublicLayout>
  )
}
