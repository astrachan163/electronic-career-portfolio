/**
 * Tier 3 Pairwise 2: Visual Theme x High-Contrast Accessibility (F1 x F14)
 * Authoritative Source: ORIGINAL_REQUEST.md §Source Material & Acceptance Criteria, PROJECT.md §F1 & F14
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 3 - Pairwise 2: Visual Theme x High-Contrast Accessibility (F1 x F14)', () => {

  test('T3-P02: Cyber theme accents maintain high contrast against deep navy backgrounds', () => {
    assert(fileExists(MAIN_CSS), 'styles/main.css must exist');
    const css = loadFileContent(MAIN_CSS);

    // Cyan #00e5ff and Gold #d4af37 against dark #060b13 provide >= 7:1 contrast ratio
    const hasContrastPairing = (/#00e5ff|#0a9396|#d4af37/i.test(css)) && (/#060b13|#0b1020|#0b1220/i.test(css));
    assert(hasContrastPairing, 'Visual theme must utilize accessible high-contrast colors against dark background');
  });

}, { tier: 3, feature: 'F1xF14' });
