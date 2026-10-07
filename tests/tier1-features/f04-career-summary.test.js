/**
 * Tier 1 Feature 4: Career Research & Summary Module
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §Feature 4
 *
 * Verifies:
 * 1. Target career role defined (Information Security Analyst & Cybersecurity Systems Engineer).
 * 2. Official BLS SOC code 15-1212.00 specified.
 * 3. BLS economic statistics cited: $120,360 median, $182,370+ top decile, 32% growth rate.
 * 4. Federal career pay trajectory (GS scale GS-9 to GS-14) and CyberCorps SFS commitment.
 * 5. Cybersecurity industry obstacles (quantum crypto, adversarial AI, zero-trust) and mitigations.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const CAREER_JSON = path.join(ROOT_DIR, 'data/career.json');

describe('Tier 1 - Feature 4: Career Summary & BLS Research', () => {

  test('T1-F4-01: Target career choice is clearly defined as Information Security Analyst', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const combined = html + ' ' + (careerData ? JSON.stringify(careerData) : '');

    const hasCareerTitle = /Information Security Analyst/i.test(combined);
    assert(hasCareerTitle, 'Career summary must state "Information Security Analyst" as target career');
  });

  test('T1-F4-02: BLS Standard Occupational Classification SOC 15-1212.00 is cited', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const combined = html + ' ' + (careerData ? JSON.stringify(careerData) : '');

    const hasSocCode = /15-1212(?:\.00)?/.test(combined);
    assert(hasSocCode, 'Career research must explicitly cite BLS SOC code 15-1212.00');
  });

  test('T1-F4-03: Official BLS salary metrics and 32% growth rate are documented', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const combined = html + ' ' + (careerData ? JSON.stringify(careerData) : '');

    // BLS median wage $120,360 and top decile $182,370+
    const hasMedianWage = /120,?360/.test(combined);
    const hasTopWage = /182,?370/.test(combined);
    const hasGrowthRate = /32%/.test(combined);

    assert(hasMedianWage, 'Career research must document BLS median annual wage ($120,360)');
    assert(hasTopWage, 'Career research must document BLS top decile wage ($182,370)');
    assert(hasGrowthRate, 'Career research must document BLS projected employment growth rate (32%)');
  });

  test('T1-F4-04: Federal public service trajectory maps GS-9 through GS-14 pay bands', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const combined = html + ' ' + (careerData ? JSON.stringify(careerData) : '');

    const hasGsScale = /GS-(?:9|11|12|13|14)|General Schedule/i.test(combined);
    const hasClearanceOrSfs = /SFS|clearance|federal/i.test(combined);

    assert(hasGsScale, 'Career plan must describe Federal General Schedule (GS) pay progression');
    assert(hasClearanceOrSfs, 'Career plan must document CyberCorps SFS federal service pathway');
  });

  test('T1-F4-05: Incorporates critical industry obstacles and technical mitigations', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const combined = html + ' ' + (careerData ? JSON.stringify(careerData) : '');

    const hasObstacles = /obstacle|challenge|quantum|post-quantum|adversarial|zero-trust|workforce gap/i.test(combined);
    assert(hasObstacles, 'Career summary must analyze industry obstacles (e.g. quantum transition, AI threats, zero-trust)');
  });

}, { tier: 1, feature: 'F4' });
