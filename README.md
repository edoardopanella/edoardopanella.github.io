# edoardopanella.github.io

My personal site: a desktop made of glass windows. Everything lives in `index.html`.

## Where to edit things (all in index.html)

| What | Search for |
|---|---|
| Book I'm reading | `const BOOK=` (set `placeholder:false` when filled in) |
| Favourite films | `favourites:[` inside `const FILMS=` |
| Soundtrack videos | `const PLAYLIST=` (YouTube id = the part after `v=`) |
| Colour palettes / default | `const PALETTES=` (first one is the default for new visitors) |
| About / Research / Work / CV / Contact text | `id="w-about"`, `id="w-research"`, `id="w-projects"`, `id="w-cv"`, `id="w-mail"` |
| "Now" widget | `aria-label="Now"` |
| Desktop icons and window positions | `const APPS=` |
| Icon drawings | `const ICONS=` |

## Letterboxd sync
`.github/workflows/letterboxd.yml` runs daily, reads my public RSS feed with `scripts/update-letterboxd.mjs`, and commits `films.json`. The Films window shows the newest 8 diary entries from that file. Favourites and the "films logged" counts are edited by hand.

Run it on demand: GitHub → Actions → Sync Letterboxd → Run workflow.

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000 (needed for films.json to load).

## Added in this version
| What | Where |
|---|---|
| CV PDF (Download button in CV window) | upload your CV to the repo root named exactly `cv.pdf`; replace it to update |
| Photo album | put images in `photos/`, list them in `photos.json` (see `photos/README.md`) |
| Ask Edoardo knowledge | `knowledge.md` — what the assistant knows about you |
| Ask Edoardo backend | `ask-worker/worker.js` (Cloudflare Worker), then paste its URL into `ASK_ENDPOINT` in index.html |
| Music links | search `id="w-music"` in index.html |
| Live sky | automatic: Milan time + Open-Meteo weather + season. The ☼ button next to the scenes lets visitors preview other conditions |
