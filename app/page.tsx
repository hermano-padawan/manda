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
        <Link className="category-card" href="/mandalas"><span className="category-art"><img src="/mandalas/mandala-petalos-hojas.png" alt="Mandala floral fácil en blanco y negro"/></span><span className="category-copy"><strong>Mandalas</strong><small>{mandalas.length} dibujos</small></span></Link>
        {futureCategories.map((category)=><article className="category-card coming-card" key={category} aria-label={`${category}, próximamente`}>
          <span className="category-art future-art"><em>Próximamente</em></span>
          <span className="category-copy"><strong>{category}</strong></span>
        </article>)}
      </div>
    </section>
  </main></>;
}
