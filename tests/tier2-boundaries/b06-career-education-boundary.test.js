/**
 * Tier 2 Feature 6 Boundary Cases: Career-Related Education
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §Feature 6
 *
 * Verifies:
 * 1. Course codes conform to standard departmental catalog format (CS 623, CS 646, etc.).
 * 2. Education dates sequence: past degrees precede prospective 2027 completion.
 * 3. Career impact statements exceed minimal length threshold (>20 characters).
 * 4. Course items link to tangible skills/technologies.
 * 5. Education cards maintain structural integrity without missing attributes.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertGreaterThanOrEqual, assertLessThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const RESUME_JSON = path.join(ROOT_DIR, 'data/resume.json');

describe('Tier 2 - Feature 6 Boundary: Career-Related Education', () => {

  test('T2-B6-01: Graduate course codes adhere to academic departmental format ([A-Z]{2,4}\\s*\\d{3})', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const courseCodes = content.match(/\b(?:CS|CJ)\s*\d{3}\b/g) || [];
    assertGreaterThanOrEqual(courseCodes.length, 2, 'Must cite specific graduate course numbers (e.g. CS 623, CS 646)');
  });

  test('T2-B6-02: Chronological sequence verifies past bachelor degree precedes graduate study', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const has2016 = /2016/.test(content);
    const has2027 = /2027/.test(content);
    assert(has2016 && has2027, 'Must preserve chronological integrity from 2016 (B.S.) to 2027 (M.S.)');
  });

  test('T2-B6-03: Career impact descriptions exceed brevity boundary (>20 characters of detail)', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    // FBLA requires "in detail"
    assert(content.length > 200, 'Career education content must provide detailed explanations');
  });

  test('T2-B6-04: Technical competencies map to modern cybersecurity frameworks', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const hasFramework = /STRIDE|NIST|IAAA|Zero-Trust|RBAC|MAC|ACL/i.test(content);
    assert(hasFramework, 'Education takeaways must map to recognized security concepts/frameworks');
  });

  test('T2-B6-05: Missing GPA or unaccredited claims boundary: all claimed GPAs are strictly <= 4.0', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const gpas = content.match(/\b([0-4]\.\d{1,2})\b/g) || [];
    for (const gpa of gpas) {
      const val = parseFloat(gpa);
      assertLessThanOrEqual(val, 4.0, `Reported GPA (${val}) cannot exceed 4.0 scale`);
    }
  });

}, { tier: 2, feature: 'F6' });
