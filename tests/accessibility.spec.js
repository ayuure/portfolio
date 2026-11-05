import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const scheme of ['light', 'dark']) {
  test.describe(`Accessibility in ${scheme} mode`, () => {
    test.use({ colorScheme: scheme });

    test('has no WCAG 2.1 AA violations', async ({ page }) => {
      await page.goto('/');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });
}

test('keyboard users can skip straight to the content', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Safari only tabs to links when "Press Tab to highlight each item" is on');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('headings go in order without skipping levels', async ({ page }) => {
  await page.goto('/');
  const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((hs) => hs.map((h) => Number(h.tagName[1])));
  expect(levels[0]).toBe(1);
  expect(levels.filter((l) => l === 1)).toHaveLength(1);
  for (let i = 1; i < levels.length; i++) {
    expect(levels[i] - levels[i - 1], `heading ${i + 1} jumps a level`).toBeLessThanOrEqual(1);
  }
});
