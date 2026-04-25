import { createDirectus, rest } from '@directus/sdk';

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  cover_image: string | null;
  publish_date: string;
  status: 'published' | 'draft';
  category: Category | string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: 'published' | 'draft';
}

export interface Homepage {
  hero_title: string;
  hero_subtitle: string;
  hero_image: string | null;
  cta_text: string;
  cta_url: string;
  open_in_new_tab: 'yes' | 'no';
}

export interface Schema {
  news: NewsArticle[];
  categories: Category[];
  pages: Page[];
  homepage: Homepage;
}

const directus = createDirectus<Schema>(
  process.env.DIRECTUS_URL ?? 'http://localhost:8055'
).with(rest());

export default directus;
