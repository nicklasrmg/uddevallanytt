export interface ArticleRow {
  id: number;
  Title_AI: string | null;
  Title_Human: string | null;
  Content_AI: string | null;
  Content_Human: string | null;
  Preamble_AI: string | null;
  Preamble_Human: string | null;
  Excerpt_AI: string | null;
  Excerpt_Human: string | null;
  Keywords_AI: string[] | null;
  Keywords_Human: string[] | null;
  Categories_AI: string[] | null;
  Categories_Human: string[] | null;
  Featured_media_url: string | null;
  Status: string | null;
  company_id: number | null;
  timestamp: string | null;
  created_at: string | null;
  updated_at: string | null;
  related_articles: number[] | null;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  preamble: string;
  excerpt: string;
  keywords: string[];
  categories: string[];
  imageUrl: string | null;
  status: string;
  date: string;
  slug: string;
}

/** Pick _Human field if available, otherwise fall back to _AI */
export function resolveField(human: string | null | undefined, ai: string | null | undefined): string {
  return (human && human.trim()) ? human : (ai ?? '');
}

export function resolveArrayField(human: string[] | null | undefined, ai: string[] | null | undefined): string[] {
  return (human && human.length > 0) ? human : (ai ?? []);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function rowToArticle(row: ArticleRow): Article {
  const title = resolveField(row.Title_Human, row.Title_AI);
  return {
    id: row.id,
    title,
    content: resolveField(row.Content_Human, row.Content_AI),
    preamble: resolveField(row.Preamble_Human, row.Preamble_AI),
    excerpt: resolveField(row.Excerpt_Human, row.Excerpt_AI),
    keywords: resolveArrayField(row.Keywords_Human, row.Keywords_AI),
    categories: resolveArrayField(row.Categories_Human, row.Categories_AI),
    imageUrl: row.Featured_media_url ?? null,
    status: row.Status ?? 'Draft',
    date: row.timestamp ?? row.created_at ?? new Date().toISOString(),
    slug: slugify(title || `artikel-${row.id}`),
  };
}
