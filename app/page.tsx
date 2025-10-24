import * as React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/Badge'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Carbon Credit Explorer',
  description: 'A public explorer with split views for Credits (registry) and Tokens (chain), plus anchors and receipts.',
})

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Carbon Credit Explorer</h1>
          <p className="text-xl text-muted-foreground mb-6">
            A public explorer with split views for Credits (registry) and Tokens (chain), plus anchors and receipts.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="success" className="text-sm">
              Off-chain Registry
            </Badge>
            <Badge variant="info" className="text-sm">
              On-chain Blockchain
            </Badge>
          </div>
        </div>

        {/* Dual Ledger Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Credits Card */}
          <div className="rounded-lg border bg-card p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <h2 className="text-2xl font-semibold">Credits</h2>
              <Badge variant="success" className="text-xs">Off-chain Registry</Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              Browse carbon credit projects, issuances, retirements, and evidence anchors in the authoritative off-chain registry.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">Projects & Issuances</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">Retirement Certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">Evidence Anchors</span>
              </div>
            </div>
            <Link href="/credits" className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Explore Credits
            </Link>
          </div>

          {/* Tokens Card */}
          <div className="rounded-lg border bg-card p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-4 w-4 rounded-full bg-purple-500" />
              <h2 className="text-2xl font-semibold">Tokens</h2>
              <Badge variant="info" className="text-xs">On-chain Blockchain</Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              View carbon credit tokens on the blockchain, including ownership, transfers, and transaction history.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-sm">Token Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-sm">Transfer History</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-sm">Blockchain Transactions</span>
              </div>
            </div>
            <Link href="/tokens" className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Explore Tokens
            </Link>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center flex flex-col h-full">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold mb-2">Issuances</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-grow">
              View carbon credit issuances and batches
            </p>
            <Link href="/issuances" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              View Issuances
            </Link>
          </div>

          <div className="text-center flex flex-col h-full">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="font-semibold mb-2">Retirements</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-grow">
              Explore retirement certificates and verify authenticity
            </p>
            <Link href="/retirements" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              View Retirements
            </Link>
          </div>

          <div className="text-center flex flex-col h-full">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="font-semibold mb-2">Anchors</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-grow">
              Browse IoT digests and evidence anchors
            </p>
            <Link href="/anchors" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              View Anchors
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 rounded-lg border bg-muted/50">
          <h3 className="font-semibold mb-3">About This Explorer</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This explorer provides public access to carbon credit data across two complementary systems:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Credits (Off-chain Registry)</h4>
              <p className="text-muted-foreground">
                Authoritative source of truth for carbon credit projects, issuances, and retirements. 
                Managed by the registry API with full audit trails.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tokens (On-chain Blockchain)</h4>
              <p className="text-muted-foreground">
                Blockchain representations of carbon credits for trading and transfer. 
                Provides transparency and immutability for tokenized credits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}