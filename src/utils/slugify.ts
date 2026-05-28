export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{Nd}]+/gu, '-') // Replace non-alphanumeric/marks with -
    .replace(/^-+|-+$/g, '');       // Trim - from start and end
};
