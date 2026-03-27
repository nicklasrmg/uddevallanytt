import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { label: 'Nyheter', path: '/kategori/nyheter' },
  { label: 'Sport', path: '/kategori/sport' },
  { label: 'Kultur', path: '/kategori/kultur' },
  { label: 'Politik', path: '/kategori/politik' },
];

export function Header({ theme, onToggleTheme }: { theme: string; onToggleTheme: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              UDDEVALLA<span className="text-accent">NYTT</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/sok"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="Sök"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex gap-1 overflow-x-auto pb-2 -mb-px">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent-dark rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/live"
            className="px-3 py-1.5 text-sm font-medium text-accent dark:text-accent-dark hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
            Live
          </Link>
        </nav>
      </div>
    </header>
  );
}
