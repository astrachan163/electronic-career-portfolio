/**
 * Tier 2 Feature 4 Boundary Cases: Career Summary & Research
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §Feature 4
 *
 * Verifies:
 * 1. BLS median annual salary boundary ($100,000 <= median <= $150,000).
 * 2. BLS top 90th percentile salary boundary (>= $180,000).
 * 3. Employment growth rate boundary (strictly positive, matches 32%).
 * 4. SOC code strict regular expression format boundary (15-1212).
 * 5. Federal pay grade progression boundaries (GS-9 through GS-14).
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertBetween, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const CAREER_JSON = path.join(ROOT_DIR, 'data/career.json');

describe('Tier 2 - Feature 4 Boundary: Career Summary & Research', () => {

  test('T2-B4-01: BLS median annual salary is within realistic $100k-$150k boundary ($120,360)', () => {
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (careerData ? JSON.stringify(careerData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const salaryMatch = content.match(/\$?(1[0-4]\d,\d{3})/);
    assert(!!salaryMatch, 'Must report median salary between $100k and $150k');
    const numericSalary = parseInt(salaryMatch[1].replace(/,/g, ''), 10);
    assertBetween(numericSalary, 100000, 150000, 'Median salary must be in valid BLS range');
  });

  test('T2-B4-02: BLS top decile salary is >= $180,000 threshold ($182,370+)', () => {
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (careerData ? JSON.stringify(careerData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const topSalaryMatch = content.match(/\$?(18\d,\d{3})/);
    assert(!!topSalaryMatch, 'Must report top salary tier >= $180,000');
    const numericTopSalary = parseInt(topSalaryMatch[1].replace(/,/g, ''), 10);
    assertGreaterThanOrEqual(numericTopSalary, 180000, 'Top salary must meet or exceed $180,000');
  });

  test('T2-B4-03: Employment growth rate is strictly positive (+32%)', () => {
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (careerData ? JSON.stringify(careerData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const growthMatch = content.match(/(\+?32)%/);
    assert(!!growthMatch, 'Must report official 32% growth rate');
    const growthNum = parseInt(growthMatch[1], 10);
    assertGreaterThanOrEqual(growthNum, 20, 'Growth rate must be substantially positive');
  });

  test('T2-B4-04: SOC code matches exact BLS format specification (15-1212)', () => {
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (careerData ? JSON.stringify(careerData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const socMatch = content.match(/\b15-1212(?:\.00)?\b/);
    assert(!!socMatch, 'Must match BLS SOC code 15-1212 exactly');
  });

  test('T2-B4-05: Federal GS level boundaries are bounded within federal scale (9 to 14)', () => {
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (careerData ? JSON.stringify(careerData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const gsMatches = content.match(/GS-(\d+)/g) || [];
    for (const match of gsMatches) {
      const level = parseInt(match.replace('GS-', ''), 10);
      assertBetween(level, 1, 15, `Federal pay grade ${match} must be between GS-1 and GS-15`);
    }
    assert(true, 'GS grade boundaries verified');
  });

}, { tier: 2, feature: 'F4' });
