import * as React from 'react'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/Badge'
import { Copyable } from '@/components/Copyable'
import { ExternalLinkComponent } from '@/components/ExternalLink'
import { ErrorState } from '@/components/ErrorState'
import { adapterApi } from '@/lib/api'
import { chainClient } from '@/lib/chain'
import { formatNumber, formatDate } from '@/lib/format'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

interface TransactionPageProps {
  params: Promise<{
    txHash: string
  }>
}

export async function generateMetadata({ params }: TransactionPageProps): Promise<Metadata> {
  const resolvedParams = await params
  return generateSEO({
    title: `Transaction ${resolvedParams.txHash.slice(0, 8)}... | Carbon Credit Explorer`,
    description: `View blockchain transaction details for ${resolvedParams.txHash}`,
  })
}

async function getTransaction(txHash: string) {
  try {
    // Try adapter API first
    const adapterTx = await adapterApi.getTransaction(txHash)
    return { source: 'adapter', data: adapterTx }
  } catch (error) {
    console.error('Adapter API failed:', error)
    
    try {
      // Fallback to direct chain query
      if (chainClient.isAvailable()) {
        const chainTx = await chainClient.getTransaction(txHash)
        return { source: 'chain', data: chainTx }
      }
    } catch (chainError) {
      console.error('Chain query failed:', chainError)
    }
    
    return null
  }
}

export default async function TransactionPage({ params }: TransactionPageProps) {
  const resolvedParams = await params
  const txData = await getTransaction(resolvedParams.txHash)

  if (!txData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState 
          title="Transaction not found"
          message="Unable to find transaction details. The transaction may not exist or the blockchain connection is unavailable."
        />
      </div>
    )
  }

  const { source, data: tx } = txData

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Transaction Details</h1>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant={tx.status === 'success' ? 'success' : 'destructive'}>
              {tx.status || 'Unknown'}
            </Badge>
            <Badge variant="outline">Source: {source}</Badge>
          </div>
          <Copyable value={resolvedParams.txHash} />
        </div>

      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg border bg-card p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Transaction Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Hash</p>
                  <Copyable value={resolvedParams.txHash} />
                </div>
                {tx.blockNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">Block Number</p>
                    <p className="text-sm font-mono">{formatNumber(tx.blockNumber)}</p>
                  </div>
                )}
                {tx.gasUsed && (
                  <div>
                    <p className="text-sm text-muted-foreground">Gas Used</p>
                    <p className="text-sm font-mono">{formatNumber(tx.gasUsed)}</p>
                  </div>
                )}
                {tx.gasPrice && (
                  <div>
                    <p className="text-sm text-muted-foreground">Gas Price</p>
                    <p className="text-sm font-mono">{tx.gasPrice.toString()} wei</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
              <div className="space-y-3">
                {tx.from && (
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <Copyable value={tx.from} />
                  </div>
                )}
                {tx.to && (
                  <div>
                    <p className="text-sm text-muted-foreground">To</p>
                    <Copyable value={tx.to} />
                  </div>
                )}
                {tx.value && (
                  <div>
                    <p className="text-sm text-muted-foreground">Value</p>
                    <p className="text-sm font-mono">{tx.value.toString()} wei</p>
                  </div>
                )}
                {tx.nonce && (
                  <div>
                    <p className="text-sm text-muted-foreground">Nonce</p>
                    <p className="text-sm font-mono">{tx.nonce}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Logs */}
          {tx.logs && tx.logs.length > 0 && (
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">Event Logs</h3>
              <div className="space-y-4">
                {tx.logs.map((log: any, index: number) => (
                  <div key={index} className="rounded border bg-muted p-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <Copyable value={log.address} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Topics</p>
                        <div className="space-y-1">
                          {log.topics.map((topic: string, topicIndex: number) => (
                            <Copyable key={topicIndex} value={topic} />
                          ))}
                        </div>
                      </div>
                      {log.data && (
                        <div>
                          <p className="text-sm text-muted-foreground">Data</p>
                          <Copyable value={log.data} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* External Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {chainClient.isAvailable() && (
            <ExternalLinkComponent href={await chainClient.getBlockExplorerUrl(resolvedParams.txHash) || '#'}>
              View on Block Explorer
            </ExternalLinkComponent>
          )}
        </div>
      </div>
    </div>
  )
}
