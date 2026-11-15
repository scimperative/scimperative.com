# scimperative.com

Source for [scimperative.com](https://scimperative.com): the site shell, about and workshop pages, and deployment.

- **[sandbox](https://github.com/scimperative/sandbox)** is included as a submodule at `src/sandbox`.
- **[workshop](https://github.com/scimperative/workshop)** is included as a submodule at `workshop`.

## Develop

Use Node.js 22.13.0 or a compatible supported release, and clone with both submodules:

```bash
git clone --recurse-submodules https://github.com/scimperative/scimperative.com.git
cd scimperative.com
npm ci
npm run dev
```

Run the integrated model tests and production build from this repository:

```bash
npm test
npm run build
```
