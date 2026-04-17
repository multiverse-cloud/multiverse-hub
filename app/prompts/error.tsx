'use client'

import ErrorExperience from '@/components/errors/ErrorExperience'

export default function PromptsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorExperience
      badge="Prompts"
      code="PRM"
      title="Prompts could not load"
      description="Please retry once."
      details={process.env.NODE_ENV === 'development' ? error.message : undefined}
      actions={[
        {
          label: 'Retry',
          onClick: () => reset(),
          variant: 'primary',
        },
        {
          label: 'Prompts',
          href: '/prompts',
        },
        {
          label: 'Home',
          href: '/',
        },
      ]}
    />
  )
}
