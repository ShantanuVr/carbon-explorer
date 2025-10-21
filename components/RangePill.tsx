import * as React from 'react'
import { Copyable } from './Copyable'
import { formatSerialRange } from '@/lib/format'

interface RangePillProps {
  serialStart: number
  serialEnd: number
  className?: string
}

export function RangePill({ serialStart, serialEnd, className }: RangePillProps) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm ${className}`}>
      <span className="font-mono">{formatSerialRange(serialStart, serialEnd)}</span>
      <Copyable 
        value={`${serialStart}-${serialEnd}`}
        displayValue=""
        showIcon={true}
      />
    </div>
  )
}
