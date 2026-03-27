import { useParams, Link } from 'react-router-dom';
import { useArticle } from '../hooks/useArticle';
import { CategoryBadge } from '../components/common/CategoryBadge';
import { TimeAgo } from '../components/common/TimeAgo';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&h=600&fit=crop&auto=format';

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { article, loading } = useArticle(id ? Number(id) : null);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-[2/1] mb-6" />
        <div className="bg-gray-200 dark:bg-gray-800 rounded h-10 w-3/4 mb-4" />
        <div className="bg-gray-200 dark:bg-gray-800 rounded h-5 w-full mb-2" />
        <div className="bg-gray-200 dark:bg-gray-800 rounded h-5 w-5/6 mb-2" />
        <div className="bg-gray-200 dark:bg-gray-800 rounded h-5 w-2/3" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="font-headline text-2xl font-bold text-gray-900 dark:text-white">Artikeln hittades inte</h2>
        <Link to="/" className="text-accent hover:underline mt-4 inline-block">Tillbaka till startsidan</Link>
      </div>
    );
  }

  const imgSrc = article.imageUrl || PLACEHOLDER_IMG;

  return (
    <article className="max-w-4xl mx-auto px-4 py-6">
      {/* Hero image */}
      <div className="rounded-lg overflow-hidden mb-6">
        <img
          src={imgSrc}
          alt={article.title}
          className="w-full aspect-[2/1] object-cover"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-3">
        {article.categories.map(cat => (
          <CategoryBadge key={cat} category={cat} />
        ))}
      </div>

      {/* Title */}
      <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
        {article.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-3 mt-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
        <TimeAgo date={article.date} />
      </div>

      {/* Preamble */}
      {article.preamble && (
        <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-6 border-l-4 border-accent pl-4">
          {article.preamble}
        </p>
      )}

      {/* Content */}
      <div
        className="article-content text-gray-800 dark:text-gray-200 text-base md:text-lg"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Keywords */}
      {article.keywords.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
            Nyckelord
          </h3>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map(kw => (
              <span
                key={kw}
                className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Dela:</span>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="text-sm text-accent hover:underline"
        >
          Kopiera länk
        </button>
      </div>

      {/* Back link */}
      <div className="mt-8">
        <Link to="/" className="text-accent hover:underline text-sm font-medium">
          &larr; Tillbaka till startsidan
        </Link>
      </div>
    </article>
  );
}
