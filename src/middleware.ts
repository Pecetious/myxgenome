import { NextResponse } from "next/server";
import Negotiator from "negotiator";  // Tarayıcı dilini almak için kullanıyoruz

const protectedRoutes = ["/test", "/payment"];
const publicRoutes = ["/login", "/signup", "/"];

// Desteklenen diller
const locales = ['en', 'tr']; 
const defaultLocale = 'tr'; // Varsayılan dil

export default function middleware(req: any) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Tarayıcı dilini almak için Negotiator'ı kullanıyoruz
  const negotiator = new Negotiator({ headers: req.headers });
  const languages = negotiator.languages(); // Tarayıcıdaki diller
  const userLocale = languages.find((lang: string) => locales.includes(lang)) || defaultLocale; // Tarayıcı dilini veya varsayılan dili seçiyoruz

  // URL'deki dil parametresi kontrolü
  const url = req.nextUrl.clone();

  // Eğer URL'de dil parametresi yoksa, varsayılan olarak Türkçe'ye yönlendiriyoruz
  if (url.pathname === '/') {
    url.pathname = `/${userLocale}${url.pathname}`;  // Varsayılan dilde yönlendirme yapıyoruz
    return NextResponse.redirect(url);
  }

  // Eğer URL'de dil parametresi yoksa ve kullanıcı dilini manuel olarak giriyorsa yönlendirme yapıyoruz
  if (!url.pathname.startsWith(`/${userLocale}`) && !locales.some(locale => url.pathname.startsWith(`/${locale}`))) {
    url.pathname = `/${userLocale}${url.pathname}`;  // Kullanıcının diline göre URL'yi güncelliyoruz
    return NextResponse.redirect(url);
  }

  // Giriş kontrolü: Eğer protectedRoute ve token yoksa login'e yönlendir
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c: any) => c.split("="))
  );
  const token = cookies["token"];

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  // Public sayfalara giriş yapmış kullanıcıyı yönlendirme
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/test", "/login", "/signup", "/payment", "/"], // `/` için de yönlendirme ekledik
};
