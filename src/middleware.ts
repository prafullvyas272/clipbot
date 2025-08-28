import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🚫 Skip auth checks for NextAuth routes and static files
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // ✅ Define public routes
  const publicRoutes = ["/", "/login", "/register"];
  const isPublic = publicRoutes.includes(pathname);

  if (isPublic) {
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

  // next-auth.callback-url, next-auth.csrf-token, next-auth.session-token

  // 🚫 If no session and not already on login → redirect
  if (!token && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
