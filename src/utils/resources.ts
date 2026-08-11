import type { CollectionEntry } from 'astro:content';

export type Resource = CollectionEntry<'resources'>;

export const resourceUrl = (resource: Resource) => withBase(`/mandalas/${resource.data.slug}/`);

export const byNewest = (a: Resource, b: Resource) => b.data.date.getTime() - a.data.date.getTime();

export function relatedResources(current: Resource, all: Resource[], limit = 4): Resource[] {
  return all
    .filter((item) => item.id !== current.id && item.data.type === current.data.type)
    .map((item) => ({
      item,
      score:
        (item.data.category === current.data.category ? 4 : 0) +
        (item.data.subcategory && item.data.subcategory === current.data.subcategory ? 3 : 0) +
        (item.data.difficulty === current.data.difficulty ? 2 : 0) +
        (item.data.audience === current.data.audience ? 1 : 0) +
        item.data.tags.filter((tag) => current.data.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || byNewest(a.item, b.item))
    .slice(0, limit)
    .map(({ item }) => item);
}

export const labelDifficulty = (value: string) => ({ facil: 'Fácil', intermedio: 'Intermedio', dificil: 'Difícil' }[value] ?? value);
export const labelAudience = (value: string) => ({ ninos: 'Niños', adultos: 'Adultos', todos: 'Todos' }[value] ?? value);
import { withBase } from './urls';
