import { Locale } from "@/getDictionary";

// Define the structure of our localized routes
type RouteMap = {
  HOME: string;
  ABOUT: string;
  BLOG: string;
  PROJECTS: string;
  CONTACT: string;
  PRIVACY: string;
};

// Store translated paths for E-E-A-T / SEO optimization
export const ROUTES: Record<Locale, RouteMap> = {
  en: {
    HOME: "/",
    ABOUT: "/about",
    BLOG: "/blog",
    PROJECTS: "/projects",
    CONTACT: "/contact",
    PRIVACY: "/privacy", // <-- Nom exact du dossier
  },
  fr: {
    HOME: "/",
    ABOUT: "/a-propos",
    BLOG: "/blog",
    PROJECTS: "/projets",
    CONTACT: "/contact",
    PRIVACY: "/privacy", // <-- KISS: On garde le nom exact du dossier
  },
} as const;

// External links centralized to avoid hardcoding across components
export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/lionel-kaufmann",
} as const;

// Helper function to easily grab the correct path based on the current locale
export function getRoute(routeKey: keyof RouteMap, locale: Locale | string): string {
  const safeLocale = (locale === "fr" || locale === "en") ? locale : "en";
  // Always prepend the locale to the path (e.g., /fr/privacy)
  const path = ROUTES[safeLocale][routeKey];
  return path === "/" ? `/${safeLocale}` : `/${safeLocale}${path}`;
}