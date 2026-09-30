import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [];
async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collect(full);
    else if (entry.name.endsWith('.html')) pages.push(full);
  }
}
await collect(path.join(root, 'guide'));
pages.push(path.join(root, 'index.html'));

const errors = [];
let refs = 0;
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]));
  for (const [, attribute, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(value)) continue;
    refs++;
    const [url, fragment] = value.split('#');
    let target = url ? path.resolve(path.dirname(page), url) : page;
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
    } catch {
      errors.push(`${path.relative(root, page)}: missing ${attribute} ${value}`);
      continue;
    }
    if (fragment) {
      const destinationIds = target === page ? ids : new Set([...((await readFile(target, 'utf8')).matchAll(/\bid="([^"]+)"/g))].map(x => x[1]));
      if (!destinationIds.has(fragment)) errors.push(`${path.relative(root, page)}: missing anchor ${value}`);
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${pages.length} HTML pages and ${refs} local references.`);
}
