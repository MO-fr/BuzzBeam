"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Provider component that wraps the application with NextAuth session context
 * This ensures authentication state is available throughout the app
 */
export function NextAuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}