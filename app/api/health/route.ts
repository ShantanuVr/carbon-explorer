import { NextRequest, NextResponse } from 'next/server'
import { registryApi, adapterApi } from '@/lib/api'
import { chainClient } from '@/lib/chain'
import { env } from '@/lib/env'

export async function GET(request: NextRequest) {
  const health = {
    ok: true,
    registry: false,
    adapter: false,
    chain: false,
    network: env.NEXT_PUBLIC_CHAIN_ID,
  }

  try {
    // Check registry API
    try {
      await registryApi.getRegistryStats()
      health.registry = true
    } catch (error) {
      console.error('Registry health check failed:', error)
    }

    // Check adapter API
    try {
      // Try a simple endpoint that should exist
      await fetch(`${env.NEXT_PUBLIC_ADAPTER_API_URL}/v1/health`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      })
      health.adapter = true
    } catch (error) {
      console.error('Adapter health check failed:', error)
    }

    // Check chain connection
    try {
      if (chainClient.isAvailable()) {
        health.chain = true
      }
    } catch (error) {
      console.error('Chain health check failed:', error)
    }

    // Overall health is OK if at least registry is available
    health.ok = health.registry

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      { 
        ok: false, 
        registry: false, 
        adapter: false, 
        chain: false,
        error: 'Health check failed' 
      },
      { status: 500 }
    )
  }
}
