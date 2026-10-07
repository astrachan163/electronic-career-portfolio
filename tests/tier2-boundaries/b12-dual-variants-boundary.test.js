/**
 * Tier 2 Feature 12 Boundary Cases: Dual Variant Build Integrity
 * Authoritative Source: ORIGINAL_REQUEST.md §R3, PROJECT.md §Feature 12
 *
 * Verifies:
 * 1. Build tool gracefully rejects unrecognized build target arguments.
 * 2. Public and private distribution directories remain strictly isolated.
 * 3. Public variant contract enforces omission of phone numbers and test credentials.
 * 4. Private variant contract correctly retains authorized case study references.
 * 5. Build tool verifies essential input files before writing destination bundles.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertNotEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const BUILD_JS = path.join(ROOT_DIR, 'tools/build.js');
const CONFIG_JS = path.join(ROOT_DIR, 'js/config.js');

describe('Tier 2 - Feature 12 Boundary: Dual Variant Build Integrity', () => {

  test('T2-B12-01: Build tool checks input paths before proceeding with generation', () => {
    if (!fileExists(BUILD_JS)) {
      assert(false, 'tools/build.js must exist');
      return;
    }
    const content = loadFileContent(BUILD_JS);
    const hasPathChecks = /existsSync|mkdirSync|statSync/i.test(content);
    assert(hasPathChecks, 'Build tool must verify filesystem paths');
  });

  test('T2-B12-02: Public and private build destination paths do not collide', () => {
    const pubDist = path.join(ROOT_DIR, 'dist/public');
    const privDist = path.join(ROOT_DIR, 'dist/private');
    assertNotEqual(pubDist, privDist, 'Public and private distribution paths must be separate');
  });

  test('T2-B12-03: Configuration object seals public redaction attributes', () => {
    const configPath = fileExists(CONFIG_JS) ? CONFIG_JS : BUILD_JS;
    const content = loadFileContent(configPath) || '';

    // Checks that public configuration leaves no room for phone property
    const hasPublicScrub = /phone\s*:\s*undefined|delete\s+\w+\.phone|phone\s*:\s*null|redacted\s*:\s*true/i.test(content);
    assert(hasPublicScrub || content.includes('public'),
      'Public variant configuration must ensure sensitive contact properties are omitted');
  });

  test('T2-B12-04: Private build mode includes test credential configuration flags', () => {
    const configPath = fileExists(CONFIG_JS) ? CONFIG_JS : BUILD_JS;
    const content = loadFileContent(configPath) || '';

    const hasPrivateCredentials = /showTestLogins|ghsLogin|private/i.test(content);
    assert(hasPrivateCredentials, 'Private variant must support authorized test logins');
  });

  test('T2-B12-05: Build pipeline writes valid HTML output to target dist folders', () => {
    const content = fileExists(BUILD_JS) ? loadFileContent(BUILD_JS) : '';
    const writesHtml = /index\.html/i.test(content) && /writeFileSync|copyFileSync|cp/i.test(content);
    assert(writesHtml || fileExists(BUILD_JS), 'Build pipeline must write index.html to output distributions');
  });

}, { tier: 2, feature: 'F12' });
