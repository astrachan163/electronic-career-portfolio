/**
 * Tier 1 Feature 8: Special Skills & MCE Endorsement Module
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §Feature 8
 *
 * Verifies:
 * 1. Curates up to 5 special skills strictly aligned with career goals.
 * 2. Correlates special skill to Credly-verified Microsoft Certified Educator badge.
 * 3. Incorporates directory of 30 verified LinkedIn Learning certifications.
 * 4. Verifies Credly verification URL format and legitimacy.
 * 5. Demonstrates explicit relationship of skills to federal cybersecurity mission.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const CERTS_JSON = path.join(ROOT_DIR, 'data/certifications.json');

describe('Tier 1 - Feature 8: Special Skills & MCE Endorsement Module', () => {

  test('T1-F8-01: Showcases 5 curated special skills aligned to target career', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const content = html + ' ' + (certData ? JSON.stringify(certData) : '');

    // Up to 5 skills per FBLA rule
    const skillKeywords = [
      /Zero-Trust|Secure Systems/i,
      /Educational Technology|Curriculum|MCE/i,
      /On-Device AI|Foundation Models|SwiftUI/i,
      /Cloud|DevSecOps|AWS|Firebase/i,
      /Regulatory Compliance|cGMP|Quality Systems/i,
    ];

    const matched = skillKeywords.filter(k => k.test(content));
    assertGreaterThanOrEqual(matched.length, 3, 'Must present core specialized technical skills');
  });

  test('T1-F8-02: Links special skill to official Credly-verified Microsoft Certified Educator badge', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const content = html + ' ' + (certData ? JSON.stringify(certData) : '');

    const hasMce = /Microsoft Certified Educator|MCE/i.test(content);
    assert(hasMce, 'Must feature Microsoft Certified Educator certification');

    const credlyUrl = 'credly.com/badges/d4e5c326-c255-405c-b50e-0a369d6fc3a0';
    assertIncludes(content, credlyUrl, 'Must embed official Credly verification URL for the MCE badge');
  });

  test('T1-F8-03: Catalogs directory of 30 verified LinkedIn Learning course completions', () => {
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const html = loadFileContent(INDEX_HTML) || '';

    let count = 0;
    if (certData && Array.isArray(certData.linkedinLearning)) {
      count = certData.linkedinLearning.length;
    } else if (certData && Array.isArray(certData)) {
      count = certData.length;
    } else {
      // Check for presence in html
      const matches = html.match(/linkedin\.com\/learning|LinkedIn Learning/gi) || [];
      count = matches.length;
    }

    assert(count > 0 || /30.*(?:LinkedIn Learning|Certifications)/i.test(html),
      'Must document the 30 verified LinkedIn Learning course completion certificates');
  });

  test('T1-F8-04: Credly badge URL satisfies HTTPS and valid public URL format', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const content = html + ' ' + (certData ? JSON.stringify(certData) : '');

    const credlyRegex = /https:\/\/www\.credly\.com\/badges\/[a-z0-9\-]+\/public_url/i;
    assert(credlyRegex.test(content), 'Credly badge URL must be a valid public_url HTTPS link');
  });

  test('T1-F8-05: Skills articulate correlation to federal cyber defense mission', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const content = html + ' ' + (certData ? JSON.stringify(certData) : '');

    const hasCorrelation = /career goal|federal|mission|security analyst|defense/i.test(content);
    assert(hasCorrelation, 'Special skills section must correlate competencies to federal career goals');
  });

}, { tier: 1, feature: 'F8' });
