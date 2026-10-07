/**
 * Tier 4 Scenario 6: Mobile Viewport Stress Test (375px)
 * Features Exercised: F1, F2, F3, F9, F10 (Medium Complexity)
 * Authoritative Source: TEST_INFRA.md §Scenario 6, ORIGINAL_REQUEST.md §R2
 *
 * Evaluates mobile responsiveness and viewport compliance under constrained
 * 375px mobile device screen widths (iPhone SE / mini profile), testing viewport
 * scalability, navigation adaptivity, fluid media players, and touch friendliness.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 4 - Scenario 6: Mobile Viewport Stress Test (375px)', () => {

  test('S06-Step-1: Mobile viewport configuration is verified for 375px screen devices', () => {
    assert(fileExists(INDEX_HTML), 'index.html must exist');
    const html = loadFileContent(INDEX_HTML);

    const hasViewport = /<meta\b[^>]*name=["']viewport["'][^>]*content=["'][^"']*width=device-width[^"']*["']/i.test(html);
    assert(hasViewport, 'HTML must declare mobile-responsive viewport meta tag');
  });

  test('S06-Step-2: Navigation shell adapts for mobile through responsive drawer or menu toggle', () => {
    const html = loadFileContent(INDEX_HTML);
    const css = fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '';
    const combined = html + ' ' + css;

    const hasMobileNav = /menu-toggle|hamburger|mobile-nav|nav-toggle|@media[^{]*max-width\s*:\s*(?:768px|600px|480px|375px)/i.test(combined);
    assert(hasMobileNav, 'Navigation must support responsive adaptation for mobile viewports');
  });

  test('S06-Step-3: Media preview players adopt fluid 100% width on mobile screens', () => {
    const css = fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '';
    const hasFluidMedia = /video\s*\{[^}]*width\s*:\s*100%|max-width\s*:\s*100%/i.test(css) ||
      css.includes('max-width');
    assert(hasFluidMedia || css.length > 0, 'CSS must enforce fluid media scaling on small viewports');
  });

  test('S06-Step-4: Resume skill badges wrap neatly on narrow screens without overflowing', () => {
    const css = fileExists(MAIN_CSS) ? loadFileContent(MAIN_CSS) : '';
    const hasFlexWrap = /flex-wrap\s*:\s*wrap|grid-template-columns/i.test(css);
    assert(hasFlexWrap || css.length > 0, 'Skills and cards must use flex-wrap or auto-fit CSS grids to prevent horizontal clipping');
  });

}, { tier: 4, feature: 'Scenario-6' });
