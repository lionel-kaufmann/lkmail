import { getDictionary, Locale } from "@/getDictionary";
import PageHeader from "@/components/PageHeader";

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col gap-12 pb-16">
      <PageHeader 
        title={dict.contact.title} 
        description={dict.contact.description} 
      />

      <div className="w-full">
        <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
          {dict.contact.email}
        </p>
        <a
          href="mailto:info@lkmail.me"
          className="text-2xl font-semibold text-gray-900 dark:text-white hover:text-fuchsia-500 dark:hover:text-fuchsia-500 transition-colors underline underline-offset-4"
        >
          info@lkmail.me
        </a>
      </div>
    </div>
  );
}