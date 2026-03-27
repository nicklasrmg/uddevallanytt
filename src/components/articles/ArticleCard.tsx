import { Link } from 'react-router-dom';
import { Article } from '../../types/article';
import { CategoryBadge } from '../common/CategoryBadge';
import { TimeAgo } from '../common/TimeAgo';

type CardSize = 'hero' | 'medium' | 'small';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&h=450&fit=crop&auto=format';

export function ArticleCard({ article, size = 'small' }: { article: Article; size?: CardSize }) {
  const imgSrc = article.imageUrl || PLACEHOLDER_IMG;
  const linkTo = `/artikel/${article.id}/${article.slug}`;

  if (size === 'hero') {
    return (
      <Link to={linkTo} className="group block relative overflow-hidden rounded-lg">
        <div className="aspect-[16/9] md:aspect-[2/1]">
          <img
            src={imgSrc}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          {article.categories[0] && (
            <CategoryBadge category={article.categories[0]} />
          )}
          <h2 className="font-headline text-2xl md:text-4xl font-extrabold text-white mt-2 leading-tight group-hover:text-accent-dark transition-colors">
            {article.title}
          </h2>
          <p className="text-sm text-gray-300 mt-2 line-clamp-2 hidden md:block">
            {article.excerpt || article.preamble}
          </p>
          <TimeAgo date={article.date} className="text-xs text-gray-400 mt-2" />
        </div>
      </Link>
    );
  }

  if (size === 'medium') {
    return (
      <Link to={linkTo} className="group block">
        <div className="overflow-hidden rounded-lg">
          <img
            src={imgSrc}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="mt-3">
          {article.categories[0] && (
            <CategoryBadge category={article.categories[0]} />
          )}
          <h3 className="font-headline text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-1.5 leading-snug group-hover:text-accent dark:group-hover:text-accent-dark transition-colors line-clamp-3">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">
            {article.excerpt || article.preamble}
          </p>
          <TimeAgo date={article.date} className="text-xs text-gray-500 dark:text-gray-500 mt-1.5" />
        </div>
      </Link>
    );
  }

  // Small card — horizontal layout
  return (
    <Link to={linkTo} className="group flex gap-3">
      <div className="shrink-0 w-28 md:w-32 overflow-hidden rounded-lg">
        <img
          src={imgSrc}
          alt={article.title}
          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        {article.categories[0] && (
          <CategoryBadge category={article.categories[0]} small />
        )}
        <h4 className="font-headline text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-accent dark:group-hover:text-accent-dark transition-colors line-clamp-2 mt-0.5">
          {article.title}
        </h4>
        <TimeAgo date={article.date} className="text-xs text-gray-500 dark:text-gray-500 mt-1" />
      </div>
    </Link>
  );
}
