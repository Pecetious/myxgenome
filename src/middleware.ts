import { NextResponse } from "next/server";

const protectedRoutes = ["/test", "/payment"];
const publicRoutes = ["/login", "/signup", "/"];

export default function middleware(req: any) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Çerezleri düzgün parse et
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c: any) => c.split("="))
  );
  const token = cookies["token"];

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/test", "/login", "/signup", "/payment"],
};
