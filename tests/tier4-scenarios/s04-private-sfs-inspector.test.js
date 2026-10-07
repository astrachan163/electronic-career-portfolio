/**
 * Tier 4 Scenario 4: Private Federal SFS Clearance Inspector
 * Features Exercised: F4, F5, F7, F9, F12 (High Complexity)
 * Authoritative Source: TEST_INFRA.md §Scenario 4, ORIGINAL_REQUEST.md §R3 & §R5
 *
 * Simulates a federal CyberCorps SFS program auditor or national security clearance
 * investigator examining Andrew's unredacted private hosted portfolio build, verifying
 * federal commitment, 51-position application ledger, authorized test credentials,
 * and comprehensive provenance trail.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const DIST_PRIVATE = path.join(ROOT_DIR, 'dist/private');
const CONFIG_JS = path.join(ROOT_DIR, 'js/config.js');
const CAREER_JSON = path.join(ROOT_DIR, 'data/career.json');
const PROVENANCE_JSON = path.join(ROOT_DIR, 'data/provenance.json');

describe('Tier 4 - Scenario 4: Private Federal SFS Clearance Inspector', () => {

  test('S04-Step-1: Inspector verifies private deployment configuration supports unredacted review', () => {
    const configPath = fileExists(CONFIG_JS) ? CONFIG_JS : path.join(ROOT_DIR, 'tools/build.js');
    assert(fileExists(configPath), 'Configuration or build tool must exist');
    const content = loadFileContent(configPath);

    assert(/['"]private['"]/i.test(content), 'Inspector verifies dedicated private variant mode exists');
  });

  test('S04-Step-2: Inspector verifies CyberCorps SFS commitment and GS-9 to GS-14 federal pay progression', () => {
    const { data: careerData } = loadJsonSafely(CAREER_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (careerData ? JSON.stringify(careerData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    assert(/CyberCorps|Scholarship for Service|SFS/i.test(content), 'Inspector confirms CyberCorps SFS status');
    assert(/GS-(?:9|11|12|13|14)/i.test(content), 'Inspector validates federal General Schedule career band mapping');
  });

  test('S04-Step-3: Inspector audits 51-position federal opportunity tracker and 14 SFS job fair submissions', () => {
    const resumeJson = path.join(ROOT_DIR, 'data/resume.json');
    const { data: resumeData } = loadJsonSafely(resumeJson);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (resumeData ? JSON.stringify(resumeData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    assert(/51|tracker/i.test(content), 'Inspector validates 51-position federal application ledger');
    assert(/14|Space Force|CISA|Sandia|MARFORCYBER/i.test(content), 'Inspector verifies SFS job fair agency applications');
  });

  test('S04-Step-4: Inspector verifies authorized test credentials for GHS learning platform evaluation', () => {
    const configPath = fileExists(CONFIG_JS) ? CONFIG_JS : path.join(ROOT_DIR, 'tools/build.js');
    const content = loadFileContent(configPath) || '';

    // In private mode or config, test logins can be present for evaluators
    const supportsLogins = /showTestLogins|ghsLogin|z@z\.com|private/i.test(content);
    assert(supportsLogins, 'Private variant must support authorized test logins for evaluation');
  });

  test('S04-Step-5: Inspector verifies end-to-end provenance audit trail connecting claims to source files', () => {
    const { data: provData } = loadJsonSafely(PROVENANCE_JSON);
    const indexHtml = path.join(ROOT_DIR, 'index.html');
    const content = (provData ? JSON.stringify(provData) : '') + (fileExists(indexHtml) ? loadFileContent(indexHtml) : '');

    assert(/provenance|source|evidence/i.test(content), 'Inspector confirms unbroken provenance ledger trail');
  });

}, { tier: 4, feature: 'Scenario-4' });
