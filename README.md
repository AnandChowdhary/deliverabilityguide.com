# 📧 [FirstQuadrant](https://firstquadrant.ai?utm_source=github&utm_medium=readme&utm_campaign=email-deliverability-checklist) Email Deliverability Checklist

## Table of contents

1. [Email warming](#email-warming)

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

## 📄 License

This work is licensed under a [Creative Commons Attribution Share Alike 4.0 International](./LICENSE) by Anand Chowdhary and [FirstQuadrant](https://firstquadrant.ai?utm_source=github&utm_medium=readme&utm_campaign=email-deliverability-checklist).
