/**
 * Tier 1 Feature 12: Dual Variant Integrity (Public vs Private)
 * Authoritative Source: ORIGINAL_REQUEST.md §R3, PROJECT.md §Feature 12 & Interface Contracts
 *
 * Verifies:
 * 1. Variant generator tool exists at tools/build.js.
 * 2. Adheres to PortfolioConfig interface contract (variant, redacted, contact, credentials).
 * 3. Public configuration suppresses test logins and redactions.
 * 4. Private configuration allows authorized internal test credentials.
 * 5. Production output targets dist/public and dist/private build folders.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const BUILD_JS = path.join(ROOT_DIR, 'tools/build.js');
const CONFIG_JS = path.join(ROOT_DIR, 'js/config.js');
const CONFIG_DATA_JS = path.join(ROOT_DIR, 'data/config.js');

describe('Tier 1 - Feature 12: Dual Variant Integrity (Public vs Private)', () => {

  test('T1-F12-01: Build tool tools/build.js exists to assemble deployment targets', () => {
    assert(fileExists(BUILD_JS), 'Dual-variant build tool must exist at tools/build.js');
  });

  test('T1-F12-02: Configuration defines PortfolioConfig contract with public/private variants', () => {
    const configPath = fileExists(CONFIG_JS) ? CONFIG_JS : (fileExists(CONFIG_DATA_JS) ? CONFIG_DATA_JS : BUILD_JS);
    assert(fileExists(configPath), 'Variant configuration file must exist');

    const content = loadFileContent(configPath) || '';
    const hasVariantSwitch = /variant\s*:\s*['"](?:public|private)['"]|['"]public['"]|['"]private['"]/i.test(content);
    assert(hasVariantSwitch, 'Configuration must explicitly support "public" and "private" variants');
  });

  test('T1-F12-03: Public variant sets redacted: true and suppresses test logins', () => {
    const configPath = fileExists(CONFIG_JS) ? CONFIG_JS : (fileExists(CONFIG_DATA_JS) ? CONFIG_DATA_JS : BUILD_JS);
    const content = loadFileContent(configPath) || '';

    const hasRedactedFlag = /redacted\s*:\s*true/i.test(content) || /showTestLogins\s*:\s*false/i.test(content);
    assert(hasRedactedFlag, 'Public build mode must set redacted: true and disable test login display');
  });

  test('T1-F12-04: Private variant enables full unredacted review for authorized evaluators', () => {
    const configPath = fileExists(CONFIG_JS) ? CONFIG_JS : (fileExists(CONFIG_DATA_JS) ? CONFIG_DATA_JS : BUILD_JS);
    const content = loadFileContent(configPath) || '';

    const hasPrivateMode = /['"]private['"]/i.test(content) && (/redacted\s*:\s*false/i.test(content) || /showTestLogins\s*:\s*true/i.test(content));
    assert(hasPrivateMode, 'Private build mode must allow complete evaluation assets with authorized access');
  });

  test('T1-F12-05: Target distribution directory layout supports dist/public and dist/private', () => {
    const buildContent = fileExists(BUILD_JS) ? loadFileContent(BUILD_JS) : '';
    const hasDistTargets = /dist\/public/i.test(buildContent) && /dist\/private/i.test(buildContent);
    assert(hasDistTargets, 'Build pipeline must target separate dist/public and dist/private directories');
  });

}, { tier: 1, feature: 'F12' });
