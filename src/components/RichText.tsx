import DOMPurify from 'isomorphic-dompurify';

interface RichTextProps {
  html: string;
  className?: string;
}

export default function RichText({ html, className = '' }: RichTextProps) {
  const clean = DOMPurify.sanitize(html);
  return (
    <div
      className={`prose prose-blue max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
