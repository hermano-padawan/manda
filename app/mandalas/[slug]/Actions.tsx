"use client";
export default function Actions(){const share=async()=>{const data={title:document.title,url:location.href};if(navigator.share)await navigator.share(data);else await navigator.clipboard.writeText(location.href)};return <div className="actions"><button onClick={()=>window.print()}>Imprimir</button><button className="secondary" onClick={share}>Compartir</button></div>}
