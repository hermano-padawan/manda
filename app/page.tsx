import Link from "next/link";
import Header from "./ui/Header";
import { mandalas } from "./data";

const futureCategories = [
  "Dibujos para colorear",
  "Actividades infantiles",
  "Laberintos",
];

export default function Home() {
  return <><Header/><main className="shell">
    <section className="intro home-intro"><p className="eyebrow">Dibujos listos para imprimir</p><h1>Imprime, colorea y disfruta.</h1><p>Láminas gratuitas para disfrutar en casa, en clase o donde quieras.</p></section>
    <section aria-labelledby="categorias"><div className="section-title"><h2 id="categorias">Explora por categoría</h2><span>Más colecciones en camino</span></div>
      <div className="category-grid home-categories">
        <Link className="category-card" href="/mandalas/"><span className="category-art"><img src="/mandalas/mandala-petalos-hojas.webp" width="800" height="800" decoding="async" alt="Mandala floral fácil en blanco y negro"/></span><span className="category-copy"><strong>Mandalas</strong><small>{mandalas.length} dibujos</small></span></Link>
        {futureCategories.map((category)=><article className="category-card coming-card" key={category} aria-label={`${category}, próximamente`}>
          <span className="category-art future-art"><em>Próximamente</em></span>
          <span className="category-copy"><strong>{category}</strong></span>
        </article>)}
      </div>
    </section>
    <section className="seo-copy home-copy" aria-labelledby="dibujos-imprimir"><h2 id="dibujos-imprimir">Dibujos gratuitos listos para imprimir</h2><p>Dibulisto reúne láminas en blanco y negro para colorear en casa, en clase o durante una actividad tranquila. La primera colección incluye 52 mandalas de flores, animales, geometría, paisajes, fantasía y objetos cotidianos, todos con líneas claras y espacios cómodos.</p><p>Elige una categoría, abre el dibujo que más te guste e imprímelo en papel A4. Los recursos son gratuitos para uso personal, familiar y educativo no comercial. Próximamente añadiremos dibujos para colorear, actividades infantiles y laberintos.</p></section>
  </main></>;
}
