'use client'

import { DashboardContent } from '@/components/dashboard/DashboardContent'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ecommerce/ScrollToTop'

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
          <DashboardContent />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
