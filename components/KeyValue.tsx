import * as React from 'react'
import { cn } from '@/lib/utils'

interface KeyValueProps {
  label: string
  value: React.ReactNode
  className?: string
}

export function KeyValue({ label, value, className }: KeyValueProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="text-sm">{value}</div>
    </div>
  )
}
