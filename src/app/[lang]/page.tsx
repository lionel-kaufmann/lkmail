import { getDictionary, Locale } from "@/getDictionary";

export default async function Home({ 
  params 
}: { 
  // MUST be 'string' here to satisfy Next.js PageProps
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  // Cast to 'Locale'
  const dict = await getDictionary(lang as Locale);

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