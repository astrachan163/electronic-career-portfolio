/**
 * Tier 4 Scenario 1: FBLA Judge Review Walkthrough
 * Features Exercised: F1, F2, F3, F4, F5, F6, F7, F8, F9 (High Complexity)
 * Authoritative Source: TEST_INFRA.md §Scenario 1, ORIGINAL_REQUEST.md §FBLA Guidelines
 *
 * Simulates an official FBLA competitive event judge conducting a thorough,
 * section-by-section audit of Andrew Strachan's Electronic Career Portfolio
 * against all criteria on the 100-point FBLA Rating Sheet.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');
const { extractImages, extractLinks, querySelectorAll } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const RESUME_JSON = path.join(ROOT_DIR, 'data/resume.json');
const CAREER_JSON = path.join(ROOT_DIR, 'data/career.json');
const CERTS_JSON = path.join(ROOT_DIR, 'data/certifications.json');
const PROJECTS_JSON = path.join(ROOT_DIR, 'data/projects.json');
const PROVENANCE_JSON = path.join(ROOT_DIR, 'data/provenance.json');

describe('Tier 4 - Scenario 1: FBLA Judge Review Walkthrough', () => {

  test('S01-Step-1: Judge arrives at portfolio, verifying brand emblem and cyber aesthetic', () => {
    assert(fileExists(INDEX_HTML), 'index.html must exist for judge review');
    const html = loadFileContent(INDEX_HTML);

    const images = extractImages(html);
    const hasBrandLogo = images.some(img => /brand|logo|circuit/i.test(img.src) || /brand|logo|crest|maqkrs/i.test(img.alt));
    assert(hasBrandLogo, 'Judge confirms circuit "M" diamond crest brand mark is present');
  });

  test('S01-Step-2: Judge reviews Interactive Resume for academic pedigree and interactive tech', () => {
    const html = loadFileContent(INDEX_HTML);
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    assertIncludes(content, 'University of Alabama at Birmingham', 'Pedigree must include UAB');
    assertIncludes(content, 'Montevallo', 'Pedigree must include Montevallo');
    assertIncludes(content, 'Mississippi College', 'Pedigree must include Mississippi College');
    assert(/CyberCorps|SFS/i.test(content), 'Judge notes CyberCorps SFS fellowship distinction');
  });

  test('S01-Step-3: Judge verifies Career Research (SOC 15-1212.00, salaries, 32% growth, obstacles)', () => {
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const html = loadFileContent(INDEX_HTML);
    const content = (careerData ? JSON.stringify(careerData) : '') + ' ' + html;

    assert(/Information Security Analyst/i.test(content), 'Judge verifies target career choice');
    assert(/15-1212/.test(content), 'Judge verifies official BLS SOC 15-1212 code');
    assert(/120,?360/.test(content), 'Judge confirms BLS median wage ($120,360)');
    assert(/32%/.test(content), 'Judge confirms BLS 32% job growth');
    assert(/obstacle|quantum|adversarial/i.test(content), 'Judge checks industry obstacles analysis');
  });

  test('S01-Step-4: Judge audits Career Education, Enhancement, and Special Skills with MCE endorsement', () => {
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const html = loadFileContent(INDEX_HTML);
    const content = (certData ? JSON.stringify(certData) : '') + (resumeData ? JSON.stringify(resumeData) : '') + ' ' + html;

    // Career Education: STRIDE threat modeling & graduate security
    assert(/STRIDE|CS\s*623|Network Security/i.test(content), 'Judge reviews graduate security coursework');

    // Enhancement: 51-job federal tracker
    assert(/51|federal tracker|tracker/i.test(content), 'Judge verifies federal opportunity tracker');

    // Special Skills: Credly MCE badge
    assert(/Microsoft Certified Educator|MCE/i.test(content), 'Judge verifies MCE skill endorsement');
    assert(/credly\.com\/badges\/d4e5c326-c255-405c-b50e-0a369d6fc3a0/i.test(content),
      'Judge verifies Credly digital badge verification link');
  });

  test('S01-Step-5: Judge evaluates Project Showcase and validates Provenance Scorecard', () => {
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const html = loadFileContent(INDEX_HTML);
    const content = (projData ? JSON.stringify(projData) : '') + (provData ? JSON.stringify(provData) : '') + ' ' + html;

    // Project Showcase: 4 flagship highlights + live links
    assert(/Sanctum/i.test(content), 'Showcase includes Sanctum 3D Godot project');
    assert(/Tutor/i.test(content), 'Showcase includes MaqkrsTutor2 project');
    assert(/AdaptiveHS/i.test(content), 'Showcase includes AdaptiveHS project');

    // Provenance Scorecard: "Exceeds Expectations"
    assert(/Exceeds Expectations/i.test(content), 'Scorecard rates criteria at Exceeds Expectations');
  });

}, { tier: 4, feature: 'Scenario-1' });
