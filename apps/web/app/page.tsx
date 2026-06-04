import { redirect } from 'next/navigation'

// Root redirects to dashboard (authenticated) or login (unauthenticated)
// The dashboard layout handles auth check
export default function RootPage() {
  redirect('/dashboard')
}
