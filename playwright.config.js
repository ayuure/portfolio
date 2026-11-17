import { defineConfig, devices } from '@playwright/test';

const CI = !!process.env.CI;
// Set BASE_URL to test a deployed copy, e.g. BASE_URL=https://ayuure.github.io/portfolio/ npm test
// (keep the trailing slash). Without it, the tests start a local server.
const BASE_URL = process.env.BASE_URL;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL || 'http://localhost:4173/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  // The site is plain static files, so Python's built-in server is enough (preinstalled on macOS and GitHub runners)
  webServer: BASE_URL ? undefined : {
    command: 'python3 -m http.server 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !CI,
    stderr: 'ignore', // hides the server's per-request log lines
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'desktop-firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
});
