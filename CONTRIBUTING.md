# Contributing to the cold outbound deliverability guide

This project is exclusively about **outbound sales cold email**. Help sales teams make informed decisions about domains, mailboxes, authentication, warmup claims, prospect selection, copy, follow-ups, and delivery diagnostics. Keep examples relevant to that workflow.

For continuing work with a coding agent, start with [AGENTS.md](AGENTS.md). It routes to repository skills for writing, research, author interviews, and publication. The [author-decision reference](.agents/skills/write-outbound-guide/references/author-decisions.md) preserves accepted operating defaults and exceptions across sessions; update it when the author changes his guidance.

## Editorial approach

- Preserve existing sections and anchors. Propose section removals or a change of audience for maintainer approval before implementing them.
- Research technical details using current provider documentation and standards, but write the guide as a practical playbook. Do not add routine citations or reference lists. Keep a link only when it helps readers verify an important rule, complete a setup step, or open a useful tool.
- Build on the author’s first-hand experience and practical recommendations. Missing public documentation is not, by itself, a reason to discard an experience-based recommendation. Use research to add context and correct technical details.
- Keep publication dates, review dates, dated update callouts, and research-process commentary out of the published guide. Explain what readers should do now; keep verification notes separately.
- Keep suggested mailbox settings and provider preferences as practical defaults rather than universal guarantees. Flag genuine conflicts with current requirements for maintainer review instead of silently reversing the strategy.
- Explain jurisdiction and provider-policy differences. Do not imply every cold B2B message is legal, illegal, permitted by a platform, or wanted by its recipient.
- Define metric denominators. Distinguish server acceptance, inbox placement, tracking events, positive replies, and qualified meetings.
- Use reserved example domains and documentation IP addresses. Do not include real prospect data, API credentials, private message headers, or live unsubscribe tokens.
- Summarize research in original language. Keep quoted text brief and attributed.

## Content and site

`README.md` is the content source. `scripts/generate.mjs` produces the site page and navigation from its headings; the generated page is gitignored. The generator includes content from the first level-two heading until the license section. Site introduction and metadata live separately in `site/src/components/` and `site/src/app/layout.tsx`; keep their audience consistent with the guide.

The reader offers full text and a TL;DR view of the same sections. It reuses each section's opening TL;DR block when present; other summaries live in `site/src/data/guide-summaries.json`, keyed by the existing heading anchor. Keep summaries faithful to the author's advice and update them alongside content changes. The production generator rejects missing summaries. Preserve heading anchors so bookmarks and shared links work in both reading modes.

Use Node.js 24 and npm:

```sh
npm ci --prefix scripts
npm test --prefix scripts
npm ci --prefix site
npm run dev --prefix site
```

For production validation:

```sh
npm run build --prefix site
npm run lint --prefix site
```

Both development and production commands regenerate the guide first. Production output is in `site/out/`. After editing Markdown during an active development session, run `npm run generate --prefix scripts` to regenerate the page.

Before submitting a change, inspect the chapter navigation and topic search, both reading modes, heading links, tables on mobile, code examples, and the remaining useful links. Check that “Read full section” preserves the reader's place and that the complete guide remains available without JavaScript. Describe what changed, the sources checked, and how you validated the result.

### Dependency compatibility

The build also runs `tsc --noEmit` with TypeScript 7. The site uses TypeScript 7 through `@typescript/native` and the official TypeScript 6 compatibility alias for tools that require the compiler API, including ESLint. ESLint stays on the latest 9.x release until the plugins shipped by `eslint-config-next` support ESLint 10. Run lint separately: Next.js 16 no longer runs it during builds.
