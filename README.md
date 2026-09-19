# 📧 The Open-source Email Deliverability Guide ([DeliverabilityGuide.com](https://deliverabilityguide.com))

**This aims to be the world's most comprehensive email deliverability checklist for outbound sales.** _(It's a work in progress!)_

If you're sending outbound sales emails, you should follow this checklist to give your emails the best chance of reaching the inbox instead of spam. This checklist is based on the experience of sending tons of outbound emails, and it's open source to keep the information recent and relevant. Contributions are welcome!

Deliverability involves judgment and experience as well as technical setup. Start with the settings we recommend, pay attention to what happens in your own campaigns, and adjust as you learn. What works for one audience or mailbox will not always work for another.

## Start here

### Cold outbound preflight

- [ ] Define the prospect profile, business relevance, and reason this person should hear from you.
- [ ] Check the rules for the recipient's jurisdiction and the acceptable-use policies of your mailbox and outreach providers.
- [ ] Inventory sending domains, mailboxes, owners, sending tools, and integrations.
- [ ] Verify SPF, DKIM, and DMARC alignment on an actual received message from each sending route.
- [ ] Verify address data without treating a “valid” result as permission or proof of interest.
- [ ] Set conservative mailbox limits, account-level contact caps, and a finite follow-up sequence.
- [ ] Make sender identity accurate and opting out easy; synchronize stop requests across mailboxes and campaigns.
- [ ] Test subject, personalization, links, rendering, and reply routing before launching.
- [ ] Stop automated follow-ups when a prospect replies or opts out.
- [ ] Monitor recipient-provider errors, complaints, invalid-address failures, positive replies, and meetings.

### How to use this guide

Start with your domains and mailboxes, work through warming and content, then refine targeting, scheduling, and measurement. The suggested settings are our practical defaults for cold outbound. Use them as a starting point and adjust to your own results; your provider's limits and rules still apply.

When diagnosing a problem, distinguish server acceptance, inbox placement, and sales outcomes. A message can be accepted but reach spam, and a tracked open is not the same as an interested prospect. Look at the whole sequence, from first touch through replies and meetings.

<span id="latest-technical-review"></span>

### Adjust as you go

Treat your first campaign as a chance to learn. Keep the setup simple enough that you can tell what changed, review replies yourself, and build volume as you find the right audience and message. When something stops working, go back to the last healthy campaign before changing several things at once.

### Provider requirements for cold outbound

Calling a message “one-to-one sales” does not automatically remove its promotional purpose or exempt it from provider rules. Evaluate the actual message and sending program. Where bulk-sender marketing requirements apply, a personalized first line or a salesperson's signature does not replace the required unsubscribe implementation.

For personal Gmail, [Google’s bulk-sender rules](https://support.google.com/mail/answer/14229414?hl=en) count traffic across your primary domain. Once you reach approximately 5,000 messages in 24 hours and are classified as a bulk sender, that classification stays with you. Multiple sales mailboxes and subdomains do not create separate exemptions. Bulk senders need SPF, DKIM, DMARC, RFC 8058 one-click unsubscribe for promotional mail, and a visible body link; Gmail's body-only or `mailto:` opt-out does not satisfy that header requirement. Honor requests within 48 hours. These specific receiving rules cover personal Gmail, not every Google Workspace prospect.

[Yahoo’s sender requirements](https://senders.yahooinc.com/best-practices/) do not specify a numeric bulk threshold. Its rules include Yahoo-hosted consumer brands such as AOL. Marketing bulk senders need authenticated, aligned mail and an easy opt-out; Yahoo accepts `mailto:` while recommending RFC 8058. Opt-outs must be honored within two days, and reported spam rates must stay below 0.3%.

Microsoft consumer services enforce high-volume SPF, DKIM, and DMARC requirements and can reject failures with [`550 5.7.515`](https://support.microsoft.com/en-us/outlook/fix-ndr-error-550-5-7-515-in-outlook-com). Current support guidance describes 5,000 or more messages using the same From domain. A prospect's corporate Microsoft 365 tenant can additionally apply its own controls. Authentication identifies the sender; it does not certify that cold sales contact is wanted or permitted.

Maintain a shared suppression record for explicit stop requests and complaints, remove queued follow-ups, and verify that newly imported prospects cannot silently reactivate suppressed contacts. Check both your sending provider's acceptable-use policy and the rules applying to the recipient before launching outreach. Meeting a mailbox provider's technical requirements is not permission to send.

## Mailboxes

Cold outbound sales starts with a credible sender identity, a working reply inbox, and authentication that survives the actual sending tool. A newly purchased domain or paid mailbox is not automatically ready for prospecting. Before starting a sequence, test the complete path: connection, sending, receipt, reply, bounce processing, and opt-out suppression.

This guide builds on practical experience running outbound sales. Start conservatively, keep the setup understandable, and adjust it as you learn what works for your audience.

### Additional domains

> **tl;dr:** Use separate, clearly branded domains for outbound. We prefer a small number of recognizable `.com` domains that you can maintain over time.

We recommend keeping cold outbound separate from your primary business domain. If an outbound campaign runs into deliverability problems, you want to investigate it without disrupting the domain your team uses for everyday business. Separation helps organize that risk, although it cannot guarantee complete isolation of your brand's reputation.

For example, if your primary domain is `example.com`, you might use `examplehq.com`, `getexample.com`, or a name that explains your business. Make the connection to your company obvious in the sender name, signature, and website. Avoid confusing lookalikes or names that could suggest you represent another company.

Our preference for `.com` is a practical branding choice: it is familiar and easy for prospects to recognize. Other established extensions can work, especially where they fit your country or brand. The extension alone does not determine delivery, and buying more domains does not fix an irrelevant campaign.

We prefer a separate registered domain for outbound, though a dedicated subdomain can also help organize your sending. Either way, keep an eye on the wider brand: prospects still see your company name, links, and message.

Keep an inventory of each domain's owner, renewal date, mailbox provider, active representatives, and DNS records. Secure the registrar account and set renewal reminders. Keep domains receiving replies when you retire them from new campaigns so that existing prospect conversations are not lost.

#### DNS records

> **tl;dr:** Set up SPF, DKIM, and DMARC for every outbound domain. Test actual messages before tightening your DMARC policy.

Inspect the received message's raw headers. The visible `From:` domain, envelope sender reflected in `Return-Path`, and DKIM `d=` signing domain are different identities. A branded display name or `Reply-To` does not make authentication align. Your platform might send through the connected mailbox or through separate infrastructure; establish which before editing DNS.

Run these read-only checks with your own domain and active selector:

```sh
# Inspect the envelope domain used by SPF; it may differ from the visible From.
dig +short TXT examplehq.com
# Replace google with the selector found in the actual DKIM-Signature header.
dig +short TXT google._domainkey.examplehq.com
dig +short CNAME google._domainkey.examplehq.com
dig +short TXT _dmarc.examplehq.com
# Confirm inbound mail routing for prospect replies.
dig +short MX examplehq.com
```

These inspect DNS; they do not verify a particular message's DKIM signature or execute a complete recursive SPF evaluation. Save a successful test message as a baseline and retest after changing domains, mailbox providers, gateways, or sending-tool connections.

##### SPF

SPF checks whether the connecting server is authorized for the **envelope sender domain**, not whether the visible author is genuine. Publish one SPF TXT record for that domain. Multiple `v=spf1` records cause an error.

If Google Workspace is your only sending service for the domain, its [SPF setup instructions](https://support.google.com/a/answer/33786) use this record:

```text
v=spf1 include:_spf.google.com ~all
```

This is not a universal record for every configuration. If a sales tool uses your connected Workspace mailbox, do not automatically add the tool's infrastructure to SPF. If it sends independently, follow its actual authentication instructions.

`~all` returns softfail for unmatched servers; `-all` returns fail; `?all` returns neutral; `+all` authorizes everything and defeats useful authorization. These are authentication results, **not instructions guaranteeing inbox, spam-folder, or rejection outcomes**.

SPF evaluation permits at most ten DNS-querying terms across nested policies, including `include`, `a`, `mx`, `exists`, `ptr`, and `redirect`. The limit is not ten visible includes. Exceeding it causes `permerror`; DNS timeouts can cause `temperror`.

Remove obsolete authorizations when retiring tools. Inspect nested includes, leave room for provider changes, and avoid manually flattening a vendor's addresses into a static list without maintaining it. Several quoted strings inside one TXT record can hold a long policy; several separate SPF records cannot.

##### DKIM

DKIM signs message content and selected headers with a domain's key. The receiver looks up the selector in DNS: `s=google; d=examplehq.com` points to `google._domainkey.examplehq.com`. Publishing the key is only part of setup; the sending service must actually sign your messages.

For Google Workspace, follow the [DKIM setup steps](https://support.google.com/a/answer/174124): generate the domain’s key, publish the supplied TXT record, and start authentication in the Admin console.

For Microsoft 365 custom domains, use the [DKIM configuration guide](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dkim-configure) to retrieve the exact CNAME targets from your tenant and enable signing. Do not reconstruct targets from an old blog example: Microsoft has changed the target format, and the values are tenant-specific. Confirm that received mail has your intended custom domain in `d=`.

Use 2048-bit RSA keys where supported, and avoid obsolete SHA-1 signing.

If a tracking system, signature service, or outbound gateway modifies signed content afterward, DKIM can fail. Test the final received message. For rotation, publish a new selector before switching signing and retain the old public key while previously signed mail can still be in transit.

##### DMARC

DMARC passes when **either** SPF passes and aligns with the visible `From:` domain, **or** a valid DKIM signature aligns. It does not fail merely because one mechanism fails. Relaxed alignment permits the same organizational domain; strict alignment requires an exact domain match.

For example, `From: alex@examplehq.com` and a passing DKIM signature with `d=examplehq.com` align. A passing signature from an unrelated provider domain does not. Check both identity and result.

For Workspace, follow [Google’s DMARC setup steps](https://knowledge.workspace.google.com/admin/security/set-up-dmarc). Start with monitoring and a real reporting destination:

```dns
_dmarc.examplehq.com. 3600 IN TXT "v=DMARC1; p=none; rua=mailto:dmarc@examplehq.com"
```

`p=none` requests no DMARC-driven enforcement; `quarantine` requests suspicious treatment; `reject` requests rejection of DMARC failures. None promises inbox placement, and receivers apply their own handling policies.

Start with `p=none` while you check the setup. Avoid relying on percentage or testing flags to make a strict policy safe: receivers can handle them differently. In particular, `p=reject; t=y` can still lead to rejection if the receiver ignores the testing flag.

Review every authorized sender before strengthening the policy, including sales tools and representatives' ordinary correspondence. Be careful with `p=reject` on a domain used for general correspondence: forwarding and mailing lists can break authentication. Use valid DKIM rather than relying on SPF alone, and test the routes your team actually uses before tightening the policy.

Assign someone to review aggregate reports. Reports show authentication observations, not inbox placement. External reporting services may need DNS authorization. Failure reports requested with `ruf` can expose message information; they are not mandatory for a basic deployment.

##### Other records

Working MX records matter because prospects need to reply. An outbound account that sends successfully but cannot receive a response is an incomplete sales setup. Test incoming replies from outside your organization, including messages to the exact address used in the sequence.

For a self-operated sending server, verify matching forward and reverse DNS and SMTP TLS. With a hosted mailbox service, the provider normally manages the sending servers; ask support about the actual failing IP rather than adding a PTR record to an unrelated web server.

MTA-STS protects delivery **to** your domain by publishing an inbound transport policy; it does not automatically improve outbound prospecting. TLS-RPT reports transport failures from supporting senders. Configure these with your receiving provider, initially testing the policy and certificate setup.

BIMI can display a brand logo in participating clients when their requirements are met. It is optional for a sales mailbox and does not buy inbox placement. Gmail supports qualifying VMC or CMC certificates; verify current eligibility before purchasing.

#### Redirects

> **tl;dr:** Make your sales domain lead to a real, recognizable company website over HTTPS. A redirect establishes a useful visitor path, not email authentication or borrowed reputation.

If `examplehq.com` is your outbound domain and `example.com` is your company site, a permanent redirect can help a prospect who types the sender's domain into a browser. Provision a valid certificate for the sales domain and test both HTTP and HTTPS entry points. A broken certificate can stop the browser before the redirect runs.

Redirect paths only when they map meaningfully. For example, `/pricing` can lead to the actual pricing page; an arbitrary wildcard should not create confusing destinations. Keep the chain short and avoid an open redirect where a query parameter can send visitors to any third-party site.

UTM parameters can identify visits from the domain, but they do not prove a particular prospect read your email. Use campaign-level labels where sufficient. Avoid putting personal email addresses, prospect names, or sensitive CRM fields into public URLs.

Direct links to your recognized company site are also reasonable. There is no authentication requirement for website links to share the sender's email domain. Test any tracking-domain rewrite in the final message, and preserve the destination's meaning. Configure web redirects without overwriting the MX or TXT records your mailbox needs.

### Mailboxes

Use identifiable representatives with working reply handling. Keep the same sender on a prospect's conversation, assign ownership of replies, and stop scheduled follow-ups when a human response arrives. Make sure the sales tool distinguishes a substantive reply, an opt-out, an out-of-office response, and a delivery failure.

Before activating a mailbox, verify its display name, signature, time zone, authentication, calendar links, and CRM mapping. Send an external test and reply back. Confirm that an opt-out entered manually by a representative reaches the same suppression system used by automated sequences.

Treat connections as production credentials: give the tool only required access, use the provider-supported authorization method, and revoke access when staff or vendors leave. An address alias is not automatically an independent mailbox with independent capacity or reputation. Inventory the real accounts and shared dependencies.

#### Mailbox providers

> **tl;dr:** Google Workspace remains our default recommendation for outbound mailboxes; Microsoft 365 is a strong alternative, especially for teams already using it.

Both give you established business email infrastructure, administrator controls, custom-domain authentication, and familiar inboxes for your sales team. Use their paid business offerings on domains you control. They reduce the operational work of running your own mail server, but your campaign, recipients, and sending behavior still matter.

When in doubt, start with Workspace. If your team already works in Microsoft 365, its administration, calendar, and sales-tool integration may make it the better fit. You can also test provider matching for audiences concentrated on one platform, but treat the results as specific to your campaign rather than a guarantee that Google-to-Google or Microsoft-to-Microsoft always performs better. Recipient MX records may identify a security gateway rather than the underlying mailbox service.

Before connecting a sales tool, check its supported authorization method, reply synchronization, bounce handling, and opt-out behavior. Confirm that the subscription and account remain under your company's control, including when a reseller supplies the mailbox.

Provider terms still apply. Google’s [acceptable-use policy](https://workspace.google.com/terms/use_policy/) prohibits unsolicited mass email and attempts to evade filtering; a paid subscription does not exempt a campaign from that policy. Microsoft treats bulk sending as unsupported except on a best-effort basis and can restrict users or organizations through its outbound controls.

For the person-to-person sales workflow in this guide, we prefer real mailboxes over starting with an ESP such as SendGrid or SES. Check any service's policy against your intended outreach before purchasing. This preference does not mean an ESP automatically lands in Promotions, or that a Workspace mailbox automatically lands in Primary.

Other business mailbox providers, including Zoho, may fit your budget and workflow. Test authentication, replies, integration support, and results before moving an established setup. We do not recommend self-hosting as the starting point: it adds responsibility for queues, server security, reverse DNS, abuse handling, and IP reputation. A dedicated IP is likewise not an automatic upgrade for a small sales team.

#### Rotating mailboxes

> **tl;dr:** Use a few mailboxes per domain, keep backup capacity, and preserve each prospect's conversation and opt-out history when moving work between mailboxes.

Our practical starting point is one backup mailbox for every three active mailboxes. A smaller setup can start with one active and one backup. Keep backup accounts configured, authenticated, secure, and able to receive replies so they are useful when a connection breaks, a representative leaves, or an account needs maintenance.

Assign each prospect to one active sender. Rotating mailboxes across campaigns should not mean that the same person receives overlapping sequences from several representatives. Deduplicate across domains, teams, and agencies, and keep follow-ups on the original sender whenever possible.

If a mailbox receives a spike in complaints or bouncebacks, pause new outreach from it and inspect the cause. Save the exact SMTP response: an invalid-recipient problem, expired connection, provider quota, authentication error, and account restriction require different fixes. A backup is useful operationally, but it will not repair the list or message that caused the problem.

Before transferring a campaign, synchronize opt-outs and exclusions, preserve conversation records, verify the backup's authentication and replies, and confirm the provider permits the intended sending. Start with a limited cohort and review results. Keep the old address receiving replies when practical.

Revisit paused mailboxes after correcting the underlying issue. Track delivery failures and prospect responses rather than assuming a fixed number of warming days has restored reputation. The [warming section](#warming) covers how to introduce and monitor mailbox activity.

#### Sending limits

> **tl;dr:** Start with a maximum of 30 outbound messages per day per mailbox and three active mailboxes per domain. Keep volume consistent and increase only when the results support it.

These remain our practical starting settings for cold outbound. They give you a manageable initial budget while you work on targeting, messaging, and reply handling. They are not provider-enforced thresholds: even a small campaign can run into problems if the audience is wrong or the setup is broken.

Count follow-ups in the budget, not just first touches. For example, 15 new prospects and 15 scheduled follow-ups already use a 30-message outbound cap. Leave provider capacity and team time for manual replies, meetings, and other account activity. Three active mailboxes at this setting give you up to 90 outbound messages a day across the domain, subject to those other constraints.

Configure the cap in the sending tool and check that overlapping campaigns share it. Avoid a queue burst after a weekend, pause, or reconnection. Spreading messages through the working day is a useful operational habit; a 10–30 minute interval can be a starting setting when it fits your schedule. It is not a technical requirement or a way to guarantee that automation looks human.

Keep three sets of limits in view: your internal campaign cap, the mailbox provider's quota, and any tenant-wide restriction. Google Workspace’s [sending limits](https://knowledge.workspace.google.com/admin/gmail/gmail-sending-limits-in-google-workspace) use rolling 24-hour windows that vary by account status and sending method. Its published ceilings are not cold-outbound targets.

[Exchange Online limits](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits) apply at both user and tenant level. Its Tenant External Recipient Rate Limit covers external recipients across a sliding 24-hour window; adding mailboxes does not remove that shared constraint.

Check the limits shown for your own tenant before adding accounts. Older articles may describe a planned per-mailbox external-recipient limit that Microsoft canceled; that is separate from the tenant-wide restriction.

As you find message-market fit, you can review mailbox counts and daily caps. Look at positive replies, invalid-address failures, opt-outs, complaints where available, and deferrals by receiving provider. Increase gradually after a stable period; hold or reduce volume when those signals deteriorate. If you add domains and mailboxes, apply the same authentication, ownership, and suppression checks rather than treating expansion as a substitute for fixing a weak campaign.

- Start with low volume.
- Keep daily activity reasonably consistent and avoid accidental spikes.
- Include every campaign and follow-up in your limits.
- Scale when targeting, messaging, and actual delivery results support it.

## Warming

> **tl;dr:** Our starting setup is 1 email per day, increasing by around 2 emails each day until reaching roughly 30 per day after two weeks. Keep warming afterward, with small variations in volume and timing. These are practical starting settings from experience; adjust them to your mailbox, provider, and actual outreach results.

Email warming gradually builds activity on a new or existing mailbox before and alongside cold outbound sales. Most warming tools exchange messages and replies between participating accounts. This is different from gradually increasing your actual prospect outreach: keep both streams visible so you know what is happening in each.

The goal is to introduce activity gradually and establish a consistent sending pattern. Increase slowly, avoid bursts, and watch delivery errors and complaints as you go.

A warming tool's score is useful within its test network, but real prospect delivery and replies remain the results that matter for your sales campaign.

### Always keep warming

Our recommendation is to continue warming both fresh mailboxes and mailboxes already in use. A good reputation today does not guarantee good delivery tomorrow, so treat warming and monitoring as ongoing work rather than a one-time setup.

Some deliverability practitioners recommend against automated warming, while others continue to use it successfully. Our working approach is to keep it running and evaluate it against actual campaign performance. Revisit the setup if the service causes account warnings, unexpected traffic, or poorer results.

Keep warming traffic separate in your reporting. Review actual prospect replies, bounces, delivery errors, and stop requests by mailbox and recipient provider. Check the permissions a warming service requests, how it handles mailbox data, and how to disconnect it. Confirm that your use of the tool and outreach program fits your mailbox provider's terms.

### For new mailboxes

After creating a mailbox and checking authentication and reply handling, start warming with a ramp-up rather than a flat daily volume. Our starting configuration is 1 email per day, adding about 2 per day—1, 3, 5, 7, and so on—until reaching roughly 30 per day after two weeks.

In the beginning, we use a warming reply setting of 30–50%, then lower it after the initial ramp. This is a tool configuration, not a predicted prospect reply rate or a mailbox-provider threshold. Keep synthetic replies out of your sales conversion metrics.

**tl;dr:**

- Ramping up period: approximately 14 days.
- Warming target: approximately 30 emails per day.
- Daily increase: 2 ±2, while keeping the overall progression gradual.
- Initial warming reply setting: 30–50%.

These numbers are a starting setup, not a promise that every new mailbox will be ready on day 14. Check received test-message headers for SPF, DKIM, and DMARC, and confirm that replies reach the right salesperson before launching an outreach sequence.

Budget for all sending activity: warming messages, new prospect messages, follow-ups, and manually sent replies. A tool's “daily cap” might cover only its own sends. Published provider limits are account ceilings, not recommended cold-email volumes; accounts can also face restrictions related to spam or other abuse signals.

### Randomization is important

We prefer small variations in daily warming volume while keeping the same general upward pattern. Instead of exactly 1, 3, 5, 7, 9, use a sequence such as 1, 2, 5, 6, 9. A daily increment of 2 ±2 is an easy starting configuration.

Vary the timing too, rather than sending the day's activity in one burst. Many warming tools handle this automatically and distribute activity across different receiving providers. Use these controls to maintain a reasonably paced schedule, not as a reason to push past provider limits or continue through errors.

For actual cold outreach, schedule around the prospect's working day and your team's ability to handle responses. Small timing changes are part of this playbook; they do not guarantee inbox placement. When a provider starts deferring messages, reduce the affected traffic instead of trying to solve the problem by changing the randomization settings.

If bounces or deferrals increase, reduce volume and check the affected mailbox before continuing the ramp.

### After ramping up

After the initial ramp, our starting recommendation is to keep warming at approximately the same level, with small variations. For example, send between 25 and 35 warming emails per day and use a reply setting of 30–40%.

**tl;dr:**

- Ongoing warming volume: 30 ±5 emails per day.
- Warming reply setting: 30–40%.

Keep these warming settings separate from your cold-outreach budget. As a sales sequence grows, yesterday's first touches create tomorrow's follow-ups. Review the combined queue before increasing prospect volume, and avoid catch-up bursts after an outage or pause.

Track changes to the prospect source, copy, sending application, and authentication setup. If results deteriorate, pause the affected sequence and investigate the change. Save representative error responses and received headers so you can compare what happened before and after a fix.

### Positive and negative actions

Replies, genuine conversations, and recipients deliberately keeping your email are encouraging signs. Spam complaints and requests to stop show that the outreach is not working for those recipients. Ask a relevant question to make replying easy, even if the next step is a simple yes or no.

Separate positive replies, objections, referrals, automated replies, and opt-outs in your reporting. A warming reply percentage and a qualified prospect response rate answer different questions. Neither should obscure a rise in delivery failures or complaints.

Make it easy for prospects to say no and honor that across every salesperson and sending tool. Remove queued follow-ups when someone opts out. An unsubscribe is useful feedback and can prevent another unwanted message from becoming a spam complaint.


## Content

> **tl;dr:** Personalize your message, vary the copy, keep the first email simple, and make it easy to reply or opt out.

The body of your email is where your targeting becomes a conversation. Start with a short, relevant pitch that sounds like you, then improve it from actual replies. The practical defaults below build on this guide's outbound experience; adapt them to your audience while meeting applicable sending rules.

### Personalize the messaging

Personalize around a business problem the recipient plausibly owns. “You lead infrastructure at a company hiring platform engineers” is a reason to assess fit; “you must be struggling with downtime” is an unsupported inference. Record the source and date of material claims so someone can verify them before sending.

Use a short structure: why this person, the relevant problem or opportunity, credible evidence, and a low-effort question. For example:

> Hi Alex — your careers page lists two platform-engineering roles focused on deployment tooling. We help infrastructure teams standardize release approvals across repositories. Would a short outline of the approach be useful?

Only use that example if the observation and product description are true. A first-name variable, fabricated compliment, or AI-generated introduction is not meaningful research. Review generated copy for invented customers, metrics, responsibilities, and familiarity. Do not include personal or sensitive observations merely because they can be found online. Set a fallback that omits uncertain personalization rather than sending an obviously broken merge field.

### Randomize the body content

Vary your copy so prospects receive a message suited to their role and business situation. Spintax is a useful starting point for introducing natural alternatives, especially when you review every combination for grammar and meaning. Go further where possible: change the opening observation, relevant example, or question instead of only swapping greetings.

For example, “Would a short outline be useful?” and “Is this something your team is looking at?” offer different ways into the conversation. Use the one that matches the rest of the pitch. An LLM can help draft variants, but review its facts and avoid awkward or exaggerated phrasing. Keep sender identity, opt-out instructions, and essential disclosures consistent across variants.

For a useful experiment, assign comparable prospects to a small number of substantive variants, such as a different problem statement or call to action. Keep account assignment consistent so colleagues do not receive contradictory pitches. Change one major hypothesis at a time, keep a control, and assess positive replies and qualified meetings alongside opt-outs and delivery problems. Save the rendered version with the send record so the team can explain exactly what a prospect received.

### What not to include

Remove anything you cannot defend: invented results, fake referrals, disguised identity, misleading scarcity, private customer information, and a claim that you previously spoke when you did not. Keep the first message focused enough that a recipient can decide whether the topic is relevant without opening several resources.

As a practical starting point, use plain text or very simple HTML, few links, and no unnecessary images or attachments. That keeps the first approach focused and makes the message easy to assess. Add richer material when it helps a specific conversation; these are starting defaults rather than universal pass/fail rules.

#### Spammy words

Write concrete claims and qualify them honestly. “We reduced deployment approval time in this documented case study” is stronger than “guaranteed risk-free results,” provided the case study exists and matches the claim. Avoid shouting, excessive punctuation, and fake urgency because they make an unsolicited pitch harder to trust.

A content checker can help catch overhyped phrases before sending. Use it as an editing aid alongside a human review of tone, claims, and relevance. Keep normal sentence case, limit exclamation marks, and avoid wording that makes an ordinary sales offer sound like a scam. Review the sender identity, destination links, audience, and complaints as well as copy. The FTC specifically prohibits misleading subjects and headers in US commercial email, including B2B messages.

#### Images

Start your first cold email without images unless one adds clear value. A relevant screenshot can be useful later when it explains a concrete observation. Keep the pitch understandable with images disabled, and avoid an image-only message. Do not insert a personalized screenshot that exposes another customer's data or implies access you do not have.

Give informative images useful alternative text and decorative images an empty `alt=""`; keep essential claims in real text. The message should still make sense when the images do not load. Check mobile rendering, enlarged text, and dark mode; use semantic structure and descriptive links.

Changing a tracking pixel's dimensions does not turn it into a non-tracking image or solve privacy obligations. Decide whether tracking is needed separately from whether a screenshot is useful.

#### Links

Keep links to a minimum in the first email; a reply-based call to action often needs no sales link at all. When a link helps, choose an identifiable company website or one relevant proof point. Keep any required unsubscribe mechanism even when you are minimizing other links. Prefer an accurate, recognizable destination and link label. Check certificates, redirects, and the final landing page from the received message.

If the first call to action is simply a reply, a calendar link may be unnecessary until the prospect expresses interest. Do not publish their name, email address, or employer in a personalized URL slug just to measure engagement. Use an opaque identifier when an identifier is necessary, and apply an appropriate retention policy.

Click-tracking systems can rewrite links through a redirect service; that introduces another destination to test and maintain. A branded tracking domain improves recognizability but does not guarantee trust or inbox placement.

#### Attachments

As a practical default, do not attach a deck or proposal to a first cold approach. Describe the relevant idea and offer the material. After a prospect requests it, provide the expected file or a clearly identified secure download. Scan files, use descriptive filenames, and keep their contents consistent with your claims.

An unsolicited calendar invitation is also an imposition on a prospect's workflow. Agree on interest and a time before sending an invite. Never use executable files, credential requests, or misleading document names to induce engagement.

### Keep markup similar to human emails

Keep the email visually close to an ordinary business message: readable text, modest spacing, a short signature, and minimal decoration. Use your mailbox editor's native formatting where practical, and inspect what the sequencing tool actually sends. If you quote a real earlier message, preserve it accurately; start a new conversation honestly rather than inventing reply history.

Use a mail library or the sending tool's editor to generate valid messages. Review both text and HTML versions, international characters, signature, link destinations, and opt-out rendering. Send an actual test through the same connection used by the campaign. A preview cannot reveal every change a sending platform makes after submission.

Keep a consistent real sender name and a monitored reply address. A prospect who replies should reach the person or team represented in the message. Avoid elaborate signatures that overwhelm a short pitch, while retaining required identity and contact details.

### Opt-out and unsubscribe

Make stopping outreach obvious: for example, “If this isn't relevant, reply and I'll stop contacting you.” Where a link is appropriate or required, include a working link too. Do not hide it in pale text or require an account login. A footer is useful only if the underlying process reliably stops later sends.

Stop the sequence when a person replies, then classify the response. A positive reply goes to the account owner; a negative reply or opt-out stops contact. An out-of-office response should pause for review or a justified reschedule, not trigger a sales qualification action. Support plain-language requests, including “remove me,” and define how account-wide requests such as “stop emailing our team” are handled.

Synchronize suppression across the CRM, sequencing tool, manual outreach workflow, agents, and alternate mailboxes. Check it again immediately before dispatch, not only when importing a prospect. An agency handoff or a fresh data-vendor export must not revive a suppressed contact. Preserve the scope, date, and source of the request with appropriate access and retention controls.

Provider requirements can exceed legal minimums. Gmail requires compliant one-click unsubscribe for applicable bulk marketing traffic; a body link or reply-based opt-out alone is not the RFC 8058 mechanism. Whether a campaign is called “sales” does not by itself exempt it from marketing rules.

If your sending program needs one-click unsubscribe, confirm that the sales platform can supply these headers and process the request:

```text
List-Unsubscribe: <https://sales.example.com/unsubscribe/OPAQUE_TOKEN>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

The receiving provider sends an HTTPS POST containing `List-Unsubscribe=One-Click`. The endpoint must work without login, cookies, or another confirmation, and must not redirect that POST. Support both form-encoded and multipart submissions. Both headers must be covered by a valid DKIM signature. Use a hard-to-forge token identifying the recipient and list.

For privacy, we recommend an opaque token instead of a readable prospect address in the URL. If your platform operates this endpoint, ask how it propagates the opt-out to other campaigns and mailboxes. Test a real unsubscribe, then verify that the next scheduled touch is suppressed. If you implement it, make repeated POSTs safe and keep ordinary GET requests from silently unsubscribing people when security scanners follow links. Ensure firewall challenges do not block the receiving provider's request. Keep the visible body opt-out useful even when the mailbox client does not display its own unsubscribe button.

For cold B2B outreach, check jurisdiction and subscriber type rather than assuming one global rule:

| Location | Questions to resolve before outreach |
| --- | --- |
| United States | [CAN-SPAM](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) applies to commercial B2B email; verify truthful identity and subject, required disclosures and postal address, and opt-out handling. Honor opt-outs within 10 business days at the latest, with faster operational suppression. |
| United Kingdom | [PECR’s B2B email rules](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/) differ for corporate subscribers versus sole traders and certain partnerships. Using a named business contact's personal data also engages data-protection duties. A business-looking address alone does not settle the classification. |
| European Union | Review the relevant national implementation of ePrivacy Article 13 alongside GDPR, including treatment of corporate recipients. A legitimate-interest argument does not by itself settle permission to send electronic marketing. |
| Canada | [CASL’s consent requirements](https://crtc.gc.ca/eng/com500/guide.htm) have specific conditions. A conspicuously published business address is not blanket permission; relevance to the recipient's role and other conditions matter. |
| Australia | Check [ACMA’s requirements](https://www.acma.gov.au/avoid-sending-spam) for consent, sender identification, and unsubscribe. ACMA requires honoring opt-outs within five working days and says an unsolicited marketing message asking for consent is not a workaround. |

This table is a starting point for reviewing the campaign, not a complete legal assessment. Separately check the sending provider's acceptable-use policy and receiving-provider expectations: legal eligibility does not guarantee platform permission or acceptance.

### Subject line

Name the actual business topic. “Release approval process” is a testable description; “Urgent account issue” is misleading if the message is a sales pitch. Reserve `Re:` and `Fwd:` for actual replies and forwards. Avoid presenting an automated email as an internal note or a referral that never happened.

Test subjects together with the audience and proposition they describe. Optimize for a relevant conversation, not curiosity at any cost. A subject that attracts more apparent opens but also more negative replies is not necessarily better. Review text truncation on mobile and make sure the preview text continues the message rather than exposing template debris.

## Tracking

For cold outbound, start by deciding what action the data will change. Replies, meetings, opt-outs, failures, and account progression often answer more useful questions than a per-person open timestamp. Do not enable every tracker merely because the sequencing platform offers it.

Open tracking records an image request. Apple Mail Privacy Protection may fetch and cache the image without a person reading the email, including for Gmail or business accounts read in Apple Mail. Image blocking can hide real reading. Never send “I saw you opened my email” based on this signal, and do not accelerate a sequence just because the pixel fired.

Clicks can also come from security scanners. If your tool flags automated activity, use that information, but do not assume every unflagged click came from a person. Check patterns such as every link being visited seconds after acceptance; avoid automatically classifying those prospects as interested.

Choose tracking settings by campaign and jurisdiction, minimize collected data, and document retention. Permission to send a message and permission to track the recipient are separate questions. Do not assume an exemption for measuring a requested service also covers tracking cold prospects.

Disabling pixels does not guarantee inbox placement either. Test a practical tracking policy against the quality of your decisions and conversations, with privacy requirements resolved first.

## Audience

Build the smallest useful list for a specific sales hypothesis. Keep a record of why each account and role fit, where contact data came from, when it was checked, and what rules permit contact. Exclude existing opt-outs, customers owned by another workflow, ongoing opportunities, and accounts already assigned to a colleague where additional outreach would conflict.

### Targeting

Define the account criteria before collecting addresses: business model, geography, relevant technology or process, company stage, and an observable problem your product addresses. Then identify the role likely to own that problem. A senior title alone is not a targeting strategy.

Use one accountable owner per account and a shared contact history. Set documented contact and account caps across all sales tools; choose them for the audience and program rather than adopting a claimed universally safe number. Review small cohorts manually before expanding them. When replies repeatedly say “wrong person,” fix the role selection instead of sending more follow-ups.

Treat a data vendor as a source of leads, not a substitute for knowing your audience. Check where the records came from, how fresh they are, and whether the people match your target profile. A list that is technically valid can still produce poor replies and complaints. Check the rules that apply to your campaign before sending.

#### Buying intent

Treat an intent signal as a hypothesis to validate. A public hiring announcement, new office, or relevant request for suppliers may establish business context; it does not prove the company wants your product or that a named employee requested contact. Store the signal's source, date, and interpretation separately.

For third-party intent data, ask what was observed, whether it is account-level or person-level, how recently, and how the supplier obtained it. Do not state that an individual visited a page based on an account-level inference, pixel, or scanner click. Avoid sensitive or personal profiling in a business pitch.

Compare intent-selected accounts against otherwise comparable accounts using positive replies and qualified opportunities. If the signal only produces more addresses and complaints, it is not improving the program. Do not confuse “in market,” address validity, and permission: they are three different assessments.

#### Email verification

Verification reduces avoidable addressing errors; it does not prove inbox placement, interest, or consent. Keep valid, invalid, accept-all, and unknown results separate. Recheck stale records before a new campaign, but do not repeatedly probe or mail unknown addresses to force a verdict.

Check syntax and domain configuration with a maintained parser. A missing MX can fall back to address records; `MX 0 .` explicitly says the domain accepts no email. A DNS timeout is not proof that a domain is nonexistent.

Offer typo corrections for confirmation rather than silently changing the recipient. Do not universally strip dots or `+tags`; even Google's own dot-equivalence behavior differs between consumer Gmail and organizational domains. Check international-address support in the sending platform instead of declaring all non-ASCII addresses invalid.

Preserve full bounce diagnostics. `550 5.1.1` indicates an invalid destination mailbox, while `550 5.7.1` indicates an authorization or policy refusal. Both are permanent failures for the attempt, but only the former establishes that particular mailbox problem. Suppress confirmed invalid addresses and investigate policy failures without marking the entire prospect list invalid.

### Scheduling

Define an outreach sequence with a finite endpoint and a reason for each follow-up. A later message should add a relevant clarification, evidence, or question rather than repeat “bumping this.” Silence is not a request for indefinitely escalating contact.

Check reply state, ownership, suppression, and account caps immediately before each send. This prevents a queued follow-up from arriving after a prospect has replied or a colleague has booked a meeting. Pause ambiguous automated responses for review. If you change tools, migrate suppression and history before scheduling another campaign.

#### Days and timezones

Use the prospect's known business timezone and local working context when available, including daylight-saving changes and holidays. Do not infer their location from an open-tracking IP. If the timezone is uncertain, record that uncertainty rather than presenting a guessed schedule as personalized.

There is no single best weekday or hour for every outbound audience. Test comparable account cohorts and measure useful replies and meetings, while watching opt-outs. Keep messages inside a reasonable delivery window and spread demand to avoid a synchronized burst. Consider whether someone on your team can actually respond when the campaign generates replies.

#### Randomization

Randomize send times within your chosen business-hours window rather than releasing every queued prospect at the same minute. Modest jitter also smooths load and avoids synchronized batches. Preserve follow-up spacing and account caps while doing this; randomization should not produce extra touches or push sends outside the recipient's window.

If a receiving provider temporarily defers traffic, let the sending system follow its retry policy and reduce the affected campaign where appropriate. Do not resubmit every deferred message from the sequencing application while the provider is already retrying it. Keep a durable business-event identifier so a restarted worker cannot silently schedule the same touch twice.

## Metrics

Measure the path from valid attempt to useful sales conversation. An ESP's “delivered” status normally means the recipient server accepted the message, not that it reached the inbox.

| Metric | Suggested definition or interpretation |
| --- | --- |
| Unique prospects contacted | Distinct people receiving an attempted first touch in the cohort |
| Accounts contacted | Distinct companies reached; reveals account saturation hidden by mailbox totals |
| Acceptance rate | Recipient-message pairs accepted divided by pairs attempted; exclude intentionally suppressed records |
| Invalid-address rate | Confirmed invalid-address failures divided by attempted recipient-message pairs |
| Policy rejections and deferrals | Separate categories by receiving provider and diagnostic reason |
| Human reply rate | Distinct prospects replying divided by prospects contacted; exclude automatic responses |
| Positive reply rate | Distinct prospects expressing relevant interest divided by prospects contacted; document the classification |
| Qualified meetings held | Meetings that occurred and met written qualification criteria; report booked meetings separately |
| Opportunities and pipeline | Sales outcomes attributed to the cohort using a stated observation window |
| Opt-outs, negative replies, complaints | Counts and rates; signals that can require stopping or retargeting |

For example, 10 positive replies among 500 contacted prospects is 2%, even if 40 people replied overall. Dividing positive replies by all replies answers a different question. Show denominators, cohort dates, and counts; do not compare a mature sequence with a first-day cohort whose replies have not arrived yet.

Break down results by audience segment, acquisition source, sender, domain, receiving provider, sequence step, and copy variant. Count unique people and accounts alongside messages. More follow-ups can inflate total replies while wasting contacts or harming reputation; compare incremental useful outcomes and negative responses at each step.

Complaint visibility is incomplete. Gmail complaints will not necessarily appear as individual events in your sequencing tool; check Google Postmaster Tools as well. Zero complaints in a sequencing dashboard is therefore not proof of zero complaints. Keep provider-defined rates distinct from your own formulas.

Use seed inboxes and placement tests to investigate, not to promise a percentage for real prospects. A clean blocklist check and passing authentication also do not guarantee inbox placement. Before expanding a campaign, review its positive outcomes, negative signals, address quality, and provider-level failures together. When results deteriorate, pause the affected cohort, preserve diagnostics, and investigate the recent change instead of adding mailboxes or rewriting random words.

### Google Postmaster Tools and provider feedback

Add and verify your sending domains in [Google Postmaster Tools](https://postmaster.google.com/). Low-volume cold-email programs may not generate enough data for every dashboard; missing data does not establish that a mailbox is healthy. Use the data available alongside your actual campaign results.

[Google’s sender guidelines](https://support.google.com/mail/answer/81126?hl=en) recommend keeping the user-reported spam rate below 0.1% and avoiding 0.3% or higher. Treat these as limits to stay well away from, not an allowance for complaints. Its spam dashboard reflects reports on mail reaching engaged recipients' inboxes; messages automatically filtered into spam are not represented in the same way. A low displayed rate can coexist with poor placement.

If you use a third-party Postmaster dashboard, check that its integration still works and which metrics it supports. Different API versions expose different information; a missing reputation chart does not necessarily mean your reputation changed.

Yahoo’s [Complaint Feedback Loop](https://senders.yahooinc.com/complaint-feedback-loop/) uses the DKIM signing domain. Ask your sending provider whether it already enrolls and processes complaints for your domain. Do not assume a sales sequencer receives every complaint.

Microsoft’s [SNDS portal](https://substrate.office.com/ip-domain-management-snds/snds) reports on sending IPs and requires authorization. With hosted mailboxes, your provider normally controls that infrastructure; ask what information and escalation support it can provide. If your team collects SNDS data, keep the integration up to date. Legacy download links and trap-hit reports are no longer reliable inputs; missing data should not be read as zero.

### Bounces, deferrals, and retry decisions

Save the full SMTP response, not just the sequencing tool's “bounced” label. A `4xx` response is temporary; a `5xx` response is permanent for the attempted transaction. Do not automatically keep retrying an unchanged permanent rejection. A permanent policy rejection is not the same as an invalid prospect address.

| What you observe | What to do next |
| --- | --- |
| Invalid recipient | Suppress the address and examine the data source |
| Authentication rejection | Check the actual sending route, DNS, active DKIM selector, and alignment |
| Temporary throttling at one provider | Reduce the affected traffic; let the sending system manage retries |
| Accepted but missing | Check spam, quarantine, recipient rules, and a real received-message sample |
| Tool disconnected or queue stuck | Repair the connection and review queued touches before restarting |
| Higher opens but no useful replies | Check tracking changes, scanners, targeting, and the proposition |

Avoid automatically sending the same message from a backup mailbox while the original attempt is still queued. Keep message IDs and send timestamps so support can trace what actually happened. A delayed first touch and its scheduled follow-up should not arrive together after a queue recovers.

### Spam traps, blocklists, and recovery

If a tool reports a listing, establish whether it concerns your sending IP, domain, or a link domain, and which operator maintains it. Check the operator's own lookup and instructions. For example, Spamhaus provides an official [reputation checker](https://check.spamhaus.org/). A clean result from one checker does not describe every receiver's private filtering decisions.

Treat a suspected spam-trap issue as a reason to examine data provenance, stale contacts, imports, and verification handling. An address vendor's “valid” label cannot tell you that a person wants your message. If you use shared infrastructure, preserve the evidence and involve the mailbox provider; you may not control the listed IP.

Our recovery checklist:

1. Identify the affected mailbox, domain, recipient provider, and sequence.
2. Pause the affected campaign and preserve pending replies and opt-outs.
3. Compare the last healthy cohort with the first unhealthy one: list source, copy, links, volume, authentication, and tool configuration.
4. Fix the cause and follow the provider or blocklist operator's process where required.
5. Test the repaired setup and resume with a small, closely watched cohort.
6. Record the change and review actual prospect delivery, replies, and meetings before scaling again.

### A weekly sales-deliverability review

Review delivery and commercial results together. For each active domain and mailbox, record volume, first touches versus follow-ups, failed addresses, provider-specific errors, stop requests, human replies, positive replies, meetings booked, and meetings held. Review account-level contact pressure too: several individually modest sequences can still overwhelm one company.

Assign an owner to each problem and decide whether to continue, adjust targeting or copy, reduce volume, or pause. Keep a change log with cohort dates so you can learn from experience instead of repeatedly changing several variables and guessing which mattered.

## 📄 License

This work is licensed under a [Creative Commons Attribution Share Alike 4.0 International](./LICENSE) by Anand Chowdhary.
