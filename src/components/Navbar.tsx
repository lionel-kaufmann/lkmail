import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

// On type rapidement le dictionnaire pour la complétion TypeScript
type NavbarProps = {
  dict: {
    nav: {
      about: string;
      blog: string;
      projects: string;
      contact: string;
    };
  };
  lang: string;
};

export default function Navbar({ dict, lang }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href={`/${lang}`} className="text-xl font-bold tracking-tight">
          lkmail<span className="text-blue-500">.me</span>
        </Link>
        
        {/* Navigation Desktop */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href={`/${lang}/about`} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            {dict.nav.about}
          </Link>
          <Link href={`/${lang}/blog`} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            {dict.nav.blog}
          </Link>
          <Link href={`/${lang}/projects`} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            {dict.nav.projects}
          </Link>
        </nav>

        {/* Right side : Contact Button & Language */}
        <div className="flex items-center gap-6">
          <LanguageSwitcher currentLocale={lang} />
          
          <Link 
            href={`/${lang}/contact`} 
            className="hidden md:inline-flex items-center justify-center rounded-full bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            {dict.nav.contact}
          </Link>
        </div>

      </div>
    </header>
  );
}