import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  // KISS: Détection très simple via les headers du navigateur
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.includes("fr")) return "fr";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // On ignore les fichiers statiques, images et routes API
  if (
    pathname.startsWith(`/_next/`) ||
    pathname.startsWith(`/api/`) ||
    pathname.includes(".")
  ) {
    return;
  }

  // Vérifie si le chemin contient déjà une langue (ex: /fr/about)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // S'il n'y a pas de langue, on redirige vers la langue détectée
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// Config du matcher (Quelles URLs déclenchent le middleware)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};