"use client";

import { useState } from "react";

const encodedAddress = "ZGlidWxpc3RvQGF0b21pY21haWwuaW8=";

export default function EmailReveal() {
  const [address, setAddress] = useState("");
  if (address) return <a href={`mailto:${address}`}>{address}</a>;
  return <button type="button" className="email-reveal" data-email={encodedAddress} onClick={() => setAddress(atob(encodedAddress))}>Mostrar correo electrónico</button>;
}
