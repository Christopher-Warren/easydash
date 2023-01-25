// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const onLoginPage = req.url.includes("/login");

  // @TODO Make 13-14 a function
  if (onLoginPage && !token) return NextResponse.next();
  if (!token)
    return NextResponse.redirect(new URL("/dashboard/login", req.url));

  const JWT_SECRET: string | undefined = process.env.JWT_SECRET!;
  const secret = new TextEncoder().encode(JWT_SECRET);

  const verified = await jwtVerify(token, secret);

  console.log(verified);
  if (onLoginPage && verified)
    return NextResponse.redirect(new URL("/dashboard", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
