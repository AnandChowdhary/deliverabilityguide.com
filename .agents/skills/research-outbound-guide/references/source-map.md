# Sources and research lessons

This is an internal starting map, not a public bibliography or a guarantee that a page remains current. Recheck consequential rules when updating them. Task-specific source extracts and access history belong in `.context/`; accepted author preferences belong in the writing skill's decision reference.

## Provider rules and diagnostics

- [Google sender guidelines](https://support.google.com/mail/answer/81126?hl=en) and [bulk-sender FAQ](https://support.google.com/mail/answer/14229414?hl=en): distinguish personal Gmail recipient rules from Workspace and mailbox sending quotas.
- [Google Workspace sending limits](https://knowledge.workspace.google.com/admin/gmail/gmail-sending-limits-in-google-workspace): account/method limits are ceilings, not recommended cold volume.
- [Yahoo sender guidance](https://senders.yahooinc.com/best-practices/) and [complaint feedback loop](https://senders.yahooinc.com/complaint-feedback-loop/): verify current scope and implementation details.
- [Microsoft high-volume authentication rejection](https://support.microsoft.com/en-us/outlook/fix-ndr-error-550-5-7-515-in-outlook-com) and [Exchange Online limits](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits): consumer-receiver rules and tenant sending restrictions are separate.
- [Microsoft message trace FAQ](https://learn.microsoft.com/en-us/exchange/monitoring/trace-an-email-message/message-trace-faq): inspect events behind status labels; acceptance is not inbox placement.
- [Google duplicate-header troubleshooting](https://knowledge.workspace.google.com/admin/gmail/advanced/troubleshoot-rfc-5322-duplicate-header-bounce-messages): actual received message structure matters beyond DNS checks.
- [Spamhaus lookup](https://check.spamhaus.org/) and [Heatwave listing policy](https://lookup.validity.tools/listing-policy): use the actual operator's policy for the specific list. Heatwave's confirmed warming observations do not disappear through rest or changed sending alone; mistaken findings can be reviewed. Do not infer universal receiver adoption. Recheck this policy before describing it as current.

## Outbound vendors

The earlier broad review covered Smartlead, Instantly, lemlist, Reply, Apollo, Clay, Hunter, Saleshandy, and Woodpecker, plus deliverability specialists and provider docs. Use their blogs/help centers for current ideas rather than assuming their volume, warming, or cadence defaults are the guide's defaults.

Useful entry points:

- [Instantly technical addendum](https://instantly.ai/technical-parameters-addendum): infrastructure ownership, portability, and access may differ from a reader's assumptions about buying a mailbox. Contract terms can change.
- [Instantly deliverability guide](https://help.instantly.ai/en/articles/16034903-deliverability-guide): inspect automatic safeguards' sample gates and scope; vendor defaults are not acceptable-failure targets.
- [Hunter accept-all explanation](https://help.hunter.io/en/articles/1935079-what-does-an-accept-all-email-status-mean): address-verification limitations. Catch-all domain behavior and role inboxes are different concepts.
- [Clay offer validation](https://www.clay.com/blog/how-to-validate-cold-outbound-offers-by-finding-message-market-fit): offer-learning ideas; the author uses judgment, not a fixed minimum sample.
- [Smartlead agency inbox operations](https://www.smartlead.ai/blog/managing-cold-email-at-agency-scale): reply ownership and classification; do not import high-volume or subdomain defaults.
- [Engagor duplicate-header incident](https://www.engagor.ai/resources/blog/duplicate-headers-dkim-microsoft-bounce): a first-hand technical example for cross-provider testing, not a universal claim about either provider.

Previous research found recycled/re-dated posts, inconsistent benchmark denominators, product-default claims presented as rules, and conflicting follow-up counts. Check those details rather than repeating persuasive numbers. When using a vendor report, establish who was measured, the observation window, and whether the denominator is messages, people, replies, or accounts.

## FirstQuadrant documentation and changelog

The author asked to use this material for his own operational experience. The public site identifies the product as sunset; use historical behavior as inspiration rather than recommending a current purchase or promising a live feature.

Discovery:

- [Documentation index](https://docs.firstquadrant.ai/llms.txt) lists manual/playbook Markdown URLs.
- [Main changelog](https://firstquadrant.ai/changelog) and [older changelog](https://inbox.firstquadrant.ai/changelog) expose entries omitted from the documentation index/sitemap. The docs host's bare `/changelog` was not a reliable index.
- Normal extensionless article URLs often work when the `.md` form does not. Direct downloads previously needed a normal browser user agent. Those are troubleshooting hints, not guarantees of future site behavior.

| Workflow | Primary sources and useful distinction |
| --- | --- |
| Requested delays | [Fine-tuning examples](https://docs.firstquadrant.ai/product-manual/fine-tuning/fine-tuning-examples), [improved follow-ups](https://docs.firstquadrant.ai/changelog/2024-09-16-improved-follow-ups): Postponed rules and date-based later actions. Configurability is not proof that every vague delay parses correctly. |
| OOO referrals | [Forwarded referrals](https://docs.firstquadrant.ai/changelog/2024-02-05-forwarded-referrals), [CRM forwarding fixes](https://docs.firstquadrant.ai/changelog/2024-02-12-crm-forwarding): alternate contacts, duplicate enrollment, and accurate referral context. |
| Follow-ups after a reply | [Unanswered-reply follow-ups](https://docs.firstquadrant.ai/changelog/2023-04-10-follow-ups-for-unresponded-replies), [scheduling settings](https://docs.firstquadrant.ai/product-manual/workspace-settings/scheduling-tracking): separate from the initial cold sequence. Historical intervals are not the author's current default. |
| Meeting/account context | [Calendar accounts](https://docs.firstquadrant.ai/product-manual/integrations-settings/calendar-accounts), [related contacts](https://docs.firstquadrant.ai/product-manual/related-contacts): use context to revise future actions; the author does not want automatic account-wide stops after one reply. |
| Warming-message exclusion | [Working alongside outbound tools](https://docs.firstquadrant.ai/playbooks/use-firstquadrant-with-other-outbound-sales-tools), [cleaner suggestions](https://docs.firstquadrant.ai/changelog/2025-09-28-cleaner-suggestions): content identifiers and warmup-folder filtering; preserve the distinction between warmup activity and sales events. |
| Human review and fallback | [Autopilot](https://docs.firstquadrant.ai/product-manual/autopilot), [next actions](https://docs.firstquadrant.ai/product-manual/contact-view/next-actions), [sequence settings](https://docs.firstquadrant.ai/product-manual/campaigns/create-sequence): staged automation, knowledge gaps, existing history, and action ownership. |
| Pause versus takeover | [Campaign overview](https://docs.firstquadrant.ai/product-manual/campaigns/campaign-overview), [archive behavior](https://docs.firstquadrant.ai/changelog/2024-07-01-archive-contacts): soft-stop continues started sequences, so it is not our domain-pause workflow; archiving is not an opt-out. |
| Future actions | [Scheduled-message management](https://docs.firstquadrant.ai/changelog/2025-04-20-smarter-draft-and-scheduled-email-management): distinguish snoozing a task from scheduling an email. |

The prior pass downloaded 66 manual/playbook/getting-started pages and 114 changelog entries, searched the corpus, and closely read relevant workflows and fixes. That was a scoped research pass, not a claim that every page or every feature was independently tested. Its ignored snapshots may not exist in a fresh clone; this map preserves the rediscovery routes.
