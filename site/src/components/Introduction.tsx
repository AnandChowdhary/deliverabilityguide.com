import { CheckIcon } from '@/components/CheckIcon'
import { Container } from '@/components/Container'

export function Introduction() {
  return (
    <section
      id="introduction"
      aria-label="Introduction"
      className="pb-16 pt-20 sm:pb-20 md:pt-36 lg:py-32"
    >
      <Container className="text-lg tracking-tight text-slate-700">
        <p className="font-display text-4xl font-bold tracking-tight text-slate-900">
          This aims to be the world’s most comprehensive deliverability
          guide for cold outbound sales. And it’s free.
        </p>
        <p className="mt-4">
          If you’re sending outbound sales emails, this checklist draws on
          the experience of sending tons of outbound emails to help you reach
          the inbox. It combines practical judgment with technical guidance
          and keeps evolving as we learn.
        </p>
        <p className="mt-4">
          This living handbook covers cold-email deliverability,
          including:
        </p>
        <ul role="list" className="mt-8 space-y-3">
          {[
            'How to set up and authenticate outbound domains and mailboxes',
            'When and how to warm up your outbound mailboxes',
            'How to write relevant sales emails and make opting out easy',
            'What open and click tracking can and cannot tell you',
            'Prospect targeting, address verification, and follow-up scheduling',
            'How to diagnose delivery issues and measure positive replies and meetings',
          ].map((feature) => (
            <li key={feature} className="flex">
              <CheckIcon className="h-8 w-8 flex-none fill-slate-500" />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          To ensure that everyone has access to this information, I’ve made this
          guide free and open source. If you find this useful, you can purchase
          a{' '}
          <a
            href="https://anandchowdhary.gumroad.com/l/deliverability-guide"
            className="font-medium"
          >
            paid copy for $5 to support the project
          </a>
          .
        </p>
      </Container>
    </section>
  )
}
