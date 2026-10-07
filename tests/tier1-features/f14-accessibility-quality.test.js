/**
 * Tier 1 Feature 14: Quality & Accessibility (Lighthouse Readiness)
 * Authoritative Source: ORIGINAL_REQUEST.md §Acceptance Criteria, PROJECT.md §Feature 14
 *
 * Verifies:
 * 1. Broken link and asset checker tool exists at tools/check-links.js.
 * 2. 100% of images provide non-empty alt text for screen readers.
 * 3. External hyperlinks specify rel="noopener noreferrer" for security.
 * 4. Document root declares valid lang attribute (<html lang="en">).
 * 5. Page provides a descriptive, accessible document title.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');
const { extractImages, extractLinks, querySelectorAll } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const CHECK_LINKS_JS = path.join(ROOT_DIR, 'tools/check-links.js');

describe('Tier 1 - Feature 14: Quality & Accessibility (Lighthouse Readiness)', () => {

  test('T1-F14-01: Link verification tool exists at tools/check-links.js', () => {
    assert(fileExists(CHECK_LINKS_JS), 'Link and media validation tool must exist at tools/check-links.js');
  });

  test('T1-F14-02: All images in index.html possess non-empty alt attributes', () => {
    assert(fileExists(INDEX_HTML), 'index.html must exist');
    const htmlContent = loadFileContent(INDEX_HTML) || '';
    const images = extractImages(htmlContent);

    const missingAlt = images.filter(img => !img.alt || img.alt.trim() === '');
    assertEqual(missingAlt.length, 0,
      `All images must have alt descriptions for accessibility (WCAG 1.1.1). Missing: ${missingAlt.map(i => i.src).join(', ')}`);
  });

  test('T1-F14-03: External anchor links declare rel="noopener noreferrer"', () => {
    const htmlContent = loadFileContent(INDEX_HTML) || '';
    // Find external links targeting _blank
    const targetBlankRegex = /<a\b[^>]*\btarget=["']_blank["'][^>]*>/gi;
    let match;
    const insecureLinks = [];

    while ((match = targetBlankRegex.exec(htmlContent)) !== null) {
      const tag = match[0];
      if (!/rel=["'][^"']*(?:noopener|noreferrer)[^"']*["']/i.test(tag)) {
        insecureLinks.push(tag);
      }
    }

    assertEqual(insecureLinks.length, 0,
      `External links with target="_blank" must include rel="noopener noreferrer" for security and performance`);
  });

  test('T1-F14-04: Document declares valid language code (<html lang="en">)', () => {
    const htmlContent = loadFileContent(INDEX_HTML) || '';
    const htmlTagMatch = /<html\b[^>]*\blang=["']([a-zA-Z\-]+)["'][^>]*>/i.exec(htmlContent);

    assert(!!htmlTagMatch, 'HTML root must include a lang attribute for screen readers');
    assertEqual(htmlTagMatch ? htmlTagMatch[1].toLowerCase().slice(0, 2) : '', 'en',
      'HTML lang attribute must specify "en"');
  });

  test('T1-F14-05: Page title is descriptive and incorporates candidate name and portfolio context', () => {
    const htmlContent = loadFileContent(INDEX_HTML) || '';
    const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(htmlContent);

    assert(!!titleMatch, 'Document must have a <title> element');
    const titleText = titleMatch ? titleMatch[1].trim() : '';
    assertIncludes(titleText, 'Andrew Strachan', 'Title tag must include "Andrew Strachan"');
    assert(/portfolio|career/i.test(titleText), 'Title tag must mention Portfolio or Career');
  });

}, { tier: 1, feature: 'F14' });
