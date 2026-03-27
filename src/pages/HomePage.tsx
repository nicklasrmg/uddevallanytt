import { useArticles } from '../hooks/useArticles';
import { ArticleCard } from '../components/articles/ArticleCard';
import { BreakingBanner } from '../components/breaking/BreakingBanner';
import { Sidebar } from '../components/layout/Sidebar';
import { getAllCategories } from '../lib/articles';

export function HomePage() {
  const { articles, loading, error } = useArticles(50);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-[2/1]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-3">
                <div className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-[16/9]" />
                <div className="bg-gray-200 dark:bg-gray-800 rounded h-5 w-3/4" />
                <div className="bg-gray-200 dark:bg-gray-800 rounded h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500">Kunde inte ladda artiklar: {error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="font-headline text-2xl font-bold text-gray-900 dark:text-white">Inga artiklar ännu</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Artiklar med company_id=22 kommer visas här.</p>
      </div>
    );
  }

  const [hero, ...rest] = articles;
  const secondary = rest.slice(0, 3);
  const feed = rest.slice(3);
  const categories = getAllCategories(articles);

  return (
    <>
      {/* Breaking news banner — newest article */}
      <BreakingBanner article={hero} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero section */}
        <section className="mb-8">
          <ArticleCard article={hero} size="hero" />
        </section>

        {/* Secondary articles — 3 columns */}
        {secondary.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {secondary.map(a => (
              <ArticleCard key={a.id} article={a} size="medium" />
            ))}
          </section>
        )}

        {/* Main content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Feed */}
          <section>
            <h2 className="font-headline text-lg font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4 border-b-2 border-accent pb-2">
              Senaste
            </h2>
            <div className="space-y-5">
              {feed.map(a => (
                <ArticleCard key={a.id} article={a} size="small" />
              ))}
            </div>
          </section>

          {/* Sidebar — desktop only */}
          <div className="hidden lg:block">
            <Sidebar articles={articles} categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
}
