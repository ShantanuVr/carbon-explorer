import * as React from 'react'
import { Badge } from '@/components/Badge'
import { Copyable } from '@/components/Copyable'
import { ExternalLinkComponent } from '@/components/ExternalLink'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { registryApi } from '@/lib/api'
import { formatNumber, formatPercentage } from '@/lib/format'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Issuances | Carbon Credit Explorer',
  description: 'Browse carbon credit issuances and batches.',
})

async function getIssuances() {
  try {
    return await registryApi.getIssuances()
  } catch (error) {
    console.error('Failed to fetch issuances:', error)
    return null
  }
}

export default async function IssuancesPage() {
  const issuances = await getIssuances()

  if (!issuances) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState 
          title="Unable to load issuances"
          message="The registry API is currently unavailable. Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Carbon Credit Issuances</h1>
        <p className="text-muted-foreground">
          Browse carbon credit issuances and batches in the registry.
        </p>
      </div>

      {issuances.length === 0 ? (
        <EmptyState 
          title="No issuances found"
          message="There are currently no issuances available in the registry."
        />
      ) : (
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Class ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Project</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Vintage</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Issued</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Retired</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Rate</th>
                <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issuances.map((issuance, index) => {
                const retirementRate = issuance.totalIssued > 0 
                  ? formatPercentage(issuance.totalRetired, issuance.totalIssued)
                  : '0%'

                return (
                  <tr key={issuance.classId} className={index > 0 ? 'border-t' : ''}>
                    <td className="px-6 py-3">
                      <Copyable value={issuance.classId} displayValue={issuance.classId.slice(0, 12) + '...'} />
                    </td>
                    <td className="px-6 py-3">
                      <ExternalLinkComponent href={`/projects/${issuance.projectId}`}>
                        {issuance.projectId.slice(0, 8)}...
                      </ExternalLinkComponent>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      {issuance.vintageStart} - {issuance.vintageEnd}
                    </td>
                    <td className="px-6 py-3 text-right text-sm">
                      {formatNumber(issuance.totalIssued)}
                    </td>
                    <td className="px-6 py-3 text-right text-sm">
                      {formatNumber(issuance.totalRetired)}
                    </td>
                    <td className="px-6 py-3 text-right text-sm">
                      <Badge variant={parseFloat(retirementRate) > 50 ? 'success' : 'warning'}>
                        {retirementRate}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <ExternalLinkComponent href={`/issuances/${issuance.classId}`}>
                        View Details
                      </ExternalLinkComponent>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
