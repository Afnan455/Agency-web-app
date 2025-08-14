import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/lib/providers'

export const metadata: Metadata = {
  title: 'Agency-web-app',
  description: 'Professional agency providing comprehensive legal consultation services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
