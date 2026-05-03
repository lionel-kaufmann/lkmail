"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  
  // Fonction pour remplacer dynamiquement /fr/... par /en/... dans l'URL
  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    
    const segments = pathname.split("/");
    
    // SECURITE : Vérifie si le premier segment de l'URL est bien une langue connue
    // Si on est sur une URL racine comme "/" ou "/api/...", on préfixe simplement la locale
    if (segments.length < 2 || (segments[1] !== "en" && segments[1] !== "fr")) {
      return `/${locale}${pathname === "/" ? "" : pathname}`;
    }

    // Comportement standard : on remplace la langue existante
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex gap-3 text-sm font-medium">
      <Link 
        href={redirectedPathName("en")} 
        className={`transition-colors ${currentLocale === "en" ? "text-blue-500" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
      >
        EN
      </Link>
      <span className="text-gray-300 dark:text-gray-700">|</span>
      <Link 
        href={redirectedPathName("fr")} 
        className={`transition-colors ${currentLocale === "fr" ? "text-blue-500" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
      >
        FR
      </Link>
    </div>
  );
}