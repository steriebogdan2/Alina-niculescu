/** Concatenează clase CSS, ignorând valorile false. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
