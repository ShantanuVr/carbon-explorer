'use client'

import * as React from 'react'
import { Badge } from './Badge'
import { useTheme } from './ThemeProvider'
import { cn } from '@/lib/utils'

export function HeaderCapsule() {
  const { ledgerType, authority, environment } = useTheme()
  
  return (
    <div className="bg-muted/50 border-b" data-testid="header-capsule">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={cn(
                'h-2 w-2 rounded-full',
                ledgerType === 'credits' ? 'bg-green-500' : 'bg-purple-500'
              )} />
              <span className="text-sm font-medium">
                {ledgerType === 'credits' ? 'CREDITS' : 'TOKENS'}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {authority}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {environment}
            </Badge>
            <ProvenancePill ledgerType={ledgerType} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProvenancePill({ ledgerType }: { ledgerType: 'credits' | 'tokens' }) {
  const provenance = ledgerType === 'credits' 
    ? 'Off-chain Registry' 
    : 'On-chain Blockchain'
    
  return (
    <Badge 
      variant={ledgerType === 'credits' ? 'success' : 'info'} 
      className="text-xs"
      data-testid="provenance-pill"
    >
      {provenance}
    </Badge>
  )
}
