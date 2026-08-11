import Link from "next/link";

export default function Header() {
  return <header className="site-header"><div className="shell header-inner">
    <Link className="brand" href="/" aria-label="Dibulisto, inicio">
      <svg aria-hidden="true" viewBox="0 0 44 44"><path d="M9 7h13c9 0 15 6 15 15S31 37 22 37H9V7Z"/><path d="M16 14h6c5 0 8 3 8 8s-3 8-8 8h-6V14Z"/></svg>
      <span>Dibu<strong>listo</strong></span>
    </Link>
    <nav aria-label="Navegación principal"><Link href="/mandalas">Mandalas</Link><Link href="/mandalas#como-imprimir">Cómo imprimir</Link></nav>
  </div></header>
}
