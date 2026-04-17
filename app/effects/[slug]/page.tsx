import { redirect } from 'next/navigation'

type EffectSlugPageProps = {
  params: Promise<{ slug: string }>
}

export default async function EffectSlugPage({ params }: EffectSlugPageProps) {
  const { slug } = await params
  redirect(`/ui/${slug}`)
}
