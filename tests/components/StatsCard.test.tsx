import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StatsCard } from '@/components/StatsCards'

describe('StatsCard', () => {
  it('renders title and value correctly', () => {
    render(<StatsCard title="Total Projects" value="100" />)
    
    expect(screen.getByText('Total Projects')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders delta when provided', () => {
    render(
      <StatsCard 
        title="Total Issued" 
        value="1000" 
        delta={{ value: 5.2, label: 'vs last month' }}
      />
    )
    
    expect(screen.getByText('+5.2%')).toBeInTheDocument()
    expect(screen.getByText('vs last month')).toBeInTheDocument()
  })
})
