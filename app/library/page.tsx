import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'
import LibraryHubClient from '@/components/library/LibraryHubClient'
import { getLibraryHubData } from '@/lib/library-hub'

export const metadata: Metadata = {
  title: 'Library - Premium UI Components and Website Templates | Multiverse',
  description:
    'Browse a shared library of premium UI components and website templates with live previews, code access, and direct downloads.',
}

export default async function LibraryPage() {
  const library = await getLibraryHubData()

  return (
    <PublicLayout variant="source-hub">
      <LibraryHubClient uiItems={library.uiItems} templateItems={library.templateItems} />
    </PublicLayout>
  )
}
