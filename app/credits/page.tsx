import * as React from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { registryApi } from '@/lib/api'
import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Credits | Carbon Credit Explorer',
  description: 'Browse carbon credit projects (off-chain, authoritative) by status, country, and methodology.',
})

async function getProjects() {
  try {
    return await registryApi.getProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return null
  }
}

export default async function CreditsPage() {
  const projectsData = await getProjects()

  if (!projectsData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState 
          title="Unable to load credit projects"
          message="The registry API is currently unavailable. Please try again later."
        />
      </div>
    )
  }

  const { data: projects, total } = projectsData

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Carbon Credits</h1>
        <p className="text-muted-foreground">
          Browse {formatNumber(total)} carbon credit projects in the authoritative off-chain registry.
        </p>
        <div className="mt-2 text-sm text-muted-foreground">
          <strong>Source of Record:</strong> Registry API (Off-chain, Authoritative)
        </div>
      </div>

      {projects.length === 0 ? (
        <EmptyState 
          title="No credit projects found"
          message="There are currently no credit projects available in the registry."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}
