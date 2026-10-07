const fs = require('fs');
const path = require('path');

const rootDir = '/Users/andrewstrachan/career_portfolio';
const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

const urlRegex = /https?:\/\/[^\s"'`<>]+/g;
const urls = html.match(urlRegex) || [];
const insecure = urls.filter(u => u.startsWith('http://'));
console.log('Total URLs found in index.html:', urls.length);
console.log('Insecure HTTP URLs:', insecure.length);
if (insecure.length > 0) console.log('Insecure URLs:', insecure);

const srcRegex = /\bsrc=["']([^"']+)["']/g;
let m;
let missingMedia = [];
let localCount = 0;
while ((m = srcRegex.exec(html)) !== null) {
  const src = m[1];
  if (!src.startsWith('http') && !src.startsWith('data:')) {
    localCount++;
    const cleanSrc = src.split('?')[0].split('#')[0];
    const absPath = path.resolve(rootDir, cleanSrc);
    if (!fs.existsSync(absPath)) {
      missingMedia.push(src);
    }
  }
}
console.log('Total local src attributes:', localCount);
console.log('Missing local media in index.html:', JSON.stringify(missingMedia));

// Also check dist/public/index.html
const publicHtml = fs.readFileSync(path.join(rootDir, 'dist/public/index.html'), 'utf8');
const publicUrls = publicHtml.match(urlRegex) || [];
const publicInsecure = publicUrls.filter(u => u.startsWith('http://'));
console.log('Total URLs in dist/public/index.html:', publicUrls.length);
console.log('Insecure URLs in dist/public:', publicInsecure.length);
