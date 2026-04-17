import ErrorExperience from '@/components/errors/ErrorExperience'

export default function NotFound() {
  return (
    <ErrorExperience
      badge="Not Found"
      code="404"
      title="Page not found"
      description="The page you opened is unavailable."
      actions={[
        {
          label: 'Go home',
          href: '/',
          variant: 'primary',
        },
        {
          label: 'Search',
          href: '/search',
        },
        {
          label: 'Tools',
          href: '/tools',
        },
      ]}
    />
  )
}
