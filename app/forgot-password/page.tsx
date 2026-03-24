import { Suspense } from 'react'
import ForgotPasswordPageClient from './ForgotPasswordPageClient'

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordPageClient />
    </Suspense>
  )
}
