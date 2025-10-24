'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'

type LedgerType = 'credits' | 'tokens'

interface ThemeContextType {
  ledgerType: LedgerType
  setLedgerType: (type: LedgerType) => void
  authority: string
  environment: string
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Determine ledger type from pathname
  const getLedgerTypeFromPath = (path: string): LedgerType => {
    if (path.startsWith('/tokens')) return 'tokens'
    if (path.startsWith('/credits')) return 'credits'
    return 'credits' // default to credits
  }
  
  const [ledgerType, setLedgerType] = React.useState<LedgerType>(
    getLedgerTypeFromPath(pathname)
  )
  
  // Update ledger type when pathname changes
  React.useEffect(() => {
    setLedgerType(getLedgerTypeFromPath(pathname))
  }, [pathname])
  
  const authority = ledgerType === 'credits' 
    ? 'Registry API (Off-chain, Authoritative)' 
    : 'Blockchain (On-chain Representation)'
    
  const environment = process.env.NEXT_PUBLIC_CHAIN_ID === '31337' 
    ? 'Local Development' 
    : `Network: ${process.env.NEXT_PUBLIC_CHAIN_ID}`

  return (
    <ThemeContext.Provider value={{ ledgerType, setLedgerType, authority, environment }}>
      <div className={ledgerType === 'credits' ? 'credits-theme' : 'tokens-theme'}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
