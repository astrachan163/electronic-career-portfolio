/**
 * Tier 1 Feature 2: Navigation & Responsive Shell
 * Authoritative Source: ORIGINAL_REQUEST.md §R2, PROJECT.md §Feature 2
 *
 * Verifies:
 * 1. Semantic HTML5 layout tags (header, nav, main, footer).
 * 2. Sticky navigation header with FBLA section anchors.
 * 3. Mobile responsive viewport meta tag.
 * 4. CSS responsive media queries for 375px mobile and 768px tablet.
 * 5. Presenter mode launcher and PDF download controls in nav shell.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');
const { extractLinks, hasTag, querySelectorAll, querySelector } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 1 - Feature 2: Navigation & Responsive Shell', () => {

  test('T1-F2-01: HTML5 shell implements semantic landmark elements', () => {
    assert(fileExists(INDEX_HTML), 'index.html must exist');
    const html = loadFileContent(INDEX_HTML) || '';

    assert(hasTag(html, 'header'), 'index.html must have a <header> element');
    assert(hasTag(html, 'nav'), 'index.html must have a <nav> element');
    assert(hasTag(html, 'main'), 'index.html must have a <main> element');
    assert(hasTag(html, 'footer'), 'index.html must have a <footer> element');
  });

  test('T1-F2-02: Navigation contains anchor links covering all FBLA portfolio sections', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const links = extractLinks(html);

    // Should include anchors for Resume, Career Summary, Education, Skills, Projects, Provenance
    const requiredSections = ['resume', 'career', 'education', 'skills', 'projects', 'sources'];
    const matchedSections = requiredSections.filter(sec =>
      links.some(href => href.toLowerCase().includes(sec))
    );

    assertGreaterThanOrEqual(matchedSections.length, 5,
      `Nav must provide direct jump links to FBLA sections. Found matches: ${matchedSections.join(', ')}`);
  });

  test('T1-F2-03: Responsive meta tag is configured for mobile scalability', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const viewportRegex = /<meta\b[^>]*name=["']viewport["'][^>]*content=["'][^"']*width=device-width[^"']*["'][^>]*>/i;
    assert(viewportRegex.test(html), 'HTML head must specify viewport meta tag with width=device-width');
  });

  test('T1-F2-04: CSS defines responsive media query breakpoints (375px and 768px)', () => {
    assert(fileExists(MAIN_CSS), 'styles/main.css must exist');
    const css = loadFileContent(MAIN_CSS) || '';

    const hasTabletQuery = /@media[^{]*\(\s*max-width\s*:\s*(?:768px|800px|900px)\s*\)/i.test(css);
    const hasMobileQuery = /@media[^{]*\(\s*max-width\s*:\s*(?:375px|480px|600px)\s*\)/i.test(css);

    assert(hasTabletQuery, 'CSS must include responsive media query for tablet viewports (768px)');
    assert(hasMobileQuery, 'CSS must include responsive media query for mobile viewports (375px)');
  });

  test('T1-F2-05: Navigation shell includes Presenter Mode trigger and verifies removal of PDF download button', () => {
    const html = loadFileContent(INDEX_HTML) || '';

    // Check for presenter mode toggle button/link
    const hasPresenterControl = /presenter|presentation-mode|speaker-notes|btn-presenter/i.test(html);
    assert(hasPresenterControl, 'Navigation shell must offer a Presenter Mode toggle control');

    // Confirm PDF button is removed per custom portfolio requirements
    const hasNavPdfButton = /id=["']btn-pdf-download["']/i.test(html);
    assert(!hasNavPdfButton, 'Navigation shell must cleanly remove the PDF download button per custom requirements');
  });

}, { tier: 1, feature: 'F2' });
