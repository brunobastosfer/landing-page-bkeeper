import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Bkeeper Ads',
  description: 'Marketing digital, tráfego pago e programação. Transformamos sua empresa com tecnologia e estratégia.',
  generator: 'Bkeeper Ads',
  keywords: ['marketing digital', 'tráfego pago', 'programação', 'Google Ads', 'Meta Ads', 'desenvolvimento de software', 'visão computacional', 'realidade aumentada'],
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
