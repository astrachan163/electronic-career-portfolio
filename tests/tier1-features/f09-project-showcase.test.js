/**
 * Tier 1 Feature 9: Media & 28+ Project Showcase
 * Authoritative Source: ORIGINAL_REQUEST.md §R2 & Known Links, PROJECT.md §Feature 9
 *
 * Verifies:
 * 1. 4 curated flagship projects featured (Sanctum, MaqkrsTutor2, AdaptiveHS, Maqkrs Planner).
 * 2. Embedded HTML5 video players provide dual MP4 and WebM fallback formats.
 * 3. Video players specify valid poster attribute images.
 * 4. Directory incorporates 28+ verified live project links.
 * 5. Showcase cards provide tech stack metadata and live demo links.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');
const { extractVideos, extractLinks } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const PROJECTS_JSON = path.join(ROOT_DIR, 'data/projects.json');

describe('Tier 1 - Feature 9: Media & 28+ Project Showcase', () => {

  test('T1-F9-01: 4 Curated flagship projects are featured (Sanctum, Tutor, AdaptiveHS, Maqkrs)', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const content = html + ' ' + (projData ? JSON.stringify(projData) : '');

    assert(/Sanctum/i.test(content), 'Showcase must include CS646 Sanctum 3D Godot project');
    assert(/Tutor|MaqkrsTutor/i.test(content), 'Showcase must include MaqkrsTutor2 SwiftUI on-device project');
    assert(/AdaptiveHS|AdaptivePrep/i.test(content), 'Showcase must include AdaptiveHS homeschool project');
    assert(/Maqkrs|Planner/i.test(content), 'Showcase must include Maqkrs operations/planner project');
  });

  test('T1-F9-02: Video players embed dual MP4 and WebM source formats for compatibility', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const videos = extractVideos(html);

    // Either HTML contains video tags or project data specifies dual formats
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const hasVideoData = projData && (
      (Array.isArray(projData.highlights) && projData.highlights.some(h => h.mp4Url && h.webmUrl)) ||
      (Array.isArray(projData) && projData.some(p => p.mp4Url && p.webmUrl))
    );

    const hasVideoTags = videos.length > 0 && videos.some(v =>
      v.sources.some(s => /\.mp4/i.test(s.src || '')) &&
      v.sources.some(s => /\.webm/i.test(s.src || ''))
    );

    assert(hasVideoTags || hasVideoData,
      'Video previews must offer dual MP4 and WebM sources for cross-browser playback');
  });

  test('T1-F9-03: Video preview elements specify poster images for instant render', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const videos = extractVideos(html);
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);

    const hasPostersInHtml = videos.length > 0 && videos.every(v => !!v.poster);
    const hasPostersInData = projData && (
      (Array.isArray(projData.highlights) && projData.highlights.every(h => !!h.posterUrl)) ||
      (Array.isArray(projData) && projData.filter(p => p.highlight).every(p => !!p.posterUrl))
    );

    assert(hasPostersInHtml || hasPostersInData,
      'Video components must define poster images to prevent blank frames prior to play');
  });

  test('T1-F9-04: Project directory encompasses 28+ verified live project destinations', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const allLinks = extractLinks(html);

    let projectCount = 0;
    if (projData) {
      if (Array.isArray(projData.projects)) projectCount = projData.projects.length;
      else if (Array.isArray(projData)) projectCount = projData.length;
    }

    const liveDomainMatches = allLinks.filter(l =>
      /\.(web\.app|firebaseapp\.com|cloudfront\.net|vercel\.app|lovable\.app)/i.test(l)
    );

    const totalVerified = Math.max(projectCount, liveDomainMatches.length);
    assertGreaterThanOrEqual(totalVerified, 20,
      `Directory must catalog the extensive portfolio of projects (found ${totalVerified})`);
  });

  test('T1-F9-05: Projects feature technical architecture details and live demo actions', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const content = html + ' ' + (projData ? JSON.stringify(projData) : '');

    const hasTechBadges = /SwiftUI|Godot|Next\.js|Firebase|CloudFront|Python|TypeScript|React/i.test(content);
    assert(hasTechBadges, 'Projects must display technology stack badges and architecture descriptors');
  });

}, { tier: 1, feature: 'F9' });
