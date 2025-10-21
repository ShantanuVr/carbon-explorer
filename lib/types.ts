// Core data types for the Carbon Credit Explorer

export type ProjectSummary = {
  id: string
  title: string
  status: string
  country?: string
  methodology: string
  totals: {
    issued: number
    retired: number
    remaining: number
  }
  lastDigestAt?: string
}

export type ProjectDetail = ProjectSummary & {
  description?: string
  vintages: Array<{
    classId: string
    vintageStart: string
    vintageEnd: string
    issued: number
    retired: number
  }>
  evidence: Array<{
    id: string
    fileName: string
    sha256: string
    cid?: string
    anchored?: {
      topic: string
      hash: string
      uri?: string
    }
  }>
  adapterReceipts?: Array<{
    adapterTxId: string
    txHash: string
    blockNumber?: number
  }>
  iot?: {
    kwh: number
    tco2e: number
    date: string
    digestHash: string
    cid?: string
  }
}

export type ClassSummary = {
  classId: string
  projectId: string
  vintageStart: string
  vintageEnd: string
  totalIssued: number
  totalRetired: number
  uri?: string
}

export type RetirementCert = {
  certificateId: string
  projectId: string
  classId: string
  quantity: number
  serialStart: number
  serialEnd: number
  factorRef: string
  onchainHash?: string
  issuedAt: string
  beneficiaryHash?: string
  purposeHash?: string
}

export type RegistryStats = {
  totalProjects: number
  totalIssued: number
  totalRetired: number
  retirementRate: number
}

export type EvidenceAnchor = {
  topic: string
  hash: string
  uri?: string
  timestamp: string
}

export type HealthStatus = {
  ok: boolean
  registry: boolean
  adapter: boolean
  chain: boolean
  network?: string
}

export type ApiResponse<T> = {
  data: T
  error?: string
}

export type PaginatedResponse<T> = {
  data: T[]
  page: number
  limit: number
  total: number
  hasMore: boolean
}
