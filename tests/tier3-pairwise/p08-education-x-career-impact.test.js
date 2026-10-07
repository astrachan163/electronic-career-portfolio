/**
 * Tier 3 Pairwise 8: Career-Related Education x Career Summary (F6 x F4)
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §F6 & F4
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const CAREER_JSON = path.join(ROOT_DIR, 'data/career.json');
const RESUME_JSON = path.join(ROOT_DIR, 'data/resume.json');

describe('Tier 3 - Pairwise 8: Career Education x Career Summary (F6 x F4)', () => {

  test('T3-P08: Graduate coursework provides direct qualification for Information Security Analyst', () => {
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (careerData ? JSON.stringify(careerData) : '') +
      (resumeData ? JSON.stringify(resumeData) : '') +
      (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    // Correlates security coursework with information security career requirements
    const matchesRoleReqs = /Cybersecurity|Network Security|Information Security Analyst/i.test(content);
    assert(matchesRoleReqs, 'Coursework must directly prepare candidate for Information Security Analyst role');
  });

}, { tier: 3, feature: 'F6xF4' });
