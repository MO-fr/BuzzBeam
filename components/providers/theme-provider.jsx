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

  // Apply theme changes with smooth transitions
  useEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    
    // Add transition class before making changes
    root.classList.add("theme-transition")

    // Clean up previous theme state
    root.classList.remove("dark", "theme-tiktok", "theme-instagram", "theme-twitter")
    root.removeAttribute("data-theme")

    // Apply new theme
    switch (theme) {
      case "dark":
        root.classList.add("dark")
        break
      case "tiktok":
      case "instagram":
      case "twitter":
        root.setAttribute("data-theme", theme)
        // Add platform-specific theme class for additional styling
        root.classList.add(`theme-${theme}`)
        break
      default:
        root.classList.add("dark")
    }

    // Remove transition class after changes
    const transitionTimeout = setTimeout(() => {
      // Use requestAnimationFrame to ensure transitions are applied
      requestAnimationFrame(() => {
        root.classList.remove("theme-transition")
      })
    }, 150) // Allow time for transitions to complete

    return () => clearTimeout(transitionTimeout)
  }, [theme, mounted])

  // Initialize theme from localStorage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey)
    const validThemes = ["dark", "tiktok", "instagram", "twitter"]
    if (savedTheme && validThemes.includes(savedTheme)) {
      setTheme(savedTheme)
    } else {
      setTheme(defaultTheme)
      localStorage.setItem(storageKey, defaultTheme)
    }
    setMounted(true)
  }, [storageKey, defaultTheme])

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
      value={{ ...props.value, theme }}
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
