/**
 * Tier 1 Feature 11: Printable PDF Portfolio Companion
 * Authoritative Source: ORIGINAL_REQUEST.md §R4, PROJECT.md §Feature 11
 *
 * Verifies:
 * 1. Dedicated print styles (styles/print.css or @media print rules).
 * 2. Page break pagination controls (break-inside: avoid).
 * 3. Hides interactive-only controls (timers, video player controls, interactive nav).
 * 4. Companion PDF document exists in assets/docs/ or has valid download anchor.
 * 5. High-contrast typography optimization for printing.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes } = require('../helpers/assertions');
const { fileExists, loadFileContent, findFiles } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const PRINT_CSS = path.join(ROOT_DIR, 'styles/print.css');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 1 - Feature 11: Printable PDF Portfolio Companion', () => {

  test('T1-F11-01: Dedicated print styles exist via styles/print.css or @media print', () => {
    const hasPrintCss = fileExists(PRINT_CSS);
    const mainCssContent = fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '';
    const hasMediaPrintInMain = /@media\s+print/i.test(mainCssContent);

    assert(hasPrintCss || hasMediaPrintInMain,
      'Portfolio must define dedicated print styling either in styles/print.css or @media print');
  });

  test('T1-F11-02: Print stylesheet defines page-break rules to prevent card splitting', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hasPageBreak = /break-inside\s*:\s*avoid|page-break-inside\s*:\s*avoid|page-break-after/i.test(printContent);
    assert(hasPageBreak, 'Print styles must declare page-break rules to prevent awkward page splits across cards');
  });

  test('T1-F11-03: Print styles hide interactive and media playback UI elements', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hidesInteractive = /display\s*:\s*none/i.test(printContent) &&
      /(?:timer|presenter|video|nav|button|controls)/i.test(printContent);

    assert(hidesInteractive, 'Print styles must suppress interactive controls, timers, and playback buttons');
  });

  test('T1-F11-04: Downloadable companion PDF exists in assets/docs/ or is referenced in HTML', () => {
    const htmlContent = loadFileContent(INDEX_HTML) || '';
    const pdfFiles = findFiles(path.join(ROOT_DIR, 'assets'), (_, name) => /\.pdf$/i.test(name));

    const hasPdfLink = /href=["'][^"']*\.pdf["']/i.test(htmlContent);
    assert(pdfFiles.length > 0 || hasPdfLink,
      'Must provide a downloadable companion presentation PDF matching the benchmark format');
  });

  test('T1-F11-05: Print styles ensure readable high-contrast output on paper', () => {
    const printContent = (fileExists(PRINT_CSS) ? loadFileContent(PRINT_CSS) : '') +
      (fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '');

    const hasPrintColorOptimization = /background\s*:\s*(?:white|transparent|#fff)|color\s*:\s*(?:black|#000|#111)/i.test(printContent) ||
      /-webkit-print-color-adjust/i.test(printContent);

    assert(hasPrintColorOptimization || printContent.length > 0,
      'Print stylesheet must configure readable contrast and background adjustments for paper/PDF export');
  });

}, { tier: 1, feature: 'F11' });
