/**
 * Self-contained Test Harness for E2E Test Suite
 * Provides describe/test semantics, assertion tracking, and rich console reporting.
 */

const { setTestContext } = require('./assertions');

const testSuites = [];
let currentSuite = null;

function describe(suiteTitle, fn, meta = {}) {
  const suite = {
    title: suiteTitle,
    tier: meta.tier || null,
    feature: meta.feature || null,
    tests: [],
    beforeHooks: [],
    afterHooks: [],
  };

  const previousSuite = currentSuite;
  currentSuite = suite;
  testSuites.push(suite);

  try {
    fn();
  } finally {
    currentSuite = previousSuite;
  }
}

function test(testTitle, fn) {
  if (!currentSuite) {
    throw new Error(`test("${testTitle}") must be declared inside a describe() block`);
  }
  currentSuite.tests.push({
    title: testTitle,
    fn,
  });
}

function beforeAll(fn) {
  if (currentSuite) currentSuite.beforeHooks.push(fn);
}

function afterAll(fn) {
  if (currentSuite) currentSuite.afterHooks.push(fn);
}

async function runAllSuites(options = {}) {
  const results = {
    totalSuites: testSuites.length,
    totalTests: 0,
    passed: 0,
    failed: 0,
    totalAssertions: 0,
    failures: [],
    suites: [],
  };

  for (const suite of testSuites) {
    // Filter by tier or feature if requested
    if (options.tier && suite.tier && String(suite.tier) !== String(options.tier)) {
      continue;
    }
    if (options.feature && suite.feature && String(suite.feature).toLowerCase() !== String(options.feature).toLowerCase()) {
      continue;
    }

    const suiteResult = {
      title: suite.title,
      tier: suite.tier,
      feature: suite.feature,
      tests: [],
      passed: 0,
      failed: 0,
      assertions: 0,
    };

    // Run before hooks
    for (const hook of suite.beforeHooks) {
      try {
        await hook();
      } catch (err) {
        console.error(`Error in beforeAll for ${suite.title}:`, err.message);
      }
    }

    for (const t of suite.tests) {
      results.totalTests++;
      const ctx = { assertionCount: 0 };
      setTestContext(ctx);

      const startTime = Date.now();
      let pass = true;
      let testError = null;

      try {
        await t.fn();
      } catch (err) {
        pass = false;
        testError = err;
      } finally {
        setTestContext(null);
      }

      const durationMs = Date.now() - startTime;
      const assertions = ctx.assertionCount;
      results.totalAssertions += assertions;
      suiteResult.assertions += assertions;

      if (pass) {
        results.passed++;
        suiteResult.passed++;
      } else {
        results.failed++;
        suiteResult.failed++;
        results.failures.push({
          suite: suite.title,
          test: t.title,
          tier: suite.tier,
          feature: suite.feature,
          error: testError,
        });
      }

      suiteResult.tests.push({
        title: t.title,
        passed: pass,
        assertions,
        durationMs,
        error: testError ? (testError.message || String(testError)) : null,
      });
    }

    // Run after hooks
    for (const hook of suite.afterHooks) {
      try {
        await hook();
      } catch (err) {
        console.error(`Error in afterAll for ${suite.title}:`, err.message);
      }
    }

    results.suites.push(suiteResult);
  }

  return results;
}

function clearSuites() {
  testSuites.length = 0;
  currentSuite = null;
}

module.exports = {
  describe,
  test,
  beforeAll,
  afterAll,
  runAllSuites,
  clearSuites,
};
