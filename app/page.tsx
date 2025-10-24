import * as React from 'react'
import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect to credits by default as per the update requirements
  redirect('/credits')
}
