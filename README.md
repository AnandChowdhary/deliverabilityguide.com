# 📧 [FirstQuadrant](https://firstquadrant.ai?utm_source=github&utm_medium=readme&utm_campaign=email-deliverability-checklist) Email Deliverability Checklist

## Checklist

- [x] [Custom domains and mailboxes](custom-domains-and-mailboxes)
  - [x] [Additional domains](additional-domains)
    - [x] [DNS records](dns-records)
  - [x] [Mailboxes](mailboxes)
    - [x] [Mailbox providers](mailbox-providers)
    - [x] [Active and backup mailboxes](active-and-backup-mailboxes)
    - [x] [Sending limits](sending-limits)
  - [x] [Rotating mailboxes](rotating-mailboxes)
- [x] [Email warming](email-warming)
  - [x] [Golden rule: Always keep warming](golden-rule-always-keep-warming)
  - [x] [For new mailboxes](for-new-mailboxes)
  - [x] [Randomization is important](randomization-is-important)
  - [x] [After ramping up](after-ramping-up)
- [x] [Body content](body-content)
  - [x] [Personalize the messaging](personalize-the-messaging)
  - [x] [Randomize the body content](randomize-the-body-content)
  - [x] [What not to include](what-not-to-include)
    - [x] [Spammy words](spammy-words)
    - [x] [Images](images)
    - [x] [Links](links)
    - [x] [Attachments](attachments)
  - [x] [Opt-out and unsubscribe](opt-out-and-unsubscribe)
  - [x] [Subject line](subject-line)
- [x] [Open and click tracking](open-and-click-tracking)
- [x] [Right people, right time](right-people-right-time)
  - [x] [Targeting](targeting)
    - [x] [Buying intent](buying-intent)
  - [x] [Scheduling](scheduling)
    - [x] [Days and timezones](days-and-timezones)
    - [x] [Randomization](randomization)
- [x] [Key metrics](key-metrics)
- [ ] [Too much to do?](#too-much-to-do)

## Custom domains and mailboxes

_Coming soon_

### Additional domains

_Coming soon_

#### DNS records

_Coming soon_

### Mailboxes

_Coming soon_

#### Mailbox providers

_Coming soon_

#### Active and backup mailboxes

_Coming soon_

#### Sending limits

_Coming soon_

### Rotating mailboxes

_Coming soon_

## Email warming

Email warming is the process of gradually increasing the number of emails you send and receive from a new mailbox to establish a good sender reputation with mailbox providers. This is done by sending a small number of emails at first, and then gradually increasing the number of emails sent over time, and having a percent of those emails replied to. This makes the mailbox provider believe that the emails sent are worth replying to, and are therefore not likely spam.

### Golden rule: Always keep warming

Regardless of whether you have a completely fresh mailbox or one that's already been used in the past, it is of paramount importance that you always continue to warm up your mailboxes. This is to maintain your sender reputation and ensure that your emails are delivered to the inbox, and if you have a good reputation today does not necessarily mean that you will have a good reputation tomorrow.

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

## Body content

Perhaps the most important part of your email is the body content. This is because mailbox providers are increasingly using machine learning to determine whether an email is spam or not, and the body content is one the most important factors in this decision. And of course, sending the right message to the right person is the most important part of your outbound strategy, if you can't control for the right time.

### Personalize the messaging

Using variables like "Hi {firstName}" is no longer enough as recipients are receiving too many outbound emails and can easily tell if it's a template. The more personalized your message, the less likely it is to be flagged as spam by recipients which does a lot of damage to your sending reputation. You should either write personalized emails manually, or use an automated tool like FirstQuadrant that does this for you. At the very least, you should personalize the first sentence of your email to make it seem like it's not a template.

### Randomize the body content

Similar to randomizing the number of emails sent per day, you should also randomize the body content of your emails. This is because mailbox providers are likely to flag a clear pattern as spam. In general, the more randomization you have, the better for your deliverability.

One way to easily get started is to use the spintax strategy, where you have multiple variations of the same sentence, and the outbound tool will randomly select one of them. For example, you could have the following variations of the same sentence:

- I'm reaching out to you because I saw that you're working at {companyName}.
- I'm reaching out to you because I saw online that you're working for {companyName}.
- I thought of reaching because I saw that you're working at {companyName}.

If this sounds too easy to be very useful, it's because it probably is. These days, it's best that you go further than having just a few variations of a few words in the content. Ideally, the entire email will be generated by a large language model like GPT-4, which is what FirstQuadrant does, so that it's completely unique and can be highly personalized.

### What not to include

It's best to avoid including anything that could be flagged as spam by mailbox providers. Ideally, your email should be as simple as possible, totally in plain text. Of course, this is not always possible, so you should try to avoid words and phrases that are likely to be flagged as spam, and include as few images and links as possible.

#### Spammy words

Words such as "risk-free" and phrases like "additional income" are very often found in scam emails, and are therefore likely to be flagged as spam. Please don't include Nigerian princes in your email!

Although articles such as [188 Spam Words to Avoid: How to Stay Out of Email Spam Folders](https://www.activecampaign.com/blog/spam-words) help you avoid spammy words, it's best to use an API that detects spammy words in your email content and warns you about them before you send the email.

#### Images

Images are often used in spam emails, and are therefore likely to be flagged as spam. If you must include an image, make sure it's not the only thing in your email, and that it's not too large, and ideally not in the first email but in subsequent follow-ups.

You should also include an `alt` attribute in the image tag, which is good for accessibility but can also help with deliverability. This is because if the image is not loaded, the `alt` attribute will be displayed instead and the mailbox provider can also use this text in their spam detection algorithm.

Tracking pixels are usually 1x1 pixel GIFs which are known to reduce deliverability, so make sure any "real" images you include are larger than 1x1 pixel to avoid being flagged as a tracking pixel. You should also aim to have a short, human-readable URL for the image, and not a long, random URL that looks like a tracking pixel.

#### Links

Almost all spam emails include links, so including even one link can increase the likelihood of your email being flagged as spam. Of course, sometimes you need a call-to-action link, so try to keep it to one link per email, and ideally not in the first email but in subsequent follow-ups.

It's also recommended for the link to be a short, human-readable URL, and not a long, random URL that looks like a tracking pixel. You should also avoid using URL shorteners, as they are often used in spam emails, instead preferring to use your mailbox's domain wherever possible. For example, if you're sending an email from user@examplehq.com when your primary domain is example.com, you should use a link like https://examplehq.com/your-page. If you want to track clicks, you can personalize the URL using a short slug, e.g., https://examplehq.com/your-page/patrick-stripe for an email sent to patrick@stripe.com from user@examplehq.com.

#### Attachments

Attachments are in general a bad idea, as they are often used in spam emails, especially executable files. Although PDFs are frequently used in proposals and presentations, they are able to contain malicious code and connect to the internet, so they are often flagged as spam. You should not include attachments in your first email, and ideally not in subsequent follow-ups either, only sending them when requested by the recipient.

The only exception is sending calendar invites, but these are usually open-in `.ics` files, so you should still avoid sending them unless requested.

### Opt-out and unsubscribe

_Coming soon_

### Subject line

_Coming soon_

## Open and click tracking

_Coming soon_

## Right people, right time

_Coming soon_

### Targeting

_Coming soon_

#### Buying intent

_Coming soon_

### Scheduling

_Coming soon_

#### Days and timezones

_Coming soon_

#### Randomization

_Coming soon_

## Key metrics

_Coming soon_

## Too much to do?

If you're overwhelmed by the number of things you need to do to set up a scalable outbound setup with high deliverability, you can use [FirstQuadrant](https://firstquadrant.ai?utm_source=github&utm_medium=readme&utm_campaign=email-deliverability-checklist). We'll take care of everything for you, including literally everything in this list, and then some, including:

- Highly personalized emails using GPT-4
- Intelligent lead sourcing based on your ICP with enrichment
- Smart email scheduling with automated follow-ups
- Responsive replies to incoming emails based on conversation context
- Real-time analytics dashboard of your outbound sales funnel with key metrics
- A gorgeous, lightning-fast app with dedicated support via Slack Connect

**[Sign up for FirstQuadrant →](https://firstquadrant.ai?utm_source=github&utm_medium=readme&utm_campaign=email-deliverability-checklist)**

## 📄 License

This work is licensed under a [Creative Commons Attribution Share Alike 4.0 International](./LICENSE) by Anand Chowdhary and [FirstQuadrant](https://firstquadrant.ai?utm_source=github&utm_medium=readme&utm_campaign=email-deliverability-checklist).
