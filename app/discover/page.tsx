import PublicLayout from '@/components/layout/PublicLayout'
import DiscoverClient from '@/components/discover/DiscoverClient'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Discover – Top-10 Lists & Curated Rankings', description: 'Curated top-10 lists of the best AI tools, photo editors, developer tools, student tools and more.' }
export default function DiscoverPage() { return <PublicLayout><DiscoverClient /></PublicLayout> }
