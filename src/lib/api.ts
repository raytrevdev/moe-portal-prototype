import directus from './directus';
import { readItems, readSingleton } from '@directus/sdk';
import type { NewsArticle, Category, Page, Homepage } from './directus';

// ─── HOMEPAGE ────────────────────────────────────────────────────────────────

export async function getHomepage(): Promise<Homepage> {
  return directus.request(readSingleton('homepage'));
}

// ─── NEWS ─────────────────────────────────────────────────────────────────────

interface GetNewsOptions {
  page?: number;
  limit?: number;
  categorySlug?: string;
}

export async function getNewsArticles(options: GetNewsOptions = {}): Promise<{
  articles: NewsArticle[];
  total: number;
}> {
  const { page = 1, limit = 9, categorySlug } = options;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {
    status: { _eq: 'published' },
  };

  if (categorySlug) {
    filter['category'] = { slug: { _eq: categorySlug } };
  }

  const [articles, countResult] = await Promise.all([
    directus.request(
      readItems('news', {
        filter,
        sort: ['-publish_date'],
        limit,
        offset: (page - 1) * limit,
        fields: ['id', 'title', 'slug', 'summary', 'cover_image', 'publish_date', { category: ['*'] }],
      })
    ),
    directus.request(
      readItems('news', {
        filter,
        aggregate: { count: ['id'] },
      })
    ),
  ]);

  const total = Number(
    (countResult as unknown as Array<{ count: { id: string } }>)[0]?.count?.id ?? 0
  );

  return { articles: articles as NewsArticle[], total };
}

export async function getLatestNews(count = 3): Promise<NewsArticle[]> {
  const result = await directus.request(
    readItems('news', {
      filter: { status: { _eq: 'published' } },
      sort: ['-publish_date'],
      limit: count,
      fields: ['id', 'title', 'slug', 'summary', 'cover_image', 'publish_date', { category: ['*'] }],
    })
  );
  return result as NewsArticle[];
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const results = await directus.request(
    readItems('news', {
      filter: {
        slug: { _eq: slug },
        status: { _eq: 'published' },
      },
      limit: 1,
      fields: ['*', { category: ['*'] }],
    })
  );
  return (results[0] as NewsArticle) ?? null;
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return directus.request(readItems('categories')) as Promise<Category[]>;
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

export async function getPage(slug: string): Promise<Page | null> {
  const results = await directus.request(
    readItems('pages', {
      filter: {
        slug: { _eq: slug },
        status: { _eq: 'published' },
      },
      limit: 1,
    })
  );
  return (results[0] as Page) ?? null;
}
