/**
 * Tier 1 Feature 6: Career-Related Education Module
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §Feature 6
 *
 * Verifies:
 * 1. UAB Cybersecurity graduate coursework (CS 623, CS 646, CS 636, etc.).
 * 2. STRIDE threat modeling and system security architectures.
 * 3. University of Montevallo CTE Business & Finance coursework.
 * 4. Mississippi College ACS Biochemistry & UMMC clinical sciences foundation.
 * 5. Detailed articulation of each activity's direct impact on future career.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const RESUME_JSON = path.join(ROOT_DIR, 'data/resume.json');

describe('Tier 1 - Feature 6: Career-Related Education Module', () => {

  test('T1-F6-01: Documents UAB graduate cybersecurity courses (CS 623, CS 646, CS 636, etc.)', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    const hasUabCourses = /CS\s*(?:623|646|636|334|203)|Network Security|Blockchain|Computer Security/i.test(content);
    assert(hasUabCourses, 'Career-related education must showcase UAB cybersecurity coursework');
  });

  test('T1-F6-02: Highlights STRIDE threat modeling and defense architectures', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    const hasThreatModeling = /STRIDE|threat model|zero-trust|defense-in-depth/i.test(content);
    assert(hasThreatModeling, 'Education section must illustrate STRIDE threat modeling and security architecture');
  });

  test('T1-F6-03: Details University of Montevallo CTE Business, Marketing & Finance education', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    const hasMontevalloCte = /Montevallo|PCTF|Business, Marketing|CTE/i.test(content);
    assert(hasMontevalloCte, 'Must incorporate University of Montevallo CTE Business education');
  });

  test('T1-F6-04: Connects ACS Biochemistry honors and UMMC training to systems rigor', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    const hasBiochem = /Biochemistry|ACS|Mississippi College|UMMC|prosector/i.test(content);
    assert(hasBiochem, 'Must include scientific foundation from Mississippi College biochemistry or UMMC');
  });

  test('T1-F6-05: Details specific impact on future cybersecurity systems career', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const content = html + ' ' + (resumeData ? JSON.stringify(resumeData) : '');

    // FBLA rubric requires: "in detail, shares about the impact on their future career"
    const hasCareerImpact = /impact on future career|career impact|career relevance|relevance to career/i.test(content);
    assert(hasCareerImpact, 'Each educational activity must detail its specific impact on the future cybersecurity career');
  });

}, { tier: 1, feature: 'F6' });
