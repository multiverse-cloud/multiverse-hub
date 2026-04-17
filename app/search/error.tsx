'use client'

import ErrorExperience from '@/components/errors/ErrorExperience'

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorExperience
      badge="Search"
      code="SRC"
      title="Search could not load"
      description="Please retry once."
      details={process.env.NODE_ENV === 'development' ? error.message : undefined}
      actions={[
        {
          label: 'Retry',
          onClick: () => reset(),
          variant: 'primary',
        },
        {
          label: 'Search',
          href: '/search',
        },
        {
          label: 'Home',
          href: '/',
        },
      ]}
    />
  )
}
