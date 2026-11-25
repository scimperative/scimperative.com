# scimperative.com

Source for [scimperative.com](https://scimperative.com): the site shell, about, workshop and library pages, and deployment.

- **[sandbox](https://github.com/scimperative/sandbox)** is included as a submodule at `sandbox`.
- **[workshop](https://github.com/scimperative/workshop)** is included as a submodule at `workshop`.
- **[library](https://github.com/scimperative/library)** is included as a submodule at `library`.

## How the repositories work together

- **`scimperative.com`** owns the website shell, pages, JavaScript dependencies, tests, build, and GitHub Pages deployment.
- **`sandbox`** owns the interactive models and their tests. The website imports this source directly; run its integrated tests and the production build from the website root.
- **`workshop`** owns the measurement protocols, raw data, and reports. The website's run summaries are maintained separately in `src/pages/WorkshopPage.tsx`, so update that page when a published report's summary changes.
- **`library`** owns the index of Substack entries. The website imports its index and presents links in the Library view; article text remains on Substack.

The website records an exact commit for each submodule. Pushing a change to a submodule does not by itself update or deploy the website; the website's submodule pins must also be advanced.

### Publishing submodule changes

Clone the website with all three submodules:

```bash
git clone --recurse-submodules https://github.com/scimperative/scimperative.com.git
cd scimperative.com
```

Commit and push changes from the relevant submodule directory to its `main` branch, for example:

```bash
git -C sandbox add -A
git -C sandbox commit -m "Describe sandbox changes"
git -C sandbox push origin main
```

Use the same commands with `workshop` or `library` for changes in those repositories. Then update the website's pins and push the website commit:

```bash
git submodule update --remote sandbox workshop library
git add sandbox workshop library
git commit -m "Update submodule pins"
git push origin main
```

Update only the changed submodule path if only one repository changed. The website workflow checks out the pinned submodules, runs `npm test` and `npm run build`, and deploys successful pushes to `main`.

## Develop

Use Node.js 22.13.0 or a compatible supported release, and clone with all three submodules:

```bash
git clone --recurse-submodules https://github.com/scimperative/scimperative.com.git
cd scimperative.com
npm ci
npm run dev
```

The website's test command uses the runner maintained in the `sandbox` submodule. Run the integrated model tests and production build from this repository:

```bash
npm test
npm run build
```

## Build & SSG Pre-rendering

`npm run build` does three things in sequence:

1. **TypeScript check:** `tsc -b`
2. **Vite client build:** Bundles the React application into `dist/`.
3. **SSG pre-rendering:** `tsx scripts/prerender.ts` — renders each route to static HTML using `react-dom/server` and Vite's SSR module loader, then writes the result into the matching `dist/` directory.

After a successful build, `dist/` contains a complete static site:

```
dist/
  index.html                              ← Home (pre-rendered)
  404.html                                ← SPA fallback for GitHub Pages
  llms.txt                                ← Agent & AI-crawler index
  sandbox/
    index.html                            ← Sandbox catalogue
    orbital-thermal-limits/index.html
    solar-power-budget/index.html
    llm-bitflip-resilience/index.html
  workshop/index.html
  library/index.html
  about/index.html
  assets/                                 ← Hashed JS/CSS/font bundles
```

Every `index.html` has a fully pre-rendered `<div id="root">` with semantic page content, correct `<title>`, `<meta name="description">`, OpenGraph tags, and a canonical `<link>`. The React application hydrates the pre-rendered markup in the browser via `hydrateRoot`.

New sandbox modules added to `sandbox/core/registry` are automatically picked up by the pre-renderer with no manual changes required.

### Verifying the pre-render output

```bash
npm run build           # builds and pre-renders
npm run test:prerender  # asserts all static pages exist and contain content
```

The pre-render verification runs automatically in CI after every build (see `.github/workflows/deploy.yml`).

### `llms.txt`

`dist/llms.txt` is generated at build time and served at `https://scimperative.com/llms.txt`. It follows the [llms.txt standard](https://llmstxt.org/) and provides autonomous AI agents with a Markdown index of all Sandbox modules, Workshop runs, and Library dossiers — without requiring JavaScript execution.

### Why no path rewrites are needed

GitHub Pages serves a directory's `index.html` for clean path URLs (`/sandbox/orbital-thermal-limits/` → `dist/sandbox/orbital-thermal-limits/index.html`) natively. The `dist/404.html` copy of the root shell handles any path that doesn't match a pre-rendered file, allowing client-side routing to take over.
