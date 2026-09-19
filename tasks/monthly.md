# Monthly cold-outbound guide update

Run this task from the Deliverability Guide repository. Research the past month's developments, make useful updates consistent with the author's advice, and open a pull request for review. Complete the work rather than stopping at a research plan.

This task creates a **PR against `main`**. Do not push changes directly to `main`, merge the PR, or deploy production. This task-specific release instruction overrides the usual direct-publishing workflow. No scheduled automation needs to be installed; the author invokes this prompt when ready.

## Load the project context

Read these files before researching or editing. Paths below are relative to this task file; work in the repository root.

- [AGENTS.md](../AGENTS.md) and [CONTRIBUTING.md](../CONTRIBUTING.md).
- [Writing skill](../.agents/skills/write-outbound-guide/SKILL.md) and its [author decisions](../.agents/skills/write-outbound-guide/references/author-decisions.md).
- [Research skill](../.agents/skills/research-outbound-guide/SKILL.md) and its [source map](../.agents/skills/research-outbound-guide/references/source-map.md).
- [Author-interview skill](../.agents/skills/interview-guide-author/SKILL.md), for framing decisions that need the author's judgment.
- [Publishing skill](../.agents/skills/publish-outbound-guide/SKILL.md), applying its validation steps but using the PR-only release workflow below.
- The current [README](../README.md), [reader summaries](../site/src/data/guide-summaries.json), and any previous monthly reports and related open PRs.

Keep the guide exclusively about outbound sales cold email. Preserve the author's voice, accepted defaults, headings, and anchors. Do not broaden it into newsletter advice or replace experience-based recommendations with a vendor's preferred settings.

## Establish the research window and branch

Determine the current date at runtime. Unless the author specifies another range, cover the **previous complete calendar month in UTC**, from its first day through its last day. Record the exact range and run date in the research report and PR, not in the published guide. Do not hardcode a month into this reusable prompt.

Check the working tree and fetch `origin/main`. Preserve unrelated changes and do not rename the current branch. Create an isolated branch/worktree from the fetched base, using a name such as `monthly/YYYY-MM`; use a unique suffix if necessary. Check for an existing monthly-update PR for that window first. On a rerun, continue that task's branch/PR when appropriate rather than opening a duplicate or overwriting someone else's work.

## Research what is actually new

Browse the web and read the underlying pages. Search for material originally published or substantively updated within the window:

- Outbound-company blogs, help centers, changelogs, and research reports. Start with Smartlead, Instantly, lemlist, Reply, Apollo, Clay, Hunter, Saleshandy, and Woodpecker; include other relevant companies or practitioners when discovery warrants it.
- New prospecting, qualification, AI-personalization, reply-handling, scheduling, and testing methods that improve this guide's cold-sales workflow.
- Changes in Google, Microsoft, and Yahoo requirements, authentication guidance, sending limits, diagnostic tools, and relevant blocklist policies. Verify consequential technical claims with the actual provider or operator.

Use the source map for discovery, not as a complete or permanently current bibliography. FirstQuadrant's archived docs and changelog provide historical context for the author's methods; do not count old features as newly published research.

Distinguish original publication from a refreshed title, an update date, and a search-engine crawl date. An article labeled with the current year is not automatically new. An undated policy may still matter, but describe it as a current verification unless you can establish when it changed. Read older primary sources as necessary to verify new claims without counting them as new findings.

For each promising finding, compare it with the guide and prior reports. Separate genuinely missing advice from already-covered topics, vendor marketing, weak benchmarks, and conflicting recommendations. Check measurement denominators and the scope of receiver rules. Be honest about inaccessible sources, uncertain dates, and the breadth of the review; do not claim to have read every post.

## Make the update and preserve the research

Apply useful additions, clarifications, and technical corrections that fit the author's established direction. Favor a few substantive improvements over filler, cosmetic rewrites, or a news roundup. Update affected TL;DR summaries and cross-references together with the README. Preserve all existing anchors.

Do not implement section removals, scope changes, or reversals of accepted strategy without the author's approval. Instead, put the proposed wording, reason, and a focused question in the report and PR. Continue the independent work and open the PR without blocking the whole run on an interview. Do not record unapproved research as an accepted author decision. If there is a newly consequential conflict with a provider rule, make it prominent for review.

Create or update **`research/monthly/YYYY-MM.md`** as a tracked editorial report. This is part of the repository review record, not part of the rendered guide. Include:

- The research window, run date, coverage, and any meaningful access limitations.
- A concise source log: publisher, title, exact URL, publication/update evidence, and what the source establishes. Use original summaries, not copied articles.
- Findings mapped to guide sections, classified as implemented, already covered, not adopted, or awaiting author judgment, with brief reasons.
- Proposed wording and questions for decisions requiring the author.
- Validation results and remaining limitations.

Dates and source links belong in this report and the PR. Keep the guide's prose experience-led and free of routine citations or dated callouts; retain only links useful for important rules, setup, or tools. Add a reusable source-map entry only when it will help future work. Raw downloads, screenshots, and temporary scripts belong in ignored `.context/`.

If nothing warrants changing the guide, still create a useful report-only PR explaining what was checked and why no content change is recommended. Do not invent advice changes to justify the monthly run. On a same-window rerun with no new findings, report the existing PR instead of making empty commits.

## Validate and open the PR

Use the publishing skill's relevant checks. Install dependencies if needed, run the existing generator tests and production build, and run `git diff --check`. For guide edits, inspect affected sections in full and TL;DR views, their links, and mobile rendering. Research-only reports need no cosmetic site changes. Review the final diff against `origin/main` for unrelated files and accidental generated output.

Commit task-owned changes and push only the task branch. Open a new PR with `main` as its base, or update the existing PR for this window. Use a title such as `Monthly guide update: YYYY-MM — <main improvement>`; for a report-only run, say so explicitly.

The PR description should explain the concrete guide changes, the research window and report path, decisions requiring author input, and validation performed. Keep the full source audit in the tracked report. Use a body file or structured argument to preserve formatting. Use a draft PR if implementation or required validation remains incomplete; do not hide a failed check. Do not enable auto-merge.

Check CI and any available preview for the exact pushed commit. If a required service, browsing, or GitHub access is unavailable, preserve completed work and report the precise blocker; do not claim research, checks, or PR creation succeeded when they did not.

Return the PR link, a short list of useful changes or findings, any author decisions needed, and validation status. The final artifact is a reviewable PR, not a production release.
