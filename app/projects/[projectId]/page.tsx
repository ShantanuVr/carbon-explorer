import * as React from 'react'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/Badge'
import { Copyable } from '@/components/Copyable'
import { ExternalLinkComponent } from '@/components/ExternalLink'
import { RangePill } from '@/components/RangePill'
import { ErrorState } from '@/components/ErrorState'
import { registryApi } from '@/lib/api'
import { formatNumber, formatPercentage, formatDate } from '@/lib/format'
import { generateProjectSEO } from '@/lib/seo'
import type { Metadata } from 'next'

interface ProjectPageProps {
  params: Promise<{
    projectId: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const project = await registryApi.getProject(resolvedParams.projectId)
    return generateProjectSEO(project)
  } catch {
    const resolvedParams = await params
    return generateProjectSEO({ id: resolvedParams.projectId, title: 'Project' })
  }
}

async function getProject(id: string) {
  try {
    return await registryApi.getProject(id)
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return null
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params
  const project = await getProject(resolvedParams.projectId)

  if (!project) {
    notFound()
  }

  const retirementRate = project.totals.issued > 0 
    ? formatPercentage(project.totals.retired, project.totals.issued)
    : '0%'

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{project.status}</Badge>
              {project.country && (
                <Badge variant="secondary">{project.country}</Badge>
              )}
              <Badge variant="info">{project.methodology}</Badge>
            </div>
            <Copyable value={project.id} />
          </div>
        </div>

        {project.description && (
          <p className="text-muted-foreground text-lg">{project.description}</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Issued</h3>
          <p className="text-2xl font-bold">{formatNumber(project.totals.issued)}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Retired</h3>
          <p className="text-2xl font-bold">{formatNumber(project.totals.retired)}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Retirement Rate</h3>
          <p className="text-2xl font-bold">{retirementRate}</p>
        </div>
      </div>

      {/* Vintages */}
      {project.vintages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Vintages</h2>
          <div className="rounded-lg border bg-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Class ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Vintage</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">Issued</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">Retired</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                {project.vintages.map((vintage) => (
                  <tr key={vintage.classId} className="border-t">
                    <td className="px-6 py-3">
                      <Copyable value={vintage.classId} displayValue={vintage.classId.slice(0, 12) + '...'} />
                    </td>
                    <td className="px-6 py-3 text-sm">
                      {vintage.vintageStart} - {vintage.vintageEnd}
                    </td>
                    <td className="px-6 py-3 text-right text-sm">
                      {formatNumber(vintage.issued)}
                    </td>
                    <td className="px-6 py-3 text-right text-sm">
                      {formatNumber(vintage.retired)}
                    </td>
                    <td className="px-6 py-3 text-right text-sm">
                      {formatPercentage(vintage.retired, vintage.issued)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Evidence */}
      {project.evidence.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Evidence</h2>
          <div className="space-y-4">
            {project.evidence.map((evidence) => (
              <div key={evidence.id} className="rounded-lg border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{evidence.fileName}</h3>
                    <Copyable value={evidence.sha256} displayValue={`SHA256: ${evidence.sha256.slice(0, 16)}...`} />
                    {evidence.cid && (
                      <Copyable value={evidence.cid} displayValue={`CID: ${evidence.cid.slice(0, 16)}...`} />
                    )}
                  </div>
                  {evidence.anchored && (
                    <div className="text-right">
                      <Badge variant="success">Anchored</Badge>
                      <div className="mt-2">
                        <Copyable value={evidence.anchored.hash} displayValue={evidence.anchored.hash.slice(0, 8) + '...'} />
                      </div>
                      {evidence.anchored.uri && (
                        <ExternalLinkComponent href={evidence.anchored.uri}>
                          View Evidence
                        </ExternalLinkComponent>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IoT Data */}
      {project.iot && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest IoT Digest</h2>
          <div className="rounded-lg border bg-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Energy (kWh)</p>
                <p className="text-lg font-semibold">{formatNumber(project.iot.kwh)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CO2e (t)</p>
                <p className="text-lg font-semibold">{formatNumber(project.iot.tco2e)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="text-lg font-semibold">{formatDate(project.iot.date)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Copyable value={project.iot.digestHash} displayValue={`Digest: ${project.iot.digestHash.slice(0, 16)}...`} />
              {project.iot.cid && (
                <ExternalLinkComponent href={`https://ipfs.io/ipfs/${project.iot.cid}`}>
                  View on IPFS
                </ExternalLinkComponent>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Adapter Receipts */}
      {project.adapterReceipts && project.adapterReceipts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Transaction Receipts</h2>
          <div className="space-y-4">
            {project.adapterReceipts.map((receipt) => (
              <div key={receipt.adapterTxId} className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Copyable value={receipt.adapterTxId} displayValue={`Receipt: ${receipt.adapterTxId.slice(0, 12)}...`} />
                    <Copyable value={receipt.txHash} displayValue={`TX: ${receipt.txHash.slice(0, 12)}...`} />
                    {receipt.blockNumber && (
                      <p className="text-sm text-muted-foreground">Block: {receipt.blockNumber}</p>
                    )}
                  </div>
                  <ExternalLinkComponent href={`/tx/${receipt.txHash}`}>
                    View Transaction
                  </ExternalLinkComponent>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
