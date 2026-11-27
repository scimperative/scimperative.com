import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

interface RouteConfig {
  url: string;
  outputPath: string;
  title: string;
  description: string;
}

async function prerender() {
  const rootDir = process.cwd();
  const distDir = path.resolve(rootDir, 'dist');
  const templatePath = path.resolve(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('ERROR: dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  console.log('Starting SSG Pre-rendering with Vite SSR...');
  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  // Launch Vite server in SSR mode to load modules with full TS and asset resolution
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: rootDir,
  });

  try {
    const { render, getAllModules } = await vite.ssrLoadModule('/src/entry-server.tsx');
    const modules = getAllModules();

    const routes: RouteConfig[] = [
      {
        url: '/',
        outputPath: path.resolve(distDir, 'index.html'),
        title: 'Silicon Carbide Imperative',
        description: 'First-principles engineering, economics, and geopolitics where machines meet humanity.',
      },
      {
        url: '/sandbox/',
        outputPath: path.resolve(distDir, 'sandbox', 'index.html'),
        title: 'Sandbox · Silicon Carbide Imperative',
        description: 'Model it. Interactive calculators for testing physical constraints and what-if assumptions.',
      },
      {
        url: '/workshop/',
        outputPath: path.resolve(distDir, 'workshop', 'index.html'),
        title: 'Workshop · Silicon Carbide Imperative',
        description: 'Hardware measurements compared against first-principles predictions.',
      },
      {
        url: '/library/',
        outputPath: path.resolve(distDir, 'library', 'index.html'),
        title: 'Library · Silicon Carbide Imperative',
        description: 'Rigorous technical dossiers, analytical essays, and physical boundary investigations.',
      },
      {
        url: '/about/',
        outputPath: path.resolve(distDir, 'about', 'index.html'),
        title: 'About · Silicon Carbide Imperative',
        description: 'Learn about Silicon Carbide Imperative, an independent publication exploring high-friction technical interfaces from first principles.',
      },
    ];

    // Add module-specific routes
    for (const mod of modules) {
      const summary = mod.manifest.summary || '';
      routes.push({
        url: `/sandbox/${mod.manifest.id}/`,
        outputPath: path.resolve(distDir, 'sandbox', mod.manifest.id, 'index.html'),
        title: `${mod.manifest.title} · Silicon Carbide Imperative Sandbox`,
        description: summary,
      });
    }

    console.log(`Pre-rendering ${routes.length} routes...`);

    for (const route of routes) {
      console.log(`  -> Pre-rendering: ${route.url}`);
      const { html: renderedBody } = render(route.url);

      let pageHtml = baseHtml;
      const title = route.title || 'Silicon Carbide Imperative';
      const description = route.description || '';

      // 1. Inject rendered component tree into #root
      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${renderedBody}</div>`,
      );

      // 2. Replace title
      pageHtml = pageHtml.replace(
        /<title id="meta-title">.*?<\/title>/,
        `<title id="meta-title">${title}</title>`,
      );

      // 3. Replace meta description & OG tags
      pageHtml = pageHtml.replace(
        /<meta id="meta-desc" name="description" content=".*?" \/>/,
        `<meta id="meta-desc" name="description" content="${description.replace(/"/g, '&quot;')}" />`,
      );

      pageHtml = pageHtml.replace(
        /<meta property="og:title" id="og-title" content=".*?" \/>/,
        `<meta property="og:title" id="og-title" content="${title.replace(/"/g, '&quot;')}" />`,
      );

      pageHtml = pageHtml.replace(
        /<meta property="og:description" id="og-desc" content=".*?" \/>/,
        `<meta property="og:description" id="og-desc" content="${description.replace(/"/g, '&quot;')}" />`,
      );

      // 4. Inject canonical URL
      const canonicalTag = `<link rel="canonical" href="https://scimperative.com${route.url}" />`;
      if (!pageHtml.includes('rel="canonical"')) {
        pageHtml = pageHtml.replace('</head>', `    ${canonicalTag}\n  </head>`);
      } else {
        pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?" \/>/, canonicalTag);
      }

      // Ensure directory exists and write
      const dir = path.dirname(route.outputPath);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(route.outputPath, pageHtml, 'utf-8');
    }

    // 5. Generate 404.html (using the home shell so client routing can handle unknown routes)
    const homeHtml = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');
    fs.writeFileSync(path.resolve(distDir, '404.html'), homeHtml, 'utf-8');
    console.log('  -> Wrote dist/404.html');

    // 6. Generate llms.txt for LLMs and autonomous agents
    generateLlmsTxt(distDir, modules);

    console.log(`\n✓ SSG Pre-rendering complete! Generated ${routes.length} static routes, 404.html, and llms.txt.`);
  } finally {
    await vite.close();
  }
}

function generateLlmsTxt(distDir: string, modules: Array<{ manifest: { id: string; title: string; summary?: string; description?: string } }>) {
  let content = `# Silicon Carbide Imperative

> First-principles engineering, economics, and geopolitics where machines meet humanity.

Silicon Carbide Imperative (scimperative.com) is an independent engineering laboratory and research publication investigating high-friction interfaces in edge computing, aerospace, power electronics, and physical system constraints.

## Interactive Sandbox Modules

The Sandbox contains deterministic physical models verified against analytical golden vectors and physical boundary limits.

`;

  for (const mod of modules) {
    const summary = mod.manifest.summary || mod.manifest.description || '';
    content += `- [${mod.manifest.title}](https://scimperative.com/sandbox/${mod.manifest.id}/): ${summary}\n`;
  }

  content += `
## Workshop Telemetry Scorecards

The Workshop conducts physical hardware measurements with pre-registered hypothesis intervals and raw unedited telemetry logs.

- **Workshop 01: Raspberry Pi 5 + Hailo-8L NPU**: Measured real-world power vs TOPS marketing claims. Result: 4/4 numerical predictions verified; 0/1 categorical bottleneck call.

## Library Research Dossiers

Written research pieces linking physical first principles directly to system architecture.

- [Hailo-8 TOPS vs Reality: 26 TOPS on Paper, 8.4 W at the Wall](https://scimperative.substack.com): Physical power consumption, PCIe bandwidth boundaries, and true sustained throughput on Raspberry Pi 5.
- [The Orbital Radiator Ceiling](https://scimperative.substack.com): Why space-based data centers hit radiator mass walls before solar collection constraints.

## Site Index & Feeds

- Website: https://scimperative.com
- Author: Patrick X. Capaldo
- Repository: https://github.com/scimperative/scimperative.com
`;

  fs.writeFileSync(path.resolve(distDir, 'llms.txt'), content, 'utf-8');
  console.log('  -> Wrote dist/llms.txt');
}

prerender().catch((err) => {
  console.error('ERROR during SSG pre-rendering:', err);
  process.exit(1);
});
