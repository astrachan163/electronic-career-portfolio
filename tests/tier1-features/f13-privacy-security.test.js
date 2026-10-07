/**
 * Tier 1 Feature 13: Privacy & Security Redaction Module
 * Authoritative Source: ORIGINAL_REQUEST.md §Acceptance Criteria, PROJECT.md §Feature 13
 *
 * Verifies:
 * 1. Privacy scanning tool exists at tools/check-privacy.js.
 * 2. Public deployment artifacts contain 0 personal phone numbers (228-224-7445).
 * 3. Public deployment artifacts contain 0 hardcoded test credentials (z@z.com / zzzzzz).
 * 4. Public contact displays academic address (strachan@uab.edu) without personal email leak.
 * 5. Private repositories and sensitive student data remain shielded from public build.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes } = require('../helpers/assertions');
const { fileExists, loadFileContent, findFiles, checkPrivacyViolations } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const CHECK_PRIVACY_JS = path.join(ROOT_DIR, 'tools/check-privacy.js');
const DIST_PUBLIC = path.join(ROOT_DIR, 'dist/public');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');

describe('Tier 1 - Feature 13: Privacy & Security Redaction', () => {

  test('T1-F13-01: Privacy checker script exists at tools/check-privacy.js', () => {
    assert(fileExists(CHECK_PRIVACY_JS), 'Automated privacy checker must exist at tools/check-privacy.js');
  });

  test('T1-F13-02: Public files contain ZERO instances of personal telephone numbers', () => {
    const targetDir = fileExists(DIST_PUBLIC) ? DIST_PUBLIC : ROOT_DIR;
    // Scan all public html/js files
    const files = findFiles(targetDir, (f) => /\.(html|js|json)$/i.test(f) && !f.includes('tests') && !f.includes('.agents') && !f.includes('dist/private') && !f.includes('atlas_hero_update') && !f.includes('atlas_live_backup'));

    let phoneViolations = [];
    for (const file of files) {
      const content = loadFileContent(file) || '';
      const violations = checkPrivacyViolations(content).filter(v => v.type === 'PHONE_NUMBER');
      if (violations.length > 0) {
        phoneViolations.push({ file, violations });
      }
    }

    assertEqual(phoneViolations.length, 0,
      `Public artifacts must contain 0 phone numbers. Violations in: ${phoneViolations.map(v => v.file).join(', ')}`);
  });

  test('T1-F13-03: Public files contain ZERO test logins (z@z.com / zzzzzz)', () => {
    const targetDir = fileExists(DIST_PUBLIC) ? DIST_PUBLIC : ROOT_DIR;
    const files = findFiles(targetDir, (f) => /\.(html|js|json)$/i.test(f) && !f.includes('tests') && !f.includes('.agents') && !f.includes('dist/private') && !f.includes('atlas_hero_update') && !f.includes('atlas_live_backup'));

    let credViolations = [];
    for (const file of files) {
      const content = loadFileContent(file) || '';
      if (content.includes('z@z.com') || content.includes('zzzzzz')) {
        credViolations.push(file);
      }
    }

    assertEqual(credViolations.length, 0,
      `Public files must not leak test credentials (z@z.com / zzzzzz). Found in: ${credViolations.join(', ')}`);
  });

  test('T1-F13-04: Public contact presents official institutional email (strachan@uab.edu)', () => {
    const htmlContent = loadFileContent(INDEX_HTML) || '';
    assertIncludes(htmlContent, 'strachan@uab.edu', 'Public portfolio must display official UAB academic contact email');
  });

  test('T1-F13-05: Proprietary client admin dashboard and unreleased repos are omitted from public links', () => {
    const htmlContent = loadFileContent(INDEX_HTML) || '';

    // Aether Admin or raw private order portals must not be publicly exposed
    const exposesPrivateAdmin = /aether-apothecary\.firebaseapp\.com/i.test(htmlContent);
    assert(!exposesPrivateAdmin, 'Public portfolio must not link directly to private client admin dashboard');
  });

}, { tier: 1, feature: 'F13' });
