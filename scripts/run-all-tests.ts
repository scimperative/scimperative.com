const suites = [
  'src/sandbox/core/play/play.test.ts',
  'src/sandbox/modules/orbital-thermal-limits/model.test.ts',
  'src/sandbox/modules/orbital-thermal-limits/challenge/challenge.test.ts',
  'src/sandbox/modules/orbital-thermal-limits/play/play.test.ts',
  'src/sandbox/modules/solar-power-budget/model.test.ts',
  'src/sandbox/modules/solar-power-budget/challenge/challenge.test.ts',
  'src/sandbox/modules/solar-power-budget/play/play.test.ts',
  'src/sandbox/modules/llm-bitflip-resilience/model.test.ts',
  'src/sandbox/modules/llm-bitflip-resilience/challenge/challenge.test.ts',
  'src/sandbox/modules/llm-bitflip-resilience/play/play.test.ts',
];

console.log('Running test suites across all modules...\n');

for (const suite of suites) {
  console.log(`=== Running ${suite} ===`);
  try {
    await import(`../${suite}`);
    console.log(`=== Passed: ${suite} ===\n`);
  } catch (err) {
    console.error(`\nâŒ Failed: ${suite}`, err);
    process.exit(1);
  }
}

console.log('âœ… All module test suites passed successfully.');
