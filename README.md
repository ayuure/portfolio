# Bertina Ayuure – QA Engineer Portfolio

My portfolio site: plain HTML and CSS, with automated tests that run on every change.

## How the site is tested

| What | Tool | Where |
|---|---|---|
| Content, links, CV download, theme toggle, mobile layout, console errors | Playwright | [tests/home.spec.js](tests/home.spec.js), [tests/theme.spec.js](tests/theme.spec.js) |
| WCAG 2.1 AA accessibility in light and dark mode, keyboard access, heading order | axe-core + Playwright | [tests/accessibility.spec.js](tests/accessibility.spec.js) |
| Performance, accessibility, best practices and SEO (each must score 95+) | Lighthouse CI | [lighthouserc.json](lighthouserc.json) |

The Playwright tests run in Chrome and Firefox on desktop, and in Safari on an iPhone 13 screen.

## Run the tests yourself

```bash
npm install
npx playwright install
npm test              # run all tests
npm run test:report   # open the HTML report
```
