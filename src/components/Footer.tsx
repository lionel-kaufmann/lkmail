export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-16">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {year} lkmail.me — Independent Digital Identity.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="[https://github.com/lkmail](https://github.com/lkmail)" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
          <a href="[https://x.com/lkmail](https://x.com/lkmail)" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">𝕏</a>
        </div>
      </div>
    </footer>
  );
}
