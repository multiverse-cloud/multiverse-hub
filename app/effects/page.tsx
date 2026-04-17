import { redirect } from 'next/navigation'

interface EffectsPageProps {
  searchParams?: Promise<{
    q?: string | string[]
    section?: string | string[]
    category?: string | string[]
  }>
}

export default async function EffectsPage({ searchParams }: EffectsPageProps) {
  const resolvedSearchParams = await searchParams
  const initialQuery = Array.isArray(resolvedSearchParams?.q) ? resolvedSearchParams?.q[0] : resolvedSearchParams?.q
  const initialSection = Array.isArray(resolvedSearchParams?.section)
    ? resolvedSearchParams?.section[0]
    : resolvedSearchParams?.section
  const initialCategory = Array.isArray(resolvedSearchParams?.category)
    ? resolvedSearchParams?.category[0]
    : resolvedSearchParams?.category
  const params = new URLSearchParams()
  if (initialQuery) params.set('q', initialQuery)
  if (initialSection) params.set('section', initialSection)
  if (initialCategory) params.set('category', initialCategory)
  redirect(params.size ? `/ui?${params.toString()}` : '/ui')
}
