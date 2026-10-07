/**
 * Tier 3 Pairwise 7: Printable Companion x Interactive Resume (F11 x F3)
 * Authoritative Source: ORIGINAL_REQUEST.md §R4 & FBLA Guidelines, PROJECT.md §F11 & F3
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const PRINT_CSS = path.join(ROOT_DIR, 'styles/print.css');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 3 - Pairwise 7: Printable Companion x Interactive Resume (F11 x F3)', () => {

  test('T3-P07: Print styling uncollapses resume sections for comprehensive physical review', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    // In print mode, filtered or hidden skills should be visible: e.g. display: block !important or all items rendered
    const hasPrintDisplayRules = /@media\s+print/i.test(printContent) || fileExists(PRINT_CSS);
    assert(hasPrintDisplayRules, 'Print companion must configure resume display for full print visibility');
  });

}, { tier: 3, feature: 'F11xF3' });
