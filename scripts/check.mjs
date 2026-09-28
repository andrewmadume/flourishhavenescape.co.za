import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url);
const pages=fs.readdirSync(root).filter(name=>name.endsWith('.html'));
for(const page of pages){
  const html=fs.readFileSync(new URL(page,root),'utf8');
  for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(/^(https?:|mailto:|tel:|data:|#)/.test(url))continue;
    assert(!url.startsWith('/'),`${page}: root-relative link breaks repository hosting: ${url}`);
    const relative=decodeURIComponent(url.split(/[?#]/)[0]);
    assert(fs.existsSync(new URL(relative,root)),`${page}: missing ${relative}`);
  }
}
assert(fs.existsSync(new URL('index.html',root)));
assert.equal((fs.readFileSync(new URL('gallery.html',root),'utf8').match(/class="photo-open"/g)||[]).length,27);
console.log(`Validated ${pages.length} pages, local links and 27 gallery images. Ready for GitHub Pages.`);
