import { expect, test } from '@playwright/test'
import { fileURLToPath } from 'node:url'

test('Booling follows system changes before Vue loads', async ({ page }) => {
  // Theme selection must not depend on the application bundle finishing.
  await page.route('**/*.js', (route) => route.abort())
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark')
  await expect(page.locator('#app')).toBeEmpty()

  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light')
})

test('both routes keep the system theme through navigation and reload', async ({
  page,
}) => {
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme })
    await page.goto('/')
    const background =
      theme === 'dark' ? 'rgb(28, 28, 28)' : 'rgb(255, 255, 255)'
    const foreground = theme === 'dark' ? 'rgb(230, 230, 230)' : 'rgb(0, 0, 0)'

    for (const route of ['/', '/about']) {
      if (route === '/about') {
        await page.getByRole('link', { name: 'About', exact: true }).click()
      }
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      await expect(page.locator('.window')).toHaveCSS(
        'background-color',
        background,
      )
      await expect(page.locator('.content')).toHaveCSS('color', foreground)
      await page.reload()
      await expect(page.locator('.window')).toHaveCSS(
        'background-color',
        background,
      )
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true)
    }
  }

  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('.window')).toHaveCSS(
    'background-color',
    'rgb(28, 28, 28)',
  )
})

test('System.css exposes explicit themes independently of the OS', async ({
  page,
}) => {
  // Serve the library's own built docs, without Booling's automatic selection.
  await page.route('**/system-preview/**', async (route) => {
    const resource = new URL(route.request().url()).pathname.slice(
      '/system-preview/'.length,
    )
    await route.fulfill({
      path: fileURLToPath(
        new URL(`../packages/system/dist/${resource}`, import.meta.url),
      ),
    })
  })
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/system-preview/index.html')
  const root = page.locator('html')
  await expect(root).not.toHaveAttribute('data-theme')
  await expect(root).toHaveCSS('color-scheme', 'light')

  for (const theme of ['dark', 'light'] as const) {
    await page
      .getByRole('button', {
        name: `${theme === 'dark' ? 'Dark' : 'Light'} theme`,
      })
      .click()
    const background =
      theme === 'dark' ? 'rgb(28, 28, 28)' : 'rgb(255, 255, 255)'
    const foreground = theme === 'dark' ? 'rgb(230, 230, 230)' : 'rgb(0, 0, 0)'
    await expect(root).toHaveCSS('color-scheme', theme)
    await expect(page.locator('.standard-dialog').first()).toHaveCSS(
      'color',
      foreground,
    )
    await expect(page.locator('.standard-dialog').first()).toHaveCSS(
      'background-color',
      background,
    )

    const input = page.getByRole('textbox', { name: 'Example text box' })
    await expect(input).toHaveCSS('background-color', background)
    await input.focus()
    await expect(input).toHaveCSS('color', background)
    await expect(input).toHaveCSS('background-color', foreground)
    await input.blur()
    await expect(input).toHaveCSS('background-color', background)

    const button = page
      .getByRole('button', { name: 'Cancel', exact: true })
      .first()
    await button.hover()
    await page.mouse.down()
    await expect(button).toHaveCSS('color', background)
    await expect(button).toHaveCSS('background-color', foreground)
    await page.mouse.up()
    await expect(button).toHaveCSS('background-color', background)
    await expect(
      page.getByRole('button', { name: 'Disabled', exact: true }),
    ).toHaveCSS(
      'color',
      theme === 'dark' ? 'rgb(133, 133, 133)' : 'rgb(182, 183, 184)',
    )

    const checkbox = page
      .locator('input[type="checkbox"]:not(:disabled)')
      .first()
    const checkboxLabel = page.locator(
      `label[for="${await checkbox.getAttribute('id')}"]`,
    )
    await checkboxLabel.click()
    await expect(checkbox).toBeChecked()
    await expect(checkboxLabel).toHaveCSS(
      'background-image',
      /data:image\/svg\+xml/,
      { pseudo: 'after' },
    )
    await checkboxLabel.click()

    const radio = page.locator('input[type="radio"]').first()
    const radioLabel = page.locator(
      `label[for="${await radio.getAttribute('id')}"]`,
    )
    await radioLabel.click()
    await expect(radio).toBeChecked()
    await expect(radioLabel).toHaveCSS(
      'background-image',
      /data:image\/svg\+xml/,
      { pseudo: 'after' },
    )

    const menu = page
      .locator('[role="menu-bar"] > [aria-haspopup="true"]')
      .first()
    await menu.focus()
    await expect(menu.locator('[role="menu"]')).toBeVisible()
    await expect(menu.locator('[role="menu"]')).toHaveCSS('color', foreground)
    await expect(menu.locator('[role="menu"]')).toHaveCSS(
      'background-color',
      background,
    )

    if (theme === 'dark') {
      const icons = await root.evaluate((element) => {
        const styles = getComputedStyle(element)
        return [
          'button',
          'button-default',
          'scrollbar-up',
          'scrollbar-up-active',
          'scrollbar-down',
          'scrollbar-down-active',
          'scrollbar-left',
          'scrollbar-left-active',
          'scrollbar-right',
          'scrollbar-right-active',
          'radio-border',
          'radio-border-focused',
          'radio-dot',
          'checkmark',
          'select-button',
          'apple',
        ].map((name) => ({
          name,
          source: decodeURIComponent(styles.getPropertyValue(`--icon-${name}`)),
        }))
      })
      for (const icon of icons) {
        expect(icon.source, icon.name).toContain('#e6e6e6')
        expect(icon.source, icon.name).not.toMatch(
          /(?:fill|stroke)=['"](?:black|white)['"]/,
        )
      }
    }
  }
})
