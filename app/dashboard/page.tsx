import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Tool Library | Multiverse',
}

export default function DashboardPage() {
  redirect('/tools')
}
