import { notFound } from 'next/navigation';
import RichText from '@/components/RichText';
import { getPage } from '@/lib/api';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = { title: 'About | MOE Portal' };

export default async function AboutPage() {
  const page = await getPage('about');

  if (!page) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{page.title}</h1>
      <RichText html={page.body} />
    </div>
  );
}
