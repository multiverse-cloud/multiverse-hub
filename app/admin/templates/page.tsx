import AdminTemplatesClient from '@/components/admin/AdminTemplatesClient'
import { getAdminTemplates, getTemplateLibraryData } from '@/lib/template-db'

export default async function AdminTemplatesPage() {
  const [library, templates] = await Promise.all([getTemplateLibraryData(), getAdminTemplates()])

  return (
    <AdminTemplatesClient
      templates={templates}
      categories={library.categories}
      platforms={library.platforms}
    />
  )
}
