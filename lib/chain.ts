import { ethers } from 'ethers'
import { env } from './env'

// Chain utilities for reading blockchain data
export class ChainClient {
  private provider?: ethers.JsonRpcProvider

  constructor() {
    if (env.NEXT_PUBLIC_RPC_URL) {
      this.provider = new ethers.JsonRpcProvider(env.NEXT_PUBLIC_RPC_URL)
    }
  }

  async getTotalIssued(classId: string): Promise<number> {
    if (!this.provider) {
      throw new Error('RPC provider not configured')
    }
    
    // This would need the actual contract ABI and address
    // For now, return 0 as placeholder
    return 0
  }

  async getTotalRetired(classId: string): Promise<number> {
    if (!this.provider) {
      throw new Error('RPC provider not configured')
    }
    
    // This would need the actual contract ABI and address
    // For now, return 0 as placeholder
    return 0
  }

  async getTransaction(txHash: string): Promise<any> {
    if (!this.provider) {
      throw new Error('RPC provider not configured')
    }
    
    try {
      const tx = await this.provider.getTransaction(txHash)
      const receipt = await this.provider.getTransactionReceipt(txHash)
      
      return {
        ...tx,
        receipt,
        status: receipt?.status === 1 ? 'success' : 'failed'
      }
    } catch (error) {
      throw new Error(`Failed to fetch transaction: ${error}`)
    }
  }

  async getBlockExplorerUrl(txHash: string): Promise<string | null> {
    if (!env.NEXT_PUBLIC_BLOCK_EXPLORER_URL) {
      return null
    }
    
    return `${env.NEXT_PUBLIC_BLOCK_EXPLORER_URL}/tx/${txHash}`
  }

  isAvailable(): boolean {
    return !!this.provider
  }
}

export const chainClient = new ChainClient()
