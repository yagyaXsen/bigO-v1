// Downloads all Azurio assets to public/. Run: node scripts/download-assets.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ORIGIN = 'https://azuris-nextjs.vercel.app';
const RES = path.join(ROOT, 'docs/research/azuris-nextjs.vercel.app');

// Parse assets.json for underlying origin paths
const assets = JSON.parse(fs.readFileSync(path.join(RES, 'assets.json'), 'utf8'));

function underlyingPath(src) {
  // /_next/image?url=%2Fimg%2F...&w=..  ->  /img/...
  try {
    const u = new URL(src, ORIGIN);
    if (u.pathname === '/_next/image') {
      const inner = u.searchParams.get('url');
      if (inner) return decodeURIComponent(inner);
    }
    return u.pathname + (u.pathname.startsWith('/_next/static') ? '' : '');
  } catch { return null; }
}

const paths = new Set();
assets.images.forEach(i => { const p = underlyingPath(i.src); if (p) paths.add(p); });
assets.videos.forEach(v => { if (v.src) paths.add(new URL(v.src, ORIGIN).pathname); if (v.poster) paths.add(new URL(v.poster, ORIGIN).pathname); });
// divider background images (hashed static media) — keep full path
assets.backgroundImages.forEach(b => {
  const m = b.url.match(/url\(["']?(.*?)["']?\)/); if (m) { try { paths.add(new URL(m[1]).pathname); } catch {} }
});
// favicon
paths.add('/favicon.ico');

// Map an origin path to a local public path (flatten _next/static/media into images/dividers)
function localFor(p) {
  if (p.startsWith('/_next/static/media/')) {
    const base = p.split('/').pop().replace(/\.[0-9a-z~_]+\.webp$/i, '.webp').replace(/\.[0-9a-z~_]+\.(png|jpg|jpeg|svg)$/i, '.$1');
    return path.join(ROOT, 'public/images/dividers', base);
  }
  if (p.startsWith('/video/')) return path.join(ROOT, 'public', p);
  if (p === '/favicon.ico') return path.join(ROOT, 'public/favicon.ico');
  if (p.startsWith('/img/')) return path.join(ROOT, 'public', p.replace('/img/', '/images/'));
  return path.join(ROOT, 'public', p.replace(/^\//, ''));
}

const list = [...paths];
console.log('Downloading', list.length, 'assets...');

async function download(p) {
  const url = ORIGIN + p;
  const dest = localFor(p);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return { p, skipped: true };
  const res = await fetch(url);
  if (!res.ok) return { p, error: res.status };
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return { p, bytes: buf.length, dest: dest.replace(ROOT, '') };
}

// batches of 5
const results = [];
for (let i = 0; i < list.length; i += 5) {
  const batch = list.slice(i, i + 5);
  const r = await Promise.all(batch.map(download));
  results.push(...r);
  r.forEach(x => console.log(x.error ? `  ERR ${x.error} ${x.p}` : x.skipped ? `  skip ${x.p}` : `  ok  ${x.dest} (${x.bytes}b)`));
}
const errs = results.filter(r => r.error);
console.log(`\nDone. ${results.filter(r=>r.bytes).length} downloaded, ${results.filter(r=>r.skipped).length} skipped, ${errs.length} errors.`);
if (errs.length) console.log('Errors:', errs.map(e=>e.p).join(', '));
