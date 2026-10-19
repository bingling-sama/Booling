import { expect, test, type Page } from '@playwright/test'

const viewports = [
  { width: 280, height: 568 },
  { width: 320, height: 568 },
  { width: 375, height: 667 },
  { width: 414, height: 896 },
  { width: 479, height: 800 },
  { width: 480, height: 800 },
  { width: 767, height: 1024 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 2560, height: 1440 },
  { width: 667, height: 375 },
  { width: 844, height: 390 },
]

async function expectContentToFit(page: Page, route: string) {
  await page.evaluate(() => document.fonts.ready)
  const layout = await page.locator('.window').evaluate((window) => {
    const bounds = window.getBoundingClientRect()
    const content = window.querySelector('.content')!.getBoundingClientRect()
    const overflowing = [window, ...window.querySelectorAll<HTMLElement>('*')]
      .filter(
        (element) =>
          element.clientHeight > 0 &&
          (element.scrollWidth > element.clientWidth + 1 ||
            element.scrollHeight > element.clientHeight + 1),
      )
      .map((element) => element.className || element.tagName)

    return {
      viewportWidth: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      left: bounds.left,
      right: bounds.right,
      top: bounds.top,
      bottom: bounds.bottom,
      contentBottom: content.bottom,
      overflowing,
    }
  })

  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  expect(layout.left).toBeGreaterThanOrEqual(0)
  expect(layout.right).toBeLessThanOrEqual(layout.viewportWidth)
  expect(layout.top).toBeGreaterThanOrEqual(0)
  expect(layout.contentBottom).toBeLessThanOrEqual(layout.bottom)
  expect(layout.overflowing).toEqual([])

  const lastContent = page.locator(
    route === '/' ? '.brief li:last-child' : '.copyright',
  )
  await lastContent.evaluate((element) =>
    element.scrollIntoView({ block: 'center' }),
  )
  await expect(lastContent).toBeInViewport({ ratio: 1 })
}

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`${colorScheme} responsive layout`, () => {
    test.use({ colorScheme })

    for (const viewport of viewports) {
      test(`content remains reachable at ${viewport.width}x${viewport.height}`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport)

        for (const route of ['/', '/about']) {
          await page.goto(route)
          await expectContentToFit(page, route)

          const windowBox = (await page.locator('.window').boundingBox())!
          const gutter = viewport.width < 480 ? 12 : 24
          expect(windowBox.width).toBeCloseTo(
            Math.min(
              viewport.width - gutter * 2,
              viewport.width >= 768 ? 576 : 640,
            ),
            0,
          )

          if (viewport.width >= 768) {
            expect(windowBox.height).toBeGreaterThanOrEqual(
              (windowBox.width * 3) / 4 - 1,
            )
          }

          for (const link of await page.locator('.details a').all()) {
            expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(
              44,
            )
          }

          if (route === '/') {
            const avatar = (await page.locator('.avatar img').boundingBox())!
            const profile = (await page.locator('.link').boundingBox())!
            expect(avatar.width).toBeCloseTo(avatar.height, 0)
            if (viewport.width < 480) {
              expect(avatar.y + avatar.height).toBeLessThanOrEqual(profile.y)
            } else {
              expect(avatar.x + avatar.width).toBeLessThanOrEqual(profile.x)
            }
          }
        }
      })
    }

    for (const width of [280, 320, 480, 768]) {
      test(`content reflows with 200% text at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 568 })
        for (const route of ['/', '/about']) {
          await page.goto(route)
          // Enlarge rem-based text and spacing without using pinch zoom.
          await page.addStyleTag({ content: 'html { font-size: 200%; }' })
          await expectContentToFit(page, route)

          if (route === '/' && width <= 480) {
            const avatar = (await page.locator('.avatar img').boundingBox())!
            const profile = (await page.locator('.link').boundingBox())!
            expect(avatar.y + avatar.height).toBeLessThanOrEqual(profile.y)
          }
        }
      })
    }

    test('navigation supports keyboard focus, selection and hover', async ({
      page,
    }) => {
      await page.goto('/')
      const navigation = page.getByRole('navigation', {
        name: 'Primary navigation',
      })
      for (const name of ['Home', 'Blog', 'About']) {
        await page.keyboard.press('Tab')
        const link = navigation.getByRole('link', { name, exact: true })
        await expect(link).toBeFocused()
        await expect(link.locator('span')).toHaveCSS('outline-style', 'solid')
        await expect(link.locator('span')).toHaveCSS('outline-width', '2px')
      }

      await page.keyboard.press('Enter')
      await expect(page).toHaveURL('/about')
      await expect(
        navigation.getByRole('link', { name: 'About' }),
      ).toHaveAttribute('aria-current', 'page')
      await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()

      const source = page.getByRole('link', { name: 'GitHub', exact: true })
      await source.focus()
      await expect(source).toHaveCSS('outline-style', 'solid')

      const home = navigation.getByRole('link', { name: 'Home', exact: true })
      await home.focus()
      await page.keyboard.press('Enter')
      await expect(page).toHaveURL('/')
      await expect(home).toHaveAttribute('aria-current', 'page')
      await home.hover()
      await expect(home.locator('span')).toHaveCSS(
        'background-color',
        colorScheme === 'dark' ? 'rgb(230, 230, 230)' : 'rgb(0, 0, 0)',
      )
      await expect(home.locator('span')).toHaveCSS(
        'color',
        colorScheme === 'dark' ? 'rgb(28, 28, 28)' : 'rgb(255, 255, 255)',
      )
    })
  })
}
