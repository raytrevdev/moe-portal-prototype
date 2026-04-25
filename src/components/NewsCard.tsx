import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/directus';
import { getImageUrl, formatDate } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const imageUrl = getImageUrl(article.cover_image);
  const category = typeof article.category === 'object' ? article.category : null;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        {category && (
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-1">
            {category.name}
          </span>
        )}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
          {article.summary}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <time dateTime={article.publish_date} className="text-xs text-gray-400">
            {formatDate(article.publish_date)}
          </time>
          <Link
            href={`/news/${article.slug}`}
            className="text-sm font-medium text-blue-700 hover:underline"
            aria-label={`Read more about ${article.title}`}
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
