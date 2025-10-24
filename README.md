# Carbon Credit Explorer

A public explorer with split views for Credits (registry) and Tokens (chain), plus anchors and receipts.

## Features

- **Projects**: Browse carbon credit projects by status, country, and methodology
- **Issuances**: View carbon credit issuances and batches
- **Retirements**: Explore retirement certificates and verify authenticity
- **Evidence Anchors**: Browse IoT digests and issuance bundles stored on-chain and IPFS
- **Transaction Explorer**: View blockchain transaction details
- **Health Monitoring**: Real-time system status for all connected services

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: TailwindCSS + shadcn/ui components with dark mode support
- **Data Fetching**: React Query (TanStack) with caching and ISR
- **Charts**: Recharts for data visualization
- **Time Handling**: Day.js with UTC support
- **Validation**: Zod for environment configuration
- **Icons**: Lucide React
- **Accessibility**: Radix primitives with WCAG AA compliance

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Docker and Docker Compose (for full stack)

### Local Development

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd carbon-explorer
   pnpm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```
   
   The app will be available at `http://localhost:3002`

### Docker Development

1. **Start the full stack**:
   ```bash
   docker compose up -d
   ```

2. **Install dependencies and start dev server**:
   ```bash
   pnpm install
   pnpm dev
   ```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_REGISTRY_API_URL` | Registry API endpoint | `http://localhost:3000` |
| `NEXT_PUBLIC_ADAPTER_API_URL` | Adapter API endpoint | `http://localhost:3001` |
| `NEXT_PUBLIC_RPC_URL` | Blockchain RPC endpoint | `http://localhost:8545` |
| `NEXT_PUBLIC_CHAIN_ID` | Blockchain chain ID | `31337` |
| `NEXT_PUBLIC_BLOCK_EXPLORER_URL` | Block explorer URL | `http://localhost:3001` |
| `NEXT_PUBLIC_FEATURE_HOLDERS` | Enable holder breakdowns | `false` |
| `NEXT_PUBLIC_FEATURE_SUBGRAPH` | Enable subgraph features | `false` |
| `NEXT_PUBLIC_BRAND_NAME` | Application brand name | `Sim Registry` |

### Data Sources

The explorer connects to three main data sources:

1. **Registry API** (`official-registry-sim`): Source of truth for projects, holdings, serial ranges, and certificates
2. **Adapter API** (`registry-adapter-api`): Provides transaction receipts and blockchain integration
3. **Blockchain** (`chain-core-contracts`): Direct blockchain queries for verification and transaction details

## Demo Tour

Explore these interesting pages to see the explorer in action:

- **Home**: [http://localhost:3002](http://localhost:3002) - Overview with registry stats
- **Projects**: [http://localhost:3002/projects](http://localhost:3002/projects) - Browse all projects
- **Project Detail**: [http://localhost:3002/projects/PROJ-001](http://localhost:3002/projects/PROJ-001) - Detailed project view with evidence
- **Issuances**: [http://localhost:3002/issuances](http://localhost:3002/issuances) - View carbon credit issuances
- **Retirements**: [http://localhost:3002/retirements](http://localhost:3002/retirements) - Browse retirement certificates
- **Certificate**: [http://localhost:3002/retirements/CERT-001](http://localhost:3002/retirements/CERT-001) - Detailed certificate view
- **Anchors**: [http://localhost:3002/anchors](http://localhost:3002/anchors) - Evidence anchors and IoT digests
- **Health Check**: [http://localhost:3002/api/health](http://localhost:3002/api/health) - System status

## API Endpoints

### Health Check
- `GET /api/health` - Returns system health status for all connected services

### Registry API Integration
- `GET /reports/registry-stats` - Registry statistics
- `GET /projects` - List projects with filtering
- `GET /projects/:id` - Project details
- `GET /projects/:id/evidence` - Project evidence
- `GET /issuances` - List issuances
- `GET /issuances/:id` - Issuance details
- `GET /retirements/:certificateId` - Retirement certificate

### Adapter API Integration
- `GET /v1/receipts/:adapterTxId` - Transaction receipt
- `GET /v1/tx/:txHash` - Transaction details
- `GET /v1/classes/resolve` - Resolve classes by project and vintage

## Architecture

### Components

- **StatsCards**: Numeric displays with inline deltas
- **DataTable**: Virtualized tables with sorting and CSV export
- **RangePill**: Serial range display with copy functionality
- **AnchorList**: Evidence anchor display with verification links
- **Copyable**: Copy-to-clipboard components for hashes and IDs
- **ExternalLink**: Safe external link component with validation

### State Management

- **React Query**: Client-side caching with stale-while-revalidate
- **Next.js ISR**: Server-side caching for popular pages (5-minute revalidation)
- **Graceful Degradation**: Partial data display when services are unavailable

### Security

- **Read-Only**: No write operations, all endpoints are public
- **No PII**: Only hashes are displayed, no personal information
- **URI Validation**: All external links are sanitized before display
- **CSP Ready**: Content Security Policy compatible

## Testing

### Unit Tests
```bash
pnpm test
```

### E2E Tests
```bash
pnpm test:e2e
```

### Lighthouse CI
Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90

## Deployment

### Docker
```bash
docker build -t carbon-explorer .
docker run -p 3002:3002 carbon-explorer
```

### Static Export
```bash
pnpm build
pnpm export
```

### Environment-Specific Deployment

The explorer can be pointed at different environments by updating the environment variables:

- **Development**: `NEXT_PUBLIC_REGISTRY_API_URL=http://localhost:3000`
- **Staging**: `NEXT_PUBLIC_REGISTRY_API_URL=https://staging-registry.example.com`
- **Production**: `NEXT_PUBLIC_REGISTRY_API_URL=https://registry.example.com`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the [Health Check endpoint](http://localhost:3002/api/health) for system status
- Review the logs for detailed error information
- Ensure all required services are running and accessible
