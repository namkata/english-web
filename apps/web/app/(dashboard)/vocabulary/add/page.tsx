import type { Metadata } from 'next'

import { AddWordForm } from '@/components/vocabulary/AddWordForm'

export const metadata: Metadata = { title: 'Thêm từ mới' }

export default function AddWordPage() {
  return <AddWordForm />
}
