import * as React from 'react'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/Badge'
import { Copyable } from '@/components/Copyable'
import { ExternalLinkComponent } from '@/components/ExternalLink'
import { RangePill } from '@/components/RangePill'
import { registryApi } from '@/lib/api'
import { formatNumber, formatDate } from '@/lib/format'
import { generateCertificateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

interface RetirementPageProps {
  params: Promise<{
    certificateId: string
  }>
}

export async function generateMetadata({ params }: RetirementPageProps): Promise<Metadata> {
  const resolvedParams = await params
  return generateCertificateSEO({ 
    certificateId: resolvedParams.certificateId, 
    projectId: 'PROJ-001' // This would come from the actual data
  })
}

async function getRetirement(certificateId: string) {
  try {
    return await registryApi.getRetirement(certificateId)
  } catch (error) {
    console.error('Failed to fetch retirement:', error)
    return null
  }
}

export default async function RetirementPage({ params }: RetirementPageProps) {
  const resolvedParams = await params
  // For demo purposes, we'll use mock data
  const retirement = {
    certificateId: resolvedParams.certificateId,
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
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Certificate Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Retirement Certificate</h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="success">Verified</Badge>
          <Badge variant="outline">{retirement.quantity} Credits Retired</Badge>
        </div>
        <Copyable value={retirement.certificateId} />
      </div>

      {/* Certificate Content */}
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg border bg-card p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Project ID</p>
                  <ExternalLinkComponent href={`/projects/${retirement.projectId}`}>
                    {retirement.projectId}
                  </ExternalLinkComponent>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class ID</p>
                  <Copyable value={retirement.classId} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Factor Reference</p>
                  <Copyable value={retirement.factorRef} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Retirement Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Quantity Retired</p>
                  <p className="text-lg font-semibold">{formatNumber(retirement.quantity)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Serial Range</p>
                  <RangePill 
                    serialStart={retirement.serialStart} 
                    serialEnd={retirement.serialEnd} 
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Issued Date</p>
                  <p className="text-sm">{formatDate(retirement.issuedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Verification */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold mb-4">Blockchain Verification</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">On-chain Hash</p>
                <Copyable value={retirement.onchainHash} />
              </div>
              {retirement.beneficiaryHash && (
                <div>
                  <p className="text-sm text-muted-foreground">Beneficiary Hash</p>
                  <Copyable value={retirement.beneficiaryHash} />
                </div>
              )}
              {retirement.purposeHash && (
                <div>
                  <p className="text-sm text-muted-foreground">Purpose Hash</p>
                  <Copyable value={retirement.purposeHash} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.print()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Print Certificate
          </button>
          <ExternalLinkComponent href={`/tx/${retirement.onchainHash}`}>
            View on Blockchain
          </ExternalLinkComponent>
        </div>

        {/* Verification Notice */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Verification Notice</h4>
          <p className="text-sm text-muted-foreground">
            This certificate represents the retirement of {formatNumber(retirement.quantity)} carbon credits 
            from project {retirement.projectId}. The retirement has been recorded on-chain and can be 
            verified using the provided transaction hash.
          </p>
        </div>
      </div>
    </div>
  )
}
