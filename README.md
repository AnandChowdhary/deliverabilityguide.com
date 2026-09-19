# 📧 The Open-source Email Deliverability Guide ([DeliverabilityGuide.com](https://deliverabilityguide.com))

<a href="https://deliverabilityguide.com" target="_blank"><img alt="Book cover" src="https://raw.githubusercontent.com/AnandChowdhary/deliverabilityguide.com/b2784aaccf8872d00c972bb28dcc73d2e9d1b983/site/src/images/cover.png" width="300"></a>

**This aims to be the world's most comprehensive email deliverability checklist for outbound sales.**

If you're sending outbound sales emails, you should follow this checklist to give your emails the best chance of reaching the inbox instead of spam. This checklist is based on the experience of sending tons of outbound emails, and it's open source to keep the information recent and relevant. Contributions are welcome!

Deliverability involves judgment and experience as well as technical setup. Start with the settings we recommend, pay attention to what happens in your own campaigns, and adjust as you learn. What works for one audience or mailbox will not always work for another.

## Start here

### Cold outbound preflight

- [ ] Spend most of your effort qualifying the lead list: the right company, the right person, and a problem you can solve.
- [ ] Check the rules for the recipient's jurisdiction and the acceptable-use policies of your mailbox and outreach providers.
- [ ] Inventory sending domains, mailboxes, owners, sending tools, and integrations.
- [ ] Verify SPF, DKIM, and DMARC alignment on an actual received message from each sending route.
- [ ] Verify address data without treating a “valid” result as permission or proof of interest.
- [ ] Start with 1–2 new prospect emails per mailbox daily; build gradually toward 10–15, leaving room for follow-ups.
- [ ] Schedule three follow-ups, 3–4 days apart, in the recipient’s timezone.
- [ ] Keep spare domains warming and have three backup mailboxes for every five active ones.
- [ ] Make sender identity accurate and opting out easy; synchronize stop requests across mailboxes and campaigns.
- [ ] Test subject, personalization, links, rendering, authentication, and reply routing through the actual sending tool at both Google and Microsoft.
- [ ] Stop automated follow-ups when a prospect replies or opts out; pause out-of-office contacts until their return.
- [ ] Start reply automation in manual review, exclude warming messages, and assign an owner to interested replies.
- [ ] Be ready to pause new outreach and unanswered follow-ups across a troubled domain while continuing existing conversations.
- [ ] Test automatic stop rules and keep message, thread, and delivery logs from the beginning.
- [ ] Monitor recipient-provider errors, complaints, invalid-address failures, positive replies, and meetings.

### How to use this guide

Read through the domain and mailbox setup first, but spend most of your campaign preparation on prospecting and qualification. Get the audience right, then work on warming, content, scheduling, and measurement. The suggested settings are our practical defaults for cold outbound. Use them as a starting point and adjust to your own results; your provider's limits and rules still apply.

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

> **tl;dr:** Use separate branded `.com` domains for cold outbound. Start with ten domains, warm their mailboxes early, and keep a reserve rather than putting all your sending on one domain.

The basic idea is divide and conquer: don't put all your eggs in one basket. Plan for some outbound domains to develop deliverability problems over time. A prepared pool gives you room to pause a domain, clean up the problem, and distribute work across healthy domains without interrupting existing conversations.

If your primary domain is `example.com`, use recognizable names such as `examplehq.com`, `getexample.com`, or a name that explains your business. Make the connection to your company obvious in the sender name, signature, and website. These should be branded domains you maintain, not confusing lookalikes.

We recommend separate registered `.com` domains rather than subdomains, especially subdomains of your primary domain. Reputation can be associated with the root domain, so `outbound.example.com` is not the separation we are looking for. Keep the primary domain for the rest of your business while you establish your outbound program.

There is an exception at substantial scale. A large business with a long-established primary domain and a huge volume of healthy transactional email can consider using that domain for a small amount of sales outreach. Our working benchmark is outbound representing less than roughly 1% of total sending. Think of the scale of a business like Stripe or Ramp, not a young company with a few employee inboxes. This is a judgment call based on the existing reputation and volume, not a threshold that guarantees protection or exempts you from provider rules.

Buy the spare domains at the beginning and start warming their mailboxes. Ideally they will have a few months behind them by the time you need more capacity. Expect to review the pool regularly; some domains may need investigation, cleanup, or a longer rest before they are ready.

Keep an inventory of each domain's owner, renewal date, mailbox provider, mailboxes, and status: warming, active, paused, or retired. Secure the registrar account and set renewal reminders. Keep receiving mail on paused and retired domains so that ongoing prospect conversations remain intact.

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

Our preferred progression is **`p=none` → `p=quarantine` → `p=reject`**. Begin by watching the reports, move to quarantine as you confirm legitimate mail passes, and use reject once the setup is proven. We are comfortable with full rejection on a properly configured outbound domain.

Avoid relying on percentage or testing flags to make a strict policy safe: receivers can handle them differently. In particular, `p=reject; t=y` can still lead to rejection if the receiver ignores the testing flag.

Review every authorized sender before strengthening the policy, including sales tools and representatives' ordinary correspondence. Be careful with `p=reject` on a domain used for general correspondence: forwarding and mailing lists can break authentication. Use valid DKIM rather than relying on SPF alone, and test the routes your team actually uses before tightening the policy.

Assign someone to review aggregate reports. Reports show authentication observations, not inbox placement. External reporting services may need DNS authorization. Failure reports requested with `ruf` can expose message information; they are not mandatory for a basic deployment.

##### Other records

Working MX records matter because prospects need to reply. An outbound account that sends successfully but cannot receive a response is an incomplete sales setup. Test incoming replies from outside your organization, including messages to the exact address used in the sequence.

For a self-operated sending server, verify matching forward and reverse DNS and SMTP TLS. With a hosted mailbox service, the provider normally manages the sending servers; ask support about the actual failing IP rather than adding a PTR record to an unrelated web server.

MTA-STS protects delivery **to** your domain by publishing an inbound transport policy; it does not automatically improve outbound prospecting. TLS-RPT reports transport failures from supporting senders. Configure these with your receiving provider, initially testing the policy and certificate setup.

BIMI can display a brand logo in participating clients, but it is probably unnecessary for cold outbound. We would spend that effort on a **personal avatar** instead. A recognizable photo makes the message feel like it came from a real person.

Add the salesperson's photo to each Google or Microsoft account. Check the profile's visibility settings and make the photo visible outside your organization where supported. Use the same name and photo consistently across the sender's accounts.

Even if the mailbox is not hosted on Workspace, you can [create a Google account using the existing email address](https://support.google.com/accounts/answer/27441?hl=en). Verify that address, add a profile picture under Personal info, and review who can see it. This creates a Google identity for the address; it does not move the mailbox or replace its email hosting. If the address already has a Google account, update that account instead. The photo can appear in Google services such as Gmail, though the recipient's client and settings determine what they actually see.

#### Redirects

> **tl;dr:** Redirect each outbound domain to your company website, and keep any links in the email on the same domain as the sender. UTM parameters are useful for seeing which domains bring visitors.

Prospects do visit your website. Some type the sender's domain into their browser; others click the domain displayed by their email client. Make sure that journey works. If you send from `alex@examplehq.com`, visiting `examplehq.com` should take the prospect to your normal homepage.

Set up a permanent redirect and a valid HTTPS certificate for every outbound domain. Test both HTTP and HTTPS: a certificate error can prevent the redirect from running. Configure web redirects without overwriting the MX or TXT records the mailbox needs.

If you include a link in an email, use that same outbound domain. For example, `https://examplehq.com/pricing` can redirect to the real pricing page at `https://example.com/pricing`. Keep the chain short, preserve the intended destination, and test the actual link delivered by your sequencing tool. Our preference is one consistent domain across the sender, inbox, and links.

Add UTM parameters to distinguish visits from different outbound domains. Use campaign or domain labels rather than putting prospect names or email addresses in public URLs. These visits are useful context, but a domain-level visit does not tell you exactly who read an email.

A wildcard redirect can help preserve paths when your main website has matching pages. Check that unknown paths fail sensibly and that a query parameter cannot redirect visitors to arbitrary third-party sites.

### Mailboxes

Use full-fledged inboxes that can both send and receive mail. **Do not use a separate `Reply-To` address.** A reply should go back to the same address the prospect saw as the sender, and the same mailbox should continue that conversation.

You can use sensible address permutations for the same real representative: `alex@`, `alex.morgan@`, or `a.morgan@` across your outbound domains. Keep the display name, profile photo, and signature consistent. An address alias is not a separate mailbox with its own sending capacity; if your plan needs independent accounts, provision actual inboxes.

Before activating a mailbox, verify its display name, avatar, signature, timezone, authentication, links, and CRM mapping. Send an external test and reply back. Check that the sequencing tool can distinguish human replies, opt-outs, out-of-office responses, and delivery failures.

Assign one owner to each prospect conversation. Make sure an opt-out entered manually by a salesperson reaches the same suppression system used by automated sequences. When you rotate new outreach to another domain, leave existing threads with their original sender.

Treat connections as production credentials: give tools only the access they need, use the provider-supported authorization method, and revoke access when staff or vendors leave. Keep the accounts under your company's control.

#### Mailbox providers

> **tl;dr:** Prefer Google Workspace or Microsoft 365 on branded domains you control. Prewarmed domains are an urgent-launch fallback; an unrelated domain can undermine credibility even when it is technically ready to send.

Both give you established business email infrastructure, administrator controls, custom-domain authentication, and familiar inboxes for your sales team. Use their paid business offerings on domains you control. They reduce the operational work of running your own mail server, but your campaign, recipients, and sending behavior still matter.

When in doubt, start with Workspace. Microsoft 365 is our main alternative, especially for an audience concentrated on Microsoft.

One optimization we recommend is matching the prospect's provider: send to Google-hosted recipients from a Workspace mailbox and Microsoft-hosted recipients from a Microsoft mailbox. Check the recipient domain's MX records when choosing the sender for a new sequence. This is an experience-based preference, not a promise about every message. MX records sometimes point to a security gateway, so leave uncertain cases unclassified rather than guessing. Once a prospect is assigned, keep the same sender through the conversation.

Before connecting a sales tool, check its supported authorization method, reply synchronization, bounce handling, and opt-out behavior. Confirm that the subscription and account remain under your company's control, including when a reseller supplies the mailbox.

**Prewarmed domains are an emergency fallback for a launch that cannot wait.** Prefer your own branded domains whenever possible. Purchased stock domains often have no connection to your brand. Even if their mailboxes are ready to send, the recipient still sees an email from an unfamiliar, unrelated domain. That can feel suspicious and hurt your brand's credibility. A warmup score does not solve that problem, so we would not build a long-term outbound program around random prewarmed domains.

If you use a prewarmed or managed setup, check who owns the domain and mailbox accounts, controls DNS and account recovery, and can transfer them later. Ask about prior sending history and what happens when you cancel: can you export your conversations, and will those inboxes keep receiving replies? Some offers provide rented access rather than ownership. Confirm the arrangement before putting real prospect conversations there, and test the actual setup before sending.

Provider terms still apply. Google’s [acceptable-use policy](https://workspace.google.com/terms/use_policy/) prohibits unsolicited mass email and attempts to evade filtering; a paid subscription does not exempt a campaign from that policy. Microsoft treats bulk sending as unsupported except on a best-effort basis and can restrict users or organizations through its outbound controls.

For the person-to-person sales workflow in this guide, we prefer real mailboxes over starting with an ESP such as SendGrid or SES. Check any service's policy against your intended outreach before purchasing. This preference does not mean an ESP automatically lands in Promotions, or that a Workspace mailbox automatically lands in Primary.

Our rule of thumb for cold outbound: **skip Zoho and stick with Workspace or Microsoft 365**. This is our provider preference for this workflow. We also do not recommend self-hosting as a starting point: it adds queues, server security, reverse DNS, abuse handling, and IP reputation to your workload. A dedicated IP is not an automatic upgrade for a small sales team.

#### Rotating mailboxes

> **tl;dr:** Keep three backup mailboxes for every five active ones, with backups on separate warmed domains. When reputation deteriorates, pause prospecting across the affected domain—not just the first mailbox showing symptoms.

Our starting recommendation is to buy ten branded domains and begin warming their mailboxes. Keep **three backups for every five active mailboxes**. A backup on the same troubled domain does not give you the separation you need, so distribute reserve capacity across domains. Keep spare accounts authenticated, connected, secure, and able to receive replies.

Treat the domain as the unit of reputation management. If one mailbox begins landing in spam, assume its neighbors on the same domain are at risk too. In our experience, the visible symptoms often arrive after the problem has already developed. Do not wait for every mailbox to show the same decline before acting.

When that happens:

1. Pause **all new outreach on the domain**, across every mailbox and sending tool.
2. Stop scheduled follow-ups to prospects who have never replied. Preserve their sequence position instead of leaving them queued to send.
3. Keep replying to people already in a conversation, using the original mailbox and thread. A domain pause is not a reason to abandon interested prospects or move them to an unfamiliar sender.
4. Keep warming while you investigate targeting, complaints, authentication, and recent changes, subject to provider restrictions and the [specific listing's recovery policy](#spam-traps-blocklists-and-recovery). Continuing warmup or waiting will not clear every blocklist entry.
5. Use prepared, healthy domains for new campaigns once you have corrected any problem that would carry over. Synchronize opt-outs and prospect ownership first.

Reassess the paused domain after a few weeks. When its condition has improved and the underlying issue is addressed, you can resume the unanswered campaigns from the **same domain**. Recheck whether the prospect and message are still relevant, space the remaining touches from the restart, and begin gently. Do not release several weeks of queued follow-ups in a burst or count the waiting period alone as proof of recovery.

Even when every domain is doing well, rotate the allocation of **new prospects** periodically to distribute volume. Keep ongoing conversations with their original sender, and do not enroll the same person in overlapping campaigns from multiple domains.

#### Sending limits

> **tl;dr:** Start with 1–2 new prospect emails per mailbox per day and increase very gradually toward 10–15. Leave room for follow-ups, warming, and real conversations. Less is usually better.

The aim is a pace that feels like a person doing thoughtful sales work, not a mailbox sending hundreds of cold emails a day. Keep the ceiling at 10–15 new prospects per mailbox daily; do not keep ramping beyond 15. This is a ceiling, not a quota you must fill. If the lead list is weak or follow-ups are accumulating, send fewer.

First touches are only part of the workload. With three follow-ups, every new prospect can create four outbound messages over the life of a sequence. At a steady 15 new prospects a day, that could eventually mean roughly 60 daily outreach messages if everyone receives every touch—before warming and manual replies. Replies and opt-outs shorten sequences, but plan for the follow-up load rather than discovering it when the queue is full.

Keep separate counts for new prospects, automated follow-ups, warming messages, and manual replies, then review the combined total. Configure a shared mailbox budget across campaigns. Reduce new starts when follow-ups fill the available capacity, and always leave room to respond to interested prospects.

Spread sending through the working day. Avoid a catch-up burst after a weekend, pause, or reconnection. Gradually add healthy domains and prepared capacity as you find message-market fit instead of trying to squeeze hundreds of messages through each mailbox.

Keep three sets of limits in view: your internal campaign budget, the mailbox provider's quota, and any tenant-wide restriction. Google Workspace’s [sending limits](https://knowledge.workspace.google.com/admin/gmail/gmail-sending-limits-in-google-workspace) use rolling windows and vary by account and sending method. They are ceilings, not cold-outbound targets.

[Exchange Online limits](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits) apply at both user and tenant level. Adding mailboxes does not remove the tenant-wide constraint. Check the limits for your own account rather than relying on an old article or a reseller's advertised volume.

Review results by domain, mailbox, recipient provider, and prospect segment. Increase only when targeting, positive replies, and actual delivery support it. For reputation problems, follow the domain-wide pause procedure in [Rotating mailboxes](#rotating-mailboxes).

## Warming

> **tl;dr:** Use a reputable warming service and its recommended gradual ramp. Two to three weeks is an accelerated starting option; ideally give spare domains a few months before prospecting. Keep warming afterward.

Start warming all your prepared mailboxes, including the ones you do not need yet. Buying domains early gives you a pool that has already been warming when you want to expand or rest another domain.

Warming services typically exchange messages and replies between participating accounts. That activity is separate from real prospect outreach, so keep the reporting separate too. A warmup score helps you monitor the service's network; actual delivery and qualified prospect replies tell you how the sales campaign is doing.

Choose a service with a gradual ramp and sensible defaults. You do not need to tune every setting manually. The numbers below are reasonable fallback settings, not a reason to override a provider's working setup.

### Always keep warming

Our recommendation is to continue warming both fresh mailboxes and mailboxes already in use. A good reputation today does not guarantee good delivery tomorrow, so treat warming and monitoring as ongoing work rather than a one-time setup.

Some deliverability practitioners recommend against automated warming, while others continue to use it successfully. Our working approach is to keep it running and evaluate it against actual campaign performance. Revisit the setup if the service causes account warnings, unexpected traffic, or poorer results.

Keep warming traffic separate in your reporting. Review actual prospect replies, bounces, delivery errors, and stop requests by mailbox and recipient provider. Check the permissions a warming service requests, how it handles mailbox data, and how to disconnect it. Confirm that your use of the tool and outreach program fits your mailbox provider's terms.

Use the warming service's **content identifier** to recognize its messages before your sales automation processes them. Exclude them from lead creation, AI sales replies, prospect follow-up scheduling, and campaign reply metrics. Let the warming service handle its own exchanges. Check the filter whenever you connect a new service or inbox so a warming conversation cannot become a supposed sales opportunity.

Treat those messages like ordinary inbox conversations: leave them in the inbox, archive them, or delete them if needed. **Do not mark them as spam.** Filtering them out of your sales workflow is separate from how the warming service manages its activity.

If a blocklist identifies the warming activity itself as the reason for a listing, read its [recovery policy](#spam-traps-blocklists-and-recovery) before deciding what to do. More warming is not a universal remedy for a listed domain.

### For new mailboxes

After creating the mailboxes, check authentication and reply handling, then start the warming service's gradual ramp. Do this for reserve domains too rather than waiting until a live domain has a problem.

If you need to launch urgently, **two to three weeks** of warming is a reasonable accelerated starting point before very small prospect sends. Ideally, warm for **a few months** before putting the mailboxes into use. That longer runway is one reason we recommend buying extra domains at the beginning.

Use the service's recommended settings. If you need a concrete starting configuration:

- Start with about 1 warming email per day.
- Increase by roughly 2 per day, with small variations such as 2 ±2.
- Reach around 30 warming emails daily over roughly two weeks.
- Use an initial warming reply setting around 30–50%.

Reaching the daily warming target is not the same as finishing the preparation period. You can hold that level while the reserve domain continues warming for the remaining weeks or months. Check for problems across the pool as you go; investigate domains that develop poor placement or blocklist issues instead of assuming age alone makes them ready.

Before launching real outreach, send a test through the actual sequencing connection, confirm SPF/DKIM/DMARC, and reply back. Start prospecting at 1–2 new emails daily and build gradually. Count warming, first touches, follow-ups, and manual replies in the mailbox's overall activity.

### Randomization is important

We prefer small variations in daily warming volume while keeping the same general upward pattern. Instead of exactly 1, 3, 5, 7, 9, use a sequence such as 1, 2, 5, 6, 9. A daily increment of 2 ±2 is an easy starting configuration.

Vary the timing too, rather than sending the day's activity in one burst. Many warming tools handle this automatically and distribute activity across different receiving providers. Use these controls to maintain a reasonably paced schedule, not as a reason to push past provider limits or continue through errors.

For actual cold outreach, schedule around the prospect's working day and your team's ability to handle responses. Small timing changes are part of this playbook; they do not guarantee inbox placement. When a provider starts deferring messages, reduce the affected traffic instead of trying to solve the problem by changing the randomization settings.

If bounces or deferrals increase, reduce volume and investigate before continuing the ramp. If the issue is spam placement or domain reputation, pause outreach across the domain as described in [Rotating mailboxes](#rotating-mailboxes).

### After ramping up

After the initial ramp, keep warming. The service’s recommended defaults are usually fine; if you need numbers, 25–35 warming emails daily, a 30–40% reply setting, and randomized timing are sensible starting values.

**tl;dr:**

- Ongoing warming volume: 30 ±5 emails per day.
- Warming reply setting: 30–40%.

Keep these warming settings separate from your cold-outreach budget. As a sales sequence grows, yesterday's first touches create tomorrow's follow-ups. Review the combined queue before increasing prospect volume, and avoid catch-up bursts after an outage or pause.

Track changes to the prospect source, copy, sending application, and authentication setup. If spam-placement problems appear, pause new outreach and unanswered follow-ups across the domain while keeping existing conversations going. Continue warming as you investigate, subject to provider restrictions and the specific cause of any listing. Save representative errors and headers so you can compare results after the fix.

### Positive and negative actions

The most useful first-principles question is: **are people replying, or are they reporting you as spam?** We put a lot of weight on that contrast. Your job is to start relevant conversations and make answering easy, even when the answer is no. Authentication and sending behavior still matter, but they will not rescue outreach that repeatedly annoys the people receiving it.

A buildup of spam complaints can damage the whole domain. By the time placement visibly deteriorates, treat it as a reason to pause rather than trying to squeeze out another campaign.

Separate positive replies, objections, referrals, automated replies, and opt-outs in your reporting. A warming reply percentage and a qualified prospect response rate answer different questions. Neither should obscure a rise in delivery failures or complaints.

Make it easy for prospects to say no and honor that across every salesperson and sending tool. Remove queued follow-ups when someone opts out. An unsubscribe is useful feedback and can prevent another unwanted message from becoming a spam complaint.


## Content

> **tl;dr:** Personalize your message, vary the copy, keep the first email simple, and make it easy to reply or opt out.

The body of your email is where your targeting becomes a conversation. Start with a short, relevant pitch that sounds like you, then improve it from actual replies. The practical defaults below build on this guide's outbound experience; adapt them to your audience while meeting applicable sending rules.

### Personalize the messaging

**Prospecting and qualification matter more than personalization.** The right buyer with the problem you solve can respond to a fairly ordinary email. A beautifully researched message about a shared college or hobby will not turn the wrong person into a buyer.

Our rule of thumb is to spend **80% of the effort on the lead list** and a much smaller share polishing individual messages. Find the exact companies and people for whom the offer makes sense. Personalization should make that fit clear, not decorate a weak list.

That does not mean sending “Hi {firstName}” above the same generic pitch to everyone. Use AI to research the person's role, the company, and the problem they may be dealing with. Then write about the problem you can help solve. Keep observations accurate and avoid pretending you know more about their situation than you do.

Write the first emails manually. Read the replies yourself and adjust the proposition until you see early signs of message-market fit. Then give a frontier AI model the successful examples and ask it to write similar, individually relevant emails. Automating a working pitch is much more useful than producing thousands of variations of an untested one.

Use judgment to decide when the message is working well enough to expand. The quality of the replies and the conversations they start matters more than reaching a prescribed sample size or reply threshold. Read what people actually say, then grow gradually when the fit feels right.

Keep the structure simple: why this person, the problem or opportunity, what you can do, and an easy question. Use **plain text, ideally no links**. For example:

> Hi Alex — your careers page lists two platform-engineering roles focused on deployment tooling. We help infrastructure teams standardize release approvals across repositories. Would a short outline of the approach be useful?

Use an observation like that only when it is true. Review generated copy for invented customers, numbers, responsibilities, and familiarity. Omit uncertain personalization rather than sending a broken merge field or an impressive-sounding guess.

### Randomize the body content

There are two useful approaches, and both belong in the toolkit.

**Spintax is the older approach.** You write several versions of a phrase and let the sending tool choose between them. It was commonly used to make a campaign less repetitive and less obviously templated. For example, a question might vary between “Would a short outline be useful?” and “Is this something your team is looking at?” Review every combination for grammar and meaning.

**AI-written individual emails are our preferred approach now.** As token costs come down, it becomes practical to write a fresh email for each qualified prospect. Give the model a rough structure, examples of messages that have worked, accurate prospect research, and clear constraints: plain text, short, relevant, and no invented claims.

Keep the underlying proposition consistent while varying the opening observation, relevant example, and question. The point is to express the same useful offer in a way that fits the prospect, not to change random words until the text looks different.

Save the actual message sent, review samples, and compare qualified replies across audience segments. For deliberate experiments, change one important variable at a time, such as the problem you lead with or the offer. Compare similarly qualified prospects and spread variants across comparable senders and sending windows; a healthier domain or a better list should not get mistaken for better copy.

Let the planned follow-ups run before comparing outcomes. One positive reply versus two is a reason to read the conversations, not proof of a winning template. Use judgment rather than a universal minimum sample or numerical trigger for scaling. Keep sender identity, opt-out handling, and required disclosures consistent regardless of how the body is generated.

### What not to include

Remove anything you cannot defend: invented results, fake referrals, disguised identity, misleading scarcity, private customer information, and a claim that you previously spoke when you did not. Keep the first message focused enough that a recipient can decide whether the topic is relevant without opening several resources.

Use plain text for the first cold email: no designed layout, ideally no links, and no images or attachments. The simpler the better. Share richer material later when the prospect is interested and it helps the conversation.

#### Spammy words

Write concrete claims and qualify them honestly. “We reduced deployment approval time in this documented case study” is stronger than “guaranteed risk-free results,” provided the case study exists and matches the claim. Avoid shouting, excessive punctuation, and fake urgency because they make an unsolicited pitch harder to trust.

A content checker can help catch overhyped phrases before sending. Use it as an editing aid alongside a human review of tone, claims, and relevance. Keep normal sentence case, limit exclamation marks, and avoid wording that makes an ordinary sales offer sound like a scam. Review the sender identity, destination links, audience, and complaints as well as copy. The FTC specifically prohibits misleading subjects and headers in US commercial email, including B2B messages.

#### Images

Keep images out of the first cold email. A relevant screenshot can be useful later when it explains a concrete observation. Keep the pitch understandable with images disabled, and avoid an image-only message. Do not insert a personalized screenshot that exposes another customer's data or implies access you do not have.

Give informative images useful alternative text and decorative images an empty `alt=""`; keep essential claims in real text. The message should still make sense when the images do not load. Check mobile rendering, enlarged text, and dark mode; use semantic structure and descriptive links.

Changing a tracking pixel's dimensions does not turn it into a non-tracking image or solve privacy obligations. Decide whether tracking is needed separately from whether a screenshot is useful.

#### Links

Ideally, include no sales links in the first email and ask for a reply instead. When a link is useful, put it on the same outbound domain as the sender and redirect it to the right page on your company website. Keep any required unsubscribe mechanism. Check the certificate, redirect, and destination from the actual received message; your sending tool may rewrite the URL.

If the first call to action is simply a reply, a calendar link may be unnecessary until the prospect expresses interest. Do not publish their name, email address, or employer in a personalized URL slug just to measure engagement. Use an opaque identifier when an identifier is necessary, and apply an appropriate retention policy.

Click-tracking systems can rewrite links through a redirect service; that introduces another destination to test and maintain. A branded tracking domain improves recognizability but does not guarantee trust or inbox placement.

#### Attachments

As a practical default, do not attach a deck or proposal to a first cold approach. Describe the relevant idea and offer the material. After a prospect requests it, provide the expected file or a clearly identified secure download. Scan files, use descriptive filenames, and keep their contents consistent with your claims.

An unsolicited calendar invitation is also an imposition on a prospect's workflow. Agree on interest and a time before sending an invite. Never use executable files, credential requests, or misleading document names to induce engagement.

### Keep markup similar to human emails

Use plain text and keep the email close to an ordinary business message: modest spacing, a short signature, and no decorative template. If your sending tool wraps that text in HTML, keep the markup minimal and inspect what it actually sends. If you quote a real earlier message, preserve it accurately; start a new conversation honestly rather than inventing reply history.

Use a mail library or the sending tool's editor to generate valid messages. Review both text and HTML versions, international characters, signature, link destinations, and opt-out rendering. Send an actual test through the same connection used by the campaign. A preview cannot reveal every change a sending platform makes after submission.

Keep a consistent real sender name and a monitored reply address. A prospect who replies should reach the person or team represented in the message. Avoid elaborate signatures that overwhelm a short pitch, while retaining required identity and contact details.

### Opt-out and unsubscribe

Our preference is a simple reply-based opt-out: **“If this isn’t relevant, reply and I’ll stop contacting you.”** It keeps the message conversational and gives an uninterested prospect an easy alternative to reporting spam. Honor that promise promptly.

We do not add a newsletter-style unsubscribe footer by default to a personal sales message. Where the sending program or applicable rules require a link or one-click mechanism, include it; the presence or absence of a link alone does not decide how a message is classified. Keep any required link clear and usable without an account login.

Stop the cold sequence when a person replies, then classify the response. A positive reply goes to the account owner; a clear rejection or opt-out stops contact. A request to reconnect later belongs in the [postponement workflow](#postponed-conversations), not the rejection bucket. An out-of-office response should trigger the pause-and-return workflow in [Scheduling](#scheduling), not count as a qualified reply. Support plain-language requests, including “remove me,” and define how account-wide requests such as “stop emailing our team” are handled.

Synchronize suppression across the CRM, sequencing tool, manual outreach workflow, agents, and alternate mailboxes. Check it again immediately before dispatch, not only when importing a prospect. An agency handoff or a fresh data-vendor export must not revive a suppressed contact. Preserve the scope, date, and source of the request with appropriate access and retention controls.

Provider requirements can exceed legal minimums. Gmail requires compliant one-click unsubscribe for applicable bulk marketing traffic; a body link or reply-based opt-out alone is not the RFC 8058 mechanism. Whether a campaign is called “sales” does not by itself exempt it from marketing rules.

If your sending program needs one-click unsubscribe, confirm that the sales platform can supply these headers and process the request:

```text
List-Unsubscribe: <https://examplehq.com/unsubscribe/OPAQUE_TOKEN>
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

**Leave open tracking off by default.** Replies, meaningful clicks when you include a link, and actual sales conversations usually tell you more. Do not add links just to create something to measure.

A tracking pixel may come with a deliverability cost, but including one is not the end of the world. If the information will genuinely change a decision, use your judgment about whether that tradeoff is worthwhile. We generally prefer the signals prospects give through their actions over a dashboard full of apparent opens.

Open tracking records an image request. Apple Mail Privacy Protection may fetch and cache the image without a person reading the email, including for Gmail or business accounts read in Apple Mail. Image blocking can hide real reading. Never send “I saw you opened my email” based on this signal, and do not accelerate a sequence just because the pixel fired.

Clicks can also come from security scanners. If your tool flags automated activity, use that information, but do not assume every unflagged click came from a person. Check patterns such as every link being visited seconds after acceptance; avoid automatically classifying those prospects as interested.

Choose tracking settings by campaign and jurisdiction, minimize collected data, and document retention. Permission to send a message and permission to track the recipient are separate questions. Do not assume an exemption for measuring a requested service also covers tracking cold prospects.

If you keep pixels enabled, use the results as supporting context rather than the main measure of success. Turning them off does not solve a targeting or reputation problem. Judge the campaign by qualified responses and conversations, with tracking privacy requirements resolved separately.

## Audience

This is where we would spend about **80% of the effort**. Qualification comes before clever copy: find the buyer who has the problem you solve, and the message becomes much easier to write.

Build the smallest useful list for a specific sales hypothesis. Keep a record of why each account and role fit, where contact data came from, when it was checked, and what rules permit contact. Exclude existing opt-outs and contacts already handled by another workflow where additional outreach would conflict. An open opportunity at a company does not automatically exclude every other relevant person there; coordinate those conversations through a shared account history.

### Targeting

Define the account criteria before collecting addresses: business model, geography, relevant technology or process, company stage, and an observable problem your product addresses. Then identify the role likely to own that problem. A senior title alone is not a targeting strategy.

Use your best existing customers as a starting point. AI can help identify the characteristics they share, find lookalike companies, and research the right role within each one. Give it the reason those customers bought and the problem you solved, not just a list of logos. Review the resulting accounts and people before putting them into a sequence.

Use one accountable owner per account and a shared contact history. Set documented contact and account caps across all sales tools; choose them for the audience and program rather than adopting a claimed universally safe number. Review small cohorts manually before expanding them. When replies repeatedly say “wrong person,” fix the role selection instead of sending more follow-ups.

**One person engaging is not a reason to stop talking to everyone else at the company.** Multiple relevant relationships give you more ways to understand the problem and keep an opportunity moving, especially when someone drops out. Keep each conversation useful and aware of the others. As the deal reaches buying readiness, bring people together: “I'm discussing this with your colleague; shall we include everyone in the same conversation?” Adjust the next message to the account's situation rather than applying an automatic account-wide stop.

Treat a data vendor as a source of leads, not a substitute for knowing your audience. Check where the records came from, how fresh they are, and whether the people match your target profile. A list that is technically valid can still produce poor replies and complaints. Check the rules that apply to your campaign before sending.

#### Buying intent

Treat an intent signal as a hypothesis to validate. A public hiring announcement, new office, or relevant request for suppliers may establish business context; it does not prove the company wants your product or that a named employee requested contact. Store the signal's source, date, and interpretation separately.

For third-party intent data, ask what was observed, whether it is account-level or person-level, how recently, and how the supplier obtained it. Do not state that an individual visited a page based on an account-level inference, pixel, or scanner click. Avoid sensitive or personal profiling in a business pitch.

Use AI to connect these signals with patterns in your existing customers: similar companies, similar roles, and a similar reason to need the product now. Treat the result as a prioritized research list, then confirm the fit.

Compare intent-selected accounts against otherwise comparable accounts using positive replies and qualified opportunities. If the signal only produces more addresses and complaints, it is not improving the program. Do not confuse “in market,” address validity, and permission: they are three different assessments.

#### Email verification

We like tools such as [Hunter](https://hunter.io/) for finding and checking business email addresses. Start with an address the person or company has actually published: search their website, professional profiles, and public social posts. Prefer that direct evidence over a guess, and check that it is still relevant to their current role.

Patterns are useful when a published address is unavailable. If you know other real addresses at the company, you can infer a candidate such as `first.last@company.com`, then verify it. Keep an inferred result distinguishable from an address found in a public source.

MX verification is a useful baseline, but it only tells you about the domain’s mail configuration. It does not confirm the individual inbox. Use address-level verification and source information together rather than treating any single score as certainty.

Verification reduces avoidable addressing errors; it does not prove inbox placement, interest, or consent. Keep valid, invalid, accept-all, and unknown results separate. Recheck stale records before a new campaign, but do not repeatedly probe or mail unknown addresses to force a verdict.

**Put catch-all and unknown addresses at the bottom of the list.** Work through well-qualified, verified prospects first. If you run out of stronger leads, you can revisit those uncertain addresses; additional research or a current public source supporting the exact address can also move one up the list. They are optional prospects, not automatically unusable. Keep the verification status and supporting source visible, and review their results separately instead of relabeling them as verified.

Check syntax and domain configuration with a maintained parser. A missing MX can fall back to address records; `MX 0 .` explicitly says the domain accepts no email. A DNS timeout is not proof that a domain is nonexistent.

Offer typo corrections for confirmation rather than silently changing the recipient. Do not universally strip dots or `+tags`; even Google's own dot-equivalence behavior differs between consumer Gmail and organizational domains. Check international-address support in the sending platform instead of declaring all non-ASCII addresses invalid.

Preserve full bounce diagnostics. `550 5.1.1` indicates an invalid destination mailbox, while `550 5.7.1` indicates an authorization or policy refusal. Both are permanent failures for the attempt, but only the former establishes that particular mailbox problem. Suppress confirmed invalid addresses and investigate policy failures without marking the entire prospect list invalid.

### Scheduling

> **tl;dr:** Send an initial cold email followed by three follow-ups, spaced 3–4 days apart. A real reply ends that sequence and starts a contextual conversation: answer interested prospects within an hour where possible, respect requested delays, and wait until people return from leave.

Three follow-ups is our default. In our analysis across FirstQuadrant customers, two left opportunities behind: the third still brought replies from people who had not answered earlier. A fourth generally felt like too much. This is why we prefer three follow-ups rather than either giving up after two or extending a sequence indefinitely.

Leave **3–4 days between each email** and move sends into the next suitable local working window when needed. For example, choose three or four days after the previous touch, then skip a weekend or public holiday if that is your campaign's setting. A delay should move later touches too, not cause them to bunch together.

Give each follow-up a reason to exist: a useful clarification, a relevant example, or a simpler question. Keep it in the existing thread where appropriate. Do not turn three follow-ups into three copies of “bumping this.”

You can also coordinate a multichannel campaign: an email, a LinkedIn connection request, a LinkedIn message, and later emails. Keep one shared contact history and account owner. A reply on LinkedIn should stop an inappropriate automated email follow-up just as a reply by email would. Count the combined pressure across channels rather than treating each channel as a separate unlimited sequence.

Automatic responses—including out-of-office messages and bounce notifications—are not human replies. Do not count them toward the reply rate or treat them as buying interest. A real answer stops the original cold sequence and moves the conversation to its owner, who decides the appropriate reply and follow-up plan.

Check reply state, suppression, domain status, ownership, and contact caps immediately before every send. If a domain is paused for reputation problems, stop the scheduled follow-ups to prospects who have never replied, while continuing existing conversations from their original inboxes. Once that same domain is healthy again, recheck eligibility and resume the remaining sequence gently. An opt-out stays suppressed even after the domain recovers.

#### Interested replies and follow-ups

**Answer interested prospects as soon as possible; aim for within an hour.** Give them the information they asked for and make the next step easy. Answer the question first, then offer a call: “Happy to go through this on a call if useful.” Offer straightforward scheduling when they are ready. Do not let a good lead disappear into an unmonitored reply inbox.

If they stop replying after your answer, keep following up about that conversation. Use a gentler cadence than the cold sequence: weekly is a reasonable starting point, while 3–4 days can also fit an active discussion. Refer to the question, information, or next step you discussed instead of restarting the original pitch. Give the conversation a clear owner and a considered follow-up plan.

Recheck the context before a scheduled message goes out. If a meeting is already booked, replace “Would you like to book a call?” with an appropriate next step, or cancel it if there is nothing useful to add. If a teammate takes over, let that person own the response and remove competing automation. Another colleague at the prospect's company engaging is useful context, not an automatic reason to end every other conversation. Bring those threads together when the opportunity reaches buying readiness.

#### Postponed conversations

“Not now” is different from “not interested.” A simple LLM prompt can turn the prospect's reply into structured information: the reason for the delay, the appropriate follow-up date, and the wording that supports it. Give the model the original reply, the date it arrived, the current date, and the recipient's timezone so relative requests such as “next quarter” have context. If no date can reasonably be determined, flag the case for the owner instead of inventing a precise commitment.

Confirm the timing where appropriate, stop the ordinary nudges, and create the future action. Record who owns it, why it exists, and whether it is an internal reminder or an email scheduled to send. When that date arrives, use the conversation history and current account context to write the message. Do not layer generic follow-ups on top of an existing reminder.

For a delay of several months, **one interim update can be worthwhile only when both conditions hold**:

- You have a major update that addresses something the prospect cares about or removes a blocker they discussed.
- They postponed for budget, business timing, or a similar reason while continuing their normal work; they are not away on leave.

For example, halfway through an agreed three-month wait: “I know we're reconnecting when next quarter starts, but we just released the approval workflow you asked about and I wanted to flag it.” Keep the agreed follow-up date. This is one relevant update, not a new sequence of nudges.

#### Out-of-office replies

Set up an **out-of-office automation**. When the reply gives a clear return date, pause the sequence and schedule the next follow-up after the person is back, during their local working hours. If the date is missing or ambiguous, send the contact for review. **Send no interim nudges during a holiday, maternity leave, or other absence**, even if you have a product update. Resume with a personalized welcome-back message: “Hope your vacation was good” if they mentioned a vacation, or simply “Welcome back” otherwise. Keep this within the remaining planned sequence rather than adding an unlimited extra round of follow-ups.

Out-of-office replies often name someone in a similar role. If that colleague is a relevant buyer, reach out: it gives you a warmer opening than approaching someone without context. Verify their role and address, and check whether your team is already contacting them before creating another sequence. An alternate for urgent matters is not automatically the person responsible for your topic.

**Describe the referral accurately:** “I emailed Sarah, and her out-of-office message listed you as an alternate contact.” Then explain why the topic is relevant to them. Do not say “Sarah introduced us” or “Sarah recommended I contact you” unless she actually did. We have had the original contact return and point out that they never made an introduction; precise wording avoids that mistake while keeping the useful context. Coordinate the new conversation with the original person's eventual return, rather than blindly sending duplicate pitches.

#### Automating reply handling

Start with **everything in manual review**, then gradually move reliable situations into autopilot. Keep high-value conversations, especially positive replies, more hands-on. Routine out-of-office handling and clear negative replies can become automatic sooner. Automatic handling may mean pausing a sequence, scheduling a future action, or stopping contact; it does not always call for another email.

If the AI cannot answer a question, give the owner a task to supply the missing information. Save the answer as reusable knowledge for future responses. Review ambiguous classifications, especially the difference between a rejection, a request to reconnect later, and a genuine opt-out. Keep warming messages out of this workflow using the service's content identifier.

Test the safeguards rather than trusting an “automatic protection” switch. Know each rule's trigger, minimum sample size, time window, and scope. A bounce rule that only starts checking after many sends may react too late for a small campaign. Review early results yourself, and test reply and opt-out handling with inboxes you control, including a reply arriving just before the next scheduled touch.

Confirm that a domain pause reaches every connected campaign and removes the appropriate queued follow-ups. Some tools' soft-stop controls prevent new sequences but finish ones already started; that does not implement this guide's domain pause. Keep these controls distinct: a snoozed task returns for review, a scheduled email sends later, a human takeover removes competing automation, and an opt-out remains suppressed. Check that each one does what your team expects.

#### Days and timezones

Send in the **recipient's timezone**. Around **9:30 a.m. local time** is a useful starting point: the prospect is beginning their working day and checking email. Use a sensible window around it rather than scheduling every mailbox to fire at exactly the same minute.

Our default is working days, skipping local weekends and public holidays. The exact weekday matters less than the audience, product, and relationship. Holiday sending can sometimes work because fewer other people are sending, but we would treat that as a deliberate experiment rather than the default.

Use timezone-aware scheduling so daylight-saving changes are handled properly. Do not infer the prospect's location from an open-tracking IP. If their timezone is uncertain, use the best business-location information you have and keep the assumption visible to the team.

Apply the same local-time rules to follow-ups and out-of-office restarts. Consider whether someone on your team can respond when the campaign starts generating replies. Measure useful conversations, not just apparent opens, when comparing send windows.

#### Randomization

Randomize send times within your chosen business-hours window rather than releasing every queued prospect at the same minute. Modest jitter also smooths load and avoids synchronized batches. Preserve follow-up spacing and account caps while doing this; randomization should not produce extra touches or push sends outside the recipient's window.

If a receiving provider temporarily defers traffic, let the sending system follow its retry policy and reduce the affected campaign where appropriate. Do not resubmit every deferred message from the sequencing application while the provider is already retrying it. Keep a durable business-event identifier so a restarted worker cannot silently schedule the same touch twice.

## Metrics

**Optimize for positive, qualified replies.** An automatic out-of-office message, bounce notification, or a stream of “remove me” responses should not make a campaign look successful. Classify replies before calculating the metric.

Measure the path from valid attempt to useful sales conversation. An ESP’s “delivered” status normally means the recipient server accepted the message, not that it reached the inbox.

| Metric | Suggested definition or interpretation |
| --- | --- |
| Unique prospects contacted | Distinct people receiving an attempted first touch in the cohort |
| Accounts contacted | Distinct companies reached; reveals account saturation hidden by mailbox totals |
| Acceptance rate | Recipient-message pairs accepted divided by pairs attempted; exclude intentionally suppressed records |
| Invalid-address rate | Confirmed invalid-address failures divided by attempted recipient-message pairs |
| Policy rejections and deferrals | Separate categories by receiving provider and diagnostic reason |
| Human reply rate | Distinct prospects giving a human response divided by prospects contacted; exclude warming traffic, out-of-office, bounce, and other automatic messages |
| Positive reply rate | Distinct prospects expressing relevant, qualified interest divided by prospects contacted; make this the main reply metric and document the classification |
| Qualified meetings held | Meetings that occurred and met written qualification criteria; report booked meetings separately |
| Opportunities and pipeline | Sales outcomes attributed to the cohort using a stated observation window |
| Opt-outs, negative replies, complaints | Counts and rates; signals that can require stopping or retargeting |

For example, 10 positive replies among 500 contacted prospects is 2%, even if 40 people replied overall. Dividing positive replies by all replies answers a different question. Show denominators, cohort dates, and counts; do not compare a mature sequence with a first-day cohort whose replies have not arrived yet.

Break down results by audience segment, acquisition source, sender, domain, receiving provider, sequence step, and copy variant. Count unique people and accounts alongside messages. More follow-ups can inflate total replies while wasting contacts or harming reputation; compare incremental useful outcomes and negative responses at each step.

Complaint visibility is incomplete. Gmail complaints will not necessarily appear as individual events in your sequencing tool; check Google Postmaster Tools as well. Zero complaints in a sequencing dashboard is therefore not proof of zero complaints. Keep provider-defined rates distinct from your own formulas.

Before expanding a campaign, review its positive outcomes, negative signals, address quality, and provider-level failures together. If spam placement deteriorates, pause new outreach and unanswered follow-ups across the domain, keep existing conversations going, and investigate before allocating more traffic.

### Testing inbox placement

**Run a cross-provider placement test every few weeks and whenever you change the sending setup.** Many warming services offer a spam-test product: you send an email to their test addresses across receiving providers, and they report placement and a score. Use these alongside tests to Google and Microsoft inboxes you control.

Send through the actual tool, connection, and configuration used by the campaign. Check the final received message's SPF, DKIM, and DMARC results, formatting, links, and reply behavior. Repeat after changes to authentication, providers, sequencing tools, signatures, or tracking. If Google accepts a message and Microsoft rejects it, compare the full error and raw message headers before assuming the DNS records are wrong. A sending tool or gateway can change the message after your editor preview, and a DNS checker cannot inspect those changes.

Save the results and configuration so the next test has a useful baseline. Scores and seed placement are diagnostic signals, not a promise of how every real prospect will receive your email. Passing authentication and a clean blocklist check also do not guarantee inbox placement; compare tests with actual prospect replies and provider errors.

### Message logs and troubleshooting

**Keep detailed logs from the beginning. In this business, more useful history is better than less.** You need to reconstruct an individual conversation when something goes wrong and analyze patterns across campaigns later. Authentication and DMARC problems are only one reason to keep that history.

| Record | What to retain |
| --- | --- |
| Message and conversation | Message ID, provider message ID, thread or conversation ID, and reply-reference headers where available |
| Sending context | Sender, recipient, domain, mailbox, campaign, sequence step, and the actual message sent |
| Timing and delivery | Scheduled and actual send times with timezone, acceptance, deferrals, retries, bounces, and full provider responses |
| Authentication and placement | Received headers, SPF/DKIM/DMARC results, available DMARC reports, placement-test results, and the configuration tested |
| Workflow decisions | Reply classification, owner, suppression state, pause or reschedule reason, requested future date, and automated or manual actions taken |

Keep the identifiers that connect events across the mailbox provider, sequencer, and CRM. An internal thread ID alone may not help a provider trace a message; retain the email's Message-ID and the provider's own identifier as well. Make the history searchable by contact, domain, campaign, and message, with access and retention appropriate to the customer data it contains.

When an engaged prospect says an expected email never arrived, collect its identifiers, addresses, send time, headers, and any error response for your provider's support team. The prospect's administrator may also be able to check quarantine, routing, or message traces. Do not repeatedly resend while the original attempt's state is unclear. Use the same event history for later analytics so a dashboard result can be traced back to what actually happened.

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

**Recovery depends on the specific listing.** Read its removal policy before assuming a few weeks of rest will fix it. Some lists retain historical observations. For example, [Heatwave's listing policy](https://lookup.validity.tools/listing-policy) treats a confirmed synthetic-warming observation as permanent: stopping the activity or changing sending practices does not erase it, while a review can remove an erroneous finding. Continuing to warm will not clear that entry either. Receivers decide how to use the signal; a listing does not mean every provider blocks the domain.

Distinguish improving actual delivery from clearing a particular blocklist entry. Check whether the warming activity itself caused the listing and what, if any, recovery route the operator offers. If a valid entry has no removal path and receivers you need are filtering on it, do not keep treating the domain as a ready reserve merely because time has passed. Review its future use against actual delivery and the operator's policy.

Treat a suspected spam-trap issue as a reason to examine data provenance, stale contacts, imports, and verification handling. An address vendor's “valid” label cannot tell you that a person wants your message. If you use shared infrastructure, preserve the evidence and involve the mailbox provider; you may not control the listed IP.

Our recovery checklist:

1. Identify the affected mailbox, domain, recipient provider, and sequence.
2. For a reputation problem, pause new outreach and unanswered follow-ups across the affected domain. Keep existing conversations on their original mailboxes and preserve all opt-outs.
3. Compare the last healthy cohort with the first unhealthy one: list source, copy, links, volume, authentication, and tool configuration.
4. Fix the cause and follow the provider or blocklist operator's process where required.
5. Keep warming where permitted and appropriate to the diagnosed issue, then reassess after a few weeks. Follow the specific listing policy rather than assuming rest or warming clears it. When delivery improves and the cause is corrected, test the repaired setup and resume eligible campaigns on that same domain with a small, closely watched cohort. Keep missed touches from bunching together.
6. Record the change and review actual prospect delivery, replies, and meetings before scaling again.

### A weekly sales-deliverability review

Review delivery and commercial results together. For each active domain and mailbox, record volume, first touches versus follow-ups, failed addresses, provider-specific errors, stop requests, human replies, positive replies, meetings booked, and meetings held. Review account-level contact pressure too: several individually modest sequences can still overwhelm one company.

Assign an owner to each problem and decide whether to continue, adjust targeting or copy, reduce volume, or pause. Keep a change log with cohort dates so you can learn from experience instead of repeatedly changing several variables and guessing which mattered.

Review interested replies that have not been answered and conversations with no next action. Every postponed prospect should have an owner, a reason, and a clear date or review task. Check that upcoming messages still fit the latest email, meeting, and account context, and that warming traffic has stayed out of lead processing and sales metrics. Use the message logs to investigate gaps instead of guessing from a summary score.

## 📄 License

This work is licensed under a [Creative Commons Attribution Share Alike 4.0 International](./LICENSE) by Anand Chowdhary.
