import type { Metadata } from "next";
import ContentPage from "../ui/ContentPage";

export const metadata: Metadata = { title: "Política de cookies", description: "Información sobre el uso de cookies en Dibulisto.", alternates: { canonical: "/cookies/" } };

export default function Cookies() {
  return <ContentPage title="Política de cookies"><p className="updated">Última actualización: 11 de agosto de 2026</p><h2>1. Situación actual</h2><p>Dibulisto no utiliza actualmente cookies propias de analítica, publicidad, personalización ni seguimiento. Por ese motivo no se muestra un banner de consentimiento.</p><h2>2. Cookies técnicas</h2><p>La infraestructura utilizada para servir la web podría emplear elementos técnicos imprescindibles para la seguridad o el funcionamiento del servicio. Estos elementos no se utilizan para elaborar perfiles publicitarios.</p><h2>3. Servicios de terceros</h2><p>Si en el futuro incorporamos analítica, publicidad, vídeos externos u otros servicios capaces de instalar cookies no necesarias, actualizaremos esta política y solicitaremos el consentimiento correspondiente antes de activarlas.</p><h2>4. Cómo controlar las cookies</h2><p>Puedes consultar, bloquear o eliminar las cookies desde la configuración de tu navegador. El procedimiento cambia según el navegador y el dispositivo.</p><h2>5. Contacto</h2><p>Si tienes dudas sobre esta política, utiliza nuestra <a href="/contacto">página de contacto</a>.</p></ContentPage>;
}
