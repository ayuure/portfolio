import { test, expect } from '@playwright/test';

const EMAIL = 'mailto:ayuurebertina@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/bertina-ayuure-1303451b6/';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows who Bertina is and how to reach her without scrolling', async ({ page }) => {
    await expect(page).toHaveTitle('Bertina Ayuure | QA Engineer');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('test automation');
    await expect(page.getByText('Quality Assurance Engineer')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Download CV' }).first()).toBeInViewport();
  });

  test('shows the "Tested with Playwright" badge with its logo', async ({ page }) => {
    const badge = page.locator('#top .badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Tested with');
    await expect(badge).toContainText('Playwright');
    const logo = badge.getByRole('img', { name: 'Playwright logo' });
    await expect(logo).toBeVisible();
    expect(await logo.evaluate((img) => img.complete && img.naturalWidth > 0), 'logo image loaded').toBe(true);
  });

  test('every menu link jumps to its section', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Main' });
    for (const name of ['Work', 'Experience', 'Toolbox', 'Contact']) {
      const link = nav.getByRole('link', { name, exact: true });
      const target = await link.getAttribute('href');
      await link.click();
      await expect(page.locator(target)).toBeInViewport();
    }
  });

  test('reloading after using the menu starts back at the top', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page.locator('#contact')).toBeInViewport();

    await page.reload();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page).not.toHaveURL(/#/);
  });

  test('reloading after scrolling starts back at the top', async ({ page }) => {
    await page.locator('#toolbox').scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await page.reload();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test('every in-page link points to a section that exists', async ({ page }) => {
    const hrefs = await page.locator('a[href^="#"]').evaluateAll((links) =>
      links.map((a) => a.getAttribute('href')).filter((href) => href !== '#'),
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      await expect(page.locator(href), `link target ${href}`).toHaveCount(1);
    }
  });

  test('shows the three featured case studies', async ({ page }) => {
    const cases = page.locator('#work article');
    await expect(cases).toHaveCount(3);
    for (const heading of [
      'AI-powered regression impact analysis',
      'Test automation framework built from scratch',
      'End-to-end, API and database testing for an inventory system',
    ]) {
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    }
  });

  test('CV downloads as a PDF', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download CV' }).first().click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('Bertina_Ayuure_CV.pdf');

    const response = await page.request.get('/assets/Bertina_Ayuure_CV.pdf');
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toBe('application/pdf');
  });

  test('email and LinkedIn links go to the right places', async ({ page }) => {
    const emailLinks = page.locator('a[href^="mailto:"]');
    await expect(emailLinks).toHaveCount(2);
    for (const link of await emailLinks.all()) {
      await expect(link).toHaveAttribute('href', EMAIL);
    }

    const linkedInLinks = page.getByRole('link', { name: 'LinkedIn' });
    await expect(linkedInLinks).toHaveCount(2);
    for (const link of await linkedInLinks.all()) {
      await expect(link).toHaveAttribute('href', LINKEDIN);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });

  test('page fits the screen without sideways scrolling', async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test('a shared link to a section still opens at that section', async ({ page }) => {
  await page.goto('/#work');
  await expect(page.locator('#work')).toBeInViewport();
});

test('page loads without errors in the browser console', async ({ page }) => {
  const errors = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});
