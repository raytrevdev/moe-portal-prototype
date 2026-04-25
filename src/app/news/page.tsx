import NewsCard from '@/components/NewsCard';
import Pagination from '@/components/Pagination';
import { getNewsArticles, getCategories } from '@/lib/api';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'News | MOE Portal',
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

const ARTICLES_PER_PAGE = 9;

export default async function NewsPage({ searchParams }: PageProps) {
  const { page: pageParam, category: categorySlug } = await searchParams;

  const page = Number(pageParam ?? 1);

  const [{ articles, total }, categories] = await Promise.all([
    getNewsArticles({ page, limit: ARTICLES_PER_PAGE, categorySlug }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);
  const basePath = categorySlug ? `/news?category=${categorySlug}` : '/news';

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">News</h1>

      <nav aria-label="Filter by category" className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/news"
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            !categorySlug
              ? 'bg-blue-700 text-white border-blue-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/news?category=${cat.slug}`}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              categorySlug === cat.slug
                ? 'bg-blue-700 text-white border-blue-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
            aria-current={categorySlug === cat.slug ? 'page' : undefined}
          >
            {cat.name}
          </Link>
        ))}
      </nav>

      {articles.length === 0 ? (
        <p className="text-gray-500 py-12 text-center">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} basePath={basePath} />
    </div>
  );
}
