/**
 * Tier 3 Pairwise 10: Special Skills x Credly / LinkedIn Badge Verification (F8 x F5)
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §F8 & F5
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const CERTS_JSON = path.join(ROOT_DIR, 'data/certifications.json');
const PROVENANCE_JSON = path.join(ROOT_DIR, 'data/provenance.json');

describe('Tier 3 - Pairwise 10: Special Skills x Credly Badge Verification (F8 x F5)', () => {

  test('T3-P10: Educational Technology special skill correlates directly to Credly MCE badge', () => {
    const { data: certData } = loadJsonSafely(CERTS_JSON);
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (certData ? JSON.stringify(certData) : '') +
      (provData ? JSON.stringify(provData) : '') +
      (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    const correlatesMce = /MCE|Microsoft Certified Educator/i.test(content) && /credly\.com/i.test(content);
    assert(correlatesMce, 'Educational technology special skill must resolve to live Credly badge proof');
  });

}, { tier: 3, feature: 'F8xF5' });
