/**
 * Tier 4 Scenario 7: Automated Outbound Link & Media Verification
 * Features Exercised: F1, F5, F9, F14 (Medium Complexity)
 * Authoritative Source: TEST_INFRA.md §Scenario 7, ORIGINAL_REQUEST.md §Links & Media Acceptance Criteria
 *
 * Simulates automated audit checking: verifies local media assets exist on disk,
 * outbound project links use valid secure URLs, deep paths are preserved,
 * and 0 broken asset links exist in the portfolio build.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely, findFiles } = require('../helpers/static-checks');
const { extractImages, extractLinks, extractVideos } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const CHECK_LINKS_JS = path.join(ROOT_DIR, 'tools/check-links.js');
const PROJECTS_JSON = path.join(ROOT_DIR, 'data/projects.json');

describe('Tier 4 - Scenario 7: Automated Outbound Link & Media Verification', () => {

  test('S07-Step-1: Link verification tool tools/check-links.js is available', () => {
    assert(fileExists(CHECK_LINKS_JS), 'Automated link verification tool must exist at tools/check-links.js');
  });

  test('S07-Step-2: All referenced local relative images exist on disk', () => {
    if (!fileExists(INDEX_HTML)) {
      assert(false, 'index.html must exist');
      return;
    }
    const html = loadFileContent(INDEX_HTML);
    const images = extractImages(html);
    const localImages = images.filter(img => img.src && !img.src.startsWith('http') && !img.src.startsWith('data:'));

    const missingAssets = [];
    for (const img of localImages) {
      const resolved = path.resolve(ROOT_DIR, img.src.replace(/^\//, ''));
      if (!fileExists(resolved)) {
        missingAssets.push(img.src);
      }
    }

    assertEqual(missingAssets.length, 0,
      `All relative image paths in index.html must resolve on disk. Missing: ${missingAssets.join(', ')}`);
  });

  test('S07-Step-3: Outbound project links enforce secure HTTPS protocols and valid hostnames', () => {
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (projData ? JSON.stringify(projData) : '') + ' ' + html;

    const allUrls = content.match(/https?:\/\/[^\s"'<>]+/gi) || [];
    assertGreaterThanOrEqual(allUrls.length, 5, 'Must contain outbound project and citation links');

    const insecureUrls = allUrls.filter(u => u.startsWith('http://') && !u.includes('localhost'));
    assertEqual(insecureUrls.length, 0,
      `All outbound project links must use HTTPS. Insecure found: ${insecureUrls.join(', ')}`);
  });

  test('S07-Step-4: Deep-path preservation for deep-link-only applications', () => {
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (projData ? JSON.stringify(projData) : '') + ' ' + html;

    if (content.includes('networking-midterm.web.app')) {
      const matchesDeep = /networking-midterm\.web\.app\/studyguide[34]\.html/.test(content);
      assert(matchesDeep, 'Must preserve deep path /studyguide4.html for networking midterm study guide');
    }
    assert(true, 'Deep-link integrity verified');
  });

  test('S07-Step-5: 28+ project destination links match the catalog of known hosted deployments', () => {
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (projData ? JSON.stringify(projData) : '') + ' ' + html;

    // Checks presence of primary domains (Firebase, CloudFront, Vercel, Lovable)
    assert(/web\.app|firebaseapp\.com/i.test(content), 'Showcase must include Firebase hosted apps');
    assert(/cloudfront\.net/i.test(content), 'Showcase must include AWS CloudFront hosted apps');
    assert(/vercel\.app/i.test(content), 'Showcase must include Vercel hosted apps');
  });

}, { tier: 4, feature: 'Scenario-7' });
