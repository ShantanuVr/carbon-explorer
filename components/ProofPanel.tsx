'use client'

import * as React from 'react'
import { Badge } from './Badge'
import { Copyable } from './Copyable'
import { ExternalLinkComponent } from './ExternalLink'
import { cn } from '@/lib/utils'

interface ProofPanelProps {
  creditData?: {
    id: string
    projectId: string
    serialStart: number
    serialEnd: number
    quantity: number
    status: string
    registryHash?: string
  }
  tokenData?: {
    tokenId: string
    contractAddress: string
    tokenUri?: string
    onChainHash?: string
    blockNumber?: number
    txHash?: string
  }
  className?: string
}

export function ProofPanel({ creditData, tokenData, className }: ProofPanelProps) {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)} data-testid="proof-panel">
      {/* Credits Panel (Left) */}
      <div className="rounded-lg border bg-card p-6" data-testid="credits-panel">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <h3 className="text-lg font-semibold">CREDITS</h3>
          <Badge variant="success" className="text-xs">Off-chain Registry</Badge>
        </div>
        
        {creditData ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Credit ID</p>
              <Copyable value={creditData.id} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Project</p>
              <ExternalLinkComponent href={`/credits/projects/${creditData.projectId}`}>
                {creditData.projectId}
              </ExternalLinkComponent>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Serial Range</p>
                <p className="text-sm font-mono">
                  {creditData.serialStart} - {creditData.serialEnd}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="text-sm font-semibold">{creditData.quantity}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline">{creditData.status}</Badge>
            </div>
            {creditData.registryHash && (
              <div>
                <p className="text-sm text-muted-foreground">Registry Hash</p>
                <Copyable value={creditData.registryHash} />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No credit data available</p>
          </div>
        )}
      </div>

      {/* Tokens Panel (Right) */}
      <div className="rounded-lg border bg-card p-6" data-testid="tokens-panel">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-purple-500" />
          <h3 className="text-lg font-semibold">TOKENS</h3>
          <Badge variant="info" className="text-xs">On-chain Blockchain</Badge>
        </div>
        
        {tokenData ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Token ID</p>
              <Copyable value={tokenData.tokenId} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contract Address</p>
              <Copyable value={tokenData.contractAddress} />
            </div>
            {tokenData.tokenUri && (
              <div>
                <p className="text-sm text-muted-foreground">Token URI</p>
                <ExternalLinkComponent href={tokenData.tokenUri}>
                  View Metadata
                </ExternalLinkComponent>
              </div>
            )}
            {tokenData.onChainHash && (
              <div>
                <p className="text-sm text-muted-foreground">On-chain Hash</p>
                <Copyable value={tokenData.onChainHash} />
              </div>
            )}
            {tokenData.blockNumber && (
              <div>
                <p className="text-sm text-muted-foreground">Block Number</p>
                <p className="text-sm font-mono">{tokenData.blockNumber}</p>
              </div>
            )}
            {tokenData.txHash && (
              <div>
                <p className="text-sm text-muted-foreground">Transaction</p>
                <ExternalLinkComponent href={`/tx/${tokenData.txHash}`}>
                  View Transaction
                </ExternalLinkComponent>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No token data available</p>
          </div>
        )}
      </div>
    </div>
  )
}
