import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.VERCEL_PREVIEW_URL || 'http://localhost:3000/')
})

const difficulties = ['EASY', 'NORMAL', 'HARD', 'SUPER SIMON']
const wedges = ['wedge-0', 'wedge-1', 'wedge-2', 'wedge-3']

test.describe('pageload', () => {
  test('should load all homepage content as expected', async ({ page }) => {
    await expect(page).toHaveTitle(/Super Simon/)
    await expect(page.getByTestId('mute-button')).toBeVisible()
    await expect(page.getByTestId('leaderboard-link')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Super Simon' })
    ).toBeVisible()
    await expect(page.getByTestId('homepage-description')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Select a difficulty:' })
    ).toBeVisible()
    for (const difficulty of difficulties) {
      await expect(page.getByRole('button', { name: difficulty })).toBeVisible()
    }
    await expect(page.getByTestId('online-footer')).toHaveText(
      'Built by Lucas Silbernagel'
    )
  })

  test('should load all leaderboard page content as expected', async ({
    page,
  }) => {
    await page.getByTestId('leaderboard-link').click()
    await expect(page).toHaveTitle(/Super Simon | Leaderboard/)
    await expect(page.getByTestId('back-link')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Leaderboard' })
    ).toBeVisible()
    for (const difficulty of difficulties.slice(0, 2)) {
      await expect(page.getByRole('tab', { name: difficulty })).toBeVisible()
    }
    await expect(page.getByTestId('tab-content-wrapper')).toBeVisible()
    await expect(page.getByTestId('play-again-link')).toBeVisible()
    await expect(page.getByTestId('online-footer')).toHaveText(
      'Built by Lucas Silbernagel'
    )
    await page.getByTestId('play-again-link').click()
  })
})

test.describe('gameplay', () => {
  test('starting the game works as expected', async ({ page }) => {
    await page.getByRole('button', { name: 'NORMAL' }).click()
    await page.getByRole('button', { name: 'Start' }).click()
    await expect(page.getByText('0')).toBeVisible()
    for (const wedge of wedges) {
      await expect(page.getByTestId(wedge)).toBeVisible()
    }
  })
})
