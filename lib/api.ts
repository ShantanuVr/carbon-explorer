import { env } from './env'
import type { 
  ProjectSummary, 
  ProjectDetail, 
  ClassSummary, 
  RetirementCert, 
  RegistryStats,
  EvidenceAnchor,
  ApiResponse,
  PaginatedResponse
} from './types'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`)
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }
    return response.json()
  }

  async getRegistryStats(): Promise<RegistryStats> {
    return this.request<RegistryStats>('/reports/registry-stats')
  }

  async getProjects(params?: {
    status?: string
    q?: string
    page?: number
  }): Promise<PaginatedResponse<ProjectSummary>> {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.q) searchParams.set('q', params.q)
    if (params?.page) searchParams.set('page', params.page.toString())
    
    const query = searchParams.toString()
    return this.request<PaginatedResponse<ProjectSummary>>(`/projects${query ? `?${query}` : ''}`)
  }

  async getProject(id: string): Promise<ProjectDetail> {
    return this.request<ProjectDetail>(`/projects/${id}`)
  }

  async getProjectEvidence(id: string): Promise<EvidenceAnchor[]> {
    return this.request<EvidenceAnchor[]>(`/projects/${id}/evidence`)
  }

  async getIssuances(params?: { status?: string }): Promise<ClassSummary[]> {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    
    const query = searchParams.toString()
    return this.request<ClassSummary[]>(`/issuances${query ? `?${query}` : ''}`)
  }

  async getIssuance(id: string): Promise<ClassSummary> {
    return this.request<ClassSummary>(`/issuances/${id}`)
  }

  async getRetirement(certificateId: string): Promise<RetirementCert> {
    return this.request<RetirementCert>(`/retirements/${certificateId}`)
  }
}

class AdapterClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`)
    if (!response.ok) {
      throw new Error(`Adapter API request failed: ${response.statusText}`)
    }
    return response.json()
  }

  async getReceipt(adapterTxId: string): Promise<any> {
    return this.request(`/v1/receipts/${adapterTxId}`)
  }

  async getTransaction(txHash: string): Promise<any> {
    return this.request(`/v1/tx/${txHash}`)
  }

  async resolveClasses(params: {
    projectId: string
    vintageStart?: string
    vintageEnd?: string
  }): Promise<ClassSummary[]> {
    const searchParams = new URLSearchParams()
    searchParams.set('projectId', params.projectId)
    if (params.vintageStart) searchParams.set('vintageStart', params.vintageStart)
    if (params.vintageEnd) searchParams.set('vintageEnd', params.vintageEnd)
    
    return this.request<ClassSummary[]>(`/v1/classes/resolve?${searchParams.toString()}`)
  }
}

// Export configured clients
export const registryApi = new ApiClient(env.NEXT_PUBLIC_REGISTRY_API_URL)
export const adapterApi = new AdapterClient(env.NEXT_PUBLIC_ADAPTER_API_URL)
