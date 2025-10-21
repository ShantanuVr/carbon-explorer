import * as React from 'react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  delta?: {
    value: number
    label: string
  }
  className?: string
}

export function StatsCard({ title, value, delta, className }: StatsCardProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {delta && (
          <div className="text-right">
            <p className={cn(
              'text-sm font-medium',
              delta.value >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {delta.value >= 0 ? '+' : ''}{delta.value}%
            </p>
            <p className="text-xs text-muted-foreground">{delta.label}</p>
          </div>
        )}
      </div>
    </div>
  )
}
