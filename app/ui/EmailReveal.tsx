"use client";

import { useState } from "react";

const codes = [100,105,98,117,108,105,115,116,111,64,97,116,111,109,105,99,109,97,105,108,46,105,111];

export default function EmailReveal() {
  const [address, setAddress] = useState("");
  if (address) return <a href={`mailto:${address}`}>{address}</a>;
  return <button type="button" className="email-reveal" onClick={() => setAddress(String.fromCharCode(...codes))}>Mostrar correo electrónico</button>;
}
