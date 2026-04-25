import { getImageUrl, formatDate } from '../utils';

describe('getImageUrl', () => {
  it('returns null for null input', () => {
    expect(getImageUrl(null)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(getImageUrl(undefined)).toBeNull();
  });

  it('constructs the correct Directus asset URL', () => {
    const url = getImageUrl('abc-123-uuid');
    expect(url).toBe('http://localhost:8055/assets/abc-123-uuid');
  });
});

describe('formatDate', () => {
  it('formats an ISO string to a readable date', () => {
    const result = formatDate('2024-01-15T00:00:00Z');
    expect(result).toContain('2024');
    expect(result).toContain('January');
  });
});
