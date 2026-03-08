"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs({ lang }: { lang: string }) {
  const pathname = usePathname();
  if (!pathname || pathname === `/${lang}`) return null;

  const segments = pathname.split("/").filter((p) => p !== "" && p !== lang);

  return (
    <nav className="flex items-center text-sm text-gray-500 py-4">
      <Link href={`/${lang}`} className="hover:text-fuchsia-500 transition-colors">Home</Link>
      {segments.map((segment, index) => {
        const href = `/${lang}/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        return (
          <div key={href} className="flex items-center">
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="text-gray-900 dark:text-gray-100 capitalize">{segment}</span>
            ) : (
              <Link href={href} className="hover:text-fuchsia-500 transition-colors capitalize">{segment}</Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
