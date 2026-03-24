import PublicLayout from '@/components/layout/PublicLayout'
import MarketplaceClient from '@/components/marketplace/MarketplaceClient'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Marketplace – Premium Templates, Projects & Courses', description: 'Browse premium UI templates, full-stack projects, courses, bundles and free resources for developers.' }
export default function MarketplacePage() { return <PublicLayout><MarketplaceClient /></PublicLayout> }
