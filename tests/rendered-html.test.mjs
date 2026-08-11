import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders an indexable, canonical home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<title>Dibulisto — Dibujos para imprimir<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/dibulisto\.site"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /<h1>Imprime, colorea y disfruta\.<\/h1>/);
  assert.match(html, /Dibujos gratuitos listos para imprimir/);
  assert.doesNotMatch(html, /\/manda\//);
});

test("renders category pages with useful structured data", async () => {
  const response = await render("/mandalas/animales");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<h1>Mandalas de animales(?:<!-- -->)? para imprimir<\/h1>/);
  assert.match(html, /https:\/\/dibulisto\.site\/mandalas\/animales\//);
  assert.match(html, /CollectionPage/);
  assert.match(html, /ItemList/);
  assert.match(html, /BreadcrumbList/);
  assert.match(html, /width="800" height="800"/);
  assert.match(html, /loading="lazy"/);
});

test("renders mandala pages with image and breadcrumb metadata", async () => {
  const response = await render("/mandalas/girasol-geometrico");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Mandala de girasol geométrico para imprimir/);
  assert.match(html, /ImageObject/);
  assert.match(html, /BreadcrumbList/);
  assert.match(html, /Mandalas de flores y naturaleza/);
  assert.match(html, /width="800" height="800"/);
  assert.match(html, /Cómo colorear este mandala/);
});
