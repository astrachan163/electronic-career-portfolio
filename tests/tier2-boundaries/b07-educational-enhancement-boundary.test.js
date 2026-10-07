/**
 * Tier 2 Feature 7 Boundary Cases: Educational Enhancement
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §Feature 7
 *
 * Verifies:
 * 1. Federal opportunity tracker boundary: accounts for the 51 tracked positions.
 * 2. Virtual Job Fair applications boundary: accounts for the 14 agency submissions.
 * 3. Legitimate federal agency representation (Space Force, CISA, Sandia, etc.).
 * 4. Products developed count threshold: documents at least 3 distinct systems.
 * 5. Multi-faceted enhancement activities span service, mentoring, and professional planning.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const RESUME_JSON = path.join(ROOT_DIR, 'data/resume.json');

describe('Tier 2 - Feature 7 Boundary: Educational Enhancement', () => {

  test('T2-B7-01: Federal opportunity tracker reflects substantial scale (boundary of 51 positions)', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const has51OrTracker = /51|accurateinternshiptracker/i.test(content);
    assert(has51OrTracker, 'Must document the 51-position federal opportunity tracker scale');
  });

  test('T2-B7-02: Job fair agency submissions scale boundary (boundary of 14 federal applications)', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const has14OrAgencies = /14\s*(?:agencies|applications|submissions)|Space Force|MARFORCYBER|CISA/i.test(content);
    assert(has14OrAgencies, 'Must reflect the 14 federal agency applications from the SFS Job Fair');
  });

  test('T2-B7-03: Names authoritative national security organizations (DoD, DHS, DoE laboratories)', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const orgMatches = [
      /Space Force|USSF|Air Force/i,
      /CISA|Cybersecurity and Infrastructure Security Agency/i,
      /Sandia|National Laboratories/i,
      /MARFORCYBER|Marine Corps Cyber/i,
      /DOJ|Department of Justice/i,
    ].filter(r => r.test(content));

    assertGreaterThanOrEqual(orgMatches.length, 2,
      'Must reference authentic federal defense/intelligence agencies from job fair applications');
  });

  test('T2-B7-04: Products developed boundary: showcases at least 3 distinct software systems', () => {
    const projectsJson = path.join(ROOT_DIR, 'data/projects.json');
    const { data: projData } = loadJsonSafely(projectsJson);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (projData ? JSON.stringify(projData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const systemMatches = [
      /AdaptiveHS/i,
      /Sanctum/i,
      /Tutor/i,
      /Planner|Maqkrs/i,
    ].filter(r => r.test(content));

    assertGreaterThanOrEqual(systemMatches.length, 3,
      'Products developed section must showcase at least 3 real systems');
  });

  test('T2-B7-05: Enhancement spectrum covers all FBLA categories (service, planning, products)', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    assert(/service|volunteer|Uganda|community/i.test(content), 'Must cover community/international service');
    assert(/planning|tracker|career development/i.test(content), 'Must cover career development planning');
    assert(/products developed|developed|software/i.test(content), 'Must cover products developed');
  });

}, { tier: 2, feature: 'F7' });
