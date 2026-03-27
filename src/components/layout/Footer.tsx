import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-headline text-xl font-bold text-gray-900 dark:text-white">
              UDDEVALLA<span className="text-accent">NYTT</span>
            </span>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Lokala nyheter från Uddevalla
            </p>
          </div>
          <div>
            <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">Kategorier</h3>
            <div className="flex flex-col gap-1.5">
              <Link to="/kategori/nyheter" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Nyheter</Link>
              <Link to="/kategori/sport" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Sport</Link>
              <Link to="/kategori/kultur" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Kultur</Link>
              <Link to="/kategori/politik" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Politik</Link>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">Om oss</h3>
            <div className="flex flex-col gap-1.5">
              <Link to="/om" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Om Uddevallanytt</Link>
              <Link to="/live" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent">Live-feed</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Uddevallanytt. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
}
