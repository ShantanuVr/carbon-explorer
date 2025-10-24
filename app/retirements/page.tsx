import * as React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/Badge'
import { Copyable } from '@/components/Copyable'
import { ExternalLinkComponent } from '@/components/ExternalLink'
import { RangePill } from '@/components/RangePill'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { registryApi } from '@/lib/api'
import { formatNumber, formatDate } from '@/lib/format'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Retirements | Carbon Credit Explorer',
  description: 'Browse carbon credit retirement certificates.',
})

// Mock data for retirements since we don't have a specific endpoint
const mockRetirements = [
  {
    certificateId: 'CERT-001',
    projectId: 'PROJ-001',
    classId: 'CLASS-001',
    quantity: 1000,
    serialStart: 1000001,
    serialEnd: 1001000,
    factorRef: 'FACTOR-001',
    onchainHash: '0x1234567890abcdef1234567890abcdef12345678',
    issuedAt: '2024-01-15T10:30:00Z',
    beneficiaryHash: '0xabcdef1234567890abcdef1234567890abcdef12',
    purposeHash: '0x9876543210fedcba9876543210fedcba98765432'
  },
  {
    certificateId: 'CERT-002',
    projectId: 'PROJ-002',
    classId: 'CLASS-002',
    quantity: 500,
    serialStart: 2000001,
    serialEnd: 2000500,
    factorRef: 'FACTOR-002',
    onchainHash: '0x2345678901bcdef12345678901bcdef1234567890',
    issuedAt: '2024-01-20T14:45:00Z',
    beneficiaryHash: '0xbcdef1234567890abcdef1234567890abcdef123',
    purposeHash: '0x8765432109fedcba98765432109fedcba9876543'
  }
]

export default async function RetirementsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Retirement Certificates</h1>
        <p className="text-muted-foreground">
          Browse carbon credit retirement certificates and verify their authenticity.
        </p>
      </div>

      {mockRetirements.length === 0 ? (
        <EmptyState 
          title="No retirements found"
          message="There are currently no retirement certificates available."
        />
      ) : (
        <div className="space-y-6">
          {mockRetirements.map((retirement) => (
            <div key={retirement.certificateId} className="rounded-lg border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Certificate {retirement.certificateId}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Retired</Badge>
                    <Badge variant="secondary">{retirement.quantity} credits</Badge>
                  </div>
                </div>
                <Link href={`/retirements/${retirement.certificateId}`} className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  View Certificate
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Project</p>
                  <Link href={`/projects/${retirement.projectId}`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {retirement.projectId}
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <Copyable value={retirement.classId} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Serial Range</p>
                  <RangePill 
                    serialStart={retirement.serialStart} 
                    serialEnd={retirement.serialEnd} 
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Issued</p>
                  <p className="text-sm">{formatDate(retirement.issuedAt)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Factor Ref:</span>
                  <Copyable value={retirement.factorRef} />
                </div>
                {retirement.onchainHash && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">On-chain Hash:</span>
                    <Copyable value={retirement.onchainHash} displayValue={retirement.onchainHash.slice(0, 12) + '...'} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
