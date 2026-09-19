# Author decisions for the outbound guide

This is the maintained record of accepted advice, not a publication checklist or a list of universal receiver rules. It preserves the author's judgment across sessions. Read the relevant topic when editing; the public explanation lives in `README.md`. New explicit author instructions supersede these entries and should be recorded here.

## Purpose and voice

- Exclusively outbound sales cold email. No newsletter, broadcast-marketing, or general transactional-email expansion. Transactional volume appears only to explain the large-company primary-domain exception.
- The original introduction/README and experience building FirstQuadrant are the foundation. Research should inform and extend that experience, not require public proof for every judgment.
- No routine citations or dates in published prose. Useful setup/tool links and important rule links are exceptions. Keep sources and verification history separately.
- Ask before removing sections, changing direction, or reversing accepted strategy. The author prefers forward progress on already-approved work and periodic commits/pushes for rendered-site review.

## Domains and mailboxes

- Use separate branded `.com` domains. Divide volume and maintain reserves rather than depending on one domain. Avoid subdomains, especially under the primary domain, because reputation may be associated with the root.
- Start by buying ten domains and warming their mailboxes. Keep three backup mailboxes per five active ones, distributed across independent domains. A spare mailbox on a damaged domain is not equivalent to a separate reserve domain.
- Huge established companies with very high healthy transactional volume can consider using their primary domain. Outbound below roughly 1% of that volume is the author's scale heuristic, not a provider guarantee. Stripe/Ramp illustrate scale, not verified claims about those companies' actual sending practices.
- Use real send-and-receive inboxes, consistent identity, and sensible address permutations such as first name, first.last, or first initial.last. An alias is not independent sending capacity. Do not use a separate Reply-To.
- Sender, inbox, and any email links should use the same outbound domain. Redirect it to the main site with HTTPS and sensible paths; optional UTM labels help identify traffic. First cold emails should ideally have no links.
- Workspace is the default; Microsoft 365 is the main alternative. “Don't use Zoho” is the author's rule of thumb. Provider matching by recipient MX is an experience-based preference; uncertain security-gateway MX results should remain unclassified.
- A real public profile photo is useful; a BIMI logo is usually unnecessary. A Google account can use an existing non-Gmail address, but do not promise its avatar appears in every recipient's client.
- Move DMARC from none to quarantine to reject once legitimate sending is proven. Reject is welcome when the setup is correct.
- Prewarmed domains are only an urgent-launch fallback. Prefer owned branded domains; unrelated stock domains confuse recipients and can feel phishy even when technically warmed. Check ownership, DNS/recovery control, prior history, portability, cancellation, and continued receipt of replies. Do not promise purchased infrastructure guarantees immediate inbox placement.

## Volume, warming, and domain recovery

- Start real outreach at 1–2 new prospects per mailbox daily; gradually approach a ceiling of 10–15. Less is better; never turn this into hundreds of cold emails per mailbox. Follow-ups, warming, and real replies consume capacity too. At steady state, 15 new prospects × four touches can mean about 60 outreach messages before other traffic.
- Use a good warming service's default gradual ramp. Two to three weeks is an urgent option; ideally allow a few months. Warm reserves before they are needed and keep warming active mailboxes.
- Preserve the concrete fallback: about one warming email initially, increase roughly two per day with ±2 variation to around 30 over roughly two weeks; initial reply setting 30–50%. Ongoing fallback: 25–35 warming messages/day with 30–40% replies and randomized timing. These settings do not replace the longer preparation period.
- Use the warming service's content identifier to exclude its messages from lead creation, sales AI replies, prospect scheduling, and sales metrics. Leave the warming service to handle its exchanges. Inbox, archive, or deletion is fine; do not mark warming emails as spam.
- Reputation problems call for a **domain-wide pause**: no new first touches and no scheduled follow-ups to prospects who have never replied. Continue genuine existing conversations using the original mailbox/thread.
- Preserve sequence position and opt-outs. Investigate the cause; keep warming subject to provider restrictions and the diagnosed issue. After recovery, resume eligible unanswered sequences from the same domain gently, without a catch-up burst. Use healthy reserves for new prospects; do not shift active threads or repeatedly pursue the same prospect from new senders.
- Healthy domains can share new-prospect allocation periodically. Rotation is not a way to ignore complaints or keep a broken campaign running.
- Approved recovery exception: check the specific listing's policy. Heatwave retains confirmed synthetic-warming observations; rest, changed practices, or more warming do not erase them. Erroneous attribution can be reviewed. Receiver use is discretionary, not universal. Separate actual delivery recovery from removal of a historical listing and evaluate future use accordingly.

## Qualification, copy, and measurement

- Spend about 80% of the effort on the lead list. Right buyer plus the right problem matters more than shared-college or other superficial personalization.
- Research role, company, and present problem. Write early emails manually; when the message feels right, use a frontier AI model to generate individual plain-text messages following a loose successful structure. Retain spintax as an older option, with AI-written individual copy preferred now.
- Scale based on judgment and the quality of replies/conversations. Do not invent a minimum sample, number of positive replies, or statistical threshold. Controlled comparisons still help: change one meaningful element, compare similar prospects/senders/windows, and don't call one reply versus two decisive.
- Keep the first email simple: plain text, ideally no links, images, or attachments. Answer requests with appropriate material later.
- Replies versus spam complaints are central practical signals, not literally the only technical factors. Make opting out easy, usually by reply. Don't claim link presence alone makes a message a newsletter or removes legal/provider requirements. Keep required unsubscribe mechanisms where applicable.
- Open tracking off by default. Pixels may carry a cost, but are not absolutely forbidden; use judgment. Prefer qualified human replies and useful downstream behavior; scanner clicks and automatic responses are not interest.
- AI lookalikes of existing customers and role research are useful. Coordinate email and LinkedIn history and promises.
- Multiple relevant contacts within one company are encouraged; one reply should not automatically pause the whole account. Keep shared ownership/context and avoid competing duplicate sequences. At buying readiness, bring colleagues into the same conversation; even late opportunities can fall through.
- Hunter and public primary sources are good ways to find addresses. Patterns are a fallback, MX checks are only domain-level. Catch-all/unknown addresses go to the bottom of the list: revisit when stronger leads run out or supporting research improves confidence. They are not automatically unusable or secretly verified.
- Qualified positive replies are the main reply metric. Exclude bounces, OOO, warming, and automatic replies. Distinguish booked meetings from meetings held and define denominators.

## Timing, replies, and automation

- Initial cold sequence: three follow-ups, 3–4 days apart. The author's FirstQuadrant analysis found two insufficient and a fourth generally excessive. Do not import archived product defaults of 3/5/8-day intervals or unlimited follow-ups.
- Use recipient-local working hours, around 9:30 a.m. as a starting point. Working days and skipping local public holidays are the default; holiday experiments depend on the audience and relationship.
- A human reply ends the initial cold sequence, not the relationship. Answer interested prospects as soon as possible, aiming for within one hour. Give the requested information, then offer a call and make scheduling easy. Keep ownership clear so a replying lead is not forgotten.
- If a conversation goes quiet after the answer, follow up contextually with a gentler cadence: weekly is sensible, 3–4 days can also fit. The author has not set a separate fixed follow-up count for these conversations; do not invent one or restart the original pitch.
- A simple LLM prompt can extract a future follow-up date into structured data from a postponement reply. Include the relevant date/time context. Record the request and distinguish an internal reminder from an automatically scheduled email. Ambiguous timing still needs judgment.
- During a months-long business delay, **one interim email is allowed only if both conditions hold**: a major update addresses something the prospect cares about/removes a blocker, and they postponed for budget/timing or a similar business reason while still working normally. Acknowledge the agreed timing. No generic nudges or repeated interim updates.
- During vacation, maternity leave, or another absence: no interim nudges, including product updates. Pause until return, then use a personalized welcome-back message. Do not invent vacation details. Missing return dates need review.
- OOO referrals are a useful warmer opening if the alternate is a relevant buyer. Verify role/address and check duplicate outreach. Say the OOO message named them; do not imply a personal introduction or recommendation that never happened. The author has been challenged by the original contact over this exact misrepresentation.
- Adjust future messages when meetings, handoffs, or account conversations change. Don't ask someone to book a call already booked. Personalize the next action rather than applying blanket stops. Coordinate late-stage stakeholders when they are ready to buy.
- Start all AI reply handling in manual mode. Gradually automate reliable categories. Keep positive/high-value replies more hands-on; routine OOO and clear negative handling can become automatic sooner. Sometimes the right automatic action is no outgoing message.
- Unknown answers should create a human task; save the supplied answer as reusable knowledge. An opt-out is not an objection for AI to overcome.
- Test automatic safeguards: sample gates, trigger/window/scope, cross-campaign domain pauses, queued messages, and last-minute replies/opt-outs. A tool's soft-stop may keep unanswered follow-ups running, which does not implement our domain pause.

## Diagnostics and operating review

- Keep extensive useful logs from the beginning: message IDs, provider IDs, thread IDs/reply references, context, actual messages, scheduled/sent timestamps, delivery and retry events, full errors, authentication/DMARC results, and workflow decisions. Connect events across systems for troubleshooting and later analytics.
- For missing expected messages, use that evidence with provider support and, when appropriate, an engaged prospect's administrator. Avoid blindly resending a message that may already be queued.
- Run actual cross-provider tests at Google and Microsoft before launch, every few weeks, and after setup changes. Warming services often offer seed-based spam/placement tests. Inspect final headers, authentication, formatting, and replies; compare with a saved baseline. Scores are diagnostic, not a universal placement guarantee.
- Review unresolved interested replies, deferred prospects, upcoming actions, owners, reasons, and dates. Keep warming traffic out of sales metrics and workflow actions.

## Historical FirstQuadrant material

Use the product's docs and changelog to recover concrete workflows, not to reproduce a feature inventory or promote a service as currently available. Historical tracking defaults, Reply-To support, unlimited follow-ups, soft-stops, and generic nurturing/announcement features do not override the choices above. The research skill's source map identifies the useful pages.

All proposals discussed in the latest author interview are accepted with the refinements above. Do not restart that interview or imply there is a pending approval for those edits. Newly proposed strategy changes still need the author's judgment.
