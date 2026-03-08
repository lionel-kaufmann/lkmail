import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { getDictionary, Locale } from "@/getDictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lkmail - Digital Identity",
  description: "Personal portfolio and blog",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  // MUST be 'string' here to satisfy Next.js LayoutProps
  params: Promise<{ lang: string }>; 
}>) {
  const { lang } = await params;
  // Cast 'lang' to 'Locale' here so getDictionary accepts it
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#0a0a0a] text-[#171717] dark:text-[#ededed] min-h-screen flex flex-col`}>
        
        <Navbar dict={dict} lang={lang} />
        
        <main className="grow">
          {children}
        </main>
        
      </body>
    </html>
  );
}