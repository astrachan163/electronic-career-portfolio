#!/usr/bin/env node

/**
 * Self-Contained E2E Test Runner
 * Andrew Strachan Electronic Career Portfolio
 *
 * Runs across 4 sequential test tiers:
 * - Tier 1: Feature Coverage (Features 1-14, >=5 assertions each)
 * - Tier 2: Boundary & Corner Cases (Features 1-14, >=5 assertions each)
 * - Tier 3: Cross-Feature Pairwise Interactions (14 interactions)
 * - Tier 4: Real-World Application Scenarios (7 Scenarios)
 *
 * Usage:
 *   node tests/runner.js
 *   node tests/runner.js --tier=1
 *   node tests/runner.js --feature=F1
 *   node tests/runner.js --verbose
 */

const fs = require('fs');
const path = require('path');
const { runAllSuites } = require('./helpers/test-harness');

// Parse CLI flags
const args = process.argv.slice(2);
const options = {
  tier: null,
  feature: null,
  verbose: false,
};

for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    options.tier = arg.split('=')[1];
  } else if (arg.startsWith('--feature=')) {
    options.feature = arg.split('=')[1];
  } else if (arg === '--verbose' || arg === '-v') {
    options.verbose = true;
  } else if (arg === '--help' || arg === '-h') {
    console.log(`
Usage: node tests/runner.js [options]

Options:
  --tier=<1|2|3|4>   Run tests for a specific tier only
  --feature=<name>   Run tests for a specific feature (e.g. F1, F2, Scenario-1)
  --verbose, -v      Show detailed output for every test case
  --help, -h         Show this help message
`);
    process.exit(0);
  }
}

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

function logHeader(text) {
  console.log(`\n${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  ${text}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);
}

function loadAllTests() {
  const tiers = [
    { dir: 'tier1-features', tier: 1 },
    { dir: 'tier2-boundaries', tier: 2 },
    { dir: 'tier3-pairwise', tier: 3 },
    { dir: 'tier4-scenarios', tier: 4 },
  ];

  for (const { dir, tier } of tiers) {
    if (options.tier && String(options.tier) !== String(tier)) {
      continue;
    }
    const fullDir = path.join(__dirname, dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.test.js')).sort();
    for (const file of files) {
      try {
        require(path.join(fullDir, file));
      } catch (err) {
        console.error(`${colors.red}Failed to load test file ${file}:${colors.reset}`, err);
      }
    }
  }
}

async function main() {
  const startTime = Date.now();
  logHeader('Andrew Strachan - Electronic Career Portfolio E2E Test Suite');

  console.log(`${colors.dim}Loading test files across all tiers...${colors.reset}`);
  loadAllTests();

  console.log(`${colors.dim}Executing test suites...${colors.reset}\n`);
  const results = await runAllSuites(options);

  // Group suites by Tier
  const tierGroups = {
    1: { name: 'Tier 1: Feature Coverage (Features 1-14)', suites: [], passed: 0, failed: 0, assertions: 0 },
    2: { name: 'Tier 2: Boundary & Corner Cases (Features 1-14)', suites: [], passed: 0, failed: 0, assertions: 0 },
    3: { name: 'Tier 3: Cross-Feature Pairwise Interactions', suites: [], passed: 0, failed: 0, assertions: 0 },
    4: { name: 'Tier 4: Real-World Application Scenarios', suites: [], passed: 0, failed: 0, assertions: 0 },
  };

  for (const suite of results.suites) {
    const tierNum = suite.tier || 1;
    if (!tierGroups[tierNum]) {
      tierGroups[tierNum] = { name: `Tier ${tierNum}`, suites: [], passed: 0, failed: 0, assertions: 0 };
    }
    tierGroups[tierNum].suites.push(suite);
    tierGroups[tierNum].passed += suite.passed;
    tierGroups[tierNum].failed += suite.failed;
    tierGroups[tierNum].assertions += suite.assertions;
  }

  // Display results per tier
  for (const [tierNum, group] of Object.entries(tierGroups)) {
    if (group.suites.length === 0) continue;
    const tierStatus = group.failed === 0 ? `${colors.green}PASS${colors.reset}` : `${colors.red}FAIL (${group.failed} failed)${colors.reset}`;
    console.log(`${colors.bold}--- ${group.name} [${tierStatus}] ---${colors.reset}`);

    for (const suite of group.suites) {
      const suiteIcon = suite.failed === 0 ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
      console.log(`  ${suiteIcon} ${suite.title} (${suite.passed}/${suite.tests.length} passed, ${suite.assertions} assertions)`);

      if (options.verbose || suite.failed > 0) {
        for (const t of suite.tests) {
          const testIcon = t.passed ? `${colors.green}  ✓${colors.reset}` : `${colors.red}  ✗${colors.reset}`;
          console.log(`    ${testIcon} ${t.title} ${colors.dim}(${t.assertions} assertions, ${t.durationMs}ms)${colors.reset}`);
          if (!t.passed && t.error) {
            console.log(`      ${colors.red}${colors.dim}Error: ${t.error}${colors.reset}`);
          }
        }
      }
    }
    console.log('');
  }

  // Summary section
  const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`${colors.bold}${colors.cyan}----------------------------------------------------------------------${colors.reset}`);
  console.log(`${colors.bold}TEST SUITE SUMMARY${colors.reset}`);
  console.log(`${colors.cyan}----------------------------------------------------------------------${colors.reset}`);
  console.log(`Total Test Suites   : ${results.suites.length}`);
  console.log(`Total Test Cases    : ${results.totalTests}`);
  console.log(`Passed Test Cases   : ${colors.green}${results.passed}${colors.reset}`);
  console.log(`Failed Test Cases   : ${results.failed > 0 ? colors.red : colors.green}${results.failed}${colors.reset}`);
  console.log(`Total Assertions    : ${colors.bold}${results.totalAssertions}${colors.reset}`);
  console.log(`Execution Time      : ${totalElapsed}s`);

  if (results.failures.length > 0) {
    console.log(`\n${colors.bold}${colors.red}FAILURES DETAIL (${results.failures.length}):${colors.reset}`);
    results.failures.slice(0, 10).forEach((f, idx) => {
      console.log(`\n${colors.red}[${idx + 1}] ${f.suite} -> ${f.test}${colors.reset}`);
      console.log(`    ${colors.dim}${f.error ? f.error.message : 'Unknown error'}${colors.reset}`);
    });
    if (results.failures.length > 10) {
      console.log(`\n${colors.dim}... and ${results.failures.length - 10} more failures (run with --verbose for full output)${colors.reset}`);
    }
  }

  console.log(`${colors.cyan}----------------------------------------------------------------------${colors.reset}\n`);

  // Exit code semantics: 0 on success, 1 on failure
  process.exit(results.failed === 0 ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});
