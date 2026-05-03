import { getDictionary, Locale } from "@/getDictionary";
import PageHeader from "@/components/PageHeader";

// 🔒 STRICT SSG: Garantit que la page est pré-générée au build
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export const dynamicParams = false;

export default async function PrivacyPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col gap-12 pb-16">
      <PageHeader 
        title={dict.privacy.title} 
        description={dict.privacy.description} 
      />

      <section className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed space-y-12">
        <p>{dict.privacy.intro}</p>
        
        {/* Liste des droits */}
        <div className="grid grid-cols-1 gap-6">
          {dict.privacy.rights.map((right: any, index: number) => (
            <div key={index} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0a0a0a]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{right.label}</h3>
              <p>{right.text}</p>
            </div>
          ))}
        </div>

        {/* Modalités d'exercice */}
        <div className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{dict.privacy.modalitiesTitle}</h2>
          <p>{dict.privacy.modalitiesIntro}</p>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
              <p className="font-bold text-fuchsia-500 mb-1">{dict.privacy.emailLabel}</p>
              <a href={`mailto:${dict.privacy.emailValue}`} className="hover:underline">{dict.privacy.emailValue}</a>
            </div>
            <div className="flex-1 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
              <p className="font-bold text-fuchsia-500 mb-1">{dict.privacy.mailLabel}</p>
              <p>{dict.privacy.mailValue}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#0d0d0d] p-8 rounded-3xl space-y-4">
          <p className="text-sm">
            {dict.privacy.moreInfoLabel} <a href="https://www.lkmail.me/privacy" className="text-fuchsia-500 hover:underline">www.lkmail.me/privacy</a>
          </p>
          <p className="font-medium text-gray-900 dark:text-white">{dict.privacy.commitment}</p>
          <p className="text-sm italic">{dict.privacy.litigation}</p>
        </div>
      </section>
    </div>
  );
}