import { redirect } from 'next/navigation'

type ComponentsSlugPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ComponentsSlugPageRedirect({ params }: ComponentsSlugPageProps) {
  const { slug } = await params
  redirect(`/ui/${slug}`)
}
