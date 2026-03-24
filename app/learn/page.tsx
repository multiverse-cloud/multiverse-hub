import PublicLayout from '@/components/layout/PublicLayout'
import LearnClient from '@/components/learn/LearnClient'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Learn – AI Study Tools & Notes Generator', description: 'AI-powered study tools: notes generator, summarizer, Q&A, flashcards and more.' }
export default function LearnPage() { return <PublicLayout><LearnClient /></PublicLayout> }
