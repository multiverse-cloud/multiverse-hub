'use client'

import ErrorExperience from '@/components/errors/ErrorExperience'

export default function ToolsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorExperience
      badge="Tools"
      code="TLS"
      title="Tool page could not load"
      description="Please retry once."
      details={process.env.NODE_ENV === 'development' ? error.message : undefined}
      actions={[
        {
          label: 'Retry',
          onClick: () => reset(),
          variant: 'primary',
        },
        {
          label: 'Tools',
          href: '/tools',
        },
        {
          label: 'Home',
          href: '/',
        },
      ]}
    />
  )
}
