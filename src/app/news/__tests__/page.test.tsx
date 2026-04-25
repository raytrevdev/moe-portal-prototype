import { render, screen } from '@testing-library/react';
import NewsPage from '../page';
import * as api from '@/lib/api';
import type { NewsArticle, Category } from '@/lib/directus';

jest.mock('@/lib/api');

const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'First News Article',
    slug: 'first-news',
    summary: 'Summary of first article.',
    body: '',
    cover_image: null,
    publish_date: '2024-01-10T00:00:00Z',
    status: 'published',
    category: { id: 'cat-1', name: 'Announcements', slug: 'announcements' },
  },
];

const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Announcements', slug: 'announcements' },
];

beforeEach(() => {
  (api.getNewsArticles as jest.Mock).mockResolvedValue({
    articles: mockArticles,
    total: 1,
  });
  (api.getCategories as jest.Mock).mockResolvedValue(mockCategories);
});

describe('NewsPage', () => {
  it('renders the page heading', async () => {
    const Page = await NewsPage({ searchParams: Promise.resolve({}) });
    render(Page);
    expect(screen.getByRole('heading', { name: 'News' })).toBeInTheDocument();
  });

  it('renders articles from the API', async () => {
    const Page = await NewsPage({ searchParams: Promise.resolve({}) });
    render(Page);
    expect(screen.getByText('First News Article')).toBeInTheDocument();
  });

  it('renders category filter links', async () => {
    const Page = await NewsPage({ searchParams: Promise.resolve({}) });
    render(Page);
    expect(screen.getByRole('link', { name: 'Announcements' })).toBeInTheDocument();
  });

  it('shows empty state when no articles found', async () => {
    (api.getNewsArticles as jest.Mock).mockResolvedValue({ articles: [], total: 0 });
    const Page = await NewsPage({ searchParams: Promise.resolve({}) });
    render(Page);
    expect(screen.getByText('No articles found.')).toBeInTheDocument();
  });
});
