import * as React from 'react'
import { Badge } from './Badge'
import { ExternalLinkComponent } from './ExternalLink'
import { Copyable } from './Copyable'
import { formatNumber, formatPercentage, formatRelativeTime } from '@/lib/format'
import type { ProjectSummary } from '@/lib/types'

interface ProjectCardProps {
  project: ProjectSummary
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const retirementRate = project.totals.issued > 0 
    ? formatPercentage(project.totals.retired, project.totals.issued)
    : '0%'

  return (
    <div className={`rounded-lg border bg-card p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{project.status}</Badge>
            {project.country && (
              <Badge variant="secondary">{project.country}</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{project.methodology}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Issued</p>
          <p className="text-lg font-semibold">{formatNumber(project.totals.issued)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Retired</p>
          <p className="text-lg font-semibold">{formatNumber(project.totals.retired)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Rate</p>
          <p className="text-lg font-semibold">{retirementRate}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Copyable value={project.id} displayValue={`ID: ${project.id.slice(0, 8)}...`} />
        </div>
        <ExternalLinkComponent href={`/projects/${project.id}`}>
          View Details
        </ExternalLinkComponent>
      </div>

      {project.lastDigestAt && (
        <div className="mt-2 text-xs text-muted-foreground">
          Last IoT digest: {formatRelativeTime(project.lastDigestAt)}
        </div>
      )}
    </div>
  )
}
