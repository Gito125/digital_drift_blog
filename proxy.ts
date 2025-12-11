/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Next.js 16 Proxy for route protection
 * Protects admin routes and validates user sessions
 */
export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // @ts-ignore
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect non-admins to home
    }
  }

  // Redirect authenticated users from login page
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
