import AdminTemplatesClient from '@/components/admin/AdminTemplatesClient'
import { getTemplateLibraryData } from '@/lib/template-db'

export default async function AdminTemplatesPage() {
  const library = await getTemplateLibraryData()

  return (
    <AdminTemplatesClient
      templates={library.templates}
      categories={library.categories}
      platforms={library.platforms}
    />
  )
}
