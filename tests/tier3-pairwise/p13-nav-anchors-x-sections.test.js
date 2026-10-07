/**
 * Tier 3 Pairwise 13: Shell Nav Links x All Required Content Sections (F2 x F3..F9)
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §F2 & F3..F9
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');
const { extractLinks, hasId } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');

describe('Tier 3 - Pairwise 13: Shell Nav Links x Content Sections (F2 x F3..F9)', () => {

  test('T3-P13: Every shell navigation link reaches a section with substantial content', () => {
    assert(fileExists(INDEX_HTML), 'index.html must exist');
    const html = loadFileContent(INDEX_HTML);
    const links = extractLinks(html).filter(l => l.startsWith('#') && l.length > 1);

    assertGreaterThanOrEqual(links.length, 4, 'Must provide at least 4 navigation anchor sections');
    for (const link of links) {
      const id = link.slice(1);
      assert(hasId(html, id), `Target section ${link} must exist in DOM`);
    }
  });

}, { tier: 3, feature: 'F2xF3..F9' });
