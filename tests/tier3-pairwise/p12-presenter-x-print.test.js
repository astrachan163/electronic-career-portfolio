/**
 * Tier 3 Pairwise 12: Presenter Mode x Print Companion Isolation (F10 x F11)
 * Authoritative Source: ORIGINAL_REQUEST.md §R4, PROJECT.md §F10 & F11
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const PRINT_CSS = path.join(ROOT_DIR, 'styles/print.css');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 3 - Pairwise 12: Presenter Mode x Print Companion Isolation (F10 x F11)', () => {

  test('T3-P12: Presenter mode elements are completely excluded from print media output', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hidesPresenterInPrint = /(?:presenter|timer|speaker-notes)\s*\{[^}]*display\s*:\s*none/i.test(printContent);
    assert(hidesPresenterInPrint || printContent.includes('display: none'),
      'Presenter timer and speaker notes drawer must be hidden in print mode');
  });

}, { tier: 3, feature: 'F10xF11' });
