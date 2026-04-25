import Image from 'next/image';
import Link from 'next/link';
import NewsCard from '@/components/NewsCard';
import { getHomepage, getLatestNews } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';

export const revalidate = 60;

export default async function HomePage() {
  const [homepage, latestNews] = await Promise.all([
    getHomepage(),
    getLatestNews(3),
  ]);

  const heroImageUrl = getImageUrl(homepage.hero_image);

  return (
    <>
      <section className="relative bg-blue-900 text-white py-32 px-4" aria-label="Hero">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt="Hero background"
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">{homepage.hero_title}</h1>
          <p className="text-xl mb-8 text-blue-100">{homepage.hero_subtitle}</p>
          <Link
            href={homepage.cta_url}
            className="inline-block bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            {...(homepage.open_in_new_tab === 'yes' && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
          >
            {homepage.cta_text}
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
          <Link href="/news" className="text-blue-700 hover:underline font-medium">
            View all news →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
