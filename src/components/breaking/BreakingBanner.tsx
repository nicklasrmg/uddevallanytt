import { Link } from 'react-router-dom';
import type { Article } from '../../types/article';

export function BreakingBanner({ article }: { article: Article }) {
  return (
    <Link
      to={`/artikel/${article.id}/${article.slug}`}
      className="block bg-accent text-white px-4 py-2.5 hover:bg-red-700 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <span className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse-dot" />
          <span className="text-xs font-bold uppercase tracking-wider">Senaste nytt</span>
        </span>
        <span className="font-headline font-bold text-sm md:text-base truncate">
          {article.title}
        </span>
      </div>
    </Link>
  );
}
