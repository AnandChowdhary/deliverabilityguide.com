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
          Send email that people want and keep the infrastructure behind it
          reliable. Learn how authentication, recipient expectations, and
          receiver feedback work together. No tool can guarantee inbox placement.
        </p>
        <p className="mt-4">
          This living handbook covers the work behind email deliverability,
          including:
        </p>
        <ul role="list" className="mt-8 space-y-3">
          {[
            'How to authenticate domains and choose sending infrastructure',
            'How to ramp up real, permission-based sending',
            'How to create clear, accessible content and easy unsubscribe flows',
            'What open and click tracking can and cannot tell you',
            'Targeting and segmentation strategies',
            'How to diagnose problems using receiver feedback and meaningful metrics',
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
