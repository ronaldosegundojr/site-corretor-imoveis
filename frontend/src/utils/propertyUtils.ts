export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Change accented characters to their base
    .replace(/[\u0300-\u036f]/g, '') // Remove the accent marks
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function getPropertyLink(id: string, title: string, status: string): string {
  const statusSlug = status.toLowerCase() === 'venda' ? 'comprar' : 'alugar';
  return `/${statusSlug}/id=${id}?&${slugify(title)}`;
}
