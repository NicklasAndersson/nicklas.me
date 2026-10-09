// Pre-renders src/ into dist/: static HTML (no client JS), minified CSS/HTML.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { minify } from 'html-minifier-terser';
import sharp from 'sharp';

const d = JSON.parse(readFileSync('src/resume.json', 'utf8'));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const body = `
<header>
<img class="profile-photo" src="profile.webp" alt="${esc(d.person.name)}" width="200" height="200" fetchpriority="high">
<h1>${esc(d.person.name)}</h1>
<div class="contact-info"><a href="mailto:${esc(d.person.contact.email)}">${esc(d.person.contact.email)}</a> | ${esc(d.person.contact.location)}</div>
<div class="summary">${esc(d.person.summary)}</div>
</header>
<h2>Arbetslivserfarenhet</h2>
${d.experience.map(e => `<div class="employer-block"><div class="employer-header">${esc(e.company)} <span class="employer-period">| ${esc(e.period)}</span></div>${
  e.assignments.map(a => `<div class="assignment"><div class="assignment-title">${esc(a.client || a.project)} – ${esc(a.role)}</div><div class="technologies">${a.technologies.map(esc).join(' – ')}</div></div>`).join('')
}</div>`).join('')}
<h2>Utbildning</h2>
${d.education.map(e => `<div class="education-item">&gt; ${esc(e.institution)}, ${esc(e.program)} (${esc(e.period)})</div>`).join('')}`;

let html = readFileSync('src/index.html', 'utf8').replace('<!--APP-->', body);
html = await minify(html, { collapseWhitespace: true, minifyCSS: true, removeComments: true });

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
writeFileSync('dist/index.html', html);
// 300px = 1.5x the 200px display size; webp is ~universally supported
await sharp('src/profile.jpg').resize(300, 300).webp({ quality: 80 }).toFile('dist/profile.webp');
writeFileSync('dist/_headers', `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
/profile.webp
  Cache-Control: public, max-age=86400
`);
console.log(`dist/index.html ${html.length} bytes`);
