'use client'

import { useEffect } from 'react'
import ErrorExperience from '@/components/errors/ErrorExperience'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error('Global app error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <ErrorExperience
          badge="App Error"
          code="APP"
          title="The app needs a refresh"
          description="Reload once and try again."
          details={process.env.NODE_ENV === 'development' ? error.message : undefined}
          actions={[
            {
              label: 'Reload',
              onClick: () => window.location.reload(),
              variant: 'primary',
            },
            {
              label: 'Home',
              href: '/',
            },
          ]}
        />
      </body>
    </html>
  )
}
