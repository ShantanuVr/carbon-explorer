import { env } from './env'

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function generateSEO({
  title = env.NEXT_PUBLIC_BRAND_NAME,
  description = 'A public explorer with split views for Credits (registry) and Tokens (chain), plus anchors and receipts.',
  image = '/og/default.png',
  url
}: SEOProps = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url,
      siteName: env.NEXT_PUBLIC_BRAND_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export function generateProjectSEO(project: { id: string; title: string; description?: string }) {
  return generateSEO({
    title: `${project.title} | ${env.NEXT_PUBLIC_BRAND_NAME}`,
    description: project.description || `View details for carbon credit project: ${project.title}`,
    url: `/projects/${project.id}`,
  })
}

export function generateCertificateSEO(certificate: { certificateId: string; projectId: string }) {
  return generateSEO({
    title: `Certificate ${certificate.certificateId} | ${env.NEXT_PUBLIC_BRAND_NAME}`,
    description: `View retirement certificate ${certificate.certificateId} for project ${certificate.projectId}`,
    url: `/retirements/${certificate.certificateId}`,
  })
}
