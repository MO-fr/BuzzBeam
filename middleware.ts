import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Handle the root path specially
    if (req.nextUrl.pathname === "/") {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    // If the user is not authenticated and trying to access protected routes
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/login or auth/signup (auth pages)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|auth/login|auth/signup).*)",
  ],
};
