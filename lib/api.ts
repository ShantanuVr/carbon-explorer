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
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout
    
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
      }
      return response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      // Return mock data for development when external APIs are unavailable
      if (error instanceof Error && (error.name === 'AbortError' || error.message.includes('fetch failed'))) {
        console.warn(`External API unavailable, returning mock data for ${endpoint}`)
        return this.getMockData<T>(endpoint)
      }
      throw error
    }
  }

  private getMockData<T>(endpoint: string): T {
    // Return appropriate mock data based on endpoint
    if (endpoint.includes('/reports/registry-stats')) {
      return {
        totalProjects: 150,
        totalCredits: 2500000,
        totalRetirements: 500000,
        totalIssuances: 2000,
        lastUpdated: new Date().toISOString()
      } as T
    }
    
    if (endpoint.includes('/projects/') && !endpoint.includes('/projects?')) {
      // Individual project detail
      const projectId = endpoint.split('/').pop()
      if (projectId === 'PROJ-001') {
        return {
          id: 'PROJ-001',
          title: 'Forest Conservation Project',
          status: 'active',
          country: 'Brazil',
          methodology: 'REDD+',
          vintage: '2023',
          totals: {
            issued: 10000,
            retired: 2500
          },
          lastDigestAt: new Date().toISOString(),
          description: 'A comprehensive forest conservation project in the Amazon rainforest focusing on REDD+ methodologies.',
          projectType: 'Forestry',
          registry: 'VCS',
          projectDeveloper: 'Green Earth Foundation',
          verifier: 'Carbon Trust',
          validationDate: '2023-01-15',
          issuanceDate: '2023-02-01',
          creditingPeriod: '2023-2032',
          estimatedAnnualReductions: 1000,
          adapterReceipts: [
            {
              adapterTxId: 'ADAPTER-001',
              txHash: '0xabc123def456789',
              blockNumber: 12345678,
              timestamp: new Date().toISOString()
            }
          ],
          vintages: [
            {
              classId: 'CLASS-001',
              vintage: '2023',
              issued: 10000,
              retired: 2500
            }
          ],
          evidence: [
            {
              id: 'EVIDENCE-001',
              fileName: 'forest_conservation_report.pdf',
              sha256: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
              timestamp: new Date().toISOString()
            }
          ]
        } as T
      } else if (projectId === 'PROJ-002') {
        return {
          id: 'PROJ-002',
          title: 'Solar Energy Initiative',
          status: 'active',
          country: 'India',
          methodology: 'Solar',
          vintage: '2023',
          totals: {
            issued: 5000,
            retired: 1000
          },
          lastDigestAt: new Date().toISOString(),
          description: 'Large-scale solar energy project providing clean electricity to rural communities in India.',
          projectType: 'Renewable Energy',
          registry: 'Gold Standard',
          projectDeveloper: 'Solar Solutions Ltd',
          verifier: 'TÜV SÜD',
          validationDate: '2023-03-10',
          issuanceDate: '2023-04-01',
          creditingPeriod: '2023-2033',
          estimatedAnnualReductions: 500,
          adapterReceipts: [
            {
              adapterTxId: 'ADAPTER-002',
              txHash: '0xdef789abc012345',
              blockNumber: 12345679,
              timestamp: new Date().toISOString()
            }
          ],
          vintages: [
            {
              classId: 'CLASS-002',
              vintage: '2023',
              issued: 5000,
              retired: 1000
            }
          ],
          evidence: [
            {
              id: 'EVIDENCE-002',
              fileName: 'solar_energy_report.pdf',
              sha256: 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567',
              timestamp: new Date().toISOString()
            }
          ]
        } as T
      }
    }
    
    if (endpoint.includes('/projects')) {
      return {
        data: [
          {
            id: 'PROJ-001',
            title: 'Forest Conservation Project',
            status: 'active',
            country: 'Brazil',
            methodology: 'REDD+',
            vintage: '2023',
            totals: {
              issued: 10000,
              retired: 2500
            },
            lastDigestAt: new Date().toISOString()
          },
          {
            id: 'PROJ-002', 
            title: 'Solar Energy Initiative',
            status: 'active',
            country: 'India',
            methodology: 'Solar',
            vintage: '2023',
            totals: {
              issued: 5000,
              retired: 1000
            },
            lastDigestAt: new Date().toISOString()
          }
        ],
        total: 2,
        page: 1,
        limit: 10
      } as T
    }
    
    if (endpoint.includes('/issuances')) {
      return [
        {
          classId: 'CLASS-001',
          projectId: 'PROJ-001',
          vintage: '2023',
          totalIssued: 10000,
          totalRetired: 2500,
          status: 'active',
          methodology: 'REDD+',
          country: 'Brazil'
        },
        {
          classId: 'CLASS-002',
          projectId: 'PROJ-002',
          vintage: '2023',
          totalIssued: 5000,
          totalRetired: 1000,
          status: 'active',
          methodology: 'Solar',
          country: 'India'
        },
        {
          classId: 'CLASS-003',
          projectId: 'PROJ-001',
          vintage: '2022',
          totalIssued: 8000,
          totalRetired: 3000,
          status: 'active',
          methodology: 'REDD+',
          country: 'Brazil'
        }
      ] as T
    }
    
    // Default mock response
    return {} as T
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
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout
    
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`Adapter API request failed: ${response.statusText}`)
      }
      return response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      // Return mock data for development when external APIs are unavailable
      if (error instanceof Error && (error.name === 'AbortError' || error.message.includes('fetch failed'))) {
        console.warn(`External Adapter API unavailable, returning mock data for ${endpoint}`)
        return this.getMockData<T>(endpoint)
      }
      throw error
    }
  }

  private getMockData<T>(endpoint: string): T {
    // Return appropriate mock data based on endpoint
    if (endpoint.includes('/v1/tx/')) {
      return {
        hash: endpoint.split('/').pop(),
        blockNumber: 12345678,
        timestamp: new Date().toISOString(),
        from: '0x1234567890123456789012345678901234567890',
        to: '0x0987654321098765432109876543210987654321',
        value: '1000000000000000000',
        gasUsed: 21000,
        gasPrice: '20000000000',
        status: 'success',
        events: [],
        logs: []
      } as T
    }
    
    if (endpoint.includes('/v1/receipts/')) {
      return {
        adapterTxId: endpoint.split('/').pop(),
        status: 'completed',
        txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
        timestamp: new Date().toISOString()
      } as T
    }
    
    // Default mock response
    return {} as T
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
