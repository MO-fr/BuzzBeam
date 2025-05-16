"use client"

import { useSession, signOut } from "next-auth/react"
import { useProfileImage } from "@/hooks/use-profile-image"
import Image from "next/image"
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
  const { profileImage } = useProfileImage()

  const getThemeClasses = () => {
    switch (theme) {
      case "tiktok":
        return {
          headerBg: "bg-black",
          borderColor: "border-gray-800",
          buttonBorder: "border-[#FF0050]",
          buttonText: "text-[#FF0050]",
          avatarBorder: "border-[#FF0050]",
          dropdownHeaderBg: "bg-gradient-to-r from-[#FF0050] to-[#00F2EA]",
          menuItemHover: "hover:bg-gray-900 focus:bg-gray-900",
        }
      case "instagram":
        return {
          headerBg: "bg-white",
          borderColor: "border-gray-200",
          buttonBorder: "border-pink-500",
          buttonText: "text-pink-500",
          avatarBorder: "border-pink-500",
          dropdownHeaderBg: "bg-gradient-to-r from-yellow-500 via-pink-600 to-purple-700",
          menuItemHover: "hover:bg-pink-50 hover:text-pink-500 focus:bg-pink-50 focus:text-pink-500",
        }
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

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 w-full items-center border-b px-4 md:px-6 ${themeClasses.headerBg} ${themeClasses.borderColor}`}
    >
      <div className="hidden md:block md:w-64 lg:w-72" />
      <div className="flex flex-1 items-center gap-4 md:gap-6">
        <form className="flex-1 md:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
                    <AvatarImage asChild>                      <Image
                        src={profileImage || session?.user?.image || "/placeholder-user.jpg"}
                        alt={session?.user?.name || "User"}
                        width={36}
                        height={36}
                        className="aspect-square object-cover"
                        priority
                        // Force remount on src change with key
                        key={profileImage || session?.user?.image || "placeholder"}
                      />
                    </AvatarImage>
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
