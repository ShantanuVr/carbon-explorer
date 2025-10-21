import { formatNumber, formatPercentage, formatDate } from '@/lib/format'

describe('format utilities', () => {
  describe('formatNumber', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000')
      expect(formatNumber(1000000)).toBe('1,000,000')
    })
  })

  describe('formatPercentage', () => {
    it('calculates and formats percentages correctly', () => {
      expect(formatPercentage(25, 100)).toBe('25.0%')
      expect(formatPercentage(1, 3)).toBe('33.3%')
    })

    it('handles zero total', () => {
      expect(formatPercentage(10, 0)).toBe('0%')
    })
  })

  describe('formatDate', () => {
    it('formats dates in UTC', () => {
      const date = '2024-01-15T10:30:00Z'
      const formatted = formatDate(date)
      expect(formatted).toContain('2024-01-15')
      expect(formatted).toContain('UTC')
    })
  })
})
