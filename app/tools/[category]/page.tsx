import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PublicLayout from '@/components/layout/PublicLayout'
import CategoryPage from '@/components/tools/CategoryPage'
import { ACTIVE_CATEGORIES } from '@/lib/tools-data'
import { getToolsByCategory } from '@/lib/db'

export const revalidate = 3600

export function generateStaticParams() {
  return ACTIVE_CATEGORIES.map(category => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const cat = ACTIVE_CATEGORIES.find(item => item.slug === category)
  if (!cat) return {}

  return {
    title: `${cat.name} - Free Online ${cat.name}`,
    description: `Free ${cat.name.toLowerCase()} online. ${cat.description}. No login, no limits.`,
  }
}

export default async function CategoryRoute({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = ACTIVE_CATEGORIES.find(item => item.slug === category)

  if (!cat) {
    notFound()
  }

  const tools = await getToolsByCategory(category)

  return (
    <PublicLayout>
      <CategoryPage category={cat} tools={tools} />
    </PublicLayout>
  )
}
