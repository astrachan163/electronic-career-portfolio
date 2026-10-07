/**
 * Tier 4 Scenario 3: Public Recruiter Deep-Dive (Sanitized GitHub Pages)
 * Features Exercised: F1, F2, F3, F8, F9, F12, F13 (High Complexity)
 * Authoritative Source: TEST_INFRA.md §Scenario 3, ORIGINAL_REQUEST.md §R3 & Acceptance Criteria
 *
 * Simulates an external corporate or academic talent recruiter auditing Andrew's
 * public GitHub Pages portfolio, validating skills depth and project links while
 * verifying that no personal phone numbers, test logins, or private emails are leaked.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes } = require('../helpers/assertions');
const { fileExists, loadFileContent, findFiles, checkPrivacyViolations } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const DIST_PUBLIC = path.join(ROOT_DIR, 'dist/public');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');

describe('Tier 4 - Scenario 3: Public Recruiter Deep-Dive (Sanitized)', () => {

  test('S03-Step-1: Recruiter lands on public site with polished cyber theme and brand mark', () => {
    const targetFile = fileExists(path.join(DIST_PUBLIC, 'index.html')) ? path.join(DIST_PUBLIC, 'index.html') : INDEX_HTML;
    assert(fileExists(targetFile), 'Public landing page must exist');
    const html = loadFileContent(targetFile);

    assertIncludes(html, 'Andrew Strachan', 'Public landing page identifies Andrew Strachan');
    assert(/brand|logo|circuit|crest/i.test(html), 'Public view renders official circuit brand emblem');
  });

  test('S03-Step-2: Recruiter discovers institutional academic email (strachan@uab.edu) and public profiles', () => {
    const targetFile = fileExists(path.join(DIST_PUBLIC, 'index.html')) ? path.join(DIST_PUBLIC, 'index.html') : INDEX_HTML;
    const html = loadFileContent(targetFile);

    assertIncludes(html, 'strachan@uab.edu', 'Recruiter locates public institutional UAB email');
    assert(/github\.com\/astrachan163|linkedin\.com/i.test(html), 'Recruiter locates public GitHub or LinkedIn profiles');
  });

  test('S03-Step-3: Recruiter automated security scan detects 0 personal phone numbers or test logins', () => {
    const targetDir = fileExists(DIST_PUBLIC) ? DIST_PUBLIC : ROOT_DIR;
    const publicFiles = findFiles(targetDir, f => /\.(html|js|json)$/i.test(f) && !f.includes('tests') && !f.includes('.agents') && !f.includes('dist/private') && !f.includes('atlas_hero_update') && !f.includes('atlas_live_backup'));

    let violations = [];
    for (const f of publicFiles) {
      const content = loadFileContent(f);
      const v = checkPrivacyViolations(content);
      if (v.length > 0) violations.push({ f, v });
    }

    assertEqual(violations.length, 0,
      `Public artifacts must pass privacy scan with 0 leaks: ${violations.map(x => x.f).join(', ')}`);
  });

  test('S03-Step-4: Recruiter inspects technical skills matrix and verifies Credly MCE badge', () => {
    const targetFile = fileExists(path.join(DIST_PUBLIC, 'index.html')) ? path.join(DIST_PUBLIC, 'index.html') : INDEX_HTML;
    const html = loadFileContent(targetFile);

    assert(/credly\.com\/badges\/d4e5c326-c255-405c-b50e-0a369d6fc3a0/i.test(html),
      'Recruiter verifies live Credly MCE digital credential badge link');
    assert(/Zero-Trust|Cloud|SwiftUI|Cybersecurity/i.test(html),
      'Recruiter validates comprehensive technical skills portfolio');
  });

  test('S03-Step-5: Recruiter tests live showcase links (CloudFront Sanctum, AdaptiveHS demo, GitHub repo)', () => {
    const targetFile = fileExists(path.join(DIST_PUBLIC, 'index.html')) ? path.join(DIST_PUBLIC, 'index.html') : INDEX_HTML;
    const html = loadFileContent(targetFile);

    // Verifies live links are public safe
    const hasSanctumLink = /cloudfront\.net|sanctum/i.test(html);
    const hasAdaptiveLink = /adaptivehs|adaptiveprep/i.test(html);
    assert(hasSanctumLink && hasAdaptiveLink, 'Recruiter verifies public-safe flagship project deployments');
  });

}, { tier: 4, feature: 'Scenario-3' });
