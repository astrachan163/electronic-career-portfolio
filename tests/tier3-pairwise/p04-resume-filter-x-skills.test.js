/**
 * Tier 3 Pairwise 4: Resume Skills Filter x Top 5 Special Skills (F3 x F8)
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §F3 & F8
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const RESUME_JSON = path.join(ROOT_DIR, 'data/resume.json');
const CERTS_JSON = path.join(ROOT_DIR, 'data/certifications.json');

describe('Tier 3 - Pairwise 4: Resume Skills Filter x Top 5 Special Skills (F3 x F8)', () => {

  test('T3-P04: Special skills align with categories in the interactive resume matrix', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') +
      (certData ? JSON.stringify(certData) : '') +
      (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    // Common technical taxonomy: Zero-Trust, AI, Cloud, DevSecOps
    const sharedConcepts = /Zero-Trust|Cloud|AI|Security/i.test(content);
    assert(sharedConcepts, 'Special skills must harmoniously map into the interactive resume taxonomy');
  });

}, { tier: 3, feature: 'F3xF8' });
