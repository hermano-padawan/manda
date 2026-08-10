export interface Subcategory {
  slug: string;
  name: string;
  description: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  featured?: boolean;
  subcategories?: Subcategory[];
}

export const categories: Category[] = [
  {
    slug: 'animales', name: 'Animales', featured: true,
    description: 'Mandalas inspirados en animales, desde mascotas hasta fauna salvaje.',
    subcategories: [
      ['gatos', 'Gatos'], ['perros', 'Perros'], ['mariposas', 'Mariposas'],
      ['elefantes', 'Elefantes'], ['leones', 'Leones'], ['caballos', 'Caballos'],
      ['tortugas', 'Tortugas'], ['buhos', 'Búhos'], ['delfines', 'Delfines'],
    ].map(([slug, name]) => ({ slug, name, description: `Mandalas de ${name.toLowerCase()} listos para imprimir y colorear.` })),
  },
  {
    slug: 'flores', name: 'Flores', featured: true,
    description: 'Diseños florales relajantes para colorear con calma.',
    subcategories: [
      ['rosas', 'Rosas'], ['loto', 'Loto'], ['girasoles', 'Girasoles'],
    ].map(([slug, name]) => ({ slug, name, description: `Mandalas de ${name.toLowerCase()} gratuitos para imprimir.` })),
  },
  { slug: 'geometricos', name: 'Geométricos', featured: true, description: 'Patrones simétricos y formas geométricas para concentrarse.' },
  { slug: 'naturaleza', name: 'Naturaleza', featured: true, description: 'Mandalas inspirados en hojas, paisajes y elementos naturales.' },
  { slug: 'zen', name: 'Zen', featured: true, description: 'Composiciones serenas pensadas para relajarse coloreando.' },
  { slug: 'celtas', name: 'Celtas', description: 'Nudos y motivos celtas convertidos en mandalas.' },
  { slug: 'fantasia', name: 'Fantasía', description: 'Criaturas y mundos imaginarios en diseños para colorear.' },
  { slug: 'navidad', name: 'Navidad', description: 'Mandalas navideños para disfrutar durante las fiestas.' },
  { slug: 'halloween', name: 'Halloween', description: 'Diseños de Halloween divertidos y detallados.' },
];

export const difficulties = [
  { slug: 'faciles', value: 'facil', name: 'Fáciles', description: 'Mandalas fáciles con formas amplias y pocos detalles.' },
  { slug: 'intermedios', value: 'intermedio', name: 'Intermedios', description: 'Mandalas con un nivel de detalle equilibrado.' },
  { slug: 'dificiles', value: 'dificil', name: 'Difíciles', description: 'Mandalas complejos para largas sesiones de color.' },
] as const;

export const audiences = [
  { slug: 'ninos', value: 'ninos', name: 'Niños', description: 'Mandalas seleccionados para niños y actividades educativas.' },
  { slug: 'adultos', value: 'adultos', name: 'Adultos', description: 'Mandalas detallados para relajación, atención plena y creatividad.' },
] as const;

export const getCategory = (slug: string) => categories.find((item) => item.slug === slug);
export const getDifficulty = (slug: string) => difficulties.find((item) => item.slug === slug);
export const getAudience = (slug: string) => audiences.find((item) => item.slug === slug);
