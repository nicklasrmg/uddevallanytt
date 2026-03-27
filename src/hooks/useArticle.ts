import { useState, useEffect } from 'react';
import { Article } from '../types/article';
import { fetchArticleById } from '../lib/articles';

export function useArticle(id: number | null) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchArticleById(id)
      .then(setArticle)
      .finally(() => setLoading(false));
  }, [id]);

  return { article, loading };
}
