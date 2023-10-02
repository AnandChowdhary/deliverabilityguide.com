# 📧 The Open-source Email Deliverability Guide ([DeliverabilityGuide.com](https://deliverabilityguide.com))

**This aims to be the world's most comprehensive email deliverability checklist.** _(Work in progress!)_

If you're sending outbound emails, you should follow this checklist to ensure that your emails are delivered to the inbox and not marked as spam. This checklist is based on the experience of sending tons of of outbound emails, and it's open source to make sure we have the most recent and relevant information. Contributions are welcome!

## Checklist

- [x] [Custom domains and mailboxes](#custom-domains-and-mailboxes)
  - [x] [Additional domains](#additional-domains)
    - [x] [DNS records](#dns-records)
      - [x] [SPF](#spf)
      - [x] [DKIM](#dkim)
      - [x] [DMARC](#dmarc)
      - [x] [Other records](#other-records)
    - [x] [Redirects](#redirects)
  - [x] [Mailboxes](#mailboxes)
    - [x] [Mailbox providers](#mailbox-providers)
    - [x] [Rotating mailboxes](#rotating-mailboxes)
    - [x] [Sending limits](#sending-limits)
- [x] [Email warming](#email-warming)
  - [x] [Golden rule: Always keep warming](#golden-rule-always-keep-warming)
  - [x] [For new mailboxes](#for-new-mailboxes)
  - [x] [Randomization is important](#randomization-is-important)
  - [x] [After ramping up](#after-ramping-up)
- [x] [Body content](#body-content)
  - [x] [Personalize the messaging](#personalize-the-messaging)
  - [x] [Randomize the body content](#randomize-the-body-content)
  - [x] [What not to include](#what-not-to-include)
    - [x] [Spammy words](#spammy-words)
    - [x] [Images](#images)
    - [x] [Links](#links)
    - [x] [Attachments](#attachments)
  - [x] [Opt-out and unsubscribe](#opt-out-and-unsubscribe)
  - [x] [Subject line](#subject-line)
- [x] [Open and click tracking](#open-and-click-tracking)
- [x] [Right people, right time](#right-people-right-time)
  - [x] [Targeting](#targeting)
    - [x] [Buying intent](#buying-intent)
  - [x] [Scheduling](#scheduling)
    - [x] [Days and timezones](#days-and-timezones)
    - [x] [Randomization](#randomization)
- [x] [Key metrics](#key-metrics)
- [ ] [Too much to do?](#too-much-to-do)

## Custom domains and mailboxes

_Coming soon_

### Additional domains

> **tl;dr:** Use separate domains for outbound, ideally buy a few .com domains using your brand name.

You should not use your primary domain to send outbound, or for anything with high volume and potential for reputation damage. Instead, you should use separate domains for outbound. This is because if your primary domain is flagged as spam, it will affect your entire business, and you will have to spend a lot of time and effort to get it unflagged. If you use a separate domain for outbound, you can simply stop using it and switch to a new domain.

It's recommended to purchase one or more .com domains (don't use other TLDs, especially not free ones) using your brand name. For example, if your primary domain is example.com, you can purchase examplehq.com and getexample.com as additional domains, or more specific to your line of business, for example cleverclipvideos.com.

#### DNS records

> **tl;dr:** Set up SPF, DKIM, and strict DMARC records for each of your additional domains.

It's extremely important to set up your DNS records correctly, as this is the first thing mailbox providers check when determining whether an email is spam or not. You should set up the following DNS records for each of your additional domains.

##### SPF

The Sender Policy Framework (SPF) is a DNS record that specifies which mail servers are allowed to send email on behalf of your domain. It's recommended to use a tool to generate your SPF records or use standard ones provided by your mailbox provider. For example, if you're using Google Workspace, your SPF record will look like this:

```
v=spf1 include:_spf.google.com ~all
```

In the above example, `_spf.google.com` is a standard SPF record provided by Google Workspace, and `~all` means that if the email is not sent from one of the servers specified in the SPF record, it should be soft-failed, i.e., marked as spam but still delivered to the inbox. Other options are `-all` (hard-fail, i.e., marked as spam and not delivered to the inbox), `?all` (neutral, i.e., not marked as spam), and `+all` (allow all servers to send email on behalf of your domain, i.e., not marked as spam). It's recommended to use `~all` or `-all` as your SPF record, and only include servers that you're using to send email.

##### DKIM

The DomainKeys Identified Mail (DKIM) is a DNS record that allows the recipient to verify that an email was sent and authorized by the owner of that domain. It's recommended to use the standard DKIM record provided by your mailbox provider. For example, if you're using Google Workspace, you can generate a DKIM record in the Google Admin console and add it to your DNS records.

##### DMARC

The Domain-based Message Authentication, Reporting, and Conformance (DMARC) is a DNS record that specifies how mailbox providers should handle emails that fail SPF or DKIM checks. An example DMARC record is:

```
v=DMARC1; p=reject; rua=mailto:rua@example.com; ruf=mailto:ruf@example.com
```

In the above example, `p=reject` means that if an email fails SPF or DKIM checks, it should be rejected, i.e., marked as spam and not delivered to the inbox. Other options are `p=quarantine` (soft-fail, i.e., marked as spam but still delivered to the inbox) and `p=none` (no action taken, i.e., not marked as spam). It's recommended to use `p=reject` as your DMARC record to ensure that only emails sent from your authorized servers are delivered to the inbox after testing that your SPF and DKIM records are set up correctly. If you're unsure about your configuration, you can use `p=quarantine` in the beginning to ensure that emails are still delivered and then switch to `p=reject` after testing.

You should also specify a `rua` and `ruf` email address to receive reports about emails that fail SPF or DKIM checks. These reports are sent by mailbox providers to the specified email address, and can be used to debug any issues with your SPF and DKIM records. It's recommended to use a separate email address for this purpose, and not your primary email address; it's easiest to use a third-party hosted service that provides this functionality.

##### Other records

You can additionally set up additional DNS records such as BIMI, MTA-STS, and TLS-RPT, but these are not necessary and can be set up later if you wish to. BIMI in particular is an interesting candidate, as it allows you to specify a logo that will be displayed next to your emails in the inbox, but it's not widely supported yet and can be very expensive to set up, especially for a large number of domains. In general, you should be good to go with strict DMARC using properly set SPF and DKIM records.

#### Redirects

> **tl;dr:** Use a HTTP 301 redirect from your additional domains to your primary domain, and ideally include UTM parameters and a wildcard redirect.

It's recommended to use a HTTP 301 redirect from your additional domains to your primary domain. This is because if you use a separate domain for outbound, you will likely want to redirect recipients to your primary domain when they click on a link in your email or types the address manually. For example, if you're sending an email from user@exampleapp.com and the recipient goes to exampleapp.com (email clients such as Superhuman make this very easy), they should be redirected to example.com.

You can additionally set up UTM parameters when redirecting your additional domains to your primary domain to track where the traffic is coming from. For example, if you're sending an email from user@exampleapp.com and the recipient goes to exampleapp.com, you can redirect them to example.com/?utm_source=exampleapp.com&utm_medium=email&utm_campaign=outbound-domain-redirect. This way, you can track how many people are visiting your primary domain from your additional domains, and how many of them are converting.

Ideally, you should also include a wildcard redirect so that all pages on your primary domain also work on your additional domains. For example, exampleapp.com/pricing should redirect to example.com/pricing. This way, you can use the standard links on your website in your outbound emails, and they will work on your additional domains as well, with the exception of using the additional domain in the URL instead of the primary domain.

### Mailboxes

We recommend using a trusted mailbox provider like Google Workspace on your additional domains and setting up a few mailboxes for each domain while strictly enforcing a maximum number of emails sent per day per mailbox and having backup mailboxes.

#### Mailbox providers

> **tl;dr:** Use Google Workspace on your additional domains, and Microsoft 365 for enterprises.

There are many mailbox providers and enthusiasts can host their own mail servers, but the most popular ones are Google and Microsoft. It's not recommended to use your own mail server, as it's very difficult to set up and maintain, and you will likely have a low deliverability rate because of limited IP address reputation. Instead, you should use a third-party mailbox provider, such as Google Workspace or Microsoft 365, which are both very easy to set up and maintain, and have a high deliverability rate because of their high IP address reputation. Note that this is limited to using their paid business email offerings, not their free consumer email offerings. When in doubt, use Google Workspace, unless your target audience is more often using Microsoft 365, which is more common in the enterprise.

You should also not use a third-party email service provider (ESP) such as SendGrid or AWS SES, as they most often used for transactional emails and marketing emails, and have strict anti-spam policies. They also more likely end up in "Promotions" or "Updated" folders, whereas emails sent from a trusted mailbox provider are more likely to end up in the "Primary" inbox. To a lesser extent, you can consider more affordable providers like Zoho Mail, but they are not as reliable as Google or Microsoft. Some ESPs also offer dedicated IP addresses, but these are not recommended because their IP address reputation is not as good as Google or Microsoft, especially if you're starting out.

You can also optimize for having the same mailbox provider as your recipient, as this can also increase your deliverability rate. For example, if you're sending an email to someone with an address hosted on Google, you should use Google Workspace to send the email. This is because mailbox providers are more likely to deliver emails from the same provider, and slightly less likely to deliver emails from different providers. You can use the DNS records of the recipient's domain to determine which mailbox provider they are using and then use the same provider to send the email, but this is probably overkill for many use cases.

#### Rotating mailboxes

> **tl;dr:** Use a few mailboxes for each domain, and have a backup mailbox for each active mailbox.

It's recommended to have at least two mailboxes for each domain, one active and one backup. This is because if your active mailbox is flagged as spam, you can switch to your backup mailbox and continue sending emails. If you wish to, you can also have a backup mailbox provider, but this is not necessary unless you have a very high volume of emails or a high risk of being flagged as spam. If you have a backup mailbox provider, you should use separate domains for each provider instead of using subdomains.

A good rule of thumb is to have one backup mailbox for every 3 active mailboxes. For example, if you have 3 active mailboxes, you should have 1 backup mailbox, and if you have 6 active mailboxes, you should have 2 backup mailboxes. This is because if you have a high volume of emails, you're more likely to be flagged as spam, and therefore more likely to need a backup mailbox.

When a mailbox gets a lot of spam complaints, it's likely to be flagged as spam by mailbox providers, and therefore you should stop using it immediately. You should also stop using a mailbox if you're getting a lot of bouncebacks, as this is also likely to affect your deliverability rate. If you're using a backup mailbox, you can switch to it immediately, and if you're not, you should create a new mailbox and start warming it up. For the next few weeks, you should continue to warm up your previous mailbox and only restart using it after it has a good sender reputation again.

#### Sending limits

> **tl;dr:** Strictly enforce a maximum number of emails sent per day per mailbox, starting with 30 emails per day per mailbox, and a maximum of 3 active mailboxes per domain.

You should strictly enforce a maximum number of emails sent per day per mailbox, and scale up the number of active mailboxes as you want to send more emails. This is because if you send too many emails from a single mailbox, it's likely to be flagged as spam by mailbox providers. You should also not have more than a few active mailboxes per domain, so if you want to send more emails, you should use purchase additional domains and create new mailboxes for them.

We recommend a maximum of 30 emails per day per mailbox, and a maximum of 3 active mailboxes per domain when you're getting started. This means that you can send up to 90 emails per day per domain. This is a good starting point, and you can increase the number of emails per day per mailbox and the number of active mailboxes per domain as your domain reputation increases. You should also not send more than 1 email every 10-30 minutes per mailbox, because that's the average time it takes for a human to write and send an email. The more you can mimic human behavior, the better for your deliverability, so you should aim to send emails at a human-like pace, for example one email every 30 minutes and distributed randomly throughout the day.

- Start with low volume
- Have a consistent volume and don't have spikes
- Scale up when you have "message market fit"

## Email warming

> **tl;dr:** Start with 1 email per day and increase by 2 emails every day until you reach 30 emails per day after two weeks, and then continue to warm up your mailbox while keeping the same maximum number of emails per day, randomizing it.

Email warming is the process of gradually increasing the number of emails you send and receive from a new mailbox to establish a good sender reputation with mailbox providers. This is done by sending a small number of emails at first, and then gradually increasing the number of emails sent over time, and having a percent of those emails replied to. This makes the mailbox provider believe that the emails sent are worth replying to, and are therefore not likely spam.

### Always keep warming

Regardless of whether you have a completely fresh mailbox or one that's already been used in the past, it is of paramount importance that you always continue to warm up your mailboxes. This is to maintain your sender reputation and ensure that your emails are delivered to the inbox, and if you have a good reputation today does not necessarily mean that you will have a good reputation tomorrow.

What's interesting is that some deliverability experts no longer recommend warming as they suggest that it's trivial to detect and therefore disregard warming emails, but until this is of general consensus, it's best to continue to warm up your mailboxes.

### For new mailboxes

Immediately after creating a new mailbox, you should start warming it up. Most email warming tools offer a ramp-up option, rather than a flat number of emails per day, which is recommended. For example, a configuration could be to start from 1 email per day and increase by 2 emails every day (i.e., 1, 3, 5, 7, etc.) until you reach 30 emails per day after two weeks. This is because mailbox providers are more likely to flag a sudden increase in email volume as spam.

In the beginning, you can have a high reply rate of 30-50%, and then drop it a little lower after the initial ramping up period is over. You don't want to have a reply rate that's too low or too high, because both extremes are likely to be flagged as spam.

**tl;dr:**

- Ramping up period: ~14 days
- Total maximum emails per day: ~30
- Daily increase: 2 ±2
- Reply rate: 30-50%

### Randomization is important

Even if you ramp-up, it's preferred to randomize the number of emails sent per day. For example, instead of 1, 3, 5, 7, 9, etc., it could be 1, 2, 5, 6, 9, etc., i.e., keeping the same general pattern but randomizing the number of emails sent per day. This is because mailbox providers could be likely to flag a clear pattern as spam. An easy way to implement this behavior is to randomize the daily increase (±2).

You should also randomize the time of day at which emails are sent, and to which providers. It's important to have diversity in providers (e.g., Gmail, Outlook, etc.) and in the time of day (e.g., 9:19 am, 11:37 am, 2:06 pm, etc.). Most email warming tools are configured to do this by default.

### After ramping up

After the initial ramping up period, you should continue to warm up your mailbox while keeping the same maximum number of emails per day, randomizing it. For example, send between 25 and 35 emails per day with a reply rate of 30%-40%. This is because you want to maintain your sender reputation as you scale your email volume.

**tl;dr:**

- Total maximum emails per day: 30 ±5
- Reply rate: 30-40%

### Positive and negative actions

Positive actions include replies, marking as important, etc., while negative actions include marking as spam, unsubscribing, etc. Since we want to optimize for positive actions, you can employ certain tricks, such as asking a question. Even if it's a simple yes/no question, it's more likely to get a reply and therefore a positive action.

## Body content

> **tl;dr:** Personalize the messaging, randomize the body content, and avoid spammy words, images, links, and attachments.

Perhaps the most important part of your email is the body content. This is because mailbox providers are increasingly using machine learning to determine whether an email is spam or not, and the body content is one the most important factors in this decision. And of course, sending the right message to the right person is the most important part of your outbound strategy, if you can't control for the right time.

### Personalize the messaging

Using variables like "Hi {firstName}" is no longer enough as recipients are receiving too many outbound emails and can easily tell if it's a template. The more personalized your message, the less likely it is to be flagged as spam by recipients which does a lot of damage to your sending reputation. You should either write personalized emails manually, or use an automated tool like that does this for you, for example using a large language model. At the very least, you should personalize the first sentence of your email to make it seem like it's not a template.

### Randomize the body content

Similar to randomizing the number of emails sent per day, you should also randomize the body content of your emails. This is because mailbox providers are likely to flag a clear pattern as spam. In general, the more randomization you have, the better for your deliverability.

One way to easily get started is to use the spintax strategy, where you have multiple variations of the same sentence, and the outbound tool will randomly select one of them. For example, you could have the following variations of the same sentence:

- I'm reaching out to you because I saw that you're working at {companyName}.
- I'm reaching out to you because I saw online that you're working for {companyName}.
- I thought of reaching because I saw that you're working at {companyName}.

If this sounds too easy to be very useful, it's because it probably is. These days, it's best that you go further than having just a few variations of a few words in the content. Ideally, the entire email will be generated by a large language model like GPT-4, so that it's completely unique and can be highly personalized, or written manually.

### What not to include

It's best to avoid including anything that could be flagged as spam by mailbox providers. Ideally, your email should be as simple as possible, totally in plain text without any fancy HTML. Of course, this is not always possible, so you should try to avoid words and phrases that are likely to be flagged as spam, and include as few images and links as possible.

#### Spammy words

Words such as "risk-free" and phrases like "additional income" are very often found in scam emails, and are therefore likely to be flagged as spam. Please don't include Nigerian princes in your email!

Although articles such as [188 Spam Words to Avoid: How to Stay Out of Email Spam Folders](https://www.activecampaign.com/blog/spam-words) help you avoid spammy words, it's best to use an API that detects spammy words in your email content and warns you about them before you send the email.

Since mailbox providers have dynamic spam word lists and increasingly use machine learning to detect spam, so it's possible that copy that works for a certain period of time will stop working later, so keep an eye on your spam rate and adjust your copy accordingly (see [Key metrics](#key-metrics) below).

It's also recommended to use regular sentence (or lower) case copy, as uppercase copy is often used in spam emails. Similarly, you should avoid using too many exclamation marks.

#### Images

Images are often used in spam emails, and are therefore likely to be flagged as spam. If you must include an image, make sure it's not the only thing in your email, and that it's not too large, and ideally not in the first email but in subsequent follow-ups.

You should also include an `alt` attribute in the image tag, which is good for accessibility but can also help with deliverability. This is because if the image is not loaded, the `alt` attribute will be displayed instead and the mailbox provider can also use this text in their spam detection algorithm.

Although it's good to have alternate text on images, it's not a good idea to have text in images. This is because putting text in images used to be a common way to bypass spam filters by fraudsters, so your images should not have a lot of text in them (a little bit like a logo is usually okay).

Tracking pixels are usually 1x1 pixel GIFs which may reduce deliverability, so make sure any "real" images you include are larger than 1x1 pixel to avoid being flagged as a tracking pixel. You should also aim to have a short, human-readable URL for the image, and not a long, random URL that looks like a tracking pixel.

#### Links

Almost all spam emails include links, so including even one link can increase the likelihood of your email being flagged as spam. Of course, sometimes you need a call-to-action link, so try to keep it to one link per email, and ideally not in the first email but in subsequent follow-ups.

It's also recommended for the link to be a short, human-readable URL, and not a long, random URL that looks like a tracking pixel. You should also avoid using URL shorteners, as they are often used in spam emails, instead preferring to use your mailbox's domain wherever possible. For example, if you're sending an email from user@examplehq.com when your primary domain is example.com, you should use a link like https://examplehq.com/your-page. If you want to track clicks, you can personalize the URL using a short slug, e.g., https://examplehq.com/your-page/patrick-stripe for an email sent to patrick@stripe.com from user@examplehq.com.

#### Attachments

Attachments are in general a bad idea, as they are often used in spam emails, especially executable or compressed files. Although PDFs are frequently used in proposals and presentations, they are able to contain malicious code and connect to the internet, so they are often flagged as spam. You should not include attachments in your first email, and ideally not in subsequent follow-ups either, only sending them when requested by the recipient.

The only exception is sending calendar invites, but these are usually open-in `.ics` files, so you should still avoid sending them unless requested.

### Keep markup similar to human emails

_Coming soon_

- Gmail uses divs instead of paragraphs
- When quoting text, use exact markup
- Popular HTML templates go to promotions

### Opt-out and unsubscribe

_Coming soon_

- Unsubscribe link is good because people don't mark as spam
- Asking for "If you're ot interested, let me know" is better than marking as spam

### Subject line

_Coming soon_

- Subject copy determines open rate, higher the better for deliverability
- Iterate, A/B test, keep an eye on open rate

## Open and click tracking

_Coming soon_

## Right people, right time

_Coming soon_

### Targeting

- It's not good when people mark you as spam
- If you reach out to the wrong people, they will mark you as spam
- Clearly define your target audience

_Coming soon_

#### Buying intent

_Coming soon_

- Spam traps exist when you buy email lists

#### Email verification

_Coming soon_

### Scheduling

_Coming soon_

#### Days and timezones

_Coming soon_

#### Randomization

_Coming soon_

## Key metrics

_Coming soon_

- Open rate, click rate, click-to-open rate
- Replies, bouncebacks, spam complaints, unsubscribes
- Inbox placement rate, spam placement rate, missing rate
- Spam traps, blocklists
- Google Postmaster Tools

## 📄 License

This work is licensed under a [Creative Commons Attribution Share Alike 4.0 International](./LICENSE) by Anand Chowdhary.
