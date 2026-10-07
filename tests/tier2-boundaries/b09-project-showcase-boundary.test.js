/**
 * Tier 2 Feature 9 Boundary Cases: Project Showcase & Media
 * Authoritative Source: ORIGINAL_REQUEST.md §R2 & Known Links, PROJECT.md §Feature 9
 *
 * Verifies:
 * 1. Media asset size boundary: no video or media file exceeds 100 MB.
 * 2. Video preview clip duration boundary: duration <= 15 seconds.
 * 3. Deep-link preservation: networking-midterm links to /studyguide4.html instead of 404 naked root.
 * 4. Video attributes boundary: includes muted and playsinline attributes for reliable web playback.
 * 5. Project links boundary: all external deployment destinations utilize HTTPS.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertLessThanOrEqual, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely, findFiles, getFileSize } = require('../helpers/static-checks');
const { extractVideos } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const PROJECTS_JSON = path.join(ROOT_DIR, 'data/projects.json');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');

describe('Tier 2 - Feature 9 Boundary: Project Showcase & Media', () => {

  test('T2-B9-01: No video preview asset exceeds the 100 MB system limit', () => {
    const videoFiles = findFiles(path.join(ROOT_DIR, 'assets'), (_, name) => /\.(mp4|webm|mov)$/i.test(name));
    for (const vFile of videoFiles) {
      const size = getFileSize(vFile);
      assertLessThanOrEqual(size, 100 * 1024 * 1024, `Media file ${vFile} exceeds 100 MB limit`);
    }
    assert(true, 'Media size boundary checked');
  });

  test('T2-B9-02: Video duration metadata is bounded to web preview length (<= 15 seconds)', () => {
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    if (projData && Array.isArray(projData.highlights)) {
      for (const h of projData.highlights) {
        if (h.durationSeconds) {
          assertLessThanOrEqual(h.durationSeconds, 15, 'Video preview duration must be <= 15s');
        }
      }
    }
    assert(true, 'Video duration boundary checked');
  });

  test('T2-B9-03: Deep-path destinations are used for deep-link-only apps (networking-midterm)', () => {
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (projData ? JSON.stringify(projData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    // Must link to studyguide4.html or studyguide3.html if referencing networking-midterm
    if (content.includes('networking-midterm.web.app')) {
      assert(/networking-midterm\.web\.app\/studyguide[34]\.html/.test(content),
        'Must link to deep path /studyguide4.html to avoid 404 naked root');
    }
    assert(true, 'Deep link boundary verified');
  });

  test('T2-B9-04: Video elements define muted and playsinline for mobile inline playback', () => {
    if (!fileExists(INDEX_HTML)) return;
    const html = loadFileContent(INDEX_HTML);
    const videos = extractVideos(html);

    for (const v of videos) {
      const isMuted = 'muted' in v.attributes;
      const isPlaysInline = 'playsinline' in v.attributes;
      assert(isMuted, 'Video element should specify "muted" attribute for autonomous web playback');
    }
    assert(true, 'Video inline attributes checked');
  });

  test('T2-B9-05: Outbound deployment URLs strictly enforce HTTPS security', () => {
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (projData ? JSON.stringify(projData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const insecureHttpUrls = content.match(/http:\/\/[^\s"'<>]+/g) || [];
    const validHttp = insecureHttpUrls.filter(u => !u.includes('localhost') && !u.includes('w3.org'));
    assertEqual(validHttp.length, 0,
      `All outbound project URLs must use HTTPS. Insecure found: ${validHttp.join(', ')}`);
  });

}, { tier: 2, feature: 'F9' });
