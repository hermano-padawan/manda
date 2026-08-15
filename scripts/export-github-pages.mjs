import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'http://127.0.0.1:3000';
const base = '';
const output = path.resolve('gh-pages');
const source = await readFile('app/data.ts', 'utf8');
const slugs = [...source.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);
const mandalaEntries = [...source.matchAll(/\{slug:"([^"]+)",title:"([^"]+)"[^}]+image:"([^"]+)"\}/g)].map((match) => ({ slug: match[1], title: match[2], image: match[3] }));
const categoryEntries = [...source.matchAll(/\{slug:"([^"]+)",title:"([^"]+)"[^}]+image:"([^"]+)",tip:/g)].map((match) => ({ slug: match[1], title: match[2], image: match[3] }));
const routes = ['/', '/mandalas', '/contacto', '/aviso-legal', '/privacidad', '/cookies', ...slugs.map((slug) => `/mandalas/${slug}`)];

for (let attempt = 0; attempt < 30; attempt++) {
  try { if ((await fetch(origin)).ok) break; } catch {
    // The production server may still be starting; retry below.
  }
  if (attempt === 29) throw new Error('Vinext did not start in time');
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp('dist/client', output, { recursive: true });

const interactions = `<script>document.querySelectorAll('.actions button').forEach((button,index)=>button.addEventListener('click',async()=>{if(index===0)return window.print();if(navigator.share)return navigator.share({title:document.title,url:location.href});return navigator.clipboard?.writeText(location.href)}));document.querySelectorAll('.email-reveal').forEach(button=>button.addEventListener('click',()=>{const address=String.fromCharCode(100,105,98,117,108,105,115,116,111,64,97,116,111,109,105,99,109,97,105,108,46,105,111);const link=document.createElement('a');link.href='mailto:'+address;link.textContent=address;button.replaceWith(link)}));</script>`;

for (const route of routes) {
  const response = await fetch(`${origin}${route}`);
  if (!response.ok) throw new Error(`Unable to export ${route}: ${response.status}`);
  let html = await response.text();
  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi)].map((match) => match[0]);
  const streamedMetadata = [];
  html = html.replace(/<div hidden=""><!--\$--><div hidden="">([\s\S]*?)<\/div><!--\/\$--><\/div>/g, (_match, metadata) => {
    streamedMetadata.push(metadata);
    return '';
  });
  html = html
    .replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace('</head>', `${streamedMetadata.join('')}${jsonLd.join('')}</head>`)
    .replace(/=(["'])\/(?!manda(?:\/|["']))/g, `=$1${base}/`)
    .replace('</body>', `${interactions}</body>`);
  const directory = route === '/' ? output : path.join(output, route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), html);
}

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const lastModified = '2026-08-11';
const sitemapPages = ['https://dibulisto.site/', 'https://dibulisto.site/mandalas/'].map((url) => `  <url><loc>${url}</loc><lastmod>${lastModified}</lastmod></url>`);
const sitemapImages = [...categoryEntries,...mandalaEntries].map(({ slug, title, image }) => `  <url><loc>https://dibulisto.site/mandalas/${slug}/</loc><lastmod>${lastModified}</lastmod><image:image><image:loc>https://dibulisto.site${image}</image:loc><image:title>${escapeXml(title)}</image:title></image:image></url>`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${[...sitemapPages, ...sitemapImages].join('\n')}\n</urlset>\n`;
await writeFile(path.join(output, 'sitemap.xml'), sitemap);
await writeFile(path.join(output, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://dibulisto.site/sitemap.xml\n');
await writeFile(path.join(output, '.nojekyll'), '');
await cp(path.join(output, 'index.html'), path.join(output, '404.html'));
console.log(`Exported ${routes.length} pages to ${output}`);
