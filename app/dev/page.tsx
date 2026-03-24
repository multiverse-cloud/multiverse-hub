import PublicLayout from '@/components/layout/PublicLayout'
import DevClient from '@/components/dev/DevClient'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Dev Tools – JSON, Base64, Regex & Developer Utilities', description: 'Professional developer tools: JSON formatter, Base64, JWT decoder, UUID generator, regex tester and more.' }
export default function DevPage() { return <PublicLayout><DevClient /></PublicLayout> }
