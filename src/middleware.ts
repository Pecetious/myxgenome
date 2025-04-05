import { NextResponse } from "next/server";

// Korunan ve açık rotalar
const protectedRoutes = [
  "/en/test",
  "/tr/test",
  "/en/payment",
  "/tr/payment",
  "/en/callback",
  "/tr/callback",
  "/en/reports",
  "/tr/reports",
];

const publicRoutes = ["/login", "/signup", "/"]; // Açık sayfalar

const locales = ["en", "tr"];
const defaultLocale = "tr"; // Varsayılan dil

// Cookie'den dil bilgisini al
const getLocaleFromCookie = (cookieHeader: string) => {
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c: any) => c.split("="))
  );
  return cookies["access-locale"] || defaultLocale; // Cookie yoksa varsayılan dil
};

export default function middleware(req: any) {
  const cookieHeader = req.headers.get("cookie") || "";
  const userLocale = getLocaleFromCookie(cookieHeader);
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c: any) => c.split("="))
  );
  const path = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  // console.log("Başlangıç - URL: ", path); // İlk URL'yi logluyoruz

  // URL'de dil parametresi olup olmadığını kontrol ediyoruz
  const urlHasLocale = locales.some((locale) => path.startsWith(`/${locale}/`));
  /*   console.log(
    `URL'de dil parametresi var mı? ${urlHasLocale ? "Evet" : "Hayır"}`
  ); */

  // Eğer URL'de dil parametresi yoksa, dil parametresini ekliyoruz
  if (!urlHasLocale) {
    url.pathname = `/${userLocale}${url.pathname}`; // Dil parametresini ekliyoruz
    console.log(`Dil parametresi ekleniyor: ${url.pathname}`);

    // Dil zaten doğruysa yönlendirme yapılmasın (sonsuz döngüden kaçınmak için)
    if (path === url.pathname) {
      console.log("Dil zaten doğru, yönlendirme yapılmıyor.");
      return NextResponse.next(); // Dil zaten doğru, devam et
    }

    // console.log(`Dil parametresi eklenmiş yeni URL: ${url.pathname}`);

    // Token ve Protected rota kontrolü
    const isProtectedRoute = protectedRoutes.some((route) =>
      url.pathname.startsWith(route)
    );
    /*   console.log(
      `Korunan rota kontrolü: ${isProtectedRoute ? "Evet" : "Hayır"}`
    ); */

    if (isProtectedRoute && !cookies["token"]) {
      /* console.log("Token yok, login sayfasına yönlendiriliyor..."); */
      return NextResponse.redirect(
        new URL(`/${userLocale}/login`, req.nextUrl.origin)
      );
    }

    // Eğer açık sayfada giriş yapmış kullanıcı varsa, ana sayfaya yönlendirilir
    const isPublicRoute = publicRoutes.some((route) =>
      url.pathname.startsWith(route)
    );
    if (isPublicRoute && cookies["token"]) {
      /* console.log("Kullanıcı giriş yapmış, ana sayfaya yönlendiriliyor..."); */
      return NextResponse.redirect(
        new URL(`/${userLocale}`, req.nextUrl.origin)
      );
    }

    return NextResponse.redirect(url); // Yönlendirme yapılacak URL'yi döndür
  }

  console.log(
    "Dil parametresi zaten mevcut, dinamik rota kontrolüne geçiliyor..."
  );

  // Dinamik rotalar için dil parametresi eklenmesi
  const dynamicRoutes = ["/callback", "/reports"];
  if (dynamicRoutes.some((route) => path.startsWith(route))) {
    if (!path.startsWith(`/${userLocale}`)) {
      /* console.log(`Dinamik rota dil eksik, yönlendiriliyor: ${url.pathname}`); */
      url.pathname = `/${userLocale}${url.pathname}`;
      return NextResponse.redirect(url);
    }
  }

  // Korunan sayfalara erişimde token kontrolü yapıyoruz
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  /* console.log(
    `Korunan rota kontrolü (token kontrolü): ${
      isProtectedRoute ? "Evet" : "Hayır"
    }`
  ); */

  if (isProtectedRoute && !cookies["token"]) {
    /* console.log("Token yok, login sayfasına yönlendiriliyor..."); */
    return NextResponse.redirect(
      new URL(`/${userLocale}/login`, req.nextUrl.origin)
    );
  }

  // Eğer yönlendirme yapılmazsa, bir sonraki işlemi gerçekleştirin
  /*  console.log("Yönlendirme yapılmıyor, isteğe devam ediliyor."); */
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/en/test", // Korunan rota
    "/tr/test", // Korunan rota
    "/en/payment", // Korunan rota
    "/tr/payment", // Korunan rota
    "/en/callback/:path*", // Dinamik rota için callback ekledik
    "/tr/callback/:path*", // Dinamik rota için callback ekledik
    "/en/reports/:path*", // Dinamik rota için reports ekledik
    "/tr/reports/:path*", // Dinamik rota için reports ekledik
    "/login", // Public route
    "/signup", // Public route
    "/", // Ana sayfa
  ],
};
