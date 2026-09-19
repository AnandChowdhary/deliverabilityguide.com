# Working on Deliverability Guide

This repository publishes [deliverabilityguide.com](https://deliverabilityguide.com), Anand Chowdhary's practical guide to **outbound sales cold email**. The author's experience, including building FirstQuadrant, is the starting point. This is not a newsletter, general email-marketing, or transactional-email handbook.

## Start here

Read [CONTRIBUTING.md](CONTRIBUTING.md), the affected README sections, and the relevant skill below. For advice changes, consult the [author's decisions](.agents/skills/write-outbound-guide/references/author-decisions.md). These files preserve project context; no personal memory system or previous chat is required. New explicit author instructions take precedence. Record accepted changes in the decision reference as well as the guide so the next session inherits them.

| Task | Repository skill |
| --- | --- |
| Write or revise the guide and its summaries | [write-outbound-guide](.agents/skills/write-outbound-guide/SKILL.md) |
| Research provider rules, vendor advice, or missing topics | [research-outbound-guide](.agents/skills/research-outbound-guide/SKILL.md) |
| Walk through proposals and collect the author's judgment | [interview-guide-author](.agents/skills/interview-guide-author/SKILL.md) |
| Validate, commit, push, and check the rendered website | [publish-outbound-guide](.agents/skills/publish-outbound-guide/SKILL.md) |

The skills live in `.agents/skills/`. If an agent cannot discover them automatically, open the linked `SKILL.md` directly. Each skill is scoped to this project and links to its supporting references.

## Editorial constraints

- Write as an experienced operator: direct, concrete advice, practical defaults, and useful examples. Do not turn the guide into an academic literature review.
- Keep routine citations, reference lists, calendar dates, review-date callouts, and research-process narration out of published prose. Links are appropriate for an important provider rule, a setup step, or a useful tool. Internal research notes can retain URLs, dates, and evidence.
- Research helps improve the advice; absence of public evidence is not a reason to discard the author's judgment. Do not present a heuristic as a receiver guarantee either.
- Ask the author before removing sections, changing the cold-outbound direction, or reversing an established strategy. Routine implementation of approved advice, summary updates, fixes, and verification do not need another confirmation.
- Preserve existing headings and anchors. Add well-scoped subsections where useful; give each one a reader summary. Keep full text, summaries, introduction, and metadata consistent.
- Keep the original introduction's experience-led premise and the author's testimonial. Avoid unsolicited branding changes.

## Files and validation

- `README.md`: canonical guide. The site includes the first `##` heading through the section before `## 📄 License`.
- `scripts/generate.mjs` and `scripts/page.template.tsx.txt`: render the README into the ignored `site/src/app/page.tsx`.
- `site/src/data/guide-summaries.json`: summaries keyed by heading ID, used when a section has no opening `> **tl;dr:**` block. Existing Markdown TL;DR blocks take precedence.
- `site/src/components/GuideReader.tsx`: shared full/summary document, searchable contents, saved reading mode, and section navigation.
- `site/src/components/Hero.tsx`, `Introduction.tsx`, and `site/src/app/layout.tsx`: separately maintained introduction, hero, and metadata.
- `.context/`: gitignored scratch research, screenshots, browser tools, and temporary checks. It may be absent in a fresh clone. Durable decisions and reusable instructions belong in tracked files, not only here.

Use Node.js 24. Install with `npm ci --prefix scripts` and `npm ci --prefix site` when needed. Run `npm test --prefix scripts` and `npm run build --prefix site`; the build regenerates the guide and exports to `site/out/`. Do not hand-edit the generated page. After Markdown changes during development, run `npm run generate --prefix scripts`.

Inspect full and TL;DR views, new sections in navigation, deep links, and mobile rendering. For reader behavior changes, also check keyboard access, mode switching at a deep link, saved preferences, and full content without JavaScript. See the publishing skill for the release workflow.

## Git and publication

Work in this repository, not an unrelated surrounding workspace. Check `git status` before editing and preserve other people's changes. The default comparison/base is `origin/main`; do not rename the current branch without an explicit request.

The author has requested periodic commits and pushes of approved guide work so the rendered site can be reviewed. Honor that standing request during guide maintenance unless a newer instruction changes it. This does not authorize publishing unapproved proposals or reversing advice. Pushes to `main` trigger the site's Vercel deployment; verify CI and the live result before reporting that a change is live. Do not force-push or treat a queued deployment as a successful release.
