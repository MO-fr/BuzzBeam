"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/features/theme-toggle"
import { navItems } from "@/components/layouts/app-shell"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [open])

  // Close menu on navigation
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [open])

  const navItemClasses = (isActive: boolean) => cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
    "translate-x-0 opacity-100 hover:bg-accent/50",
    isActive 
      ? "bg-accent text-accent-foreground font-medium" 
      : "text-muted-foreground hover:text-accent-foreground"
  )

  // Only render on mobile devices
  if (!isMobile) return null

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-40 md:hidden hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open navigation menu"
          data-mobile-trigger
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="fixed top-0 w-[280px] border-r p-0 shadow-lg"
        data-mobile-nav
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            onClick={() => setOpen(false)}
          >
            <div className="relative h-8 w-8">
              <Image 
                src="/New_Buzz_Beam_logo-removebg.png" 
                alt="Buzz Beam Logo" 
                fill
                className="object-contain"
                sizes="32px"
                priority
              />
            </div>
            <span className="font-semibold text-lg">Buzz Beam</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="rounded-full hover:bg-accent/50"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>        <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">
          <nav className="space-y-1 p-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={navItemClasses(pathname === item.href)}
                onClick={() => setOpen(false)}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                }}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  pathname === item.href ? "text-accent-foreground" : "text-muted-foreground"
                )} />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}