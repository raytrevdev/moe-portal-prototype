import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const url = new URL(basePath, 'http://placeholder');
    url.searchParams.set('page', String(page));
    return `${url.pathname}${url.search}`;
  };

  return (
    <nav aria-label="Pagination" className="flex justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          aria-label="Previous page"
        >
          ← Prev
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`px-4 py-2 rounded border ${
            page === currentPage
              ? 'bg-blue-700 text-white border-blue-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          aria-label="Next page"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
