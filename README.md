# Kentucky Medicaid Notebook

Plain-language guide to Kentucky Medicaid and KCHIP. Short pages, no jargon — eligibility, how to apply, renewals, and more.

Live site: **[kentuckymedicaidnotebook.org](https://kentuckymedicaidnotebook.org)**

---

## About

Dr. KYMN (Kentucky Medicaid Notebook) is an independent, non-government website built by [Sleeping Bear Labs](https://sleepingbear.us/) in Lexington, KY. It summarizes Kentucky Medicaid and KCHIP rules in plain English for people who need coverage but find the official documentation overwhelming.

Content is drawn from official Kentucky sources (kynect.ky.gov, khbe.ky.gov, chfs.ky.gov) and reviewed at least annually after the federal poverty guidelines update each January.

---

## Site structure

### English pages

| File | Page |
|---|---|
| `index.html` | Home |
| `who-qualifies.html` | Who Qualifies? |
| `eligibility-check.html` | Eligibility Pre-Screener (interactive) |
| `apply.html` | How to Apply |
| `checklist.html` | Document Checklist |
| `after-you-apply.html` | After You Apply |
| `what-if-approved.html` | What If Approved? |
| `what-if-denied.html` | What If Denied? |
| `renewal.html` | Renewal |
| `keep-coverage.html` | Keep Your Coverage |
| `what-is-covered.html` | What's Covered? |
| `who-accepts.html` | Who Accepts Medicaid? |
| `who-drives.html` | Non-Emergency Medical Transport |
| `kchip.html` | KCHIP |
| `emergency-care.html` | Emergency Care |
| `dcbs-offices.html` | DCBS Offices |
| `phone-numbers.html` | Key Contacts |
| `glossary.html` | Glossary |
| `faq.html` | FAQ |
| `about.html` | About |

### Spanish pages (`es/`)

| File | Page |
|---|---|
| `es/index.html` | Inicio |
| `es/quien-califica.html` | ¿Quién califica? |
| `es/como-aplicar.html` | Cómo aplicar |
| `es/despues-de-aplicar.html` | Después de aplicar |
| `es/si-me-aprueban.html` | ¿Si me aprueban? |
| `es/si-me-niegan.html` | ¿Si me niegan? |
| `es/renovacion.html` | Renovación |
| `es/preguntas-frecuentes.html` | Preguntas frecuentes |

### Utility

| File | Purpose |
|---|---|
| `offline.html` | Shown by service worker when offline |
| `404.html` | Custom 404 page |
| `sw.js` | Service worker — caches all pages for offline use |
| `app.js` | Registers service worker |
| `eligibility.js` | Logic for the eligibility pre-screener |
| `style.css` | Single shared stylesheet |
| `manifest.json` | PWA web app manifest |
| `sitemap.xml` | XML sitemap (all indexed pages) |
| `robots.txt` | Allows all crawlers, points to sitemap |

---

## Tech stack

- **Pure HTML/CSS/JS** — no build step, no framework, no dependencies
- **PWA** — installs on mobile, works fully offline via service worker
- **Bilingual** — English and Spanish with `hreflang` annotations
- **Accessible** — skip-nav links, ARIA labels, semantic HTML

---

## Running locally

Open any `.html` file directly in a browser, or serve the root directory with any static file server:

```bash
npx serve .
# or
python -m http.server 8080
```

The service worker only activates over HTTPS or `localhost`.

---

## Deployment

The site is a flat collection of static files — deploy by copying everything to any static host (GitHub Pages, Netlify, Cloudflare Pages, etc.). The `CNAME` file is configured for `kentuckymedicaidnotebook.org`.

After deploying changes, resubmit the sitemap in Google Search Console.

---

## Content updates

- All content is in the HTML files — no CMS or database.
- After updating content, bump the `<lastmod>` date in `sitemap.xml` for the affected pages.
- If caching behavior changes, increment the `CACHE` version string in `sw.js` to bust the old service worker cache.
- Content is reviewed at least annually (typically March, after federal poverty guideline updates).

---

## Disclaimer

This site provides general information only. It is not legal advice, medical advice, or an official eligibility determination. Not affiliated with the Kentucky Cabinet for Health and Family Services, DCBS, KHBE, or any government agency.
