import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dibulisto.site"),
  title: { default: "Dibulisto — Dibujos para imprimir", template: "%s — Dibulisto" },
  description: "Dibujos y mandalas gratuitos para imprimir y colorear.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "es_ES", siteName: "Dibulisto", images: [{ url: "/og.png", width: 1731, height: 907, alt: "Dibulisto — Dibujos listos para imprimir" }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}<footer><div className="shell"><span>© {new Date().getFullYear()} Dibulisto</span><span>Dibujos listos para imprimir.</span></div></footer></body></html>;
}
