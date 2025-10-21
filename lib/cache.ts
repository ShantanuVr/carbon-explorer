// React Query cache keys and helpers

export const queryKeys = {
  // Registry API
  registryStats: ['registry', 'stats'] as const,
  projects: (params?: { status?: string; q?: string; page?: number }) => 
    ['registry', 'projects', params] as const,
  project: (id: string) => ['registry', 'project', id] as const,
  projectEvidence: (id: string) => ['registry', 'project', id, 'evidence'] as const,
  issuances: (params?: { status?: string }) => 
    ['registry', 'issuances', params] as const,
  issuance: (id: string) => ['registry', 'issuance', id] as const,
  retirement: (certificateId: string) => ['registry', 'retirement', certificateId] as const,

  // Adapter API
  receipt: (adapterTxId: string) => ['adapter', 'receipt', adapterTxId] as const,
  transaction: (txHash: string) => ['adapter', 'transaction', txHash] as const,
  resolveClasses: (params: { projectId: string; vintageStart?: string; vintageEnd?: string }) =>
    ['adapter', 'classes', 'resolve', params] as const,

  // Health
  health: ['health'] as const,
}

// ISR configuration
export const isrConfig = {
  revalidate: 300, // 5 minutes
  tags: ['registry', 'projects', 'stats']
}

// Cache timeouts
export const cacheTimeouts = {
  short: 5 * 60 * 1000, // 5 minutes
  medium: 15 * 60 * 1000, // 15 minutes
  long: 60 * 60 * 1000, // 1 hour
}
