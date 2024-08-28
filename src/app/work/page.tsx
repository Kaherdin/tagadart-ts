import type { Metadata } from 'next'
import ViewWorks from './ViewWorks'

export const metadata: Metadata = {
  title: 'Works',
}

export default function ViewBlogsPage() {
  return <ViewWorks />
}
