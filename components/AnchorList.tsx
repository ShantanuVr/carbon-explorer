import * as React from 'react'
import { Copyable } from './Copyable'
import { ExternalLinkComponent } from './ExternalLink'
import { formatDate } from '@/lib/format'
import type { EvidenceAnchor } from '@/lib/types'

interface AnchorListProps {
  anchors: EvidenceAnchor[]
  className?: string
}

export function AnchorList({ anchors, className }: AnchorListProps) {
  if (anchors.length === 0) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        No evidence anchors found
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {anchors.map((anchor) => (
        <div key={anchor.hash} className="rounded-lg border bg-card p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-medium">{anchor.topic}</h3>
              <p className="text-sm text-muted-foreground">{formatDate(anchor.timestamp)}</p>
            </div>
            {anchor.uri && (
              <ExternalLinkComponent href={anchor.uri}>
                View Evidence
              </ExternalLinkComponent>
            )}
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Anchor Hash</p>
              <Copyable value={anchor.hash} />
            </div>
            {anchor.uri && (
              <div>
                <p className="text-xs text-muted-foreground">URI</p>
                <ExternalLinkComponent href={anchor.uri}>
                  {anchor.uri}
                </ExternalLinkComponent>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
