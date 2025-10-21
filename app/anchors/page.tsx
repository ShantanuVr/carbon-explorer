import * as React from 'react'
import { Badge } from '@/components/Badge'
import { Copyable } from '@/components/Copyable'
import { ExternalLinkComponent } from '@/components/ExternalLink'
import { EmptyState } from '@/components/EmptyState'
import { generateSEO } from '@/lib/seo'
import { formatDate } from '@/lib/format'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Evidence Anchors | Carbon Credit Explorer',
  description: 'Browse evidence anchors and IoT digests.',
})

// Mock data for evidence anchors
const mockAnchors = [
  {
    topic: 'IOT:PROJ-001',
    hash: '0x1234567890abcdef1234567890abcdef12345678',
    uri: 'https://ipfs.io/ipfs/QmHash1',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    topic: 'ISSUANCE:CLASS-001',
    hash: '0x2345678901bcdef12345678901bcdef1234567890',
    uri: 'https://ipfs.io/ipfs/QmHash2',
    timestamp: '2024-01-20T14:45:00Z'
  },
  {
    topic: 'IOT:PROJ-002',
    hash: '0x3456789012cdef123456789012cdef1234567890',
    uri: 'https://ipfs.io/ipfs/QmHash3',
    timestamp: '2024-01-25T09:15:00Z'
  }
]

export default async function AnchorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Evidence Anchors</h1>
        <p className="text-muted-foreground">
          Browse evidence anchors and IoT digests stored on-chain and IPFS.
        </p>
      </div>

      {mockAnchors.length === 0 ? (
        <EmptyState 
          title="No anchors found"
          message="There are currently no evidence anchors available."
        />
      ) : (
        <div className="space-y-6">
          {mockAnchors.map((anchor, index) => (
            <div key={anchor.hash} className="rounded-lg border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{anchor.topic}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">
                      {anchor.topic.startsWith('IOT:') ? 'IoT Digest' : 'Issuance'}
                    </Badge>
                    <Badge variant="success">Anchored</Badge>
                  </div>
                </div>
                <ExternalLinkComponent href={anchor.uri}>
                  View Evidence
                </ExternalLinkComponent>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Anchor Hash</p>
                  <Copyable value={anchor.hash} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="text-sm">{formatDate(anchor.timestamp)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IPFS URI</p>
                  <ExternalLinkComponent href={anchor.uri}>
                    {anchor.uri}
                  </ExternalLinkComponent>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Information Panel */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h4 className="font-semibold mb-2">About Evidence Anchors</h4>
        <p className="text-sm text-muted-foreground">
          Evidence anchors provide cryptographic proof of data integrity for IoT measurements 
          and issuance records. Each anchor contains a hash of the data and a reference to 
          the full data stored on IPFS.
        </p>
      </div>
    </div>
  )
}
