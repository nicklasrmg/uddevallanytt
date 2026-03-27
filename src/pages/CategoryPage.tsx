import { useParams, Link } from 'react-router-dom';
import { useArticlesByCategory } from '../hooks/useArticles';
import { ArticleCard } from '../components/articles/ArticleCard';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug || '';
  const { articles, loading } = useArticlesByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Link to="/" className="text-sm text-accent hover:underline">&larr; Startsidan</Link>
        <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 capitalize">
          {category}
        </h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-[16/9]" />
              <div className="bg-gray-200 dark:bg-gray-800 rounded h-5 w-3/4" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Inga artiklar i kategorin "{category}".</p>
      ) : (
        <>
          {/* First article as hero */}
          <section className="mb-8">
            <ArticleCard article={articles[0]} size="hero" />
          </section>

          {/* Rest as grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map(a => (
              <ArticleCard key={a.id} article={a} size="medium" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
