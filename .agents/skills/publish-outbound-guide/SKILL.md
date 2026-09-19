---
name: publish-outbound-guide
description: Validate and publish approved changes to this guide's generated Next.js site, preserving full and TLDR reading modes, navigation, and live deployment verification.
---

# Validate and publish the guide

Check `git status` and the active branch first. Preserve unrelated work and follow the author's current publishing instructions. The author has requested periodic commits/pushes of approved guide updates to see the rendered site; follow that standing workflow unless superseded. These instructions do not approve unreviewed strategy changes.

## Source and build

The README is rendered by `scripts/generate.mjs` using `scripts/page.template.tsx.txt`. Do not edit the ignored generated `site/src/app/page.tsx`. Opening Markdown TL;DR blocks take precedence over `site/src/data/guide-summaries.json`. New headings need a summary and should appear in the generated outline.

Use Node.js 24. When dependencies are absent, install with `npm ci --prefix scripts` and `npm ci --prefix site`. Then run:

```sh
npm test --prefix scripts
npm run build --prefix site
npm run lint --prefix site
git diff --check
```

The build regenerates the page, type-checks the site, and exports to `site/out/`. The repository's GitHub Actions workflow runs the generator tests, production build, and ESLint. Don't add tests that simply lock in the latest wording; existing generator tests cover section rendering, summary completeness, stable IDs, and relevant accessibility markup.

## Review the actual output

Serve the static export using available local tooling, for example `python3 -m http.server 4173 --directory site/out`. Inspect the affected section in full and TL;DR modes, desktop and mobile, including tables/code if changed. Check new summaries for lost conditions, not just whether generation succeeds.

For navigation or reader code changes, also verify:

- Existing anchors, including deep technical topics and legacy aliases, resolve with no duplicate IDs.
- `?view=tldr#section-id` opens the right mode and section; “Read full section” retains the reading position.
- Search, mobile contents, keyboard focus/Escape, saved preferences, and blocked storage behave sensibly.
- Sticky toolbar offsets work at narrow widths and with changed text size; reduced-motion settings are respected.
- Full guide text remains available without JavaScript. The two modes share one document rather than duplicate heading IDs.

Use available browser tools or install temporary browser QA dependencies under ignored `.context/` when needed. Existing scratch scripts may be absent or outdated; inspect them before reuse and do not assume a fixed section count. Run accessibility checks for reader/layout changes. Once appropriate checks pass, avoid repeatedly broadening the suite without a new concern.

Save screenshots under `.context/` and embed a useful one in the user-facing result when showing visual changes. Do not commit screenshots or research snapshots accidentally. If a check is blocked, state the actual limitation rather than claiming it passed.

## Commit, push, verify

Review the diff for scope, author decisions, preserved anchors, and synchronized summaries. Stage task-owned files explicitly. Use a concrete commit message describing the resulting behavior. The target/base is `origin/main`; do not rename branches or force-push.

Push according to the active task's authorization. A push to `main` triggers Vercel production deployment at [deliverabilityguide.com](https://deliverabilityguide.com). Use available GitHub checks/status/deployment information to confirm the exact commit. Prefer inspecting `gh run list`/`gh run view` and the commit status over guessing from elapsed time.

Check the live affected content or reader behavior after deployment. Report “pushed, deployment pending” if that is all the evidence supports; report “live” only after verifying the deployment and page. For a failure, diagnose the logs and correct task-owned errors without undoing unrelated changes. Do not endlessly retry the same failure or bypass branch protection.

End with the outcome, live link when confirmed, commit, concise validation, and any unresolved issue. Keep implementation detail proportional to the change.
