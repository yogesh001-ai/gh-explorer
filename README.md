# gh-explorer

A dashboard for exploring open-source GitHub repositories — search, filter, sort,
visualize, and keep private notes on repos you want to track. Built with React,
the GitHub REST API, Recharts, and Tailwind CSS.

![license](https://img.shields.io/badge/license-MIT-blue) ![node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)

## Features

- **Live search** against the GitHub REST API (`/search/repositories`), debounced as you type
- **Sort** by stars, forks, or most recently updated
- **Filter** by language (quick-pick chips) or free-text query
- **Charts** (Recharts): top repos by stars, language breakdown, open issues vs. forks
- **Bookmarking & notes** — save repos and attach a private note, persisted to `localStorage`
- Loading, empty, and rate-limit-aware error states

## Tech stack

| Layer      | Choice                         |
|------------|--------------------------------|
| UI         | React 18 (Vite)                |
| Styling    | Tailwind CSS                   |
| Charts     | Recharts                       |
| Icons      | lucide-react                   |
| Data       | GitHub REST API (unauthenticated) |
| Storage    | Browser `localStorage`         |

## Project structure

```
gh-explorer/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # top bar + Explore/Bookmarks nav
│   │   ├── SearchBar.jsx       # terminal-style search input
│   │   ├── Filters.jsx         # language chips + sort dropdown
│   │   ├── ChartsPanel.jsx     # the 3 Recharts panels
│   │   ├── ChartCard.jsx       # shared chart container
│   │   ├── RepoList.jsx        # results list wrapper
│   │   ├── RepoRow.jsx         # single repo row (git-log style)
│   │   └── BookmarksView.jsx   # saved repos + notes
│   ├── hooks/
│   │   └── useBookmarks.js     # localStorage-backed bookmark state
│   ├── utils/
│   │   ├── github.js           # GitHub API fetch helper
│   │   └── format.js           # language colors, date/number formatting
│   ├── App.jsx                 # top-level state & layout
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind directives + custom fonts/animations
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── .gitignore
```

## Getting started

**Requirements:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

The app will be available at `http://localhost:5173`.

## GitHub API notes

This project calls the public, **unauthenticated** GitHub Search API, which is
rate-limited to **10 requests per minute** per IP. That's enough for normal
interactive use. If you hit a `403`, the UI will show a rate-limit message —
just wait a minute and try again.

To raise the limit (up to 30 req/min for search), you can add a personal
access token and send it as an `Authorization: Bearer <token>` header in
`src/utils/github.js`. Never commit a real token to source control — use an
environment variable (e.g. `VITE_GITHUB_TOKEN`) and a `.env` file (already
git-ignored).

## Notes & bookmarks

Bookmarks and notes are stored client-side in `localStorage` under the key
`gh-explorer-bookmarks-v1`. They're private to your browser and are not sent
anywhere. Clearing your browser storage will remove them.

## License

MIT — do whatever you'd like with this.
