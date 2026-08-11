import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tintaquieta.com"),
  title: { default: "Tinta Quieta — Dibujos para imprimir", template: "%s — Tinta Quieta" },
  description: "Dibujos y mandalas gratuitos para imprimir y colorear.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "es_ES", siteName: "Tinta Quieta", images: [{ url: "/og.png", width: 1731, height: 907, alt: "Tinta Quieta — Imprime. Colorea. Respira." }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}<footer><div className="shell"><span>© {new Date().getFullYear()} Tinta Quieta</span><span>Hecho para imprimir despacio.</span></div></footer></body></html>;
}
