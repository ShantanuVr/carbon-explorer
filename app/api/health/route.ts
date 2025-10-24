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
    timestamp: new Date().toISOString(),
    message: 'Health check completed'
  }

  try {
    // Check registry API (will return mock data if unavailable)
    try {
      await registryApi.getRegistryStats()
      health.registry = true
    } catch (error) {
      console.error('Registry health check failed:', error)
    }

    // Check adapter API (will return mock data if unavailable)
    try {
      await adapterApi.getReceipt('test')
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

    // Overall health is OK if at least one service is available or mock data is working
    health.ok = health.registry || health.adapter || health.chain

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      { 
        ok: false, 
        registry: false, 
        adapter: false, 
        chain: false,
        network: env.NEXT_PUBLIC_CHAIN_ID,
        timestamp: new Date().toISOString(),
        error: 'Health check failed' 
      },
      { status: 500 }
    )
  }
}