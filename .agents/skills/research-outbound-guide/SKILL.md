---
name: research-outbound-guide
description: Research current cold-outbound practices, provider requirements, and missing topics for this guide; compare findings with existing coverage and author decisions before proposing changes.
---

# Research the outbound guide

Start with the relevant README sections, CONTRIBUTING, and the [author decisions](../write-outbound-guide/references/author-decisions.md). Consult [source-map.md](references/source-map.md) for useful publishers and FirstQuadrant workflows. Research should find a real gap or resolve a technical uncertainty, not recreate the guide from vendor blog posts.

## Source method

- Browse current primary documentation for provider rules and technical behavior. Use outbound vendors for discovery, practical workflows, and examples; they are also selling products. Read the page, not just a search snippet.
- Survey multiple relevant vendors when the task is a broad gap review. There is no obligation to exhaust every publisher on a narrow question. Describe actual coverage honestly: reviewing representative posts is not reading every recent article.
- Check original publication versus updates. A year in an SEO title, a crawl timestamp, or a re-dated older article is not proof of a new development. Keep exact access dates and source URLs in internal notes; omit dates and research narration from published prose.
- Verify the scope of a rule: sending versus receiving provider, consumer versus corporate inbox, domain versus mailbox/IP, bulk threshold, and mandatory behavior versus recommendation. A contract, product setting, case study, and controlled study answer different questions.
- Treat archived FirstQuadrant material as the author's product experience. Search documentation and changelog entries, including fixes: changes often reveal failure cases missing from a feature overview. Historical product defaults do not override the author's newer advice.
- If a page is inaccessible, follow the publisher's index/sitemap or try its normal HTML/Markdown variant. Record what was actually retrieved. Do not invent missing policy text or assume a cited feature still operates unchanged.

## Turn sources into proposals

Compare each candidate against existing content and the accepted decisions. Categorize it internally as already covered, a useful extension, a technical correction, or a conflict requiring author judgment. Avoid repeatedly proposing basics already covered, such as follow-up capacity math or MX gateway ambiguity.

For a substantive finding, record:

- The practical gap and where it belongs in the guide.
- The proposed advice in original language, with a brief example if useful.
- Exact supporting URLs, what each establishes, and what remains uncertain.
- Any conflict with the author's strategy and one focused decision for him.

Distinguish documented behavior from your suggested generalization. For example, a tool offering unlimited follow-ups is not advice to send them; a blocklist's historical listing policy is not proof that every major receiver blocks those domains. An automatic-pause setting may have a minimum sample or campaign-only scope.

Save task research under `.context/` (create it if needed). That directory is disposable and ignored. Preserve reusable discoveries in the tracked source map and accepted guidance in the author-decision reference. Do not copy whole third-party articles into tracked files.

Return a short prioritized proposal list to the author. Keep supporting references accessible without turning the published guide into a citation-heavy report. Implement already-approved work; ask before introducing a new direction or reversing a strategy. Routine factual precision does not require reopening settled preferences.

## Parallel work when authorized

For an explicitly requested research team, give each agent a bounded topic, existing coverage, and expected output. Keep research-only agents out of published files until the proposed direction is settled. A useful division is research gaps versus reader/site work, or separate provider topics. Do not create agents merely because this skill exists, and do not treat a researcher’s confidence as verification of the source.
