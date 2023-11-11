import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  // await page.goto(process.env.VERCEL_PREVIEW_URL || 'http://localhost:3000/')
  console.log(`PR preview URL: ${process.env.VERCEL_PREVIEW_URL}`)

  // await expect(page).toHaveTitle(/Super Simon/)
})
