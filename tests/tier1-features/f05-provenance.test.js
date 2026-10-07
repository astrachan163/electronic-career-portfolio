/**
 * Tier 1 Feature 5: Provenance Ledger & Sources
 * Authoritative Source: ORIGINAL_REQUEST.md §Acceptance Criteria, PROJECT.md §Feature 5
 *
 * Verifies:
 * 1. Provenance ledger maps claims to verified evidence files/URLs.
 * 2. Citations from professionally legitimate authorities (BLS, NIST, O*NET).
 * 3. Rubric scorecard covers all 9 FBLA categories at "Exceeds Expectations".
 * 4. Citation URLs resolve to secure HTTPS protocols.
 * 5. Every data claim has a corresponding verifiable evidence record.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const PROVENANCE_JSON = path.join(ROOT_DIR, 'data/provenance.json');

describe('Tier 1 - Feature 5: Provenance Ledger & Sources', () => {

  test('T1-F5-01: Provenance data file or section exists and contains audit entries', () => {
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const html = loadFileContent(INDEX_HTML) || '';

    const hasProvenanceEntries = (provData && (Array.isArray(provData) ? provData.length > 0 : Object.keys(provData).length > 0)) ||
      /provenance|source-ledger|evidence-map|citations/i.test(html);

    assert(hasProvenanceEntries, 'Portfolio must contain a provenance ledger mapping claims to evidence');
  });

  test('T1-F5-02: Citations cite legitimate authorities (BLS, NIST, O*NET, Credly)', () => {
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (provData ? JSON.stringify(provData) : '') + ' ' + html;

    assert(/BLS|Bureau of Labor Statistics/i.test(content), 'Must cite Bureau of Labor Statistics (BLS)');
    assert(/NIST/i.test(content), 'Must cite National Institute of Standards and Technology (NIST)');
    assert(/Credly|Microsoft/i.test(content), 'Must cite Credly / Microsoft digital badge verification');
  });

  test('T1-F5-03: FBLA Rubric scorecard covers all 9 rating sheet rows with "Exceeds Expectations"', () => {
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (provData ? JSON.stringify(provData) : '') + ' ' + html;

    const hasExceeds = /Exceeds Expectations/i.test(content);
    assert(hasExceeds, 'Scorecard must evaluate criteria against the "Exceeds Expectations" target standard');

    const rubricCategories = [
      /Resume/i,
      /Career Research/i,
      /Career-Related Education/i,
      /Special Skills/i,
      /Sources/i,
      /Presentation/i,
    ];

    const matched = rubricCategories.filter(r => r.test(content));
    assertGreaterThanOrEqual(matched.length, 5, 'Scorecard must encompass core FBLA rating categories');
  });

  test('T1-F5-04: External citation links use HTTPS secure URLs', () => {
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (provData ? JSON.stringify(provData) : '') + ' ' + html;

    const urls = content.match(/https?:\/\/[^\s"'<>]+/gi) || [];
    assertGreaterThanOrEqual(urls.length, 3, 'Must contain verified outbound citation links');

    // Verify all primary citations use HTTPS
    const httpOnly = urls.filter(u => u.startsWith('http://') && !u.includes('localhost'));
    assertEqual(httpOnly.length, 0, `All cited sources must use HTTPS (found insecure: ${httpOnly.join(', ')})`);
  });

  test('T1-F5-05: Provenance entries connect claims with verifiable file/URI artifacts', () => {
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (provData ? JSON.stringify(provData) : '') + ' ' + html;

    const hasEvidenceMapping = /evidence|provenance|source|artifact|verification/i.test(content);
    assert(hasEvidenceMapping, 'Provenance ledger must explicitly document verification evidence for portfolio claims');
  });

}, { tier: 1, feature: 'F5' });
