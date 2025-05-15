"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/layouts/mobile-nav"
import { Header } from "@/components/layouts/header"
import { useTheme } from "@/components/providers/theme-provider"
import { PageTransition } from "@/components/layouts/page-transition"
import { Home, BarChart3, MessageSquare, User, Settings } from "lucide-react"

export const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { theme } = useTheme()

  const getThemeClasses = () => {
    switch (theme) {
      case "twitter":
        return {
          sidebarBg: "bg-background",
          navItemActive: "bg-[#1DA1F2] text-white",
          navItemHover: "hover:bg-blue-50 hover:text-[#1DA1F2]",
          logoColor: "text-[#1DA1F2]",
          borderColor: "border-gray-200",
        }
      default:
        return {
          sidebarBg: "bg-background",
          navItemActive: "bg-accent text-accent-foreground",
          navItemHover: "hover:bg-accent hover:text-accent-foreground",
          logoColor: "text-foreground",
          borderColor: "border-border",
        }
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className={`fixed hidden h-screen w-64 flex-col border-r lg:w-72 md:flex ${themeClasses.sidebarBg} ${themeClasses.borderColor}`}>
        <div className="flex h-16 items-center border-b px-6">
          <Link
            href="/"
            className={`flex items-center gap-3 font-semibold text-lg ${themeClasses.logoColor} transition-colors duration-300 hover:opacity-80`}
          >
            <Image 
              src="/New_Buzz_Beam_logo-removebg.png" 
              alt="Buzz Beam Logo" 
              width={80}
              height={80}
              className="h-20 w-20"
              priority
            />
            <span>Buzz Beam</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-6">
          <div className="space-y-6 px-3">
            <div>
              <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                Menu
              </h2>
              <div className="space-y-1.5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      `group flex items-center gap-x-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-300 ${themeClasses.navItemHover}`,
                      pathname === item.href ? themeClasses.navItemActive : "text-muted-foreground"
                    )}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        pathname === item.href ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Main Content */}
      <main className="flex-1 md:pl-64 lg:pl-72">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
    </div>
  )
}