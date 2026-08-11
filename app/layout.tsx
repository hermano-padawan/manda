import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./print.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dibulisto.site"),
  title: { default: "Dibulisto — Dibujos para imprimir", template: "%s — Dibulisto" },
  description: "Descarga mandalas y dibujos gratuitos para imprimir y colorear en casa o en clase. Láminas de animales, flores, geometría y fantasía.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "es_ES", siteName: "Dibulisto", url: "/", title: "Dibulisto — Dibujos para imprimir", description: "Descarga mandalas y dibujos gratuitos para imprimir y colorear en casa o en clase.", images: [{ url: "/og.png", width: 1731, height: 907, alt: "Dibulisto — Dibujos listos para imprimir", type: "image/png" }] },
  twitter: { card: "summary_large_image", title: "Dibulisto — Dibujos para imprimir", description: "Descarga mandalas y dibujos gratuitos para imprimir y colorear en casa o en clase.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}<footer><div className="shell footer-inner"><span>© {new Date().getFullYear()} Dibulisto</span><nav aria-label="Información legal"><Link href="/contacto">Contacto</Link><Link href="/aviso-legal">Aviso legal</Link><Link href="/privacidad">Privacidad</Link><Link href="/cookies">Cookies</Link></nav></div></footer></body></html>;
}
