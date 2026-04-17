'use client'

import ErrorExperience from '@/components/errors/ErrorExperience'

export default function TemplatesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorExperience
      badge="Templates"
      code="TPL"
      title="Templates could not load"
      description="Please retry once."
      details={process.env.NODE_ENV === 'development' ? error.message : undefined}
      actions={[
        {
          label: 'Retry',
          onClick: () => reset(),
          variant: 'primary',
        },
        {
          label: 'Templates',
          href: '/templates',
        },
        {
          label: 'Home',
          href: '/',
        },
      ]}
    />
  )
}
