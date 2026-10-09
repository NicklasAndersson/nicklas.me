## Git & deploy workflow
- Integration: push directly to `master`; no PR needed.
- Commits: short English imperative messages.
- Before committing: no checks (static site); preview with `npx wrangler dev`.
- Deploy (manual): after the push has succeeded, run `npx wrangler deploy` (serves nicklas.me and www.nicklas.me). `.assetsignore` keeps `.git` and config out of the public assets; don't remove it.
