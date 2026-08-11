import { getCollection } from "astro:content";
import { audiences, categories, difficulties } from "../config/taxonomies";

export async function GET({ site }: { site: URL | undefined }) {
  const base = site ?? new URL("https://manda.example");
  const resources = await getCollection(
    "resources",
    ({ data }) => data.type === "mandala",
  );
  const paths = new Set<string>(["/", "/mandalas/"]);
  categories.forEach((category) => {
    paths.add(`/mandalas/${category.slug}/`);
    category.subcategories?.forEach((subcategory) =>
      paths.add(`/mandalas/${category.slug}/${subcategory.slug}/`),
    );
  });
  difficulties.forEach((item) => paths.add(`/mandalas/${item.slug}/`));
  audiences.forEach((item) => paths.add(`/mandalas/${item.slug}/`));
  resources.forEach((resource) =>
    paths.add(`/mandalas/${resource.data.slug}/`),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ...paths,
  ]
    .map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`)
    .join("\n")}\n</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
