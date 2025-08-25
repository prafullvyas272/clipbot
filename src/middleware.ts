import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("🔑 Session token:", token);

  const res = NextResponse.next();

  if (token) {
    // ✅ Save something in a cookie (e.g., user id or flag)
    res.cookies.set("auth", "true", {
      httpOnly: true,       // not accessible via JS
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (token.email) {
      res.cookies.set("userEmail", token.email, {
        httpOnly: false, // if you want to access from frontend JS
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }
  } else {
    // if no session → clear cookies
    res.cookies.set("auth", "false");
    res.cookies.delete("userEmail");
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
