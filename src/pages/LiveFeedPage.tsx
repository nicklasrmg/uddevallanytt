import { useEffect, useState } from 'react';
import { supabase, COMPANY_ID } from '../lib/supabase';
import { ArticleRow, rowToArticle, Article } from '../types/article';
import { ArticleCard } from '../components/articles/ArticleCard';
import { Link } from 'react-router-dom';

export function LiveFeedPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    supabase
      .from('Articles')
      .select('*')
      .eq('company_id', COMPANY_ID)
      .order('timestamp', { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (data) setArticles((data as ArticleRow[]).map(rowToArticle));
        setLoading(false);
      });

    // Realtime subscription
    const channel = supabase
      .channel('live-articles')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Articles',
          filter: `company_id=eq.${COMPANY_ID}`,
        },
        (payload) => {
          const newArticle = rowToArticle(payload.new as ArticleRow);
          setArticles(prev => [newArticle, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link to="/" className="text-sm text-accent hover:underline">&larr; Startsidan</Link>

      <div className="flex items-center gap-3 mt-4 mb-6">
        <span className="w-3 h-3 bg-accent rounded-full animate-pulse-dot" />
        <h1 className="font-headline text-3xl font-extrabold text-gray-900 dark:text-white">
          Live-feed
        </h1>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Nya artiklar dyker upp automatiskt.
      </p>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3">
              <div className="bg-gray-200 dark:bg-gray-800 rounded w-32 aspect-[4/3]" />
              <div className="flex-1 space-y-2">
                <div className="bg-gray-200 dark:bg-gray-800 rounded h-5 w-3/4" />
                <div className="bg-gray-200 dark:bg-gray-800 rounded h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {articles.map(a => (
            <ArticleCard key={a.id} article={a} size="small" />
          ))}
        </div>
      )}
    </div>
  );
}
