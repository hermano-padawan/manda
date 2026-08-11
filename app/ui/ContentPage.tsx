import Link from "next/link";
import Header from "./Header";

export default function ContentPage({ title, children }: { title: string; children: React.ReactNode }) {
  return <><Header/><main className="shell content-page"><nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link><span>→</span><span>{title}</span></nav><h1>{title}</h1>{children}</main></>;
}
