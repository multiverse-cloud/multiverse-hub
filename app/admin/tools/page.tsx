import AdminToolsClient from '@/components/admin/AdminToolsClient'
import { ACTIVE_CATEGORIES, TOOLS } from '@/lib/tools-data'

export default function AdminToolsPage() {
  const categories = ACTIVE_CATEGORIES.map(category => ({
    id: category.id,
    label: category.name,
  }))

  const tools = TOOLS.map(tool => ({
    id: tool.id,
    name: tool.name,
    categorySlug: tool.categorySlug,
    slug: tool.slug,
    tags: tool.tags,
  }))

  return <AdminToolsClient categories={categories} tools={tools} />
}
