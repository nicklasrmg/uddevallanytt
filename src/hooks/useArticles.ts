import { useState, useEffect } from 'react';
import type { Article } from '../types/article';
import { fetchArticles, fetchArticlesByCategory, searchArticles } from '../lib/articles';

export function useArticles(limit = 50) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchArticles(limit)
      .then(setArticles)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [limit]);

  return { articles, loading, error };
}

export function useArticlesByCategory(category: string, limit = 30) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    fetchArticlesByCategory(category, limit)
      .then(setArticles)
      .finally(() => setLoading(false));
  }, [category, limit]);

  return { articles, loading };
}

export function useSearch(query: string, limit = 30) {
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    searchArticles(query, limit)
      .then(setResults)
      .finally(() => setLoading(false));
  }, [query, limit]);

  return { results, loading };
}
