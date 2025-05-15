"use client"

import { useEffect, useState } from "react"
import { Moon } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const themeConfig = {
  dark: {
    icon: <Moon className="h-4 w-4 text-blue-300" />,
    bgClass: "bg-gradient-to-br from-indigo-900 via-gray-900 to-black",
    label: "Dark"
  },
  tiktok: {
    icon: <div className="h-4 w-4 flex items-center justify-center text-white font-bold text-xs">T</div>,
    bgClass: "bg-gradient-to-r from-[hsl(341,95%,32%)] to-[hsl(180,100%,47%)]",
    label: "TikTok"
  },
  instagram: {
    icon: <div className="h-4 w-4 flex items-center justify-center text-white font-bold text-xs">I</div>,
    bgClass: "bg-gradient-to-tr from-[hsl(45,100%,50%)] via-[hsl(330,100%,50%)] to-[hsl(280,100%,45%)]",
    label: "Insta"
  },
  twitter: {
    icon: <div className="h-4 w-4 flex items-center justify-center text-white font-bold text-xs">X</div>,
    bgClass: "bg-[hsl(203,89%,53%)]",
    label: "Twitter"
  }
}

export function ThemeToggle() {
  const { setTheme, theme, mounted } = useTheme()
  const [activeTheme, setActiveTheme] = useState(theme)

  useEffect(() => {
    if (mounted) {
      setActiveTheme(theme)
    }
  }, [theme, mounted])

  const currentTheme = themeConfig[activeTheme] || themeConfig.dark

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`h-9 w-9 rounded-full border-2 p-0.5 transition-all duration-300 ${currentTheme.bgClass}`}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
              {currentTheme.icon}
              <span className="sr-only">Toggle theme</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-36 overflow-hidden rounded-xl dropdown-backdrop animate-in slide-in-from-top-2 duration-300"
        >
          <div className="p-1 space-y-1">
            {Object.entries(themeConfig).map(([key, config]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setTheme(key)}
                className={`flex cursor-pointer items-center gap-2 px-3 py-2.5 focus:bg-accent/20 rounded-md transition-colors duration-200 ${
                  activeTheme === key ? "bg-accent/20" : ""
                }`}
              >
                <div className={`flex h-6 w-6 items-center justify-center rounded-full ${config.bgClass}`}>
                  {config.icon}
                </div>
                <span>{config.label}</span>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
      </span>
    </div>
  )
}
