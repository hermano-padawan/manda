import type { Metadata } from "next";
import ContentPage from "../ui/ContentPage";
import EmailReveal from "../ui/EmailReveal";

export const metadata: Metadata = { title: "Contacto", description: "Contacta con Dibulisto para consultas sobre sus dibujos y recursos imprimibles.", alternates: { canonical: "/contacto" } };

export default function Contacto() {
  return <ContentPage title="Contacto"><p>¿Tienes alguna pregunta, has detectado un problema o quieres hacernos una propuesta? Escríbenos y trataremos de responderte lo antes posible.</p><div className="contact-box"><p><strong>Responsable:</strong> [añade aquí tu nombre y apellidos]</p><p><EmailReveal/></p></div><p>Al escribirnos por correo utilizaremos los datos que nos facilites únicamente para atender y responder tu consulta. Consulta la <a href="/privacidad">Política de privacidad</a> para obtener más información.</p></ContentPage>;
}
