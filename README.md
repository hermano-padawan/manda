# Manda

Portal estático de recursos imprimibles gratuitos construido con Astro. La primera vertical publica únicamente mandalas, pero el modelo central usa una colección genérica `resources` para admitir en el futuro otros tipos de imprimibles sin rehacer la arquitectura.

## Requisitos e instalación

- Node.js 22.12 o superior.
- npm.

```sh
npm install
```

En este equipo, Windows Application Control puede bloquear el binario nativo de `esbuild`. Si aparece el mensaje «Una directiva de Control de aplicaciones bloqueó este archivo», un administrador debe permitir el ejecutable de `node_modules/@esbuild/win32-arm64/esbuild.exe` o aplicar la política corporativa correspondiente.

## Desarrollo y build

Según la configuración del proyecto, el servidor se inicia en segundo plano:

```sh
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

Para generar el sitio estático:

```sh
npm run build
npm run preview
```

Antes de publicar, sustituye `https://manda.example` en `astro.config.mjs` y `public/robots.txt` por el dominio definitivo.

## Añadir un mandala

1. Duplica un JSON de `src/content/resources/` y ponle un nombre de archivo único.
2. Completa todos sus metadatos. `type` debe ser `mandala` durante esta fase.
3. Usa un `slug` único, estable y sin acentos; genera automáticamente `/mandalas/[slug]/`.
4. Coloca la vista previa y el original en `public/images/resources/mandalas/`.
5. Coloca el PDF en `public/downloads/mandalas/pdf/` y, si corresponde, una imagen descargable en `public/downloads/mandalas/images/`.
6. Actualiza `image`, `thumbnail`, `downloadPdf` y `downloadImage` con rutas que empiecen por `/`.

El esquema de `src/content.config.ts` valida título, descripción, tipo, taxonomías, dificultad, audiencia, medios, fecha y etiquetas. Un recurso se almacena una sola vez: las páginas lo agrupan automáticamente según sus metadatos.

## Taxonomías

Las categorías, subcategorías, dificultades y públicos viven en `src/config/taxonomies.ts`.

- Para añadir una categoría, agrega un objeto a `categories`.
- Para añadir una subcategoría, agrégala a `subcategories` dentro de su categoría.
- Para añadir una dificultad futura, amplía tanto `difficulties` como el enum del esquema de contenido.
- Las etiquetas son internas y no generan páginas indexables.

Las nuevas taxonomías generan sus landings desde `src/pages/mandalas/[...path].astro`; no hay que crear páginas manuales.

## Rutas dinámicas

- `/mandalas/`: índice general.
- `/mandalas/[slug]/`: ficha individual.
- `/mandalas/[categoria]/`: categoría.
- `/mandalas/[categoria]/[subcategoria]/`: subcategoría.
- `/mandalas/faciles/`, `/intermedios/`, `/dificiles/`: dificultad.
- `/mandalas/ninos/`, `/adultos/`: audiencia.
- `/mandalas/pagina/2/`: paginación general.

Todas se generan como HTML estático en build mediante `getStaticPaths()`.

## Relacionados y paginación

`src/utils/resources.ts` puntúa relacionados por categoría, subcategoría, dificultad, público y etiquetas. Las URLs nunca se escriben manualmente en una ficha. `ResourceLayout.astro` reutiliza ese resultado para «Mandalas similares», «Más de la categoría» y «También te pueden gustar».

La biblioteca muestra 12 recursos por página. `Pagination.astro` es independiente del contenido y puede reutilizarse en landings paginadas cuando su volumen lo requiera.

## Organización y escalabilidad

```text
src/
  components/       UI por responsabilidad: layout, navegación, recursos y SEO
  config/           taxonomías y nombres visibles
  content/resources una ficha JSON por recurso
  layouts/          estructura común y plantilla de recurso
  pages/            home, rutas dinámicas, 404 y sitemap
  styles/           sistema visual global ligero
  utils/            selección, URLs y etiquetas de recursos
public/
  images/resources/mandalas/
  downloads/mandalas/pdf/
  downloads/mandalas/images/
```

La colección se llama `resources` y `type` determina la vertical. En el futuro pueden añadirse valores como `coloring-page`, `sudoku`, `maze`, `word-search` o `worksheet`, junto con sus propias rutas y presentaciones, conservando cards, grids, paginación y utilidades comunes.

Para decenas de miles de recursos convendrá dividir los archivos por tipo/categoría, generar previews WebP, paginar también cada taxonomía y medir los tiempos de build. Si el build completo deja de ser práctico, la colección puede cambiar de `glob()` a un loader o CMS manteniendo el esquema y los consumidores.
