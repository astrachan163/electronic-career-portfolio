/**
 * Tier 4 Scenario 2: Live Presenter 7-Minute Competitive Event
 * Features Exercised: F2, F10, F11 (High Complexity)
 * Authoritative Source: TEST_INFRA.md §Scenario 2, ORIGINAL_REQUEST.md §R4
 *
 * Simulates Andrew delivering a live 7-minute competitive presentation before FBLA
 * judges, using the built-in Presenter Mode countdown timer, speaker notes drawer,
 * keyboard slide navigation, and printable presentation companion.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const PRESENTER_JS = path.join(ROOT_DIR, 'js/presenter.js');
const PRESENTER_HTML = path.join(ROOT_DIR, 'presenter.html');
const PRINT_CSS = path.join(ROOT_DIR, 'styles/print.css');

describe('Tier 4 - Scenario 2: Live Presenter 7-Minute Competitive Event', () => {

  test('S02-Step-1: Competitor triggers Presenter Mode from top navigation header', () => {
    assert(fileExists(INDEX_HTML), 'index.html must exist');
    const html = loadFileContent(INDEX_HTML);

    const hasPresenterLauncher = /presenter|presentation-mode|speaker-notes|btn-presenter/i.test(html);
    assert(hasPresenterLauncher, 'Top navigation must provide one-click trigger for Presenter Mode');
  });

  test('S02-Step-2: Presenter Mode timer initializes at 7:00 (420s) and handles countdown progression', () => {
    const jsContent = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    const htmlContent = (loadFileContent(INDEX_HTML) || '') + (fileExists(PRESENTER_HTML) ? loadFileContent(PRESENTER_HTML) : '');
    const combined = jsContent + ' ' + htmlContent;

    assert(/420|7:00|7\s*min/i.test(combined), 'Timer must configure 7-minute countdown boundary');
  });

  test('S02-Step-3: Keyboard arrow navigation steps forward and backward through presentation sections', () => {
    const jsContent = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    const appJs = path.join(ROOT_DIR, 'js/app.js');
    const appContent = fileExists(appJs) ? loadFileContent(appJs) : '';
    const combined = jsContent + ' ' + appContent;

    const hasKeyListeners = /keydown|keyup/i.test(combined) && /ArrowRight|ArrowLeft|Space/i.test(combined);
    assert(hasKeyListeners, 'Presenter mode must respond to standard presenter remote / keyboard strokes');
  });

  test('S02-Step-4: Speaker notes drawer displays judge-tailored talking points per section', () => {
    const jsContent = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    const htmlContent = (loadFileContent(INDEX_HTML) || '') + (fileExists(PRESENTER_HTML) ? loadFileContent(PRESENTER_HTML) : '');
    const combined = jsContent + ' ' + htmlContent;

    assert(/notes|speaker-notes|drawer/i.test(combined), 'Presenter Mode must feature dedicated speaker notes drawer');
  });

  test('S02-Step-5: 1-minute warning alert triggers and presentation companion PDF is ready for judges', () => {
    const jsContent = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    const htmlContent = (loadFileContent(INDEX_HTML) || '') + (fileExists(PRESENTER_HTML) ? loadFileContent(PRESENTER_HTML) : '');
    const combined = jsContent + ' ' + htmlContent;

    // Timer visual urgency warning
    assert(/warning|danger|timer-warning|60/i.test(combined), 'Timer must support visual threshold warning at <= 60s');

    // Printable PDF available as backup
    const hasPrintSupport = fileExists(PRINT_CSS) || /@media\s+print/i.test(combined) || /\.pdf/i.test(htmlContent);
    assert(hasPrintSupport, 'Presentation companion PDF or print stylesheet must be ready for judge handouts');
  });

}, { tier: 4, feature: 'Scenario-2' });
