import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ISMS — Equity Bank Rwanda PLC',
  description: 'Information Security Management System for Equity Bank Rwanda PLC | ISO 27001:2022 Compliant | AUCA Internship Project 2026',
  keywords: 'information security, ISMS, ISO 27001, banking security, Equity Bank Rwanda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
