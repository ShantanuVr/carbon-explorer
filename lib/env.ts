import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_REGISTRY_API_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_ADAPTER_API_URL: z.string().url().default('http://localhost:3001'),
  NEXT_PUBLIC_RPC_URL: z.string().url().optional(),
  NEXT_PUBLIC_CHAIN_ID: z.string().default('31337'),
  NEXT_PUBLIC_BLOCK_EXPLORER_URL: z.string().url().optional(),
  NEXT_PUBLIC_FEATURE_HOLDERS: z.string().transform(val => val === 'true').default('false'),
  NEXT_PUBLIC_FEATURE_SUBGRAPH: z.string().transform(val => val === 'true').default('false'),
  NEXT_PUBLIC_BRAND_NAME: z.string().default('Sim Registry'),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_REGISTRY_API_URL: process.env.NEXT_PUBLIC_REGISTRY_API_URL,
  NEXT_PUBLIC_ADAPTER_API_URL: process.env.NEXT_PUBLIC_ADAPTER_API_URL,
  NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
  NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
  NEXT_PUBLIC_BLOCK_EXPLORER_URL: process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL,
  NEXT_PUBLIC_FEATURE_HOLDERS: process.env.NEXT_PUBLIC_FEATURE_HOLDERS,
  NEXT_PUBLIC_FEATURE_SUBGRAPH: process.env.NEXT_PUBLIC_FEATURE_SUBGRAPH,
  NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME,
})

export type Env = z.infer<typeof envSchema>
