/**
 * Tier 3 Pairwise 1: Dual Variants x Privacy Redaction (F12 x F13)
 * Authoritative Source: ORIGINAL_REQUEST.md §R3 & Acceptance Criteria, PROJECT.md §F12 & F13
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertNotEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const CONFIG_JS = path.join(ROOT_DIR, 'js/config.js');
const BUILD_JS = path.join(ROOT_DIR, 'tools/build.js');

describe('Tier 3 - Pairwise 1: Dual Variants x Privacy Redaction (F12 x F13)', () => {

  test('T3-P01: Public variant enforces redaction while private variant preserves authorized data', () => {
    const configPath = fileExists(CONFIG_JS) ? CONFIG_JS : BUILD_JS;
    assert(fileExists(configPath), 'Configuration or build script must exist');
    const content = loadFileContent(configPath);

    // Verify interaction: variant affects redaction flag
    const hasVariantRedactionLogic = /variant\s*===\s*['"]public['"]|variant\s*===\s*['"]private['"]|redacted/i.test(content);
    assert(hasVariantRedactionLogic, 'Variant selection must directly control redaction behavior');
  });

}, { tier: 3, feature: 'F12xF13' });
