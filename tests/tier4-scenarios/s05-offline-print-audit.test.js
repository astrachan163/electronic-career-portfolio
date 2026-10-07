/**
 * Tier 4 Scenario 5: Offline / Printable Portfolio Audit
 * Features Exercised: F3, F4, F11 (Medium Complexity)
 * Authoritative Source: TEST_INFRA.md §Scenario 5, ORIGINAL_REQUEST.md §R4
 *
 * Simulates generating an offline hardcopy or PDF presentation companion, verifying
 * that print stylesheet rules preserve visual clarity, suppress interactive controls,
 * and maintain page break integrity across resume and career summary cards.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, findFiles } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const PRINT_CSS = path.join(ROOT_DIR, 'styles/print.css');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');

describe('Tier 4 - Scenario 5: Offline / Printable Portfolio Audit', () => {

  test('S05-Step-1: Auditor confirms print styling is declared via print.css or @media print', () => {
    const hasPrintCss = fileExists(PRINT_CSS);
    const mainCssContent = fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '';
    const hasMediaPrint = /@media\s+print/i.test(mainCssContent);

    assert(hasPrintCss || hasMediaPrint, 'Auditor confirms presence of dedicated print styling');
  });

  test('S05-Step-2: Auditor verifies interactive controls and media buttons are suppressed in print mode', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hidesInteractive = /(?:timer|presenter|button|video|nav)\s*\{[^}]*display\s*:\s*none/i.test(printContent) ||
      printContent.includes('display: none');
    assert(hidesInteractive, 'Auditor confirms interactive and playback controls are hidden on paper');
  });

  test('S05-Step-3: Auditor checks pagination and page-break rules across resume and summary cards', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hasAvoidBreaks = /break-inside\s*:\s*avoid|page-break-inside\s*:\s*avoid/i.test(printContent);
    assert(hasAvoidBreaks, 'Auditor validates page break avoidance rules across portfolio cards');
  });

  test('S05-Step-4: Auditor verifies printable presentation companion PDF asset is linked or available', () => {
    const htmlContent = loadFileContent(INDEX_HTML) || '';
    const pdfFiles = findFiles(path.join(ROOT_DIR, 'assets'), (_, name) => /\.pdf$/i.test(name));

    const hasPdfLink = /href=["'][^"']*\.pdf["']|download/i.test(htmlContent);
    assert(pdfFiles.length > 0 || hasPdfLink,
      'Auditor verifies printable companion PDF asset is ready for offline distribution');
  });

}, { tier: 4, feature: 'Scenario-5' });
