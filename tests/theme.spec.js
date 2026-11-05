import { test, expect } from '@playwright/test';

// Body background colours from styles.css
const LIGHT = 'rgb(255, 255, 255)';
const DARK = 'rgb(18, 20, 23)';

const background = (page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

for (const [system, systemBg, otherBg] of [['light', LIGHT, DARK], ['dark', DARK, LIGHT]]) {
  test.describe(`Theme toggle when the device is set to ${system} mode`, () => {
    test.use({ colorScheme: system });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('follows the device setting by default', async ({ page }) => {
      expect(await background(page)).toBe(systemBg);
      const other = system === 'light' ? 'dark' : 'light';
      await expect(page.locator('#theme-toggle')).toHaveAccessibleName(`Switch to ${other} mode`);
    });

    test('switches theme and remembers the choice after a reload', async ({ page }) => {
      await page.locator('#theme-toggle').click();
      expect(await background(page)).toBe(otherBg);

      await page.reload();
      expect(await background(page)).toBe(otherBg);

      await page.locator('#theme-toggle').click();
      expect(await background(page)).toBe(systemBg);
    });

    test('works with the keyboard', async ({ page }) => {
      await page.locator('#theme-toggle').focus();
      await page.keyboard.press('Enter');
      expect(await background(page)).toBe(otherBg);
    });
  });
}
