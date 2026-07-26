# Kentucky Medicaid Notebook — Project Instructions

## What this project is
A plain-language public-interest site helping Kentuckians navigate Medicaid and KCHIP. Made by Sleeping Bear Labs (Lexington, KY). Static HTML/CSS/JS hosted on GitHub Pages, custom domain via Namecheap (kentuckymedicaidnotebook.org). A companion site, the Indiana Medicaid Notebook, follows the same structural pattern — conventions here generally apply there too.

## Git workflow
- Commit directly to `main` for small, single-file fixes (typo corrections, data updates, single-value changes). Do not create a feature branch or open a pull request unless explicitly asked to.
- Space commits ~30–40 seconds apart to avoid GitHub Pages deployment collisions.
- After any push, do a hard refresh of the live page (or check in an incognito window) to confirm the change actually deployed before reporting the task complete. Don't just trust that a successful commit means the fix is live — verify it.

## Prompt / task discipline
- Prefer single-file, single-responsibility changes. Multi-file or combined research+write tasks are more likely to stall or time out.
- If a task naturally spans multiple files, split it into separate sequential prompts rather than one large one.

## Content accuracy
- This site publishes phone numbers, income limits, and program rules that people rely on directly. Before changing or adding factual content (broker numbers, eligibility figures, deadlines), verify against the current official Kentucky source (chfs.ky.gov, khbe.ky.gov, kynect.ky.gov, transportation.ky.gov) rather than assuming existing site content is already correct.
- Flag any discrepancy found between site content and an official source, even if not explicitly asked to check for one.

## Service worker (sw.js)
- Uses a cache-first strategy: every file listed in `CORE` is precached under a version string (`CACHE`).
- The service worker only re-checks its cache when `sw.js` itself changes. **Any change to a precached file (HTML, CSS, JS) must be paired with bumping the `CACHE` version string in the same commit**, or returning visitors will keep seeing stale content indefinitely.
- Network-first / cache-fallback (no precache) is the preferred architecture going forward for new sites, since it avoids needing a version bump on every content change. Don't migrate this file to that pattern unless asked — just don't forget the version-bump rule under the current architecture.

## Fetching live content
- Bot protection blocks fetching kentuckymedicaidnotebook.org directly. Use raw.githubusercontent.com URLs against this repo, or ask for HTML to be pasted directly, instead of trying to fetch the live domain.

## Design system
This project is mid-redesign (typography, color palette, layout patterns, homepage structure). The current live CSS/HTML does not reflect final design intent — treat it as a starting point, not a spec. Don't extend or "match" the current visual style on new pages beyond what's explicitly requested; check for current direction first.
