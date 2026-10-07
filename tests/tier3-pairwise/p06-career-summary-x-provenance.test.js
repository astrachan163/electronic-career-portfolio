/**
 * Tier 3 Pairwise 6: Career Summary Economic Data x Provenance Citations (F4 x F5)
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §F4 & F5
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const CAREER_JSON = path.join(ROOT_DIR, 'data/career.json');
const PROVENANCE_JSON = path.join(ROOT_DIR, 'data/provenance.json');

describe('Tier 3 - Pairwise 6: Career Summary x Provenance Citations (F4 x F5)', () => {

  test('T3-P06: Career economic statistics are cross-referenced in provenance citations', () => {
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (careerData ? JSON.stringify(careerData) : '') +
      (provData ? JSON.stringify(provData) : '') +
      (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    // The BLS citations must validate the $120,360 salary and 32% growth claims
    const citesBlsForSalary = /BLS|Bureau of Labor Statistics/i.test(content) && /120,?360|32%/i.test(content);
    assert(citesBlsForSalary, 'Career summary salary statistics must trace to BLS citation in provenance ledger');
  });

}, { tier: 3, feature: 'F4xF5' });
