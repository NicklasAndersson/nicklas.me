# nicklas.me

Personal website for Nicklas Andersson — [nicklas.me](https://nicklas.me)

Static CV page, prerendered at build time and served by a Cloudflare Worker (static assets). Migrated from WordPress.

## Structure
- `src/resume.json` — all page content (edit this to update the CV)
- `src/index.html` — HTML/CSS template (`<!--APP-->` is replaced by the rendered content)
- `src/profile.jpg` — source photo
- `build.mjs` — renders `src/` into `dist/`: static HTML, minified with `html-minifier-terser`, photo resized to WebP with `sharp`, `_headers` for caching/security headers
- `wrangler.jsonc` — Worker config: build command, `dist/` as assets, custom domains `nicklas.me` and `www.nicklas.me`

## Develop
```sh
npm install
npx wrangler dev      # builds, then serves on http://localhost:8787
```

## Deploy
```sh
git push              # master
npx wrangler deploy   # builds and deploys manually; no CI
```
Requires `npx wrangler login`. Only `dist/` is published, so `.git` and config are never exposed.

## Hosting & DNS
- DNS is managed in Cloudflare. `nicklas.me` and `www` are Worker custom domains (managed by `wrangler.jsonc`; don't add manual A/CNAME records for them).
- Mail to `@nicklas.me` uses Cloudflare Email Routing (MX/SPF records). Leave those records alone.
