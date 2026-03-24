import PublicLayout from '@/components/layout/PublicLayout'
import AIHubClient from '@/components/ai/AIHubClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Hub – Chat, Generate & Create with AI',
  description: 'Access GPT-4o, Claude, Gemini and more AI models. Free AI chat, writing tools, code generation and image creation.',
}

export default function AIPage() {
  return (
    <PublicLayout>
      <AIHubClient />
    </PublicLayout>
  )
}
