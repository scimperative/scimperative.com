import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');

console.log('=== Running SSG Prerender Verification Tests ===\n');

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✓ ${message}`);
}

// 1. Core Pages exist
const requiredFiles = [
  'index.html',
  '404.html',
  'llms.txt',
  path.join('sandbox', 'index.html'),
  path.join('workshop', 'index.html'),
  path.join('library', 'index.html'),
  path.join('about', 'index.html'),
  path.join('sandbox', 'orbital-thermal-limits', 'index.html'),
  path.join('sandbox', 'solar-power-budget', 'index.html'),
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(distDir, relPath);
  assert(fs.existsSync(fullPath), `File exists: dist/${relPath}`);
}

// 2. Content validation for index.html
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
assert(!homeHtml.includes('<div id="root"></div>'), 'Home HTML has pre-rendered body inside #root (not empty)');
assert(homeHtml.includes('Silicon Carbide Imperative'), 'Home HTML includes title text');
assert(homeHtml.includes('rel="canonical"'), 'Home HTML includes canonical link');

// 3. Content validation for orbital-thermal-limits
const thermalHtml = fs.readFileSync(path.join(distDir, 'sandbox', 'orbital-thermal-limits', 'index.html'), 'utf-8');
assert(
  thermalHtml.includes('<title id="meta-title">Orbital Compute Thermal Rejection Limits · Silicon Carbide Imperative Sandbox</title>'),
  'Orbital thermal module has exact static <title>',
);
assert(
  thermalHtml.includes('name="description" content="Interactive first-order thermal balance'),
  'Orbital thermal module has static meta description',
);
assert(
  thermalHtml.includes('Orbital thermal explorer') || thermalHtml.includes('Compute Ceilings') || thermalHtml.includes('Thermal Telemetry'),
  'Orbital thermal module has rendered telemetry and ceiling panels',
);
assert(
  thermalHtml.length > 5000,
  `Orbital thermal module HTML is substantial (${thermalHtml.length} bytes)`,
);

// 4. Content validation for solar-power-budget
const solarHtml = fs.readFileSync(path.join(distDir, 'sandbox', 'solar-power-budget', 'index.html'), 'utf-8');
assert(
  solarHtml.includes('<title id="meta-title">Solar Array Electrical Power Budget · Silicon Carbide Imperative Sandbox</title>'),
  'Solar power module has exact static <title>',
);
assert(
  solarHtml.includes('name="description" content="Orbit-averaged electrical power generation'),
  'Solar power module has static meta description',
);
assert(
  solarHtml.includes('Solar power budget explorer') || solarHtml.includes('Power Budget Breakdown') || solarHtml.includes('Solar Telemetry'),
  'Solar power module has rendered telemetry panels',
);
assert(
  solarHtml.includes('Solar power budget explorer') || solarHtml.includes('Power Budget Breakdown') || solarHtml.includes('Solar Telemetry'),
  'Solar power module has rendered telemetry panels',
);

// 5. Content validation for llms.txt
const llmsTxt = fs.readFileSync(path.join(distDir, 'llms.txt'), 'utf-8');
assert(llmsTxt.includes('# Silicon Carbide Imperative'), 'llms.txt has heading');
assert(llmsTxt.includes('/sandbox/orbital-thermal-limits/'), 'llms.txt links orbital-thermal-limits');
assert(llmsTxt.includes('/sandbox/solar-power-budget/'), 'llms.txt links solar-power-budget');
assert(llmsTxt.includes('/sandbox/llm-bitflip-resilience/'), 'llms.txt links llm-bitflip-resilience');
assert(llmsTxt.includes('Workshop 01'), 'llms.txt references Workshop 01');

console.log('\nPASS: All SSG Prerender verification tests passed successfully!\n');
