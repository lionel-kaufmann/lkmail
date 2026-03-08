import Image from "next/image";
import wsrvLoader from "@/lib/imageLoader";

export default function HeroBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-16">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
          {subtitle}
        </p>
      </div>
      <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.3)] shrink-0">
        <Image loader={wsrvLoader} src="lk1.jpg" alt="lkmail Avatar" fill className="object-cover" priority />
      </div>
    </section>
  );
}
