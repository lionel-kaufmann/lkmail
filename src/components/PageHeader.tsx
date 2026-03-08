export default function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="space-y-4 pb-8 pt-6 md:pb-12 md:pt-10 border-b border-gray-200 dark:border-gray-800">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
      {description && <p className="text-lg text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
  );
}