import fs from 'node:fs';
import assert from 'node:assert/strict';
import gallery from '../gallery-data.mjs';
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
const galleryHTML=fs.readFileSync(new URL('gallery.html',root),'utf8');
assert.equal((galleryHTML.match(/class="photo-open"/g)||[]).length,26);
assert.equal(gallery.find(x=>x.caption==='Bedroom 1 · View 1').file,'bedroom1_ (5).jpeg');
assert.equal(gallery.find(x=>x.caption==='Bedroom 2 · View 3').file,'bedroom1_ (1).jpeg');
assert(!gallery.some(x=>x.caption==='Bedroom 1 · View 5'||x.file==='sitting-room1.jpeg'));
assert.equal(gallery.filter(x=>x.category==='Dining & Living Area').length,4);
assert.equal(new Set(gallery.map(x=>x.file)).size,gallery.length);
for(const p of pages){const html=fs.readFileSync(new URL(p,root),'utf8');assert(!html.includes('>069 336 4688<'));assert(html.includes('tel:+27693364688'));assert(html.includes('>+27 69 336 4688<'));assert(html.includes('https://wa.me/27693364688'));}
const amenities=fs.readFileSync(new URL('amenities.html',root),'utf8');
for(const text of ['Only ONE parking space','Netflix','Private balcony','R350','longer than five nights','at least ONE DAY','high boundary walls','electric fencing','burglar-proof'])assert(amenities.includes(text),text);
const explore=fs.readFileSync(new URL('explore.html',root),'utf8');
for(const text of ['Lambton Gardens Mall','Checkers','Woolworths','Pick n Pay Clothing','Builders','Dis-Chem Pharmacy','Ackermans','PEP',"McDonald's",'KFC','Debonairs Pizza',"Roman's Pizza",'Fast Food &amp; Restaurants'])assert(explore.includes(text),text);
console.log(`Validated ${pages.length} pages, local links, 26 gallery assignments, amenities, new Explore categories and international contact links.`);
