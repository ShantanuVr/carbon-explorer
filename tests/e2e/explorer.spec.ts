import { test, expect } from '@playwright/test'

test.describe('Carbon Credit Explorer', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/Carbon Credit Explorer/)
    await expect(page.getByRole('heading', { name: 'Carbon Credit Registry Explorer' })).toBeVisible()
  })

  test('projects page loads correctly', async ({ page }) => {
    await page.goto('/projects')
    
    await expect(page).toHaveTitle(/Projects/)
    await expect(page.getByRole('heading', { name: 'Carbon Credit Projects' })).toBeVisible()
  })

  test('issuances page loads correctly', async ({ page }) => {
    await page.goto('/issuances')
    
    await expect(page).toHaveTitle(/Issuances/)
    await expect(page.getByRole('heading', { name: 'Carbon Credit Issuances' })).toBeVisible()
  })

  test('retirements page loads correctly', async ({ page }) => {
    await page.goto('/retirements')
    
    await expect(page).toHaveTitle(/Retirements/)
    await expect(page.getByRole('heading', { name: 'Retirement Certificates' })).toBeVisible()
  })

  test('anchors page loads correctly', async ({ page }) => {
    await page.goto('/anchors')
    
    await expect(page).toHaveTitle(/Evidence Anchors/)
    await expect(page.getByRole('heading', { name: 'Evidence Anchors' })).toBeVisible()
  })

  test('health check endpoint works', async ({ request }) => {
    const response = await request.get('/api/health')
    expect(response.ok()).toBeTruthy()
    
    const data = await response.json()
    expect(data).toHaveProperty('ok')
    expect(data).toHaveProperty('registry')
    expect(data).toHaveProperty('adapter')
    expect(data).toHaveProperty('chain')
  })
})
