import { useState } from 'react';
import { useSearch } from '../hooks/useArticles';
import { ArticleCard } from '../components/articles/ArticleCard';
import { Link } from 'react-router-dom';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const { results, loading } = useSearch(query);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link to="/" className="text-sm text-accent hover:underline">&larr; Startsidan</Link>

      <h1 className="font-headline text-3xl font-extrabold text-gray-900 dark:text-white mt-4 mb-6">
        Sök artiklar
      </h1>

      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Sök efter artiklar..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-card text-gray-900 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          autoFocus
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {loading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">Söker...</div>
      )}

      {!loading && query.length >= 2 && results.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Inga resultat för "{query}"
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-5">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {results.length} resultat för "{query}"
          </p>
          {results.map(a => (
            <ArticleCard key={a.id} article={a} size="small" />
          ))}
        </div>
      )}
    </div>
  );
}
