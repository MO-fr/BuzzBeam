import { Inter } from "next/font/google"
import { NextAuthProvider } from "@/components/providers/next-auth-provider"
import { ThemeProvider } from "@/components/theme-provider.jsx"
import { AppShell } from "@/components/app-shell.jsx"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Buzz Beam",
  description: "Monitor and analyze your social media performance",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        try {
          const theme = localStorage.getItem('theme') || 'dark';
          document.documentElement.classList.remove('light');
          
          if (theme === 'dark' || !theme) {
            document.documentElement.classList.add('dark');
          } else if (theme !== 'system') {
            document.documentElement.setAttribute('data-theme', theme);
          }
          
          // Add a class to prevent transition flashes
          document.documentElement.classList.add('theme-transition-ready');
        } catch (e) {
          document.documentElement.classList.add('dark');
        }
      })();
    `,
          }}
        />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider defaultTheme="dark" enableSystem={false}>
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
