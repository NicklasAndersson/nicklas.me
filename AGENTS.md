## Git & deploy workflow
- Integration: push directly to `master`; no PR needed.
- Commits: short English imperative messages.
- Source lives in `src/` (page content in `src/resume.json`); `npm run build` (needs `npm install`) renders `dist/`, which wrangler serves and builds automatically on dev/deploy. Edit `src/`, never `dist/`.
- Deploy (manual): after the push has succeeded, run `npx wrangler deploy` (serves nicklas.me and www.nicklas.me).
