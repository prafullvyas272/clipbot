import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🚫 Skip middleware for API routes & static files
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // ✅ Public routes
  const publicRoutes = ["/", "/login", "/register"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Check NextAuth session token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ✅ Or check custom JWT cookie
  const accessToken = req.cookies.get("access_token")?.value;
  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.JWT_SECRET || "secret");
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 🚫 If no session & not already on login → redirect
  if (!token && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
