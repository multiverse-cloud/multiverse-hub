import type { Metadata } from 'next'
import FAQSection from '@/components/home/FAQSection'
import FeaturedTemplates from '@/components/home/FeaturedTemplates'
import HeroSection from '@/components/home/HeroSection'
import HeroStatsSection from '@/components/home/HeroStatsSection'
import NewToolsSection from '@/components/home/NewToolsSection'
import TrendingToolsSection from '@/components/home/TrendingToolsSection'
import UniversesSection from '@/components/home/UniversesSection'
import WhyMultiverse from '@/components/home/WhyMultiverse'
import PublicLayout from '@/components/layout/PublicLayout'

export const metadata: Metadata = {
  title: 'Multiverse - Universe of Free Tools | 150+ Free Online Tools',
  description:
    'One platform. 150+ free tools for developers, designers, students, and creators. Video downloaders, PDF converters, calculators and more.',
}

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <HeroStatsSection />
      <UniversesSection />
      <TrendingToolsSection />
      <NewToolsSection />
      <FeaturedTemplates />
      <WhyMultiverse />
      <FAQSection />
    </PublicLayout>
  )
}
