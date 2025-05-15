"use client"

import { useSession, signOut } from "next-auth/react"
import { Search, Bell, User } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { data: session, status } = useSession()
  const { theme } = useTheme()

  const getThemeClasses = () => {
    const baseClasses = {      buttonBorder: "border-primary",
      buttonText: "text-primary font-medium",
      avatarBorder: "border-primary/40",
      menuItemHover: "hover:bg-accent focus:bg-accent",
      dropdownHeaderBg: "bg-gradient-to-r from-purple-600 to-blue-500"
    }

    switch (theme) {
      case "tiktok":
        return {
          ...baseClasses,
          buttonBorder: "border-[#FF0050]",
          buttonText: "text-[#FF0050]",
          avatarBorder: "border-[#FF0050]/20",
          dropdownHeaderBg: "bg-gradient-to-r from-[#FF0050] to-[#00F2EA]",
          menuItemHover: "hover:bg-gray-900 focus:bg-gray-900",
        }
      case "instagram":
        return {
          ...baseClasses,
          buttonBorder: "border-pink-500",
          buttonText: "text-pink-500",
          avatarBorder: "border-pink-500/20",
          dropdownHeaderBg: "bg-gradient-to-r from-yellow-500 via-pink-600 to-purple-700",
          menuItemHover: "hover:bg-gray-100 focus:bg-gray-100",
        }
      case "twitter":
        return {
          ...baseClasses,
          buttonBorder: "border-[#1DA1F2]",
          buttonText: "text-[#1DA1F2]",
          avatarBorder: "border-[#1DA1F2]/20",
          dropdownHeaderBg: "bg-[#1DA1F2]",
          menuItemHover: "hover:bg-blue-50 focus:bg-blue-50",
        }
      default:
        return baseClasses
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <div className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="flex h-16 items-center px-4">
        <div className="hidden md:block md:w-64 lg:w-72" />
        <div className="flex flex-1 items-center justify-between gap-4 md:gap-6">
          <form className="flex-1 md:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-background/50 pl-8 md:w-[240px] lg:w-[300px] focus:bg-background"
              />
            </div>
          </form>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`relative button-pop ${themeClasses.buttonText}`}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-600" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ThemeToggle />
            {status === "authenticated" && session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>                  <Button
                    className={`group relative h-10 w-10 rounded-full overflow-hidden border-[3px] ${themeClasses.avatarBorder} p-0 transition-all duration-300 hover:scale-105 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                    aria-label="User menu"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-background/60 to-background/30 transition-opacity group-hover:opacity-50" />
                    <Avatar className="h-full w-full font-semibold">
                      <AvatarImage 
                        src={session.user.image || "/placeholder-user.jpg"}
                        alt={session.user.name || "User avatar"}
                        className="aspect-square object-cover"
                        referrerPolicy="no-referrer"
                        loading="eager"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-user.jpg"
                        }}
                      />
                      <AvatarFallback 
                        className="bg-accent/10 text-accent-foreground"
                        delayMs={200}
                      >
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 overflow-hidden rounded-xl border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75"
                >
                  <div className={`${themeClasses.dropdownHeaderBg} px-4 py-3 text-white`}>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{session.user.name}</p>
                        <p className="text-xs opacity-75">{session.user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                  </div>
                  <div className="p-2">
                    <DropdownMenuItem
                      className={`cursor-pointer rounded-md px-3 py-2.5 ${themeClasses.menuItemHover} transition-colors duration-200`}
                      onClick={() => window.location.href = '/profile'}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`cursor-pointer rounded-md px-3 py-2.5 ${themeClasses.menuItemHover} transition-colors duration-200`}
                      onClick={() => window.location.href = '/settings'}
                    >
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="opacity-40" />
                    <DropdownMenuItem
                      className={`cursor-pointer rounded-md px-3 py-2.5 ${themeClasses.menuItemHover} transition-colors duration-200`}
                      onClick={() => signOut()}
                    >
                      Sign out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="button-pop"
                onClick={() => window.location.href = '/auth/login'}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
