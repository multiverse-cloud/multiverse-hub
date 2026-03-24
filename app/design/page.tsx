import PublicLayout from '@/components/layout/PublicLayout'
import DesignAIClient from '@/components/design/DesignAIClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design AI – Generate UI, Logos & Design Assets',
  description: 'AI-powered UI generator, logo maker, poster generator, landing page builder and more.',
}

export default function DesignPage() {
  return <PublicLayout><DesignAIClient /></PublicLayout>
}
