export function getImageUrl(fileId: string | null | undefined): string | null {
  if (!fileId) return null;
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? 'http://localhost:8055';
  return `${baseUrl}/assets/${fileId}`;
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-SG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
