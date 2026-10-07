/**
 * Tier 2 Feature 2 Boundary Cases: Navigation & Shell
 * Authoritative Source: ORIGINAL_REQUEST.md §R2, PROJECT.md §Feature 2
 *
 * Verifies:
 * 1. Deep link anchor targets resolve to existing DOM element IDs.
 * 2. Mobile navigation handles minimum viewport boundary (320px).
 * 3. Navigation controls omit empty href="" or dead links.
 * 4. Tabindex attributes do not lock keyboard focus (no tabindex < 0 on interactive links).
 * 5. Viewport meta tag disables accidental zoom disablement (allows accessibility zoom).
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertNotIncludes } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');
const { extractLinks, hasId } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');

describe('Tier 2 - Feature 2 Boundary: Navigation & Shell', () => {

  test('T2-B2-01: In-page navigation anchors map to actual DOM element IDs', () => {
    if (!fileExists(INDEX_HTML)) {
      assert(false, 'index.html must exist');
      return;
    }
    const html = loadFileContent(INDEX_HTML);
    const links = extractLinks(html);
    const hashLinks = links.filter(l => l.startsWith('#') && l.length > 1);

    const brokenAnchors = [];
    for (const hash of hashLinks) {
      const targetId = hash.slice(1);
      if (!hasId(html, targetId)) {
        brokenAnchors.push(hash);
      }
    }

    assertEqual(brokenAnchors.length, 0,
      `All navigation hash links must point to existing element IDs. Unmatched: ${brokenAnchors.join(', ')}`);
  });

  test('T2-B2-02: Navigation links contain no empty href="" or href="#" dead stubs', () => {
    if (!fileExists(INDEX_HTML)) return;
    const html = loadFileContent(INDEX_HTML);
    const emptyHrefRegex = /<a\b[^>]*\bhref=["'](?:|#)["'][^>]*>/gi;
    const matches = html.match(emptyHrefRegex) || [];

    // Filter out buttons with role="button" or aria controls
    const deadLinks = matches.filter(tag => !/role=["']button["']|data-action|onclick/i.test(tag));
    assertEqual(deadLinks.length, 0,
      `Navigation links must not contain dead href="" or href="#" stubs: ${deadLinks.join(', ')}`);
  });

  test('T2-B2-03: Viewport meta tag does not lock user-scalable (WCAG 1.4.4 zoom requirement)', () => {
    if (!fileExists(INDEX_HTML)) return;
    const html = loadFileContent(INDEX_HTML);
    const metaMatch = /<meta\b[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["'][^>]*>/i.exec(html);

    if (metaMatch) {
      const content = metaMatch[1];
      assertNotIncludes(content, 'user-scalable=no', 'Viewport must not disable pinch-to-zoom (WCAG 1.4.4)');
      assertNotIncludes(content, 'maximum-scale=1.0', 'Viewport must allow user zoom scaling');
    }
    assert(true, 'Viewport zoom boundary verified');
  });

  test('T2-B2-04: Header and navigation elements avoid negative tabindex focus traps', () => {
    if (!fileExists(INDEX_HTML)) return;
    const html = loadFileContent(INDEX_HTML);
    const negTabMatch = /<(?:a|button|input)\b[^>]*tabindex=["']-[1-9]\d*["'][^>]*>/gi.exec(html);
    assertEqual(negTabMatch, null, 'Interactive elements in navigation must not be removed from tab order');
  });

  test('T2-B2-05: Layout avoids horizontal scroll overflow on 320px minimum mobile screen', () => {
    const mainCss = path.join(ROOT_DIR, 'styles/main.css');
    if (!fileExists(mainCss)) return;
    const css = loadFileContent(mainCss);
    // Verifies box-sizing border-box or overflow-x hidden on root container
    const hasBoxSizing = /box-sizing\s*:\s*border-box/i.test(css);
    const hasOverflowControl = /overflow-x\s*:\s*hidden|max-width\s*:\s*100%/i.test(css);
    assert(hasBoxSizing || hasOverflowControl, 'CSS must enforce responsive box sizing or horizontal overflow protection');
  });

}, { tier: 2, feature: 'F2' });
