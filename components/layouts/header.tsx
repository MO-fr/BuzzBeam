"use client"

import { useSession, signOut } from "next-auth/react"
import { Search, Bell } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/features/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { data: session } = useSession()
  const { theme } = useTheme()

  const getThemeClasses = () => {
    switch (theme) {
      case "twitter":
        return {
          headerBg: "bg-white",
          borderColor: "border-gray-200",
          buttonBorder: "border-[#1DA1F2]",
          buttonText: "text-[#1DA1F2]",
          avatarBorder: "border-[#1DA1F2]",
          dropdownHeaderBg: "bg-[#1DA1F2]",
          menuItemHover: "hover:bg-blue-50 focus:bg-blue-50",
        }
      default:
        return {
          headerBg: "bg-background",
          borderColor: "border-border",
          buttonBorder: "border-primary",
          buttonText: "text-primary",
          avatarBorder: "border-primary",
          dropdownHeaderBg: "bg-gradient-to-r from-purple-600 to-blue-500",
          menuItemHover: "hover:bg-accent focus:bg-accent",
        }
    }
  }

  const themeClasses = getThemeClasses()
  
  const getInitials = (name?: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className={`sticky top-0 z-40 flex h-16 w-full items-center border-b backdrop-blur-sm ${themeClasses.headerBg} ${themeClasses.borderColor}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <form className="hidden md:flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 md:w-[240px] lg:w-[300px]"
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
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`h-9 w-9 rounded-full border-2 ${themeClasses.avatarBorder} p-0.5 transition-all duration-300 hover:scale-105`}
                >
                  <Avatar className="h-full w-full">
                    <AvatarImage src={session.user.image || "/placeholder.svg"} alt={session.user.name || "User"} />
                    <AvatarFallback className="bg-primary text-white">
                      {getInitials(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 overflow-hidden rounded-xl dropdown-backdrop animate-in slide-in-from-top-2 duration-300"
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
                  <DropdownMenuSeparator />
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
    </header>
  )
}
