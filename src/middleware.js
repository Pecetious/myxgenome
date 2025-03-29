import { NextResponse } from "next/server";

const protectedRoutes = ["/test"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const cookie = await req.cookies.get("token");
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/test", "/login", "/signup"],
};
