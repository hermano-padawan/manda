import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'http://127.0.0.1:3000';
const base = '/manda';
const output = path.resolve('gh-pages');
const source = await readFile('app/data.ts', 'utf8');
const slugs = [...source.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);
const legacyRedirects = slugs.slice(0, 22).map((slug) => ({ from: `mandala-${slug}`, to: slug }));
const routes = ['/', '/mandalas', '/contacto', '/aviso-legal', '/privacidad', '/cookies', ...slugs.map((slug) => `/mandalas/${slug}`)];

for (let attempt = 0; attempt < 30; attempt++) {
  try { if ((await fetch(origin)).ok) break; } catch {}
  if (attempt === 29) throw new Error('Vinext did not start in time');
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

for (const { from, to } of legacyRedirects) {
  const target = `${base}/mandalas/${to}/`;
  const redirectHtml = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="https://dibulisto.site/mandalas/${to}/"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace(${JSON.stringify(target)})</script><title>Redirigiendo…</title></head><body><a href="${target}">Ver el mandala</a></body></html>`;
  const directory = path.join(output, 'mandalas', from);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), redirectHtml);
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp('dist/client', output, { recursive: true });

const interactions = `<script>document.querySelectorAll('.actions button').forEach((button,index)=>button.addEventListener('click',async()=>{if(index===0)return window.print();if(navigator.share)return navigator.share({title:document.title,url:location.href});return navigator.clipboard?.writeText(location.href)}));</script>`;

for (const route of routes) {
  const response = await fetch(`${origin}${route}`);
  if (!response.ok) throw new Error(`Unable to export ${route}: ${response.status}`);
  let html = await response.text();
  html = html
    .replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/=(["'])\/(?!manda(?:\/|["']))/g, `=$1${base}/`)
    .replace('</body>', `${interactions}</body>`);
  const directory = route === '/' ? output : path.join(output, route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), html);
}

await writeFile(path.join(output, '.nojekyll'), '');
await cp(path.join(output, 'index.html'), path.join(output, '404.html'));
console.log(`Exported ${routes.length} pages and ${legacyRedirects.length} legacy redirects to ${output}`);
