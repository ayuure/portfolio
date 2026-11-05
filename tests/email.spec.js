import { test, expect } from '@playwright/test';

const EMAIL = 'ayuurebertina@gmail.com';

// Set up the page before it loads:
// - replace the clipboard with a recorder (reading the real clipboard needs permissions that differ per browser)
// - stop email links from trying to open a mail app during the test (our click handler still runs)
async function prepare(page, { clipboardFails = false } = {}) {
  await page.addInitScript((fail) => {
    window.copied = [];
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: (text) => (fail ? Promise.reject(new Error('blocked')) : (window.copied.push(text), Promise.resolve())),
      },
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('a[href^="mailto:"]')) e.preventDefault();
    }, true);
  }, clipboardFails);
}

const emailLinks = [
  { where: 'top of the page', section: '#top', text: 'Email me' },
  { where: 'contact section', section: '#contact', text: EMAIL },
];

for (const { where, section, text } of emailLinks) {
  test(`"${text}" in the ${where} also copies the address and says so`, async ({ page }) => {
    await prepare(page);
    await page.goto('/');

    await page.locator(section).getByRole('link', { name: text, exact: true }).click();

    expect(await page.evaluate(() => window.copied)).toEqual([EMAIL]);
    const toast = page.getByRole('status');
    await expect(toast).toBeInViewport();
    await expect(toast).toContainText('Email address copied');
    await expect(toast).toContainText(EMAIL);
  });
}

test('if copying is blocked, the message still shows the address', async ({ page }) => {
  await prepare(page, { clipboardFails: true });
  await page.goto('/');

  await page.locator('#top').getByRole('link', { name: 'Email me' }).click();

  const toast = page.getByRole('status');
  await expect(toast).toBeInViewport();
  await expect(toast).toContainText(`you can email me at ${EMAIL}`);
  await expect(toast).not.toContainText('copied');
});

test('the message goes away after 10 seconds', async ({ page }) => {
  await page.clock.install();
  await prepare(page);
  await page.goto('/');

  await page.locator('#top').getByRole('link', { name: 'Email me' }).click();
  const toast = page.getByRole('status');
  await expect(toast).toContainText('Email address copied');

  await page.clock.fastForward(10_000);
  await expect(toast).toHaveText('');
  await expect(toast).not.toBeInViewport();
});
