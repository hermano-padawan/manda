import Link from "next/link";
import Header from "./ui/Header";
import { mandalas } from "./data";

const futureCategories = [
  { name: "Dibujos para colorear", icon: <><path d="M28 9 12 31l-2 11 11-5L37 15 28 9Z"/><path d="m22 17 8 6M12 31l9 6"/></> },
  { name: "Actividades infantiles", icon: <><circle cx="16" cy="15" r="5"/><circle cx="34" cy="15" r="5"/><path d="M8 38c2-9 14-9 16 0M26 38c2-9 14-9 16 0"/></> },
  { name: "Laberintos", icon: <><path d="M9 9h32v32H9V9Zm7 7h18v18H16V16Z"/><path d="M25 9v10h9M9 28h10v13M25 25h9v9"/></> },
];

export default function Home() {
  return <><Header/><main className="shell">
    <section className="intro home-intro"><p className="eyebrow">Dibujos listos para imprimir</p><h1>Imprime, colorea y disfruta.</h1><p>Láminas gratuitas para disfrutar en casa, en clase o donde quieras.</p></section>
    <section aria-labelledby="categorias"><div className="section-title"><h2 id="categorias">Explora por categoría</h2><span>Más colecciones en camino</span></div>
      <div className="category-grid home-categories">
        <Link className="category-card" href="/mandalas"><span className="category-art"><img src="/mandalas/mandala-petalos-hojas.png" alt="Mandala floral fácil en blanco y negro"/></span><span className="category-copy"><strong>Mandalas</strong><small>{mandalas.length} dibujos</small></span></Link>
        {futureCategories.map((category)=><article className="category-card coming-card" key={category.name} aria-label={`${category.name}, próximamente`}>
          <span className="category-art future-art"><svg aria-hidden="true" viewBox="0 0 50 50">{category.icon}</svg><em>Próximamente</em></span>
          <span className="category-copy"><strong>{category.name}</strong></span>
        </article>)}
      </div>
    </section>
  </main></>;
}
