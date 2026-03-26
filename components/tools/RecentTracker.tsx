'use client'

import { useEffect } from 'react'
import { useFavorites } from '@/components/providers/FavoritesContext'

export default function RecentTracker({ slug }: { slug: string }) {
  const { addRecent } = useFavorites()

  useEffect(() => {
    if (slug) {
      addRecent(slug)
    }
  }, [slug, addRecent])

  return null
}
