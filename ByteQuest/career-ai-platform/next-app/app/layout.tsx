import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CB-AI - Career-Based AI for All',
  description: 'Intelligent career guidance platform combining psychometric assessment, real-time labor market intelligence, and adaptive learning roadmaps.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
