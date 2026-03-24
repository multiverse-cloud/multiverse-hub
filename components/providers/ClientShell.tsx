'use client'

import dynamic from 'next/dynamic'

const ScrollToTopButton = dynamic(() => import('@/components/layout/ScrollToTopButton'), { ssr: false })
const AppToaster = dynamic(() => import('@/components/providers/AppToaster'), { ssr: false })

export default function ClientShell() {
  return (
    <>
      <ScrollToTopButton />
      <AppToaster />
    </>
  )
}
