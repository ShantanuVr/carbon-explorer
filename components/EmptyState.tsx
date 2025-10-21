import * as React from 'react'
import { FileText, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({ 
  title = 'No data found', 
  message = 'There are no items to display.',
  icon = <FileText className="h-12 w-12 text-muted-foreground" />,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      {icon}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md">{message}</p>
    </div>
  )
}
