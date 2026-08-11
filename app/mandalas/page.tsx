import type { Metadata } from "next";
import Link from "next/link";
import Header from "../ui/Header";
import { getMandalasByCategory, mandalaCategories, mandalas } from "../data";

const description = "Explora 52 mandalas para imprimir gratis organizados por temas: flores, animales, geometría, paisajes, fantasía y objetos.";

export const metadata: Metadata = {
  title: "Mandalas para imprimir gratis",
  description,
  alternates: { canonical: "/mandalas/" },
  openGraph: { type: "website", url: "/mandalas/", title: "Mandalas para imprimir gratis", description, images: [{ url: "/og.png", width: 1731, height: 907, alt: "Mandalas para imprimir en Dibulisto", type: "image/png" }] },
  twitter: { card: "summary_large_image", title: "Mandalas para imprimir gratis", description, images: ["/og.png"] },
};

export default function Mandalas() {
  return <><Header/><main className="shell"><nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link><span>→</span><span>Mandalas</span></nav>
    <section className="intro compact"><p className="eyebrow">52 láminas gratuitas</p><h1>Mandalas para imprimir</h1><p>Encuentra diseños botánicos, geométricos, de animales y de fantasía preparados para imprimir en A4. Hemos organizado la colección por temas para que llegues antes al dibujo que buscas y la página cargue con menos imágenes.</p></section>
    <section aria-labelledby="temas"><div className="section-title"><h2 id="temas">Elige una categoría</h2><span>{mandalas.length} dibujos</span></div>
      <div className="category-grid mandala-category-grid">{mandalaCategories.map(category=>{const count=getMandalasByCategory(category.slug).length;return <Link className="category-card" href={`/mandalas/${category.slug}/`} key={category.slug}><span className="category-art"><img src={category.image} width="800" height="800" loading="lazy" decoding="async" alt={`${category.title} para imprimir`}/></span><span className="category-copy"><strong>{category.title}</strong><small>{count} dibujos</small></span><span className="category-description">{category.short}</span></Link>})}</div>
    </section>
    <section className="seo-copy" aria-labelledby="mandalas-gratis"><h2 id="mandalas-gratis">Mandalas gratuitos para colorear a tu ritmo</h2><p>Todos los dibujos de Dibulisto utilizan líneas negras nítidas y espacios cómodos, con una dificultad pensada para niños, familias y cualquier persona que quiera disfrutar de una pausa creativa. Puedes abrir cada lámina, imprimirla directamente o guardar su imagen.</p><p>Para obtener un resultado limpio, selecciona papel A4 y ajusta la impresión a la página. Los lápices funcionan bien en papel común; si vas a utilizar rotuladores, elige un papel de mayor gramaje para evitar que la tinta traspase.</p></section>
  </main></>;
}
