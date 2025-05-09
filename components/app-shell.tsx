"use client"

import { ReactNode } from "react"
import { MobileNav } from "@/components/mobile-nav"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}