import { render, screen } from '@testing-library/react';
import NewsCard from '../NewsCard';
import type { NewsArticle } from '@/lib/directus';

const mockArticle: NewsArticle = {
  id: '1',
  title: 'Test Article Title',
  slug: 'test-article',
  summary: 'A brief summary of the test article.',
  body: '<p>Body content</p>',
  cover_image: null,
  publish_date: '2024-01-15T00:00:00Z',
  status: 'published',
  category: { id: 'cat-1', name: 'Announcements', slug: 'announcements' },
};

describe('NewsCard', () => {
  it('renders the article title', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
  });

  it('renders the article summary', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('A brief summary of the test article.')).toBeInTheDocument();
  });

  it('renders the category name', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Announcements')).toBeInTheDocument();
  });

  it('renders a link to the article detail page', () => {
    render(<NewsCard article={mockArticle} />);
    const link = screen.getByRole('link', { name: /read more about test article title/i });
    expect(link).toHaveAttribute('href', '/news/test-article');
  });

  it('does not render an image when cover_image is null', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
