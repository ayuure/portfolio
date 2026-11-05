# PRD: Bertina Ayuure – QA Engineer Portfolio

**Status:** Draft for review
**Owner:** Bertina Ayuure
**Date:** 3 Nov 2026

---

## 1. Why this exists

A CV lists what you did. A portfolio shows how you think. For a QA engineer, that means showing how you find risk, design tests and build automation.

**Goal:** get interviews for mid-level QA / SDET roles, especially remote roles with European teams.

**Success looks like:**
- A recruiter understands who you are and what you do within 10 seconds.
- A hiring manager can read at least one case study and see how you work.
- The site scores 95+ on Lighthouse for performance, accessibility, best practices and SEO. (You ran Lighthouse audits for Deutsche Telekom, so your own site should pass them.)
- Every visit can end in a message to you or a CV download.

## 2. Who will read it

| Reader | Time spent | What they need |
|---|---|---|
| Recruiter | 10–30 seconds | Your role, years of experience, main tools, location and time zone, how to contact you |
| QA lead / hiring manager | 2–5 minutes | How you design tests, what you have automated, the quality of your code |
| Technical interviewer | 5+ minutes | Real code on GitHub, decisions you made and why |

## 3. Positioning (the one-line pitch)

> **QA Engineer who builds automation and AI-assisted testing tools.**
> 4 years testing web, mobile and APIs for enterprise teams, including Deutsche Telekom. Based in Accra and working European hours.

**Why this angle:** many QA CVs list Playwright and Postman. Your AI regression impact tool is less common, so it should lead. The Selenide framework you built from scratch shows you can design automation, not only use it.

## 4. Site structure (one page, scroll down)

1. **Hero:** your name, the one-line pitch, three buttons (Download CV, Email me, LinkedIn). Email links open the visitor's mail app and also copy the address, with a short message saying so. Many visitors use webmail such as Gmail or Outlook and have no mail app set up, and a page cannot detect whether a mail app opened, and a short line: "Accra, Ghana · GMT · Open to remote roles".
2. **What I do:** three short cards.
   - Test automation (Playwright, Selenide, Cypress)
   - API and data testing (RestAssured, Postman, MySQL)
   - Quality beyond functional testing (accessibility, performance, cross-browser, security)

   Below the cards, a short "How I work" note about the cross-functional Scrum teams you work in.
3. **Featured work:** three case studies. This is the most important section.
   - **AI-powered regression impact tool** (DevOps Africa): Claude, GitHub, Jira and GitHub Actions
   - **Selenide + TestNG framework built from scratch** (Deutsche Telekom onboarding app)
   - **End-to-end, API and database testing** (PurpleWave inventory system): Playwright, Postman, SQL, SQL injection testing

   Each case study answers the same five questions in short paragraphs:
   **Context → Problem → What I did → Tools → Result.**
   Add a simple diagram where it helps (for example, how the regression tool connects GitHub, Jira and Claude).
4. **Experience:** a short timeline with two employers and the projects under each, ending with your degree. One line per project, linking to the case study where there is one.
5. **Toolbox:** skills grouped as on your CV, shown as tags. No skill bars or percentages; they mean nothing to a reader.
6. **Contact:** the email address shown in full (same open-and-copy behaviour as "Email me"), LinkedIn, CV download and a short note: "Open to QA / SDET roles, remote or hybrid".

## 5. Look and feel

- **Style:** clean and professional with plenty of white space. It should feel like a well-made product page, not a template.
- **Colour:** one accent colour. I suggest a deep teal or the blue from your CV, so the CV and the site look like they belong together.
- **Fonts:** the visitor's system font (San Francisco on Apple devices, Segoe UI on Windows). It looks modern and needs no download. A monospace font is used only for small "code-like" details, such as tags.
- **Light and dark mode:** follows the visitor's system setting by default, with a toggle in the header that overrides it and is remembered on the next visit.
- **Mobile first:** most recruiters first open links on their phone.
- **Accessibility:** WCAG AA contrast, keyboard navigation, alt text on every image, and correct heading order.

**Rough layout:**

```
┌─────────────────────────────────────────────┐
│ Bertina Ayuure             Work  About  Contact │
│                                             │
│ QA Engineer who builds automation           │
│ and AI-assisted testing tools.              │
│ 4 yrs · Web, mobile, API · Accra (GMT)      │
│ [Download CV]  [Email me]  [LinkedIn]       │
├─────────────────────────────────────────────┤
│ What I do:  [Automation] [API & Data] [Quality] │
├─────────────────────────────────────────────┤
│ Featured work                               │
│ ┌──────────────┐ ┌──────────────┐ ┌───────┐ │
│ │ AI regression│ │ Selenide     │ │ E2E + │ │
│ │ impact tool  │ │ framework    │ │ API   │ │
│ └──────────────┘ └──────────────┘ └───────┘ │
├─────────────────────────────────────────────┤
│ Experience timeline · Toolbox · Contact     │
└─────────────────────────────────────────────┘
```

## 6. What makes it a QA portfolio, not just a nice page

These are your strongest differentiators. P0 items go in the first version.

| # | Feature | Priority |
|---|---|---|
| 1 | Three case studies that show your thinking (see section 4) | P0 |
| 2 | **The portfolio tests itself:** Playwright tests (links work, CV downloads, page passes axe accessibility checks) and Lighthouse, run by GitHub Actions on every change, with a "tested with Playwright" badge near the top of the page | P1 · **Tests built 3 Nov 2026.** Bertina is building the GitHub Actions workflow herself. |
| 3 | **A public sample automation repo:** client code is confidential, so build a small Playwright + API test project against a public demo app to show your coding style. Link it from the site. | P1 |
| 4 | A short write-up on "How I use AI in testing" (Claude, Copilot, ChatGPT), as a blog post or an extra case study | P2 |

## 7. Technical approach

- **Build:** plain HTML and CSS with a little JavaScript, used only for the light/dark toggle. On mobile the menu links sit on a second row, so no menu script is needed. No framework is needed for one page, and the page will load fast and score well.
- **Hosting:** GitHub Pages. It is free and works with the GitHub Actions setup in item 2.
- **Domain:** start with `bertina-ayuure.github.io`. A custom domain (for example `bertinaayuure.com`, about $10–15/year) can come later.
- **Files:**
  ```
  index.html
  styles.css
  assets/Bertina_Ayuure_CV.pdf
  assets/(photo, diagrams)
  ```

## 8. Content rules

- **Confidentiality:** no client code, internal screenshots or internal data. Explain the work in your own words and with diagrams you draw yourself.
- **Use numbers wherever you can.** The CV has almost none, and a number makes a recruiter stop reading and remember. For example: how many tests you automated, how much regression time the framework saved, how many bugs you caught before release, and how many people use the AI tool.
- Use short sentences and active verbs, written in first person ("I built…").

## 9. Out of scope for version 1

- A blog or CMS
- A contact form (an email link is enough and cannot break)
- Animations or a page loader
- Analytics (it can be added later with a privacy-friendly tool such as Plausible or GoatCounter)
- More than one language

## 10. Decisions (3 Nov 2026)

1. **Numbers:** test counts are not known. Team context will be used instead: cross-functional Scrum teams of 5–7 people (UI designer, at least 2 QAs, 3–5 developers, and on some teams a dedicated DevOps engineer, product owner, scrum master and dev manager). Add numbers later if they become available.
2. **Client names:** PurpleWave can be named. Deutsche Telekom will **not** be named on the site; use "a major European telecom provider" instead.
3. **Photo:** no headshot in version 1.
4. **GitHub:** no GitHub link in version 1. Add it once the sample automation repo exists.
5. **Accent colour:** keep the blue from the CV.
6. **P1 items:** the self-testing portfolio and the sample automation repo come after launch.

Also decided: the phone number is left off the site to avoid spam. It stays on the downloadable CV.

## 11. To fix later

- **CV LinkedIn link:** the CV PDF links to `linkedin.com/in/bertina-ayuure`, which does not work. Update it to `https://www.linkedin.com/in/bertina-ayuure-1303451b6/`, export a new PDF and replace `assets/Bertina_Ayuure_CV.pdf`. (The site's links were fixed on 5 Nov 2026.)
