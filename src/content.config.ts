import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const resources = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    type: z.string(),
    category: z.string(),
    subcategory: z.string().optional(),
    difficulty: z.enum(['facil', 'intermedio', 'dificil']),
    audience: z.enum(['ninos', 'adultos', 'todos']),
    image: z.string(),
    thumbnail: z.string(),
    downloadPdf: z.string(),
    downloadImage: z.string(),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    printFormat: z.string().default('A4'),
  }),
});

export const collections = { resources };
