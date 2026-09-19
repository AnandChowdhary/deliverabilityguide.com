---
name: write-outbound-guide
description: Write or revise this repository's cold-outbound guide and TLDR summaries in the author's practical voice, preserving his accepted operating advice. Use for content edits, not unrelated marketing copy.
---

# Write the outbound guide

Read the affected README sections and the relevant entries in [author-decisions.md](references/author-decisions.md). The README is the published source; that reference records why the author chose the defaults. If they disagree, check the latest author instruction rather than silently picking a new strategy.

## Voice

Write like an experienced founder explaining what to do and why. Lead with a useful recommendation, then its practical reason and a concrete example when one helps. Use “we recommend” or “our default” for the author's judgment; don't manufacture first-hand experience, case studies, or performance numbers. The original README introduction is the voice baseline.

Use plain, specific language and connected paragraphs. Lists work for parallel actions and conditions; tables work for decisions or comparisons. Keep paragraphs short enough to scan. Avoid academic caveat piles, promotional superlatives, generic AI phrasing, and declarations about how rigorously the guide was researched. “The world's most comprehensive” is an ambition in the introduction, not a claim to repeat throughout.

No routine citations, source lists, calendar dates, “last reviewed” stamps, or news-style introductions in published content. Retain a link when it lets the reader verify a consequential rule, configure a service, or use a recommended tool. Keep the research trail in internal notes. Advice should read naturally without attribution attached to every sentence.

For example:

- Prefer: “Start with 1–2 new prospects per mailbox each day. Increase gradually toward 10–15, leaving room for follow-ups.” Avoid replacing the author's numbers with “it depends” or a vendor's higher default.
- Prefer: “Use judgment and the quality of the conversations to decide when the message is ready to scale.” Avoid inventing a statistical threshold the author has not chosen.
- Prefer: “Her out-of-office message listed you as an alternate contact.” Do not upgrade that into a personal introduction.

## Make a coherent edit

1. Identify whether the change is an approved author decision, a technical correction, or a research proposal. For a proposal or a conflict with accepted strategy, prepare the concrete wording for the author's review before changing direction. Missing public evidence alone is not a conflict.
2. Put advice where readers will use it. Preserve current headings and anchors; add a subsection if it makes a substantial workflow easier to find. Do not repeat the same explanation in several chapters; use a short cross-reference where useful.
3. Search for related statements in preflight, domain rotation, warming, scheduling, metrics, and summary data. Fix contradictions, not just the paragraph under discussion. Distinguish initial cold sequences, existing conversations, postponed prospects, and leave.
4. Update `site/src/data/guide-summaries.json` for every added or changed section without an opening Markdown TL;DR. An opening `> **tl;dr:**` wins over the JSON entry, so edit the actual source of the displayed summary. Preserve the important conditions when shortening advice.
5. Update the decision reference when the author establishes or changes a lasting preference. Record a current decision once; remove superseded defaults from that entry instead of accumulating contradictory rules.
6. Use the repository validation and publication workflow. Content edits still need a generated-page check; don't add tests that merely assert your exact prose.

## Important distinctions

Author experience supplies sensible operating defaults, not universal technical guarantees. Provider documentation supplies provider-specific requirements, not a reason to convert the book into newsletter guidance. Vendor claims can suggest useful topics but do not overrule the author's workflow. Preserve these distinctions in the wording without putting research labels on every paragraph.

Do not import all of FirstQuadrant's features or historical defaults. Its product documentation is inspiration for cold-outbound workflows. The author's current choices control when they differ from the archived product.
