import { supabase, COMPANY_ID } from './supabase';
import type { ArticleRow, Article } from '../types/article';
import { rowToArticle } from '../types/article';

export async function fetchArticles(limit = 50): Promise<Article[]> {
  console.log(`[Supabase] Fetching articles from company_id=${COMPANY_ID}`);
  console.log(`[Supabase] URL: ${import.meta.env.VITE_SUPABASE_URL}`);

  const { data, error, status, statusText } = await supabase
    .from('Articles')
    .select('*')
    .eq('company_id', COMPANY_ID)
    .order('timestamp', { ascending: false })
    .limit(limit);

  console.log(`[Supabase] Response: status=${status} ${statusText}, rows=${data?.length ?? 0}`);

  if (error) {
    console.error('[Supabase] Error:', error);
    return [];
  }

  if (!data || data.length === 0) {
    console.warn('[Supabase] No articles returned. Trying without company_id filter...');
    const { data: allData, error: allErr, status: allStatus } = await supabase
      .from('Articles')
      .select('id, company_id, Title_AI, Status')
      .limit(5);
    console.log(`[Supabase] Unfiltered query: status=${allStatus}, rows=${allData?.length ?? 0}`, allData);
    if (allErr) console.error('[Supabase] Unfiltered error:', allErr);
  }

  return (data as ArticleRow[]).map(rowToArticle);
}

export async function fetchArticleById(id: number): Promise<Article | null> {
  const { data, error } = await supabase
    .from('Articles')
    .select('*')
    .eq('id', id)
    .eq('company_id', COMPANY_ID)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return rowToArticle(data as ArticleRow);
}

export async function fetchArticlesByCategory(category: string, limit = 30): Promise<Article[]> {
  // Try Human categories first, then AI
  const { data, error } = await supabase
    .from('Articles')
    .select('*')
    .eq('company_id', COMPANY_ID)
    .or(`Categories_Human.cs.{${category}},Categories_AI.cs.{${category}}`)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching by category:', error);
    return [];
  }

  return (data as ArticleRow[]).map(rowToArticle);
}

export async function searchArticles(query: string, limit = 30): Promise<Article[]> {
  const { data, error } = await supabase
    .from('Articles')
    .select('*')
    .eq('company_id', COMPANY_ID)
    .or(`Title_Human.ilike.%${query}%,Title_AI.ilike.%${query}%,Content_Human.ilike.%${query}%,Content_AI.ilike.%${query}%`)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error searching articles:', error);
    return [];
  }

  return (data as ArticleRow[]).map(rowToArticle);
}

export function getAllCategories(articles: Article[]): string[] {
  const cats = new Set<string>();
  articles.forEach(a => a.categories.forEach(c => cats.add(c)));
  return Array.from(cats).sort();
}
