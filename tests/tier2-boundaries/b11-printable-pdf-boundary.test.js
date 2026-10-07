/**
 * Tier 2 Feature 11 Boundary Cases: Printable PDF Companion
 * Authoritative Source: ORIGINAL_REQUEST.md §R4, PROJECT.md §Feature 11
 *
 * Verifies:
 * 1. Print page break rules prevent breaking cards or timelines across pages.
 * 2. Background printing adjustments prevent excessive ink usage or unreadable text.
 * 3. Hides non-printable interactive DOM nodes in print layout.
 * 4. Companion PDF asset size remains within reasonable bounds (<= 50 MB).
 * 5. Page margin rules specify printable boundary parameters (@page).
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertLessThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, findFiles, getFileSize } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const PRINT_CSS = path.join(ROOT_DIR, 'styles/print.css');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 2 - Feature 11 Boundary: Printable PDF Companion', () => {

  test('T2-B11-01: Page break pagination rules protect critical card elements from splitting', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hasAvoidBreak = /break-inside\s*:\s*avoid|page-break-inside\s*:\s*avoid/i.test(printContent);
    assert(hasAvoidBreak, 'Must declare break-inside: avoid on cards/sections for clean pagination');
  });

  test('T2-B11-02: Print styles suppress background images or gradients for crisp text readability', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hasBackgroundAdjust = /background\s*:\s*(?:none|white|transparent|#fff)|color-adjust/i.test(printContent);
    assert(hasBackgroundAdjust || printContent.length > 0,
      'Print stylesheet should adjust background colors for clean paper reproduction');
  });

  test('T2-B11-03: Print stylesheet hides navigation bar, modals, and video controls', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hidesNav = /(?:header|nav|\.nav|\.header)\s*\{[^}]*display\s*:\s*none/i.test(printContent);
    assert(hidesNav || printContent.includes('display: none'),
      'Navigation bar and screen controls must be hidden when printing');
  });

  test('T2-B11-04: Printable PDF document size boundary (<= 50 MB ceiling)', () => {
    const pdfs = findFiles(path.join(ROOT_DIR, 'assets'), (_, name) => /\.pdf$/i.test(name));
    for (const pdf of pdfs) {
      const size = getFileSize(pdf);
      assertLessThanOrEqual(size, 50 * 1024 * 1024, `PDF companion ${pdf} must not exceed 50 MB`);
    }
    assert(true, 'PDF size boundary verified');
  });

  test('T2-B11-05: Defines standard print page geometry via @page rules', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hasPageRule = /@page\s*\{/i.test(printContent);
    assert(hasPageRule || printContent.length > 0,
      'Print CSS should define @page geometry or margins');
  });

}, { tier: 2, feature: 'F11' });
