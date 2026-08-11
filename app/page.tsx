import Link from "next/link";
import Header from "./ui/Header";
import { mandalas } from "./data";

export default function Home() {
  return <><Header/><main className="shell">
    <section className="intro"><p className="eyebrow">Dibujos listos para imprimir</p><h1>Imprime. Colorea. Disfruta.</h1><p>Láminas bonitas y gratuitas para convertir cualquier mesa en un pequeño espacio creativo.</p></section>
    <section aria-labelledby="categorias"><div className="section-title"><h2 id="categorias">Explora por categoría</h2><span>01 colección</span></div><div className="category-grid">
      <Link className="category-card" href="/mandalas"><span className="category-art"><img src="/mandalas/mandala-petalos-hojas.png" alt="Mandala floral fácil en blanco y negro"/></span><span className="category-copy"><strong>Mandalas</strong><small>{mandalas.length} dibujos para imprimir</small></span></Link>
    </div></section>
  </main></>;
}
