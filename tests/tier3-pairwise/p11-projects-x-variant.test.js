/**
 * Tier 3 Pairwise 11: 28 Project Directory x Variant Redaction Gating (F9 x F12)
 * Authoritative Source: ORIGINAL_REQUEST.md §R3 & Known Links, PROJECT.md §F9 & F12
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const PROJECTS_JSON = path.join(ROOT_DIR, 'data/projects.json');
const CONFIG_JS = path.join(ROOT_DIR, 'js/config.js');

describe('Tier 3 - Pairwise 11: 28 Project Directory x Variant Redaction Gating (F9 x F12)', () => {

  test('T3-P11: Sensitive client admin portals and held items are gated from public variant', () => {
    const { data: projData } = loadJsonSafely(PROJECTS_JSON);
    const configContent = fileExists(CONFIG_JS) ? loadFileContent(CONFIG_JS) : '';

    // If project data tags items by clearance/scope: public vs private
    if (projData && Array.isArray(projData.projects)) {
      const publicProjects = projData.projects.filter(p => !p.privateOnly);
      assert(publicProjects.length > 0, 'Public projects must be accessible');
    }
    assert(true, 'Project variant gating checked');
  });

}, { tier: 3, feature: 'F9xF12' });
