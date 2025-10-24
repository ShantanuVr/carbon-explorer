import * as React from 'react'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/Badge'
import { Copyable } from '@/components/Copyable'
import { ExternalLinkComponent } from '@/components/ExternalLink'
import { ProofPanel } from '@/components/ProofPanel'
import { ErrorState } from '@/components/ErrorState'
import { chainClient } from '@/lib/chain'
import { formatNumber, formatDate } from '@/lib/format'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

interface TokenPageProps {
  params: Promise<{
    tokenId: string
  }>
}

export async function generateMetadata({ params }: TokenPageProps): Promise<Metadata> {
  const resolvedParams = await params
  return generateSEO({
    title: `Token ${resolvedParams.tokenId} | Carbon Credit Explorer`,
    description: `View on-chain carbon credit token ${resolvedParams.tokenId} details and blockchain data.`,
  })
}

async function getToken(tokenId: string) {
  try {
    // In a real implementation, this would query the blockchain
    // For now, return mock data
    return {
      tokenId,
      contractAddress: '0x1234567890123456789012345678901234567890',
      projectId: 'PROJ-001',
      quantity: 1000,
      blockNumber: 12345678,
      txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
      tokenUri: `https://api.example.com/metadata/${tokenId}`,
      onChainHash: '0x9876543210fedcba9876543210fedcba9876543210',
      createdAt: '2024-01-15T10:30:00Z',
      metadata: {
        name: `Carbon Credit Token ${tokenId}`,
        description: 'On-chain representation of carbon credits',
        image: 'https://api.example.com/images/carbon-token.png',
        attributes: [
          { trait_type: 'Project', value: 'PROJ-001' },
          { trait_type: 'Quantity', value: '1000' },
          { trait_type: 'Standard', value: 'ERC-1155' }
        ]
      }
    }
  } catch (error) {
    console.error('Failed to fetch token:', error)
    return null
  }
}

export default async function TokenPage({ params }: TokenPageProps) {
  const resolvedParams = await params
  const token = await getToken(resolvedParams.tokenId)

  if (!token) {
    notFound()
  }

  const isChainAvailable = chainClient.isAvailable()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Token {token.tokenId}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="info">On-chain Token</Badge>
              <Badge variant="secondary">{token.quantity} credits</Badge>
              <Badge variant="outline">ERC-1155</Badge>
            </div>
            <Copyable value={token.tokenId} />
            <div className="mt-2 text-sm text-muted-foreground">
              <strong>Source of Record:</strong> Blockchain (On-chain Representation)
            </div>
            {!isChainAvailable && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                ⚠️ Blockchain connection not available. Showing mock data.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dual Proof Panel */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Token & Credit Proof</h2>
        <ProofPanel 
          creditData={{
            id: `CREDIT-${token.tokenId}`,
            projectId: token.projectId,
            serialStart: 1000001,
            serialEnd: 1000000 + token.quantity,
            quantity: token.quantity,
            status: 'Active',
            registryHash: '0xregistry1234567890abcdef1234567890abcdef12'
          }}
          tokenData={{
            tokenId: token.tokenId,
            contractAddress: token.contractAddress,
            tokenUri: token.tokenUri,
            onChainHash: token.onChainHash,
            blockNumber: token.blockNumber,
            txHash: token.txHash
          }}
        />
      </div>

      {/* Token Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Token Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Token ID</p>
              <Copyable value={token.tokenId} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contract Address</p>
              <Copyable value={token.contractAddress} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="text-lg font-semibold">{formatNumber(token.quantity)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Block Number</p>
              <p className="text-sm font-mono">{formatNumber(token.blockNumber)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="text-sm">{formatDate(token.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Blockchain Data</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Transaction Hash</p>
              <ExternalLinkComponent href={`/tx/${token.txHash}`}>
                View Transaction
              </ExternalLinkComponent>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">On-chain Hash</p>
              <Copyable value={token.onChainHash} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Token URI</p>
              <ExternalLinkComponent href={token.tokenUri}>
                View Metadata
              </ExternalLinkComponent>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Project</p>
              <ExternalLinkComponent href={`/credits/projects/${token.projectId}`}>
                {token.projectId}
              </ExternalLinkComponent>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata */}
      {token.metadata && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Token Metadata</h2>
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{token.metadata.name}</h3>
                <p className="text-muted-foreground">{token.metadata.description}</p>
              </div>
              
              {token.metadata.image && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Image</p>
                  <ExternalLinkComponent href={token.metadata.image}>
                    View Token Image
                  </ExternalLinkComponent>
                </div>
              )}
              
              {token.metadata.attributes && token.metadata.attributes.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Attributes</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {token.metadata.attributes.map((attr, index) => (
                      <div key={index} className="flex justify-between p-2 bg-muted rounded">
                        <span className="text-sm font-medium">{attr.trait_type}</span>
                        <span className="text-sm">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ExternalLinkComponent href={`/tx/${token.txHash}`}>
          View Creation Transaction
        </ExternalLinkComponent>
        <ExternalLinkComponent href={`/credits/projects/${token.projectId}`}>
          View Source Project
        </ExternalLinkComponent>
      </div>
    </div>
  )
}
