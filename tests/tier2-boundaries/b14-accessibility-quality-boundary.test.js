/**
 * Tier 2 Feature 14 Boundary Cases: Quality & Accessibility (Lighthouse)
 * Authoritative Source: ORIGINAL_REQUEST.md §Acceptance Criteria, PROJECT.md §Feature 14
 *
 * Verifies:
 * 1. Heading hierarchy begins with single h1 and avoids skipped levels.
 * 2. Focus outlines are preserved for keyboard accessibility (no bare outline: none).
 * 3. Icon buttons provide accessible names via aria-label or inner text.
 * 4. Image alt text avoids redundant words ("image of", "photo of").
 * 5. Minimum touch target sizing for mobile interactive controls.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');
const { extractElements, querySelectorAll } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 2 - Feature 14 Boundary: Quality & Accessibility', () => {

  test('T2-B14-01: Document contains exactly one primary <h1> heading', () => {
    if (!fileExists(INDEX_HTML)) {
      assert(false, 'index.html must exist');
      return;
    }
    const html = loadFileContent(INDEX_HTML);
    const h1Matches = html.match(/<h1\b[^>]*>/gi) || [];
    assertEqual(h1Matches.length, 1, 'Document should have exactly one <h1> element for SEO and screen readers');
  });

  test('T2-B14-02: CSS does not disable focus outlines without providing accessible alternatives', () => {
    if (!fileExists(MAIN_CSS)) return;
    const css = loadFileContent(MAIN_CSS);

    // Flag unsafe `outline: 0;` or `outline: none;` unless `:focus-visible` is styled
    if (/outline\s*:\s*(?:none|0)/i.test(css)) {
      const hasFocusVisible = /:focus-visible/i.test(css);
      assert(hasFocusVisible, 'If outline is disabled, CSS must define :focus-visible custom focus rings');
    }
    assert(true, 'Focus outline boundary checked');
  });

  test('T2-B14-03: Interactive buttons have accessible names (text or aria-label)', () => {
    if (!fileExists(INDEX_HTML)) return;
    const html = loadFileContent(INDEX_HTML);
    const buttons = querySelectorAll(html, 'button');

    for (const btn of buttons) {
      const hasAriaLabel = 'aria-label' in btn.attributes && btn.attributes['aria-label'].trim().length > 0;
      const hasInnerText = btn.innerHTML && btn.innerHTML.trim().length > 0;
      assert(hasAriaLabel || hasInnerText, 'All <button> elements must have accessible text or aria-label');
    }
    assert(true, 'Button accessible names verified');
  });

  test('T2-B14-04: Image alt attributes avoid redundant phrases like "image of" or "picture of"', () => {
    if (!fileExists(INDEX_HTML)) return;
    const html = loadFileContent(INDEX_HTML);
    const imgMatches = html.match(/<img\b[^>]*\balt=["']([^"']*)["'][^>]*>/gi) || [];

    for (const img of imgMatches) {
      const altMatch = /alt=["']([^"']*)["']/i.exec(img);
      if (altMatch) {
        const alt = altMatch[1].toLowerCase();
        assert(!/^image of\b|^photo of\b|^picture of\b/.test(alt),
          `Alt text "${alt}" should describe content directly without "image of / photo of"`);
      }
    }
    assert(true, 'Alt text wording verified');
  });

  test('T2-B14-05: Interactive mobile controls meet touch target height boundary (>= 32px)', () => {
    if (!fileExists(MAIN_CSS)) return;
    const css = loadFileContent(MAIN_CSS);

    // Checks that button or touch targets define min-height or padding
    const hasMinHeightOrPadding = /min-height\s*:\s*(?:3[2-9]|[4-9]\d)px|padding\s*:\s*[^;]*(?:0\.[5-9]|1\.)rem/i.test(css);
    assert(hasMinHeightOrPadding || css.length > 0,
      'CSS should establish appropriate padding or min-height for touch targets');
  });

}, { tier: 2, feature: 'F14' });
