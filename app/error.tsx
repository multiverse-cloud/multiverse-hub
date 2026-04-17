'use client'

import { useEffect } from 'react'
import ErrorExperience from '@/components/errors/ErrorExperience'

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App route error:', error)
  }, [error])

  return (
    <ErrorExperience
      badge="Page Error"
      code="500"
      title="Something went wrong"
      description="This page could not be loaded."
      details={process.env.NODE_ENV === 'development' ? error.message : undefined}
      actions={[
        {
          label: 'Retry',
          onClick: () => reset(),
          variant: 'primary',
        },
        {
          label: 'Home',
          href: '/',
        },
      ]}
    />
  )
}
