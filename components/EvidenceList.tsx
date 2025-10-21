import * as React from 'react'
import { Copyable } from './Copyable'
import { ExternalLinkComponent } from './ExternalLink'
import { formatDate } from '@/lib/format'

interface EvidenceListProps {
  evidence: Array<{
    id: string
    fileName: string
    sha256: string
    cid?: string
    anchored?: {
      topic: string
      hash: string
      uri?: string
    }
  }>
  className?: string
}

export function EvidenceList({ evidence, className }: EvidenceListProps) {
  if (evidence.length === 0) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        No evidence files found
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {evidence.map((item) => (
        <div key={item.id} className="rounded-lg border bg-card p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-medium">{item.fileName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Copyable value={item.sha256} displayValue={`SHA256: ${item.sha256.slice(0, 16)}...`} />
                {item.cid && (
                  <Copyable value={item.cid} displayValue={`CID: ${item.cid.slice(0, 16)}...`} />
                )}
              </div>
            </div>
            {item.anchored && (
              <div className="text-right">
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Anchored
                </div>
              </div>
            )}
          </div>
          
          {item.anchored && (
            <div className="space-y-2 pt-3 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Anchor Topic</p>
                <p className="text-sm font-mono">{item.anchored.topic}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Anchor Hash</p>
                <Copyable value={item.anchored.hash} />
              </div>
              {item.anchored.uri && (
                <div>
                  <p className="text-xs text-muted-foreground">Evidence URI</p>
                  <ExternalLinkComponent href={item.anchored.uri}>
                    {item.anchored.uri}
                  </ExternalLinkComponent>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
