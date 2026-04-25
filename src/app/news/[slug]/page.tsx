import { notFound } from 'next/navigation';
import Image from 'next/image';
import RichText from '@/components/RichText';
import { getNewsArticle, getNewsArticles } from '@/lib/api';
import { getImageUrl, formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { articles } = await getNewsArticles({ limit: 100 });
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return { title: 'Not Found' };
  return {
    title: `${article.title} | MOE Portal`,
    description: article.summary,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) notFound();

  const imageUrl = getImageUrl(article.cover_image);
  const category = typeof article.category === 'object' ? article.category : null;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <a href="/news" className="hover:underline">News</a>
        <span className="mx-2">›</span>
        <span aria-current="page">{article.title}</span>
      </nav>

      {category && (
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {category.name}
        </span>
      )}

      <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">{article.title}</h1>

      <time dateTime={article.publish_date} className="text-sm text-gray-500">
        Published {formatDate(article.publish_date)}
      </time>

      {imageUrl && (
        <div className="relative h-80 w-full my-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <RichText html={article.body} className="mt-8" />
    </article>
  );
}
