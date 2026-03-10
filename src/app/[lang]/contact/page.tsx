import { getDictionary, Locale } from "@/getDictionary";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

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
        <ContactForm dict={dict} />
      </div>
    </div>
  );
}