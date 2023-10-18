import { Analytics } from '@vercel/analytics/react'
import clsx from 'clsx'
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Deliverability Guide',
  description:
    'Follow the open-source email Deliverability Guide to ensure that your outbound emails do not end up in spam.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
      )}
    >
      <head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700&display=swap"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image" content="/social.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
        <Script src="https://gumroad.com/js/gumroad.js"></Script>
      </body>
    </html>
  )
}
