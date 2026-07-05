const BLOCKED_BOOK_TITLE_PATTERNS = [
  /lucky hole/i,
  /\baraki\b/i,
  /erot/i,
  /porn/i,
  /xxx/i,
  /adult only/i,
];

export function isBlockedBookTitle(title: string): boolean {
  const normalized = title.trim();
  if (!normalized) {
    return true;
  }

  return BLOCKED_BOOK_TITLE_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function filterSuggestedBooks<T extends { title: string }>(books: T[]): T[] {
  return books.filter((book) => !isBlockedBookTitle(book.title));
}
