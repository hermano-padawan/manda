import Link from "next/link";
import Header from "./ui/Header";

export default function Home() {
  return <><Header/><main className="shell"><section className="intro"><p className="eyebrow">Dibujos para bajar el ritmo</p><h1>Imprime. Colorea. Respira.</h1><p>Láminas bonitas y gratuitas, listas para convertir cualquier mesa en un pequeño espacio creativo.</p></section><section aria-labelledby="categorias"><div className="section-title"><h2 id="categorias">Explora por categoría</h2><span>01 colección</span></div><div className="category-grid"><Link className="category-card" href="/mandalas"><span className="category-art"><img src="/mandalas/mandala-oceano.png" alt="Mandala botánico en blanco y negro"/></span><span className="category-copy"><strong>Mandalas</strong><small>5 dibujos para imprimir</small></span></Link></div></section></main></>;
}
