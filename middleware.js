import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
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
    "/",
    "/analytics/:path*",
    "/messages/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};