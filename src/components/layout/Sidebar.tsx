import { Link } from 'react-router-dom';
import type { Article } from '../../types/article';

export function Sidebar({ articles, categories }: { articles: Article[]; categories: string[] }) {
  const topArticles = articles.slice(0, 5);

  return (
    <aside className="space-y-6">
      {/* Most recent */}
      <div className="bg-gray-50 dark:bg-surface-card rounded-lg p-4">
        <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
          Senaste nytt
        </h3>
        <div className="space-y-3">
          {topArticles.map((article, i) => (
            <Link
              key={article.id}
              to={`/artikel/${article.id}/${article.slug}`}
              className="block group"
            >
              <div className="flex gap-3">
                <span className="text-2xl font-headline font-bold text-gray-300 dark:text-gray-600 shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-accent dark:group-hover:text-accent-dark line-clamp-2 transition-colors">
                  {article.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-gray-50 dark:bg-surface-card rounded-lg p-4">
          <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
            Kategorier
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/kategori/${cat.toLowerCase()}`}
                className="px-2.5 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-accent hover:text-white dark:hover:bg-accent-dark transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
