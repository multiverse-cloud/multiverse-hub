'use client'

import { Toaster } from 'react-hot-toast'

export default function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'font-sans text-sm',
        style: {
          background: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '12px',
        },
      }}
    />
  )
}
