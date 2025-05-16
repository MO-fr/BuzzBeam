import { Inter } from "next/font/google"
import { NextAuthProvider } from "@/components/providers/next-auth-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AppShell } from "@/components/layouts/app-shell"
import { ProfileDebugger } from "@/components/features/profile-debugger"
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
      </head>      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider defaultTheme="dark" enableSystem={false}>
            <AppShell>{children}</AppShell>
            {/* Debug tool to help with profile image issues */}
            {/* Only include ProfileDebugger in development */}
            {process.env.NODE_ENV === 'development' && <ProfileDebugger />}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
