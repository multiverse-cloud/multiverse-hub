import type { Metadata } from 'next'
import DevClient from '@/components/dev/DevClient'
import PublicLayout from '@/components/layout/PublicLayout'

export const metadata: Metadata = {
  title: 'Dev Tools - JSON, Base64, Regex & Developer Utilities',
  description:
    'Professional developer tools: JSON formatter, Base64, JWT decoder, UUID generator, regex tester and more.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DevPage() {
  return (
    <PublicLayout>
      <DevClient />
    </PublicLayout>
  )
}

