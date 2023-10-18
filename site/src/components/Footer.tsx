import { GridPattern } from '@/components/GridPattern'

export function Footer() {
  return (
    <footer className="relative pb-20 pt-5 sm:pb-32 sm:pt-14">
      <div className="absolute inset-x-0 top-0 h-32 text-slate-900/10 [mask-image:linear-gradient(white,transparent)]">
        <GridPattern x="50%" />
      </div>
      <div className="relative mx-auto max-w-xl space-y-4 text-center text-sm text-slate-600">
        <p>
          This work is licensed under a{' '}
          <a
            className="font-medium text-slate-800"
            target="_blank"
            href="https://github.com/AnandChowdhary/deliverabilityguide.com/blob/main/LICENSE"
          >
            Creative Commons Attribution Share Alike 4.0 International
          </a>{' '}
          by{' '}
          <a
            className="font-medium text-slate-800"
            target="_blank"
            href="https://anandchowdhary.com"
          >
            Anand Chowdhary
          </a>
          .
        </p>
        <p>
          This page is open source on{' '}
          <a
            className="font-medium text-slate-800"
            target="_blank"
            href="https://github.com/AnandChowdhary/deliverabilityguide.com"
          >
            GitHub
          </a>{' '}
          as a living document. Contributions welcome!
        </p>
      </div>
    </footer>
  )
}
