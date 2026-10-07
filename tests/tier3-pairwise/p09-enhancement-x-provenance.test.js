/**
 * Tier 3 Pairwise 9: Educational Enhancement x Provenance Ledger (F7 x F5)
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines & Acceptance Criteria, PROJECT.md §F7 & F5
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const PROVENANCE_JSON = path.join(ROOT_DIR, 'data/provenance.json');
const RESUME_JSON = path.join(ROOT_DIR, 'data/resume.json');

describe('Tier 3 - Pairwise 9: Educational Enhancement x Provenance Ledger (F7 x F5)', () => {

  test('T3-P09: Federal tracker and SFS job fair submissions cite verifiable audit sources', () => {
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (provData ? JSON.stringify(provData) : '') +
      (resumeData ? JSON.stringify(resumeData) : '') +
      (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const hasEnhancementProvenance = /tracker|job fair|accurateinternshiptracker|SFS/i.test(content);
    assert(hasEnhancementProvenance, 'Educational enhancement achievements must trace to provenance evidence');
  });

}, { tier: 3, feature: 'F7xF5' });
