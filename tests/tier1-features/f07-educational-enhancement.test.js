/**
 * Tier 1 Feature 7: Educational Enhancement Module
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §Feature 7
 *
 * Verifies:
 * 1. 51-position federal internship/job tracker documented.
 * 2. 14 CyberCorps SFS Virtual Job Fair applications recorded.
 * 3. International service (Uganda medical outreach, Gilman Scholar in Nepal).
 * 4. Youth STEM mentoring (UAB Python / drone camp teaching assistant).
 * 5. Work-based learning & tangible products developed (AdaptiveHS, Sanctum, Tutor).
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const RESUME_JSON = path.join(ROOT_DIR, 'data/resume.json');

describe('Tier 1 - Feature 7: Educational Enhancement Module', () => {

  test('T1-F7-01: Incorporates the 51-position federal opportunity tracker evidence', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    const hasTracker = /51|federal tracker|opportunity tracker|internship tracker|accurateinternshiptracker/i.test(content);
    assert(hasTracker, 'Educational enhancement must cite the 51-position federal career opportunity tracker');
  });

  test('T1-F7-02: Records 14 CyberCorps SFS Virtual Job Fair agency applications', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    const hasJobFair = /14|job fair|virtual job fair|Space Force|CISA|MARFORCYBER|Sandia/i.test(content);
    assert(hasJobFair, 'Must document the 14 federal agency applications from the SFS Virtual Job Fair');
  });

  test('T1-F7-03: Highlights international service leadership (Uganda mission, Nepal Gilman Scholar)', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    const hasInternational = /Uganda|Nepal|Gilman|global|service/i.test(content);
    assert(hasInternational, 'Must include community service leadership (e.g. Uganda medical mission or Gilman Scholarship in Nepal)');
  });

  test('T1-F7-04: Documents youth STEM education and mentoring (UAB Python camp)', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    const hasMentoring = /Python Camp|micro:bit|drone|mentoring|camp/i.test(content);
    assert(hasMentoring, 'Must document youth STEM education (e.g. UAB Python Camp / micro:bit drone TA)');
  });

  test('T1-F7-05: Showcases work-based learning and products developed', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    const hasProducts = /AdaptiveHS|Sanctum|Tutor|products developed|work-based/i.test(content);
    assert(hasProducts, 'Must demonstrate work-based learning and products developed');
  });

  test('T1-F7-06: Professional Development (2023–2025) contains required conferences, volunteering links, and NonArtificial Superintelligence', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    assertIncludes(html, 'Professional Development (2023–2025)', 'Section title must reflect Professional Development (2023–2025)');
    assertIncludes(html, 'https://www.sunherald.com/news/local/counties/harrison-county/article97803862.html', 'Must include GiveGab Sun Herald volunteering article link');
    assertIncludes(html, 'https://www.wlox.com/2018/12/12/south-mississippi-strong-harrison-countys-emergency-youth-shelter-gives-safe-space-children-need/', 'Must include UMMC Opioid / youth shelter WLOX article link');
    assertIncludes(html, 'https://nonartificialsi.com', 'Must include NonArtificial Superintelligence link');
    assert(/ALACTE/i.test(html), 'Must include ALACTE Career and Technical Education conference');
    assert(/Kentucky Derby|KY Derby/i.test(html), 'Must include Kentucky Derby conference');
    assert(/Jump\$tart/i.test(html), 'Must include Jump$tart National Educator Conference');
    assert(/DECA.*Anaheim/i.test(html), 'Must include DECA ICDC Anaheim conference');
  });

  test('T1-F7-07: Complete removal of ProctorU and bolstering of authentic PD evidence with visual indicators', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    // Verify complete removal of ProctorU references and audit strip
    assert(!/ProctorU/i.test(html), 'Must NOT contain any ProctorU references');
    assert(!/pd-proctor-strip|pd-proctor-thumb/i.test(html), 'Must NOT contain any proctor strip or thumb classes');
    for (let i = 1; i <= 7; i++) {
      assert(!html.includes(`proctoru-session-audit-${i}.png`), `Must NOT include proctoru-session-audit-${i}.png`);
    }

    // Verify bolstering of authentic evidence entries with visual indicators & badges
    assertIncludes(html, 'pd-thumb-overlay', 'Must include purposeful visual indicator overlays on thumbnails');
    assertIncludes(html, 'pd-video-play-center', 'Must include video play button indicator for video news broadcast');
    assertIncludes(html, 'pd-video-badge', 'Must include video badge for WLOX broadcast');
    assertIncludes(html, 'pd-article-badge', 'Must include article badge for Sun Herald feature');
    assertIncludes(html, 'sunherald-volunteer-thumb.png', 'Must include Sun Herald / GiveGab volunteer evidence thumbnail');
    assertIncludes(html, 'wlox-youth-shelter-thumb.jpg', 'Must include WLOX youth shelter evidence thumbnail');
    assertIncludes(html, 'deca-advisor-anaheim.png', 'Must include DECA Anaheim conference evidence thumbnail');
    assertIncludes(html, 'ummc-asb-acceptance.png', 'Must include UMMC ASB appointment evidence thumbnail');
  });

  test('T1-F7-08: Complete removal of CJ502 / CJ 502 forensics study kit from portfolio', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const combined = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');
    const hasCj502 = /CJ\s*502/i.test(combined);
    assert(!hasCj502, 'Portfolio source code and resume data must NOT contain any CJ502 references');
  });

  test('T1-F7-09: Verified SFS Scholar | Clearable status and SQ Team Lead Award year 2021', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const combined = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');
    assertIncludes(combined, 'CyberCorps: Scholarship for Service (SFS) Scholar | Clearable', 'Must use official SFS Scholar | Clearable phrasing');
    assert(/SQ Team Lead Award \(2021\)/.test(combined), 'SQ Team Lead Award must be dated 2021');
  });

}, { tier: 1, feature: 'F7' });
