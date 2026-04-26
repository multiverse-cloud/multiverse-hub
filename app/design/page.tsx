import type { Metadata } from 'next'
import DesignAIClient from '@/components/design/DesignAIClient'
import PublicLayout from '@/components/layout/PublicLayout'

export const metadata: Metadata = {
  title: 'Design AI - Generate UI, Logos & Design Assets',
  description:
    'AI-powered UI generator, logo maker, poster generator, landing page builder and more.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DesignPage() {
  return (
    <PublicLayout>
      <DesignAIClient />
    </PublicLayout>
  )
}

