'use client'

import { SessionProvider } from 'next-auth/react'
import Sidebar from '@/components/layout/Sidebar'
import DemoBanner from '@/components/DemoBanner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <DemoBanner />
          {children}
        </div>
      </div>
    </SessionProvider>
  )
}
