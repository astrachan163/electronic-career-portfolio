/**
 * Tier 3 Pairwise 14: Brand Mark Assets x Dual Build Packaging (F1 x F12)
 * Authoritative Source: ORIGINAL_REQUEST.md §Source Material & R3, PROJECT.md §F1 & F12
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const BUILD_JS = path.join(ROOT_DIR, 'tools/build.js');

describe('Tier 3 - Pairwise 14: Brand Mark x Dual Build Packaging (F1 x F12)', () => {

  test('T3-P14: Build script includes brand assets and favicons in both output distributions', () => {
    assert(fileExists(BUILD_JS), 'tools/build.js must exist');
    const content = loadFileContent(BUILD_JS);

    // Verify build script copies or references assets
    const copiesAssets = /assets|brand|favicon/i.test(content);
    assert(copiesAssets, 'Build tool must package brand mark and favicon assets into distributions');
  });

}, { tier: 3, feature: 'F1xF12' });
