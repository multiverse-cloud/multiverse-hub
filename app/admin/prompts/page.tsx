import AdminPromptsClient from '@/components/admin/AdminPromptsClient'
import { getPromptLibraryData } from '@/lib/prompt-db'

export default async function AdminPromptsPage() {
  const library = await getPromptLibraryData()

  return (
    <AdminPromptsClient
      prompts={library.prompts}
      categories={library.categories}
      models={library.models}
    />
  )
}
