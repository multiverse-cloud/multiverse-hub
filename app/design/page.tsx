import type { Metadata } from 'next'
import DesignAIClient from '@/components/design/DesignAIClient'
import PublicLayout from '@/components/layout/PublicLayout'
import { absoluteUrl } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'Design AI Studio - Generate UI, Logos, Posters & Frontend Concepts',
  description:
    'Use mtverse Design AI Studio to generate UI concepts, React components, landing pages, logos, posters, thumbnails, and multilingual design prompts.',
  alternates: { canonical: absoluteUrl('/design') },
  openGraph: {
    title: 'Design AI Studio - Generate UI, Logos & Design Assets',
    description:
      'A fast AI design workspace for UI concepts, components, brand visuals, posters, thumbnails, and landing page ideas.',
    url: absoluteUrl('/design'),
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DesignPage() {
  return (
    <PublicLayout>
      <DesignAIClient />
    </PublicLayout>
  )
}
