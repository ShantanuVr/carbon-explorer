import * as React from 'react'
import { Badge } from '@/components/Badge'
import { Copyable } from '@/components/Copyable'
import { ExternalLinkComponent } from '@/components/ExternalLink'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { chainClient } from '@/lib/chain'
import { formatNumber } from '@/lib/format'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Tokens | Carbon Credit Explorer',
  description: 'Browse carbon credit tokens (on-chain representations) and their blockchain data.',
})

// Mock token data for demonstration
const mockTokens = [
  {
    tokenId: 'TOKEN-001',
    contractAddress: '0x1234567890123456789012345678901234567890',
    projectId: 'PROJ-001',
    quantity: 1000,
    blockNumber: 12345678,
    txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
    tokenUri: 'https://api.example.com/metadata/TOKEN-001'
  },
  {
    tokenId: 'TOKEN-002',
    contractAddress: '0x1234567890123456789012345678901234567890',
    projectId: 'PROJ-002',
    quantity: 500,
    blockNumber: 12345679,
    txHash: '0xbcdef1234567890abcdef1234567890abcdef123',
    tokenUri: 'https://api.example.com/metadata/TOKEN-002'
  }
]

export default async function TokensPage() {
  const isChainAvailable = chainClient.isAvailable()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Carbon Credit Tokens</h1>
        <p className="text-muted-foreground">
          Browse carbon credit tokens as on-chain representations of credits.
        </p>
        <div className="mt-2 text-sm text-muted-foreground">
          <strong>Source of Record:</strong> Blockchain (On-chain Representation)
        </div>
        {!isChainAvailable && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Blockchain connection not available. Showing mock data for demonstration.
            </p>
          </div>
        )}
      </div>

      {mockTokens.length === 0 ? (
        <EmptyState 
          title="No tokens found"
          message="There are currently no carbon credit tokens available on-chain."
        />
      ) : (
        <div className="space-y-6">
          {mockTokens.map((token) => (
            <div key={token.tokenId} className="rounded-lg border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Token {token.tokenId}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="info">On-chain</Badge>
                    <Badge variant="secondary">{token.quantity} credits</Badge>
                  </div>
                </div>
                <ExternalLinkComponent href={`/tokens/${token.tokenId}`}>
                  View Token Details
                </ExternalLinkComponent>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contract Address</p>
                  <Copyable value={token.contractAddress} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Project</p>
                  <ExternalLinkComponent href={`/credits/projects/${token.projectId}`}>
                    {token.projectId}
                  </ExternalLinkComponent>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Block Number</p>
                  <p className="text-sm font-mono">{formatNumber(token.blockNumber)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transaction</p>
                  <ExternalLinkComponent href={`/tx/${token.txHash}`}>
                    View Transaction
                  </ExternalLinkComponent>
                </div>
              </div>

              {token.tokenUri && (
                <div>
                  <p className="text-sm text-muted-foreground">Token URI</p>
                  <ExternalLinkComponent href={token.tokenUri}>
                    View Metadata
                  </ExternalLinkComponent>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
