import * as React from 'react'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { sanitizeUrl, getExternalLinkProps } from '@/lib/format'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
}

export function ExternalLinkComponent({ 
  href, 
  children, 
  className, 
  showIcon = true 
}: ExternalLinkProps) {
  const sanitizedUrl = sanitizeUrl(href)
  
  if (!sanitizedUrl) {
    return <span className={cn('text-muted-foreground', className)}>{children}</span>
  }

  const linkProps = getExternalLinkProps(sanitizedUrl)

  return (
    <a
      {...linkProps}
      className={cn(
        'inline-flex items-center gap-1 text-primary hover:underline',
        className
      )}
    >
      {children}
      {showIcon && <ExternalLink className="h-3 w-3" />}
    </a>
  )
}
