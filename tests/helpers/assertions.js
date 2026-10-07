/**
 * Assertions helper for E2E Test Suite
 * Provides rich, readable assertion functions with automated assertion counting.
 */

class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

let currentContext = {
  assertionCount: 0,
};

function setTestContext(ctx) {
  currentContext = ctx;
}

function countAssertion() {
  if (currentContext) {
    currentContext.assertionCount = (currentContext.assertionCount || 0) + 1;
  }
}

function assert(condition, message = 'Expected condition to be truthy') {
  countAssertion();
  if (!condition) {
    throw new AssertionError(message, condition, true);
  }
}

function assertEqual(actual, expected, message) {
  countAssertion();
  const defaultMsg = `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`;
  if (actual !== expected) {
    throw new AssertionError(message || defaultMsg, actual, expected);
  }
}

function assertNotEqual(actual, unexpected, message) {
  countAssertion();
  const defaultMsg = `Expected value NOT to equal ${JSON.stringify(unexpected)}`;
  if (actual === unexpected) {
    throw new AssertionError(message || defaultMsg, actual, unexpected);
  }
}

function assertIncludes(haystack, needle, message) {
  countAssertion();
  const defaultMsg = `Expected ${typeof haystack === 'string' ? '"' + haystack.slice(0, 100) + '..."' : JSON.stringify(haystack)} to include ${JSON.stringify(needle)}`;
  if (typeof haystack === 'string') {
    if (!haystack.includes(needle)) {
      throw new AssertionError(message || defaultMsg, haystack, needle);
    }
  } else if (Array.isArray(haystack)) {
    if (!haystack.includes(needle)) {
      throw new AssertionError(message || defaultMsg, haystack, needle);
    }
  } else if (haystack && typeof haystack === 'object') {
    if (!(needle in haystack)) {
      throw new AssertionError(message || defaultMsg, Object.keys(haystack), needle);
    }
  } else {
    throw new AssertionError(message || `Cannot check includes on non-collection`, haystack, needle);
  }
}

function assertNotIncludes(haystack, needle, message) {
  countAssertion();
  const defaultMsg = `Expected collection NOT to include ${JSON.stringify(needle)}`;
  if (typeof haystack === 'string') {
    if (haystack.includes(needle)) {
      throw new AssertionError(message || defaultMsg, haystack, needle);
    }
  } else if (Array.isArray(haystack)) {
    if (haystack.includes(needle)) {
      throw new AssertionError(message || defaultMsg, haystack, needle);
    }
  } else if (haystack && typeof haystack === 'object') {
    if (needle in haystack) {
      throw new AssertionError(message || defaultMsg, Object.keys(haystack), needle);
    }
  }
}

function assertMatch(str, regex, message) {
  countAssertion();
  const defaultMsg = `Expected string to match ${regex.toString()}`;
  if (!regex.test(str)) {
    throw new AssertionError(message || defaultMsg, str, regex.toString());
  }
}

function assertNotMatch(str, regex, message) {
  countAssertion();
  const defaultMsg = `Expected string NOT to match ${regex.toString()}`;
  if (regex.test(str)) {
    throw new AssertionError(message || defaultMsg, str, regex.toString());
  }
}

function assertGreaterThanOrEqual(actual, min, message) {
  countAssertion();
  const defaultMsg = `Expected ${actual} to be >= ${min}`;
  if (typeof actual !== 'number' || actual < min) {
    throw new AssertionError(message || defaultMsg, actual, min);
  }
}

function assertLessThanOrEqual(actual, max, message) {
  countAssertion();
  const defaultMsg = `Expected ${actual} to be <= ${max}`;
  if (typeof actual !== 'number' || actual > max) {
    throw new AssertionError(message || defaultMsg, actual, max);
  }
}

function assertBetween(actual, min, max, message) {
  countAssertion();
  const defaultMsg = `Expected ${actual} to be between ${min} and ${max}`;
  if (typeof actual !== 'number' || actual < min || actual > max) {
    throw new AssertionError(message || defaultMsg, actual, { min, max });
  }
}

module.exports = {
  AssertionError,
  setTestContext,
  assert,
  assertEqual,
  assertNotEqual,
  assertIncludes,
  assertNotIncludes,
  assertMatch,
  assertNotMatch,
  assertGreaterThanOrEqual,
  assertLessThanOrEqual,
  assertBetween,
};
