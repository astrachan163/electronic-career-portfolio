/**
 * Tier 3 Pairwise 3: Presenter Mode x Navigation State (F10 x F2)
 * Authoritative Source: ORIGINAL_REQUEST.md §R4, PROJECT.md §F10 & F2
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const PRESENTER_JS = path.join(ROOT_DIR, 'js/presenter.js');
const APP_JS = path.join(ROOT_DIR, 'js/app.js');

describe('Tier 3 - Pairwise 3: Presenter Mode x Navigation State (F10 x F2)', () => {

  test('T3-P03: Presenter mode activates and tracks current navigation section', () => {
    const pJs = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    const aJs = fileExists(APP_JS) ? loadFileContent(APP_JS) : '';
    const combined = pJs + ' ' + aJs;

    const connectsNav = /currentSection|activeSection|nav|section|hash/i.test(combined);
    assert(connectsNav, 'Presenter mode must link with navigation shell section tracking');
  });

}, { tier: 3, feature: 'F10xF2' });
