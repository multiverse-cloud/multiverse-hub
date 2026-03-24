import PublicLayout from '@/components/layout/PublicLayout'
import DailyClient from '@/components/daily/DailyClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daily Tools - Calculators, Converters & Utilities',
  description: 'Age calculator, EMI calculator, currency converter, unit converter, BMI and more daily tools.',
}

export default function DailyPage() {
  return <PublicLayout><DailyClient /></PublicLayout>
}
