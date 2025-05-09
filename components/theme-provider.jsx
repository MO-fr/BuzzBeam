"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

const ThemeProviderContext = createContext({
  theme: "dark",
  setTheme: () => {},
  mounted: false,
})

export function ThemeProvider({ children, defaultTheme = "dark", storageKey = "theme", ...props }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    
    root.classList.add("theme-transition")
    root.classList.remove("dark")
    root.removeAttribute("data-theme")

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.setAttribute("data-theme", theme)
    }

    requestAnimationFrame(() => {
      root.classList.remove("theme-transition")
    })
  }, [theme, mounted])

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey)
    const validThemes = ["dark", "tiktok", "instagram", "twitter"]
    if (savedTheme && validThemes.includes(savedTheme)) {
      setTheme(savedTheme)
    } else {
      setTheme("dark")
      localStorage.setItem(storageKey, "dark")
    }
    setMounted(true)
  }, [storageKey])

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
    mounted,
  }

  return (
    <NextThemesProvider
      {...props}
      defaultTheme={defaultTheme}
      enableSystem={false}
      attribute="class"
    >
      <ThemeProviderContext.Provider value={value}>
        {children}
      </ThemeProviderContext.Provider>
    </NextThemesProvider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
