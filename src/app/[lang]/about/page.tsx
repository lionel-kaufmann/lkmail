import { getDictionary, Locale } from "@/getDictionary";
import PageHeader from "@/components/PageHeader";
import ApiEcosystem from "@/components/ApiEcosystem";

export default async function AboutPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col gap-12 pb-16">
      
      {/* 1. Page Header */}
      <PageHeader 
        title={dict.about.title} 
        description={dict.about.description} 
      />
      
      {/* 2. Written Bio / Philosophy */}
      <section className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed">
        <p>{dict.about.bio1}</p>
        <p>{dict.about.bio2}</p>
      </section>

      {/* 3. The Visual Architecture */}
      <section className="space-y-8 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {dict.about.architectureTitle}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {dict.about.architectureDescription}
          </p>
        </div>
        
        {/* Container to frame the beam animation nicely */}
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0a0a0a] p-4 md:p-8 overflow-hidden">
          <ApiEcosystem />
        </div>
      </section>

    </div>
  );
}