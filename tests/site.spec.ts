import { expect, test } from '@playwright/test'

test('pages render bundled fonts before platform fonts', async ({ page }) => {
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('DOM.enable')
  await cdp.send('CSS.enable')

  for (const route of ['/', '/about']) {
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    const { root } = await cdp.send('DOM.getDocument')

    for (const [selector, family, renderedFamily] of [
      ['.title', 'Chicago_12', 'ChiKareGo2'],
      ['.details a', 'Chicago', 'ChicagoFLF'],
      [route === '/' ? '.text' : 'p.dialog-text', 'Chicago', 'ChicagoFLF'],
    ]) {
      // Linux may lack Menlo, masking an incorrect font order on macOS.
      const firstFamily = await page
        .locator(selector)
        .first()
        .evaluate(
          (element) => getComputedStyle(element).fontFamily.split(',')[0],
        )
      expect(firstFamily).toBe(family)

      const { nodeId } = await cdp.send('DOM.querySelector', {
        nodeId: root.nodeId,
        selector,
      })
      const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', {
        nodeId,
      })
      expect(fonts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            familyName: renderedFamily,
            isCustomFont: true,
          }),
        ]),
      )
    }
  }
})

test('home assets load and navigation survives browser history', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (
      response.url().startsWith('http://127.0.0.1:4173') &&
      response.status() >= 400
    ) {
      errors.push(`${response.status()} ${response.url()}`)
    }
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Booling✨' })).toBeVisible()
  await expect(page.getByText('Self Introduction')).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Blog', exact: true }),
  ).toHaveAttribute('href', 'https://blog.booling.cn/')
  const avatar = page.getByRole('img', { name: 'avatar', exact: true })
  await expect(avatar).toBeVisible()
  await expect
    .poll(() =>
      avatar.evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0)
  await page.evaluate(() => document.fonts.ready)

  await page.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL('/about')
  await expect(
    page.getByRole('heading', { name: 'About', exact: true }),
  ).toBeVisible()
  await page.goBack()
  await expect(page.getByText('Self Introduction')).toBeVisible()
  expect(errors).toEqual([])
})

test('about opens directly and survives reload', async ({ page }) => {
  await page.goto('/about')
  await expect(
    page.getByRole('heading', { name: 'About', exact: true }),
  ).toBeVisible()
  await page.reload()
  await expect(
    page.getByRole('link', { name: 'GitHub', exact: true }),
  ).toHaveAttribute('href', 'https://github.com/bingling-sama/Booling/')
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page.getByText('Self Introduction')).toBeVisible()
})

test('pages fit the viewport without horizontal scrolling', async ({
  page,
}) => {
  for (const route of ['/', '/about']) {
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(await page.evaluate(() => window.innerWidth))
  }
})
