import { getDictionary, Locale } from "@/getDictionary";

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-sans">
      <main className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {dict.home.title}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          {dict.home.description}
        </p>
      </main>
    </div>
  );
}