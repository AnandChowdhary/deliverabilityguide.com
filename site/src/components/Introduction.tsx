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
          This aims to be the world’s most comprehensive email deliverability
          guide. And it’s free.
        </p>
        <p className="mt-4">
          If you’re sending outbound emails, you should follow this checklist to
          ensure that your emails are delivered to the inbox and not marked as
          spam. This checklist is based on the experience of sending thousands
          of outbound emails.
        </p>
        <p className="mt-4">
          You’ll learn everything there is to know about email deliverability,
          including:
        </p>
        <ul role="list" className="mt-8 space-y-3">
          {[
            'How to set up custom domains and mailboxes',
            'When and how to do email warming',
            'How to write a good subject and body content, including prompts for LLMs like GPT-4',
            'How to set up open and click tracking with minimal deliverability impact',
            'Targeting and segmentation strategies',
            'Understading key metrics and email analytics',
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
