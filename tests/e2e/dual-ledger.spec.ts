import { test, expect } from '@playwright/test'

test.describe('Dual-Ledger Theme System', () => {
  test('credits page shows green theme and correct authority', async ({ page }) => {
    await page.goto('/credits')
    
    // Check page title
    await expect(page).toHaveTitle(/Credits/)
    
    // Check header capsule shows credits theme
    await expect(page.locator('[data-testid="header-capsule"]')).toContainText('CREDITS')
    await expect(page.locator('[data-testid="header-capsule"]')).toContainText('Registry API')
    
    // Check theme class is applied
    await expect(page.locator('body')).toHaveClass(/credits-theme/)
    
    // Check green indicator is visible
    await expect(page.locator('.bg-green-500')).toBeVisible()
  })

  test('tokens page shows purple theme and correct authority', async ({ page }) => {
    await page.goto('/tokens')
    
    // Check page title
    await expect(page).toHaveTitle(/Tokens/)
    
    // Check header capsule shows tokens theme
    await expect(page.locator('[data-testid="header-capsule"]')).toContainText('TOKENS')
    await expect(page.locator('[data-testid="header-capsule"]')).toContainText('Blockchain')
    
    // Check theme class is applied
    await expect(page.locator('body')).toHaveClass(/tokens-theme/)
    
    // Check purple indicator is visible
    await expect(page.locator('.bg-purple-500')).toBeVisible()
  })

  test('theme switches when navigating between credits and tokens', async ({ page }) => {
    // Start on credits page
    await page.goto('/credits')
    await expect(page.locator('body')).toHaveClass(/credits-theme/)
    await expect(page.locator('.bg-green-500')).toBeVisible()
    
    // Navigate to tokens page
    await page.click('text=Tokens')
    await expect(page).toHaveURL('/tokens')
    await expect(page.locator('body')).toHaveClass(/tokens-theme/)
    await expect(page.locator('.bg-purple-500')).toBeVisible()
    
    // Navigate back to credits
    await page.click('text=Credits')
    await expect(page).toHaveURL('/credits')
    await expect(page.locator('body')).toHaveClass(/credits-theme/)
    await expect(page.locator('.bg-green-500')).toBeVisible()
  })

  test('proof panel shows dual ledger information', async ({ page }) => {
    await page.goto('/credits/projects/PROJ-001')
    
    // Check proof panel exists
    await expect(page.locator('[data-testid="proof-panel"]')).toBeVisible()
    
    // Check credits section
    await expect(page.locator('[data-testid="credits-panel"]')).toContainText('CREDITS')
    await expect(page.locator('[data-testid="credits-panel"]')).toContainText('Off-chain Registry')
    
    // Check tokens section
    await expect(page.locator('[data-testid="tokens-panel"]')).toContainText('TOKENS')
    await expect(page.locator('[data-testid="tokens-panel"]')).toContainText('On-chain Blockchain')
  })

  test('provenance pill reflects current tab', async ({ page }) => {
    // Test credits page
    await page.goto('/credits')
    await expect(page.locator('[data-testid="provenance-pill"]')).toContainText('Off-chain Registry')
    
    // Test tokens page
    await page.goto('/tokens')
    await expect(page.locator('[data-testid="provenance-pill"]')).toContainText('On-chain Blockchain')
  })

  test('default route redirects to credits', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/credits')
  })

  test('terminology is consistent across pages', async ({ page }) => {
    // Test credits page terminology
    await page.goto('/credits')
    await expect(page.locator('h1')).toContainText('Carbon Credits')
    await expect(page.locator('text=Source of Record')).toContainText('Registry API')
    
    // Test tokens page terminology
    await page.goto('/tokens')
    await expect(page.locator('h1')).toContainText('Carbon Credit Tokens')
    await expect(page.locator('text=Source of Record')).toContainText('Blockchain')
  })
})
