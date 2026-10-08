import { readFile, access } from 'node:fs/promises';
const root = new URL('./dist/', import.meta.url);
const files = ['index.html', 'impressum.html', 'datenschutz.html', '404.html'];
const failures = [], draftImages = new Set();
for (const file of files) {
 const html = await readFile(new URL(file, root), 'utf8');
 if ((html.match(/<h1\b/g) || []).length !== 1) failures.push(`${file}: expected one H1`);
 if (!html.includes('lang="de"') || !html.includes('name="viewport"')) failures.push(`${file}: missing language/viewport`);
 for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const value = match[1]; if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
  const [path, hash] = value.split('#'); const target = !path ? file : path === './' ? 'index.html' : path.replace(/^\.\//,'');
  try { await access(new URL(target, root)); if (hash) { const other = await readFile(new URL(target,root),'utf8'); if (!other.includes(`id="${hash}"`)) failures.push(`${file}: missing anchor ${value}`); } }
  catch { if (/^images\/\d{2}\.jpg$/.test(target)) draftImages.add(target); else failures.push(`${file}: missing ${target}`); }
 }
 for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(match[1]); } catch { failures.push(`${file}: invalid structured data`); } }
}
for (const cssFile of ['styles.css','sections.css']) { const css=await readFile(new URL(cssFile,root),'utf8'); for(const match of css.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) { try { await access(new URL(match[1],root)); } catch { failures.push(`${cssFile}: missing asset ${match[1]}`); } } }
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('PASS: page links, anchors, headings, metadata, structured data, fonts and fallback image.');
console.log(`Draft assets awaiting originals: ${[...draftImages].join(', ')}`);
