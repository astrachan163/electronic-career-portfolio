/**
 * Tier 2 Feature 13 Boundary Cases: Privacy & Security Redaction
 * Authoritative Source: ORIGINAL_REQUEST.md §Acceptance Criteria, PROJECT.md §Feature 13
 *
 * Verifies:
 * 1. Obfuscated phone number representations are detected and prevented.
 * 2. Case-insensitive screening for test logins (z@z.com, zzzzzz).
 * 3. Private developer email addresses (astrachan161, 162, 163) scrubbed from public build.
 * 4. Secret files (.env, private keys, credentials) are excluded from web output.
 * 5. Code comments in public assets do not leak redacted information.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, findFiles, checkPrivacyViolations } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const DIST_PUBLIC = path.join(ROOT_DIR, 'dist/public');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');

describe('Tier 2 - Feature 13 Boundary: Privacy & Security Redaction', () => {

  test('T2-B13-01: Obfuscated phone number formats (dots, parentheses, spaces) are completely absent', () => {
    const targetDir = fileExists(DIST_PUBLIC) ? DIST_PUBLIC : ROOT_DIR;
    const publicFiles = findFiles(targetDir, f => /\.(html|js|json)$/i.test(f) && !f.includes('tests') && !f.includes('.agents') && !f.includes('dist/private'));

    for (const file of publicFiles) {
      const content = loadFileContent(file) || '';
      // Check 228 area code variants
      const has228 = /228[-.\s]?224[-.\s]?7445|\(228\)\s*224-7445/.test(content);
      assert(!has228, `File ${file} contains phone number variant`);
    }
    assert(true, 'Phone number format variations screened');
  });

  test('T2-B13-02: Screening for test credentials is case-insensitive', () => {
    const targetDir = fileExists(DIST_PUBLIC) ? DIST_PUBLIC : ROOT_DIR;
    const publicFiles = findFiles(targetDir, f => /\.(html|js|json)$/i.test(f) && !f.includes('tests') && !f.includes('.agents') && !f.includes('dist/private'));

    for (const file of publicFiles) {
      const content = loadFileContent(file) || '';
      assert(!/z@z\.com/i.test(content), `File ${file} contains case-insensitive match for z@z.com`);
      assert(!/\bzzzzzz\b/i.test(content), `File ${file} contains test password`);
    }
    assert(true, 'Test credential variations screened');
  });

  test('T2-B13-03: Private personal email addresses are not exposed in public assets', () => {
    const targetDir = fileExists(DIST_PUBLIC) ? DIST_PUBLIC : ROOT_DIR;
    const publicFiles = findFiles(targetDir, f => /\.(html|js|json)$/i.test(f) && !f.includes('tests') && !f.includes('.agents') && !f.includes('dist/private'));

    for (const file of publicFiles) {
      const content = loadFileContent(file) || '';
      assert(!/astrachan16[123]@gmail\.com/i.test(content),
        `File ${file} must not expose private developer gmail accounts`);
    }
    assert(true, 'Developer emails screened');
  });

  test('T2-B13-04: No secret files (.env, id_rsa, .pem) exist in deployment directories', () => {
    const pubDist = path.join(ROOT_DIR, 'dist/public');
    if (fileExists(pubDist)) {
      const secrets = findFiles(pubDist, (_, name) => /^\.env|\.pem$|\.key$|id_rsa/i.test(name));
      assertEqual(secrets.length, 0, `Secrets found in public dist: ${secrets.join(', ')}`);
    }
    assert(true, 'Secret files exclusion checked');
  });

  test('T2-B13-05: Public HTML comments do not leak redacted notes or credentials', () => {
    const targetFile = fileExists(path.join(DIST_PUBLIC, 'index.html')) ? path.join(DIST_PUBLIC, 'index.html') : INDEX_HTML;
    if (fileExists(targetFile)) {
      const content = loadFileContent(targetFile) || '';
      const commentMatches = content.match(/<!--([\s\S]*?)-->/g) || [];
      for (const comment of commentMatches) {
        assert(!/password|zzzzzz|228-224|secret/i.test(comment),
          `HTML comment contains sensitive string: ${comment.slice(0, 50)}...`);
      }
    }
    assert(true, 'Comments screened for leaks');
  });

}, { tier: 2, feature: 'F13' });
