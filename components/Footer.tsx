import * as React from 'react'
import Link from 'next/link'
import { Badge } from './Badge'
import { env } from '@/lib/env'

interface FooterProps {
  healthStatus?: {
    ok: boolean
    registry: boolean
    adapter: boolean
    chain: boolean
    network?: string
  }
}

export function Footer({ healthStatus }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">About</h3>
              <p className="text-sm text-muted-foreground">
                A public explorer with split views for Credits (registry) and Tokens (chain), plus anchors and receipts.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">System Status</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={healthStatus?.registry ? 'success' : 'destructive'}>
                    Registry
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={healthStatus?.adapter ? 'success' : 'destructive'}>
                    Adapter
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={healthStatus?.chain ? 'success' : 'destructive'}>
                    Chain
                  </Badge>
                </div>
                {healthStatus?.network && (
                  <div className="text-xs text-muted-foreground">
                    Network: {healthStatus.network}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Links</h3>
              <div className="space-y-2">
                <Link href="/api/health" className="text-muted-foreground hover:text-foreground transition-colors">
                  Health Check
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {currentYear} {env.NEXT_PUBLIC_BRAND_NAME}. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-2 md:mt-0">
                Read-only explorer • All data is publicly verifiable
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
