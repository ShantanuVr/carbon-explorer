'use client'

import * as React from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CopyableProps {
  value: string
  displayValue?: string
  className?: string
  showIcon?: boolean
}

export function Copyable({ value, displayValue, className, showIcon = true }: CopyableProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-mono',
        'hover:bg-muted transition-colors',
        className
      )}
      title="Click to copy"
    >
      <span>{displayValue || value}</span>
      {showIcon && (
        copied ? (
          <Check className="h-3 w-3 text-green-600" />
        ) : (
          <Copy className="h-3 w-3" />
        )
      )}
    </button>
  )
}
