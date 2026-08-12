import type { Metadata } from "next";
import Link from "next/link";
import Header from "./ui/Header";
import { mandalas } from "./data";

const description = "Descubre 52 mandalas para colorear e imprimir gratis: flores, animales, diseños geométricos, paisajes y fantasía en láminas A4.";

export const metadata: Metadata = {
  title: "Mandalas para colorear e imprimir gratis",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Mandalas para colorear e imprimir gratis", description },
  twitter: { card: "summary_large_image", title: "Mandalas para colorear e imprimir gratis", description },
};

const futureCategories = [
  "Dibujos para colorear",
  "Actividades infantiles",
  "Laberintos",
];

export default function Home() {
  return <><Header/><main className="shell">
    <section className="intro home-intro"><p className="eyebrow">Mandalas para colorear gratis</p><h1>Mandalas para colorear, imprimir y disfrutar.</h1><p>Descubre láminas gratuitas en A4 para colorear en casa, en clase o donde quieras.</p></section>
    <section aria-labelledby="categorias"><div className="section-title"><h2 id="categorias">Explora por categoría</h2><span>Más colecciones en camino</span></div>
      <div className="category-grid home-categories">
        <Link className="category-card" href="/mandalas/"><span className="category-art"><img src="/mandalas/mandala-petalos-hojas.webp" width="800" height="800" decoding="async" alt="Mandala floral fácil en blanco y negro para colorear"/></span><span className="category-copy"><strong>Mandalas para colorear</strong><small>{mandalas.length} dibujos</small></span></Link>
        {futureCategories.map((category)=><article className="category-card coming-card" key={category} aria-label={`${category}, próximamente`}>
          <span className="category-art future-art"><em>Próximamente</em></span>
          <span className="category-copy"><strong>{category}</strong></span>
        </article>)}
      </div>
    </section>
    <section className="seo-copy home-copy" aria-labelledby="dibujos-imprimir"><h2 id="dibujos-imprimir">Mandalas para colorear e imprimir gratis</h2><p>Dibulisto reúne 52 mandalas para colorear en casa, en clase o durante una actividad tranquila. Encontrarás diseños de flores, animales, geometría, paisajes, fantasía y objetos cotidianos, todos con líneas claras y espacios cómodos.</p><p>Elige una categoría de mandalas para colorear, abre el diseño que más te guste e imprímelo en papel A4. Las láminas son gratuitas para uso personal, familiar y educativo no comercial. Próximamente añadiremos más dibujos para colorear, actividades infantiles y laberintos.</p></section>
  </main></>;
}
