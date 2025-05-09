"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"

export function PageTransition({ children }) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)
  const [content, setContent] = useState(children)
  const { theme } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    root.classList.add("theme-transition")
    setIsAnimating(true)

    const animationTimeout = setTimeout(() => {
      setContent(children)
      setIsAnimating(false)
      
      // Remove transition prevention after content update
      requestAnimationFrame(() => {
        root.classList.remove("theme-transition")
      })
    }, 300)

    return () => {
      clearTimeout(animationTimeout)
      root.classList.remove("theme-transition")
    }
  }, [pathname, children])

  // Enhanced theme transition handling
  useEffect(() => {
    if (!theme) return
    const root = document.documentElement
    
    const applyTheme = () => {
      if (theme === "dark") {
        root.classList.add("dark")
        root.removeAttribute("data-theme")
      } else if (theme !== "system") {
        root.classList.remove("dark")
        root.setAttribute("data-theme", theme)
      } else {
        root.classList.remove("dark")
        root.removeAttribute("data-theme")
      }
    }

    if (isAnimating) {
      root.classList.add("theme-transition")
      requestAnimationFrame(() => {
        applyTheme()
        requestAnimationFrame(() => {
          root.classList.remove("theme-transition")
        })
      })
    } else {
      applyTheme()
    }
  }, [theme, isAnimating])

  return (
    <div 
      className={`page-transition-wrapper transition-all duration-300 ease-in-out transform ${
        isAnimating 
          ? "opacity-0 translate-y-1" 
          : "opacity-100 translate-y-0"
      }`}
    >
      {content}
    </div>
  )
}
