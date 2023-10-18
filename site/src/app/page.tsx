import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Introduction } from '@/components/Introduction'
import { NavBar } from '@/components/NavBar'

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <NavBar />
      <section className="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32">
        <Container dangerouslySetInnerHTML={{ __html: `<p><strong>This aims to be the world&#8217;s most comprehensive email deliverability checklist.</strong> <em>(Work in progress!)</em></p>
<p>If you&#8217;re sending outbound emails, you should follow this checklist to ensure that your emails are delivered to the inbox and not marked as spam. This checklist is based on the experience of sending tons of of outbound emails, and it&#8217;s open source to make sure we have the most recent and relevant information. Contributions are welcome!</p>
<h2 id="checklist">Checklist</h2>
<ul>
<li><a href="#custom-domains-and-mailboxes">Custom domains and mailboxes</a><ul>
<li><a href="#additional-domains">Additional domains</a><ul>
<li><a href="#dns-records">DNS records</a><ul>
<li><a href="#spf">SPF</a></li>
<li><a href="#dkim">DKIM</a></li>
<li><a href="#dmarc">DMARC</a></li>
<li><a href="#other-records">Other records</a></li>
</ul>
</li>
<li><a href="#redirects">Redirects</a></li>
</ul>
</li>
<li><a href="#mailboxes">Mailboxes</a><ul>
<li><a href="#mailbox-providers">Mailbox providers</a></li>
<li><a href="#rotating-mailboxes">Rotating mailboxes</a></li>
<li><a href="#sending-limits">Sending limits</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#email-warming">Email warming</a><ul>
<li><a href="#golden-rule-always-keep-warming">Golden rule: Always keep warming</a></li>
<li><a href="#for-new-mailboxes">For new mailboxes</a></li>
<li><a href="#randomization-is-important">Randomization is important</a></li>
<li><a href="#after-ramping-up">After ramping up</a></li>
</ul>
</li>
<li><a href="#body-content">Body content</a><ul>
<li><a href="#personalize-the-messaging">Personalize the messaging</a></li>
<li><a href="#randomize-the-body-content">Randomize the body content</a></li>
<li><a href="#what-not-to-include">What not to include</a><ul>
<li><a href="#spammy-words">Spammy words</a></li>
<li><a href="#images">Images</a></li>
<li><a href="#links">Links</a></li>
<li><a href="#attachments">Attachments</a></li>
</ul>
</li>
<li><a href="#opt-out-and-unsubscribe">Opt-out and unsubscribe</a></li>
<li><a href="#subject-line">Subject line</a></li>
</ul>
</li>
<li><a href="#open-and-click-tracking">Open and click tracking</a></li>
<li><a href="#right-people-right-time">Right people, right time</a><ul>
<li><a href="#targeting">Targeting</a><ul>
<li><a href="#buying-intent">Buying intent</a></li>
</ul>
</li>
<li><a href="#scheduling">Scheduling</a><ul>
<li><a href="#days-and-timezones">Days and timezones</a></li>
<li><a href="#randomization">Randomization</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#key-metrics">Key metrics</a></li>
<li><input disabled="" type="checkbox"> <a href="#too-much-to-do">Too much to do?</a></li>
</ul>
<h2 id="custom-domains-and-mailboxes">Custom domains and mailboxes</h2>
<p><em>Coming soon</em></p>
<h3 id="additional-domains">Additional domains</h3>
<blockquote>
<p><strong>tl;dr:</strong> Use separate domains for outbound, ideally buy a few .com domains using your brand name.</p>
</blockquote>
<p>You should not use your primary domain to send outbound, or for anything with high volume and potential for reputation damage. Instead, you should use separate domains for outbound. This is because if your primary domain is flagged as spam, it will affect your entire business, and you will have to spend a lot of time and effort to get it unflagged. If you use a separate domain for outbound, you can simply stop using it and switch to a new domain.</p>
<p>It&#8217;s recommended to purchase one or more .com domains (don&#8217;t use other TLDs, especially not free ones) using your brand name. For example, if your primary domain is example.com, you can purchase examplehq.com and getexample.com as additional domains, or more specific to your line of business, for example cleverclipvideos.com.</p>
<h4 id="dns-records">DNS records</h4>
<blockquote>
<p><strong>tl;dr:</strong> Set up SPF, DKIM, and strict DMARC records for each of your additional domains.</p>
</blockquote>
<p>It&#8217;s extremely important to set up your DNS records correctly, as this is the first thing mailbox providers check when determining whether an email is spam or not. You should set up the following DNS records for each of your additional domains.</p>
<h5 id="spf">SPF</h5>
<p>The Sender Policy Framework (SPF) is a DNS record that specifies which mail servers are allowed to send email on behalf of your domain. It&#8217;s recommended to use a tool to generate your SPF records or use standard ones provided by your mailbox provider. For example, if you&#8217;re using Google Workspace, your SPF record will look like this:</p>
<pre><code>v=spf1 include:_spf.google.com ~all
</code></pre><p>In the above example, <code>_spf.google.com</code> is a standard SPF record provided by Google Workspace, and <code>~all</code> means that if the email is not sent from one of the servers specified in the SPF record, it should be soft-failed, i.e., marked as spam but still delivered to the inbox. Other options are <code>-all</code> (hard-fail, i.e., marked as spam and not delivered to the inbox), <code>?all</code> (neutral, i.e., not marked as spam), and <code>+all</code> (allow all servers to send email on behalf of your domain, i.e., not marked as spam). It&#8217;s recommended to use <code>~all</code> or <code>-all</code> as your SPF record, and only include servers that you&#8217;re using to send email.</p>
<h5 id="dkim">DKIM</h5>
<p>The DomainKeys Identified Mail (DKIM) is a DNS record that allows the recipient to verify that an email was sent and authorized by the owner of that domain. It&#8217;s recommended to use the standard DKIM record provided by your mailbox provider. For example, if you&#8217;re using Google Workspace, you can generate a DKIM record in the Google Admin console and add it to your DNS records.</p>
<h5 id="dmarc">DMARC</h5>
<p>The Domain-based Message Authentication, Reporting, and Conformance (DMARC) is a DNS record that specifies how mailbox providers should handle emails that fail SPF or DKIM checks. An example DMARC record is:</p>
<pre><code>v=DMARC1; p=reject; rua=mailto:rua@example.com; ruf=mailto:ruf@example.com
</code></pre><p>In the above example, <code>p=reject</code> means that if an email fails SPF or DKIM checks, it should be rejected, i.e., marked as spam and not delivered to the inbox. Other options are <code>p=quarantine</code> (soft-fail, i.e., marked as spam but still delivered to the inbox) and <code>p=none</code> (no action taken, i.e., not marked as spam). It&#8217;s recommended to use <code>p=reject</code> as your DMARC record to ensure that only emails sent from your authorized servers are delivered to the inbox after testing that your SPF and DKIM records are set up correctly. If you&#8217;re unsure about your configuration, you can use <code>p=quarantine</code> in the beginning to ensure that emails are still delivered and then switch to <code>p=reject</code> after testing.</p>
<p>You should also specify a <code>rua</code> and <code>ruf</code> email address to receive reports about emails that fail SPF or DKIM checks. These reports are sent by mailbox providers to the specified email address, and can be used to debug any issues with your SPF and DKIM records. It&#8217;s recommended to use a separate email address for this purpose, and not your primary email address; it&#8217;s easiest to use a third-party hosted service that provides this functionality.</p>
<h5 id="other-records">Other records</h5>
<p>You can additionally set up additional DNS records such as BIMI, MTA-STS, and TLS-RPT, but these are not necessary and can be set up later if you wish to. BIMI in particular is an interesting candidate, as it allows you to specify a logo that will be displayed next to your emails in the inbox, but it&#8217;s not widely supported yet and can be very expensive to set up, especially for a large number of domains. In general, you should be good to go with strict DMARC using properly set SPF and DKIM records.</p>
<h4 id="redirects">Redirects</h4>
<blockquote>
<p><strong>tl;dr:</strong> Use a HTTP 301 redirect from your additional domains to your primary domain, and ideally include UTM parameters and a wildcard redirect.</p>
</blockquote>
<p>It&#8217;s recommended to use a HTTP 301 redirect from your additional domains to your primary domain. This is because if you use a separate domain for outbound, you will likely want to redirect recipients to your primary domain when they click on a link in your email or types the address manually. For example, if you&#8217;re sending an email from <a href="mailto:user@exampleapp.com">user@exampleapp.com</a> and the recipient goes to exampleapp.com (email clients such as Superhuman make this very easy), they should be redirected to example.com.</p>
<p>You can additionally set up UTM parameters when redirecting your additional domains to your primary domain to track where the traffic is coming from. For example, if you&#8217;re sending an email from <a href="mailto:user@exampleapp.com">user@exampleapp.com</a> and the recipient goes to exampleapp.com, you can redirect them to example.com/?utm_source=exampleapp.com&utm_medium=email&utm_campaign=outbound-domain-redirect. This way, you can track how many people are visiting your primary domain from your additional domains, and how many of them are converting.</p>
<p>Ideally, you should also include a wildcard redirect so that all pages on your primary domain also work on your additional domains. For example, exampleapp.com/pricing should redirect to example.com/pricing. This way, you can use the standard links on your website in your outbound emails, and they will work on your additional domains as well, with the exception of using the additional domain in the URL instead of the primary domain.</p>
<h3 id="mailboxes">Mailboxes</h3>
<p>We recommend using a trusted mailbox provider like Google Workspace on your additional domains and setting up a few mailboxes for each domain while strictly enforcing a maximum number of emails sent per day per mailbox and having backup mailboxes.</p>
<h4 id="mailbox-providers">Mailbox providers</h4>
<blockquote>
<p><strong>tl;dr:</strong> Use Google Workspace on your additional domains, and Microsoft 365 for enterprises.</p>
</blockquote>
<p>There are many mailbox providers and enthusiasts can host their own mail servers, but the most popular ones are Google and Microsoft. It&#8217;s not recommended to use your own mail server, as it&#8217;s very difficult to set up and maintain, and you will likely have a low deliverability rate because of limited IP address reputation. Instead, you should use a third-party mailbox provider, such as Google Workspace or Microsoft 365, which are both very easy to set up and maintain, and have a high deliverability rate because of their high IP address reputation. Note that this is limited to using their paid business email offerings, not their free consumer email offerings. When in doubt, use Google Workspace, unless your target audience is more often using Microsoft 365, which is more common in the enterprise.</p>
<p>You should also not use a third-party email service provider (ESP) such as SendGrid or AWS SES, as they most often used for transactional emails and marketing emails, and have strict anti-spam policies. They also more likely end up in &#8220;Promotions&#8221; or &#8220;Updated&#8221; folders, whereas emails sent from a trusted mailbox provider are more likely to end up in the &#8220;Primary&#8221; inbox. To a lesser extent, you can consider more affordable providers like Zoho Mail, but they are not as reliable as Google or Microsoft. Some ESPs also offer dedicated IP addresses, but these are not recommended because their IP address reputation is not as good as Google or Microsoft, especially if you&#8217;re starting out.</p>
<p>You can also optimize for having the same mailbox provider as your recipient, as this can also increase your deliverability rate. For example, if you&#8217;re sending an email to someone with an address hosted on Google, you should use Google Workspace to send the email. This is because mailbox providers are more likely to deliver emails from the same provider, and slightly less likely to deliver emails from different providers. You can use the DNS records of the recipient&#8217;s domain to determine which mailbox provider they are using and then use the same provider to send the email, but this is probably overkill for many use cases.</p>
<h4 id="rotating-mailboxes">Rotating mailboxes</h4>
<blockquote>
<p><strong>tl;dr:</strong> Use a few mailboxes for each domain, and have a backup mailbox for each active mailbox.</p>
</blockquote>
<p>It&#8217;s recommended to have at least two mailboxes for each domain, one active and one backup. This is because if your active mailbox is flagged as spam, you can switch to your backup mailbox and continue sending emails. If you wish to, you can also have a backup mailbox provider, but this is not necessary unless you have a very high volume of emails or a high risk of being flagged as spam. If you have a backup mailbox provider, you should use separate domains for each provider instead of using subdomains.</p>
<p>A good rule of thumb is to have one backup mailbox for every 3 active mailboxes. For example, if you have 3 active mailboxes, you should have 1 backup mailbox, and if you have 6 active mailboxes, you should have 2 backup mailboxes. This is because if you have a high volume of emails, you&#8217;re more likely to be flagged as spam, and therefore more likely to need a backup mailbox.</p>
<p>When a mailbox gets a lot of spam complaints, it&#8217;s likely to be flagged as spam by mailbox providers, and therefore you should stop using it immediately. You should also stop using a mailbox if you&#8217;re getting a lot of bouncebacks, as this is also likely to affect your deliverability rate. If you&#8217;re using a backup mailbox, you can switch to it immediately, and if you&#8217;re not, you should create a new mailbox and start warming it up. For the next few weeks, you should continue to warm up your previous mailbox and only restart using it after it has a good sender reputation again.</p>
<h4 id="sending-limits">Sending limits</h4>
<blockquote>
<p><strong>tl;dr:</strong> Strictly enforce a maximum number of emails sent per day per mailbox, starting with 30 emails per day per mailbox, and a maximum of 3 active mailboxes per domain.</p>
</blockquote>
<p>You should strictly enforce a maximum number of emails sent per day per mailbox, and scale up the number of active mailboxes as you want to send more emails. This is because if you send too many emails from a single mailbox, it&#8217;s likely to be flagged as spam by mailbox providers. You should also not have more than a few active mailboxes per domain, so if you want to send more emails, you should use purchase additional domains and create new mailboxes for them.</p>
<p>We recommend a maximum of 30 emails per day per mailbox, and a maximum of 3 active mailboxes per domain when you&#8217;re getting started. This means that you can send up to 90 emails per day per domain. This is a good starting point, and you can increase the number of emails per day per mailbox and the number of active mailboxes per domain as your domain reputation increases. You should also not send more than 1 email every 10-30 minutes per mailbox, because that&#8217;s the average time it takes for a human to write and send an email. The more you can mimic human behavior, the better for your deliverability, so you should aim to send emails at a human-like pace, for example one email every 30 minutes and distributed randomly throughout the day.</p>
<ul>
<li>Start with low volume</li>
<li>Have a consistent volume and don&#8217;t have spikes</li>
<li>Scale up when you have &#8220;message market fit&#8221;</li>
</ul>
<h2 id="email-warming">Email warming</h2>
<blockquote>
<p><strong>tl;dr:</strong> Start with 1 email per day and increase by 2 emails every day until you reach 30 emails per day after two weeks, and then continue to warm up your mailbox while keeping the same maximum number of emails per day, randomizing it.</p>
</blockquote>
<p>Email warming is the process of gradually increasing the number of emails you send and receive from a new mailbox to establish a good sender reputation with mailbox providers. This is done by sending a small number of emails at first, and then gradually increasing the number of emails sent over time, and having a percent of those emails replied to. This makes the mailbox provider believe that the emails sent are worth replying to, and are therefore not likely spam.</p>
<h3 id="always-keep-warming">Always keep warming</h3>
<p>Regardless of whether you have a completely fresh mailbox or one that&#8217;s already been used in the past, it is of paramount importance that you always continue to warm up your mailboxes. This is to maintain your sender reputation and ensure that your emails are delivered to the inbox, and if you have a good reputation today does not necessarily mean that you will have a good reputation tomorrow.</p>
<p>What&#8217;s interesting is that some deliverability experts no longer recommend warming as they suggest that it&#8217;s trivial to detect and therefore disregard warming emails, but until this is of general consensus, it&#8217;s best to continue to warm up your mailboxes.</p>
<h3 id="for-new-mailboxes">For new mailboxes</h3>
<p>Immediately after creating a new mailbox, you should start warming it up. Most email warming tools offer a ramp-up option, rather than a flat number of emails per day, which is recommended. For example, a configuration could be to start from 1 email per day and increase by 2 emails every day (i.e., 1, 3, 5, 7, etc.) until you reach 30 emails per day after two weeks. This is because mailbox providers are more likely to flag a sudden increase in email volume as spam.</p>
<p>In the beginning, you can have a high reply rate of 30-50%, and then drop it a little lower after the initial ramping up period is over. You don&#8217;t want to have a reply rate that&#8217;s too low or too high, because both extremes are likely to be flagged as spam.</p>
<p><strong>tl;dr:</strong></p>
<ul>
<li>Ramping up period: ~14 days</li>
<li>Total maximum emails per day: ~30</li>
<li>Daily increase: 2 ±2</li>
<li>Reply rate: 30-50%</li>
</ul>
<h3 id="randomization-is-important">Randomization is important</h3>
<p>Even if you ramp-up, it&#8217;s preferred to randomize the number of emails sent per day. For example, instead of 1, 3, 5, 7, 9, etc., it could be 1, 2, 5, 6, 9, etc., i.e., keeping the same general pattern but randomizing the number of emails sent per day. This is because mailbox providers could be likely to flag a clear pattern as spam. An easy way to implement this behavior is to randomize the daily increase (±2).</p>
<p>You should also randomize the time of day at which emails are sent, and to which providers. It&#8217;s important to have diversity in providers (e.g., Gmail, Outlook, etc.) and in the time of day (e.g., 9:19 am, 11:37 am, 2:06 pm, etc.). Most email warming tools are configured to do this by default.</p>
<h3 id="after-ramping-up">After ramping up</h3>
<p>After the initial ramping up period, you should continue to warm up your mailbox while keeping the same maximum number of emails per day, randomizing it. For example, send between 25 and 35 emails per day with a reply rate of 30%-40%. This is because you want to maintain your sender reputation as you scale your email volume.</p>
<p><strong>tl;dr:</strong></p>
<ul>
<li>Total maximum emails per day: 30 ±5</li>
<li>Reply rate: 30-40%</li>
</ul>
<h3 id="positive-and-negative-actions">Positive and negative actions</h3>
<p>Positive actions include replies, marking as important, etc., while negative actions include marking as spam, unsubscribing, etc. Since we want to optimize for positive actions, you can employ certain tricks, such as asking a question. Even if it&#8217;s a simple yes/no question, it&#8217;s more likely to get a reply and therefore a positive action.</p>
<h2 id="body-content">Body content</h2>
<blockquote>
<p><strong>tl;dr:</strong> Personalize the messaging, randomize the body content, and avoid spammy words, images, links, and attachments.</p>
</blockquote>
<p>Perhaps the most important part of your email is the body content. This is because mailbox providers are increasingly using machine learning to determine whether an email is spam or not, and the body content is one the most important factors in this decision. And of course, sending the right message to the right person is the most important part of your outbound strategy, if you can&#8217;t control for the right time.</p>
<h3 id="personalize-the-messaging">Personalize the messaging</h3>
<p>Using variables like &#8220;Hi {firstName}&#8221; is no longer enough as recipients are receiving too many outbound emails and can easily tell if it&#8217;s a template. The more personalized your message, the less likely it is to be flagged as spam by recipients which does a lot of damage to your sending reputation. You should either write personalized emails manually, or use an automated tool like that does this for you, for example using a large language model. At the very least, you should personalize the first sentence of your email to make it seem like it&#8217;s not a template.</p>
<h3 id="randomize-the-body-content">Randomize the body content</h3>
<p>Similar to randomizing the number of emails sent per day, you should also randomize the body content of your emails. This is because mailbox providers are likely to flag a clear pattern as spam. In general, the more randomization you have, the better for your deliverability.</p>
<p>One way to easily get started is to use the spintax strategy, where you have multiple variations of the same sentence, and the outbound tool will randomly select one of them. For example, you could have the following variations of the same sentence:</p>
<ul>
<li>I&#8217;m reaching out to you because I saw that you&#8217;re working at {companyName}.</li>
<li>I&#8217;m reaching out to you because I saw online that you&#8217;re working for {companyName}.</li>
<li>I thought of reaching because I saw that you&#8217;re working at {companyName}.</li>
</ul>
<p>If this sounds too easy to be very useful, it&#8217;s because it probably is. These days, it&#8217;s best that you go further than having just a few variations of a few words in the content. Ideally, the entire email will be generated by a large language model like GPT-4, so that it&#8217;s completely unique and can be highly personalized, or written manually.</p>
<h3 id="what-not-to-include">What not to include</h3>
<p>It&#8217;s best to avoid including anything that could be flagged as spam by mailbox providers. Ideally, your email should be as simple as possible, totally in plain text without any fancy HTML. Of course, this is not always possible, so you should try to avoid words and phrases that are likely to be flagged as spam, and include as few images and links as possible.</p>
<h4 id="spammy-words">Spammy words</h4>
<p>Words such as &#8220;risk-free&#8221; and phrases like &#8220;additional income&#8221; are very often found in scam emails, and are therefore likely to be flagged as spam. Please don&#8217;t include Nigerian princes in your email!</p>
<p>Although articles such as <a href="https://www.activecampaign.com/blog/spam-words">188 Spam Words to Avoid: How to Stay Out of Email Spam Folders</a> help you avoid spammy words, it&#8217;s best to use an API that detects spammy words in your email content and warns you about them before you send the email.</p>
<p>Since mailbox providers have dynamic spam word lists and increasingly use machine learning to detect spam, so it&#8217;s possible that copy that works for a certain period of time will stop working later, so keep an eye on your spam rate and adjust your copy accordingly (see <a href="#key-metrics">Key metrics</a> below).</p>
<p>It&#8217;s also recommended to use regular sentence (or lower) case copy, as uppercase copy is often used in spam emails. Similarly, you should avoid using too many exclamation marks.</p>
<h4 id="images">Images</h4>
<p>Images are often used in spam emails, and are therefore likely to be flagged as spam. If you must include an image, make sure it&#8217;s not the only thing in your email, and that it&#8217;s not too large, and ideally not in the first email but in subsequent follow-ups.</p>
<p>You should also include an <code>alt</code> attribute in the image tag, which is good for accessibility but can also help with deliverability. This is because if the image is not loaded, the <code>alt</code> attribute will be displayed instead and the mailbox provider can also use this text in their spam detection algorithm.</p>
<p>Although it&#8217;s good to have alternate text on images, it&#8217;s not a good idea to have text in images. This is because putting text in images used to be a common way to bypass spam filters by fraudsters, so your images should not have a lot of text in them (a little bit like a logo is usually okay).</p>
<p>Tracking pixels are usually 1x1 pixel GIFs which may reduce deliverability, so make sure any &#8220;real&#8221; images you include are larger than 1x1 pixel to avoid being flagged as a tracking pixel. You should also aim to have a short, human-readable URL for the image, and not a long, random URL that looks like a tracking pixel.</p>
<h4 id="links">Links</h4>
<p>Almost all spam emails include links, so including even one link can increase the likelihood of your email being flagged as spam. Of course, sometimes you need a call-to-action link, so try to keep it to one link per email, and ideally not in the first email but in subsequent follow-ups.</p>
<p>It&#8217;s also recommended for the link to be a short, human-readable URL, and not a long, random URL that looks like a tracking pixel. You should also avoid using URL shorteners, as they are often used in spam emails, instead preferring to use your mailbox&#8217;s domain wherever possible. For example, if you&#8217;re sending an email from <a href="mailto:user@examplehq.com">user@examplehq.com</a> when your primary domain is example.com, you should use a link like <a href="https://examplehq.com/your-page">https://examplehq.com/your-page</a>. If you want to track clicks, you can personalize the URL using a short slug, e.g., <a href="https://examplehq.com/your-page/patrick-stripe">https://examplehq.com/your-page/patrick-stripe</a> for an email sent to <a href="mailto:patrick@stripe.com">patrick@stripe.com</a> from <a href="mailto:user@examplehq.com">user@examplehq.com</a>.</p>
<h4 id="attachments">Attachments</h4>
<p>Attachments are in general a bad idea, as they are often used in spam emails, especially executable or compressed files. Although PDFs are frequently used in proposals and presentations, they are able to contain malicious code and connect to the internet, so they are often flagged as spam. You should not include attachments in your first email, and ideally not in subsequent follow-ups either, only sending them when requested by the recipient.</p>
<p>The only exception is sending calendar invites, but these are usually open-in <code>.ics</code> files, so you should still avoid sending them unless requested.</p>
<h3 id="keep-markup-similar-to-human-emails">Keep markup similar to human emails</h3>
<p><em>Coming soon</em></p>
<ul>
<li>Gmail uses divs instead of paragraphs</li>
<li>When quoting text, use exact markup</li>
<li>Popular HTML templates go to promotions</li>
</ul>
<h3 id="opt-out-and-unsubscribe">Opt-out and unsubscribe</h3>
<p><em>Coming soon</em></p>
<ul>
<li>Unsubscribe link is good because people don&#8217;t mark as spam</li>
<li>Asking for &#8220;If you&#8217;re ot interested, let me know&#8221; is better than marking as spam</li>
</ul>
<h3 id="subject-line">Subject line</h3>
<p><em>Coming soon</em></p>
<ul>
<li>Subject copy determines open rate, higher the better for deliverability</li>
<li>Iterate, A/B test, keep an eye on open rate</li>
</ul>
<h2 id="open-and-click-tracking">Open and click tracking</h2>
<p><em>Coming soon</em></p>
<h2 id="right-people-right-time">Right people, right time</h2>
<p><em>Coming soon</em></p>
<h3 id="targeting">Targeting</h3>
<ul>
<li>It&#8217;s not good when people mark you as spam</li>
<li>If you reach out to the wrong people, they will mark you as spam</li>
<li>Clearly define your target audience</li>
</ul>
<p><em>Coming soon</em></p>
<h4 id="buying-intent">Buying intent</h4>
<p><em>Coming soon</em></p>
<ul>
<li>Spam traps exist when you buy email lists</li>
</ul>
<h4 id="email-verification">Email verification</h4>
<p><em>Coming soon</em></p>
<h3 id="scheduling">Scheduling</h3>
<p><em>Coming soon</em></p>
<h4 id="days-and-timezones">Days and timezones</h4>
<p><em>Coming soon</em></p>
<h4 id="randomization">Randomization</h4>
<p><em>Coming soon</em></p>
<h2 id="key-metrics">Key metrics</h2>
<p><em>Coming soon</em></p>
<ul>
<li>Open rate, click rate, click-to-open rate</li>
<li>Replies, bouncebacks, spam complaints, unsubscribes</li>
<li>Inbox placement rate, spam placement rate, missing rate</li>
<li>Spam traps, blocklists</li>
<li>Google Postmaster Tools</li>
</ul>
` }} />
      </section>
      <Footer />
    </>
  )
}
