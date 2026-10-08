import { readFile, writeFile, access } from 'node:fs/promises';
const root = new URL('./dist/', import.meta.url);
let origin;
try { const url = new URL(process.argv[2]); if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) throw new Error(); origin = url.origin; } catch { console.error('Provide the final HTTPS origin, for example: node prepare-launch.mjs https://your-real-domain.de'); process.exit(1); }
let html = await readFile(new URL('index.html', root), 'utf8');
const issues = [];
for (const n of ['01','03','04','05','06','07','12','13']) { try { await access(new URL(`images/${n}.jpg`, root)); } catch { issues.push(`Add original images/${n}.jpg`); } }
if (/Beispieltext|keine echten Gästebewertungen/.test(html)) issues.push('Replace or remove the sample testimonials and their preview notice.');
if (/Bitte bei der Anfrage klären/.test(html)) issues.push('Confirm and insert the adult price for the children’s tour, including the FAQ.');
for (const name of ['impressum.html','datenschutz.html']) { if ((await readFile(new URL(name, root), 'utf8')).includes('data-legal-draft')) issues.push(`Finalize ${name} and remove its draft marker.`); }
if (issues.length) { console.error('Launch preparation still needs:\n- ' + issues.join('\n- ')); process.exit(1); }
html = html.replace(/<meta name="robots" content="noindex" data-preview>/g, '').replace(/\s*<link rel="canonical"[^>]*>/g, '').replace(/\s*<meta property="og:url"[^>]*>/g, '');
html = html.replace('</head>', `  <link rel="canonical" href="${origin}/">\n  <meta property="og:url" content="${origin}/">\n</head>`);
await writeFile(new URL('index.html', root), html);
const headers = await readFile(new URL('_headers', root), 'utf8');
await writeFile(new URL('_headers', root), headers.replace(/\s*X-Robots-Tag: noindex\r?\n?/g, '\n'));
await writeFile(new URL('robots.txt', root), `User-agent: *\nDisallow:\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(new URL('sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`);
console.log(`Prepared SEO settings for ${origin}. No deployment performed.`);
