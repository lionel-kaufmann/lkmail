import { getDictionary, Locale } from "@/getDictionary";
import HeroBanner from "@/components/HeroBanner";

export default async function Home({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col gap-16">
      <HeroBanner 
        title={dict.home.title} 
        subtitle={dict.home.description} 
      />
      {/* Future sections (Latest Posts, Projects) go here */}
    </div>
  );
}