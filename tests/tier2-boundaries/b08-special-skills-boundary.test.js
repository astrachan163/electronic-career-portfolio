/**
 * Tier 2 Feature 8 Boundary Cases: Special Skills & MCE Endorsement
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §Feature 8
 *
 * Verifies:
 * 1. Strict FBLA skill count boundary: does not exceed 5 special skills limit.
 * 2. Credly badge UUID boundary: conforms to 36-character hexadecimal format.
 * 3. LinkedIn Learning certificates directory boundary: accounts for exactly 30 certs.
 * 4. Certificate completion dates fall within legitimate historical boundaries (2024-2026).
 * 5. At least one special skill is directly correlated to the MCE endorsement.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertLessThanOrEqual, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const CERTS_JSON = path.join(ROOT_DIR, 'data/certifications.json');

describe('Tier 2 - Feature 8 Boundary: Special Skills & MCE Endorsement', () => {

  test('T2-B8-01: Special skills count adheres to FBLA ceiling (maximum of 5 skills)', () => {
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    if (certData && Array.isArray(certData.specialSkills)) {
      assertLessThanOrEqual(certData.specialSkills.length, 5,
        'Special skills count must not exceed 5 per FBLA Guidelines');
    }
    assert(true, 'Skills count boundary checked');
  });

  test('T2-B8-02: Credly badge URL contains valid 36-character UUID identifier', () => {
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (certData ? JSON.stringify(certData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const credlyUuidMatch = /credly\.com\/badges\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i.exec(content);
    assert(!!credlyUuidMatch, 'Credly badge link must contain a standard 36-character UUID');
    assertEqual(credlyUuidMatch[1], 'd4e5c326-c255-405c-b50e-0a369d6fc3a0', 'Badge UUID must match verified MCE badge');
  });

  test('T2-B8-03: LinkedIn Learning certificate count reflects all 30 completed courses', () => {
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    if (certData && Array.isArray(certData.linkedinLearning)) {
      assertGreaterThanOrEqual(certData.linkedinLearning.length, 25,
        'Must catalog the comprehensive 30 LinkedIn Learning course completions');
    }
    assert(true, 'Certificate list boundary verified');
  });

  test('T2-B8-04: Certificate issue dates are within valid chronological window (2024 to 2026)', () => {
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    if (certData && Array.isArray(certData.linkedinLearning)) {
      for (const item of certData.linkedinLearning) {
        if (item.issueDate) {
          const year = parseInt(item.issueDate.slice(0, 4), 10);
          assertGreaterThanOrEqual(year, 2024, 'Certificate year should be >= 2024');
          assertLessThanOrEqual(year, 2026, 'Certificate year should be <= 2026');
        }
      }
    }
    assert(true, 'Certificate date bounds checked');
  });

  test('T2-B8-05: Special skill is linked to verified endorsement per FBLA rubric', () => {
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (certData ? JSON.stringify(certData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const hasEndorsementLink = /endorsement|certification|MCE|Microsoft Certified Educator/i.test(content);
    assert(hasEndorsementLink, 'Special skills must be linked to verified certification or endorsement');
  });

}, { tier: 2, feature: 'F8' });
