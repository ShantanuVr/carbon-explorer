import * as React from 'react'
import { StatsCard } from '@/components/StatsCards'
import { ErrorState } from '@/components/ErrorState'
import { Skeleton } from '@/components/Skeletons'
import { registryApi } from '@/lib/api'
import { queryKeys } from '@/lib/cache'
import { formatNumber, formatPercentage } from '@/lib/format'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO()

async function getRegistryStats() {
  try {
    return await registryApi.getRegistryStats()
  } catch (error) {
    console.error('Failed to fetch registry stats:', error)
    return null
  }
}

export default async function HomePage() {
  const stats = await getRegistryStats()

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState 
          title="Unable to load registry data"
          message="The registry API is currently unavailable. Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Carbon Credit Registry Explorer</h1>
        <p className="text-muted-foreground text-lg">
          Explore projects, issuances, retirements, and evidence anchors in the carbon credit registry.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Projects"
          value={formatNumber(stats.totalProjects)}
        />
        <StatsCard
          title="Total Issued"
          value={formatNumber(stats.totalIssued)}
        />
        <StatsCard
          title="Total Retired"
          value={formatNumber(stats.totalRetired)}
        />
        <StatsCard
          title="Retirement Rate"
          value={formatPercentage(stats.totalRetired, stats.totalIssued)}
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-2">Browse Projects</h3>
          <p className="text-muted-foreground mb-4">
            Explore carbon credit projects by status, country, and methodology.
          </p>
          <a 
            href="/projects" 
            className="inline-flex items-center text-primary hover:underline"
          >
            View Projects →
          </a>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-2">Recent Issuances</h3>
          <p className="text-muted-foreground mb-4">
            View the latest carbon credit issuances and batches.
          </p>
          <a 
            href="/issuances" 
            className="inline-flex items-center text-primary hover:underline"
          >
            View Issuances →
          </a>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-2">Retirement Certificates</h3>
          <p className="text-muted-foreground mb-4">
            Browse retirement certificates and verify their authenticity.
          </p>
          <a 
            href="/retirements" 
            className="inline-flex items-center text-primary hover:underline"
          >
            View Retirements →
          </a>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-semibold mb-2">System Status</h3>
        <p className="text-xs text-muted-foreground">
          This explorer provides read-only access to publicly available carbon credit data. 
          All information is sourced from the official registry and can be verified on-chain.
        </p>
      </div>
    </div>
  )
}
