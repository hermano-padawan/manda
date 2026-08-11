const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string) {
  if (!path || path.startsWith('#') || /^(?:https?:|mailto:|tel:)/.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
